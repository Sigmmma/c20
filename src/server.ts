import express from "express";
import path from "path";
import renderPage from "./lib/render/render";
import buildOpts from "../build-config.json";
import fs from "fs";
import {loadPageIndex} from "./lib/content";
import {loadYamlTree} from "./lib/utils/files";
const loadStructuredData = require("./data");

export default function runServer() {
  const port = process.env.C20_PORT ? Number(process.env.C20_PORT) : 8080;
  const app = express();

  app.get("/:lang(en|es)?/:page([-/_a-zA-Z0-9]+)?", async (req, res, next) => {
    if (!req.query.live) {
      next();
      return;
    }
    const lang = req.params.lang?.toLowerCase() ?? "en";
    const pageId = req.params.page ?
      `/${req.params.page.endsWith("/") ? req.params.page.replace(/\/+$/, "") : req.params.page}` :
      "/";
    const logicalPath = req.params.page?.split("/") ?? [];
    const baseDir = path.join("./src/content", path.normalize(pageId));
    const mdSrcPath = path.join(baseDir, lang == "en" ? "readme.md" : `readme_${lang}.md`);
    
    console.log(`Live-rendering ${pageId}`);

    const dataPromise = loadStructuredData();
    const localDataPromise = loadYamlTree(baseDir, {nonRecursive: true});
    const pageIndexPromise = loadPageIndex("./src/content");
  
    let mdSrc: string;
    try {
      mdSrc = await fs.promises.readFile(mdSrcPath, "utf-8");
    } catch (err) {
      res.status(404);
      res.send(`Page source not found: ${mdSrcPath}`);
      return;
    }

    const renderOutput = renderPage({
      pageId,
      mdFileName: mdSrcPath,
      baseUrl: buildOpts.baseUrl,
      logicalPath,
      mdSrc,
      lang,
      // localizedPaths: page.localizedPaths,
      localizedPaths: {
        [lang]: pageId,
      },
      // otherLangs: page.langs.filter(l => l != lang),
      data: await dataPromise,
      localData: await localDataPromise,
      pageIndex: await pageIndexPromise,
    });
  
    res.header("Content-Type", "text/html; charset=UTF-8");
    res.send(renderOutput.htmlDoc);
  });

  // Assume anything that is not a specified route is a file we want to serve
  app.use(express.static("./dist"));
  app.use(express.static("./src/content"));

  // Fall through to 404 handler
  app.use(function(req, res) {
    console.warn(`Unable to find ${req.url}, returning 404!`);
	  res.status(404);
	  res.header("Content-Type", "text/plain; charset=UTF-8");
	  res.send("Page or file not found!");
  });

  app.listen(port);
  console.log(`Serving at http://localhost:${port}/`);
};