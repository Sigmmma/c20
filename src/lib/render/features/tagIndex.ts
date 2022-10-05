const {heading, html, tagAnchor} = require("../../components/bits");
const {renderMarkdown} = require("../../components/Md/legacy");
import {slugify} from "../../utils/strings";
import {localizer} from "../../utils/localization";

const localizations = {
  tagsListHeading: {
    en: "Tags list",
    es: "Lista de tags"
  },
  unusedTagsHeading: {
    en: "Unused tags",
    es: "Tags no utilizadas"
  },
  unusedTagsIntro: {
    en: `These vestigial tags were found within the game engine or tools, but are no longer used.
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
  groupId: {
    en: "Group ID",
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
};

const tagsTable = (ctx, tags, opts) => {
  const localize = localizer(localizations, ctx.lang);
  const tagsSorted = [...tags];
  tagsSorted.sort((a, b) => a.name.localeCompare(b.name));
  return html`
    <table>
      <thead>
        <tr>
          <th>${localize("tagName")}</th>
          ${opts.groupId && html`
            <th><a href="${ctx.resolvePage("tags", "group-ids").url}">${localize("groupId")}</a></th>
          `}
          ${opts.parent && html`
            <th>${localize("parent")}</th>
          `}
          <th>${localize("purpose")}</th>
        </tr>
      </thead>
      <tbody>
        ${tagsSorted.map(tag => {
          const tagComments = tag?.description?.[ctx.lang];
          return html`
            <tr>
              <td>${(opts.noLink || tag.vestigial) ? tag.name : tagAnchor(ctx, tag.name)}</td>
              ${opts.groupId && html`
                <td><code>${tag.id}</td>
              `}
              ${opts.parent && html`
                <td>${tag.parent && tagAnchor(ctx, tag.parent.name)}</td>
              `}
              <td>
                ${tagComments &&
                  renderMarkdown(ctx, tagComments)
                }
              </td>
            </tr>
          `;
        })}
      </tbody>
    </table>
  `;
};

module.exports = function(ctx, input) {
  const {lang, data} = ctx;
  const {page} = input;

  if (!page.tagIndex) {
    return {};
  }

  const {game: gameVersion, ...opts} = page.tagIndex;
  const localize = localizer(localizations, lang);

  const usedTags = Object.values(data.tags[gameVersion]).filter((t: any) => !t.unused);
  const unusedTags = Object.values(data.tags[gameVersion]).filter((t: any) => t.unused);
  const tagsListHeading = localize("tagsListHeading");
  const headings = [
    {title: tagsListHeading, id: slugify(tagsListHeading), level: 1}
  ];

  let htmlResult = html`
    ${heading("h1", tagsListHeading)}
    ${tagsTable(ctx, usedTags, opts)}
  `;

  if (unusedTags.length > 0) {
    const unusedTagsHeading = localize("unusedTagsHeading");
    htmlResult += html`
      ${heading("h2", unusedTagsHeading)}
      <p>${localize("unusedTagsIntro")}</p>
      ${tagsTable(ctx, unusedTags, opts)}
    `;
    headings.push({title: unusedTagsHeading, id: slugify(unusedTagsHeading), level: 2});
  }

  return {headings, html: htmlResult};
};
