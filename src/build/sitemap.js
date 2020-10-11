const fs = require("fs").promises;
const path = require("path");

async function buildSitemap(metaIndex, buildOpts) {
  const sitemap = Object.values(metaIndex.pages)
    .filter(page => !page.stub)
    .flatMap(page =>
      page.langs.map(lang =>
        `${buildOpts.baseUrl}${metaIndex.getLocalizedPath(page.pageId, lang)}`
      )
    )
    .join("\n");

  const robots = `User-agent: *\nDisallow: /assets/\nSitemap: ${buildOpts.baseUrl}/sitemap.txt\n`;

  await Promise.all([
    fs.writeFile(path.join(buildOpts.outputDir, "sitemap.txt"), sitemap, "utf8"),
    fs.writeFile(path.join(buildOpts.outputDir, "robots.txt"), robots, "utf8")
  ]);
}

module.exports = buildSitemap;
