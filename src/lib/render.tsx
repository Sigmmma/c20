import PageWrapper from "./components/PageWrapper/PageWrapper";
import * as R from "ramda";
import renderToString from "preact-render-to-string";
import Ctx, {RenderContext} from "./components/Ctx/Ctx";
import HtmlDoc from "./components/HtmlDoc/HtmlDoc";
import {transform, renderPlaintext} from "./markdown/markdown";
import {Locale} from "./components/Locale/Locale";
import {type Node} from "@markdoc/markdoc";
import {PageIndex, formatUrlPath, PageFrontMatter} from "./content/pages";
import {SearchDoc} from "./search";
import {Lang} from "./utils/localization";
import ArticleMain from "./components/ArticleMain/ArticleMain";

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

export default function renderPage(input: RenderInput): RenderOutput {  
  const {front} = input;

  const ctx: RenderContext = {
    pageId: input.pageId,
    pageTitle: front?.title,
    pageIndex: input.pageIndex,
    data: R.mergeDeepRight(input.globalData, input.localData),
    noThumbs: input.noThumbs,
  };

  //transform uses lang because headings and links need plaintext rendering for slugs, and md could contain localizable tags
  const content = transform(input.ast, ctx, input.lang, input.front);
  const bodyPlaintext = renderPlaintext(ctx, input.lang, content);
  const thisPagePath = formatUrlPath(input.pageId);

  const pageWrapperBootstrapJson = JSON.stringify({
    pageId: input.pageId,
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
        path={thisPagePath}
      >
        <div id="wrapper-mountpoint" data-bootstrap={pageWrapperBootstrapJson}>
          <PageWrapper
            pageId={input.pageId}
            pageIndex={input.pageIndex}
          >
            <div id="wrapper-child">
              <Ctx.Provider value={ctx}>
                <ArticleMain
                  pageId={input.pageId}
                  pageIndex={input.pageIndex}
                  front={front}
                  content={content}
                />
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