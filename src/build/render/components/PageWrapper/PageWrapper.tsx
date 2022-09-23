import Metabox, {MetaboxProps} from "../Metabox/Metabox";
import Ctx from "../Ctx/Ctx";

const R = require("ramda");
const {html, escapeHtml, REPO_URL, pageAnchor, localizer, detailsList, DISCORD_URL, JIF_ISSUE_URL, icon} = require("../bits");
const footer = require("./footer");
const breadcrumbs = require("./breadcrumbs");
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
  
  ["/hr"],
  ["/hr/tags"],
  //["/hr/guides"],
  ["/hr/hr-ek"],
];

// keep this sorted with longer root/prefixes listed first as the code looks for the first match.
const spaces = [
  {root: "/hr", img: "/hr/Halo_reach_final_boxshot.jpg"},
  {root: "/h3odst", img: "/h3odst/Halo_3_odst_final_boxshot.jpg"},
  {root: "/h3", img: "/h3/Halo_3_final_boxshot.jpg"},
  {root: "/h2", img: "/h2/h2cover.jpg"},
  {root: "/h1", img: "/h1/box-art.jpg"},
];

const mccToolkitPages = [
  "/h1/tools/h1a-ek",
  "/h2/tools/h2-ek",
  "/h3/h3-ek",
  "/h3odst/h3odst-ek"
]

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
  },
  issue: {
    en: "Please describe the issue with the wiki page in as much detail as you can and make sure to update the title."
  },
  reportWiki: {
    en: "Report a wiki issue"
  },
  reportToolkit: {
    en: "Report a toolkit issue"
  }
});

const langNames = {
  en: "English",
  es: "Español"
};

export type PageWrapperProps = {
  ctx: any;
  headings: any;
  thanks: any;
  metaboxProps?: MetaboxProps;
  body: any;
  bodyPlaintext: any;
}

export default function PageWrapper(props: PageWrapperProps) {
  let {ctx, headings, thanks, metaboxProps, body, bodyPlaintext} = props;
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
  const isToolkitPage = mccToolkitPages.some(prefix => page.pageId.startsWith(prefix))

  const newIssueUrl = `${REPO_URL}/issues/new?title=${encodeURIComponent("[" + page.title["en"] + "] - <Your issue here>")}&body=${encodeURIComponent("<!---" + localize("issue") + "-->")}`;

  const mainContent = (
    <article className="content-article">
      <div className="page-title">
        <nav className="breadcrumbs">
          {breadcrumbs(ctx)}
        </nav>
        <div className="title-line">
          <h1 className="page-title">{page.tryLocalizedTitle(lang)}</h1>
          <div className="title-extra">
            {otherLangs.map(otherLang =>
              <a href={page.localizedPaths[otherLang]}>{langNames[otherLang]} /</a>
            )}
            <a href={editPageUrl}>{localize("edit")}</a>
            {space &&
              <a href={pageIndex.pages[space.root].tryLocalizedPath(lang)}>
                <img className="space-image" src={space.img} alt={pageIndex.pages[space.root].tryLocalizedTitle(lang)}/>
              </a>
            }
          </div>
        </div>
      </div>
      {metaboxProps &&
        <Metabox {...metaboxProps}/>
      }
      {body}
      {thanksResult.html}
    </article>
  );

  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8"/>
        {page.Page404 &&
          <meta itemProp="Is404" content='true'/>
        }
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <meta name="robots" content="index, follow"/>
        <meta property="og:title" content={page.tryLocalizedTitle(lang)}/>
        <meta property="og:site_name" content={localize("siteName")}/>
        <meta property="og:type" content="website"/>
        <meta property="og:locale" content={localize("locale")}/>
        {otherLangs.map(otherLang =>
          <meta key={otherLang} property="og:locale:alternate" content={localizations(otherLang, "locale")}/>
        )}
        {keywords && keywords.map(keyword =>
          <meta property="og:article:tag" content={keyword}/>
        )}
        <meta property="og:url" content={`${baseUrl}${page.tryLocalizedPath(lang)}`}/>
        <meta property="og:description" content={escapeHtml(plaintextPreview)}/>
        <meta property="og:image" content={imgAbsoluteUrl}/>
        <title>{page.tryLocalizedTitle(lang)} - c20</title>
        <link rel="preload" type="application/json" as="fetch" href={`/assets/search-index_${lang}.json`}/>
        <link rel="icon" type="image/png" href="/assets/librarian.png"/>
        <link rel="stylesheet" href="/assets/style.css"/>
        <link id="syntax" rel="stylesheet" href="/assets/night-owl.css"/>
        <script>document.documentElement.dataset.theme = window.localStorage.getItem("theme") || "dark";</script>
      </head>
      <body>
        <Ctx.Provider value={ctx}>
          <div className={page.Page404 ? undefined : "page-layout"}>
            <div className="page-sidebar">
              <div className="sidebar-inner">
                <header className="sidebar-header">
                  <a className="c20-logo" href={ctx.resolveUrl("/")}>
                    <span className="c20-name-short">c20</span>
                    <span className="c20-name-long">{localize("siteName")}</span>
                  </a>
                  <button className="nobg" id="toggle-theme">
                    <span className="dark">{icon("moon", "Dark mode")}</span>
                    <span className="light">{icon("sun", "Light mode")}</span>
                  </button>
                </header>
                {page.Page404 &&
                  <main role="main" className="sidebar-header">
                    {mainContent}
                  </main>
                }
                <nav className="sidebar-nav">
                  <div id="c20-search-mountpoint"></div>
                  {headings.length > TOC_MIN_HEADERS &&
                    <div className="sidebar-toc">
                      <h2 id="table-of-contents">{icon("list")} {localize("toc")}</h2>
                      {toc(headings)}
                    </div>
                  }
                  {page.children && page.children.length > 0 &&
                    detailsList(html`<h2>${localize("children")}</h2>`, page.children.map(pageAnchor(lang)), COLLAPSE_CHILD_PAGES, 0)
                  }
                  {page.related && page.related.length > 0 &&
                    detailsList(html`<h2>${localize("related")}</h2>`, page.related.map(pageAnchor(lang)), COLLAPSE_RELATED_PAGES, 0)
                  }
                  {detailsList(html`<h2>${localize("main")}</h2>`, mainTopics.map(pageId => pageAnchor(lang, pageIndex.pages[pageId as any])), COLLAPSE_MAIN_TOPIC_PAGES, 0)}

                  <p><a href={DISCORD_URL}>{icon("message-square", "Chat")} Discord</a></p>
                  <p><a href={newIssueUrl}>{icon("flag", "Report")} {localize("reportWiki")}.</a></p>
                  {isToolkitPage && 
                    <p><a href={JIF_ISSUE_URL}>{icon("flag", "Report")} {localize("reportToolkit")}.</a></p>
                  }
                </nav>
              </div>
            </div>
            {!page.Page404 &&
              <main role="main" className="page-content-main">
                {mainContent}
              </main>
            }
            {footer(ctx)}
          </div>
        </Ctx.Provider>
        <script src="/assets/minisearch/dist/umd/index.js"></script>
        <script src="/assets/htm/preact/standalone.umd.js"></script>
        <script src="/assets/main.js"></script>
      </body>
    </html>
  );
};
