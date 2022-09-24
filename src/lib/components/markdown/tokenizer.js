const marked = require("marked");

function buildTokenizer(ctx) {
  const tokenizer = new marked.Tokenizer();

  //customized reflink from https://github.com/markedjs/marked/blob/master/src/Tokenizer.js
  tokenizer.reflink = (src, links) => {
    let cap;
    if ((cap = tokenizer.rules.inline.reflink.exec(src)) || (cap = tokenizer.rules.inline.nolink.exec(src))) {
      const raw = cap[0];
      const linkKey = (cap[2] || cap[1]).replace(/\s+/g, " ").toLowerCase();

      //first try looking up a link definition in the local markdown
      let link = links[linkKey];
      if (!link || !link.href) {
        //next, we can try searching the page index for a matching page
        const parts = linkKey.split("#");
        const page = ctx.resolvePage(parts[0]);
        link = {
          href: page.tryLocalizedPath(ctx.lang, parts[1]),
          title: page.tryLocalizedTitle(ctx.lang)
        };
      }

      const title = link.title ? tokenizer.escape(link.title) : null;
      const text = cap[1].replace(/\\([\[\]])/g, "$1");

      if (cap[0].charAt(0) !== '!') {
        return {
          type: "link",
          raw,
          href: link.href,
          title,
          text
        };
      } else {
        return {
          type: "image",
          raw,
          href: link.href,
          title,
          text: tokenizer.escape(text)
        };
      }
    }
  };

  return tokenizer;
}

module.exports = buildTokenizer;
