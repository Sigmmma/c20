import {PageId} from "../render/types";
import {RenderContext} from "./Ctx/Ctx";
import {slugify} from "../utils/strings";

const commonTags = require("common-tags");
import * as R from "ramda";

const DEFAULT_OPEN_THRESHOLD = 8;
const noThumbs = process.env.C20_NO_THUMBNAILS == "true";

const breakTagName = (tagName) => tagName.split("_").join("_<wbr>");

const escapeHtml = (s) => commonTags.safeHtml`${s}`;
const html = commonTags.stripIndent(commonTags.html);

const classes = (classArr) => classArr && classArr.length > 0 ? `class="${classArr.join(" ")}"` : "";
const p = (body) => html`<p>${body}</p>`;

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

const pageAnchor = R.curry((ctx: RenderContext, pageId: PageId) => {
  const target = ctx.resolvePage(pageId);
  return anchor(target.url, escapeHtml(target.title));
});

const tagAnchor = (ctx, tagName, hash) => {
  const url = ctx.resolvePage(tagName, hash).url;
  return anchor(url, breakTagName(tagName));
};

const heading = (hTag, title, cssClass) => html`
  <${hTag} id="${slugify(title)}"${cssClass ? ` class=${cssClass}` : ""}>
    ${jump(slugify(title), title)}
  </${hTag}>
`;

/** @deprecated use DetailsList instead */
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
/** @deprecated use Alert */
const alert = (type, body) => html`
  <div class="alert type-${type || "info"}">
    ${body}
  </div>
`;

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
  icon,
  slugify,
};
