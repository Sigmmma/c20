const MiniSearch = require("minisearch");

/* These words are too common to provide any real search value. Ignoring them
 * improves search relevancy and reduces the index filesize. Use lowercase.
 */
const STOP_WORDS = {
  en: new Set(["halo", "and", "or", "not", "to", "at", "in", "a", "the", "be", "are", "is", "as", "its", "it", "this", "these", "any", "e", "g"]),
  es: new Set(["halo"]) //todo
};

//todo
function buildSearchIndex() {
  const searchIndex = new MiniSearch({
    idField: "path",
    fields: ["title", "text", "keywords"],
    storeFields: ["title"],
    tokenize: (string, _fieldName) => {
      //customize tokenizer to allow underscores in token
      return string.split(/[\s\-\."'!?,;:\[\]\(\)\|\\><]+/);
    },
    processTerm: (term, _fieldName) => {
      term = term.toLowerCase();
      return STOP_WORDS_EN.has(term) ? null : term;
    },
    searchOptions: {
      boost: {title: 3, keywords: 2},
      fuzzy: 0.2
    }
  });
  searchIndex.addAll(searchDocs);
  const jsonIndex = JSON.stringify(searchIndex.toJSON());
  await fs.writeFile(path.join(buildOpts.outputDir, "assets", "search-index.json"), jsonIndex, "utf8");
}
