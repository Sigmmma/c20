const {html, classes, tagAnchor, ul, heading, detailsList, slugify, alert, defAnchor, renderMarkdown, localizer} = require("../../components");
const getExtraPrimitiveInfo = require("./primitives");

const INVADER_TAG_BASE = "https://github.com/Kavawuvi/invader/blob/master/src/tag/hek/definition";
const URL_ENDIANNESS = "https://en.wikipedia.org/wiki/Endianness";

/* TODO:
- write about these field props:
  - normalize
  - compile_ignore
  - drop_on_extract_hidden
  - shifted_by_one ??
  - non_null ??
  - ignore_cached
  - zero_on_index
  - file_offset
  - external_file_offset
  - default_sign
*/

const localizations = localizer({
  tagStructureHeading: {
    en: "Structure and fields",
    es: "Estructura y campos"
  },
  inheritInfo: {
    en: (thisTag, parentTag) => `This tag inherits fields from ${parentTag} which
      are not shown here. See the parent's page for more information.
      The following information is unique to the <strong>${thisTag}</strong> tag.`,
    es: (thisTag, parentTag) => `Esta tag hereda campos de ${parentTag} que
       no se muestran aquí. Consulte la página de los padres para obtener más información.
       La siguiente información es exclusiva de la tag <strong>${thisTag}</strong>.`,
  },
  invaderDefLink: {
    en: (defUrl) => `This information was partially generated using <a href="${defUrl}">Invader tag definitions</a>.`,
    es: (defUrl) => `Esta información se generó parcialmente mediante <a href="${defUrl}">definiciones de tag de Invader</a>.`
  },
  comments: {
    en: "Comments",
    es: "Comentarios"
  },
  type: {
    en: "Type",
    es: "Tipo"
  },
  value: {
    en: "Value",
    es: "Valor"
  },
  option: {
    en: "Option",
    es: "Opción"
  },
  field: {
    en: "Field",
    es: "Campo"
  },
  flag: {
    en: "Flag",
    es: "Bandera"
  },
  mask: {
    en: "Mask",
    es: "Máscara"
  },
  fieldInfoUnused: {
    en: (link) => `Unused${link} by Halo`,
    es: (link) => `No utilizado${link} por Halo`,
  },
  fieldInfoMinimum: {
    en: "Minimum",
    es: "Mínimo"
  },
  fieldInfoMaximum: {
    en: "Maximum",
    es: "Máximo"
  },
  fieldInfoHidden: {
    en: "Internal to the tag and may be hidden in tools.",
    es: "Interna de la tag y puede estar oculta en herramientas."
  },
  fieldInfoReadOnly: {
    en: "Read-only data, not meant to be edited by hand.",
    es: "Datos de solo lectura, no para editarlos a mano."
  },
  fieldInfoNonCached: {
    en: (url) => `Not included when the tag is compiled into a <a href="${url}">map cache</a>.`,
    es: (url) => `No se incluye cuando la tag se compila en un <a href="${url}">caché de mapa</a>.`
  },
  fieldInfoCacheOnly: {
    en: (url) => `Only set when the tag is compiled into a <a href="${url}">map cache</a>.`,
    es: (url) => `Solo se configura cuando la tag se compila en un <a href="${url}">caché de mapa</a>.`
  },
  fieldInfoEngine: {
    en: (engine) => `Only applicable to the following engine versions: ${engine}.`,
    es: (engine) => `Solo aplicable a las siguientes versiones del motor: ${engine}.`
  },
  fieldInfoDefault: {
    en: "Default value",
    es: "Valor por defecto"
  },
  fieldInfoVolatile: {
    en: "This field's value may change at build time or have precision errors. It should not be used for exact comparisons between tag data.",
    es: "El valor de este campo puede cambiar en el momento de la construcción o tener errores de precisión. No debe utilizarse para comparaciones exactas entre datos de tags."
  },
  fieldInfoShiftedByOne: {
    en: "This field's value must be subtracted by 1 by map compilers. It is unknown why this is done by Tool.",
    es: "Los compiladores de mapas deben restar 1 del valor de este campo. Se desconoce por qué Tool lo hace."
  },
});

const renderFieldName = (name, fieldPath) => !name ? null : html`
  <span id="${fieldPath}">${name}<a href="#${fieldPath}" class="header-anchor"></a></span>
`;

const renderComment = (ctx, md, addSearchText) => {
  if (md == "...") return null;
  addSearchText(renderMarkdown(ctx, md, true));
  return renderMarkdown(ctx, md);
};

