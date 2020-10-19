const {ol, anchor, escapeHtml, localizer} = require("../bits");

const homeTitleOverride = {
  en: "Home",
  es: "Página principal"
};

const breadcrumbs = (ctx) => {
  const breadcrumbs = [];
  let currPage = ctx.page;

  while (currPage) {
    breadcrumbs.push(currPage);
    currPage = currPage.parent;
  }

  if (breadcrumbs.length < 2) {
    return null;
  }

  return ol(breadcrumbs.reverse().map((crumbPage, i) => {
    //the homepage gets a special title to avoid repetition with the header
    const crumbPageTitle = crumbPage.parent ?
      escapeHtml(crumbPage.tryLocalizedTitle(ctx.lang)) :
      homeTitleOverride[ctx.lang];
    //the current page is not a link
    return (i < breadcrumbs.length - 1) ?
      anchor(crumbPage.tryLocalizedPath(ctx.lang), crumbPageTitle) :
      crumbPageTitle;
  }));
};

module.exports = breadcrumbs;
