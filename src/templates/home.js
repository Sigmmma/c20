const {wrapper, ul, pageAnchor, renderMarkdown, html} = require("./shared");

module.exports = (page, metaIndex) => wrapper(page, metaIndex, html`
  ${renderMarkdown(page._md, metaIndex)}
  ${ul(metaIndex.pages.map((page) => pageAnchor(page)))}
`);
