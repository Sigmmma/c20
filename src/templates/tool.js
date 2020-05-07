const {wrapper, renderMarkdown, metabox, alert, html} = require("./shared");

module.exports = (page, metaIndex) => {
  const metaboxOpts = {
    ...page,
    metaTitle: `\u{1F527} ${page.title} (tool)`,
    metaColour: "navy",
    metaIndex,
    mdSections: page.info ? [{mdBody: page.info}] : [],
  };

  const htmlDoc = wrapper(page, metaIndex, html`
    ${metabox(metaboxOpts)}
    ${renderMarkdown(page._md, metaIndex)}
  `);

  const searchDoc = {
    path: page._path,
    title: page.title,
    text: renderMarkdown(page._md, metaIndex, true),
    keywords: (page.keywords || []).join(" ")
  };

  return {htmlDoc, searchDoc};
};
