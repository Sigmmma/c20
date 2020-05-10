const {html, renderMarkdown, tagAnchor, ul, heading, detailsList, slugify, alert} = require("../shared");

const INVADER_TAG_BASE = "https://github.com/Kavawuvi/invader/blob/master/src/tag/hek/definition";

//todo: handle EVERY field type
//todo: searchable fields
//todo: include parent tags? (maybe via link)

/* TODO: handle these field props
 * engine
 * size
 * bounds
 * struct
 * endian
 * cache_only
 * non_cached
 * read_only
 * volatile
 * reflexive
 * hidden
 * default
 * normalize
 * compile_ignore
 * drop_on_extract_hidden
 * shifted_by_one
 * flagged
 * non_null
 * ignore_cached
 * zero_on_index
 * file_offset
 * external_file_offset
 * default_sign
 */

const fieldInfo = (field, fieldComments, metaIndex) => {
  if (field.unused) {
    return html`<p>This field is unused by Halo.</p>`;
  }
  const info = [];

  for (let prop of Object.entries(field)) {
    const [propName, propVal] = prop;
    if (propName == "unit") {
      info.push(`Units: ${propVal}`);
    } else if (propName == "minimum") {
      info.push(`Minimum: ${propVal}`);
    } else if (propName == "maximum") {
      info.push(`Maximum: ${propVal}`);
    } else if (propName == "classes") {
      const depLinks = propVal.map(tagName => {
        const tagDef = metaIndex.data.h1.tagsByName[tagName];
        return tagDef ? tagAnchor(tagDef, metaIndex) : tagDef;
      });
      info.push(detailsList("References", depLinks));
    }
  }

  let comments = null;
  if (fieldComments && fieldComments.md && fieldComments.md != "...") {
    comments = renderMarkdown(fieldComments.md, metaIndex);
  }

  return html`
    ${comments}
    ${info.length > 0 && ul(info)}
  `;
};

const fieldTypeDisplay = (fieldType, field) => html`
  <code>
    ${fieldType}${field.size && `(${field.size})`}
    ${field.count && field.count > 0 && `x${field.count}`}
  </code>
`;

const fieldView = (field, comments, metaIndex, addHeading, hLevel) => {
  const fieldType = field.type == "TagReflexive" ? "TagBlock" : field.type;
  const fieldComments = comments.fields.find(it => it.name == field.name);

  let fieldClass = `field-${field.unused ? "unused" : fieldType.toLowerCase()}`;
  if (fieldType == "TagDependency") {
    fieldClass += " content-tag-minor";
  }

  let fieldHeadingId = null;
  if (field.name && fieldType == "TagBlock" && hLevel >= 2 && hLevel <= 4) {
    fieldHeadingId = `tag-block-${slugify(field.name)}`;
    addHeading({title: field.name, id: fieldHeadingId, level: hLevel});
  }

  return html`
    <tr ${fieldHeadingId && `id="${fieldHeadingId}"`} class="${fieldClass}">
      <td>
        ${field.name && html`<strong>${field.name}</strong><br/>`}
        ${fieldTypeDisplay(fieldType, field)}
      </td>
      <td>
        ${fieldInfo(field, fieldComments, metaIndex)}
      </td>
    </tr>
    ${fieldType == "TagBlock" && html`
      <tr class="tag-block-body">
        <td colspan="2">${structView(metaIndex.data.h1.invaderStructDefs[field.struct], field.struct, fieldComments, metaIndex, addHeading, hLevel + 1)}</td>
      </tr>
    `}
  `;
}

const structView = (struct, structName, comments, metaIndex, addHeading, hLevel) => {
  if (!struct) {
    return structName;
  } else if (struct.type == "struct") {
    return html`
      <table class="tag-struct">
        <thead>
          <tr>
            <th style="width:30%">Field</th>
            <th>Field information</th>
          </tr>
        </thead>
        <tbody>
          ${(!struct.fields || struct.fields.length == 0) && html`
            <tr><td colspan="2"><em>This structure has no fields.</em></td></tr>
          `}
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
