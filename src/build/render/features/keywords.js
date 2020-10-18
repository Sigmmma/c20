const R = require("ramda");

module.exports = async function({page, lang}) {
  return {
    keywords: [
      page.tryLocalizedSlug(lang),
      ...R.pathOr([], ["keywords", lang], page)
    ]
  };
};
