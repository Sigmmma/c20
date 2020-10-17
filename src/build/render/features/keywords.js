const R = require("ramda");

module.exports = async function({page, lang}) {
  return {
    keywords: [
      page.slug[lang],
      ...R.pathOr([], ["keywords", lang], page)
    ]
  };
};
