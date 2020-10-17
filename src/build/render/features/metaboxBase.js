const R = require("ramda");

module.exports = async function(ctx) {
  return {
    metaTitle: ctx.page.tryLocalizedTitle(ctx.lang),
    img: ctx.page.img,
    imgCaption: R.path(["imgCaption", ctx.lang], ctx.page),
  };
};
