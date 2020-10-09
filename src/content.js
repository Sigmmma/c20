const glob = require("glob");
const renderPage = require("./render/render");
const {findHeaders} = require("./render/components");
const marked = require("marked");
const buildData = require("./data");
const fm = require("front-matter");
const fs = require("fs").promises;
const path = require("path");
const MiniSearch = require("minisearch");

const STOP_WORDS = new Set(["and", "or", "not", "to", "at", "in", "a", "the", "be", "are", "is", "as", "its", "it", "this", "these", "any", "halo", "e", "g"]);

function commonLength(strA, strB) {
  let len = 0;
  while (len < strA.length && len < strB.length) {
    if (strA[len] != strB[len]) break;
    len++;
  }
  return len;
}

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

    //find child pages
    page._childPages = [];
    const candidateChildPages = pages.filter(otherPage =>
      otherPage._path != page._path && (page._path == "/" || otherPage._path.startsWith(page._path + "/"))
    );
    candidateChildPages.sort((a, b) => a._pathParts.length - b._pathParts.length);
    for (let childPage of candidateChildPages) {
      if (!page._childPages.find(otherChild => childPage._path.startsWith(otherChild._path))) {
        page._childPages.push(childPage);
      }
    }
    page._childPages.sort((a, b) => a.title.localeCompare(b.title));


    //find related pages
    page._relatedPages = pages.filter(otherPage => {
      if (otherPage._path == page._path) return false;
      const setA = [page.title, page._slug, ...(page.keywords || [])];
      const setB = [otherPage.title, otherPage._slug, ...(otherPage.keywords || [])];
      return setA.find(keyword => setB.indexOf(keyword) != -1) !== undefined;
    });
  }

  return pages;
}

async function renderContent(pages, data, buildOpts) {
  const searchDocs = await Promise.all(pages.map(async (page) => {

    const findTagPageByName = (tagName) => {
      const otherPage = pages.find(otherPage => otherPage.tagName == tagName);
      if (!otherPage) throw new Error(`Failed to find tag page for ${tagName}`);
      return otherPage;
    };

    const resolvePage = (pathTail, headingId) => {
      const otherPages = pages.filter(otherPage => {
        const headingMatch = (!headingId || otherPage._headers.find(hdg => hdg.id == headingId));
        const slugMatch = otherPage._path.endsWith("/" + pathTail);
        return slugMatch && headingMatch;
      });
      if (otherPages.length == 0) {
        throw new Error(`No page exists with path tail '${pathTail}' and headingId '${headingId}' (from path '${page._path}')`);
      } else if (otherPages.length > 1) {
        //there are multiple matching pages -- try disambiguating by picking best match
        otherPages.sort((a, b) => commonLength(b._path, page._path) - commonLength(a._path, page._path));
        const firstChoice = otherPages[0];
        const secondChoice = otherPages[1];
        if (commonLength(firstChoice._path, page._path) > commonLength(secondChoice._path, page._path)) {
          return firstChoice;
        }
        const matched = otherPages.map(otherPage => otherPage._path).join("\n");
        throw new Error(`Path tail '${pathTail}' with headingId '${headingId}' was ambiguous (from path '${page._path})':\n${matched}`);
      }
      return otherPages[0];
    }

    //looks up full absolute URL for a path tail and optionally a heading anchor
    const resolveUrl = (pathTail, headingId) => {
      const otherPage = resolvePage(pathTail, headingId);
      return headingId ? `${otherPage._path}#${headingId}` : otherPage._path;
    };

    const metaIndex = {
      findTagPageByName,
      resolvePage,
      resolveUrl,
      pages,
      data,
      buildOpts,
    };

    const {htmlDoc, searchDoc} = renderPage(page, metaIndex);
    await fs.mkdir(path.join(buildOpts.outputDir, ...page._pathParts), {recursive: true});
    await fs.writeFile(path.join(buildOpts.outputDir, ...page._pathParts, "index.html"), htmlDoc, "utf8");
    return searchDoc;
  }));

  const searchIndex = new MiniSearch({
    idField: "path",
    fields: ["title", "text", "keywords"],
    storeFields: ["title"],
    tokenize: (string, _fieldName) => {
      //customize tokenizer to allow underscores in token
      return string.split(/[\s\-\."'!?,;:\[\]\(\)\|\\><]+/);
    },
    processTerm: (term, _fieldName) => {
      term = term.toLowerCase();
      return STOP_WORDS.has(term) ? null : term;
    },
    searchOptions: {
      boost: {title: 3, keywords: 2},
      fuzzy: 0.2
    }
  });
  searchIndex.addAll(searchDocs);
  const jsonIndex = JSON.stringify(searchIndex.toJSON());
  await fs.writeFile(path.join(buildOpts.outputDir, "assets", "search-index.json"), jsonIndex, "utf8");

  const sitemap = pages
    .filter(page => !page.stub)
    .map(page => `${buildOpts.baseUrl}${page._path}`)
    .join("\n");
  await fs.writeFile(path.join(buildOpts.outputDir, "sitemap.txt"), sitemap, "utf8");

  const robots = `User-agent: *\nDisallow: /assets/\nSitemap: ${buildOpts.baseUrl}/sitemap.txt\n`;
  await fs.writeFile(path.join(buildOpts.outputDir, "robots.txt"), robots, "utf8");
}

async function buildContent(buildOpts) {
  const pages = await getPageMetadata(buildOpts.contentDir);
  const invaderStructDefs = await getInvaderStructDefs(buildOpts.invaderDefsDir);
  const data = buildData(invaderStructDefs);
  await renderContent(pages, data, buildOpts);
}

module.exports = buildContent;
