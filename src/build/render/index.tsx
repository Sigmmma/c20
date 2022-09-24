import path from "path";
import fsn from "fs";
import * as R from "ramda";
import renderToString from "preact-render-to-string";
import {PageWrapper} from "./components";

const fs = fsn.promises;
const features = require("./features");

async function renderPage(ctx) {
  const {page, lang} = ctx;

  /* Pass the render context through each feature, gathering their desired
   * additions to the page and search index. We use the `combineResults` helper
   * to grab a result key from all features if present, then merge using a
   * provided pipeline of functions.
   */
  const featureResults = await Promise.all(features.map(feature => feature(ctx)));
  const combineResults = (key, ...pipe) => R.pipe(
    R.map(R.prop(key)),
    R.filter(val => !R.isNil(val)),
    ...pipe
  )(featureResults);

  const metaboxProps = {
    metaTitle: combineResults("metaTitle", R.last),
    img: combineResults("img", R.last),
    imgCaption: combineResults("imgCaption", R.last),
    metaClass: combineResults("metaClass", R.last),
    metaSections: combineResults("metaSections", R.flatten),
  };

  //represents the full page HTML, ready to write to a file
  const htmlDoc = "<!DOCTYPE html>\n" + renderToString(
    <PageWrapper
      ctx={ctx}
      headings={combineResults("headings", R.flatten)}
      thanks={combineResults("thanks", R.reduce(R.mergeWith(R.concat), {}))}
      metaboxProps={metaboxProps}
      body={combineResults("html", R.join("\n"))}
      bodyPlaintext={combineResults("plaintext", R.join("\n"))}
    />
  );
  //used to add the page to the search index
  const searchDoc = page.noSearch ? null : {
    lang,
    path: ctx.page.localizedPaths[ctx.lang],
    title: ctx.page.title[ctx.lang],
    text: combineResults("searchText", R.join(" ")),
    keywords: combineResults("keywords", R.flatten, R.join(" "))
  };

  return {htmlDoc, searchDoc};
}

async function renderPages(pageIndex, data, buildOpts) {
  //for all pages, and for all of their languages...
  const searchDocs = await Promise.all(Object.values(pageIndex.pages).flatMap((page: any) =>
    page.langs.map(async (lang) => {
      //we can assume page and language is mantained during a page render
      const renderContext = {
        resolvePage: (idTail) => pageIndex.resolvePage(page.pageId, idTail),
        resolveUrl: (idTail, headingId) => pageIndex.resolveUrl(page.pageId, lang, idTail, headingId),
        pageIndex,
        data,
        buildOpts,
        page,
        lang,
      };

      //render the page to HTML and also gather search index data
      const {htmlDoc, searchDoc} = await renderPage(renderContext);
      //write the HTML content out to a file
      await fs.mkdir(path.join(buildOpts.outputDir, page.localizedPaths[lang]), {recursive: true});
      await fs.writeFile(path.join(buildOpts.outputDir, page.localizedPaths[lang], "index.html"), htmlDoc, "utf8");
      return searchDoc;
    })
  ));
  //return all search docs so they can be written to a single file (for this lang)
  return searchDocs.filter(it => it != null);
}

module.exports = renderPages;
