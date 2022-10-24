import {type BuildOpts} from "../build";
import path from "path";
import fs from "fs";
import MiniSearch from "minisearch";
import * as R from "ramda";

/* These words are too common to provide any real search value. Ignoring them
 * improves search relevancy and reduces the index filesize. Use lowercase.
 */
const STOP_WORDS = {
  en: new Set([
    "halo", "and", "or", "not", "to", "from", "at", "in", "a", "the", "be", "are",
    "is", "as", "its", "it", "this", "that", "these", "any", "e", "g", "for", "of",
	  "on", "with", "you", "do", "but", "by", "an", "will", "all", "would", "we",
    "our"
  ]),
  es: new Set([
    "halo", "y", "o", "no", "a", "de", "en", "una", "uno", "la", "el", "ser",
    "son", "es", "como", "sus", "está", "eso", "esta", "ese", "esa", "estas",
    "estos", "alguna", "alguno", "p", "ej", "por"
  ])
};

export type SearchDoc = {
  lang: string;
  path: string;
  title: string;
  text: string;
  keywords: string;
};

export function buildSearchIndex(searchDocs: SearchDoc[]) {
  //build a search index per-language
  const searchIndexes = {};
  searchDocs.forEach(searchDoc => {
    if (!searchIndexes[searchDoc.lang]) {
      searchIndexes[searchDoc.lang] = new MiniSearch({
        idField: "path",
        fields: ["title", "text", "keywords"],
        storeFields: ["title"],
        tokenize: (string, _fieldName) => {
          //customize tokenizer to allow underscores in token
          return string.split(/[\s\-\."'!?,;:\[\]\(\)\|\\><]+/);
        },
        processTerm: (term, _fieldName) => {
          term = term.toLowerCase();
          return STOP_WORDS[searchDoc.lang].has(term) ? null : term;
        },
        searchOptions: {
          boost: {title: 3, keywords: 2},
          fuzzy: 0.2
        }
      });
    }
    searchIndexes[searchDoc.lang].add(searchDoc);
  });
  return R.map((index) => JSON.stringify(index.toJSON()), searchIndexes);
}

//write each language's search index to JSON so it can be loaded in the user's browser
export async function buildAndWriteSearchIndex(searchDocs: SearchDoc[], buildOpts: BuildOpts) {
  const searchIndexes = buildSearchIndex(searchDocs);
  await fs.promises.mkdir(path.join(buildOpts.outputDir, "assets"), {recursive: true});
  await Promise.all(Object.entries(searchIndexes).map(async ([lang, jsonIndex]: [string, any]) => {
    await fs.promises.writeFile(path.join(buildOpts.outputDir, "assets", `search-index_${lang}.json`), jsonIndex, "utf8");
  }));
}
