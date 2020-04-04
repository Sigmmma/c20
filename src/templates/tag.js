const {html} = require("common-tags");
const {wrapper, renderMarkdown, metabox, alert} = require("./shared");

module.exports = (page, metaIndex) => {
  const tagNameFull = page._dir[page._dir.length - 1];
  const invaderSrcReference = `https://github.com/Kavawuvi/invader/blob/master/src/tag/hek/definition/${tagNameFull}.json`;

  return wrapper(page, metaIndex, html`
    ${metabox(`\u{1F3F7} ${tagNameFull} (tag)`, page, "#530000", metaIndex.mdFooter)}
    ${renderMarkdown(page._md, metaIndex.mdFooter)}
    <h1 id="struct">Tag structure</h1>
    ${alert({type: "info", body: html`
      <p>
        Tag structures are not yet built into this wiki, but you can find a reference for this tag in
        <a href="${invaderSrcReference}">Invader's source</a>.
      </p>
    `})}
  `);
};
