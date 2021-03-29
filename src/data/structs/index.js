const yaml = require("js-yaml");
const R = require("ramda");
const path = require("path");
const fs = require("fs").promises;
const {findPaths} = require("../../utils");

async function readModuleFile(moduleFilePath) {
  return yaml.load(await fs.readFile(moduleFilePath, "utf8"));
}

async function loadStructModules() {
  let modules = {};
  const moduleFiles = await findPaths(path.join(__dirname, "**/*.yml"));
  for (let moduleFilePath of moduleFiles) {
    const {dir, name: moduleName} = path.parse(moduleFilePath);
    const modulePath = [...path.relative(__dirname, dir).split(path.sep), moduleName];
    const moduleInfo = await readModuleFile(moduleFilePath);
    modules = R.assocPath(modulePath, moduleInfo, modules);
  }
  return modules;
}

module.exports = loadStructModules;
