const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const {html, escapeHtml, localizer, slugify} = require("../bits");
const INTRINSIC_TYPE_DEFS = require("./intrinsics");

const localizations = localizer({
  field: {
    en: "Field",
    es: "Campo"
  },
  type: {
    en: "Type",
    es: "Tipo"
  },
  flag: {
    en: "Flag",
    es: "Bandera"
  },
  mask: {
    en: "Mask",
    es: "Máscara"
  },
  value: {
    en: "Value",
    es: "Valor"
  },
  option: {
    en: "Option",
    es: "Opción"
  },
  comments: {
    en: "Comments",
    es: "Comentarios"
  },
  offset: {
    en: "Offset (relative)",
  },
  meta_unit: {
    en: "Unit"
  },
  meta_compile_processed: {
    en: "Processed during compile"
  },
  meta_mcc_only: {
    en: "MCC only"
  },
  meta_cache_only: {
    en: "Cache only"
  },
  meta_non_cached: {
    en: "Non-cached"
  },
  meta_non_null: {
    en: "Non-null"
  },
  meta_read_only: {
    en: "Read-only"
  },
  meta_volatile: {
    en: "Volatile"
  },
  meta_unused: {
    en: "Unused"
  },
  meta_shifted_by_one: {
    en: "Shifted by one"
  }
});

function processMeta(meta) {
  if (!meta || Object.keys(meta).length == 0) {
    return null;
  }
  meta = {...meta};
  if (meta.pre_compile || meta.post_compile) {
    meta.compile_processed = true;
  }
  return meta;
}

function joinPathId(pathId, next) {
  if (!pathId || !next) return null;
  return [...pathId, next];
}

function processGenerics(genericParams, typeArgs) {
  if (!typeArgs) return genericParams;
  return {
    ...genericParams,
    type: typeArgs[genericParams.type] || genericParams.type,
    typeArgs: genericParams.typeArgs === undefined ? undefined :
      Object.fromEntries(Object.entries(genericParams.typeArgs).map(([k, v]) =>
      [k, typeArgs[v] || v]
    ))
  };
}

/* todo:
 * - populate imports
 * - tag dependency "tag_classes" linking
 * - "index_of" linking
 */
