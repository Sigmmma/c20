const R = require("ramda");
const yaml = require("js-yaml");
const marked = require("marked");
const hljs = require("highlight.js");
const {consoleLang, hscLang} = require("./langs/hsc");
const vrmlLang = require("./langs/vrml");
const {heading, alert, figure} = require("../bits");
const {structDisplay} = require("../structs");
const {renderTableYaml} = require("../yaml-tables");
const autoAbbreviations = require("./abbreviations");

hljs.registerLanguage("vrml", vrmlLang);
hljs.registerLanguage("hsc", hscLang);
hljs.registerLanguage("console", consoleLang);
hljs.registerLanguage("console-h1a", consoleLang);
hljs.registerLanguage("inittxt", consoleLang);

function highlight(code, language) {
  const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
  return hljs.highlight(validLanguage, code).value;
};

module.exports = function(ctx) {
  //https://marked.js.org/#/USING_PRO.md#renderer
  const renderer = new marked.Renderer();
  const {renderMarkdown} = require("./index");

  const processAbbreviations = (text) => {
    //take all the keywords to replace and make a regex pattern out of them so we can rely on regex precedence
    const replacementPattern = new RegExp(
      `(${
        Object.keys(autoAbbreviations)
          .map(short => short.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
          .join("|")
      })`,
      "g"
    );
    return text.replace(replacementPattern, (short) => {
      const replacement = R.path([short, ctx.lang], autoAbbreviations);
      return replacement ? `<abbr title="${replacement}">${short}</abbr>` : short;
    });
  };

  renderer.text = R.pipe(processAbbreviations, renderer.text);
  renderer.paragraph = R.pipe(processAbbreviations, renderer.paragraph);

  renderer.heading = function(text, level) {
    const hN = "h" + level;
    return heading(hN, text);
  };

  renderer.image = (href, title, text) => {
    if (text.startsWith(".figure ")) {
      text = text.substring(".figure ".length);
      return figure(href, renderMarkdown(ctx, text));
    }
    const altAttr = `alt="${text || ""}"`;
    const titleAttr = title ? ` title="${title}"` : "";
    return `<a target="_blank" href="${href}"><img ${altAttr}${titleAttr} src="${href}"/></a>`;
  };

  renderer.code = (code, infostring, escaped) => {
    const extensionMatch = infostring ? infostring.match(/^\.(\w+)(?:\s+(.+))?/) : null;
    if (extensionMatch) {
      const extensionType = extensionMatch[1];
      const extensionArgs = extensionMatch[2];
      if (extensionType == "alert") {
        return alert(extensionArgs, renderMarkdown(ctx, code));
      } else if (extensionType == "struct") {
        const opts = yaml.load(code);
        //todo: use search terms and headings
        return structDisplay(ctx, opts).html;
      } else if (extensionType == "table") {
        //todo: add support for search terms
        return renderTableYaml(ctx, code);
      }
      throw new Error(`Unrecognized markdown extension: ${extensionType}`);
    }
    return `<pre><code class="language-${infostring || "plaintext"}">${highlight(code, infostring)}</code></pre>`;
  };

  return {
    renderer: renderer,
    highlight,
    pedantic: false,
    headerIds: false, //we'll do it ourselves via custom render
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
  }
};
