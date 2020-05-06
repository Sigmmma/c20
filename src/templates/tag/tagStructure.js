const {html, renderMarkdown, tagAnchor, ul, heading, detailsList} = require("../shared");

const INVADER_TAG_BASE = "https://github.com/Kavawuvi/invader/blob/master/src/tag/hek/definition";

//todo: handle EVERY field flag
//todo: handle EVERY field type
//todo: style rows by unused, reference, etc
//todo: headers for tag blocks
//todo: also unused if tag dependency is to an unused tag class

const fieldInfo = (field, metaIndex) => {
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

  if (field.classes) {
    const depLinks = field.classes.map(tagName => {
      const tagDef = metaIndex.data.h1.tagsByName[tagName];
      return tagDef ?
        tagAnchor(tagDef, metaIndex) : tagDef;
    });
    info.push(detailsList("Dependency", depLinks));
  }

  return ul(info);
};

const fieldTypeDisplay = (fieldType, field) => html`
  <code>
    ${fieldType}${field.size && `(${field.size})`}
    ${field.count && field.count > 0 && `x${field.count}`}
  </code>
`;

const structView = (struct, structName, metaIndex) => {
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
            const fieldClass = field.unused ? "unused" : fieldType.toLowerCase();
            return html`
              <tr class="field-${fieldClass}">
                <td>
                  ${field.name && html`<strong>${field.name}</strong><br/>`}
                  ${fieldTypeDisplay(fieldType, field)}
                </td>
                <td>${fieldInfo(field, metaIndex)}</td>
              </tr>
              ${fieldType == "TagBlock" && html`
                <tr class="tag-block-body">
                  <td colspan="2">${structView(metaIndex.data.h1.invaderStructDefs[field.struct], field.struct, metaIndex)}</td>
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
  return html`
    ${heading("h1", "Tag structure")}
    <p>The following is a representation of the tag's binary format, derived from its <a href="${invaderDefUrl}">Invader tag definition</a>.</p>
    ${structView(tag.invaderStruct, tag.invaderStructName, metaIndex)}
  `;
};

module.exports = renderTagStructure;
