const {html} = require("./bits");
const {renderMarkdown} = require("./markdown");

const metabox = ({metaTitle, metaColour, img, imgCaption, mdSections, metaIndex, htmlSections}) => {
  return html`
    <aside class="metabox">
      <section class="header" style="background: ${metaColour || "none"}">
        <p><strong>${metaTitle}</strong></p>
      </section>
      ${img && html`
        <section class="img">
          <a href="${img}"><img src="${img}" alt="${imgCaption || ""}"/></a>
        </section>
      `}
      ${imgCaption && html`
        <section class="caption">
          <p><em>${renderMarkdown(imgCaption, metaIndex)}</em></p>
        </section>
      `}
      ${mdSections && mdSections.filter(it => it).map(({mdBody, cssClass}) => html`
        <section class="info ${cssClass}">
          ${renderMarkdown(mdBody, metaIndex)}
        </section>
      `)}
      ${htmlSections && htmlSections.filter(it => it).map(({body, cssClass}) => html`
        <section class="info ${cssClass}">
          ${body}
        </section>
      `)}
    </aside>
  `;
};

module.exports = metabox;
