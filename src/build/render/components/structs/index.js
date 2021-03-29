const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
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
  offset: {
    en: "Offset (relative)",
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
  if (!pathId || !next) return null;
  return [...pathId, next];
}

function renderStructYaml(ctx, optsYaml) {
  const {renderMarkdown} = require("../markdown"); //todo: untangle circular dep
  const localize = localizations(ctx.lang);
  const {typeDefs: typeDefsArg, entryType, showOffsets, id} = yaml.load(optsYaml);
  const typeDefs = typeof(typeDefsArg) === "string" ?
    yaml.load(fs.readFileSync(path.join(ctx.page.dirPath, typeDefsArg), "utf8")) :
    typeDefsArg;
  const seenTypes = {};

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
      typeStr += `: ${typeDef.class}`;
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
    typeStr = escapeHtml(typeStr);
    if (field.endianness !== undefined) {
      const lbl = field.endianness == "little" ? "LE" : (field.endianness == "big" ? "BE" : "LE/BE");
      typeStr += ` <span class="field-label">${lbl}</span>`;
    }
    return html`<code>${typeStr}</code>`;
  }

  function renderFieldName(fieldName, pathId) {
    if (!fieldName) return null;
    if (!pathId) return escapeHtml(fieldName);
    const pathTitle = escapeHtml(pathId.join("/"));
    const pathIdAttr = slugify(pathId.join("-"));
    return html`
      <span title="${pathTitle}" id="${pathIdAttr}">
        ${escapeHtml(fieldName)}<a href="#${pathIdAttr}" class="header-anchor"></a>
      </span>
    `;
  }

  function calcFieldSize(field) {
    const typeDef = typeDefs[field.type] || INTRINSIC_TYPE_DEFS[field.type];
    const size = field.size ||
      (typeDef && typeDef.size) ||
      (typeDef.class == "struct" && typeDef.fields.reduce((acc, next) => calcFieldSize(next) + acc, 0)) ||
      0;
    const count = field.count !== undefined ? field.count : 1;
    return size * count;
  }

  function renderHex(num) {
    return html`<code title="${num}">0x${num.toString(16).toUpperCase()}</code>`;
  }

  function renderStructFieldRow(field, pathId, offset) {
    const typeDef = typeDefs[field.type];
    const hasSeenType = seenTypes[field.type];
    seenTypes[field.type] = true;

    const rowClasses = [
      "struct-field",
      `field-type-${escapeHtml(field.type)}`,
      ...(field.labels ? field.labels.map(label => `field-label-${label}`) : []),
      ...(typeDef ? [`has-embedded-class-${typeDef.class}`] : [])
    ];

    return html`
      <tr class="${rowClasses.join(" ")}">
        <td class="field-name">${renderFieldName(field.name, joinPathId(pathId, field.name))}</td>
        ${showOffsets && html`
          <td class="field-offset">${renderHex(offset)}</td>
        `}
        <td class="field-type">${renderFieldType(field)}</td>
        <td class="comments">${renderComments(field)}</td>
      </tr>
      ${typeDef && !hasSeenType && html`
        <tr class="embedded-type">
          <td colspan="${showOffsets ? 4 : 3}">
            ${renderTypeAsTable(typeDef, joinPathId(pathId, field.name))}
          </td>
        </tr>
      `}
    `;
  }

  function renderStructAsTable(typeDef, pathId) {
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
          ${typeDef.fields.map(field => {
            const row = renderStructFieldRow(field, pathId, offset);
            offset += calcFieldSize(field);
            return row;
          })}
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
          ${typeDef.options.map((option, i) => html`
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

  const entryTypeDef = typeDefs[entryType];
  if (!entryTypeDef) throw new Error(`Entry type ${entryType} is not defined`);
  return renderTypeAsTable(entryTypeDef, [id || ""]);
}

function renderTableYaml(ctx, optsYaml) {
  const {renderMarkdown} = require("../markdown"); //todo: untangle circular dep

  const opts = yaml.load(optsYaml);

  if (!opts.entryType)
    throw new Error("Missing table value: entryType");

  if (!opts.typeDefs)
    throw new Error("Missing table value: typeDefs");

  const data = yaml.load(
    fs.readFileSync(path.join(ctx.page.dirPath, opts.typeDefs), "utf8")
  )[opts.entryType];

  // De-duplicate common YAML error message stuff
  function YamlError(reason) {
    return new Error(`Malformed table YAML. Table ${opts.entryType} ${reason}`);
  }

  if (!data)
    throw YamlError('not found');

  if (!data.columns)
    throw YamlError('missing entry: columns');

  if (!data.rows)
    throw YamlError('missing entry: rows');

  data.columns.reduce((seenIds, col) => {
    if (seenIds[col.id])
      throw YamlError(`duplicate ID: ${col.id}`);

    seenIds[col.id] = true;
    return seenIds;
  }, {});

  // Converts the given content to HTML. content can be a string, or an object
  // containing both english and spanish strings. format can be used to add
  // additional markdown formatting without actually needing to have it in the
  // content itself.
  function markdownToHtml(format, content) {
    if (typeof format !== "string")
      throw YamlError(
        `invalid column format datatype: ${typeof format}. Must be string`);

    // Generates an empty table cell if content is omitted
    if (!content)
      return '';

    // Select a translation if we have one, or default to english
    const translated = typeof content === "object" ?
      content[ctx.lang] || content['en'] : content;

    if (format === "text") {
      return renderMarkdown(ctx, translated);
    } else if (format === "code") {
      return renderMarkdown(ctx, "`" + translated + "`");
    } else if (format.startsWith("codeblock")) {
      const syntax = format.split("-")[1]; // Could be undef. That's ok.
      return renderMarkdown(ctx, "```" + syntax + "\n" + translated + "\n```");
    } // Could implement others here
    else {
      throw YamlError(`unsupported column format: ${format}`);
    }
  }

  // TODO also support opts.rowLinks to link directly to table rows
  return html`
    <table>
      <thead>
        <tr>
        ${ data.columns.map(col =>
          html`<th style="${col.style}">${ markdownToHtml('text', col.name) }</th>`
        ) }
        </tr>
      </thead>
      <tbody>
        ${ data.rows.map(row =>
          html`<tr>${ data.columns.map(col =>
            html`<td style="${col.style}">${ markdownToHtml(col.format, row[col.id]) }</td>`
          ) }</tr>`
        ) }
      </tbody>
    </table>
  `;
}

module.exports = {renderStructYaml, renderTableYaml};
