const commonTags = require("common-tags");

const DISCORD_URL = "https://discord.reclaimers.net";
const REPO_URL = "https://github.com/Sigmmma/c20";

//converts a title into a URL- or ID-friendly slug
const slugify = (title) => title
  .toLowerCase()
  .replace(/['-]/g, "")
  .replace(/[^a-z0-9]/g, " ")
  .split(" ")
  .filter(part => part.length > 0)
  .join("-");

const escapeHtml = (s) => commonTags.safeHtml`${s}`;
const html = commonTags.stripIndent(commonTags.html);

const anchor = (href, body) => html`
  <a href="${href}">${body}</a>
`;

const pageAnchor = (page) => anchor(page._dirUrl, escapeHtml(page.title));

const ol = (items) => html`
  <ol>
    ${items.map((item) => html`
      <li>${item}</li>
    `)}
  </ol>
`;

const ul = (items) => html`
  <ul>
    ${items.map((item) => html`
      <li>${item}</li>
    `)}
  </ul>
`;

const alert = ({type, body}) => html`
  <div class="alert type-${type || "info"}">
    ${body}
  </div>
`;

module.exports = {
  html,
  escapeHtml,
  anchor,
  pageAnchor,
  ul,
  ol,
  alert,
  slugify,
  REPO_URL,
  DISCORD_URL
};
