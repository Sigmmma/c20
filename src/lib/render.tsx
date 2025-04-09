import PageWrapper from "./components/PageWrapper/PageWrapper";
import * as R from "ramda";
import renderToString from "preact-render-to-string";
import Ctx, {RenderContext} from "./components/Ctx/Ctx";
import Article from "./components/Article/Article";
import HtmlDoc from "./components/HtmlDoc/HtmlDoc";
import Md from "./components/Md/Md";
import {transform, renderPlaintext} from "./markdown/markdown";
import ThanksList from "./components/Article/ThanksList";
import findHeadings from "./components/Md/headings";
import {Locale} from "./components/Locale/Locale";
import {Node, RenderableTreeNode} from "@markdoc/markdoc";
import {NavHeading} from "./components/Article/TableOfContents";
import {PageFrontMatter, PageIndex, PageLink, resolvePageGlobal, getPageParents, formatUrlPath, PageTree, getPageChildren} from "./content";
import {SearchDoc} from "./search";
import {Lang} from "./utils/localization";
import Stub from "./components/Article/Stub";
import InfoBox from "./components/InfoBox/InfoBox";

export const PREVIEW_LENGTH_CHARS = 100;

export type RenderOutput = {
  htmlDoc: string;
  searchDoc: null | SearchDoc;
};

export type RenderInput = {
  //global
  lang: Lang;
  baseUrl: string;
  preloadJson?: boolean;
  noThumbs?: boolean;
  //local
  pageId: string;
  ast: Node;
  front: PageFrontMatter;
  localData?: any;
  //non-local:
  globalData: any;
  pageIndex: PageIndex;
  pageTree: PageTree; //can be derived from `pageIndex` but slow to do every time
};

//trim the plaintext preview to a maximum length
export function createPlaintextPreview(plaintext?: string): string | undefined {
  if (plaintext && !plaintext.startsWith("...")) {
    plaintext = plaintext.length > PREVIEW_LENGTH_CHARS ?
      `${plaintext.substring(0, PREVIEW_LENGTH_CHARS)}...` :
      plaintext;
    return plaintext.replace(/\n/g, " ").trim()
  }
  return undefined;
}

function getNavHeadings(ctx: RenderContext, content: RenderableTreeNode | undefined): NavHeading[] {
  const foundHeadings = findHeadings(ctx, content);
  //we want to have the headings in a nice hierarchy for rendering
  const res: NavHeading[] = [{level: 0, title: "root", sub: []}];
  foundHeadings.forEach(hdg => {
    let sub = res;
    let last = res[res.length - 1];
    while (last && hdg.level > last.level) {
      sub = last.sub;
      last = last.sub[last.sub.length - 1];
    }
    sub.push({...hdg, sub: []});
  });
  return res[0].sub;
}


export default function renderPage(input: RenderInput): RenderOutput {  
  const {front} = input;

  const ctx: RenderContext = {
    //global
    noThumbs: input.noThumbs,
    //local
    pageId: input.pageId,
    title: front?.title,
    //non-local
    children: getPageChildren(input.pageIndex, input.pageId),
    resolvePage: (idTail: string, headingId?: string): PageLink => {
      const page = resolvePageGlobal(input.pageIndex, input.pageId, idTail, headingId);
      if (!page) {
        throw new Error(`Failed to resolve page ${idTail}${headingId ? `#${headingId}` : ""} from ${input.pageId}`);
      }
      return page ?? {
        title: "[Unresolved]",
        url: "#",
        pageId: idTail,
        icon: "file",
        logicalPathTail: idTail,
      };
    },
    data: R.mergeDeepRight(input.globalData, input.localData),
  };

  //transform uses lang because headings and links need plaintext rendering for slugs, and md could contain localizable tags
  const content = transform(input.ast, ctx, input.lang, input.front);
  
  const navParents = getPageParents(input.pageIndex, input.pageId);
  const navHeadings = getNavHeadings(ctx, content);
  const bodyPlaintext = renderPlaintext(ctx, input.lang, content);
  const thisPageLocalizedPath = formatUrlPath(input.pageId);
  const thisPagePath = input.pageId;

  const pageWrapperBootstrapJson = JSON.stringify({
    pageId: ctx.pageId,
    navHeadings: navHeadings
  });
  
  const htmlDoc = "<!DOCTYPE html>\n" + renderToString(
    <Locale.Provider value={input.lang}>
      <HtmlDoc
        lang={input.lang}
        title={front?.title}
        baseUrl={input.baseUrl}
        noIndex={front?.stub}
        ogDescription={createPlaintextPreview(bodyPlaintext)}
        ogImg={front?.img}
        ogTags={front?.keywords}
        preloadJson={input.preloadJson}
        localizedPath={thisPageLocalizedPath}
        path={thisPagePath}
      >
        <div id="wrapper-mountpoint" data-bootstrap={pageWrapperBootstrapJson}>
          <PageWrapper
            pageId={ctx.pageId}
            pageTree={input.pageTree}
            navHeadings={navHeadings}
          >
            <div id="wrapper-child">
              <Ctx.Provider value={ctx}>
                <Article
                  title={front?.title}
                  navParents={navParents}
                >
                  <InfoBox {...front}/>
                  {front?.stub &&
                    <Stub/>
                  }
                  <Md content={content}/>
                  {front?.thanks &&
                    <ThanksList thanks={front.thanks}/>
                  }
                </Article>
              </Ctx.Provider>
            </div>
          </PageWrapper>
        </div>
        <script src="/assets/main.js"></script>
      </HtmlDoc>
    </Locale.Provider>
  );

  const searchDoc: SearchDoc = {
    text: bodyPlaintext ?? "",
    path: thisPagePath,
    title: front?.title ?? "",
    keywords: front?.keywords?.join(" ") ?? "",
  };

  return {htmlDoc, searchDoc};
};