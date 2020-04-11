const {html} = require("common-tags");
const {wrapper, ul, pageAnchor, renderMarkdown} = require("./shared");

module.exports = (page, metaIndex) => wrapper(page, metaIndex, html`
  ${renderMarkdown(page._md, metaIndex)}
  ${ul(metaIndex.pages.map((page) => pageAnchor(page)))}
`);
