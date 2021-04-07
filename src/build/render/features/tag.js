const R = require("ramda");
const {renderMarkdownInline, heading, structDisplay, detailsList, defAnchor, html, localizer, tagAnchor} = require("../components");

const localizations = localizer({
  tagStructureHeading: {
    en: "Structure and fields",
    es: "Estructura y campos"
  },
  parentTag: {
    en: "Parent tag",
    es: "Tag principal"
  },
  referencedBy: {
    en: "Referenced by",
    es: "Referenciado por",
  },
  childTags: {
    en: "Child tags",
    es: "Tags secundarias"
  },
  directReferences: {
    en: "Direct references",
    es: "Referencias directas"
  },
  inheritedReferences: {
    en: (parent) => `${parent} references`,
    es: (parent) => `Referencias de ${parent}`
  }
});

function localizeThanks(ctx, thanks) {
  return R.mapObjIndexed((forLangs, to) => {
    const forMd = forLangs[ctx.lang];
    return forMd ? [renderMarkdownInline(ctx, forMd)] : [];
  }, thanks);
}

module.exports = async function(ctx) {
  const {lang, page, data} = ctx;
  if (!page.tagName) {
    return {};
  }

  const localize = localizations(lang);

  const tagNameArg = page.tagName.split("/");
  const game = tagNameArg.length > 1 ? tagNameArg[0] : "h1";
  const tagName = tagNameArg.length > 1 ? tagNameArg[1] : tagNameArg[0];
  const tag = data.tags[game][tagName];
  const engineId = `<code>${tag.id}</code>${defAnchor(ctx.resolveUrl("h1/tags", "engine-ids"))}`;
  const metaSections = [];

  if (tag.parent) {
    metaSections.push({
      cssClass: "content-tag-minor",
      body: html`<p>${localize("parentTag")}: ${tagAnchor(ctx, tag.parent.name)}</p>`
    });
  }

  if (tag.children.length > 0) {
    metaSections.push({
      cssClass: "content-tag-minor",
      body: detailsList(
        localize("childTags"),
        tag.children.map(childTag => tagAnchor(ctx, childTag.name))
      )
    });
  }

  const bodyHtml = html`
    ${heading("h1", localize("tagStructureHeading"), "clear")}
    ${structDisplay(ctx, {
      show_offsets: false,
      skip_padding: true,
      simple_types: true,
      entry_type: tag.structName,
      id: "tag-struct",
      imports: {
        [tag.structModule]: tag.structName
      }
    })}
  `;

  return {
    keywords: [tag.id],
    html: bodyHtml,
    // headings,
    metaSections,
    // searchText,
    metaTitle: `\u{1F3F7} Tag: ${tagName} (${engineId})`,
    metaClass: "content-tag",
    // thanks: localizeThanks(ctx, ctx.data[game].tagThanks)
  };
};
