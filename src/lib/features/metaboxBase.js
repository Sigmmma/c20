const R = require("ramda");
const {renderMarkdown} = require("../components");

module.exports = function(ctx) {
  const {lang, page} = ctx;
  const info = R.path(["info", lang], page);
  return {
    metaTitle: page.tryLocalizedTitle(lang),
    metaSections: info ? [{body: renderMarkdown(ctx, info)}] : undefined,
    img: page.img,
    imgCaption: R.path(["imgCaption", lang], page),
  };
};
