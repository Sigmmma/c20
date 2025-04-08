import fs from "fs";
import path from "path";
// SPOOPY BUG: do not reorder the next two lines!!!!!
import renderPage from "./lib/render";
import {buildPageTree, getPageBaseDir, loadPageIndex, PageTree, pageIdToLogical, type PageIndex} from "./lib/content";
import {loadYamlTree} from "./lib/utils/files";
import {buildSearchIndexJson, SearchDoc} from "./lib/search";
import buildResources from "./lib/resources";
import { buildSitemap } from "./lib/sitemap";
import { buildAndWriteRedirects } from "./lib/redirects";
import loadStructuredData from "./data";

export type BuildOpts = {
  contentDir: string;
  outputDir: string;
  baseUrl: string;
  noThumbs?: boolean;
};

async function renderPages(pageIndex: PageIndex, globalData: any, buildOpts: BuildOpts): Promise<{searchDocs: SearchDoc[], pageTree: PageTree}> {
  const pageTree = buildPageTree(pageIndex, "/");
  const searchDocs: SearchDoc[] = [];

  //build all pages, outputting their search docs
  await Promise.all(Object.entries(pageIndex).map(async ([pageId, pageData]) => {
    const baseDir = getPageBaseDir(pageId, buildOpts);
    const outputDir = path.join(buildOpts.outputDir, ...pageIdToLogical(pageId));
    const outputFileName = path.join(outputDir, "index.html");
    const localData = loadYamlTree(baseDir, {nonRecursive: true});

    //render the page to HTML and also gather search index data
    const renderOutput = renderPage({
      lang: "en",
      baseUrl: buildOpts.baseUrl,
      noThumbs: buildOpts.noThumbs,
      preloadJson: true,
      pageId: pageId,
      ast: pageData.ast,
      front: pageData.front,
      localData: await localData,
      globalData,
      pageIndex,
      pageTree,
    });

    await fs.promises.mkdir(outputDir, {recursive: true});
    await fs.promises.writeFile(outputFileName, renderOutput.htmlDoc, "utf8");
    if (!pageData.front.noSearch && renderOutput.searchDoc) {
      searchDocs.push(renderOutput.searchDoc);
    }
  }));

  return {searchDocs, pageTree};
}

async function writePageTree(pageTree: PageTree, buildOpts: BuildOpts) {
  await fs.promises.mkdir(path.join(buildOpts.outputDir, "assets"), {recursive: true});
  await fs.promises.writeFile(path.join(buildOpts.outputDir, "assets", `page-tree.json`), JSON.stringify(pageTree), "utf8");
}

//write search index to JSON so it can be loaded in the user's browser
export async function buildAndWriteSearchIndex(searchDocs: SearchDoc[], buildOpts: BuildOpts) {
  const searchIndexJson = buildSearchIndexJson(searchDocs);
  await fs.promises.mkdir(path.join(buildOpts.outputDir, "assets"), {recursive: true});
  await fs.promises.writeFile(path.join(buildOpts.outputDir, "assets", `search-index.json`), searchIndexJson, "utf8");
}

export default async function buildContent(buildOpts: BuildOpts) {
  const data = loadStructuredData();
  const pageIndex = loadPageIndex(buildOpts.contentDir);

  await Promise.all([
    buildResources(await pageIndex, buildOpts),
    renderPages(await pageIndex, await data, buildOpts)
      .then(({searchDocs, pageTree}) => Promise.all([
        buildAndWriteSearchIndex(searchDocs, buildOpts),
        writePageTree(pageTree, buildOpts),
      ])),
    buildSitemap(await pageIndex, buildOpts),
    buildAndWriteRedirects(await pageIndex, buildOpts)
  ]);
}