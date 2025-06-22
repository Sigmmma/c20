import fs from "fs";
import path from "path";
import {BuildOpts} from "../build";
import {formatUrlPath, PageIndex} from "./content/pages";

export async function buildSitemap(pageIndex: PageIndex, buildOpts: BuildOpts) {
  const {outputDir, baseUrl} = buildOpts;
  const urls: string[] = [];

  Object.entries(pageIndex).forEach(([pageId, pageData]) => {
    if (!pageData.stub) {
      urls.push(`${baseUrl}${formatUrlPath(pageId)}`);
    }
  });

  const sitemap = urls.join("\n");
  const robots = `User-agent: *\nDisallow: /assets/\nSitemap: ${baseUrl}/sitemap.txt\n`;

  await fs.promises.mkdir(outputDir, {recursive: true});
  await Promise.all([
    fs.promises.writeFile(path.join(outputDir, "sitemap.txt"), sitemap, "utf8"),
    fs.promises.writeFile(path.join(outputDir, "robots.txt"), robots, "utf8")
  ]);
}