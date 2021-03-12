const commonTags = require("common-tags");
const R = require("ramda");

const DISCORD_URL = "https://discord.reclaimers.net";
const REPO_URL = "https://github.com/Sigmmma/c20";
const DEFAULT_OPEN_THRESHOLD = 8;

const breakTagName = (tagName) => tagName.split("_").join("_<wbr>");

//converts a title into a URL- or ID-friendly slug
const slugify = (title) => title
  .toLowerCase()
  .replace(/[']/g, "")
  .replace(/[^\p{L}0-9]/gu, " ")
  .split(" ")
  .filter(part => part.length > 0)
  .join("-");

const escapeHtml = (s) => commonTags.safeHtml`${s}`;
const html = commonTags.stripIndent(commonTags.html);

const classes = (classArr) => classArr.length > 0 ? `class="${classArr.join(" ")}"` : "";

const localizer = R.curry((bundle, lang, key) => bundle[key][lang]);

const anchor = (href, body) => html`
  <a href="${href}">${body}</a>
`;

const defAnchor = (href) => html`<sup>${anchor(href, "?")}</sup>`;

const pageAnchor = R.curry((lang, page) => anchor(page.tryLocalizedPath(lang), escapeHtml(page.tryLocalizedTitle(lang))));

const tagAnchor = (ctx, tag, hash) => {
  const url = ctx.resolveUrl(tag.name, hash);
  return anchor(url, breakTagName(tag.name));
};

const heading = (hTag, title, cssClass) => html`
  <${hTag} id="${slugify(title)}"${cssClass ? ` class=${cssClass}` : ""}>
    ${title}
    <a href="#${slugify(title)}" class="header-anchor"></a>
  </${hTag}>
`;

const detailsList = (summary, items, openThreshold) => {
  if (openThreshold === undefined) {
    openThreshold = DEFAULT_OPEN_THRESHOLD;
  }
  if (items.length == 0) {
    return null;
  } else if (items.length <= openThreshold) {
    return html`
      <details open>
        <summary>${summary}</summary>
        ${ul(items)}
      </details>
    `;
  } else {
    return html`
      <details>
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

const figure = (href, caption) => html`
  <figure>
    <a href="${href}">
      <img src="${href}" alt=""/>
    </a>
    <figcaption>${caption}</figcaption>
  </figure>
`;

module.exports = {
  html,
  escapeHtml,
  classes,
  localizer,
  anchor,
  pageAnchor,
  tagAnchor,
  defAnchor,
  heading,
  figure,
  ul,
  ol,
  detailsList,
  alert,
  slugify,
  REPO_URL,
  DISCORD_URL
};
