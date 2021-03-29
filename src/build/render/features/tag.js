const R = require("ramda");
const {renderMarkdownInline, structDisplay} = require("../components");

function localizeThanks(ctx, thanks) {
  return R.mapObjIndexed((forLangs, to) => {
    const forMd = forLangs[ctx.lang];
    return forMd ? [renderMarkdownInline(ctx, forMd)] : [];
  }, thanks);
}

module.exports = async function(ctx) {
  const {lang, page} = ctx;
  if (!page.tagName) {
    return {};
  }

  const tagNameArg = page.tagName.split("/");
  const game = tagNameArg.length > 1 ? tagNameArg[0] : "h1";
  const tagName = tagNameArg.length > 1 ? tagNameArg[1] : tagNameArg[0];

  // const bodyHtml = structDisplay(ctx, {
  //   ...(ctx.data[game].tags[tagName]),
  //   id: "tag-struct",
  //   show_offsets: true,
  // });

  return {
    // keywords: [tag.id],
    // html: bodyHtml,
    // headings,
    // metaSections,
    // searchText,
    // metaTitle: `\u{1F3F7} Tag: ${tagName} (${engineId})`,
    // metaClass: "content-tag",
    // thanks: localizeThanks(ctx, ctx.data[game].tagThanks)
  };
};
