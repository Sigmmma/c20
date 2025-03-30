import path from "path";
import fs from "fs";
import * as R from "ramda";
import {parse} from "./components/Md/markdown";
import {findPaths, parseLangSuffix} from "./utils/files";
import {commonLength } from "./utils/strings";
import {type Node} from "@markdoc/markdoc";
import {type MdSrc} from "./components/Md/markdown";
import {type Lang} from "./utils/localization";
import {type BuildOpts} from "../build";
import { IconName } from "./components/Icon/names";

export type PageId = string;

const iconMappings: Record<string, IconName> = {
  stub: "file",
  article: "file-text",
  tool: "tool",
  resource: "file-text",
  tag: "share-2",
  tags: "share-2",
  guide: "book-open",
  scripts: "terminal",
};

export type PageFrontMatter = {
  title?: string;
  about?: string;
  img?: string;
  caption?: MdSrc;
  icon?: IconName;
  info?: MdSrc;
  thanks?: Record<string, MdSrc>;
  headingRefs?: Record<string, string>;
  noSearch?: boolean;
  keywords?: string[];
  stub?: boolean;
  redirects?: PageId[];
  childOrder?: string[];
};

export type PageLink = {
  title: string;
  url: string;
  pageId: string;
  logicalPathTail: string;
  icon: IconName;
};

export type PageData = {
  logicalPath: string[];
  logicalPathTail: string;
  front: PageFrontMatter;
  ast: Node;
};

export type NavTree = {link: PageLink, children: NavTree}[];

export type PageIndex = Record<PageId, Record<Lang, PageData>>;

export function logicalToPageId(logicalPath: string[]): PageId {
  return "/" + logicalPath.join("/");
};

export function pageIdToLogical(pageId: PageId): string[] {
  return pageId.split("/").filter(s => s != "");
};

export function getPageBaseDir(pageId: PageId, buildOpts: BuildOpts): string {
  return path.join(buildOpts.contentDir, ...pageIdToLogical(pageId));
};

export function getPageMdSrcPath(baseDir: string, lang: Lang): string {
  return path.join(baseDir, lang == "en" ? "readme.md" : `readme_${lang}.md`);
};

function pageIdToUrl(pageId: PageId, lang: Lang, headingId?: string): string {
  const path = lang == "en" ? pageId : `${pageId}/${lang}.html`;
  return headingId ? `${path}#${headingId}` : path;
}

export function getPageIcon(front: PageFrontMatter | undefined): IconName {
  const [aboutType, aboutArg] = (front?.about?.split(":") ?? []) as [string?, string?];
  const iconType = (front?.icon ?? aboutType ?? (front?.stub ? "stub" : "article"));
  return iconMappings[iconType] ?? iconType;
}

//build cross-page APIs and helpers used during rendering
export async function loadPageIndex(contentDir: string): Promise<PageIndex> {
  //we're going to build a map of page ids => page metadata
  const pages: Record<PageId, Record<Lang, PageData>> = {};

  //find all page.yml files under the content root -- each will become a page
  const mdFiles = await findPaths(path.join(contentDir, "**", "readme*.md"));

  //load all page files
  await Promise.all(mdFiles.map(async (mdFilePath) => {
    const {dir: dirPath, name: fileName} = path.parse(mdFilePath);
    const contentDirDepth = path.normalize(contentDir).split(path.sep).length;
    const logicalPath = path.normalize(dirPath).split(path.sep).slice(contentDirDepth);
    const pageId = logicalToPageId(logicalPath);
    const logicalPathTail = logicalPath[logicalPath.length - 1];
    const lang = parseLangSuffix(fileName) ?? "en";

    const mdSrc = await fs.promises.readFile(mdFilePath, "utf8");
    const {ast, frontmatter: front} = parse<PageFrontMatter>(mdSrc, mdFilePath);

    if (front) {
      if (!pages[pageId]) pages[pageId] = {};
      pages[pageId][lang] = {
        front,
        ast,
        logicalPath,
        logicalPathTail,
      };
    }
  }));

  const missing = {};
  Object.entries(pages).forEach(([pageId, page]) => {
    const parentPage = [...page["en"].logicalPath];
    parentPage.pop();
    const parentId = logicalToPageId(parentPage);
    if (parentId != "/" && parentId != "/utility" && !pages[parentId] && !missing[parentId]) {
      console.warn(`Missing parent page ID: ${parentId}`);
      missing[parentId] = true;
    }
  });

  return pages;
};

