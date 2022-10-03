const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
import {slugify} from "../../utils/strings";
import * as R from "ramda";
import {useCtx} from "../Ctx/Ctx";
import {Jump} from "../Heading/Heading";
import Md from "../Md/Md";
import CodeBlock from "../CodeBlock/CodeBlock";

const AUTO_INDEX_THRESHOLD = 100;

function rowId(props: DataTableProps, row): string | undefined {
  if (props.linkCol === undefined) {
    return undefined;
  } else if (props.linkCol === true) {
    if (!props.linkSlugKey) {
      return undefined;
    }
    return slugify(`${props.id}-${R.path(props.linkSlugKey.split("/"), row)}`);
  }
  const linkSlugKey = props.linkSlugKey ?? props.columns[props.linkCol as number].key;
  return slugify(`${props.id}-${R.path(linkSlugKey.split("/"), row)}`);
}

function renderCell(ctx, format, content, searchTerms) {
  format = format ?? "text";
  if (!content) {
    // Generates an empty table cell if content is omitted
    return "";
  } else if (format === "text") {
    // searchTerms.push(renderMarkdown(ctx, content, true));
    return <Md src={content}/>;
  } else if (format === "code") {
    // searchTerms.push(renderMarkdownInline(ctx, content, true));
    return <code>{content}</code>;
  } else if (format === "anchor") {
    const target = ctx.resolvePage(content);
    return <a href={target.url}>{target.title}</a>;
  } else if (format.startsWith("codeblock")) {
    // searchTerms.push(content);
    const syntax = format.split("-")[1]; // Could be undef. That's ok.
    return <CodeBlock language={syntax} code={content}/>;
  } else {
    throw new Error(`unsupported column format: ${format}`);
  }
}

export type DataTableProps = {
  dataPath: string | string[];
  /** @deprecated use page-local data instead */
  dataSource?: string;
  id?: string;
  rowSortKey?: string;
  rowSortReverse?: boolean;
  rowTagFilter?: string; //todo: not very general
  linkCol?: boolean | number;
  noClear?: boolean;
  wrapPre?: boolean;
  linkSlugKey?: string;
  columns: {
    name: string;
    key: string;
    style?: string;
    format?: string;
  }[]
};

//todo: split out so we can use for plaintext case
function gatherRows() {

}

export default function DataTable(props: DataTableProps) {
  const ctx = useCtx();
  if (!ctx) return null;

  const searchTerms = [];

  if (!props.dataPath) {
    console.warn(`Missing table value: dataPath (from ${ctx?.pageId ?? "unknown"})`);
    return {htmlResult: null, searchTerms};
  }

  const dataPaths = (props.dataPath ?
    (Array.isArray(props.dataPath) ?
      props.dataPath :
      [props.dataPath]
    ) :
    []
  ).map(dataPath => dataPath.split("/"));
  const id = props.id ?? dataPaths.map(R.last).join("-");

  const dataSource = props.dataSource ?
    yaml.load(fs.readFileSync(path.join("./src/content", ...ctx.logicalPath, props.dataSource), "utf8")) :
    {...ctx.data, ...ctx.localData}; //todo: prefix these to avoid collisions?

  const rows = R.pipe(
    R.map(dataPath => R.pathOr([], dataPath, dataSource)),
    R.map(rows => Array.isArray(rows) ?
      rows :
      Object.entries(rows).map(([key, value]) => ({key, value}))
    ),
    R.flatten,
    props.rowSortKey ?
      R.sortBy(row => {
        const sortKey = R.path(props.rowSortKey!.split("/"), row);
        return sortKey ? sortKey.toUpperCase() : false;
      }) :
      R.identity,
    props.rowSortReverse ?
      R.reverse :
      R.identity,
    props.rowTagFilter ?
      R.filter(row => row.tags && row.tags.includes(props.rowTagFilter)) :
      R.identity
  )(dataPaths);

  const rowsIndex: {indexKey: string, id: string}[] = [];
  if (props.rowSortKey && props.linkCol && rows.length >= AUTO_INDEX_THRESHOLD) {
    rows.forEach((row, index) => {
      const sortKey = R.path(props.rowSortKey!.split("/"), row);
      const indexKey = sortKey[0].toUpperCase();
      if (rowsIndex.length == 0 || rowsIndex[rowsIndex.length - 1].indexKey != indexKey) {
        rowsIndex.push({indexKey, id: rowId(props, row) ?? String(index)});
      }
    });
  }

  const classes: string[] = [];
  if (props.noClear) {
    classes.push("no-clear");
  }
  if (props.wrapPre) {
    classes.push("wrap-pre");
  }

  //todo .join(" · ") CSS
  return (
    <>
      {rowsIndex.length > 0 &&
        <p>
          <nav>
            {rowsIndex.map(firstRow =>
              <a href={`#${firstRow.id}`}>{firstRow.indexKey}</a>
            )}
          </nav>
        </p>
      }
      <table class={classes.join(" ")}>
        <thead>
          <tr>
            {props.columns.map((col, i) =>
              <th style={col.style} colSpan={(props.linkCol === true && i == 0) ? 2 : 1}>
                {renderCell(ctx, "text", col.name, searchTerms)}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const slugId = rowId(props, row) ?? String(index);
            return (
              <tr id={slugId}>
                {props.linkCol === true &&
                  <td><Jump id={slugId}/></td>
                }
                {props.columns.map((col, i) => {
                  const rowContent = R.path(col.key.split("/"), row);
                  const cell = renderCell(ctx, col.format, rowContent, searchTerms);
                  return (
                    <td style={col.style}>
                      {props.linkCol === i ? <Jump id={slugId}>{cell}</Jump> : cell}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
