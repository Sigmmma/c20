const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const {html, localizer, slugify} = require("./bits");

function renderTableYaml(ctx, optsYaml) {
  const {renderMarkdown} = require("./markdown"); //todo: untangle circular dep

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

module.exports = {renderTableYaml};
