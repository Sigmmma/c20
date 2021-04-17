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

const localizer = R.curry((bundle, lang) => {
  return (key, safe) => {
    if (!bundle[key] && !safe) {
      throw new Error(`Missing localizations for key ${key}`);
    }
    return bundle[key] ? bundle[key][lang] : null;
  };
});

const anchor = (href, body) => html`
  <a href="${href}">${body}</a>
`;

const jump = (text, body, style=true) => html`
  <a href="#${slugify(text)}" ${style && 'class="header-anchor"'}>${body}</a>
`;

const defAnchor = (href) => html`<sup>${anchor(href, "?")}</sup>`;

const pageAnchor = R.curry((lang, page) => anchor(page.tryLocalizedPath(lang), escapeHtml(page.tryLocalizedTitle(lang))));

const tagAnchor = (ctx, tagName, hash) => {
  const url = ctx.resolveUrl(tagName, hash);
  return anchor(url, breakTagName(tagName));
};

const heading = (hTag, title, cssClass) => html`
  <${hTag} id="${slugify(title)}"${cssClass ? ` class=${cssClass}` : ""}>
    ${title}
    <a href="#${slugify(title)}" class="header-anchor"></a>
  </${hTag}>
`;

const detailsList = (summary, items, maxOpen, allowInline) => {
  if (maxOpen === undefined) {
    maxOpen = DEFAULT_OPEN_THRESHOLD;
  }
  if (allowInline === undefined) {
    allowInline = true;
  }
  if (items.length == 0) {
    return null;
  } else if (items.length <= maxOpen) {
    if (items.length == 1 && allowInline) {
      return html`<p>${summary}: ${items[0]}</p>`;
    } else {
      return html`
        <details open>
          <summary>${summary}</summary>
          ${ul(items)}
        </details>
      `;
    }
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

const renderHex = (num) => html`<code title="${num}">0x${num.toString(16).toUpperCase()}</code>`;

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
  jump,
  ul,
  ol,
  detailsList,
  alert,
  renderHex,
  slugify,
  REPO_URL,
  DISCORD_URL
};
