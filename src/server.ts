import fs from "fs";
import express from "express";
import buildConfig from "../build-config.json";
// SPOOPY BUG: do not reorder the next two lines!!!!!
import renderPage from "./lib/render/render";
import {getPageBaseDir, getPageMdSrcPath, loadPageIndex} from "./lib/content";
import {loadYamlTree} from "./lib/utils/files";
import {type BuildOpts} from "./build";
import {parse} from "./lib/components/Md/markdown";
const loadStructuredData = require("./data");

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
    app.get("/:page([-/_a-zA-Z0-9]+)?", async (req, res, next) => {
      // const lang = req.params.lang?.toLowerCase() ?? "en";
      const lang = "en";
      const pageId = req.params.page ?
        `/${req.params.page.endsWith("/") ? req.params.page.replace(/\/+$/, "") : req.params.page}` :
        "/";
      
      console.log(`Rendering ${pageId}`);
      const baseDir = getPageBaseDir(pageId, buildOpts);
      const mdSrcPath = getPageMdSrcPath(baseDir, lang);

      const dataPromise = loadStructuredData();
      const localDataPromise = loadYamlTree(baseDir, {nonRecursive: true});
      const pageIndexPromise = loadPageIndex(buildOpts.contentDir, await dataPromise);
      const mdSrcPromise = fs.promises.readFile(mdSrcPath, "utf-8");

      let mdSrc = await mdSrcPromise;
      // try {
      //   mdSrc = await ;
      // } catch (err) {
      //   res.status(404);
      //   res.send(`Page source not found: ${mdSrcPath}`);
      //   return;
      // }  
      
      const {ast, frontmatter} = parse(mdSrc, mdSrcPath);

      const renderOutput = renderPage({
        baseUrl: buildOpts.baseUrl,
        noThumbs: !!process.env.C20_NO_THUMBNAILS,
        debug: !!process.env.C20_DEBUG || req.query.debug,
        pageId,
        lang,
        ast,
        front: frontmatter,
        localData: await localDataPromise,
        globalData: await dataPromise,
        pageIndex: await pageIndexPromise,
      });
    
      res.header("Content-Type", "text/html; charset=UTF-8");
      res.send(renderOutput.htmlDoc);
    });
  }

  // Fall through to 404 handler
  app.use(function(req, res) {
    console.warn(`Unable to handle URL ${req.url}, returning 404!`);
	  res.status(404);
	  res.header("Content-Type", "text/plain; charset=UTF-8");
	  res.send("Page or file not found!");
  });

  app.listen(port);
  console.log(`Serving at http://localhost:${port}/. Press Ctrl+C to stop.`);
};
