const path = require("path");
const fs = require("fs").promises;
const Viz = require("viz.js");
const {exec} = require("child_process");
const vizRenderOpts = require("viz.js/full.render.js");

const COPY_FILES_PATTERN = /\.(jpg|jpeg|png|gif|ms|mp4|blend|zip)/;
const VIDEO_FILES_PATTERN = /\.(mp4)/;
const VIZ_RENDER_PATTERN = /\.(dot|neato|fdp|sfdp|twopi|circo)/;
const noThumbs = process.env.C20_NO_THUMBNAILS == "true";

//todo: this does extra work then the URL is not localized but there are multiple languages
async function buildResources(pageIndex, buildOpts) {
  await Promise.all(Object.values(pageIndex.pages).map(async (page) => {
    const dirPath = path.join("./src/content", ...page.logicalPath);
    const files = await fs.readdir(dirPath, {encoding: "utf8"});

    //ensure all localized paths exist before we start copying/generating files
    await Promise.all(page.langs.map(async (lang) => {
      const localizedPageOutputDir = path.join(buildOpts.outputDir, page.localizedPaths[lang]);
      await fs.mkdir(localizedPageOutputDir, {recursive: true});
    }));

    await Promise.all(files.map(async (filePath) => {
      const srcPath = path.join(dirPath, filePath);
      const {ext, base, name} = path.parse(srcPath);
      let destLangs = page.langs;

      const singleLangMatch = name.match(/^.*_(\w{2})$/);
      if (singleLangMatch) {
        const singleLang = singleLangMatch[1].toLowerCase();
        if (!page.langs.includes(singleLang)) {
          throw new Error(`Language-specific resource ${srcPath} is unsupported by page ${page.pageId} available in: ${page.langs.join(",")}`);
        }
        destLangs = [singleLang];
      }

      //technically these could match directoris too, but we'll ignore that since it's a stat check
      if (ext.match(COPY_FILES_PATTERN)) {
        //normal resources, just copy them to destination
        await Promise.all(destLangs.map(async (lang) => {
          const destPath = path.join(buildOpts.outputDir, page.localizedPaths[lang], base);
          await fs.copyFile(srcPath, destPath);
        }));
      }
      if (ext.match(VIZ_RENDER_PATTERN)) {
        //build content graphviz diagrams into SVG (https://graphviz.org)
        const vizSrc = await fs.readFile(srcPath, "utf8");
        const viz = new Viz(vizRenderOpts);
        const svg = await viz.renderString(vizSrc);
        await Promise.all(destLangs.map(async (lang) => {
          const destPath = path.join(buildOpts.outputDir, page.localizedPaths[lang], `${name}.svg`);
          await fs.writeFile(destPath, svg, "utf8");
        }));
      }
      if (ext.match(VIDEO_FILES_PATTERN) && !noThumbs) {
        await Promise.all(destLangs.map(async (lang) => {
          const destPath = path.join(buildOpts.outputDir, page.localizedPaths[lang], `${name}.thumb_%d.jpg`);
          await new Promise((resolve, reject) => {
            exec(`ffmpeg -i "${srcPath}" -vframes 1 "${destPath}"`, (err) => {
              if (err) reject(err);
              else resolve();
            });
          });
        }));
      }
      //other file types are ignored and fall through
    }));
  }));
}

module.exports = buildResources;
