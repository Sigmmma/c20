const commonTags = require("common-tags");

const DISCORD_URL = "https://discord.reclaimers.net";
const REPO_URL = "https://github.com/Sigmmma/c20";
const MAX_DETAILS_LIST = 8;

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

const classes = (classArr) => classArr.length > 0 ? `class="${classArr.join(" ")}"` : "";

const anchor = (href, body) => html`
  <a href="${href}">${body}</a>
`;

const pageAnchor = (page) => anchor(page._path, escapeHtml(page.title));

const tagAnchor = (tag, metaIndex, hash) => {
  const tagPage = metaIndex.findTagPageByName(tag.name);
  return anchor(`${tagPage._path}${hash ? `#${hash}` : ""}`, tag.name);
};

const heading = (hTag, title) => html`
  <${hTag} id="${slugify(title)}">
    ${title}
    <a href="#${slugify(title)}" class="header-anchor">#</a>
  </${hTag}>
`;

const detailsList = (summary, items, forceState) => {
  if (items.length == 0) {
    return null;
  } else if (items.length == 1) {
    return html`<p>${summary}: ${items[0]}</p>`;
  } else if (items.length <= MAX_DETAILS_LIST) {
    return html`
      <details ${forceState !== false && "open"}>
        <summary>${summary}</summary>
        ${ul(items)}
      </details>
    `;
  } else {
    return html`
      <details ${forceState === true && "open"}>
        <summary>${summary} (${items.length})</summary>
        ${ul(items)}
      </details>
    `;
  }
};

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

//types: info, danger
const alert = (type, body) => html`
  <div class="alert type-${type || "info"}">
    ${body}
  </div>
`;

module.exports = {
  html,
  escapeHtml,
  classes,
  anchor,
  pageAnchor,
  tagAnchor,
  heading,
  ul,
  ol,
  detailsList,
  alert,
  slugify,
  REPO_URL,
  DISCORD_URL
};
