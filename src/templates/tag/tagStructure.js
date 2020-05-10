const {html, classes, renderMarkdown, tagAnchor, ul, heading, detailsList, slugify, alert} = require("../shared");

const INVADER_TAG_BASE = "https://github.com/Kavawuvi/invader/blob/master/src/tag/hek/definition";

/* TODO:
- handle EVERY field type
- searchable fields
- write about these field props:
  - bounds
  - struct
  - endian
  - volatile
  - default
  - normalize
  - compile_ignore
  - drop_on_extract_hidden
  - shifted_by_one
  - flagged
  - non_null ??
  - ignore_cached
  - zero_on_index
  - file_offset
  - external_file_offset
  - default_sign
*/

const fieldInfo = (field, fieldComments, metaIndex) => {
  const info = [];

  if (field.unused) {
    info.push(html`Unused by Halo.`)
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

  let comments = field.comment ? html`<p>${field.comment}</p>` : null;
  if (fieldComments && fieldComments.md && fieldComments.md != "...") {
    comments = renderMarkdown(fieldComments.md, metaIndex);
  }

  return html`
    ${comments}
    ${info.length > 0 && ul(info)}
  `;
};

const fieldTypeDisplay = (field, metaIndex) => {
  let typeName = field.type;
  if (field.type == "TagReflexive") {
    typeName = html`Block<sup><a href="${metaIndex.resolveSlug("tags", "blocks")}">?</a></sup>`;
  } else if (field.type == "TagDependency") {
    typeName = html`Reference<sup><a href="${metaIndex.resolveSlug("tags", "tag-references-and-paths")}">?</a></sup>`;
  } else if (field.type == "Index" && field.reflexive) {
    typeName = html`Index (${field.reflexive})`;
  }

  const typeCodeParts = [typeName];
  if (field.size) {
    typeCodeParts.push(`(${field.size})`);
  }
  if (field.unit) {
    typeCodeParts.push(` (${field.unit})`);
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

  return typeCode;
};

const fieldView = (field, comments, metaIndex, addHeading, hLevel) => {
  const fieldComments = comments.fields.find(it => it.name == field.name);

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
      <td>${fieldTypeDisplay(field, metaIndex)}</td>
      <td>${fieldInfo(field, fieldComments, metaIndex)}</td>
    </tr>
    ${field.type == "TagReflexive" && html`
      <tr class="tag-block-body">
        <td colspan="3">${structView(metaIndex.data.h1.invaderStructDefs[field.struct], field.struct, fieldComments, metaIndex, addHeading, hLevel + 1)}</td>
      </tr>
    `}
  `;
}

const structView = (struct, structName, comments, metaIndex, addHeading, hLevel) => {
  if (!struct) {
    return structName;
  } else if (!struct.fields || struct.fields.length == 0) {
    return html`<p><em>This structure has no fields.</em></p>`;
  } else if (struct.type == "struct") {
    return html`
      <table class="tag-struct">
        <thead>
          <tr>
            <th style="width:25%">Field</th>
            <th style="width:35%">Type</th>
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
    ${heading("h1", "Structure and fields")}
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
