import {pageIdToLogical, PageId} from "./content/pages";
import path from "path";
import fs from "fs";
import Viz from "@viz-js/viz";
import {exec} from "child_process";
import {type BuildOpts} from "../build";
import {getPageBaseDir} from "./content/content-files";

if (typeof btoa === 'undefined') {
  global["btoa"] = function btoa(str) {
    var buffer;

    if (str instanceof Buffer) {
      buffer = str;
    } else {
      buffer = Buffer.from(str.toString(), 'binary');
    }

    return buffer.toString('base64');
  };
}
if (typeof atob === 'undefined') {
  global["atob"] = function atob(str) {
    return Buffer.from(str, 'base64').toString('binary');
  };
}

const COPY_FILES_PATTERN = /\.(jpg|jpeg|png|gif|ms|mp4|blend|zip)/;
const VIDEO_FILES_PATTERN = /\.(mp4)/;
const VIZ_RENDER_PATTERN = /\.(dot|neato|fdp|sfdp|twopi|circo)/;
const noThumbs = process.env.C20_NO_THUMBNAILS == "true";

export async function renderViz(vizSrc: string): Promise<string> {
  const viz = await Viz.instance();
  const svg = viz.renderString(vizSrc, {format: "svg"});
  // const viz = new Viz(vizRenderOpts);
  // const svg = await viz.renderString(vizSrc);
  return svg;
}

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
    const svg = await renderViz(vizSrc);
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

export default async function buildResources(pageIds: PageId[], buildOpts: BuildOpts) {
  await Promise.all(pageIds.map(async (pageId) => {
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
