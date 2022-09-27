const {html, anchor} = require("./bits");

function renderChildList(ctx) {
  const list = ctx.children;
  if (!list) return {searchTerms: [], html: null};

  const searchTerms = [];
  for (childPage of list) {
    searchTerms.push(childPage.title);
  }

  htmlResult = html`
    <ul>
      ${list.map((childPage) => {
        return html`<li>${anchor(childPage.url, childPage.title)}</li>`;
      })}
    </ul>
  `;
  return {searchTerms, html: htmlResult};
}

module.exports = {renderChildList};