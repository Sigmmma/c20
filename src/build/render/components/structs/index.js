const yaml = require("js-yaml");
const {html, escapeHtml, localizer, slugify} = require("../bits");

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
  absOffset: {
    en: "Offset (absolute)",
  },
  label_cache_only: {
    en: "Cache only"
  },
  label_mcc: {
    en: "MCC"
  }
});

const INTRINSIC_TYPE_DEFS = {
  pad: {size: 1},
  bool: {size: 1},
  char: {size: 1},
  uint8: {size: 1},
  int8: {size: 1},
  uint16: {size: 2},
  int16: {size: 2},
  int32: {size: 4},
  uint32: {size: 4},
  int64: {size: 8},
  uint64: {size: 8},
  float: {size: 4},
  double: {size: 8},
};

function joinPathId(pathId, next) {
  return `${pathId}-${slugify(next)}`;
}

function renderStructYaml(ctx, optsYaml) {
  const {renderMarkdown} = require("../markdown"); //todo: untangle circular dep
  const localize = localizations(ctx.lang);
  const {typeDefs, entryType, showAbsoluteOffsets, id} = yaml.load(optsYaml);

  let absoluteOffset = 0;

  function renderComments(field) {
    return html`
      ${field.labels && html`
        <ul class="field-labels">
          ${field.labels.map(label => html`
            <li class="field-label">${localize(`label_${label}`)}</li>
          `)}
        </ul>
      `}
      ${field.comments && field.comments[ctx.lang] &&
        renderMarkdown(ctx, field.comments[ctx.lang])
      }
    `;
  }

  function renderFieldType(field) {
    if (!field.type) return null;
    const typeDef = typeDefs[field.type];
    let size = field.size || (typeDef && typeDef.size) || undefined;

    let typeStr = field.type;
    if (typeDef && typeDef.class != "struct") {
      typeStr = typeDef.class;
    }
    if (field.type_args) {
      typeStr += `<${field.type_args.join(", ")}>`;
    }
    if (size !== undefined) {
      if (typeDef && (typeDef.class == "bitfield" || typeDef.class == "enum")) {
        size = `${size * 8}-bit`;
      }
      typeStr += `(${size})`;
    }
    if (field.count !== undefined) {
      typeStr += `[${field.count}]`;
    }
    return html`<code>${escapeHtml(typeStr)}</code>`;
  }

  function renderFieldName(fieldName, pathId) {
    return fieldName ? html`
      <span id="${pathId}">
        ${escapeHtml(fieldName)}
        <a href="#${pathId}" class="header-anchor"></a>
      </span>` : null;
  }

  function calcFieldSize(field) {
    const typeDef = typeDefs[field.type] || INTRINSIC_TYPE_DEFS[field.type];
    const size = field.size || (typeDef && typeDef.size) || 0;
    const count = field.count !== undefined ? field.count : 1;
    return size * count;
  }

  function renderHex(num) {
    return html`<code title="${num}">0x${num.toString(16)}</code>`;
  }

  function renderStructFieldRow(field, pathId) {
    const typeDef = typeDefs[field.type];
    const fieldAbsOffset = absoluteOffset;
    absoluteOffset += calcFieldSize(field);

    const rowClasses = [
      "struct-field",
      `field-type-${escapeHtml(field.type)}`,
      ...(field.labels ? field.labels.map(label => `field-label-${label}`) : []),
      ...(typeDef ? ["has-embedded"] : [])
    ];

    return html`
      <tr class="${rowClasses.join(" ")}">
        <td class="field-name">${renderFieldName(field.name)}</td>
        ${showAbsoluteOffsets && html`
          <td class="field-offset">${renderHex(fieldAbsOffset)}</td>
        `}
        <td class="field-type">${renderFieldType(field)}</td>
        <td class="comments">${renderComments(field)}</td>
      </tr>
      ${typeDef && html`
        <tr class="embedded-type">
          <td colspan="${showAbsoluteOffsets ? 4 : 3}">
            ${renderTypeAsTable(typeDef, joinPathId(pathId, field.name))}
          </td>
        </tr>
      `}
    `;
  }

  function renderStructAsTable(typeDef, pathId) {
    const widths = 50 / (showAbsoluteOffsets ? 3 : 2);
    return html`
      <table class="type-def struct">
        <thead>
          <tr>
            <th style="width:${widths}%">${localize("field")}</th>
            ${showAbsoluteOffsets && html`
              <th style="width:${widths}%">${localize("absOffset")}</th>
            `}
            <th style="width:${widths}%">${localize("type")}</th>
            <th>${localize("comments")}</th>
          </tr>
        </thead>
        <tbody>
          ${typeDef.fields.map(field => renderStructFieldRow(field, pathId))}
        </tbody>
      </table>
    `;
  }

  function renderBitfieldAsTable(typeDef, pathId) {
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
          ${typeDef.fields.map((field, i) => html`
            <tr>
              <td>${renderFieldName(field.name, joinPathId(pathId, field.name))}</td>
              <td>${renderHex(0x1 << i)}</td>
              <td>${renderComments(field)}</td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  function renderEnumAsTable(typeDef, pathId) {
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
          ${typeDef.options.map((field, i) => html`
            <tr>
              <td>${renderFieldName(field.name, joinPathId(pathId, field.name))}</td>
              <td>${renderHex(i)}</td>
              <td>${renderComments(field)}</td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  function renderTypeAsTable(typeDef, pathId) {
    switch (typeDef.class) {
      case undefined:
      case "struct":
        return renderStructAsTable(typeDef, pathId);
      case "bitfield":
        return renderBitfieldAsTable(typeDef, pathId);
      case "enum":
        return renderEnumAsTable(typeDef, pathId);
      default:
        throw new Error(`Unhandled type class: ${typeDef.class}`);
    }
  }

  return renderTypeAsTable(typeDefs[entryType], id || "");
}

module.exports = {renderStructYaml};
