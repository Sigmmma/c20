const {html, renderMarkdown, tagAnchor, ul, heading, detailsList, slugify} = require("../shared");

const INVADER_TAG_BASE = "https://github.com/Kavawuvi/invader/blob/master/src/tag/hek/definition";

//todo: handle EVERY field flag
//todo: handle EVERY field type
//todo: style rows by unused, reference, etc
//todo: searchable fields
//todo: also unused if tag dependency is to an unused tag class
//CHILDREN TAGS DOESNT WORK ANYMORE

const fieldInfo = (field, fieldComments, metaIndex) => {
  if (field.unused) {
    return html`<p>This field is unused by Halo.</p>`;
  }
  const info = [];
  if (field.unit) {
    info.push(`Units: ${field.unit}`);
  }
  if (field.minimum !== undefined && field.maximum !== undefined) {
    const min = field.minimum === undefined ? "?" : field.minimum;
    const max = field.maximum === undefined ? "?" : field.maximum;
    info.push(`Range: ${min} - ${max}`);
  } else if (field.minimum !== undefined) {
    info.push(`Minimum: ${field.minimum}`);
  } else if (field.maximum !== undefined) {
    info.push(`Maximum: ${field.maximum}`);
  }

  let comments = null;
  if (fieldComments && fieldComments.md && fieldComments.md != "...") {
    comments = renderMarkdown(fieldComments.md, metaIndex);
  }

  if (field.classes) {
    const depLinks = field.classes.map(tagName => {
      const tagDef = metaIndex.data.h1.tagsByName[tagName];
      return tagDef ?
        tagAnchor(tagDef, metaIndex) : tagDef;
    });
    info.push(detailsList("References", depLinks));
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
          ${struct.fields.map(field => {
            const fieldType = field.type == "TagReflexive" ? "TagBlock" : field.type;
            const fieldComments = comments.fields.find(it => it.name == field.name);

            let fieldClass = `field-${field.unused ? "unused" : fieldType.toLowerCase()}`;
            if (field.type == "TagDependency") {
              fieldClass += " content-tag-reference";
            }

            let fieldHeadingId = null;;
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
                <td>${fieldInfo(field, fieldComments, metaIndex)}</td>
              </tr>
              ${fieldType == "TagBlock" && html`
                <tr class="tag-block-body">
                  <td colspan="2">${structView(metaIndex.data.h1.invaderStructDefs[field.struct], field.struct, fieldComments, metaIndex, addHeading, hLevel + 1)}</td>
                </tr>
              `}
            `;
          })}
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
    <p>The following is a representation of the tag's binary format, derived from its <a href="${invaderDefUrl}">Invader tag definition</a>.</p>
    ${structView(tag.invaderStruct, tag.invaderStructName, tag.comments, metaIndex, addHeading, 2)}
  `;
  return {headings, htmlResult};
};

module.exports = renderTagStructure;
