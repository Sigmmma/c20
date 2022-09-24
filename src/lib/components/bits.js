const commonTags = require("common-tags");
const R = require("ramda");

const DISCORD_URL = "https://discord.reclaimers.net";
const REPO_URL = "https://github.com/Sigmmma/c20";
const DEFAULT_OPEN_THRESHOLD = 8;
const noThumbs = process.env.C20_NO_THUMBNAILS == "true";

const JIF_ISSUE_URL = "https://github.com/Joint-Issue-Tracker/Joint-Issue-Tracker/issues/new?template=MCCHEK-ISSUE-FORM.yml"

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

const classes = (classArr) => classArr && classArr.length > 0 ? `class="${classArr.join(" ")}"` : "";
const p = (body) => html`<p>${body}</p>`;

const reportedMissingKeys = new Set()

/**
 * @deprecated Use useLocalizer() instead
 */
const localizer = R.curry((bundle, lang) => {
  return (key, safe) => {
    if (!bundle[key] && !safe) {
      throw new Error(`Missing localizations for key ${key}`);
    } else if (!bundle[key]) {
      if (!reportedMissingKeys.has(key))
        console.warn(`Missing localisation key "${key}"`);
      reportedMissingKeys.add(key)
      return null
    }

    return bundle[key][lang]  ? bundle[key][lang] : bundle[key]["en"];
  };
});

/**
 * @deprecated Use Icon instead
 */
const icon = (name, title) => html`
  <svg class="feather" ${title ? `aria-labelledby="title"` : ""}>
    ${title && html`
      <title>${title}</title>
    `}
    <use xlink:href="/assets/feather-sprite.svg#${name}"/>
  </svg>
`;

const anchor = (href, body) => html`
  <a href="${href}">${body}</a>
`;

const jump = (id, body) => html`
  <a class="header-anchor" href="#${slugify(id)}">${body}</a>
`;

const defAnchor = (href) => html`<sup>${anchor(href, "?")}</sup>`;

const pageAnchor = R.curry((lang, page) => anchor(page.tryLocalizedPath(lang), escapeHtml(page.tryLocalizedTitle(lang))));

const tagAnchor = (ctx, tagName, hash) => {
  const url = ctx.resolveUrl(tagName, hash);
  return anchor(url, breakTagName(tagName));
};

const heading = (hTag, title, cssClass) => html`
  <${hTag} id="${slugify(title)}"${cssClass ? ` class=${cssClass}` : ""}>
    ${jump(slugify(title), title)}
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
      return html`<span>${summary}: ${items[0]}</span>`;
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
/** @deprecated use Alert instead */
const alert = (type, body) => html`
  <div class="alert type-${type || "info"}">
    ${body}
  </div>
`;

const renderHex = (num) => html`<code title="${num}">0x${num.toString(16).toUpperCase()}</code>`;

const figure = (href, caption, inline) => html`
  <figure ${inline && "class=\"inline-figure\""}>
    <a href="${href}">
      <img src="${href}" alt=""/>
    </a>
    <figcaption>${caption}</figcaption>
  </figure>
`;

const video = (href, poster) => html`
  <video controls preload="${poster && !noThumbs ? "none" : "auto"}" ${poster && !noThumbs ? `poster="${poster}"` : null}>
    <source src="${href}" type="video/mp4">
  </video>
`;

module.exports = {
  html,
  escapeHtml,
  classes,
  localizer,
  anchor,
  p,
  pageAnchor,
  tagAnchor,
  defAnchor,
  heading,
  figure,
  video,
  jump,
  ul,
  ol,
  detailsList,
  alert,
  renderHex,
  icon,
  slugify,
  REPO_URL,
  DISCORD_URL,
  JIF_ISSUE_URL
};
