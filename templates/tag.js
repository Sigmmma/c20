const {html} = require("common-tags");
const {wrapper, renderMarkdown} = require("./shared");

module.exports = (page, metaIndex) => wrapper({
  page,
  metaIndex,
  body: html`
    <h1>${page.title}</h1>
    ${renderMarkdown(page._md, metaIndex.mdFooter)}
    <h2 id="struct">Tag structure</h2>
    <p>(todo)</p>
  `
});
