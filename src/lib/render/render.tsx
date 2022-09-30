import type {PageIndex, RenderOutput} from "./types";
import {PageDataLite, PageWrapper} from "../components";
import * as R from "ramda";
import renderToString from "preact-render-to-string";
import Ctx, {RenderContext} from "../components/Ctx/Ctx";
import Article from "../components/Article/Article";
import HtmlDoc from "../components/HtmlDoc/HtmlDoc";
import Md from "../components/Md/Md";
import {MdSrc, parse, transform, renderPlaintext} from "../markdown/markdown";
import {Lang, localizer} from "../utils/localization";
import ThanksList, {localizations as thanksLocalizations} from "../components/Article/ThanksList";
import findHeadings from "../markdown/headings";
import {RenderableTreeNode} from "@markdoc/markdoc";
import {NavHeading} from "../components/PageWrapper/TableOfContents";
import { slugify } from "../utils/strings";

export const PREVIEW_LENGTH_CHARS = 100;

export type RenderInputNew = {
  //global
  baseUrl: string;
  //local
  mdSrc: MdSrc;
  mdFileName?: string;
  pageId: string;
  logicalPath: string[];
  localizedPaths: Record<Lang, string>;
  lang: Lang;
  otherLangs?: Lang[];
  //non-local:
  data: any;
  pageIndex: PageIndex;
};

type PageFrontMatter = {
  title?: string;
  thanks?: Record<string, MdSrc>;
  noSearch?: boolean;
  img?: string;
  keywords?: string[];
  stub?: boolean;
};

export function getAllThanks(pageIndex: PageIndex): string[] {
  const allThanksSet = new Set<string>();
  for (let page of Object.values(pageIndex.pages)) {
    const recipients = R.pipe(
      R.propOr({}, "thanks"),
      R.keys
    )(page);
    for (let recipient of recipients) {
      allThanksSet.add(recipient);
    }
  }
  //convert Set to an array and sort alphabetically
  const allThanks = [...allThanksSet];
  allThanks.sort((a, b) => a.localeCompare(b));
  return allThanks;
}

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
  const thanks = Object.entries(front?.thanks ?? {});
  if (thanks.length > 0) {
    const localize = localizer(thanksLocalizations, ctx.lang);
    const thanksHeadingText = localize("thanksHeadingText");
    foundHeadings.push({level: 1, title: thanksHeadingText, id: slugify(thanksHeadingText) ?? ""});
  }
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

export default function renderPage(input: RenderInputNew): RenderOutput {  
  const {ast, frontmatter: front} = parse<PageFrontMatter>(input.mdSrc, input.mdFileName);

  const ctx: RenderContext = {
    lang: input.lang,
    pageId: input.pageId,    
    logicalPath: input.logicalPath,
    title: front?.title,

    //todo: these all require non-local information... can we find another way?
    children: undefined, //todo
    allThanks: getAllThanks(input.pageIndex),
    resolvePage: (idTail: string, headingId?: string) =>
      ({pageId: "todo", url: "todo", title: "todo"}), //todo
    data: input.data,
  };

  const content = transform(ast, ctx, front);
  
  const navHeadings = getNavHeadings(front, ctx, content);
  const bodyPlaintext = renderPlaintext(ctx, content);
  const ogDescription = createPlaintextPreview(bodyPlaintext);

  //todo
  const metaboxProps = undefined;

  //todo
  const navChildren = undefined;
  const navRelated = undefined;
  const navParents= undefined;
  
  const htmlDoc = "<!DOCTYPE html>\n" + renderToString(
    <Ctx.Provider value={ctx}>
      <HtmlDoc
        title={front?.title}
        baseUrl={input.baseUrl}
        noSearch={front?.noSearch}
        ogDescription={ogDescription}
        ogImg={front?.img}
        ogOtherLangs={input.otherLangs}
        ogTags={front?.keywords}
        localizedPath={input.localizedPaths[input.lang]}
      >
        <PageWrapper
          title={front?.title}
          navChildren={navChildren}
          navRelated={navRelated}
          navHeadings={navHeadings}
        >
          <Article
            stub={front?.stub}
            title={front?.title}
            navParents={navParents}
            localizedPaths={input.localizedPaths}
            thanks={front?.thanks}
            metabox={metaboxProps}
          >
            <Md content={content}/>
            {front?.thanks &&
              <ThanksList thanks={front.thanks}/>
            }

            <pre>
              {bodyPlaintext}
            </pre>
          </Article>
        </PageWrapper>
      </HtmlDoc>
    </Ctx.Provider>
  );

  const searchDoc = front?.noSearch ? null : {
    lang: input.lang,
    text: bodyPlaintext ?? "",
    path: input.localizedPaths[input.lang],
    title: front?.title ?? "",
    keywords: front?.keywords?.join(" ") ?? "",
  };

  return {htmlDoc, searchDoc};
};