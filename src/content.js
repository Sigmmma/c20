const marked = require("marked");
const yaml = require("js-yaml");
const fs = require("fs").promises;
const path = require("path");
const R = require("ramda");

const {commonLength, findPaths} = require("./utils");
const loadStructuredData = require("./data");
const renderPages = require("./build/render");
const buildSitemap = require("./build/sitemap");
const buildResources = require("./build/resources");
const buildSearchIndex = require("./build/search");

function joinAbsolutePath(logicalPath) {
  return "/" + logicalPath.join("/");
}

//return an array of the metadata objects representing each content page
async function loadPageMetadata(contentDir) {
  //we're going to build a map of page ids => page metadata
  const pages = {};

  //find all page.yml files under the content root -- each will become a page
  const pageMetaFiles = await findPaths(path.join(contentDir, "**", "page.yml"));

  //load all page YAML files in a first pass
  await Promise.all(pageMetaFiles.map(async (yamlFilePath) => {
    const pageMeta = yaml.safeLoad(await fs.readFile(yamlFilePath, "utf8"));
    if (!pageMeta.title) {
      throw new Error(`Page does not define any title(s): ${yamlFilePath}`);
    }

    const {dir: dirPath} = path.parse(yamlFilePath);
    const contentDirDepth = path.normalize(contentDir).split(path.sep).length;
    const logicalPath = path.normalize(dirPath).split(path.sep).slice(contentDirDepth);
    const langs = Object.keys(pageMeta.title);
    const pageId = joinAbsolutePath(logicalPath);
    const logicalPathTail = logicalPath[logicalPath.length - 1];

    if (pageMeta.assertPath && pageMeta.assertPath != pageId) {
      throw new Error(`Expected page '${pageId}' to be at path '${pageMeta.assertPath}'`);
    }

    pages[pageId] = {
      ...pageMeta,
      langs,
      pageId,
      logicalPath,
      dirPath,
      tryLocalizedSlug: (lang) => {
        return R.pathOr(logicalPathTail, ["slug", lang], pageMeta);
      }
    };
  }));

  //do a second pass to build inter-page relationships
  Object.values(pages).forEach(page => {
    //parent-child relationships
    const parentLogicalPath = page.logicalPath.slice();
    while (parentLogicalPath.pop()) {
      const parentId = joinAbsolutePath(parentLogicalPath);
      const parent = pages[parentId];
      if (parent) {
        page.parent = parent;
        parent.children = R.append(page, parent.children);
        break;
      }
    }
    //ensure two-way related pages
    if (page.related) {
      page.related.forEach((relatedId) => {
        const relatedPage = pages[relatedId];
        if (!relatedPage) {
          throw new Error(`No related page found: ${relatedId} from ${page.pageId}`);
        }
        relatedPage.related = R.union([page.pageId], relatedPage.related);
      });
    }
  });

  //final pass for properties reliant on above passes
  Object.values(pages).forEach(page => {
    //localize the URL for each language
    page.localizedPaths = Object.fromEntries(page.langs.map(lang => {
      const localizedPath = [];
      let currPage = pages[page.pageId];
      while (currPage && currPage.parent) {
        localizedPath.unshift(currPage.tryLocalizedSlug(lang));
        currPage = currPage.parent;
      }
      if (lang != "en") {
        localizedPath.unshift(lang);
      }
      return [lang, joinAbsolutePath(localizedPath)];
    }));
    page.tryLocalizedPath = (lang, headingId) => {
      const path = page.localizedPaths[lang] || page.localizedPaths["en"];
      headingId = R.pathOr(headingId, ["headingIds", headingId, lang], page);
      return headingId ? `${path}#${headingId}` : path;
    };
    page.tryLocalizedTitle = (lang) => page.title[lang] || page.title["en"];
    //convert the related set from IDs to actual references
    if (page.related) {
      page.related = page.related.map(id => pages[id]);
    }
  });

  return pages;
}

//build cross-page APIs and helpers used during rendering
async function loadPageIndex(contentDir) {
  const pages = await loadPageMetadata(contentDir);

  const resolvePage = (fromPageId, idTail) => {
    const fromPage = pages[fromPageId];
    if (!idTail.startsWith("/")) {
      idTail = "/" + idTail;
    }

    const candidatePages = Object.values(pages).filter(otherPage => otherPage.pageId.endsWith(idTail));
    if (candidatePages.length == 0) {
      throw new Error(`No page exists with logical path tail '${idTail}' (from logical path '${fromPageId}')`);
    } else if (candidatePages.length > 1) {
      //there are multiple matching pages -- try disambiguating by picking best match
      candidatePages.sort((a, b) => {
        const commonA = commonLength(a.pageId, fromPageId);
        const commonB = commonLength(b.pageId, fromPageId);
        return commonB - commonA;
      });
      const firstChoice = candidatePages[0];
      const secondChoice = candidatePages[1];
      const commonFirst = commonLength(firstChoice.pageId, fromPageId);
      const commonSecond = commonLength(secondChoice.pageId, fromPageId);
      if (commonFirst > commonSecond) {
        return firstChoice;
      }
      const matchedIds = candidatePages.map(otherPage => otherPage.pageId).join("\n");
      throw new Error(`Logical path tail '${idTail}' was ambiguous (from path '${fromPageId})':\n${matchedIds}`);
    }
    return candidatePages[0];
  };

  //looks up the localized URL for a path tail and optionally a heading anchor
  const resolveUrl = (fromPageId, prefLang, idTail, headingId) => {
    const page = resolvePage(fromPageId, idTail);
    return page.tryLocalizedPath(prefLang, headingId);
  };

  return {pages, resolvePage, resolveUrl};
}

async function buildContent(buildOpts) {
  const pageIndex = loadPageIndex(buildOpts.contentDir);
  const data = loadStructuredData();

  await Promise.all([
    buildResources(await pageIndex, buildOpts),
    renderPages(await pageIndex, await data, buildOpts)
      .then(searchDocs => buildSearchIndex(searchDocs, buildOpts)),
    buildSitemap(await pageIndex, buildOpts)
  ]);
}

module.exports = buildContent;
