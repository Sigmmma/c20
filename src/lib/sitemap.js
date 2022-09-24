const fs = require("fs").promises;
const path = require("path");

async function buildSitemap(pageIndex, buildOpts) {
  const {outputDir, baseUrl} = buildOpts;

  const sitemap = Object.values(pageIndex.pages)
    .filter(page => !page.stub)
    .flatMap(page =>
      page.langs.map(lang =>
        `${baseUrl}${page.localizedPaths[lang]}`
      )
    )
    .join("\n");

  const robots = `User-agent: *\nDisallow: /assets/\nSitemap: ${baseUrl}/sitemap.txt\n`;

  await fs.mkdir(outputDir, {recursive: true});
  await Promise.all([
    fs.writeFile(path.join(outputDir, "sitemap.txt"), sitemap, "utf8"),
    fs.writeFile(path.join(outputDir, "robots.txt"), robots, "utf8")
  ]);
}

module.exports = buildSitemap;
