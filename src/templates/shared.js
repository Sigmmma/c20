const path = require("path");
const {html} = require("common-tags");
const markdownIt = require("markdown-it");
const hljs = require("highlight.js");

const REPO = "https://github.com/csauve/c20";

const alert = ({type, body}) => html`
  <div class="alert type-${type || "info"}">
    ${body}
  </div>
`;

const metabox = (title, page, metaColor, mdFooter) => {
  return html`
    <aside id="metabox">
      <section class="header" style="background: ${metaColor || "none"}">
        <p><strong>${title}</strong></p>
      </section>
      ${page.img && html`
        <section class="img">
          <a href="${page.img}"><img src="${page.img}" alt="${page.imgCaption || ""}"/></a>
        </section>
      `}
      ${page.imgCaption && html`
        <section class="caption">
          <p><em>${renderMarkdown(page.imgCaption, mdFooter)}</em></p>
        </section>
      `}
      ${page.info && html`
        <section class="info">
          ${renderMarkdown(page.info, mdFooter)}
        </section>
      `}
    </aside>
  `;
};

const renderMarkdown = (md, mdFooter) => {
  const renderer = markdownIt({
    html: true,
    linkify: true,
    typographer: false,
    breaks: false,
    highlight: (code, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, code).value;
        } catch (err) {
          console.warn(`Failed to highlight code with language ${lang}`);
        }
      }
      return code;
    }
  });
  return renderer.render(mdFooter ? (md + "\n\n" + mdFooter) : md);
};

const wrapper = ({page, metaIndex, body}) => {
  const breadcrumbs = [];
  for (let i = 0; i <= page._dir.length; i++) {
    const parentUrl = "/" + page._dir.slice(0, i).join("/");
    const parent = metaIndex.pages.find(otherPage => otherPage._dirUrl == parentUrl);
    if (parent) {
      breadcrumbs.push(parent);
    }
  }
  return html`
    <html>
      <head>
        <title>${page.title} - c20</title>
        <link rel="stylesheet" href="/assets/style.css"/>
        <link rel="stylesheet" href="/assets/atom-one-dark.css"/>
      </head>
      <body>
        <main>
          <nav id="breadcrumbs">
            ${ul(breadcrumbs.map(pageAnchor))}
          </nav>
          <article id="content">
            ${body}
            ${page.stub && html`
              <hr/>
              ${alert({type: "danger", body: html`
                <p>This article is a stub. You can help expand it by submitting content in pull requests or issues in this wiki's <a href="${REPO}">source repo</a>.</p>
              `})}
            `}
          </article>
          <footer id="content-footer">
            <p>
              <small>
                This text is available under the <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0 license</a>
                •
                <a href="#">Go to top</a>
              </small>
            </p>
          </footer>
        </main>
      </body>
    </html>
  `;
};

const anchor = ({href, body}) => html`
  <a href="${href}">${body}</a>
`;

const pageAnchor = (page) => anchor({href: page._dirUrl, body: page.title});

const ul = (items) => html`
  <ul>
    ${items.map((item) => html`
      <li>${item}</li>
    `)}
  <ul>
`;

module.exports = {
  wrapper,
  ul,
  pageAnchor,
  anchor,
  renderMarkdown,
  metabox,
  alert
};
