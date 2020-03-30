const path = require("path");
const {html} = require("common-tags");
const markdownIt = require("markdown-it");
const hljs = require("highlight.js");

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
  return renderer.render(md + "\n" + mdFooter);
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
        <!-- <link rel="stylesheet" href="/main.css"/> -->
      </head>
      <body>
        <nav>
          Breadcrumbs
          ${ul(breadcrumbs.map(pageAnchor))}
        </nav>
        <article>
          ${body}
        </article
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
  renderMarkdown
};
