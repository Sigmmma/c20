import path from "path";
import glob from "glob";
import yaml from "js-yaml";
import fs from "fs";
import * as R from "ramda";
import {type Lang} from "./localization";

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
  return yaml.load(await fs.promises.readFile(filePath, "utf8"));
};

type LoadTreeOpts = {flat?: boolean, nonRecursive?: boolean};

export async function loadTextTree<T=object>(baseDir: string): Promise<T> {
  let result = {};
  const files = await findPaths(path.join(baseDir, "**/*.txt"));

  await Promise.all(files.map(async (filePath) => {
    try {
      const fileText = await fs.promises.readFile(filePath, "utf8");
      const {dir, name: moduleName} = path.parse(filePath);
      const objectPath = [...path.relative(baseDir, dir).split(path.sep), moduleName].filter(part => part != "");
      result = R.assocPath(objectPath, fileText, result);
    } catch (e) {
      throw new Error(`Failed to load YAML file ${filePath}:\n${e}`);
    }
  }));

  return result as T;
};

export async function loadYamlTree<T=object>(baseDir: string, opts?: LoadTreeOpts): Promise<T> {
  let result = {};
  const files = await findPaths(path.join(baseDir, opts?.nonRecursive ? "*.yml" : "**/*.yml"));

  await Promise.all(files.map(async (filePath) => {
    try {
      const fileData = await loadYamlFile(filePath);
      if (opts?.flat) {
        result = R.mergeRight(result, fileData);
      } else {
        const {dir, name: moduleName} = path.parse(filePath);
        const objectPath = [...path.relative(baseDir, dir).split(path.sep), moduleName].filter(part => part != "");
        result = R.assocPath(objectPath, fileData, result);
      }
    } catch (e) {
      throw new Error(`Failed to load YAML file ${filePath}:\n${e}`);
    }
  }));

  return result as T;
};

export function parseLangSuffix(fileName: string): Lang | undefined {
  return fileName.match(/^.*_(\w{2})$/)?.[1]?.toLowerCase();
}
