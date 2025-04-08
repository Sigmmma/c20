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
    if (attributes.about && attributes.about.startsWith("tag:")) {
      const pt = [...attributes.about.split(":")[1].split("/"), "id"];
      const tagId = R.path(pt, data.tags);
      if (tagId.length != 4) {
        throw new Error("bad tagId length");
      }
      if (attributes.keywords && !attributes.keywords.includes(tagId)) {
        attributes.keywords = (attributes.keywords ?? []).concat(tagId);
        const newFm = yaml.dump(attributes);
        const text = `---\n${newFm.trim()}\n---\n${body.trim()}\n`;
        fs.writeFileSync(pageFile.mdFilePath, text, "utf8");
      }
    }
  }
})();