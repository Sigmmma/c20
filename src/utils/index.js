const glob = require("glob");
const path = require("path");

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

//returns an array of directory path parts relative to a base dir
function parsePathParts(baseDir, fullPath) {
  const {dir} = path.parse(fullPath);
  const contentDirDepth = path.normalize(baseDir).split(path.sep).length;
  return path.normalize(dir).split(path.sep).slice(contentDirDepth);
}

module.exports = {
  commonLength,
  findPaths,
  parsePathParts
};
