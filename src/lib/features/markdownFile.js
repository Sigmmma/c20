const {renderMarkdown, findHeadings} = require("../components");

module.exports = function(ctx) {
  const plaintext = renderMarkdown(ctx, ctx.md, true);
  return {
    searchText: plaintext,
    html: renderMarkdown(ctx, ctx.md),
    headings: findHeadings(ctx.md),
    plaintext
  };
};
