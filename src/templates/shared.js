const path = require("path");
const {html} = require("common-tags");
const markdownIt = require("markdown-it");
const markdownItAnchors = require("markdown-it-anchor");
const markdownItToC = require("markdown-it-table-of-contents");
const hljs = require("highlight.js");

const REPO = "https://github.com/Sigmmma/c20";

const mdRenderer = markdownIt({
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

//prevents protocol-less links from being turned into <a>
mdRenderer.linkify.set({
  fuzzyLink: false
});

//anchor options here: https://www.npmjs.com/package/markdown-it-anchor
mdRenderer.use(markdownItAnchors, {
  permalink: true,
  permalinkSymbol: "#"
});

mdRenderer.use(markdownItToC, {
  includeLevel: [1, 2],
  containerHeaderHtml: html`
    <h2>Table of contents</h2>
  `
});

const alert = ({type, body}) => html`
  <div class="alert type-${type || "info"}">
    ${body}
  </div>
`;

const STUB_ALERT = alert({type: "danger", body: html`
  <p>🚧 This article is a stub. You can help expand it by submitting content in
  pull requests or issues in this wiki's <a href="${REPO}">source repo</a>.</p>
`});

const metabox = ({metaTitle, metaColour, img, imgCaption, mdSections, metaIndex, htmlSections}) => {
  return html`
    <aside class="metabox">
      <section class="header" style="background: ${metaColour || "none"}">
        <p><strong>${metaTitle}</strong></p>
      </section>
      ${img && html`
        <section class="img">
          <a href="${img}"><img src="${img}" alt="${imgCaption || ""}"/></a>
        </section>
      `}
      ${imgCaption && html`
        <section class="caption">
          <p><em>${renderMarkdown(imgCaption, metaIndex)}</em></p>
        </section>
      `}
      ${mdSections && mdSections.filter(it => it).map(mdSection => html`
        <section class="info">
          ${renderMarkdown(mdSection, metaIndex)}
        </section>
      `)}
      ${htmlSections && htmlSections.filter(it => it).map(htmlSection => html`
        <section class="info">
          ${htmlSection}
        </section>
      `)}
    </aside>
  `;
};

const renderMarkdown = (md, metaIndex) => {
  return mdRenderer.render(metaIndex ? (md + "\n\n" + metaIndex.mdFooter) : md);
};

const wrapper = (page, metaIndex, body) => {
  const breadcrumbs = [];
  for (let i = 0; i <= page._dir.length; i++) {
    const parentUrl = "/" + page._dir.slice(0, i).join("/");
    const parent = metaIndex.pages.find(otherPage => otherPage._dirUrl == parentUrl);
    if (parent) {
      breadcrumbs.push(parent);
    }
  }
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <title>${page.title} - c20</title>
        <link rel="stylesheet" href="/assets/style.css"/>
        <link rel="stylesheet" href="/assets/atom-one-dark.css"/>
      </head>
      <body>
        <main>
          <nav class="breadcrumbs">
            ${ul(breadcrumbs.map(pageAnchor))}
          </nav>
          <article class="content">
            <h1 class="page-title">${page.title}</h1>
            ${body}
            ${page.stub && html`
              <hr/>
              ${STUB_ALERT}
            `}
          </article>
          <footer class="content-footer">
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

const anchor = (href, body) => html`
  <a href="${href}">${body}</a>
`;

const pageAnchor = (page) => anchor(page._dirUrl, page.title);

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
