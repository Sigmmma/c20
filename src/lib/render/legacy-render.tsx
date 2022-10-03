import * as R from "ramda";
import renderToString from "preact-render-to-string";
import {PageDataLite, PageWrapper} from "../components";
import Ctx, {RenderContext} from "../components/Ctx/Ctx";
import Article from "../components/Article/Article";
import HtmlDoc from "../components/HtmlDoc/HtmlDoc";
import {rawHelper} from "../components";
import ThanksList, {localizations as thanksLocalizations} from "../components/Article/ThanksList";
import {slugify} from "../utils/strings";
import type {RenderInput, RenderOutput} from "./types";
import {getAllThanks, createPlaintextPreview} from "./render";
const features = require("./features");

export default function renderPage(input: RenderInput): RenderOutput {
  const title = input.page.tryLocalizedTitle(input.lang);

  const navParents: PageDataLite[] = [];
  let currPage = input.page;
  while (currPage.parent) {
    currPage = currPage.parent;
    navParents.unshift({
      url: currPage.tryLocalizedPath(input.lang),
      title: currPage.tryLocalizedTitle(input.lang),
      pageId: currPage.pageId,
    });
  }

  const navChildren: PageDataLite[] | undefined = input.page.children?.map(child => ({
    title: child.tryLocalizedTitle(input.lang),
    url: child.tryLocalizedPath(input.lang),
    pageId: child.pageId,
  }));

  const navRelated: PageDataLite[] | undefined = input.page.related?.map(other => ({
    title: other.tryLocalizedTitle(input.lang),
    url: other.tryLocalizedPath(input.lang),
    pageId: other.pageId,
  }));
  
  const ctx: RenderContext = {
    lang: input.lang,
    title,
    pageId: input.page.pageId,
    logicalPath: input.page.logicalPath,
    data: input.data,
    localData: input.localData,
    children: navChildren,
    allThanks: getAllThanks(input.pageIndex),
    resolvePage: (idTail, headingId) => {
      const foundPage = input.pageIndex.resolvePageGlobal(input.page.pageId, idTail);
      return {
        title: foundPage.tryLocalizedTitle(input.lang),
        url: foundPage.tryLocalizedPath(input.lang, headingId),
        pageId: foundPage.pageId,
      };
    },
  };

  /* Pass the render context through each feature, gathering their desired
   * additions to the page and search index. We use the `combineResults` helper
   * to grab a result key from all features if present, then merge using a
   * provided pipeline of functions.
   */
  const featureResults = features.map(feature => feature(ctx, input));
  const combineResults = (key, ...pipe) => R.pipe(
    R.map(R.prop(key)),
    R.filter(val => !R.isNil(val)),
    ...pipe
  )(featureResults);

  //we only want a plaintext preview if the page is nonempty and isn't just a placeholder "..."
  let bodyPlaintext = combineResults("plaintext", R.join("\n"));
  const ogDescription = createPlaintextPreview(bodyPlaintext);

  const ogTags = R.path(["keywords", input.lang], input.page);

  const metaboxProps = {
    metaTitle: combineResults("metaTitle", R.last),
    metaIcon: combineResults("metaIcon", R.last),
    metaIconTitle: combineResults("metaIconTitle", R.last),
    img: combineResults("img", R.last),
    imgCaption: combineResults("imgCaption", R.last),
    metaClass: combineResults("metaClass", R.last),
    metaSections: combineResults("metaSections", R.flatten),
  };

  const thanks = combineResults("thanks", R.reduce(R.mergeWith(R.concat), {}));

  let navHeadings = combineResults("headings", R.flatten);
  const thanksHeadingText = thanksLocalizations.thanksHeadingText[input.lang];
  if (Object.entries(thanks).length > 0) {
    navHeadings = [...navHeadings, {level: 1, id: slugify(thanksHeadingText), title: thanksHeadingText}];
  }

  const body = <div {...rawHelper(combineResults("html", R.join("\n")))}></div>;

  //represents the full page HTML, ready to write to a file
  const htmlDoc = "<!DOCTYPE html>\n" + renderToString(
    <Ctx.Provider value={ctx}>
      <HtmlDoc
        title={title}
        baseUrl={input.baseUrl}
        noSearch={input.page.noSearch}
        ogDescription={ogDescription}
        ogImg={input.page.img}
        ogOtherLangs={input.page.langs.filter(l => input.lang != l)}
        ogTags={ogTags}
        localizedPath={input.page.tryLocalizedPath(input.lang)}
      >
        <PageWrapper
          title={title}
          navChildren={navChildren}
          navRelated={navRelated}
          navHeadingsLegacy={navHeadings}
        >
          <Article
            stub={input.page.stub}
            title={title}
            navParents={navParents}
            localizedPaths={input.page.localizedPaths}
            thanks={thanks}
            metabox={metaboxProps}
          >
            {body}
            {thanks &&
              <ThanksList thanks={thanks}/>
            }
          </Article>
        </PageWrapper>
      </HtmlDoc>
    </Ctx.Provider>
  );
  //used to add the page to the search index
  const searchDoc = input.page.noSearch ? null : {
    lang: input.lang,
    path: input.page.tryLocalizedPath(input.lang),
    title: input.page.tryLocalizedTitle(input.lang),
    text: combineResults("searchText", R.join(" ")),
    keywords: combineResults("keywords", R.flatten, R.join(" "))
  };

  return {htmlDoc, searchDoc};
}
