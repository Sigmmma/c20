import * as R from "ramda";
const {p, heading, structDisplay, detailsList, defAnchor, html, tagAnchor, alert} = require("../../components/bits");
const {renderMarkdownInline} = require("../../components/Md/legacy");
import {slugify} from "../../utils/strings";
import {localizer} from "../../utils/localization";

const localizations = {
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
  },
  inheritInfo: {
    en: (thisTag, parentTag) => `This tag inherits fields from ${parentTag} which
      are not shown here. See the parent's page for more information.
      The following information is unique to the <strong>${thisTag}</strong> tag.`,
    es: (thisTag, parentTag) => `Esta tag hereda campos de ${parentTag} que
       no se muestran aquí. Consulte la página de los padres para obtener más información.
       La siguiente información es exclusiva de la tag <strong>${thisTag}</strong>.`,
  },
};

function localizeThanks(ctx, thanks) {
  return R.mapObjIndexed((forLangs, to) => {
    const forMd = forLangs[ctx.lang];
    return forMd ? [renderMarkdownInline(ctx, forMd)] : [];
  }, thanks);
}

module.exports = function(ctx, input) {
  const {lang, data} = ctx;
  const {page} = input;
  if (!page.tagName) {
    return {};
  }

  return {};

  const localize = localizer(localizations, lang);

  const tagNameArg = page.tagName.split("/");
  const game = tagNameArg.length > 1 ? tagNameArg[0] : "h1";
  const tagName = tagNameArg.length > 1 ? tagNameArg[1] : tagNameArg[0];
  const tag = data.tags[game][tagName];
  const groupId = tag.id ? `<code>${tag.id}</code>${defAnchor(ctx.resolvePage("h1/tags", "group-ids").url)}` : null;
  const metaSections = [];
  const structureHeadingText = localize("tagStructureHeading");

  if (tag.parent) {
    metaSections.push({
      cssClass: "content-tag-minor",
      body: html`<p>${localize("parentTag")}: ${tagAnchor(ctx, tag.parent.name)}</p>`
    });
  }

  if (tag.children && tag.children.length > 0) {
    metaSections.push({
      cssClass: "content-tag-minor",
      body: p(detailsList(
        localize("childTags"),
        tag.children.map(childTag => tagAnchor(ctx, childTag.name))
      ))
    });
  }

  let refLevel = tag;
  let referencesHtml = "";
  while (refLevel) {
    if (refLevel.references && refLevel.references.length > 0) {
      referencesHtml += detailsList(
        refLevel.name == tag.name ?
          localize("directReferences") :
          localize("inheritedReferences")(tagAnchor(ctx, refLevel.name)),
        refLevel.references.map(otherTag => tagAnchor(ctx, otherTag.name)),
        refLevel.name == tag.name ? undefined : 0
      );
    }
    refLevel = refLevel.parent;
  }
  if (referencesHtml != "") {
    metaSections.push({
      cssClass: "content-tag-minor",
      body: p(referencesHtml)
    });
  }

  if (tag.referencedBy && tag.referencedBy.length > 0) {
    metaSections.push({
      cssClass: "content-tag-minor",
      body: p(detailsList(
        localize("referencedBy"),
        tag.referencedBy.map(otherTag => tagAnchor(ctx, otherTag.name)),
        1
      ))
    });
  }

  const structRender = tag.structName ? structDisplay(ctx, {
    showOffsets: false,
    skipPadding: !tag.unused, //show padding for leftover tags; it might be of interest
    simpleTypes: true,
    entry_type: tag.structName,
    noEmbed: ["TagDependency", "ColorRGB", "TagString"],
    id: "tag-field",
    noRootExtend: true,
    imports: {
      [tag.structModule]: tag.structName
    }
  }) : null;

  const bodyHtml = structRender ? html`
    ${heading("h1", structureHeadingText, "clear")}
    ${tag.parent && alert("info", html`
      <p>${localize("inheritInfo")(tag.name, tagAnchor(ctx, tag.parent.name))}</p>
    `)}
    ${structRender.html}
  ` : null;

  return {
    keywords: [tag.id],
    html: bodyHtml,
    headings: structRender ? [
      {title: structureHeadingText, id: slugify(structureHeadingText), level: 1},
      ...structRender.headings
    ] : [],
    metaSections,
    searchText: structRender ? structRender.searchTerms.join(" ") : "",
    metaTitle: `${tagName}${groupId ? ` (${groupId})` : ""}`,
    metaIcon: "sliders",
    metaIconTitle: "Tag",
    metaClass: "content-tag",
    thanks: localizeThanks(ctx, ctx.data.tagThanks[game])
  };
};
