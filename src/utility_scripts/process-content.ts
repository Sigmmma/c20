import {discoverPageFiles, loadPageIndex} from "../lib/content";
import buildConfig from "../../build-config.json";
import {parseSplit} from "../lib/markdown/markdown";
import fs from "fs";

(async function () {
  const pageFiles = await discoverPageFiles(buildConfig.paths.srcContentBase);
  for (let pageFile of pageFiles) {
    console.log(pageFile.mdFilePath);
    const mdSrc = await fs.promises.readFile(pageFile.mdFilePath, "utf8");
    const {attributes, body} = parseSplit(mdSrc);
    console.log(body);
    break;
  }
  // console.log(pageIndex["/"].ast.children[0].lines);
})();