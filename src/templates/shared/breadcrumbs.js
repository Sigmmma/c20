const {ol, pageAnchor, escapeHtml} = require("./bits");

const HOME_TITLE_OVERRIDE = "Home";

const breadcrumbs = (page, metaIndex) => {
  const breadcrumbs = [];
  let currPage = page;

  while (currPage) {
    breadcrumbs.push(currPage._parent ? currPage : {...currPage, title: HOME_TITLE_OVERRIDE});
    currPage = currPage._parent;
  }

  if (breadcrumbs.length < 2) {
    return null;
  }

  return ol(breadcrumbs.reverse().map((crumbPage, i) =>
    (i < breadcrumbs.length - 1) ? pageAnchor(crumbPage) : escapeHtml(crumbPage.title)
  ));
};

module.exports = breadcrumbs;
