const {html} = require("common-tags");
const {wrapper, renderMarkdown, metabox, alert} = require("./shared");

module.exports = (page, metaIndex) => {
  return wrapper(page, metaIndex, html`
    ${metabox(`\u{1F527} ${page.title} (tool)`, page, "navy", metaIndex.mdFooter)}
    ${renderMarkdown(page._md, metaIndex.mdFooter)}
  `);
};
