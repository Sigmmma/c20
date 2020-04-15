const {wrapper, renderMarkdown, html} = require("./shared");

module.exports = (page, metaIndex) => wrapper(page, metaIndex, html`
  ${renderMarkdown(page._md, metaIndex)}
`);
