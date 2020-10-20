const {heading, localizer, slugify, html, renderMarkdown, tagAnchor} = require("../components");

const localizations = localizer({
  tagsListHeading: {
    en: "Tags list",
    es: "Lista de tags"
  },
  unusedTagsHeading: {
    en: "Unused tags",
    es: "Etiquetas no utilizadas"
  },
  unusedTagsIntro: {
    en: `These vestigal tags were found within the game engine or tools, but are no longer used.
         They were used during Halo's development and then partially removed before release.
         The tags are listed here for informational purposes only, and you will not need to use them.`,
    es: `Estas tags vestigales se encontraron dentro del motor o las herramientas del juego, pero ya no se utilizan.
         Se usaron durante el desarrollo de Halo y luego se eliminaron parcialmente antes del lanzamiento.
         Las tags se enumeran aquí solo con fines informativos y no es necesario que las utilice.`
  },
  tagName: {
    en: "Tag name",
    es: "Nombre de tag"
  },
  engineId: {
    en: "Engine ID",
    es: "ID del motor"
  },
  parent: {
    en: "Parent",
    es: "Padre"
  },
  purpose: {
    en: "Purpose",
    es: "Propósito"
  }
});

const tagsTable = (ctx, tags) => {
  const localize = localizations(ctx.lang);
  const tagsSorted = [...tags];
  tagsSorted.sort((a, b) => a.name.localeCompare(b.name));
  return html`
    <table>
      <thead>
        <tr>
          <th>${localize("tagName")}</th>
          <th><a href="${ctx.resolveUrl("tags", "engine-ids")}">${localize("engineId")}</a></th>
          <th>${localize("parent")}</th>
          <th>${localize("purpose")}</th>
        </tr>
      </thead>
      <tbody>
        ${tagsSorted.map(tag => html`
          <tr>
            <td>${tagAnchor(ctx, tag)}</td>
            <td><code>${tag.id}</code></td>
            <td>${tag.parent && tagAnchor(ctx, tag.parent)}</td>
            <td>
              ${tag.comments && tag.comments[ctx.lang] != "..." &&
                renderMarkdown(ctx, tag.comments[ctx.lang])
              }
            </td>
          </tr>
        `)}
      </tbody>
    </table>
  `;
};

module.exports = async function(ctx) {
  const {page, lang, data} = ctx;
  const gameVersion = page.tagIndex;
  const localize = localizations(lang);

  if (!gameVersion) {
    return {};
  }

  const usedTags = data[gameVersion].tags.filter(t => !t.unused);
  const unusedTags = data[gameVersion].tags.filter(t => t.unused);
  const tagsListHeading = localize("tagsListHeading");
  const headings = [
    {title: tagsListHeading, id: slugify(tagsListHeading), level: 1}
  ];

  let htmlResult = html`
    ${heading("h1", tagsListHeading)}
    ${tagsTable(ctx, usedTags)}
  `;

  if (unusedTags.length > 0) {
    const unusedTagsHeading = localize("unusedTagsHeading");
    htmlResult += html`
      ${heading("h2", unusedTagsHeading)}
      <p>${localize("unusedTagsIntro")}</p>
      ${tagsTable(ctx, unusedTags)}
    `;
    headings.push({title: unusedTagsHeading, id: slugify(unusedTagsHeading), level: 2});
  }

  return {headings, html: htmlResult};
};
