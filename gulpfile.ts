import gulp from "gulp";
import del from "del";
import sass from "sass";
import fs from "fs";
import path from "path";
import {paths, baseUrl} from "./build-config.json";
import buildContent from "./src/build";
import runServer from "./src/server";

//the dist directory may contain outdated content, so start clean
function clean() {
  return del(paths.dist);
}

//build the stylesheet from SASS
function assetStyles() {
  return new Promise((resolve, reject) => {
    sass.render({file: paths.srcStyleEntry, outputStyle: "compressed"}, (err, res) => {
      if (err) {
        reject(err);
      } else {
        fs.mkdirSync(paths.distAssets, {recursive: true});
        fs.writeFileSync(path.join(paths.distAssets, "style.css"), res.css, "utf8");
        resolve(undefined);
      }
    });
  });
}

//copies any static image or font assets over to the dist directory
function staticAssets() {
  return gulp.src(paths.srcStaticAssets)
    .pipe(gulp.dest(paths.dist));
}

//any assets which come from our dependencies can be copied over too
function vendorAssets() {
  return gulp.src(paths.vendorAssets)
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
  runServer();
}

//composite tasks
const assets = gulp.parallel(staticAssets, assetStyles, vendorAssets);
const buildAll = gulp.series(clean, gulp.parallel(assets, content));
const dev = gulp.series(clean, assets, watchSources);

//tasks which can be invoked from CLI with `npx gulp <taskname>`
module.exports = {
  clean, //remove the dist directory
  assets, //build just styles
  content, //pages and their resources
  dev, //local development mode
  default: buildAll //typical build for publishing content
};
