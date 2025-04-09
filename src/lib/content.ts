import path from "path";
import fs from "fs";
import * as R from "ramda";
import {parse} from "./markdown/markdown";
import {findPaths} from "./utils/files";
import {commonLength } from "./utils/strings";
import {Node} from "@markdoc/markdoc";
import {MdSrc} from "./markdown/markdown";
import {BuildOpts} from "../build";
import {IconName} from "./components/Icon/names";

export type PageId = string;

export type PageFrontMatter = {
  title?: string;
  about?: string;
  img?: string;
  caption?: MdSrc;
  icon?: IconName;
  info?: MdSrc;
  thanks?: Record<string, MdSrc>;
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

export interface PageFileInfo {
  mdFilePath: string;
  logicalPath: string[];
  logicalPathTail: string;
  pageId: PageId;
}

export type PageTree = {link: PageLink, children: PageTree}[];

export type PageIndex = Record<PageId, PageData>;

export function logicalToPageId(logicalPath: string[]): PageId {
  return "/" + logicalPath.join("/");
}

export function pageIdToLogical(pageId: PageId): string[] {
  return pageId.split("/").filter(s => s != "");
}

export function getPageBaseDir(pageId: PageId, buildOpts: BuildOpts): string {
  return path.join(buildOpts.contentDir, ...pageIdToLogical(pageId));
}

export function getPageMdSrcPath(baseDir: string): string {
  return path.join(baseDir, "readme.md");
}

export async function discoverPageFiles(contentDir: string): Promise<PageFileInfo[]> {
  const mdFiles = await findPaths(path.join(contentDir, "**", "readme.md"));
  return mdFiles.map(mdFilePath => {
    const {dir: dirPath, name: fileName} = path.parse(mdFilePath);
    const contentDirDepth = path.normalize(contentDir).split(path.sep).length;
    const logicalPath = path.normalize(dirPath).split(path.sep).slice(contentDirDepth);
    const pageId = logicalToPageId(logicalPath);
    const logicalPathTail = logicalPath[logicalPath.length - 1];

    return {
      mdFilePath,
      logicalPath,
      logicalPathTail,
      pageId,
    };
  });
}

export async function loadPageFile(pageFile: PageFileInfo): Promise<PageData> {
  const mdSrc = await fs.promises.readFile(pageFile.mdFilePath, "utf8");
  const {ast, frontmatter: front} = parse<PageFrontMatter>(mdSrc, pageFile.mdFilePath);
  return {
    front: front ?? {title: pageFile.logicalPathTail},
    ast,
    logicalPath: pageFile.logicalPath,
    logicalPathTail: pageFile.logicalPathTail,
  };
}

//build cross-page APIs and helpers used during rendering
export async function loadPageIndex(contentDir: string): Promise<PageIndex> {
  //we're going to build a map of page ids => page metadata
  const pages: Record<PageId, PageData> = {};
  const pageFiles = await discoverPageFiles(contentDir);

  //load all page files
  await Promise.all(pageFiles.map(async (pageFile) => {
    pages[pageFile.pageId] = await loadPageFile(pageFile);
  }));

  //check for pages that don't have a direct parent
  const missing = {};
  Object.entries(pages).forEach(([pageId, page]) => {
    const parentPage = [...page.logicalPath];
    parentPage.pop();
    const parentId = logicalToPageId(parentPage);
    if (parentId != "/" && parentId != "/utility" && !pages[parentId] && !missing[parentId]) {
      console.warn(`Missing parent page ID: ${parentId}`);
      missing[parentId] = true;
    }
  });

  return pages;
}

export function resolvePageGlobal(pageIndex: PageIndex, fromPageId: PageId, idTail: string, headingId?: string): PageLink | undefined {
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
      return createPageLink(pageIndex, firstChoice, headingId);
    } else {
      console.warn(`Path tail '${idTail}' is ambiguous from page '${fromPageId}':\n${candidatePageIds.join("\n")}`);
      return undefined;
    }
  }
  return createPageLink(pageIndex, candidatePageIds[0], headingId);
}

export function getAllThanks(pageIndex: PageIndex): string[] {
  const allThanksSet = new Set<string>();
  for (let pageData of Object.values(pageIndex)) {
    const thanks = pageData?.front?.thanks;
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
}

export function formatUrlPath(pageId: PageId, headingId?: string) {
  return headingId ? `${pageId}#${headingId}` : pageId;
}

function getDisplayTitle(pageIndex: PageIndex, pageId: PageId): string {
  const pageData = pageIndex[pageId];
  return pageData?.front?.title ?? pageData.logicalPathTail;
}

export function createPageLink(pageIndex: PageIndex, pageId: string, headingId?: string): PageLink | undefined {
  if (!pageIndex[pageId]) return undefined;
  return {
    title: getDisplayTitle(pageIndex, pageId),
    url: formatUrlPath(pageId, headingId),
    logicalPathTail: pageIndex[pageId].logicalPathTail,
    icon: pageIndex[pageId].front.stub ? "file" : "file-text",
    pageId,
  };
}

export function buildPageTree(pageIndex: PageIndex, pageId: string): PageTree {
  const children = getPageChildren(pageIndex, pageId)
    .filter(child => !child.pageId.startsWith("/utility"));
  return children.map(child => ({
    link: child,
    children: buildPageTree(pageIndex, child.pageId)
  }));
}

export function getPageChildren(pageIndex: PageIndex, pageId: string): PageLink[] {
  const children: PageLink[] = [];
  Object.entries(pageIndex)
    .filter(([cPageId, cPageData]) => cPageId.startsWith(pageId))
    .forEach(([cPageId, cPageData]) => {
      const cLogical = pageIdToLogical(cPageId);
      if (cLogical.length > 0 && logicalToPageId(cLogical.slice(0, -1)) == pageId) {
        children.push(createPageLink(pageIndex, cPageId)!);
      }
    });
  return R.sortWith(
    [
      R.ascend((c: PageLink) => {
        const index = pageIndex[pageId].front.childOrder?.indexOf(c.logicalPathTail);
        return (index === undefined || index < 0) ? 1000 : index;
      }),
      R.ascend((c: PageLink) => c.logicalPathTail)
    ],
    children
  );
}

export function getPageParents(pageIndex: PageIndex, pageId: PageId): PageLink[] {
  const parents: PageLink[] = [];
  const parentLogicalPath = pageIdToLogical(pageId);
  while (parentLogicalPath.pop()) {
    const parentId = logicalToPageId(parentLogicalPath);
    const parent = pageIndex[parentId];
    if (parent) {
      parents.unshift(createPageLink(pageIndex, parentId)!);
    }
  }
  return parents;
}
