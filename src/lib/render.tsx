import * as R from "ramda";
import PageWrapper from "./components/PageWrapper/PageWrapper";
import renderToString from "preact-render-to-string";
import Ctx, {RenderContext} from "./components/Ctx/Ctx";
import HtmlDoc from "./components/HtmlDoc/HtmlDoc";
import {Locale} from "./components/Locale/Locale";
import {PageIndex, formatUrlPath, ParsedPage, PageFrontMatter} from "./content/pages";
import {Lang} from "./utils/localization";
import ArticleMain from "./components/ArticleMain/ArticleMain";
import {SearchDoc} from "./search";
import {renderPlaintext, transform} from "./markdown/markdown";
import {RenderableTreeNode} from "@markdoc/markdoc";

export const PREVIEW_LENGTH_CHARS = 100;

export type RenderInputs = {
  //static
  lang: Lang;
  baseUrl: string;
  preloadJson?: boolean;
  noThumbs?: boolean;
  //local
  pageId: string;
  parsedPage: ParsedPage;
  localData?: any;
  //global
  globalData: any;
  pageIndex: PageIndex;
};

export default function renderPage(inputs: RenderInputs): {htmlDoc: string, searchDoc: SearchDoc} {
  const ctx: RenderContext = {
    pageId: inputs.pageId,
    pageTitle: inputs.parsedPage.front?.title,
    pageIndex: inputs.pageIndex,
    data: R.mergeDeepRight(inputs.globalData, inputs.localData),
    noThumbs: inputs.noThumbs,
  };

  //transform uses lang because headings and links need plaintext rendering for slugs, and md could contain localizable tags
  const content = transform(inputs.parsedPage.ast, ctx, inputs.lang, inputs.parsedPage.front);
  const bodyPlaintext = renderPlaintext(ctx, inputs.lang, content);
  const ogDescription = createPlaintextPreview(bodyPlaintext);

  const searchDoc: SearchDoc = {
    path: formatUrlPath(inputs.pageId),
    title: inputs.parsedPage.front?.title ?? "",
    keywords: inputs.parsedPage.front?.keywords?.join(" ") ?? "",
    text: bodyPlaintext ?? "",
  };

  //render the page to HTML and also gather search index data
  const htmlDoc = renderPageHtml(ctx, {
    lang: inputs.lang,
    baseUrl: inputs.baseUrl,
    preloadJson: inputs.preloadJson,
    front: inputs.parsedPage.front,
    content,
    ogDescription,
  });

  return {htmlDoc, searchDoc};
}

//trim the plaintext preview to a maximum length
function createPlaintextPreview(plaintext?: string): string | undefined {
  if (plaintext && !plaintext.startsWith("...")) {
    plaintext = plaintext.length > PREVIEW_LENGTH_CHARS ?
      `${plaintext.substring(0, PREVIEW_LENGTH_CHARS)}...` :
      plaintext;
    return plaintext.replace(/\n/g, " ").trim()
  }
  return undefined;
}

type HtmlRenderInputs = {
  lang: Lang;
  baseUrl: string;
  preloadJson?: boolean;
  front: PageFrontMatter;
  content: RenderableTreeNode | undefined;
  ogDescription?: string;
};

function renderPageHtml(ctx: RenderContext, inputs: HtmlRenderInputs): string {
  const pageWrapperBootstrapJson = JSON.stringify({
    pageId: ctx.pageId,
  });
  
  return "<!DOCTYPE html>\n" + renderToString(
    <Locale.Provider value={inputs.lang}>
      <HtmlDoc
        lang={inputs.lang}
        title={inputs.front?.title}
        baseUrl={inputs.baseUrl}
        noIndex={inputs.front?.stub}
        ogDescription={inputs.ogDescription}
        ogImg={inputs.front?.img}
        ogTags={inputs.front?.keywords}
        preloadJson={inputs.preloadJson}
        path={formatUrlPath(ctx.pageId)}
      >
        <div id="wrapper-mountpoint" data-bootstrap={pageWrapperBootstrapJson}>
          <PageWrapper
            pageId={ctx.pageId}
            pageIndex={ctx.pageIndex}
          >
            <div id="wrapper-child">
              <Ctx.Provider value={ctx}>
                <ArticleMain
                  pageId={ctx.pageId}
                  pageIndex={ctx.pageIndex}
                  front={inputs.front}
                  content={inputs.content}
                />
              </Ctx.Provider>
            </div>
          </PageWrapper>
        </div>
        <script src="/assets/main.js"></script>
      </HtmlDoc>
    </Locale.Provider>
  );
}