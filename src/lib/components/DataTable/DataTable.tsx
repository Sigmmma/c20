const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
import {slugify} from "../../utils/strings";
import * as R from "ramda";
import {RenderContext, useCtx} from "../Ctx/Ctx";
import {Jump} from "../Heading/Heading";
import Md from "../Md/Md";
import CodeBlock from "../CodeBlock/CodeBlock";
import renderMdPlaintext from "../Md/plaintext";
import { parse, transform } from "../Md/markdown";

const AUTO_INDEX_THRESHOLD = 100;

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

function rowId(tableId: string, props: DataTableProps, row: object, index: number): string {
  if (props.linkCol === undefined) {
    return `${tableId}-${index + 1}`;
  } else if (props.linkCol === true) {
    if (!props.linkSlugKey) {
      return `${tableId}-${index + 1}`;
    }
    return slugify(`${tableId}-${R.path(props.linkSlugKey.split("/"), row)}`)!;
  }
  const linkSlugKey = props.linkSlugKey ?? props.columns[props.linkCol as number].key;
  return slugify(`${tableId}-${R.path(linkSlugKey.split("/"), row)}`)!;
}

function renderCellPlaintext(ctx, format, content): string {
  format = format ?? "text";
  if (!content) {
    return "";
  } else if (format === "text") {
    const {ast, frontmatter} = parse(content);
    const mdContent = transform(ast, ctx, frontmatter);
    return renderMdPlaintext(ctx, mdContent)?.trim() ?? "";
  } else if (format === "code") {
    return content;
  } else if (format === "anchor") {
    const target = ctx.resolvePage(content);
    return target.title;
  } else if (format.startsWith("codeblock")) {
    return content + "\n";
  } else {
    throw new Error(`unsupported column format: ${format}`);
  }
}

function renderCell(ctx, format, content) {
  format = format ?? "text";
  if (!content) {
    return "";
  } else if (format === "text") {
    return <Md src={content}/>;
  } else if (format === "code") {
    return <code>{content}</code>;
  } else if (format === "anchor") {
    const target = ctx.resolvePage(content);
    return <a href={target.url}>{target.title}</a>;
  } else if (format.startsWith("codeblock")) {
    const syntax = format.split("-")[1]; // Could be undef. That's ok.
    return <CodeBlock language={syntax} code={content}/>;
  } else {
    throw new Error(`unsupported column format: ${format}`);
  }
}

export function renderPlainText(ctx: RenderContext | undefined, props: DataTableProps): string | undefined {
  if (!ctx) return undefined;
  const {rows} = gatherRows(ctx, props);
  const headerRendered = props.columns.map(col => col.name).join(" ");
  const rowsRendered = rows.map(row =>
    props.columns.map(col => {
      const rowContent = R.path(col.key.split("/"), row);
      const cell = renderCellPlaintext(ctx, col.format, rowContent);
      return cell;
    }).join(" ")
  ).join("\n");
  return `${headerRendered}\n${rowsRendered}`;
};

//todo: split out so we can use for plaintext case
function gatherRows(ctx: RenderContext, props: DataTableProps): {rows: object[], id: string} {
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

  return {rows, id};
}

export default function DataTable(props: DataTableProps) {
  const ctx = useCtx();
  if (!ctx) return null;

  const {rows, id} = gatherRows(ctx, props);

  const rowsIndex: {indexKey: string, id: string}[] = [];
  if (props.rowSortKey && props.linkCol && rows.length >= AUTO_INDEX_THRESHOLD) {
    rows.forEach((row, index) => {
      const sortKey = R.path(props.rowSortKey!.split("/"), row);
      const indexKey = sortKey[0].toUpperCase();
      if (rowsIndex.length == 0 || rowsIndex[rowsIndex.length - 1].indexKey != indexKey) {
        rowsIndex.push({indexKey, id: rowId(id, props, row, index)});
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
                {renderCell(ctx, "text", col.name)}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const slugId = rowId(id, props, row, index);
            return (
              <tr id={slugId}>
                {props.linkCol === true &&
                  <td><Jump id={slugId}/></td>
                }
                {props.columns.map((col, i) => {
                  const rowContent = R.path(col.key.split("/"), row);
                  const cell = renderCell(ctx, col.format, rowContent);
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
