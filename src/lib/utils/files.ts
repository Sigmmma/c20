const path = require("path");
const glob = require("glob");
const yaml = require("js-yaml");
const fs = require("fs").promises;
import * as R from "ramda";

export async function findPaths(globPattern: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob(globPattern, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
};

export async function loadYamlFile<T=any>(filePath: string): Promise<T> {
  return yaml.load(await fs.readFile(filePath, "utf8"));
};

type LoadTreeOpts = {flat?: boolean, nonRecursive?: boolean};
export async function loadYamlTree<T=object>(baseDir: string, opts?: LoadTreeOpts): Promise<T> {
  let result = {};
  const files = await findPaths(path.join(baseDir, opts?.nonRecursive ? "*.yml" : "**/*.yml"));
  for (let filePath of files) {
    const fileData = await loadYamlFile(filePath);
    if (opts?.flat) {
      result = R.mergeRight(result, fileData);
    } else {
      const {dir, name: moduleName} = path.parse(filePath);
      const objectPath = [...path.relative(baseDir, dir).split(path.sep), moduleName].filter(part => part != "");
      result = R.assocPath(objectPath, fileData, result);
    }
  }
  return result as T;
};