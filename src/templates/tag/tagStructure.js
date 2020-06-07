const {html, classes, renderMarkdown, tagAnchor, ul, heading, detailsList, slugify, alert, defAnchor} = require("../shared");
const getExtraPrimitiveInfo = require("./primitives");

const INVADER_TAG_BASE = "https://github.com/Kavawuvi/invader/blob/master/src/tag/hek/definition";
const URL_ENDIANNESS = "https://en.wikipedia.org/wiki/Endianness";

/* TODO:
- "inherits": "SpawnPrelude",
- searchable fields
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

const renderComment = (md, metaIndex) => {
  if (md == "...") return null;
  return renderMarkdown(md, metaIndex);
};

const fieldInfo = (field, fieldComments, metaIndex) => {
  const info = [];

  if (field.unused) {
    info.push(`Unused${defAnchor(metaIndex.resolveSlug("tags", "unused-tags-and-fields"))} by Halo.`)
  }
  if (field.minimum) {
    info.push(`Minimum: ${field.minimum}`);
  }
  if (field.maximum) {
    info.push(`Maximum: ${field.maximum}`);
  }
  if (field.hidden) {
    info.push("Internal to the tag and may be hidden in tools.");
  }
  if (field.read_only) {
    info.push("Read-only data, not meant to be edited by hand.");
  }
  if (field.non_cached) {
    info.push(`Not included when the tag is compiled into a <a href="${metaIndex.resolveSlug("tags", "blocks")}">map cache</a>.`);
  }
  if (field.cache_only) {
    info.push(`Only set when the tag is compiled into a <a href="${metaIndex.resolveSlug("tags", "blocks")}">map cache</a>.`);
  }
  if (field.engine) {
    info.push(`Only applicable to the following engine versions: ${field.engine.join(", ")}.`);
  }
  if (field.default) {
    info.push(`Default value: ${field.default}.`);
  }
  if (field.volatile) {
    info.push(`This field's value may change at build time or have precision errors. It should not be used for exact comparisons between tag data.`);
  }
  if (field.shifted_by_one) {
    info.push(`This field's value must be subtracted by 1 by map compilers. It is unknown why this is done by Tool.`);
  }

  let comments = field.comment ? html`<p>${field.comment}</p>` : null;
  if (fieldComments && fieldComments.md) {
    comments = renderComment(fieldComments.md, metaIndex);
  }

  return html`
    ${comments}
    ${info.length > 0 && ul(info)}
  `;
};

const fieldTypeDisplay = (field, fieldTypeStruct, metaIndex) => {
  let {typeName, compositeFields} = getExtraPrimitiveInfo(field.type);

  if (field.type == "TagReflexive") {
    typeName = html`Block${defAnchor(metaIndex.resolveSlug("tags", "blocks"))}`;
  } else if (field.type == "TagDependency") {
    typeName = html`Reference${defAnchor(metaIndex.resolveSlug("tags", "tag-references-and-paths"))}`;
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
      const tagDef = metaIndex.data.h1.tagsByName[tagName];
      return tagDef ? tagAnchor(tagDef, metaIndex) : tagDef;
    });
    return detailsList(typeCode, depLinks, true);
  }

  //todo
  if (compositeFields) {
    const renderedCompositeFields = compositeFields.map(({name, type}) =>
      `${name}: <code>${type}</code>`
    );
    return detailsList(typeCode, renderedCompositeFields, false);
  }

  return typeCode;
};

const fieldView = (field, comments, metaIndex, addHeading, hLevel) => {
  const fieldComments = comments.fields.find(it => it.name == field.name);
  const fieldTypeStruct = metaIndex.data.h1.invaderStructDefs[field.type];

  const rowClasses = [];
  if (field.type == "TagDependency") {
    rowClasses.push("content-tag-minor");
  }
  if (field.unused || field.type == "pad" || field.hidden || field.read_only) {
    rowClasses.push("content-faded");
  }

  let rowId = null;
  if (field.name && field.type == "TagReflexive" && hLevel >= 2 && hLevel <= 4) {
    rowId = `tag-block-${slugify(field.name)}`;
    addHeading({title: field.name, id: rowId, level: hLevel});
  }

  return html`
    <tr ${rowId && `id="${rowId}"`} ${classes(rowClasses)}>
      <td>${field.name && field.name}</td>
      <td>${fieldTypeDisplay(field, fieldTypeStruct, metaIndex)}</td>
      <td>${fieldInfo(field, fieldComments, metaIndex)}</td>
    </tr>
    ${field.type == "TagReflexive" && html`
      <tr class="tag-block-body">
        <td colspan="3">${structView(metaIndex.data.h1.invaderStructDefs[field.struct], field.struct, fieldComments, metaIndex, addHeading, hLevel + 1)}</td>
      </tr>
    `}
    ${fieldTypeStruct && (fieldTypeStruct.type == "bitfield" || fieldTypeStruct.type == "enum") && html`
      <tr class="tag-block-body">
        <td colspan="3">${structView(fieldTypeStruct, field.type, fieldComments, metaIndex, addHeading, hLevel + 1)}</td>
      </tr>
    `}
  `;
}

const structView = (struct, structName, comments, metaIndex, addHeading, hLevel) => {
  if (!struct) {
    return structName;
  } else if (struct.type == "bitfield") {
    return html`
      <table class="tag-struct">
        <thead>
          <tr>
            <th style="width:25%">Flag</th>
            <th style="width:25%">Mask</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          ${struct.fields.map((field, i) => html`
            <tr>
              <td>${field}</td>
              <td><code title="${0x1 << i}">0x${(0x1 << i).toString(16)}</code></td>
              <td>${renderComment(comments.fields.find(it => it.name == field).md, metaIndex)}</td>
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
            <th style="width:25%">Option</th>
            <th style="width:25%">Value</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          ${struct.options.map((option, i) => html`
            <tr>
              <td>${option}</td>
              <td><code title="${i}">0x${i.toString(16)}</code></td>
              <td>${renderComment(comments.options.find(it => it.name == option).md, metaIndex)}</td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  } else if (!struct.fields || struct.fields.length == 0) {
    return html`<p><em>This structure has no fields.</em></p>`;
  } else if (struct.type == "struct") {
    return html`
      <table class="tag-struct">
        <thead>
          <tr>
            <th style="width:25%">Field</th>
            <th style="width:25%">Type</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          ${struct.fields.map(field => fieldView(field, comments, metaIndex, addHeading, hLevel))}
        </tbody>
      </table>
    `;
  } else {
    throw new Error(`Unknown struct type: ${struct.type}`);
  }
};

const renderTagStructure = (tag, metaIndex) => {
  const invaderDefUrl = `${INVADER_TAG_BASE}/${tag.name}.json`;
  const headings = [];
  const addHeading = (heading) => headings.push(heading);
  const htmlResult = html`
    ${heading("h1", "Structure and fields", "clear")}
    ${tag.parent && alert("info", html`
      <p>
        This tag inherits fields from ${tagAnchor(tag.parent, metaIndex)} which
        are not shown here. See the parent's page for more information.
        The following information is unique to the <strong>${tag.name}</strong> tag.
      </p>
    `)}
    ${structView(tag.invaderStruct, tag.invaderStructName, tag.comments, metaIndex, addHeading, 2)}
    <p><small>This information was partially generated using <a href="${invaderDefUrl}">Invader tag definitions</a>.</small></p>
  `;
  return {headings, htmlResult};
};

module.exports = renderTagStructure;
