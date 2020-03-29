const path = require("path");
const {html} = require("common-tags");

const wrapper = ({page, metaIndex, body}) => {
  const breadcrumbs = [];
  for (let i = 0; i <= page._dir.length; i++) {
    const parentLink = page._dir.slice(0, i).join("/");
    const parent = metaIndex.pages.find((otherPage) =>
      otherPage._dir.join("/") == parentLink
    );
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

const pageHref = (page) => `/${page._dir.join("/")}`;

const pageAnchor = (page) => anchor({href: pageHref(page), body: page.title});

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
  pageHref,
};
