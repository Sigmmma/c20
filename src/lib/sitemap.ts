import fs from "fs";
import path from "path";
import {type BuildOpts} from "../build";
import {tryLocalizedPath, type PageIndex} from "./content";

export async function buildSitemap(pageIndex: PageIndex, buildOpts: BuildOpts) {
  const {outputDir, baseUrl} = buildOpts;
  const urls: string[] = [];

  Object.entries(pageIndex).forEach(([pageId, pageDataByLang]) => {
    Object.entries(pageDataByLang).forEach(([lang, pageData]) => {
      if (!pageData.front.stub && !pageData.front.noSearch) {
        urls.push(`${baseUrl}${tryLocalizedPath(pageIndex, pageId, lang)}`);
      }
    });
  });

  const sitemap = urls.join("\n");
  const robots = `User-agent: *\nDisallow: /assets/\nSitemap: ${baseUrl}/sitemap.txt\n`;

  await fs.promises.mkdir(outputDir, {recursive: true});
  await Promise.all([
    fs.promises.writeFile(path.join(outputDir, "sitemap.txt"), sitemap, "utf8"),
    fs.promises.writeFile(path.join(outputDir, "robots.txt"), robots, "utf8")
  ]);
};