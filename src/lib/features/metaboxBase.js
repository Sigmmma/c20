import * as R from "ramda";
const {renderMarkdown} = require("../components");

module.exports = function(ctx, input) {
  const {lang} = ctx;
  const {page} = input;
  const info = R.path(["info", lang], page);
  return {
    metaTitle: page.tryLocalizedTitle(lang),
    metaSections: info ? [{body: renderMarkdown(ctx, info)}] : undefined,
    img: page.img,
    imgCaption: R.path(["imgCaption", lang], page),
  };
};
