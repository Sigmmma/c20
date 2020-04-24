const {ol, pageAnchor, escapeHtml} = require("./bits");

const breadcrumbs = (page, metaIndex) => {
  const breadcrumbs = [page];
  let currPage = page;

  while (currPage._parent) {
    breadcrumbs.push(currPage._parent);
    currPage = currPage._parent;
  }

  return ol(breadcrumbs.reverse().map((crumbPage, i) =>
    (i < breadcrumbs.length - 1) ? pageAnchor(crumbPage) : escapeHtml(crumbPage.title)
  ));
};

module.exports = breadcrumbs;
