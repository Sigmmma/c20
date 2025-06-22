import fs from "fs";
import express from "express";
import path from "path";
import buildConfig from "../build-config.json";
// SPOOPY BUG: do not reorder the next two lines!!!!!
import renderPage from "./lib/render";
import {buildPageIndex} from "./lib/content/pages";
import {loadYamlTree} from "./lib/utils/files";
import {type BuildOpts} from "./build";
import {parse} from "./lib/markdown/markdown";
import {buildSearchIndexJson, SearchDoc} from "./lib/search";
import {buildRedirects} from "./lib/redirects";
import loadStructuredData from "./data";
import {renderViz} from "./lib/resources";
import {getPageBaseDir, getPageMdSrcPath, loadParsedPages} from "./lib/content/content-files";

const buildOpts: BuildOpts = {
  baseUrl: buildConfig.baseUrl,
  contentDir: buildConfig.paths.srcContentBase,
  outputDir: buildConfig.paths.dist,
  noThumbs: !!process.env.C20_NO_THUMBNAILS,
};

export default function runServer(onDemand: boolean) {
  const port = process.env.C20_PORT ? Number(process.env.C20_PORT) : 8080;
  const app = express();

  // Serve everything in the output dir, except index.html when in onDemand mode
  app.use(express.static(buildOpts.outputDir, {index: onDemand ? false : ["index.html"]}));

  if (onDemand) {
    app.use(express.static(buildOpts.contentDir));
    
    app.get("/:path([-/_a-zA-Z0-9]+).svg", async (req, res, next) => {
      const dotFilePath = path.join(buildOpts.contentDir, `${req.params.path}.dot`);
      console.log(`Rendering dot file ${dotFilePath}`);
      const vizSrc = await fs.promises.readFile(dotFilePath, "utf8");
      const svg = await renderViz(vizSrc);
      res.header("Content-Type", "image/svg+xml; charset=UTF-8");
      res.send(svg);
    });
    
    app.get("/assets/search-index.json", async (req, res, next) => {
      console.log("Building search index");
      const pageIndex = await loadParsedPages(buildOpts.contentDir);
      const searchDocs: SearchDoc[] = Object.entries(pageIndex).map(([pageId, pageData]): SearchDoc => {
        return {
          path: pageId,
          keywords: pageData.front.keywords?.join(" ") ?? "",
          title: pageData.front.title ?? "",
          text: "", //render plaintext? or keep it fast during dev?
        };
      });
      const json = buildSearchIndexJson(searchDocs);
      res.header("Content-Type", "application/json; charset=UTF-8");
      res.send(json);
    });

    app.get("/assets/page-index.json", async (req, res, next) => {
      console.log("Building page index");
      const parsedPages = await loadParsedPages(buildOpts.contentDir);
      const pageIndex = buildPageIndex(parsedPages);
      const json = JSON.stringify(pageIndex);
      res.header("Content-Type", "application/json; charset=UTF-8");
      res.send(json);
    });
    
    app.get("/:page([-/_a-zA-Z0-9]+)?", async (req, res, next) => {
      const pageId = req.params.page ?
        `/${req.params.page.endsWith("/") ? req.params.page.replace(/\/+$/, "") : req.params.page}` :
        "/";
      
      console.log(`Rendering ${pageId}`);
      const baseDir = getPageBaseDir(pageId, buildOpts);
      const mdSrcPath = getPageMdSrcPath(baseDir);

      const dataPromise = loadStructuredData();
      const localDataPromise = loadYamlTree(baseDir, {nonRecursive: true});
      const parsedPagesPromise = loadParsedPages(buildOpts.contentDir);
      const mdSrcPromise = fs.promises.readFile(mdSrcPath, "utf-8");

      let mdSrc
      try {
        mdSrc = await mdSrcPromise;
      } catch (err) {
        next();
        return;
      }  
      
      const {ast, frontmatter} = parse(mdSrc, mdSrcPath);

      const renderOutput = renderPage({
        lang: "en",
        baseUrl: buildOpts.baseUrl,
        noThumbs: true,
        preloadJson: false,
        pageId,
        ast,
        front: frontmatter,
        localData: await localDataPromise,
        globalData: await dataPromise,
        pageIndex: buildPageIndex(await parsedPagesPromise),
      });
    
      res.header("Content-Type", "text/html; charset=UTF-8");
      res.send(renderOutput.htmlDoc);
    });
  }

  app.get("/:page([-/_a-zA-Z0-9]+)?", async (req, res, next) => {
    const parsedPages = await loadParsedPages(buildOpts.contentDir);
    const redirects = buildRedirects(parsedPages);
    const pageId = req.params.page ?
      `/${req.params.page.endsWith("/") ? req.params.page.replace(/\/+$/, "") : req.params.page}` :
      "/";
    const redirect = redirects[pageId];
    if (redirect) {
      console.log(`Using redirect from '${pageId}' to ${redirect}`);
      res.redirect(redirect);
    } else {
      next();
    }
  });

  // Fall through to 404 handler
  app.use((req, res) => {
    console.warn(`Unable to handle URL ${req.url}, returning 404!`);
	  res.status(404);
	  res.header("Content-Type", "text/plain; charset=UTF-8");
	  res.send("Page or file not found!");
  });

  app.listen(port);
  console.log(`Serving at http://localhost:${port}/. Press Ctrl+C to stop.`);
};
