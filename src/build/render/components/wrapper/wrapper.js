const R = require("ramda");
const {html, escapeHtml, REPO_URL, pageAnchor, localizer, detailsList, DISCORD_URL, icon} = require("../bits");
const {renderMarkdown} = require("../markdown");
const footer = require("./footer");
const breadcrumbs = require("./breadcrumbs");
const metabox = require("./metabox");
const toc = require("./toc");
const thanksList = require("./thanksList");

const TOC_MIN_HEADERS = 2;
const COLLAPSE_CHILD_PAGES = 20;
const COLLAPSE_RELATED_PAGES = 4;
const COLLAPSE_MAIN_TOPIC_PAGES = 20;
const PREVIEW_LENGTH_CHARS = 100;

const mainTopics = [
  ["/general"],

  ["/h1"],
  ["/h1/tags"],
  ["/h1/guides"],
  ["/h1/tools/h1a-ek"],

  ["/h2"],
  ["/h2/tags"],
  //["/h2/guides"],
  ["/h2/tools/h2-ek"],

  ["/h3"],
  ["/h3/tags"],
  //["/h3/guides"],
  ["/h3/h3-ek"],
];

// keep this sorted with longer root/prefixes listed first as the code looks for the first match.
const spaces = [
  {root: "/h3odst", img: "/h3odst/Halo_3_odst_final_boxshot.jpg"},
  {root: "/h3", img: "/h3/Halo_3_final_boxshot.jpg"},
  {root: "/h2", img: "/h2/h2cover.jpg"},
  {root: "/h1", img: "/h1/box-art.jpg"},
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
    en: "Page contents",
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

const wrapper = (ctx, headings, thanks, metaboxProps, body, bodyPlaintext) => {
  const {page, pageIndex, lang, buildOpts: {baseUrl}} = ctx;
  const localize = localizations(lang);
  const editPageUrl = `${REPO_URL}/edit/master/src/content${page.pageId}/readme${lang == "en" ? "" : "_" + lang}.md`;
  const imgAbsoluteUrl = page.img ?
    `${baseUrl}${page.localizedPaths[lang]}/${page.img}` :
    `${baseUrl}/assets/librarian.png`;

  //we only want a plaintext preview if the page is nonempty and isn't just a placeholder "..."
  let plaintextPreview = "";
  if (bodyPlaintext && !bodyPlaintext.startsWith("...")) {
    //trim the plaintext preview to a maximum length
    bodyPlaintext = bodyPlaintext.replace(/\n/g, " ").trim();
    plaintextPreview = bodyPlaintext.length > PREVIEW_LENGTH_CHARS ?
      `${bodyPlaintext.substring(0, PREVIEW_LENGTH_CHARS)}...` :
      bodyPlaintext
  }
  const keywords = R.path(["keywords", lang], page);
  const otherLangs = page.langs.filter(it => it != lang);

  const thanksResult = thanksList(ctx, thanks);
  if (thanksResult.headings) {
    headings = [...headings, ...thanksResult.headings];
  }

  const space = spaces.find(s => page.pageId.startsWith(s.root));

  const mainContent = html`
    <article class="content-article">
      <div class="page-title">
        <nav class="breadcrumbs">
          ${breadcrumbs(ctx)}
        </nav>
        <div class="title-line">
          <h1 class="page-title">${escapeHtml(page.tryLocalizedTitle(lang))}</h1>
          <div class="title-extra">
            ${otherLangs.map(otherLang => html`
              <a href="${page.localizedPaths[otherLang]}">${langNames[otherLang]}</a> /
            `)}
            <a href="${editPageUrl}">${localize("edit")}</a>
            ${space && html`
              <a href="${pageIndex.pages[space.root].tryLocalizedPath(lang)}"><img class="space-image" src="${space.img}" alt="${pageIndex.pages[space.root].tryLocalizedTitle(lang)}"/></a>
            `}
          </div>
        </div>
      </div>
    ${metabox(ctx, metaboxProps)}
    ${body}
    ${thanksResult.html}
    </article>
  `;


  return html`
    <!DOCTYPE html>
    <html lang="${lang}">
      <head>
        <meta charset="utf-8"/>
        ${page.Page404 &&
          html`<meta itemprop="Is404" content='true'>`
        }
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
        <meta property="og:description" content="${escapeHtml(plaintextPreview)}"/>
        <meta property="og:image" content="${imgAbsoluteUrl}"/>
        <title>${page.tryLocalizedTitle(lang)} - c20</title>
        <link rel="preload" type="application/json" as="fetch" href="/assets/search-index_${lang}.json">
        <link rel="icon" type="image/png" href="/assets/librarian.png">
        <link rel="stylesheet" href="/assets/style.css"/>
        <link id="syntax" rel="stylesheet" href="/assets/night-owl.css"/>
        <script>document.documentElement.dataset.theme = window.localStorage.getItem("theme") || "dark";</script>
      </head>
      <body>
        <div ${page.Page404 ? "" : 'class="page-layout"'}>
          <div class="page-sidebar">
            <div class="sidebar-inner">
              <header class="sidebar-header">
                <a class="c20-logo" href="${ctx.resolveUrl("/")}">
                  <span class="c20-name-short">c20</span>
                  <span class="c20-name-long">${localize("siteName")}</span>
                </a>
                <button class="nobg" id="toggle-theme">
                  <span class="dark">${icon("moon", "Dark mode")}</span>
                  <span class="light">${icon("sun", "Light mode")}</span>
                </button>
              </header>
              ${page.Page404  && html`
              <main role="main" class="sidebar-header">
                ${mainContent}
              </main>
              `}
              <nav class="sidebar-nav">
                <div id="c20-search-mountpoint"></div>
                ${headings.length > TOC_MIN_HEADERS && html`
                  <div class="sidebar-toc">
                    <h2 id="table-of-contents">${icon("list")} ${localize("toc")}</h2>
                    ${toc(headings)}
                  </div>
                `}
                ${page.children && page.children.length > 0 &&
                  detailsList(html`<h2>${localize("children")}</h2>`, page.children.map(pageAnchor(lang)), COLLAPSE_CHILD_PAGES, 0)
                }
                ${page.related && page.related.length > 0 &&
                  detailsList(html`<h2>${localize("related")}</h2>`, page.related.map(pageAnchor(lang)), COLLAPSE_RELATED_PAGES, 0)
                }
                ${detailsList(html`<h2>${localize("main")}</h2>`, mainTopics.map(pageId => pageAnchor(lang, pageIndex.pages[pageId])), COLLAPSE_MAIN_TOPIC_PAGES, 0)}

                <p>
                  <a href="${DISCORD_URL}">${icon("message-square", "Chat")} Discord</a>
                </p>
              </nav>
            </div>
          </div>
          <main role="main" class="page-content-main">
    ${!page.Page404 && mainContent}
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
