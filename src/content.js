const marked = require("marked");
const yaml = require("js-yaml");
const fs = require("fs").promises;
const path = require("path");
const R = require("ramda");

const {commonLength, findPaths, parsePathParts} = require("./utils");
const loadStructuredData = require("./data");
const renderPages = require("./build/render");
const buildSitemap = require("./build/sitemap");

//return an array of the metadata objects representing each content page
async function loadPageMetadata(contentDir) {
  //find all page.yml files under the content root -- each will become a page
  const pageMetaFiles = await findPaths(path.join(contentDir, "**", "page.yml"));

  //we're going to build a map of page ids => page metadata as a single pass
  let pages = {};
  const updatePages = (opPath, op) => pages = R.over(R.lensPath(opPath), op, pages);

  //parse each page to gather the initial metadata
  await Promise.all(pageMetaFiles.map(async (yamlFilePath) => {
    const pageMeta = yaml.safeLoad(await fs.readFile(yamlFilePath, "utf8"));
    if (!pageMeta.title) {
      throw new Error(`Page does not define any title(s): ${yamlFilePath}`);
    }
    const langs = Object.keys(pageMeta.title);
    const logicalPath = parsePathParts(contentDir, yamlFilePath);
    const pageId = "/" + logicalPath.join("/");
    const parentId = logicalPath.length > 0 ? ("/" + logicalPath.slice(0, -1).join("/")) : null;
    const logicalPathTail = logicalPath[logicalPath.length - 1];

    //register this page as a child of its parent
    if (parentId) {
      updatePages([parentId, "childIds"], R.append(pageId));
    }

    //ensure two-way related pages
    if (pageMeta.relatedIds) {
      pageMeta.relatedIds.forEach((relatedId) => {
        updatePages([relatedId, "relatedIds"], R.union([pageId]));
      });
    }

    updatePages([pageId], R.mergeRight({
      ...pageMeta,
      langs,
      pageId,
      logicalPath,
      logicalPathTail,
      getSlug: (lang) => R.pathOr(logicalPathTail, ["slug", lang], pageMeta),
      getLocalizedPath: (lang) => {
        const path = lang == "en" ? [] : [lang];
        let currPage = pages[pageId];
        while (currPage && currPage.parentId) {
          path.splice(1, 0, currPage.getSlug(lang));
          currPage = pages[currPage.parentId];
        }
        return "/" + path.join("/");
      },
      getParent: () => {
        
      }
    }));
  }));

  return pages;
}

function buildMetaIndex(pages, data, buildOpts) {

  const findTagPageByName = (tagName) => {
    const otherPage = pages.find(otherPage => otherPage.tagName == tagName);
    if (!otherPage) throw new Error(`Failed to find tag page for ${tagName}`);
    return otherPage;
  };

  const resolvePage = (pathTail, fromPageId, fromLang) => {
    const candidatePages = Object.values(pages).filter(page =>
      page.getLocalizedPath(fromLang).endsWith("/" + pathTail)
    );
    if (candidatePages.length == 0) {
      throw new Error(`No page exists with path tail '${pathTail}' (from path '${fromPageId}')`);
    } else if (candidatePages.length > 1) {
      //there are multiple matching pages -- try disambiguating by picking best match
      candidatePages.sort((a, b) => commonLength(b._path, page._path) - commonLength(a._path, page._path));
      const firstChoice = candidatePages[0];
      const secondChoice = candidatePages[1];
      if (commonLength(firstChoice._path, page._path) > commonLength(secondChoice._path, page._path)) {
        return firstChoice;
      }
      const matched = candidatePages.map(otherPage => otherPage._path).join("\n");
      throw new Error(`Path tail '${pathTail}' with headingId '${headingId}' was ambiguous (from path '${fromPageId})':\n${matched}`);
    }
    return candidatePages[0];
  }

  //looks up full absolute URL for a path tail and optionally a heading anchor
  const resolveUrl = (pathTail, headingId) => {
    const otherPage = resolvePage(pathTail);
    return headingId ? `${otherPage._path}#${headingId}` : otherPage._path;
  };

  return {
    pages,
    data,
    buildOpts,
    findTagPageByName,
    resolvePage,
    resolveUrl,
    getLocalizedPath,
  };
}

async function buildContent(buildOpts) {
  const pages = loadPageMetadata(buildOpts.contentDir);
  const data = loadStructuredData(buildOpts.invaderDefsDir);
  const metaIndex = buildMetaIndex(await pages, await data, buildOpts);

  await fs.mkdir(buildOpts.outputDir, {recursive: true});
  await Promise.all([
    renderPages(metaIndex, buildOpts),
    buildSitemap(metaIndex, buildOpts)
  ]);
}

module.exports = buildContent;
