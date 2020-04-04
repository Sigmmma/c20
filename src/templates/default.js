const {html} = require("common-tags");
const {wrapper, renderMarkdown} = require("./shared");

module.exports = (page, metaIndex) => wrapper(page, metaIndex, html`
  ${renderMarkdown(page._md, metaIndex.mdFooter)}
`);
