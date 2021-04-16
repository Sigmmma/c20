const R = require("ramda");
const {renderMarkdownInline, heading, structDisplay, detailsList, defAnchor, html, localizer, tagAnchor, alert} = require("../components");
const {walkTypeDefs} = require("../../../data/structs");

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
  },
  inheritInfo: {
    en: (thisTag, parentTag) => `This tag inherits fields from ${parentTag} which
      are not shown here. See the parent's page for more information.
      The following information is unique to the <strong>${thisTag}</strong> tag.`,
    es: (thisTag, parentTag) => `Esta tag hereda campos de ${parentTag} que
       no se muestran aquí. Consulte la página de los padres para obtener más información.
       La siguiente información es exclusiva de la tag <strong>${thisTag}</strong>.`,
  },
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
  const searchTerms = [];

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
      body: referencesHtml
    });
  }

  if (tag.referencedBy) {
    metaSections.push({
      cssClass: "content-tag-minor",
      body: detailsList(
        localize("referencedBy"),
        tag.referencedBy.map(otherTag => tagAnchor(ctx, otherTag.name)),
        0
      )
    });
  }

  const bodyHtml = html`
    ${heading("h1", localize("tagStructureHeading"), "clear")}
    ${tag.parent && alert("info", html`
      <p>${localize("inheritInfo")(tag.name, tagAnchor(ctx, tag.parent.name))}</p>
    `)}
    ${structDisplay(ctx, {
      show_offsets: false,
      skip_padding: true,
      simple_types: true,
      entry_type: tag.structName,
      id: "tag-struct",
      noRootExtend: true,
      imports: {
        [tag.structModule]: tag.structName
      }
    })}
  `;

  const walkOpts = {noRootExtend: true};
  const addSearchTerms = (part) => {
    if (part.name) {
      searchTerms.push(part.name.split("_"));
    }
    if (part.comments && part.comments[lang]) {
      searchTerms.push(part.comments[lang]);
    }
  };
  walkTypeDefs(tag.structName, tag.structModule, ctx.data.structs, walkOpts, (typeDef) => {
    addSearchTerms(typeDef);
    if (typeDef.class == "struct") {
      typeDef.fields.forEach(f => addSearchTerms(f));
    } else if (typeDef.class == "bitfield") {
      typeDef.bits.forEach(b => addSearchTerms(b));
    } else if (typeDef.class == "enum") {
      typeDef.options.forEach(o => addSearchTerms(o));
    }
  });

  return {
    keywords: [tag.id],
    html: bodyHtml,
    // headings,
    metaSections,
    searchText: searchTerms.join(" "),
    metaTitle: `\u{1F3F7} Tag: ${tagName} (${engineId})`,
    metaClass: "content-tag",
    // thanks: localizeThanks(ctx, ctx.data[game].tagThanks)
  };
};
