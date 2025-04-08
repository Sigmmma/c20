import MiniSearch from "minisearch";

/* These words are too common to provide any real search value. Ignoring them
 * improves search relevancy and reduces the index filesize. Use lowercase.
 */
const STOP_WORDS = {
  en: new Set([
    "halo", "and", "or", "not", "to", "from", "at", "in", "a", "the", "be", "are",
    "is", "as", "its", "it", "this", "that", "these", "any", "e", "g", "for", "of",
    "on", "with", "you", "do", "but", "by", "an", "will", "all", "would", "we",
    "our", "so", "an"
  ]),
};

export type SearchDoc = {
  path: string;
  title: string;
  text: string;
  keywords: string;
};

export function buildSearchIndexJson(searchDocs: SearchDoc[]): string {
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
      return STOP_WORDS.en.has(term) ? null : term;
    },
    searchOptions: {
      boost: {title: 3, keywords: 2},
      fuzzy: 0.2
    }
  });

  searchDocs.forEach(searchDoc => {
    searchIndex.add(searchDoc);
  });

  return JSON.stringify(searchIndex.toJSON());
}