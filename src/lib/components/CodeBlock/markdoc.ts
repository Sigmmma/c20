const mdLang = require("highlight.js/lib/languages/markdown");

// monkey patch markdoc tags into highlight.js's markdown lang
const markdocLang = (hljs) => {
  const md = mdLang(hljs);
  const TAG = {
    className: 'symbol',
    begin: '\\{%',
    // it just so happens that markdoc tag parameters parse well as JS
    subLanguage: "js",
    end: '/?%\\}'
  };
  const FRONT = {
    className: 'symbol',
    begin: '\\-\\-\\-\\ntitle',
    subLanguage: "yml",
    end: '\\-\\-\\-'
  };
  md.contains.unshift(FRONT);
  md.contains.push(TAG);
  return md;
};

export default markdocLang;