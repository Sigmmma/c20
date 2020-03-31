const {html} = require("common-tags");
const {wrapper, renderMarkdown, metabox} = require("./shared");

module.exports = (page, metaIndex) => wrapper({
  page,
  metaIndex,
  body: html`
    <h1>${page.title}</h1>
    ${metabox(page, "#530000", metaIndex.mdFooter)}
    ${renderMarkdown(page._md, metaIndex.mdFooter)}
    <h2 id="struct">Tag structure</h2>
    <p>(todo)</p>
  `
});