const fieldInfo = (ctx, field, fieldComments, addSearchText) => {
  const localize = localizations(ctx.lang);
  const info = [];

  if (field.unused) {
    info.push(localize("fieldInfoUnused")(defAnchor(ctx.resolveUrl("h1/tags", "unused-tags-and-fields"))));
  }
  if (field.minimum) {
    info.push(`${localize("fieldInfoMinimum")}: ${field.minimum}`);
  }
  if (field.maximum) {
    info.push(`${localize("fieldInfoMaximum")}: ${field.maximum}`);
  }
  if (field.hidden) {
    info.push(localize("fieldInfoHidden"));
  }
  if (field.read_only) {
    info.push(localize("fieldInfoReadOnly"));
  }
  if (field.non_cached) {
    info.push(localize("fieldInfoNonCached")(ctx.resolveUrl("h1/map")));
  }
  if (field.cache_only) {
    info.push(localize("fieldInfoCacheOnly")(ctx.resolveUrl("h1/map")));
  }
  if (field.engine) {
    info.push(localize("fieldInfoEngine")(field.engine.join(", ")));
  }
  if (field.default) {
    info.push(`${localize("fieldInfoDefault")}: ${field.default}`);
  }
  if (field.volatile) {
    info.push(localize("fieldInfoVolatile"));
  }
  if (field.shifted_by_one) {
    info.push(localize("fieldInfoShiftedByOne"));
  }

  let comments = field.comment ? html`<p>${field.comment}</p>` : null;
  if (fieldComments && fieldComments[ctx.lang]) {
    comments = renderComment(ctx, fieldComments[ctx.lang], addSearchText);
  }

  return html`
    ${comments}
    ${info.length > 0 && ul(info)}
  `;
};

const fieldTypeDisplay = (ctx, field, fieldTypeStruct) => {
  const localize = localizations(ctx.lang);
  let {typeName, compositeFields} = getExtraPrimitiveInfo(field.type);

  if (field.type == "TagReflexive") {
    typeName = html`Block${defAnchor(ctx.resolveUrl("h1/tags", "blocks"))}`;
  } else if (field.type == "TagDependency") {
    typeName = html`Reference${defAnchor(ctx.resolveUrl("h1/tags", "tag-references-and-paths"))}`;
  } else if (field.type == "Index" && field.reflexive) {
    typeName = html`Index (${field.reflexive})`;
  }
  if (fieldTypeStruct) {
    if (fieldTypeStruct.type == "bitfield") {
      typeName = `bitfield(${fieldTypeStruct.width})`;
    } else if (fieldTypeStruct.type == "enum") {
      typeName = `enum`;
    }
  }

  const typeCodeParts = [typeName];
  if (field.size) {
    typeCodeParts.push(`(${field.size})`);
  }
  if (field.endian) {
    typeCodeParts.push(` (${field.endian} endian${defAnchor(URL_ENDIANNESS)})`);
  }
  if (field.flagged) {
    typeCodeParts.push(` (flagged)`);
  }
  if (field.unit) {
    typeCodeParts.push(` (${field.unit})`);
  }
  if (field.bounds) {
    typeCodeParts.push(` (min & max)`);
  }

  if (field.count && field.count > 0) {
    typeCodeParts.push(` x${field.count}`);
  }
  const typeCode = html`<code>${typeCodeParts.join("")}</code>`;

  if (field.type == "TagDependency") {
    const depLinks = field.classes.map(tagName => {
      const tagDef = ctx.data.h1.tagsByName[tagName];
      return tagDef ? tagAnchor(ctx, tagDef) : tagDef;
    });
    return detailsList(typeCode, depLinks, 4);
  }

  //todo: show more detail of whats in the composite field
  if (compositeFields) {
    const renderedCompositeFields = compositeFields.map(({name, type}) =>
      `${name}: <code>${type}</code>`
    );
    return detailsList(typeCode, renderedCompositeFields, 0);
  }

  return typeCode;
};

