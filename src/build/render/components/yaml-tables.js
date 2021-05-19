const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const {html, jump, slugify, anchor} = require("./bits");
const R = require("ramda");

const AUTO_INDEX_THRESHOLD = 100;

function renderTableYaml(ctx, optsYaml) {
  const {renderMarkdown, renderMarkdownInline} = require("./markdown"); //todo: untangle circular dep

  const opts = yaml.load(optsYaml);

  if (!opts.tableDefs && !opts.tableDataModule)
    throw new Error("Missing table value: tableDefs or tableDataModule");

  if (!opts.tableName)
    throw new Error("Missing table value: tableName");

  let data = null;
  if (opts.tableDataModule) {
    data = R.path([...opts.tableDataModule.split("/"), opts.tableName], ctx.data);
  } else {
    data = yaml.load(
      fs.readFileSync(path.join(ctx.page.dirPath, opts.tableDefs), "utf8")
    )[opts.tableName];
  }

  // De-duplicate common YAML error message stuff
  function YamlError(reason) {
    return new Error(`Malformed table YAML. Table ${opts.tableName} ${reason}`);
  }

  if (!data)
    throw YamlError('table data not found');

  if (!data.columns)
    throw YamlError('missing entry: columns');

  if (!data.rows)
    throw YamlError('missing entry: rows');

  data.columns.reduce((seenKeys, col) => {
    if (seenKeys[col.key])
      throw YamlError(`duplicate key: ${col.key}`);

    seenKeys[col.key] = true;
    return seenKeys;
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
      return renderMarkdownInline(ctx, "`" + translated + "`");
    } else if (format.startsWith("codeblock")) {
      const syntax = format.split("-")[1]; // Could be undef. That's ok.
      return renderMarkdown(ctx, "\n```" + syntax + "\n" + translated + "\n```");
    } // Could implement others here
    else {
      throw YamlError(`unsupported column format: ${format}`);
    }
  }

  // Create a link slug, prioritizing row slug override, then table column key
  // setting, then falling back to index if no others are provided.
  function id(row, index) {
    return slugify(`${opts.tableName}-${row.slug || row[data.slugKey] || index}`);
  }

  // A column's content can optionally be used as a row link.
  const hrefCol = data.columns.find(col => col.href);

  let rowsSorted = data.rows;
  const rowsIndex = [];
  if (opts.rowSortKey) {
    rowsSorted = R.sortBy(
      R.compose(R.toUpper, R.prop(opts.rowSortKey)),
      data.rows
    );
    if (opts.rowSortReverse) {
      rowsSorted = R.reverse(rowsSorted);
    }
    if (opts.rowLinks && rowsSorted.length >= AUTO_INDEX_THRESHOLD) {
      rowsSorted.forEach((row, index) => {
        const indexKey = row[opts.rowSortKey][0].toUpperCase();
        if (rowsIndex.length == 0 || rowsIndex[rowsIndex.length - 1].indexKey != indexKey) {
          rowsIndex.push({indexKey, id: id(row, index)});
        }
      });
    }
  }

  if (opts.rowTagFilter) {
    rowsSorted = rowsSorted.filter(row => row.tags && row.tags.includes(opts.rowTagFilter));
    if (rowsSorted.length == 0) {
      throw YamlError(`Table filtered to 0 rows: ${opts.tableName}, ${opts.rowTagFilter}`);
    }
  }

  // Construct the table.
  // If rowLinks is enabled but no column is marked as href, an additional
  // column will be inserted for a link to each row.
  return html`
    ${rowsIndex.length > 0 && html`
      <p>
        <nav>
          ${rowsIndex.map(firstRow => anchor(`#${firstRow.id}`, firstRow.indexKey)).join(" · ")}
        </nav>
      </p>
    `}
    <table>
      <thead>
        <tr>
          ${data.columns.map((col, i) => html`
            <th style="${col.style}" colspan="${opts.rowLinks && !hrefCol && i == 0 ? 2: 1}">
              ${markdownToHtml('text', col.name)}
            </th>
          `)}
        </tr>
      </thead>
      <tbody>
        ${rowsSorted.map((row, index) => html`
          <tr id="${opts.rowLinks && id(row, index)}">
            ${opts.rowLinks && !hrefCol && html`
              <td>${jump(id(row, index))}</td>
            `}
            ${data.columns.map(col => html`
              <td style="${col.style}">
    ${opts.rowLinks && col === hrefCol ?
      jump(
        id(row, index),
        markdownToHtml(col.format, row[col.key]),
      ) :
      markdownToHtml(col.format, row[col.key])
    }
              </td>
            `)}
          </tr>
        `)}
      </tbody>
    </table>
  `;
}

module.exports = {renderTableYaml};
