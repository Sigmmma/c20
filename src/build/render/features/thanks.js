const R = require("ramda");
const {renderMarkdownInline} = require("../components");

function localizeThanks(ctx, thanks) {
  return R.mapObjIndexed((forLangs, to) => {
    const forMd = forLangs[ctx.lang];
    return forMd ? [renderMarkdownInline(ctx, forMd)] : [];
  }, thanks);
}

module.exports = async function(ctx) {
  const {page, lang} = ctx;
  return {
    thanks: localizeThanks(ctx, R.propOr({}, "thanks", page))
  };
};
