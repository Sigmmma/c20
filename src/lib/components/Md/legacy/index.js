const marked = require("marked");
const Entities = require('html-entities').AllHtmlEntities;
import {slugify} from "../../../utils/strings";
const buildTokenizer = require("./tokenizer");
const plaintextRender = require("./plaintext-renderer");
const htmlRenderer = require("./html-renderer");

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
    entities.decode(marked(md, {...plaintextRender(ctx), tokenizer})) :
    marked(md, {...htmlRenderer(ctx), tokenizer});
}

//renders markdown fragments as inline content rather than as a paragraph
function renderMarkdownInline(ctx, md, plaintext) {
  if (!md) return null;
  const tokenizer = buildTokenizer(ctx);
  return plaintext ?
    entities.decode(marked.parseInline(md, {...plaintextRender(ctx), tokenizer})) :
    marked.parseInline(md, {...htmlRenderer(ctx), tokenizer});
}

module.exports = {renderMarkdown, renderMarkdownInline, findHeadings};
