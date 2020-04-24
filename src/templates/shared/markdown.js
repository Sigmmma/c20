const marked = require("marked");
const hljs = require("highlight.js");
const {slugify} = require("./bits");

//https://marked.js.org/#/USING_PRO.md#renderer
const renderer = new marked.Renderer();

renderer.heading = function(text, level) {
  const hN = "h" + level;
  const slug = slugify(text);
  const anchorLink = `<a class="header-anchor" href="#${slug}">#</a>`;
  return `<${hN} id="${slug}">${text}${anchorLink}</${hN}>`;
};

marked.setOptions({
  renderer,
  highlight: function(code, language) {
    //clojure provides good highlighting for haloscript
    if (language == "hsc") {
      language = "clojure";
    }
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
    return hljs.highlight(validLanguage, code).value;
  },
  pedantic: false,
  headerIds: false, //we'll do it ourselves via custom render
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
});

const walk = (tokens, type, cb) => {
  if (tokens) {
    tokens.forEach((token) => {
      if (!type || token.type == type) {
        cb(token);
      }
      walk(token.tokens);
    });
  }
};

const findHeaders = (mdSrc) => {
  const tokens = marked.lexer(mdSrc);
  const headers = [];

  walk(tokens, "heading", (headingToken) => {
    let title = headingToken.text;
    headers.push({
      title,
      id: slugify(title),
      level: headingToken.depth
    });
  });

  return headers;
};

const renderMarkdown = (md, metaIndex) => {
  const mdSrc = metaIndex ? (md + "\n\n" + metaIndex.mdFooter) : md;
  return marked(mdSrc);
};

module.exports = {
  findHeaders,
  renderMarkdown
};
