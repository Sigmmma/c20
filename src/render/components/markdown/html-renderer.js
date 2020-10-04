const marked = require("marked");
const hljs = require("highlight.js");
const {consoleLang, hscLang} = require("./langs/hsc");
const vrmlLang = require("./langs/vrml");
const {heading} = require("../bits");

hljs.registerLanguage("vrml", vrmlLang);
hljs.registerLanguage("hsc", hscLang);
hljs.registerLanguage("console", consoleLang);
hljs.registerLanguage("inittxt", consoleLang);

//https://marked.js.org/#/USING_PRO.md#renderer
const renderer = new marked.Renderer();

renderer.heading = function(text, level) {
  const hN = "h" + level;
  return heading(hN, text);
};

module.exports = {
  renderer: renderer,
  highlight: function(code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
    return hljs.highlight(validLanguage, code).value;
  },
  pedantic: false,
  headerIds: false, //we'll do it ourselves via custom render
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
};
