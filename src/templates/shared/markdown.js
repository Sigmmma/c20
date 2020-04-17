const markdownIt = require("markdown-it");
const markdownItAnchors = require("markdown-it-anchor");
const markdownItToC = require("markdown-it-table-of-contents");
const hljs = require("highlight.js");

const mdRenderer = markdownIt({
  html: true,
  linkify: true,
  typographer: false,
  breaks: false,
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, code).value;
      } catch (err) {
        console.warn(`Failed to highlight code with language ${lang}`);
      }
    }
    return code;
  }
});

//prevents protocol-less links from being turned into <a>
mdRenderer.linkify.set({
  fuzzyLink: false
});

//anchor options here: https://www.npmjs.com/package/markdown-it-anchor
mdRenderer.use(markdownItAnchors, {
  permalink: true,
  permalinkSymbol: "#"
});

mdRenderer.use(markdownItToC, {
  includeLevel: [1, 2],
  containerHeaderHtml: "<h2 id=\"table-of-contents\">Table of contents</h2>"
});

const renderMarkdown = (md, metaIndex) => {
  return mdRenderer.render(metaIndex ? (md + "\n\n" + metaIndex.mdFooter) : md);
};

module.exports = renderMarkdown;
