const R = require("ramda");
const {html, escapeHtml, REPO_URL, pageAnchor, localizer, detailsList} = require("../bits");
const {renderMarkdown} = require("../markdown");
const footer = require("./footer");
const header = require("./header");
const breadcrumbs = require("./breadcrumbs");
const metabox = require("./metabox");
const toc = require("./toc");
const thanksList = require("./thanksList");

const TOC_MIN_HEADERS = 2;
const COLLAPSE_CHILD_PAGES = 8;
const PREVIEW_LENGTH_CHARS = 100;

const mainTopics = [
  ["/h1/tags"],
  ["/h1"]
];

const localizations = localizer({
  locale: {
    en: "en_US",
    es: "es_ES"
  },
  siteName: {
    en: "The Reclaimers Library",
    es: "La Biblioteca de Reclaimers"
  },
  toc: {
    en: "On this page",
    es: "En esta página"
  },
  children: {
    en: "Child pages",
    es: "Páginas secundarias"
  },
  related: {
    en: "Related pages",
    es: "Páginas relacionadas"
  },
  main: {
    en: "Main topics",
    es: "Temas principales"
  },
  edit: {
    en: "Edit",
    es: "Editar"
  }
});

const langNames = {
  en: "English",
  es: "Español"
};

const wrapper = (ctx, headings, thanks, metaboxProps, body) => {
  const {page, pageIndex, lang, buildOpts: {baseUrl}} = ctx;
  const localize = localizations(lang);
  const editPageUrl = `${REPO_URL}/edit/master/src/content${page.pageId}/readme${lang == "en" ? "" : "_" + lang}.md`;
  const imgAbsoluteUrl = page.img ?
    `${baseUrl}${page.localizedPaths[lang]}/${page.img}` :
    `${baseUrl}/assets/librarian.png`;

  const plaintextPreview = page._md ? `${renderMarkdown(page._md, pageIndex, true).substring(0, PREVIEW_LENGTH_CHARS)}...` : "";
  const keywords = R.path(["keywords", lang], page);
  const otherLangs = page.langs.filter(it => it != lang);

  const thanksResult = thanksList(ctx, thanks);
  if (thanksResult.headings) {
    headings = [...headings, ...thanksResult.headings];
  }

  return html`
    <!DOCTYPE html>
    <html lang="${lang}">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="robots" content="index, follow">
        <meta property="og:title" content="${page.tryLocalizedTitle(lang)}"/>
        <meta property="og:site_name" content="${localize("siteName")}"/>
        <meta property="og:type" content="website"/>
        <meta property="og:locale" content="${localize("locale")}"/>
        ${otherLangs.map(otherLang => html`
          <meta property="og:locale:alternate" content="${localizations(otherLang, "locale")}"/>
        `)}
        ${keywords && keywords.map(keyword => html`
          <meta property="og:article:tag" content="${keyword}"/>
        `)}
        <meta property="og:url" content="${baseUrl}${page.tryLocalizedPath(lang)}"/>
        <meta property="og:description" content="${plaintextPreview}"/>
        <meta property="og:image" content="${imgAbsoluteUrl}"/>
        <title>${page.tryLocalizedTitle(lang)} - c20</title>
        <link rel="preload" type="application/json" as="fetch" href="/assets/search-index_${lang}.json">
        <link rel="icon" type="image/png" href="/assets/librarian.png">
        <link rel="stylesheet" href="/assets/style.css"/>
        <link rel="stylesheet" href="/assets/night-owl.css"/>
      </head>
      <body>
        ${header(ctx, localize("siteName"))}
        <div class="content-layout">
          <aside class="content-sidebar">
            ${headings.length > TOC_MIN_HEADERS && html`
              <h2 id="table-of-contents">${localize("toc")}</h2>
              ${toc(headings)}
            `}
            ${page.children && page.children.length > 0 &&
              detailsList(html`<h2>${localize("children")}</h2>`, page.children.map(pageAnchor(lang)))
            }
            ${page.related && page.related.length > 0 &&
              detailsList(html`<h2>${localize("related")}</h2>`, page.related.map(pageAnchor(lang)))
            }
            ${detailsList(html`<h2>${localize("main")}</h2>`, mainTopics.map(pageId => pageAnchor(lang, pageIndex.pages[pageId])))}
          </aside>
          <main role="main" class="content-main">
            <nav class="breadcrumbs">
              ${breadcrumbs(ctx)}
            </nav>
            <article class="content-article">
              <div class="page-title">
                <h1 class="page-title">${escapeHtml(page.tryLocalizedTitle(lang))}</h1>
                <div class="edit-buttons">
                  ${otherLangs.map(otherLang => html`
                    <a href="${page.localizedPaths[otherLang]}">${langNames[otherLang]}</a> /
                  `)}
                  <a href="${editPageUrl}">${localize("edit")}</a>
                </div>
              </div>
    ${metabox(ctx, metaboxProps)}
    ${body}
    ${thanksResult.html}
            </article>
          </main>
          ${footer(ctx)}
        </div>
        <script src="/assets/minisearch/dist/umd/index.js"></script>
        <script src="/assets/htm/preact/standalone.umd.js"></script>
        <script src="/assets/main.js"></script>
      </body>
    </html>
  `;
};

module.exports = wrapper;
