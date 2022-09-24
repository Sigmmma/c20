import * as R from "ramda";
import renderToString from "preact-render-to-string";
import {MdSrc, PageWrapper, RawHtml} from "./components";
const features = require("./features");

export type Lang = string;
export type PageId = string;

//todo: try to reduce this to minimum possible
export type PageContext = {
  //from meta
  title: Record<Lang, string>;
  slug?: Record<Lang, string>;
  assertPath?: string;
  keywords?: Record<Lang, string[]>;
  img?: string;
  imgCaption?: Record<Lang, MdSrc>;
  info?: Record<Lang, MdSrc>;
  stub?: boolean;
  thanks?: Record<string, Record<Lang, string>>;
  headingRefs?: Record<string, Record<Lang, string>>;
  workflowName?: string;
  toolName?: string;
  tagName?: string;
  thanksIndex?: boolean;
  /** @deprecated */
  tagIndex?: {
    game: string;
    groupId?: boolean;
    parent?: boolean;
    noLink?: boolean;
  };
  noSearch?: boolean;
  noList?: boolean;
  Page404?: boolean;

  //calculated
  langs: Lang[];
  pageId: PageId;
  logicalPath: string[];
  dirPath: string; //needed?
  parent?: PageContext;
  children?: PageContext[];
  localizedPaths: Record<Lang, string>;
  related?: PageContext[]; //overrides IDs in page.yml

  //funcs
  tryLocalizedSlug: (lang: Lang) => string;
  tryLocalizedPath: (lang: Lang, headingId?: string) => string;
  tryLocalizedTitle: (lang: Lang) => string;
};

export type RenderContext = {
  resolvePage: (idTail: string) => PageContext,
  resolveUrl: (idTail: string, headingId?: string) => string,
  pageIndex: {
    pages: Record<PageId, PageContext>;
    resolvePage: (fromPageId: PageId, idTail: string) => PageContext;
    resolveUrl: (fromPageId: PageId, prefLang: Lang, idTail: string, headingId?: string) => PageContext;
  };
  // Freeform structured data from the src/data directory
  data: any;
  // todo: do we really need most of this below here?
  buildOpts: {
    baseUrl: string;
    packageVersion: string;
    contentDir: string;
    outputDir: string;
  };
  page: PageContext;
  lang: Lang;
  md: MdSrc;
};

export type RenderResult = {
  htmlDoc: RawHtml;
  searchDoc: null | {
    lang: string;
    path: string;
    title: string;
    text: string;
    keywords: string;
  };
};

export default function renderPage(ctx: RenderContext): RenderResult {
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
