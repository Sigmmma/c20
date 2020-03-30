const glob = require("glob");
const templates = require("./templates");
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

async function buildMetaIndex(contentDir) {
  const filePaths = await findPaths(`${contentDir}/**/readme.md`);

  const pages = await Promise.all(filePaths.map(async (filePath) => {
    return new Promise(async (resolve, reject) => {
      console.log(`Indexing ${filePath}`);
      try {
        const fileContents = await fs.readFile(filePath, "utf8");
        const {dir} = path.parse(filePath);
        const {attributes, body} = fm(fileContents);
        if (!attributes || !attributes.title) {
          reject(new Error(`File ${path} does not define a title`));
        } else {
          const _dir = path.normalize(dir).split(path.sep).slice(1);
          resolve({
            ...attributes,
            _md: body,
            _dir,
            _dirUrl: "/" + _dir.join("/")
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  }));

  const mdFooter = pages
    .filter(page => page._dir.length > 0)
    .map(page => `[${page._dir[page._dir.length - 1]}]: ${page._dirUrl}`)
    .join("\n");

  return {pages, mdFooter};
}

async function renderContent(metaIndex, outputDir) {
  return Promise.all(metaIndex.pages.map(async (page) => {
    return new Promise(async (resolve, reject) => {
      console.log(`Rendering '${page.title}'`);
      const renderTemplate = templates[page.template || "default"];
      try {
        const result = renderTemplate(page, metaIndex);
        await fs.mkdir(path.join(outputDir, ...page._dir), {recursive: true});
        await fs.writeFile(path.join(outputDir, ...page._dir, "index.html"), result, "utf8");
      } catch (err) {
        reject(err);
      }
    });
  }));
}

async function build(contentDir, outputDir) {
  try {
    const metaIndex = await buildMetaIndex(contentDir);
    await renderContent(metaIndex, outputDir);
  } catch (err) {
    console.error(err);
  }
}

build("./content", "./dist");
