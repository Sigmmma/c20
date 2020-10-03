const marked = require("marked");
const hljs = require("highlight.js");
const Entities = require('html-entities').AllHtmlEntities;
const {slugify, heading} = require("./bits");
const hscLangs = require("./langs/hsc");
const vrmlLang = require("./langs/vrml");

const entities = new Entities();

hljs.registerLanguage("vrml", vrmlLang);
hljs.registerLanguage("hsc", hscLangs(false));
hljs.registerLanguage("console", hscLangs(true));
hljs.registerLanguage("inittxt", hscLangs(true));

//https://marked.js.org/#/USING_PRO.md#renderer
const htmlRenderer = new marked.Renderer();

htmlRenderer.heading = function(text, level) {
  const hN = "h" + level;
  return heading(hN, text);
};

const htmlRenderOptions = {
  renderer: htmlRenderer,
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

const plaintextRenderer = new marked.Renderer();
//inline:
plaintextRenderer.strong = (text) => text;
plaintextRenderer.em = (text) => text;
plaintextRenderer.codespan = (code) => code;
plaintextRenderer.br = () => "\n";
plaintextRenderer.del = (text) => text;
plaintextRenderer.link = (href, title, text) => text;
plaintextRenderer.image = (href, title, text) => `(${title})`;
plaintextRenderer.text = (text) => text;
//blocks:
plaintextRenderer.code = (code, infostring, escaped) => `\n${code}\n`;
plaintextRenderer.blockquote = (quote) => `\n${quote}\n`;
plaintextRenderer.html = (html) => "";
plaintextRenderer.heading = (text, level, raw, slugger) => `\n${text.toUpperCase()}\n\n`;
plaintextRenderer.hr = () => "---\n";
plaintextRenderer.list = (body, ordered, start) => `\n${body}\n`;
plaintextRenderer.listitem = (text, task, checked) => `- ${text}\n`;
plaintextRenderer.checkbox = (checked) => `[${checked ? "X" : " "}]\n`;
plaintextRenderer.paragraph = (text) => `${text}\n`;
plaintextRenderer.table = (header, body) => `${header}\n${body}\n`;
plaintextRenderer.tablerow = (content) => `${content}|\n`;
plaintextRenderer.tablecell = (content, flags) => `|${content}`;

const plaintextRenderOptions = {
  renderer: plaintextRenderer,
  pedantic: false,
  headerIds: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
};

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

const renderMarkdown = (md, metaIndex, plaintext) => {
  if (!md) return null;
  const mdSrc = metaIndex ? (md + "\n\n" + metaIndex.mdFooter) : md;
  return plaintext ?
    entities.decode(marked(mdSrc, plaintextRenderOptions)) :
    marked(mdSrc, htmlRenderOptions);
};

module.exports = {renderMarkdown, findHeaders};
