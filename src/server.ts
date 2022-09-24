import express from "express";
import path from "path";

export default function runServer() {
  const port = process.env.C20_PORT ? Number(process.env.C20_PORT) : 8080;
  const app = express();

  // app.get("/:lang(en|es)?/:page([-/_a-zA-Z0-9]+)?", async (req, res) => {
  //   const lang = req.params.lang?.toLowerCase() ?? "en";
  //   const pagePath = req.params.page ?? "/";
  //   console.log(`Handling ${pagePath}`);
  //   const mdSrcPath = path.join(
  //     "./src/content",
  //     path.normalize(pagePath),
  //     lang == "en" ? "readme.mdoc" : `readme_${lang}.mdoc`
  //   );
  
  //   let mdSrc: string;
  //   try {
  //     mdSrc = await fs.readFile(mdSrcPath, "utf-8");
  //   } catch (err) {
  //     res.status(404);
  //     res.send(`Page source not found: ${mdSrcPath}`);
  //     return;
  //   }
  
  //   res.header("Content-Type", "text/html; charset=UTF-8");
  //   res.send(renderPage(mdSrc));
  // });

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