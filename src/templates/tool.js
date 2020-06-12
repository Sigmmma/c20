const {wrapper, renderMarkdown, metabox, alert, html, detailsList} = require("./shared");

module.exports = (page, metaIndex) => {
  const metaboxOpts = {
    ...page,
    metaTitle: `\u{1F527} ${page.title} (tool)`,
    metaClass: "content-tool",
    metaIndex,
    mdSections: page.info ? [{mdBody: page.info}] : [],
    htmlSections: []
  };

  const toolInfo = metaIndex.data.h1.getToolInfo(page._slug) || metaIndex.data.h1.getToolInfo(page.title);
  if (toolInfo) {
    if (toolInfo.authors && toolInfo.authors.length > 0) {
      metaboxOpts.htmlSections.push({
        body: detailsList("Authors", toolInfo.authors)
      });
    }
    if (toolInfo.sources && toolInfo.sources.length > 0) {
      metaboxOpts.htmlSections.push({
        body: detailsList("Source", toolInfo.sources)
      });
    }
  }

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
