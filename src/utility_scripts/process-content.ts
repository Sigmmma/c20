import {discoverPageFiles, loadPageIndex, PageFrontMatter} from "../lib/content";
import buildConfig from "../../build-config.json";
import {parseSplit} from "../lib/markdown/markdown";
import fs from "fs";
import yaml from "js-yaml";
import loadStructuredData from "../data";
import R from "ramda";

(async function () {
  const data = await loadStructuredData();
  const pageFiles = await discoverPageFiles(buildConfig.paths.srcContentBase);

  for (let pageFile of pageFiles) {
    console.log(pageFile.mdFilePath);
    const mdSrc = await fs.promises.readFile(pageFile.mdFilePath, "utf8");
    const {attributes, body} = parseSplit<PageFrontMatter>(mdSrc);
    let dirty = false;

    if (dirty) {
      const newFm = yaml.dump(attributes, {
        lineWidth: 120,
        noRefs: true,
        quotingType: '"',
      });
      const text = `---\n${newFm.trim()}\n---\n${body.trim()}\n`;
      fs.writeFileSync(pageFile.mdFilePath, text, "utf8");
    }
  }
})();