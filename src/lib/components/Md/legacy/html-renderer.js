import * as R from "ramda";
const yaml = require("js-yaml");
const marked = require("marked");
const htmlparser2 = require("htmlparser2");
const {heading, alert, figure, video} = require("../../bits");
const {structDisplay} = require("../../structs");
const {renderTableYaml} = require("../../DataTable/DataTable");
const autoAbbreviations = require("./abbreviations");
const {renderDisambiguationList} = require("../../disambiguation-list");
const {renderChildList} = require("../../child-list");
import highlight from "../../CodeBlock/highlight";

module.exports = function(ctx) {
  //https://marked.js.org/#/USING_PRO.md#renderer
  const renderer = new marked.Renderer();
  const {renderMarkdown} = require("./index");

  const processPageName = (text) => {
    text = text.replace(".c20:pageName", ctx.title || "Untitled");
    return text.replace(".c20:pathTail",  ctx.logicalPath[ctx.logicalPath.length - 1]);
  }

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

  renderer.text = R.pipe(processPageName, processAbbreviations, renderer.text);
  renderer.paragraph = R.pipe(processAbbreviations, renderer.paragraph);

  renderer.heading = function(text, level) {
    /* text is already rendered to HTML at this point, including HTML
     * entities in place of characters like ' and <. We don't want those
     * slugified so we extract the text from the heading. This also means no
     * formatting/links in headings is supported but it's not really our
     * style anyway.
     */
    let parsedText = "";
    const parser = new htmlparser2.Parser({
      ontext: part => parsedText += part
    });
    parser.write(text);
    parser.end();
    const hN = "h" + level;
    return heading(hN, parsedText);
  };

  renderer.image = (href, title, text) => {
    if (href.endsWith(".mp4")) {
      const poster = href.replace(".mp4", ".thumb_1.jpg");
      return video(href, poster);
    }

    if (text.startsWith(".figure ")) {
      text = text.substring(".figure ".length);
      return figure(href, renderMarkdown(ctx, text));
    } else if (text.startsWith(".inline-figure ")) {
      text = text.substring(".inline-figure ".length);
      return figure(href, renderMarkdown(ctx, text), true);
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
        return structDisplay(ctx, opts).html;
      } else if (extensionType == "table") {
        // return renderTableYaml(ctx, code).html;
        return "";
      } else if (extensionType == "c20") {
        if (extensionArgs == "disambiguation-list") {
          return renderDisambiguationList(ctx).html;
        } else if (extensionArgs == "child-list") {
          return renderChildList(ctx).html;
        }
        throw new Error(`Unrecognized c20 utility extension: ${extensionArgs}`);
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
