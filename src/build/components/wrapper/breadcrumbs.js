const {ol, pageAnchor, escapeHtml, localizer} = require("../bits");

const homeTitleOverride = {
  en: "Home",
  es: "Página principal"
};

const breadcrumbs = (ctx) => {
  const breadcrumbs = [];
  let currPage = ctx.page;

  while (currPage) {
    breadcrumbs.push(currPage.parent ? currPage : {...currPage, title: homeTitleOverride});
    currPage = currPage.parent;
  }

  if (breadcrumbs.length < 2) {
    return null;
  }

  return ol(breadcrumbs.reverse().map((crumbPage, i) =>
    (i < breadcrumbs.length - 1) ? pageAnchor(ctx.lang, crumbPage) : escapeHtml(crumbPage.tryLocalizedTitle(ctx.lang))
  ));
};

module.exports = breadcrumbs;