export function resolvePageGlobal(pageIndex: PageIndex, lang: Lang, fromPageId: PageId, idTail: string, headingId?: string): PageLink | undefined {
  //normalize the ID tail
  if (!idTail.startsWith("/")) {
    idTail = "/" + idTail;
  }
  if (idTail.length > 1 && idTail.endsWith("/")) {
    idTail = idTail.substring(0, -1);
  }
  idTail = idTail.toLowerCase();

  const candidatePageIds = Object.keys(pageIndex).filter(otherPageId => otherPageId.toLowerCase().endsWith(idTail));
  if (candidatePageIds.length == 0) {
    console.warn(`No page exists with logical path tail '${idTail}' (from logical path '${fromPageId}')`);
    return undefined;
  } else if (candidatePageIds.length > 1) {
    //there are multiple matching pages -- try disambiguating by picking best match
    candidatePageIds.sort((a, b) => {
      const commonA = commonLength(a, fromPageId);
      const commonB = commonLength(b, fromPageId);
      return commonB - commonA;
    });
    const firstChoice = candidatePageIds[0];
    const secondChoice = candidatePageIds[1];
    const commonFirst = commonLength(firstChoice, fromPageId);
    const commonSecond = commonLength(secondChoice, fromPageId);
    if (commonFirst > commonSecond) {
      return createPageLink(pageIndex, firstChoice, lang, headingId);
    } else {
      console.warn(`Path tail '${idTail}' is ambiguous from page '${fromPageId}':\n${candidatePageIds.join("\n")}`);
      return undefined;
    }
  }
  return createPageLink(pageIndex, candidatePageIds[0], lang, headingId);
};

export function getAllThanks(pageIndex: PageIndex, lang: Lang): string[] {
  const allThanksSet = new Set<string>();
  for (let pageDataByLang of Object.values(pageIndex)) {
    const thanks = pageDataByLang[lang]?.front?.thanks;
    if (thanks) {
      Object.keys(thanks).forEach(recipient => {
        allThanksSet.add(recipient);
      });
    }
  }
  //convert Set to an array and sort alphabetically
  const allThanks = [...allThanksSet];
  allThanks.sort((a, b) => a.localeCompare(b));
  return allThanks;
};

export function tryLocalizedPath(pageIndex: PageIndex, pageId: PageId, lang: Lang, headingId?: string) {
  const pageDataByLang = pageIndex[pageId];
  const usedLang = pageDataByLang[lang] ? lang : "en";
  const pageData = pageDataByLang[usedLang];
  const localizedHeadingId = R.pathOr(headingId, ["headingRefs", headingId], pageData.front);
  return pageIdToUrl(pageId, usedLang, localizedHeadingId);
};

function tryLocalizedTitle(pageIndex: PageIndex, pageId: PageId, lang: Lang): string {
  const pageDataByLang = pageIndex[pageId];
  return (pageDataByLang[lang] ?? pageDataByLang["en"])?.front?.title ?? "Untitled";
}

function createPageLink(pageIndex: PageIndex, pageId: string, lang: Lang, headingId?: string): PageLink | undefined {
  if (!pageIndex[pageId]) return undefined;
  return {
    title: tryLocalizedTitle(pageIndex, pageId, lang),
    url: tryLocalizedPath(pageIndex, pageId, lang, headingId),
    logicalPathTail: pageIndex[pageId][lang].logicalPathTail,
    icon: pageIndex[pageId][lang].front.stub ? "file" : "file-text",
    pageId,
  };
}

export function getPageOtherLangs(pageIndex: PageIndex, pageId: string, lang: Lang): Record<Lang, PageLink> {
  const others = {};
  Object.entries(pageIndex[pageId]).forEach(([otherLang, otherPageData]) => {
    if (otherLang != lang) {
      others[otherLang] = createPageLink(pageIndex, pageId, otherLang);
    }
  });
  return others;
};

export function buildPageTree(pageIndex: PageIndex, pageId: string, lang: Lang): NavTree {
  const children = getPageChildren(pageIndex, pageId, lang)
    .filter(child => !child.pageId.startsWith("/utility"));
  return children.map(child => ({
    link: child,
    children: buildPageTree(pageIndex, child.pageId, lang)
  }));
};

export function getPageChildren(pageIndex: PageIndex, pageId: string, lang: Lang): PageLink[] {
  const children: PageLink[] = [];
  Object.entries(pageIndex)
    .filter(([cPageId]) => cPageId.startsWith(pageId))
    .forEach(([cPageId, cPageDataByLang]) => {
      const cLogical = pageIdToLogical(cPageId);
      if (cLogical.length == 0) return;
      if (logicalToPageId(cLogical.slice(0, -1)) == pageId) {
        children.push(createPageLink(pageIndex, cPageId, lang)!);
      }
    });
  return R.sortWith(
    [
      R.ascend((c: PageLink) => {
        const index = pageIndex[pageId][lang].front.childOrder?.indexOf(c.logicalPathTail);
        return (index === undefined || index < 0) ? 1000 : index;
      }),
      R.ascend((c: PageLink) => c.logicalPathTail)
    ],
    children
  );
};

export function getPageParents(pageIndex: PageIndex, pageId: PageId, lang: Lang): PageLink[] {
  const parents: PageLink[] = [];
  const parentLogicalPath = pageIdToLogical(pageId);
  while (parentLogicalPath.pop()) {
    const parentId = logicalToPageId(parentLogicalPath);
    const parent = pageIndex[parentId];
    if (parent) {
      parents.unshift(createPageLink(pageIndex, parentId, lang)!);
    }
  }
  return parents;
};
