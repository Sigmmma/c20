const path = require("path");
const fs = require("fs").promises;
const Viz = require("viz.js");
const vizRenderOpts = require("viz.js/full.render.js");

const COPY_FILES_PATTERN = /\.(jpg|jpeg|png|gif|ms)/;
const VIZ_RENDER_PATTERN = /\.(dot|neato|fdp|sfdp|twopi|circo)/;

async function buildResources(pageIndex, buildOpts) {
  await Promise.all(Object.values(pageIndex.pages).map(async (page) => {
    const localizedPageOutputDir = path.join(buildOpts.outputDir, page.localizedPaths[lang]);
    await fs.mkdir(localizedPageOutputDir, {recursive: true});

    const files = await fs.readdir(page.dirPath, {encoding: "utf8"});

    await Promise.all(files.map(async (filePath) => {
      const {ext, base, name} = path.parse(filePath);

      if (ext.match(COPY_FILES_PATTERN)) {
        //normal resources, just copy them to destination
        const destPath = path.join(localizedPageOutputDir, base);
        await fs.copyFile(filePath, destPath);
      } else if (ext.match(VIZ_RENDER_PATTERN)) {
        //build content graphviz diagrams into SVG (https://graphviz.org)
        const vizSrc = await fs.readFile(filePath, "utf8");
        const viz = new Viz(vizRenderOpts);
        const svg = viz.renderString(vizSrc);
        const destPath = path.join(localizedPageOutputDir, `${name}.svg`);
        await fs.writeFile(destPath);
      }
      //other file types are ignored and fall through
    }));
  }));
}

module.exports = buildResources;
