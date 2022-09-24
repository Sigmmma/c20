const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const {html, jump, slugify, anchor} = require("./bits");
const R = require("ramda");

const AUTO_INDEX_THRESHOLD = 100;

function id(opts, row) {
  if (opts.linkCol === undefined) {
    return undefined;
  } else if (opts.linkCol === true) {
    return slugify(`${opts.id}-${R.path(opts.linkSlugKey.split("/"), row)}`);
  }
  const linkSlugKey = opts.linkSlugKey || opts.columns[opts.linkCol].key;
  return slugify(`${opts.id}-${R.path(linkSlugKey.split("/"), row)}`);
}

function renderCell(ctx, format, content, searchTerms) {
  const {renderMarkdown, renderMarkdownInline} = require("./markdown"); //todo: untangle circular dep

  format = format || "text";

  if (!content) {
    // Generates an empty table cell if content is omitted
    return "";
  } else if (format === "text") {
    searchTerms.push(renderMarkdown(ctx, content, true));
    return renderMarkdown(ctx, content);
  } else if (format === "code") {
    searchTerms.push(renderMarkdownInline(ctx, content, true));
    return renderMarkdownInline(ctx, "`" + content + "`");
  } else if (format === "anchor") {
    const url = ctx.resolveUrl(content);
    return anchor(url, content);
  } else if (format.startsWith("codeblock")) {
    searchTerms.push(content);
    const syntax = format.split("-")[1]; // Could be undef. That's ok.
    return renderMarkdown(ctx, "\n```" + syntax + "\n" + content + "\n```");
  } else {
    throw new Error(`unsupported column format: ${format}`);
  }
}

function renderTableYaml(ctx, optsYaml) {
  const searchTerms = [];

  const opts = yaml.load(optsYaml);

  if (!opts.dataPath) {
    console.warn(`Missing table value: dataPath (from ${ctx.page.pageId})`);
    return {htmlResult: null, searchTerms};
  }

  if (!Array.isArray(opts.dataPath)) {
    opts.dataPath = [opts.dataPath];
  }
  opts.id = opts.id || opts.dataPath.map(dataPath => R.last(dataPath.split("/"))).join("-");

  const dataSource = opts.dataSource ?
    yaml.load(fs.readFileSync(path.join(ctx.page.dirPath, opts.dataSource), "utf8")) :
    ctx.data;

  const rows = R.pipe(
    R.map(dataPathStr => R.pathOr([], dataPathStr.split("/"), dataSource)),
    R.map(rows => Array.isArray(rows) ?
      rows :
      Object.entries(rows).map(([key, value]) => ({key, value}))
    ),
    R.flatten,
    opts.rowSortKey ?
      R.sortBy(row => {
        const sortKey = R.path(opts.rowSortKey.split("/"), row);
        return sortKey ? sortKey.toUpperCase() : false;
      }) :
      R.identity,
    opts.rowSortReverse ?
      R.reverse :
      R.identity,
    opts.rowTagFilter ?
      R.filter(row => row.tags && row.tags.includes(opts.rowTagFilter)) :
      R.identity
  )(opts.dataPath);

  const rowsIndex = [];
  if (opts.rowSortKey && opts.linkCol && rows.length >= AUTO_INDEX_THRESHOLD) {
    rows.forEach((row, index) => {
      const sortKey = R.path(opts.rowSortKey.split("/"), row);
      const indexKey = sortKey[0].toUpperCase();
      if (rowsIndex.length == 0 || rowsIndex[rowsIndex.length - 1].indexKey != indexKey) {
        rowsIndex.push({indexKey, id: id(opts, row)});
      }
    });
  }

  const classes = [];
  if (opts.noClear) {
    classes.push("no-clear");
  }
  if (opts.wrapPre) {
    classes.push("wrap-pre");
  }

  const htmlResult = html`
    ${rowsIndex.length > 0 && html`
      <p>
        <nav>
          ${rowsIndex.map(firstRow => anchor(`#${firstRow.id}`, firstRow.indexKey)).join(" · ")}
        </nav>
      </p>
    `}
    <table class="${classes.join(" ")}">
      <thead>
        <tr>
          ${opts.columns.map((col, i) => html`
            <th style="${col.style}" colspan="${(opts.linkCol === true && i == 0) ? 2 : 1}">
              ${renderCell(ctx, "text", col.name, searchTerms)}
            </th>
          `)}
        </tr>
      </thead>
      <tbody>
        ${rows.map(row => {
          const slugId = id(opts, row);
          return html`
            <tr id="${slugId}">
              ${opts.linkCol === true && html`
                <td>${jump(slugId)}</td>
              `}
              ${opts.columns.map((col, i) => {
                const rowContent = R.path(col.key.split("/"), row);
                return html`
                  <td style="${col.style}">
        ${opts.linkCol === i ?
          jump(slugId, renderCell(ctx, col.format, rowContent, searchTerms)) :
          renderCell(ctx, col.format, rowContent, searchTerms)
        }
                  </td>
                `;
              })}
            </tr>
          `;
        })}
      </tbody>
    </table>
  `;

  return {searchTerms, html: htmlResult};
}

module.exports = {renderTableYaml};
