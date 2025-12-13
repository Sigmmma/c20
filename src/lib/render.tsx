import PageWrapper from "./components/PageWrapper/PageWrapper";
import renderToString from "preact-render-to-string";
import Ctx, {RenderContext} from "./components/Ctx/Ctx";
import HtmlDoc from "./components/HtmlDoc/HtmlDoc";
import {Locale} from "./components/Locale/Locale";
import {RenderableTreeNode} from "@markdoc/markdoc";
import {PageIndex, formatUrlPath, PageFrontMatter} from "./content/pages";
import {Lang} from "./utils/localization";
import ArticleMain from "./components/ArticleMain/ArticleMain";

export const PREVIEW_LENGTH_CHARS = 100;

export type RenderInput = {
  //global
  lang: Lang;
  baseUrl: string;
  preloadJson?: boolean;
  noThumbs?: boolean;
  //local
  pageId: string;
  front: PageFrontMatter;
  content: RenderableTreeNode | undefined;
  localData?: any;
  ogDescription?: string;
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

export default function renderPage(input: RenderInput, ctx: RenderContext): string {
  const {front} = input;

  const pageWrapperBootstrapJson = JSON.stringify({
    pageId: input.pageId,
  });
  
  return "<!DOCTYPE html>\n" + renderToString(
    <Locale.Provider value={input.lang}>
      <HtmlDoc
        lang={input.lang}
        title={front?.title}
        baseUrl={input.baseUrl}
        noIndex={front?.stub}
        ogDescription={input.ogDescription}
        ogImg={front?.img}
        ogTags={front?.keywords}
        preloadJson={input.preloadJson}
        path={formatUrlPath(input.pageId)}
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
                  content={input.content}
                />
              </Ctx.Provider>
            </div>
          </PageWrapper>
        </div>
        <script src="/assets/main.js"></script>
      </HtmlDoc>
    </Locale.Provider>
  );
};