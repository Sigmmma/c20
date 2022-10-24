import {getPageBaseDir, pageIdToLogical, tryLocalizedPath, type PageIndex} from "./content";
import path from "path";
import fs from "fs";
import Viz from "viz.js";
import {exec} from "child_process";
import vizRenderOpts from "viz.js/full.render.js";
import {type BuildOpts} from "../build";

const COPY_FILES_PATTERN = /\.(jpg|jpeg|png|gif|ms|mp4|blend|zip)/;
const VIDEO_FILES_PATTERN = /\.(mp4)/;
const VIZ_RENDER_PATTERN = /\.(dot|neato|fdp|sfdp|twopi|circo)/;
const noThumbs = process.env.C20_NO_THUMBNAILS == "true";

async function processFile(srcPath: string, outputDir: string) {
  const {ext, base, name} = path.parse(srcPath);
  //technically these could match directories too, but we'll ignore that since it's a stat check
  if (ext.match(COPY_FILES_PATTERN)) {
    //normal resources, just copy them to destination
    const destPath = path.join(outputDir, base);
    await fs.promises.copyFile(srcPath, destPath);
  }
  if (ext.match(VIZ_RENDER_PATTERN)) {
    //build content graphviz diagrams into SVG (https://graphviz.org)
    const vizSrc = await fs.promises.readFile(srcPath, "utf8");
    const viz = new Viz(vizRenderOpts);
    const svg = await viz.renderString(vizSrc);
    const destPath = path.join(outputDir, `${name}.svg`);
    await fs.promises.writeFile(destPath, svg, "utf8");
  }
  if (ext.match(VIDEO_FILES_PATTERN) && !noThumbs) {
    const destPath = path.join(outputDir, `${name}.thumb_%d.jpg`);
    await new Promise<void>((resolve, reject) => {
      exec(`ffmpeg -i "${srcPath}" -vframes 1 "${destPath}"`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

export default async function buildResources(pageIndex: PageIndex, buildOpts: BuildOpts) {
  await Promise.all(Object.entries(pageIndex).map(async ([pageId, pageDataByLang]) => {
    const baseDir = getPageBaseDir(pageId, buildOpts);
    const srcFiles = await fs.promises.readdir(baseDir, {encoding: "utf8"});
    const outputDir = path.join(buildOpts.outputDir, ...pageIdToLogical(pageId));

    await fs.promises.mkdir(outputDir, {recursive: true});

    await Promise.all(srcFiles.map(async (srcFileName) => {
      const srcPath = path.join(baseDir, srcFileName);
      const {name} = path.parse(srcPath);
      processFile(srcPath, outputDir);
    }));
  }));
}
