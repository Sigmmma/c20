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

const renderMarkdown = (md, metaIndex, plaintext) => {
  if (!md) return null;

  const tokenizer = buildTokenizer(metaIndex);

  return plaintext ?
    entities.decode(marked(md, {...plaintextRenderOptions, tokenizer})) :
    marked(md, {...htmlRenderOptions, tokenizer});
};

module.exports = {renderMarkdown, findHeadings};
