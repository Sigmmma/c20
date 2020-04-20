const commonTags = require("common-tags");

const html = commonTags.stripIndent(commonTags.html);

const anchor = (href, body) => html`
  <a href="${href}">${body}</a>
`;

const pageAnchor = (page) => anchor(page._dirUrl, page.title);

const ol = (items) => html`
  <ul>
    ${items.map((item) => html`
      <li>${item}</li>
    `)}
  <ul>
`;

const ul = (items) => html`
  <ul>
    ${items.map((item) => html`
      <li>${item}</li>
    `)}
  <ul>
`;

const alert = ({type, body}) => html`
  <div class="alert type-${type || "info"}">
    ${body}
  </div>
`;

module.exports = {
  html,
  anchor,
  pageAnchor,
  ul,
  ol,
  alert
};
