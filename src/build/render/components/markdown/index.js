const marked = require("marked");
const Entities = require('html-entities').AllHtmlEntities;
const {slugify} = require("../bits");
const buildTokenizer = require("./tokenizer");
const plaintextRenderOptions = require("./plaintext-renderer");
const htmlRenderOptions = require("./html-renderer");

const entities = new Entities();

const walk = (tokens, type, cb) => {
  if (tokens && typeof tokens[Symbol.iterator] === "function") {
    tokens.forEach((token) => {
      if (!type || token.type == type) {
        cb(token);
      }
      walk(token.tokens, type, cb);
    });
  }
};

const findHeadings = (mdSrc) => {
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

//renders full markdown texts intended to contain paragraphs
function renderMarkdown(ctx, md, plaintext) {
  if (!md) return null;
  const tokenizer = buildTokenizer(ctx);
  return plaintext ?
    entities.decode(marked(md, {...plaintextRenderOptions, tokenizer})) :
    marked(md, {...htmlRenderOptions, tokenizer});
}

//renders markdown fragments as inline content rather than as a paragraph
function renderMarkdownInline(ctx, md, plaintext) {
  if (!md) return null;
  const tokenizer = buildTokenizer(ctx);
  return plaintext ?
    entities.decode(marked.parseInline(md, {...plaintextRenderOptions, tokenizer})) :
    marked.parseInline(md, {...htmlRenderOptions, tokenizer});
}

module.exports = {renderMarkdown, renderMarkdownInline, findHeadings};
