const {ol, pageAnchor, escapeHtml} = require("./bits");

const breadcrumbs = (page, metaIndex) => {
  const breadcrumbs = [];
  for (let i = 0; i <= page._dir.length; i++) {
    const parentUrl = "/" + page._dir.slice(0, i).join("/");
    const parent = metaIndex.pages.find(otherPage => otherPage._dirUrl == parentUrl);
    if (parent) {
      breadcrumbs.push(parent);
    }
  }

  return ol(breadcrumbs.map((page, i) =>
    (i < breadcrumbs.length - 1) ? pageAnchor(page) : escapeHtml(page.title)
  ));
};

module.exports = breadcrumbs;
