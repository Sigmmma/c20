const {ol, anchor, escapeHtml, localizer} = require("../bits");

const homeTitleOverride = {
  en: "Home",
  es: "Página principal"
};

const breadcrumbs = (ctx) => {
  const breadcrumbs = [];
  let currPage = ctx.page;

  while (currPage.parent) {
    currPage = currPage.parent;
    breadcrumbs.push(currPage);
  }

  if (breadcrumbs.length == 0) {
    return null;
  }

  return ol(breadcrumbs.reverse().map((crumbPage) => {
    //the homepage gets a special title to avoid repetition with the header
    const crumbPageTitle = crumbPage.parent ?
      escapeHtml(crumbPage.tryLocalizedTitle(ctx.lang)) :
      homeTitleOverride[ctx.lang];
    return anchor(crumbPage.tryLocalizedPath(ctx.lang), crumbPageTitle);
  }));
};

module.exports = breadcrumbs;
