const {html} = require("./bits");

const metabox = ({metaTitle, metaClass, img, imgCaption, sections}) => {
  if (!img && !imgCaption && (!sections || sections.length == 0)) {
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
          <p><em>${imgCaption}</em></p>
        </section>
      `}
      ${sections && sections.filter(it => it).map(({body, cssClass}) => html`
        <section class="info ${cssClass}">
          ${body}
        </section>
      `)}
    </aside>
  `;
};

module.exports = metabox;
