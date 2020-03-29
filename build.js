const glob = require("glob");
const templates = require("./templates");
const markdownIt = require("markdown-it");
const fm = require("front-matter");
const fs = require("fs");

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
  const paths = await findPaths(`${contentDir}/**/index.md`);

  const pages = await Promise.all(paths.map((path) => {
    console.log(`Indexing ${path}`);
    return new Promise((resolve, reject) => {
      fs.readFile(path, "utf8", (err, fileContents) => {
        if (err) {
          reject(err);
        } else {
          const {attributes: meta, body: md} = fm(fileContents);
          resolve({
            ...meta,
            _canonicalPath: path
              .replace(contentDir, "")
              .replace("index.md", "")
          });
        }
      });
    });
  }));

  return {pages};
}

function renderContent(metaIndex, outputDir) {
  console.log(metaIndex);
}

async function build(contentDir, outputDir) {
  const metaIndex = await buildMetaIndex(contentDir);
  renderContent(metaIndex, outputDir);
}

build("./content", "./dist");
