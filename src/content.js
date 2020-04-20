const glob = require("glob");
const templates = require("./templates");
const {findHeaders} = require("./templates/shared");
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

async function getTagMetadata(tagsDir) {
  const filePaths = await findPaths(path.join(tagsDir, "*.json"));
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
  const defsByName = {};
  for (let def of defsByFile.flat()) {
    defsByName[def.name] = def;
  }
  return defsByName;
}

async function getPageMetadata(contentDir) {
  const filePaths = await findPaths(path.join(contentDir, "**/readme.md"));
  return await Promise.all(filePaths.map(async (filePath) => {
    return new Promise(async (resolve, reject) => {
      try {
        const fileContents = await fs.readFile(filePath, "utf8");
        const {dir} = path.parse(filePath);
        const {attributes, body} = fm(fileContents);
        if (!attributes || !attributes.title) {
          reject(new Error(`File ${filePath} does not define a title`));
        } else {
          const contentDirDepth = path.normalize(contentDir).split(path.sep).length;
          const _dir = path.normalize(dir).split(path.sep).slice(contentDirDepth);
          const _headers = findHeaders(body);
          resolve({
            ...attributes,
            _md: body,
            _headers,
            _dir,
            _slug: _dir[_dir.length - 1],
            _dirUrl: "/" + _dir.join("/"),
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  }));
}

async function buildMetaIndex(contentDir, tagsDir, baseUrl) {
  const pages = await getPageMetadata(contentDir);
  const tags = await getTagMetadata(tagsDir);

  const mdFooter = pages
    .filter(page => page._dir.length > 0)
    .flatMap(page => [
      `[${page._slug}]: ${page._dirUrl}`,
      ...page._headers.map(header => `[${page._slug}#${header.id}]: ${page._dirUrl}#${header.id}`)
    ])
    .join("\n");

  return {pages, mdFooter, tags, baseUrl};
}

async function renderContent(metaIndex, outputDir) {
  await Promise.all(metaIndex.pages.map(async (page) => {
    const templateName = page.template || "default";
    const renderTemplate = templates[templateName];
    if (!renderTemplate) {
      throw new Error(`The template '${templateName}' does not exist`);
    }
    const result = renderTemplate(page, metaIndex);
    await fs.mkdir(path.join(outputDir, ...page._dir), {recursive: true});
    await fs.writeFile(path.join(outputDir, ...page._dir, "index.html"), result, "utf8");
  }));
}

async function buildContent(contentDir, outputDir, tagsDir, baseUrl) {
  const metaIndex = await buildMetaIndex(contentDir, tagsDir, baseUrl);
  await renderContent(metaIndex, outputDir);
}

module.exports = buildContent;
