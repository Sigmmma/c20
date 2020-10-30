const glob = require("glob");

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
  findPaths
};
