const marked = require("marked");

const renderer = new marked.Renderer();
//inline:
renderer.strong = (text) => text;
renderer.em = (text) => text;
renderer.codespan = (code) => code;
renderer.br = () => "\n";
renderer.del = (text) => text;
renderer.link = (href, title, text) => text;
renderer.image = (href, title, text) => `(${title})`;
renderer.text = (text) => text;
//blocks:
renderer.code = (code, infostring, escaped) => `\n${code}\n`;
renderer.blockquote = (quote) => `\n${quote}\n`;
renderer.html = (html) => "";
renderer.heading = (text, level, raw, slugger) => `\n${text.toUpperCase()}\n\n`;
renderer.hr = () => "---\n";
renderer.list = (body, ordered, start) => `\n${body}\n`;
renderer.listitem = (text, task, checked) => `- ${text}\n`;
renderer.checkbox = (checked) => `[${checked ? "X" : " "}]\n`;
renderer.paragraph = (text) => `${text}\n`;
renderer.table = (header, body) => `${header}\n${body}\n`;
renderer.tablerow = (content) => `${content}|\n`;
renderer.tablecell = (content, flags) => `|${content}`;

module.exports = function(ctx) {
  return {
    renderer: renderer,
    pedantic: false,
    headerIds: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
  };
};
