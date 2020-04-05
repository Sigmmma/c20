const gulp = require("gulp");
const sass = require("sass");
const fs = require("fs");
const rename = require("gulp-rename");
const transform = require("gulp-transform");
const buildContent = require("./src/content");
const Viz = require('viz.js');
const vizRenderOpts = require('viz.js/full.render.js');

function assetStyles() {
  return new Promise((resolve, reject) => {
    sass.render({file: "./src/assets/style.scss"}, (err, res) => {
      if (err) {
        reject(err);
      } else {
        fs.mkdirSync("./dist/assets/", {recursive: true});
        fs.writeFileSync("./dist/assets/style.css", res.css, "utf8");
        resolve();
      }
    });
  });
}

function assetImages() {
  return gulp.src("./src/@(assets)/**/*.@(jpg|jpeg|png|gif)")
    .pipe(gulp.dest("./dist"));
}

function vendorAssets() {
  return gulp.src("./node_modules/highlight.js/styles/atom-one-dark.css")
    .pipe(gulp.dest("./dist/assets/"));
}

//https://graphviz.org/documentation/
function contentDiagrams() {
  return gulp.src("./src/content/**/*.@(dot|neato|fdp|sfdp|twopi|circo)")
    .pipe(transform("utf8", (mermaidSrc) => {
      const viz = new Viz(vizRenderOpts);
      return viz.renderString(mermaidSrc);
    }))
    .pipe(rename({extname: ".svg"}))
    .pipe(gulp.dest("./dist"));
}

function contentResources() {
  return gulp.src("./src/content/**/*.@(jpg|jpeg|png|gif)")
    .pipe(gulp.dest("./dist"));
}

async function contentPages() {
  await buildContent("./src/content", "./dist");
}

const assets = gulp.parallel(assetImages, assetStyles, vendorAssets);
const content = gulp.parallel(contentResources, contentPages, contentDiagrams);

module.exports = {
  assets,
  default: gulp.parallel(assets, content)
};
