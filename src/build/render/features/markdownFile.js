const path = require("path");
const fs = require("fs").promises;
const {renderMarkdown, findHeadings} = require("../components");

module.exports = async function(ctx) {
  const mdFileName = ctx.lang == "en" ? "readme.md" : `readme_${ctx.lang}.md`;
  const md = await fs.readFile(path.join(ctx.page.dirPath, mdFileName), "utf8");
  return {
    searchText: renderMarkdown(ctx, md, true),
    html: renderMarkdown(ctx, md),
    headings: findHeadings(md),
  };
};