const fieldView = (ctx, field, comments, addHeading, addSearchText, hLevel, fieldPath) => {
  const fieldComments = comments ? comments.fields.find(it => it.name == field.name) : null;
  const fieldTypeStruct = ctx.data.h1.invaderStructDefs[field.type];

  const rowClasses = [];
  if (field.type == "TagDependency") {
    rowClasses.push("content-tag-minor");
  }
  if (field.unused || field.type == "pad" || field.hidden || field.read_only || field.cache_only) {
    rowClasses.push("content-faded");
  }

  let rowId = null;
  if (field.name) {
    rowId = `${fieldPath}-${slugify(field.name)}`;
    addSearchText(field.name);
    if (field.type == "TagReflexive" && hLevel >= 2 && hLevel <= 4) {
      addHeading({title: field.name, id: rowId, level: hLevel});
    }
  }

  return html`
    <tr ${classes(rowClasses)}>
      <td>${renderFieldName(field.name, rowId)}</td>
      <td>${fieldTypeDisplay(ctx, field, fieldTypeStruct)}</td>
      <td>${fieldInfo(ctx, field, fieldComments, addSearchText)}</td>
    </tr>
    ${field.type == "TagReflexive" && html`
      <tr class="tag-block-body">
        <td colspan="3">${structView(
          ctx,
          ctx.data.h1.invaderStructDefs[field.struct],
          field.struct,
          fieldComments,
          addHeading,
          addSearchText,
          hLevel + 1,
          false,
          rowId
        )}</td>
      </tr>
    `}
    ${fieldTypeStruct && (fieldTypeStruct.type == "bitfield" || fieldTypeStruct.type == "enum") && html`
      <tr class="tag-block-body">
        <td colspan="3">${structView(
          ctx,
          fieldTypeStruct,
          field.type,
          fieldComments,
          addHeading,
          addSearchText,
          hLevel + 1,
          false,
          rowId
        )}</td>
      </tr>
    `}
  `;
}

const structView = (ctx, struct, structName, comments, addHeading, addSearchText, hLevel, isRoot, fieldPath) => {
  const localize = localizations(ctx.lang);
  if (!struct) {
    return structName;
  } else if (struct.type == "bitfield") {
    return html`
      <table class="tag-struct">
        <thead>
          <tr>
            <th style="width:25%">${localize("flag")}</th>
            <th style="width:25%">${localize("mask")}</th>
            <th>${localize("comments")}</th>
          </tr>
        </thead>
        <tbody>
          ${struct.fields.map((field, i) => html`
            <tr>
              <td>${renderFieldName(field, `${fieldPath}-${slugify(field)}`)}</td>
              <td><code title="${0x1 << i}">0x${(0x1 << i).toString(16)}</code></td>
              <td>${renderComment(ctx, comments && comments.fields.find(it => it.name == field)[ctx.lang], addSearchText)}</td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  } else if (struct.type == "enum") {
    return html`
      <table class="tag-struct">
        <thead>
          <tr>
            <th style="width:25%">${localize("option")}</th>
            <th style="width:25%">${localize("value")}</th>
            <th>${localize("comments")}</th>
          </tr>
        </thead>
        <tbody>
          ${struct.options.map((option, i) => html`
            <tr>
              <td>${renderFieldName(option, `${fieldPath}-${slugify(option)}`)}</td>
              <td><code title="${i}">0x${i.toString(16)}</code></td>
              <td>${comments && renderComment(ctx, comments.options.find(it => it.name == option)[ctx.lang], addSearchText)}</td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  } else if (!struct.fields || struct.fields.length == 0) {
    return html`<p><em>This structure has no fields.</em></p>`;
  } else if (struct.type == "struct") {
    let allFields = [...struct.fields];
    //we hide top-level inherited fields (e.g. garbage => item => object)
    if (!isRoot) {
      let currStruct = struct;
      while (currStruct && currStruct.inherits) {
        currStruct = ctx.data.h1.invaderStructDefs[currStruct.inherits];
        allFields = [...currStruct.fields, ...allFields];
      }
    }
    return html`
      <table class="tag-struct">
        <thead>
          <tr>
            <th style="width:25%">${localize("field")}</th>
            <th style="width:25%">${localize("type")}</th>
            <th>${localize("comments")}</th>
          </tr>
        </thead>
        <tbody>
          ${allFields.map(field => fieldView(ctx, field, comments, addHeading, addSearchText, hLevel, fieldPath))}
        </tbody>
      </table>
    `;
  } else {
    throw new Error(`Unknown struct type: ${struct.type}`);
  }
};

const renderTagStructure = (ctx, tag) => {
  const localize = localizations(ctx.lang);
  const headingText = localize("tagStructureHeading");

  const invaderDefUrl = `${INVADER_TAG_BASE}/${tag.name}.json`;
  const headings = [{title: headingText, id: slugify(headingText), level: 1}];
  const addHeading = (heading) => headings.push(heading);
  const searchTexts = [];
  const addSearchText = (text) => searchTexts.push(text);
  const bodyHtml = html`
    ${heading("h1", headingText, "clear")}
    ${tag.parent && alert("info", html`
      <p>${localize("inheritInfo")(tag.name, tagAnchor(ctx, tag.parent))}</p>
    `)}
    ${structView(ctx, tag.invaderStruct, tag.invaderStructName, tag.comments, addHeading, addSearchText, 2, true, "tag-field")}
    <p><small>${localize("invaderDefLink")(invaderDefUrl)}</small></p>
  `;
  return {headings, bodyHtml, searchText: searchTexts.join("\n")};
};

module.exports = renderTagStructure;
