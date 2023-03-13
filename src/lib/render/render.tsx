import PageWrapper from "../components/PageWrapper/PageWrapper";
import * as R from "ramda";
import renderToString from "preact-render-to-string";
import Ctx, {type RenderContext} from "../components/Ctx/Ctx";
import Locale from "../components/Locale/Locale";
import Article from "../components/Article/Article";
import HtmlDoc from "../components/HtmlDoc/HtmlDoc";
import Md from "../components/Md/Md";
import {transform, renderPlaintext} from "../components/Md/markdown";
import {type Lang} from "../utils/localization";
import ThanksList from "../components/Article/ThanksList";
import findHeadings from "../components/Md/headings";
import {type Node, type RenderableTreeNode} from "@markdoc/markdoc";
import {type NavHeading} from "../components/Article/TableOfContents";
import {type MetaboxProps} from "../components/Metabox/Metabox";
import Wat from "../components/Wat/Wat";
import {type PageFrontMatter, type PageIndex, type PageLink, resolvePageGlobal, getPageParents, getAllThanks, getPageRelated, tryLocalizedPath, getPageOtherLangs, type NavTree} from "../content";
import {type SearchDoc} from "../search";
import getWorkflowSections from "./features/workflow";
import getTagSections from "./features/tag";
import { addBreaks } from "../utils/strings";

export const PREVIEW_LENGTH_CHARS = 100;

const metaboxStyles: Record<string, Partial<MetaboxProps>> = {
  tool: {
    icon: "tool",
    iconTitle: "Tool",
    class: "content-tool",
  },
  resource: {
    icon: "file",
    iconTitle: "Resource",
  },
  tag: {
    icon: "share-2",
    iconTitle: "Tag",
    class: "content-tag",
  },
  guide: {
    icon: "book-open",
    iconTitle: "Guide",
    class: "content-guide",
  }
};

export type RenderOutput = {
  htmlDoc: string;
  searchDoc: null | SearchDoc;
};

export type RenderInput = {
  //global
  baseUrl: string;
  preloadSearch?: boolean;
  noThumbs?: boolean;
  debug?: boolean,
  //local
  pageId: string;
  lang: Lang;
  ast: Node;
  front: PageFrontMatter;
  localData?: any;
  //non-local:
  globalData: any;
  pageIndex: PageIndex;
  navTree: NavTree; //can be derived from `pageIndex` but slow to do every time
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

function getNavHeadings(front: PageFrontMatter | undefined, ctx: RenderContext, content: RenderableTreeNode | undefined): NavHeading[] {
  const foundHeadings = findHeadings(ctx, content);
  // const thanks = Object.entries(front?.thanks ?? {});
  // if (thanks.length > 0) {
  //   const localize = localizer(thanksLocalizations, ctx.lang);
  //   const thanksHeadingText = localize("thanksHeadingText");
  //   foundHeadings.push({level: 1, title: thanksHeadingText, id: slugify(thanksHeadingText) ?? ""});
  // }
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

function getAboutContent(ctx: RenderContext | undefined, front?: PageFrontMatter): {metaboxProps: MetaboxProps, keywords: string[]} {
  const [aboutType, aboutArg] = (front?.about?.split(":") ?? []) as [string?, string?];
  let metaboxProps: Partial<MetaboxProps> = {
    title: front?.title,
    img: front?.img,
    caption: front?.caption,
    info: front?.info,
    sections: [],
    ...(aboutType ? metaboxStyles[aboutType] : undefined),
  };
  const keywords: string[] = [];
  if (aboutType && aboutArg) {
    if (aboutType == "tag") {
      const [game, tagName] = aboutArg.split("/");
      if (!tagName) throw new Error(`Incorrectly formatted about:tag ${aboutArg}`);
      const tag = ctx?.data?.tags?.[game]?.[tagName];
      if (tag?.id) {
        metaboxProps.title = <>{addBreaks(tagName, <wbr/>)} (<code>{tag.id}</code><Wat idTail="h1/tags" headingId="group-ids"/>)</>;
        keywords.push(tag.id);
        metaboxProps.sections!.push(...getTagSections(ctx, tag));
      }
    }
    if (["tag", "tool", "resource"].includes(aboutType)) {
      metaboxProps.sections!.push(...getWorkflowSections(ctx, aboutArg));
    }
  }
  return {metaboxProps, keywords};
}

export default function renderPage(input: RenderInput): RenderOutput {  
  const {front} = input;

  const ctx: RenderContext = {
    //global
    noThumbs: input.noThumbs,
    //local
    lang: input.lang,
    pageId: input.pageId,
    title: front?.title,
    //non-local
    allThanks: getAllThanks(input.pageIndex, input.lang),
    resolvePage: (idTail: string, headingId?: string): PageLink => {
      const page = resolvePageGlobal(input.pageIndex, input.lang, input.pageId, idTail, headingId);
      if (!page && !input.debug) {
        throw new Error(`Failed to resolve page ${idTail} from ${input.pageId} (${input.lang})`);
      }
      return page ?? {
        title: "[Unresolved]",
        url: "#",
        pageId: idTail,
        logicalPathTail: idTail,
      };
    },
    data: R.mergeDeepRight(input.globalData, input.localData),
  };

  const content = transform(input.ast, ctx, input.front);
  
  const navParents = getPageParents(input.pageIndex, input.pageId, input.lang);
  const navRelated = getPageRelated(input.pageIndex, input.pageId, input.lang);
  const navOtherLangs = getPageOtherLangs(input.pageIndex, input.pageId, input.lang);
  const navHeadings = getNavHeadings(front, ctx, content);
  const bodyPlaintext = renderPlaintext(ctx, content);
  const thisPageLocalizedPath = tryLocalizedPath(input.pageIndex, input.pageId, input.lang);
  const thisPagePath = input.pageId;

  const {metaboxProps, keywords} = getAboutContent(ctx, front);
  
  const htmlDoc = "<!DOCTYPE html>\n" + renderToString(
    <Ctx.Provider value={ctx}>
      <Locale.Provider value={ctx.lang}>
        <HtmlDoc
          title={front?.title}
          baseUrl={input.baseUrl}
          noSearch={front?.noSearch}
          ogDescription={createPlaintextPreview(bodyPlaintext)}
          ogImg={front?.img}
          ogOtherLangs={Object.keys(navOtherLangs)}
          ogTags={front?.keywords}
          preloadSearch={input.preloadSearch}
          localizedPath={thisPageLocalizedPath}
          path={thisPagePath}
        >
          <PageWrapper
            title={front?.title}
            navTree={input.navTree}
            navRelated={navRelated}
            navHeadings={navHeadings}
          >
            <Article
              stub={front?.stub}
              title={front?.title}
              navParents={navParents}
              otherLangs={navOtherLangs}
              metabox={metaboxProps}
            >
              <Md content={content}/>
              {front?.thanks &&
                <ThanksList thanks={front.thanks}/>
              }

              {input.debug &&
                <pre style={{color: "green"}}>
                  {bodyPlaintext}
                </pre>
              }
            </Article>
          </PageWrapper>
        </HtmlDoc>
      </Locale.Provider>
    </Ctx.Provider>
  );

  const searchDoc = front?.noSearch ? null : {
    lang: input.lang,
    text: bodyPlaintext ?? "",
    path: thisPagePath,
    title: front?.title ?? "",
    keywords: [...keywords, ...(front?.keywords ?? [])].join(" "),
  };

  return {htmlDoc, searchDoc};
};