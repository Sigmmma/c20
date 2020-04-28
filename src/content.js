const glob = require("glob");
const templates = require("./templates");
const {findHeaders} = require("./templates/shared");
const buildData = require("./data");
const fm = require("front-matter");
const fs = require("fs").promises;
const path = require("path");

async function findPaths(globPattern) {
  return new Promise((resolve, reject) => {
    glob(globPattern, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

async function getInvaderStructDefs(invaderDefsDir) {
  const filePaths = await findPaths(path.join(invaderDefsDir, "*.json"));
  const defsByFile = await Promise.all(filePaths.map(async (filePath) => {
    return new Promise(async (resolve, reject) => {
      try {
        const fileContents = await fs.readFile(filePath, "utf8");
        const defs = JSON.parse(fileContents);
        resolve(defs);
      } catch (err) {
        reject(err);
      }
    });
  }));
  const defsByStructName = {};
  for (let def of defsByFile.flat()) {
    defsByStructName[def.name] = def;
  }
  return defsByStructName;
}

function getPagePathParts(contentDir, readmeFilePath) {
  const {dir} = path.parse(readmeFilePath);
  const contentDirDepth = path.normalize(contentDir).split(path.sep).length;
  return path.normalize(dir).split(path.sep).slice(contentDirDepth);
}

//return an array of the metadata objects representing each content page
async function getPageMetadata(contentDir) {
  //find all readme files under the content root -- each will become a page
  const readmeFilePaths = await findPaths(path.join(contentDir, "**/readme.md"));

  //build the array of per-page metadata
  const pages = await Promise.all(readmeFilePaths.map(async (readmeFilePath) => {
    return new Promise(async (resolve, reject) => {
      try {
        const fileContents = await fs.readFile(readmeFilePath, "utf8");
        const {attributes, body} = fm(fileContents);
        if (!attributes || !attributes.title) {
          reject(new Error(`File ${readmeFilePath} does not define a title`));
        } else {
          const _pathParts = getPagePathParts(contentDir, readmeFilePath);
          const _headers = findHeaders(body);
          resolve({
            //include any YAML metadata provided by page authors
            ...attributes,
            //add calulated or parsed metadata
            _md: body,
            _headers,
            _pathParts,
            _slug: _pathParts[_pathParts.length - 1],
            _path: "/" + _pathParts.join("/"),
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  }));

  //in a second pass, add inter-page relationships like parents and children
  for (let page of pages) {
    //find the parent of this page
    for (let i = page._pathParts.length - 1; i >= 0; i--) {
      const parentPath = "/" + page._pathParts.slice(0, i).join("/");
      page._parent = pages.find(otherPage => otherPage._path == parentPath);
      if (page._parent) {
        break;
      }
    }

    page._childPages = [];
    const candidateChildPages = pages.filter(otherPage =>
      otherPage._path != page._path && otherPage._path.startsWith(page._path)
    );
    candidateChildPages.sort((a, b) => a._pathParts.length - b._pathParts.length);
    for (let childPage of candidateChildPages) {
      if (!page._childPages.find(otherChild => childPage._path.startsWith(otherChild._path))) {
        page._childPages.push(childPage);
      }
    }
    page._childPages.sort((a, b) => a.title.localeCompare(b.title));
  }

  return pages;
}

async function buildMetaIndex(contentDir, invaderDefsDir, baseUrl, packageVersion) {
  const pages = await getPageMetadata(contentDir);
  const invaderStructDefs = await getInvaderStructDefs(invaderDefsDir);
  const data = buildData(invaderStructDefs);

  const mdFooter = pages
    .filter(page => page._pathParts.length > 0)
    .flatMap(page => [
      `[${page._slug}]: ${page._path}`,
      ...page._headers.map(header => `[${page._slug}#${header.id}]: ${page._path}#${header.id}`)
    ])
    .join("\n");

  const findTagPageByName = (tagName) => {
    const page = pages.find(page => page._slug == tagName && page.template == "tag");
    if (!page) throw new Error(`Failed to find tag page for ${tagName}. Please create one`);
    return page;
  };

  return {
    packageVersion,
    findTagPageByName,
    pages,
    mdFooter,
    data,
    baseUrl
  };
}

async function renderContent(metaIndex, outputDir) {
  await Promise.all(metaIndex.pages.map(async (page) => {
    const templateName = page.template || "default";
    const renderTemplate = templates[templateName];
    if (!renderTemplate) {
      throw new Error(`The template '${templateName}' does not exist`);
    }
    const result = renderTemplate(page, metaIndex);
    await fs.mkdir(path.join(outputDir, ...page._pathParts), {recursive: true});
    await fs.writeFile(path.join(outputDir, ...page._pathParts, "index.html"), result, "utf8");
  }));
}

async function buildContent(contentDir, outputDir, invaderDefsDir, baseUrl, packageVersion) {
  const metaIndex = await buildMetaIndex(contentDir, invaderDefsDir, baseUrl, packageVersion);
  await renderContent(metaIndex, outputDir);
}

module.exports = buildContent;
