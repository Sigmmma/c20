const {html} = require("../bits");
const {renderMarkdownInline} = require("../markdown");

const metabox = (ctx, metaboxProps) => {
  if (!metaboxProps) {
    return null;
  }

  const {metaTitle, metaClass, img, imgCaption, metaSections} = metaboxProps;
  if (!img && !imgCaption && (!metaSections || metaSections.length == 0)) {
    return null;
  }

  return html`
    <aside class="metabox">
      <section class="header ${metaClass}">
        <p><strong>${metaTitle}</strong></p>
      </section>
      ${img && html`
        <section class="img">
          <a href="${img}"><img src="${img}" alt=""/></a>
        </section>
      `}
      ${imgCaption && html`
        <section class="caption">
          <p><em>${renderMarkdownInline(ctx, imgCaption)}</em></p>
        </section>
      `}
      ${metaSections && metaSections.filter(it => it).map(({body, cssClass}) => html`
        <section class="info ${cssClass}">
          ${body}
        </section>
      `)}
    </aside>
  `;
};

module.exports = metabox;
