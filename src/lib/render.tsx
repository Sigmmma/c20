import * as R from "ramda";
import renderToString from "preact-render-to-string";
import {PageWrapper} from "./components";
const features = require("./features");

export default function renderPage(ctx) {
  const {page, lang} = ctx;

  /* Pass the render context through each feature, gathering their desired
   * additions to the page and search index. We use the `combineResults` helper
   * to grab a result key from all features if present, then merge using a
   * provided pipeline of functions.
   */
  const featureResults = features.map(feature => feature(ctx));
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
