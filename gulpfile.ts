import gulp from "gulp";
import {deleteAsync} from "del";
import sass from "sass";
import fs from "fs";
import path from "path";
import {paths, baseUrl} from "./build-config.json";
import buildContent from "./src/build";
import runServer from "./src/server";
import esbuild from "esbuild";

//the dist directory may contain outdated content, so start clean
function clean() {
  return deleteAsync(paths.dist);
}

//build the stylesheet from SASS
function assetStyles() {
  return sass.compileAsync(paths.srcStyleEntry, {
    style: "compressed",
  }).then((res) => {
    fs.mkdirSync(paths.distAssets, {recursive: true});
    fs.writeFileSync(path.join(paths.distAssets, "style.css"), res.css, "utf8");
  });
}

function scriptBundle(devMode: boolean) {
  return function scriptBundle() {
    return esbuild.build({
      entryPoints: [paths.srcScriptEntry],
      outfile: path.join(paths.distAssets, "main.js"),
      bundle: true,
      minify: !devMode,
      sourcemap: devMode ? "inline" : false,
      // todo: can we check what are our users actually using?
      // target: ["edge16", "chrome58", "firefox57", "safari11", "ios"],
      platform: "browser",
    });
  }
}

//copies any static image or font assets over to the dist directory
function staticAssets() {
  return gulp.src(paths.srcStaticAssets, {encoding: false})
    .pipe(gulp.dest(paths.dist));
}

//any assets which come from our dependencies can be copied over too
function vendorAssets() {
  return gulp.src(paths.vendorAssets, {encoding: false})
    .pipe(gulp.dest(paths.distAssets));
}

//index and render all readme.md files to HTML
async function content() {
  await buildContent({
    baseUrl,
    contentDir: paths.srcContentBase,
    outputDir: paths.dist,
    noThumbs: !!process.env.C20_NO_THUMBNAILS,
  });
}

function watchSources() {
  gulp.watch([paths.srcStaticAssets], staticAssets);
  gulp.watch([paths.srcStylesAny], assetStyles);
  gulp.watch([paths.srcScriptsAny], scriptBundle(true));
  runServer(true);
}

function runStaticServer() {
  runServer(false);
}

//composite tasks
const assets = gulp.parallel(staticAssets, assetStyles, vendorAssets);
const buildAll = gulp.series(clean, gulp.parallel(assets, content, scriptBundle(false)));
const dev = gulp.series(clean, assets, gulp.parallel(scriptBundle(true), watchSources));
const buildAndServe = gulp.series(buildAll, runStaticServer);

//tasks which can be invoked from CLI with `npx gulp <taskname>`
module.exports = {
  assets,
  //removes the dist directory
  clean,
  //local development mode
  dev,
  //final build for publishing content
  default: buildAll,
  //serves built content assuming it's already been built
  server: runStaticServer,
  //builds all content then serves it
  static: buildAndServe,
};
