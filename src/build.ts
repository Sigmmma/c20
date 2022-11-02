import fs from "fs";
import path from "path";
// SPOOPY BUG: do not reorder the next two lines!!!!!
import renderPage from "./lib/render/render";
import {getPageBaseDir, loadPageIndex, pageIdToLogical, type PageIndex} from "./lib/content";
import {loadYamlTree} from "./lib/utils/files";
import {buildAndWriteSearchIndex, type SearchDoc} from "./lib/search";
import buildResources from "./lib/resources";
import { buildSitemap } from "./lib/sitemap";
import { buildAndWriteRedirects } from "./lib/redirects";
const loadStructuredData = require("./data");

export type BuildOpts = {
  contentDir: string;
  outputDir: string;
  baseUrl: string;
  noThumbs?: boolean;
};

async function renderPages(pageIndex: PageIndex, globalData: any, buildOpts: BuildOpts): Promise<SearchDoc[]> {
  //for all pages, and for all of their languages...
  const searchDocs = await Promise.all(Object.entries(pageIndex).flatMap(([pageId, pageDataByLang]) => {
    return Object.entries(pageDataByLang).map(async ([lang, pageData]) => {
      const baseDir = getPageBaseDir(pageId, buildOpts);
      const outputDir = path.join(buildOpts.outputDir, ...pageIdToLogical(pageId));
      const outputFileName = path.join(outputDir, lang == "en" ? "index.html" : `${lang}.html`);
      const localData = await loadYamlTree(baseDir, {nonRecursive: true});

      //render the page to HTML and also gather search index data
      const renderOutput = renderPage({
        baseUrl: buildOpts.baseUrl,
        noThumbs: buildOpts.noThumbs,
        preloadSearch: true,
        debug: !!process.env.C20_DEBUG,
        pageId: pageId,
        lang,
        ast: pageData.ast,
        front: pageData.front,
        localData,
        globalData,
        pageIndex,
      });

      await fs.promises.mkdir(outputDir, {recursive: true});
      await fs.promises.writeFile(outputFileName, renderOutput.htmlDoc, "utf8");
      return pageData.front.noSearch ? null : renderOutput.searchDoc;
    });
  }));
  //return all search docs so they can be written to a single file (for this lang)
  return searchDocs.filter(it => it != null) as SearchDoc[];
}

export default async function buildContent(buildOpts: BuildOpts) {
  const data = loadStructuredData();
  const pageIndex = loadPageIndex(buildOpts.contentDir);

  await Promise.all([
    buildResources(await pageIndex, buildOpts),
    renderPages(await pageIndex, await data, buildOpts)
      .then(searchDocs => buildAndWriteSearchIndex(searchDocs, buildOpts)),
    buildSitemap(await pageIndex, buildOpts),
    buildAndWriteRedirects(await pageIndex, buildOpts)
  ]);
}