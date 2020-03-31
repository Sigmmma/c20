const gulp = require("gulp");
const sass = require("sass");
const fs = require("fs");
const buildContent = require("./src/content");

function assetStyles(done) {
  sass.render({file: "./src/assets/style.scss"}, (err, res) => {
    if (!err) {
      fs.mkdirSync("./dist/assets/", {recursive: true});
      fs.writeFileSync("./dist/assets/style.css", res.css, "utf8");
      done();
    }
  });
}

function assetImages() {
  return gulp.src("./src/@(assets)/**/*.@(jpg|jpeg|png)")
    .pipe(gulp.dest("./dist"));
}

function vendorAssets() {
  return gulp.src("./node_modules/highlight.js/styles/atom-one-dark.css")
    .pipe(gulp.dest("./dist/assets/"));
}

function contentResources() {
  return gulp.src("./src/content/**/*.@(jpg|jpeg|png)")
    .pipe(gulp.dest("./dist"));
}

async function contentPages() {
  await buildContent("./src/content", "./dist");
}

const assets = gulp.parallel(assetImages, assetStyles, vendorAssets);
const content = gulp.parallel(contentResources, contentPages);

module.exports = {
  assets,
  default: gulp.parallel(assets, content)
};