function renderStructYaml(ctx, optsYaml) {
  const {renderMarkdown} = require("../markdown"); //todo: untangle circular dep
  const localize = localizations(ctx.lang);
  const {typeDefs: typeDefsArg, entryType, showOffsets, id} = yaml.load(optsYaml);

  let typeDefs = typeof(typeDefsArg) === "string" ?
    yaml.load(fs.readFileSync(path.join(ctx.page.dirPath, typeDefsArg), "utf8")) :
    typeDefsArg;

  typeDefs = {
    ...INTRINSIC_TYPE_DEFS,
    ...typeDefs
  };

  const seenTypes = {};

  /* responsible for resolving aliases, calculating type, and replacing type args
   */
  function instantiateType(typeParams) {
    let {type: typeName, typeArgs, size, count} = typeParams;
    let typeDef = typeDefs[typeName];
    if (!typeDef) {
      throw new Error(`Failed to resolve type ${typeName}`);
    }

    if (typeDef.class == "alias") {
      return instantiateType(processGenerics({...typeParams, ...typeDef}, typeArgs));
    }

    if (typeDef.class == "struct" && typeDef.extends) {
      const {typeDef: parentTypeDef} = instantiateType(processGenerics(typeDef.extends, typeArgs));
      typeDef = {
        ...parentTypeDef,
        ...typeDef,
        fields: [...parentTypeDef.fields, ...typeDef.fields]
      };
    }

    const singleSize = size ||
      typeDef.size ||
      (typeDef.class == "struct" && typeDef.fields.reduce((s, f) => instantiateType(processGenerics(f, typeArgs)).totalSize + s, 0)) ||
      undefined;

    if (singleSize === undefined) {
      throw new Error(`Failed to determine size of type ${typeName} (entry ${entryType})`);
    }

    const totalSize =  singleSize * (count || 1);
    if (typeDef.assertSize && totalSize != typeDef.assertSize) {
      throw new Error(`Type ${typeName} size did not match assertion: ${totalSize} != ${typeDef.assertSize}`);
    }

    return {typeDef, totalSize, singleSize, variableSize: size, count, typeArgs, typeName};
  }

  function renderComments(part) {
    const meta = processMeta({...part.value, ...part.meta});
    return html`
      ${meta && html`
        <ul class="field-metas">
          ${Object.entries(meta)
            .filter(([k]) => localize(`meta_${k}`, true))
            .map(([k, v]) => html`
            <li class="field-meta">${localize(`meta_${k}`)}${v !== true ? `: ${v}` : ""}</li>
          `)}
        </ul>
      `}
      ${part.comments && part.comments[ctx.lang] &&
        renderMarkdown(ctx, part.comments[ctx.lang])
      }
    `;
  }

  function renderStructFieldType({typeDef, totalSize, singleSize, variableSize, count, typeArgs, typeName}) {
    let typeStr = typeName;
    if (typeDef.class == "bitfield" || typeDef.class == "enum") {
      typeStr += `: ${typeDef.class}${singleSize * 8}`;
    }
    if (typeArgs) {
      typeStr += `<${Object.values(typeArgs).join(", ")}>`;
    }
    if (variableSize !== undefined) {
      typeStr += `(${variableSize})`;
    }
    if (count !== undefined) {
      typeStr += `[${count}]`;
    }
    typeStr = escapeHtml(typeStr);
    if (typeDef.endianness !== undefined) {
      const lbl = typeDef.endianness == "little" ? "LE" : (typeDef.endianness == "big" ? "BE" : "LE/BE");
      typeStr += ` <span class="field-label">${lbl}</span>`;
    }
    return html`<code title="${totalSize} bytes">${typeStr}</code>`;
  }

  function renderFieldName(fieldName, pathId) {
    if (!fieldName) return null;
    fieldName = fieldName.replaceAll("_", " ");
    if (!pathId) return escapeHtml(fieldName);
    const pathTitle = escapeHtml(pathId.join("/"));
    const pathIdAttr = slugify(pathId.join("-"));
    return html`
      <span title="${pathTitle}" id="${pathIdAttr}">
        ${escapeHtml(fieldName)}<a href="#${pathIdAttr}" class="header-anchor"></a>
      </span>
    `;
  }

  function renderHex(num) {
    return html`<code title="${num}">0x${num.toString(16).toUpperCase()}</code>`;
  }

  function renderStructAsTable(instantiatedType, pathId) {
    const widths = 50 / (showOffsets ? 3 : 2);
    let offset = 0;
    return html`
      <table class="type-def struct">
        <thead>
          <tr>
            <th style="width:${widths}%">${localize("field")}</th>
            ${showOffsets && html`
              <th style="width:${widths}%">${localize("offset")}</th>
            `}
            <th style="width:${widths}%">${localize("type")}</th>
            <th>${localize("comments")}</th>
          </tr>
        </thead>
        <tbody>
          ${instantiatedType.typeDef.fields.map(field => {
            const fieldPathId = joinPathId(pathId, field.name);
            const fieldOffset = offset;
            const instantiatedFieldType = instantiateType(processGenerics(field, instantiatedType.typeArgs));
            const {typeDef: fieldTypeDef, totalSize: fieldSize, typeName: fieldTypeName, typeArgs: fieldTypeArgs} = instantiatedFieldType;
            offset += fieldSize;

            const seenTypeId = `${fieldTypeName}<${fieldTypeArgs && Object.values(fieldTypeArgs).join(",")}>`;
            const hasSeenType = seenTypes[seenTypeId];
            if (!hasSeenType) {
              seenTypes[seenTypeId] = fieldPathId;
            }

            let embeddedType = undefined;
            if (fieldTypeDef.class) {
              embeddedType = instantiatedFieldType;
            } else if (fieldTypeName == "ptr32" || fieldTypeName == "ptr64") {
              embeddedType = instantiateType({type: Object.values(fieldTypeArgs)[0]});
            }

            const rowClasses = [
              "struct-field",
              `field-type-${escapeHtml(field.type)}`,
              ...(field.meta ? field.meta.map(([k]) => `field-meta-${k}`) : []),
              ...(fieldTypeDef.class ? [`has-embedded-class-${fieldTypeDef.class}`] : [])
            ];

            return html`
              <tr class="${rowClasses.join(" ")}">
                <td class="field-name">${renderFieldName(field.name, fieldPathId)}</td>
                ${showOffsets && html`
                  <td class="field-offset">${renderHex(fieldOffset)}</td>
                `}
                <td class="field-type">
                  ${renderStructFieldType(instantiatedFieldType)}
                  ${embeddedType && hasSeenType && html`<sup><a href="#${slugify(hasSeenType.join("-"))}">?</a></sup>`}
                </td>
                <td class="comments">${renderComments(field)}</td>
              </tr>
              ${embeddedType && !hasSeenType && html`
                <tr class="embedded-type">
                  <td colspan="${showOffsets ? 4 : 3}">
                    ${renderTypeAsTable(embeddedType, fieldPathId)}
                  </td>
                </tr>
              `}
            `;
          })}
        </tbody>
      </table>
    `;
  }

  function renderBitfieldAsTable(instantiatedType, pathId) {
    return html`
      <table class="type-def bitfield">
        <thead>
          <tr>
            <th style="width:25%">${localize("flag")}</th>
            <th style="width:25%">${localize("mask")}</th>
            <th>${localize("comments")}</th>
          </tr>
        </thead>
        <tbody>
          ${instantiatedType.typeDef.bits.map((bit, i) => html`
            <tr>
              <td>${renderFieldName(bit.name, joinPathId(pathId, bit.name))}</td>
              <td>${renderHex(0x1 << i)}</td>
              <td>${renderComments(bit)}</td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  function renderEnumAsTable(instantiatedType, pathId) {
    return html`
      <table class="type-def enum">
        <thead>
          <tr>
            <th style="width:25%">${localize("option")}</th>
            <th style="width:25%">${localize("value")}</th>
            <th>${localize("comments")}</th>
          </tr>
        </thead>
        <tbody>
          ${instantiatedType.typeDef.options.map((option, i) => html`
            <tr>
              <td>${renderFieldName(option.name, joinPathId(pathId, option.name))}</td>
              <td>${renderHex(option.value !== undefined ? option.value : i)}</td>
              <td>${renderComments(option)}</td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  function renderTypeAsTable(instantiatedType, pathId) {
    return html`
      ${renderComments(instantiatedType.typeDef)}
      ${(() => {
        switch (instantiatedType.typeDef.class) {
          case "struct":
            return renderStructAsTable(instantiatedType, pathId);
          case "bitfield":
            return renderBitfieldAsTable(instantiatedType, pathId);
          case "enum":
            return renderEnumAsTable(instantiatedType, pathId);
          default:
            throw new Error(`Unhandled type class: ${typeDef.class}`);
        }
      })()}
    `;
  }

  return renderTypeAsTable(instantiateType({type: entryType}), [id || ""]);
}

module.exports = {renderStructYaml, INTRINSIC_TYPE_DEFS};
