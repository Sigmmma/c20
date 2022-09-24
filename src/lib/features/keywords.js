const R = require("ramda");

module.exports = function({page, lang}) {
  return {
    keywords: [
      page.tryLocalizedSlug(lang),
      ...R.pathOr([], ["keywords", lang], page)
    ]
  };
};
