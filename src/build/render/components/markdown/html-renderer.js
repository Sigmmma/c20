const marked = require("marked");
const hljs = require("highlight.js");
const {consoleLang, hscLang} = require("./langs/hsc");
const vrmlLang = require("./langs/vrml");
const {heading, alert, figure} = require("../bits");

hljs.registerLanguage("vrml", vrmlLang);
hljs.registerLanguage("hsc", hscLang);
hljs.registerLanguage("console", consoleLang);
hljs.registerLanguage("inittxt", consoleLang);

function highlight(code, language) {
  const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
  return hljs.highlight(validLanguage, code).value;
};

module.exports = function(ctx) {
  //https://marked.js.org/#/USING_PRO.md#renderer
  const renderer = new marked.Renderer();
  const {renderMarkdown} = require("./index");

  renderer.heading = function(text, level) {
    const hN = "h" + level;
    return heading(hN, text);
  };

  renderer.image = (href, title, text) => {
    if (text.startsWith("$figure ")) {
      text = text.substring("$figure ".length);
      return figure(href, renderMarkdown(ctx, text));
    }
    const altAttr = `alt="${text || ""}"`;
    const titleAttr = title ? ` title="${title}"` : "";
    return `<a target="_blank" href="${href}"><img ${altAttr}${titleAttr} src="${href}"/></a>`;
  };

  renderer.code = (code, infostring, escaped) => {
    if (infostring.startsWith("$alert")) {
      const type = infostring.split(" ").length > 1 ? infostring.split(" ")[1] : null;
      return alert(type, renderMarkdown(ctx, code));
    }
    return `<pre><code class="language-${infostring}">${highlight(code, infostring)}</code></pre>`;
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
