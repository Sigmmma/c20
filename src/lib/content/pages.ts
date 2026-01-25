import * as R from "ramda";
import {commonLength} from "../utils/strings";
import {filterMapArray, filterMapObject} from "../utils/objects";
import {IconName} from "../components/Icon/names";
import {Node} from "@markdoc/markdoc";
import {MdSrc} from "../markdown/markdown";

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

export type ParsedPage = {
  front: PageFrontMatter;
  ast: Node;
};

export type PageInfo = {
  title: string;
  stub?: boolean;
  children?: PageId[];
};

export type PageLink = {
  title: string;
  url: string;
  icon: IconName;
};

export type PageIndex = Record<PageId, PageInfo>;

export function logicalToPageId(logicalPath: string[]): PageId {
  return "/" + logicalPath.join("/");
}

export function pageIdToLogical(pageId: PageId): string[] {
  return pageId.split("/").filter(s => s != "");
}

function pageIdToLogicalTail(pageId: PageId): string | undefined {
  const logicalPath = pageIdToLogical(pageId);
  return logicalPath[logicalPath.length - 1];
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

export function formatUrlPath(pageId: PageId, headingId?: string) {
  return headingId ? `${pageId}#${headingId}` : pageId;
}

export function createPageLink(pageIndex: PageIndex, pageId: string, headingId?: string): PageLink | undefined {
  if (!pageIndex[pageId]) return undefined;
  return {
    title: pageIndex[pageId].title,
    url: formatUrlPath(pageId, headingId),
    icon: pageIndex[pageId].stub ? "file" : "file-text",
  };
}

export function buildPageIndex(parsedPages: Record<PageId, ParsedPage>): Record<PageId, PageInfo> {
  return filterMapObject(parsedPages, (parsedPage, pageId) => {
    if (!pageId.startsWith("/utility")) {
      const logicalPathTail = pageIdToLogical(pageId).at(-1);
      return {
        title: parsedPage.front.title ?? logicalPathTail ?? "untitled",
        stub: parsedPage.front.stub,
        children: getPageChildren(parsedPages, pageId),
      };
    }
  });
}

function getPageChildren(parsedPages: Record<PageId, ParsedPage>, pageId: string): PageId[] {
  const children: PageId[] = filterMapArray(Object.keys(parsedPages), (cPageId) => {
    if (cPageId.startsWith(pageId)) {
      const cLogical = pageIdToLogical(cPageId);
      if (cLogical.length > 0 && logicalToPageId(cLogical.slice(0, -1)) == pageId) {
        return cPageId;
      }
    }
  });

  return R.sortWith(
    [
      R.ascend((c: PageId) => {
        const index = parsedPages[pageId].front.childOrder?.indexOf(pageIdToLogicalTail(c) ?? '');
        return (index === undefined || index < 0) ? 1000 : index;
      }),
      R.ascend((c: PageId) => pageIdToLogicalTail(c) ?? '')
    ],
    children
  );
}

