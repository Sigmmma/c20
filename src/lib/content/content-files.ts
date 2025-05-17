import fs from "fs";
import {parse} from "../markdown/markdown";
import {findPaths} from "../utils/files";
import path from "path";
import {logicalToPageId, PageFrontMatter, PageId, pageIdToLogical, ParsedPage} from "./pages";
import {BuildOpts} from "../../build";

export interface PageFileInfo {
  mdFilePath: string;
  logicalPath: string[];
  pageId: PageId;
}

export async function discoverPageFiles(contentDir: string): Promise<PageFileInfo[]> {
  const mdFiles = await findPaths(path.join(contentDir, "**", "readme.md"));
  return mdFiles.map(mdFilePath => {
    const {dir: dirPath, name: fileName} = path.parse(mdFilePath);
    const contentDirDepth = path.normalize(contentDir).split(path.sep).length;
    const logicalPath = path.normalize(dirPath).split(path.sep).slice(contentDirDepth);
    const pageId = logicalToPageId(logicalPath);

    return {
      mdFilePath,
      logicalPath,
      pageId,
    };
  });
}

export async function loadParsedPage(pageFile: PageFileInfo): Promise<ParsedPage> {
  const mdSrc = await fs.promises.readFile(pageFile.mdFilePath, "utf8");
  const {ast, frontmatter: front} = parse<PageFrontMatter>(mdSrc, pageFile.mdFilePath);
  return {
    front: front ?? {},
    ast,
    logicalPath: pageFile.logicalPath,
  };
}

//build cross-page APIs and helpers used during rendering
export async function loadParsedPages(contentDir: string): Promise<Record<PageId, ParsedPage>> {
  //we're going to build a map of page ids => page metadata
  const parsedPages: Record<PageId, ParsedPage> = {};
  const pageFiles = await discoverPageFiles(contentDir);

  //load all page files
  await Promise.all(pageFiles.map(async (pageFile) => {
    parsedPages[pageFile.pageId] = await loadParsedPage(pageFile);
  }));

  //check for pages that don't have a direct parent
  const missing = {};
  Object.entries(parsedPages).forEach(([pageId, page]) => {
    const parentPage = [...page.logicalPath];
    parentPage.pop();
    const parentId = logicalToPageId(parentPage);
    if (parentId != "/" && parentId != "/utility" && !parsedPages[parentId] && !missing[parentId]) {
      console.warn(`Missing parent page ID: ${parentId}`);
      missing[parentId] = true;
    }
  });

  return parsedPages;
}

export function getPageBaseDir(pageId: PageId, buildOpts: BuildOpts): string {
  return path.join(buildOpts.contentDir, ...pageIdToLogical(pageId));
}

export function getPageMdSrcPath(baseDir: string): string {
  return path.join(baseDir, "readme.md");
}