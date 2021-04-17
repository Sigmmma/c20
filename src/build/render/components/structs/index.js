const fs = require("fs");
const path = require("path");
const {html, escapeHtml, slugify, detailsList, tagAnchor, renderHex} = require("../bits");
const {instantiateType, buildTypeDefs} = require("../../../../data/structs");
const localizations = require("./localizations");

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

function structDisplay(ctx, opts) {
  const {renderMarkdown} = require("../markdown"); //todo: untangle circular dep
  const localize = localizations(ctx.lang);
  const {
    type_defs: typeDefsArg,
    entry_type,
    showOffsets,
    skipPadding,
    showEntryComments,
    noRootExtend,
    simpleTypes,
    id
  } = opts;

  const typeDefs = buildTypeDefs(typeDefsArg, opts.imports, ctx.data.structs);
  const searchTerms = [];
  const headings = [];
  const seenTypes = {};

  function addSearchTermsForPart(part) {
    if (part.name) {
      searchTerms.push(part.name.split("_"));
    }
    if (part.comments && part.comments[ctx.lang]) {
      searchTerms.push(renderMarkdown(ctx, part.comments[ctx.lang], true));
    }
  }
  function addSearchTermsForTypeDef(typeDef) {
    addSearchTermsForPart(typeDef);
    if (typeDef.class == "struct") {
      typeDef.fields.forEach(f => addSearchTermsForPart(f));
    } else if (typeDef.class == "bitfield") {
      typeDef.bits.forEach(b => addSearchTermsForPart(b));
    } else if (typeDef.class == "enum") {
      typeDef.options.forEach(o => addSearchTermsForPart(o));
    }
  }

  function renderComments(part) {
    const meta = Object.entries(processMeta(part.meta) || {})
      .filter(([k]) => localize(`meta_${k}`, true));
    return html`
      ${meta.length > 0 && html`
        <ul class="field-metas">
          ${meta.map(([k, v]) => html`
            <li class="field-meta">${localize(`meta_${k}`)}${v !== true ? `: ${v}` : ""}</li>
          `)}
        </ul>
      `}
      ${part.comments && part.comments[ctx.lang] &&
        renderMarkdown(ctx, part.comments[ctx.lang])
      }
    `;
  }

  function renderStructFieldType(field, {typeDef, totalSize, singleSize, variableSize, count, type_args, typeName}) {
    let typeStr = typeName;
    if (typeDef.class == "bitfield" || typeDef.class == "enum") {
      if (simpleTypes) {
        typeStr = typeDef.class;
      } else {
        typeStr += `: ${typeDef.class}${singleSize * 8}`;
      }
    }
    if (!simpleTypes && type_args) {
      typeStr += `<${Object.values(type_args).join(", ")}>`;
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
    const typeCode = html`<code title="${totalSize} bytes">${typeStr}</code>`;
    if (field.meta && field.meta.tag_classes) {
      return detailsList(typeCode, field.meta.tag_classes.map(tagName =>
        tagName == "*" ? "(any)" : tagAnchor(ctx, tagName)
      ), 4);
    }
    if (field.meta && field.meta.index_of) {
      return `${typeCode}<a title="${localize("seeIndex")}" href="#${slugify(`${id}-${field.meta.index_of}`)}">→</a>`;
    }
    return typeCode;
  }

  function renderFieldName(fieldName, pathId) {
    if (!fieldName) return null;
    fieldName = fieldName.replace(/_/g, " ");
    if (!pathId) return escapeHtml(fieldName);
    const pathTitle = escapeHtml(pathId.slice(1).join("/"));
    const pathIdAttr = slugify(pathId.join("-"));
    return html`
      <span title="${pathTitle}" id="${pathIdAttr}">
        ${escapeHtml(fieldName)}<a href="#${pathIdAttr}" class="header-anchor"></a>
      </span>
    `;
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
            if (skipPadding && field.type == "pad") {
              return null;
            }

            const fieldPathId = joinPathId(pathId, field.name);
            const fieldOffset = offset;
            const instantiatedFieldType = instantiateType(typeDefs, field, instantiatedType.type_args, {});
            const {typeDef: fieldTypeDef, totalSize: fieldSize, typeName: fieldTypeName, type_args: fieldTypeArgs} = instantiatedFieldType;
            offset += fieldSize;

            const seenTypeId = `${fieldTypeName}<${fieldTypeArgs && Object.values(fieldTypeArgs).join(",")}>`;
            const hasSeenType = seenTypes[seenTypeId];
            if (!hasSeenType) {
              seenTypes[seenTypeId] = fieldPathId;
            }

            let embeddedType = undefined;
            if (fieldTypeName != "TagDependency") {
              if (fieldTypeArgs && (fieldTypeName == "Block" || fieldTypeName == "ptr32" || fieldTypeName == "ptr64")) {
                embeddedType = instantiateType(typeDefs, {type: Object.values(fieldTypeArgs)[0]}, instantiatedType.type_args, {});
                if (embeddedType.typeDef.class) {
                  headings.push({title: field.name.replace(/_/g, " "), id: slugify(fieldPathId.join("-")), level: fieldPathId.length});
                } else {
                  embeddedType = undefined;
                }
              } else if (fieldTypeDef.class) {
                embeddedType = instantiatedFieldType;
              }
            }

            const rowClasses = [
              "struct-field",
              `field-type-${escapeHtml(field.type)}`,
              ...(field.meta ? Object.entries(field.meta).map(([k]) => `field-meta-${k}`) : []),
              ...(fieldTypeDef.class ? [`has-embedded-class-${fieldTypeDef.class}`] : [])
            ];

            return html`
              <tr class="${rowClasses.join(" ")}">
                <td class="field-name">${renderFieldName(field.name, fieldPathId)}</td>
                ${showOffsets && html`
                  <td class="field-offset">${renderHex(fieldOffset)}</td>
                `}
                <td class="field-type">
                  ${renderStructFieldType(field, instantiatedFieldType)}${embeddedType && hasSeenType && html`<sup><a href="#${slugify(hasSeenType.join("-"))}">?</a></sup>`}
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
    if (!instantiatedType.typeDef.bits) {
      console.log(pathId, instantiatedType);
    }
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
              <td>${renderHex(0x1 << i >>> 0)}</td>
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
    addSearchTermsForTypeDef(instantiatedType.typeDef);
    return html`
      ${(showEntryComments || entry_type != instantiatedType.typeName) &&
        renderComments(instantiatedType.typeDef)
      }
      ${(() => {
        switch (instantiatedType.typeDef.class) {
          case "struct":
            return renderStructAsTable(instantiatedType, pathId);
          case "bitfield":
            return renderBitfieldAsTable(instantiatedType, pathId);
          case "enum":
            return renderEnumAsTable(instantiatedType, pathId);
          default:
            console.error(instantiatedType.typeDef);
            throw new Error(`Unhandled type class: ${instantiatedType.typeDef.class}`);
        }
      })()}
    `;
  }

  return {
    html: renderTypeAsTable(instantiateType(typeDefs, {type: entry_type}, null, {noRootExtend: noRootExtend}), [id || ""]),
    searchTerms,
    headings
  };
}

module.exports = {
  structDisplay,
};
