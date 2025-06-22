import fs from "fs";
import path from "path";
// SPOOPY BUG: do not reorder the next two lines!!!!!
import renderPage from "./lib/render";
import {buildPageIndex, pageIdToLogical, type PageIndex, PageId, ParsedPage} from "./lib/content/pages";
import {loadYamlTree} from "./lib/utils/files";
import {buildSearchIndexJson, SearchDoc} from "./lib/search";
import buildResources from "./lib/resources";
import {buildSitemap} from "./lib/sitemap";
import {buildAndWriteRedirects} from "./lib/redirects";
import loadStructuredData from "./data";
import {getPageBaseDir, loadParsedPages} from "./lib/content/content-files";

export type BuildOpts = {
  contentDir: string;
  outputDir: string;
  baseUrl: string;
  noThumbs?: boolean;
};

export default async function buildContent(buildOpts: BuildOpts) {
  const data = loadStructuredData();
  const parsedPages = loadParsedPages(buildOpts.contentDir);
  const pageIndex = buildPageIndex(await parsedPages);

  await Promise.all([
    buildResources(Object.keys(await parsedPages), buildOpts),
    renderPages(await parsedPages, pageIndex, await data, buildOpts)
      .then(({searchDocs}) => Promise.all([
        buildAndWriteSearchIndex(searchDocs, buildOpts),
        writePageIndex(pageIndex, buildOpts),
      ])),
    buildSitemap(pageIndex, buildOpts),
    buildAndWriteRedirects(await parsedPages, buildOpts)
  ]);
}

async function renderPages(parsedPages: Record<PageId, ParsedPage>, pageIndex: PageIndex, globalData: any, buildOpts: BuildOpts): Promise<{searchDocs: SearchDoc[]}> {
  const searchDocs: SearchDoc[] = [];

  //build all pages, outputting their search docs
  await Promise.all(Object.entries(parsedPages).map(async ([pageId, parsedPage]) => {
    const baseDir = getPageBaseDir(pageId, buildOpts);
    const outputDir = path.join(buildOpts.outputDir, ...pageIdToLogical(pageId));
    const outputFileName = path.join(outputDir, "index.html");
    const localData = loadYamlTree(baseDir, {nonRecursive: true});

    //render the page to HTML and also gather search index data
    const {htmlDoc, searchDoc} = renderPage({
      lang: "en",
      baseUrl: buildOpts.baseUrl,
      noThumbs: buildOpts.noThumbs,
      preloadJson: true,
      pageId: pageId,
      ast: parsedPage.ast,
      front: parsedPage.front,
      localData: await localData,
      globalData,
      pageIndex,
    });

    await fs.promises.mkdir(outputDir, {recursive: true});
    await fs.promises.writeFile(outputFileName, htmlDoc, "utf8");
    if (!parsedPage.front.stub && searchDoc) {
      searchDocs.push(searchDoc);
    }
  }));

  return {searchDocs};
}

async function writePageIndex(pageIndex: PageIndex, buildOpts: BuildOpts) {
  await fs.promises.mkdir(path.join(buildOpts.outputDir, "assets"), {recursive: true});
  await fs.promises.writeFile(path.join(buildOpts.outputDir, "assets", `page-index.json`), JSON.stringify(pageIndex), "utf8");
}

//write search index to JSON so it can be loaded in the user's browser
async function buildAndWriteSearchIndex(searchDocs: SearchDoc[], buildOpts: BuildOpts) {
  const searchIndexJson = buildSearchIndexJson(searchDocs);
  await fs.promises.mkdir(path.join(buildOpts.outputDir, "assets"), {recursive: true});
  await fs.promises.writeFile(path.join(buildOpts.outputDir, "assets", `search-index.json`), searchIndexJson, "utf8");
}
