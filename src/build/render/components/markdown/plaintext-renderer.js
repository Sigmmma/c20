const R = require("ramda");
const marked = require("marked");
const yaml = require("js-yaml");
const {structDisplay} = require("../structs");
const {renderTableYaml} = require("../yaml-tables");
const {renderDisambiguationList} = require("../disambiguation-list");

module.exports = function(ctx) {
  const renderer = new marked.Renderer();
  const {renderMarkdown} = require("./index");

  const processPageName = (text) => {
    text = text.replace(".c20:pageName", ctx.page.title[ctx.lang]);
    return text.replace(".c20:pathTail",  ctx.page.logicalPath[ctx.page.logicalPath.length - 1]);
  }
  renderer.text = R.pipe(processPageName, renderer.text);

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
  renderer.code = (code, infostring, escaped) => {
    const extensionMatch = infostring ? infostring.match(/^\.(\w+)(?:\s+(.+))?/) : null;
    if (extensionMatch) {
      const extensionType = extensionMatch[1];
      const extensionArgs = extensionMatch[2];
      if (extensionType == "alert") {
        return renderMarkdown(ctx, code, true);
      } else if (extensionType == "struct") {
        const opts = yaml.load(code);
        return structDisplay(ctx, opts).searchTerms.join(" ");
      } else if (extensionType == "table") {
        return renderTableYaml(ctx, code).searchTerms.join(" ");
      } else if (extensionType == "c20") {
        if (extensionArgs == "disambiguation-list")
          return renderDisambiguationList(ctx).searchTerms.join(" ");
      }
    }
    return `\n${code}\n`;
  };
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
