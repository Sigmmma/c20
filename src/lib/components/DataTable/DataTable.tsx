import {slugify} from "../../utils/strings";
import * as R from "ramda";
import {type RenderContext, useCtx} from "../Ctx/Ctx";
import {Jump} from "../Heading/Heading";
import CodeBlock from "../CodeBlock/CodeBlock";
import renderMdPlaintext from "../Md/plaintext";
import {parse, transform} from "../../markdown/markdown";
import Md from "../Md/Md";
import voll from "voll";
import {Lang} from "../../utils/localization";
import {resolvePageGlobal} from "../../content/pages";

const AUTO_INDEX_THRESHOLD = 100;

export type DataTableProps = {
  dataPath: string | string[];
  id?: string;
  rowSortKey?: string;
  rowSortReverse?: boolean;
  rowFilterKey?: string;
  rowFilterExpr?: string;
  linkCol?: boolean | number;
  noClear?: boolean;
  wrapPre?: boolean;
  linkSlugKey?: string;
  columns: {
    name: string;
    key: string;
    style?: string;
    format?: "text" | "code" | "anchor" | "codeblock" | "pageLinkRaw" | "pageLink" | "indexedValue";
    values?: string[] | Record<string, string>;
  }[]
};

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
        rowsIndex.push({indexKey, id: getRowId(id, props, row, index)});
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

  return (
    <div className={`table-wrapper ${classes.join(" ")}`}>
      {rowsIndex.length > 0 &&
        <nav className="table-nav">
          <div className="table-filter-mountpoint" data-tableid={id}></div>
          <p>
            {R.intersperse(
              " · ",
              rowsIndex.map(firstRow =>
                <a href={`#${firstRow.id}`}>{firstRow.indexKey}</a>
              )
            )}
            {" "}({rows.length} total)
          </p>
        </nav>
      }
      <table id={id} className={classes.join(" ")}>
        <thead>
          <tr>
            {props.linkCol === true &&
              <th><Jump id={id}/></th>
            }
            {props.columns.map((col, i) =>
              <th style={col.style}>
                <Md src={col.name}/>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const slug = getRowSlug(props, row, index);
            const rowId = getRowId(id, props, row, index);
            return (
              <tr id={rowId} data-slug={slug}>
                {props.linkCol === true &&
                  <td><Jump id={rowId}/></td>
                }
                {props.columns.map((col, i) => {
                  const rowContent = R.path(col.key.split("/"), row);
                  const cell = renderCell(ctx, col, rowContent);
                  return (
                    <td style={col.style}>
                      {props.linkCol === i ? <Jump id={rowId}>{cell}</Jump> : cell}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function getRowSlug(props: DataTableProps, row: object, index: number): string {
  if (props.linkCol === undefined) {
    return `${index + 1}`;
  } else if (props.linkCol === true) {
    if (!props.linkSlugKey) {
      return `${index + 1}`;
    }
    return `${R.path(props.linkSlugKey.split("/"), row)}`;
  }
  const linkSlugKey = props.linkSlugKey ?? props.columns[props.linkCol as number].key;
  return `${R.path(linkSlugKey.split("/"), row)}`;
}

function getRowId(tableId: string, props: DataTableProps, row: object, index: number): string {
  return slugify(`${tableId}-${getRowSlug(props, row, index)}`)!;
}

function renderCellPlaintext(ctx: RenderContext, lang: Lang, col, content): string {
  const format = col.format ?? "text";
  if (content === undefined || content === null) {
    return "";
  } else if (format === "text") {
    const {ast, frontmatter} = parse(content);
    const mdContent = transform(ast, ctx, lang, frontmatter);
    return renderMdPlaintext(ctx, lang, mdContent)?.trim() ?? "";
  } else if (format == "indexedValue") {
    return col.values?.[content] ?? "";
  } else if (format === "code") {
    return content;
  } else if (format === "anchor" || format === "pageLink") {
    return resolvePageGlobal(ctx.pageIndex, ctx.pageId, content)?.title ?? content;
  } else if (format == "pageLinkRaw") {
    return content;
  } else if (format.startsWith("codeblock")) {
    return content + "\n";
  } else {
    throw new Error(`unsupported column format: ${format}`);
  }
}

function renderCell(ctx, col, content) {
  const format = col.format ?? "text";
  if (content === undefined || content === null) {
    return "";
  } else if (format === "text") {
    return <Md src={content}/>;
  } else if (format === "indexedValue") {
    return col.values?.[content] ?? "";
  } else if (format === "code") {
    return <code>{content}</code>;
  } else if (format === "anchor" || format === "pageLink") {
    const target = resolvePageGlobal(ctx.pageIndex, ctx.pageId, content);
    return target ? <a href={target.url}>{target.title}</a> : content;
  } else if (format == "pageLinkRaw") {
    const target = resolvePageGlobal(ctx.pageIndex, ctx.pageId, content);
    return target ? <a href={target.url}>{content}</a> : content;
  } else if (format.startsWith("codeblock")) {
    const syntax = format.split("-")[1]; // Could be undef. That's ok.
    return <CodeBlock language={syntax} code={content}/>;
  } else {
    throw new Error(`unsupported column format: ${format}`);
  }
}

export function renderPlaintext(ctx: RenderContext | undefined, lang: Lang, props: DataTableProps): string | undefined {
  if (!ctx) return undefined;
  const {rows} = gatherRows(ctx, props);
  const headerRendered = props.columns.map(col => col.name).join(" ");
  const rowsRendered = rows.map(row =>
    props.columns.map(col => {
      const rowContent = R.path(col.key.split("/"), row);
      const cell = renderCellPlaintext(ctx, lang, col, rowContent);
      return cell;
    }).join(" ")
  ).join("\n");
  return `${headerRendered}\n${rowsRendered}`;
}

function gatherRows(ctx: RenderContext, props: DataTableProps): {rows: object[], id: string} {
  const dataPaths = (props.dataPath ?
      (Array.isArray(props.dataPath) ?
          props.dataPath :
          [props.dataPath]
      ) :
      []
  ).map(dataPath => dataPath.split("/"));
  const id = props.id ?? dataPaths.map(R.last).join("-");

  const filterTest = props.rowFilterExpr ? voll(props.rowFilterExpr) : undefined;

  const rows = R.pipe(
    R.map(dataPath => [dataPaths.indexOf(dataPath), R.pathOr([], dataPath, ctx.data)]),
    R.map(([dataPathIndex, rows]) => Array.isArray(rows) ?
      rows.map(r => ({...r, dataPathIndex})) :
      Object.entries(rows).map(([key, value]) => ({dataPathIndex, key, value}))
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
    props.rowFilterKey ?
      R.filter(row => {
        let value = R.path(props.rowFilterKey!.split("/"), row);
        if (!value) {
          value = "";
        } else if (Array.isArray(value)) {
          value = value.filter(v => v).join(" ");
        } else if (typeof(value) == "object") {
          value = Object.entries(value)
            .filter(([k, v]) => v)
            .map(([k, v]) => k)
            .join(" ");
        } else if (typeof(value) != "string") {
          value = String(value);
        }
        return filterTest ? filterTest(value) : (value != "");
      }) :
      R.identity
  )(dataPaths);

  return {rows, id};
}
