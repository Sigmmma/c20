const {wrapper, renderMarkdown, html, ul} = require("./shared");

module.exports = (page, metaIndex) => {
  let allThanks = new Set();

  for (let page of metaIndex.pages) {
    for (let thank of (page.thanks || [])) {
      if (thank.to) {
        allThanks.add(thank.to);
      }
    }
  }

  for (let thank of metaIndex.data.thanks) {
    if (thank.to) {
      allThanks.add(thank.to);
    }
  }

  //convert to an array and sort alphabetically
  allThanks = [...allThanks];
  allThanks.sort((a, b) => a.localeCompare(b));

  const htmlDoc = wrapper(page, metaIndex, html`
    ${renderMarkdown(page._md, metaIndex)}
    <h2>Thank you!</h2>
    ${ul(allThanks)}
  `);

  const searchDoc = {
    path: page._path,
    title: page.title,
    text: renderMarkdown(page._md, metaIndex, true),
    keywords: (page.keywords || []).join(" ")
  };

  return {htmlDoc, searchDoc};
}
