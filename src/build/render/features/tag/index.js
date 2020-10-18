const R = require("ramda");
const {defAnchor, localizer, tagAnchor, html, detailsList, renderMarkdownInline} = require("../../components");
const renderTagStructure = require("./tagStructure");

const localizations = localizer({
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
  const {lang, page} = ctx;
  const tagName = page.tagName;

  if (!tagName) {
    return {};
  }

  //todo: allow page to specify game too, if we eventually support other games
  const tag = ctx.data.h1.tagsByName[tagName];
  if (!tag) {
    throw new Error(`Failed to find tag structure ${tagName}`);
  }

  const localize = localizations(lang);
  const engineId = `<code>${tag.id}</code>${defAnchor(ctx.resolveUrl("h1/tags", "engine-ids"))}`;
  const metaSections = [];

  if (tag.parent) {
    metaSections.push({
      cssClass: "content-tag-minor",
      body: html`<p>${localize("parentTag")}: ${tagAnchor(ctx, tag.parent)}</p>`
    });
  }

  let refDetailElements = [];
  let refLevel = tag;
  while (refLevel) {
    if (refLevel.references.length > 0) {
      const isDirect = refLevel.name == tag.name;
      const refLevelSummary = isDirect ?
        localize("directReferences") :
        localize("inheritedReferences")(tagAnchor(ctx, refLevel));

      refDetailElements.push(detailsList(
        refLevelSummary,
        refLevel.references.map(refTag => {
          if (refTag === "*") {
            //sound, effect, damage effect, sound looping, model animations, actor variants, and objects
            return "(any tags referenced by scripts)";
          } else {
            return tagAnchor(ctx, refTag);
          }
        }),
        isDirect ? undefined : 0
      ));
    }
    refLevel = refLevel.parent;
  }

  if (refDetailElements.length > 0) {
    metaSections.push({
      cssClass: "content-tag-minor",
      body: refDetailElements.join("\n")
    });
  }

  if (tag.referencedBy.length > 0) {
    metaSections.push({
      cssClass: "content-tag-minor",
      body: detailsList(
        localize("referencedBy"),
        tag.referencedBy.map(otherTag => tagAnchor(ctx, otherTag)),
        0
      )
    });
  }

  if (tag.children.length > 0) {
    metaSections.push({
      cssClass: "content-tag-minor",
      body: detailsList(
        localize("childTags"),
        tag.children.map(childTag => tagAnchor(ctx, childTag))
      )
    });
  }

  let searchText;
  let headings;
  let bodyHtml;
  if (tag.invaderStruct) {
    const result = renderTagStructure(ctx, tag);
    searchText = result.searchText;
    headings = result.headings;
    bodyHtml = result.bodyHtml;
  }

  return {
    keywords: [tag.id],
    html: bodyHtml,
    headings,
    metaSections,
    searchText,
    metaTitle: `\u{1F3F7} Tag: ${tagName} (${engineId})`,
    metaClass: "content-tag",
    thanks: localizeThanks(ctx, ctx.data.h1.tagThanks)
  };
};
