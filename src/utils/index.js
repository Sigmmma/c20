const R = require("ramda");
const path = require("path");
const glob = require("glob");
const yaml = require("js-yaml");
const fs = require("fs").promises;

async function loadYamlTree(baseDir) {
  let modules = {};
  const moduleFiles = await findPaths(path.join(baseDir, "**/*.yml"));
  for (let moduleFilePath of moduleFiles) {
    const {dir, name: moduleName} = path.parse(moduleFilePath);
    const modulePath = [...path.relative(baseDir, dir).split(path.sep), moduleName].filter(part => part != "");
    const moduleInfo = await loadYamlFile(moduleFilePath);
    modules = R.assocPath(modulePath, moduleInfo, modules);
  }
  return modules;
}

async function loadYamlFile(filePath) {
  return yaml.load(await fs.readFile(filePath, "utf8"));
}

//returns length of common prefix of two strings
function commonLength(strA, strB) {
  let len = 0;
  while (len < strA.length && len < strB.length) {
    if (strA[len] != strB[len]) break;
    len++;
  }
  return len;
}

//async version of globber
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

module.exports = {
  commonLength,
  findPaths,
  loadYamlFile,
  loadYamlTree
};
