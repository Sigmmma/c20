const {wrapper, renderMarkdown, html} = require("./shared");

module.exports = (page, metaIndex) => {
  const htmlDoc = wrapper(page, metaIndex, html`
    ${renderMarkdown(page._md, metaIndex)}
  `);

  const searchDoc = {
    path: page._path,
    title: page.title,
    text: renderMarkdown(page._md, metaIndex, true),
    keywords: (page.keywords || []).join(" ")
  };

  return {htmlDoc, searchDoc};
}
