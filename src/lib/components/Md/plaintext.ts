import {type RenderableTreeNode} from "@markdoc/markdoc";
import {type RenderContext} from "../Ctx/Ctx";
import {type DataTableProps, renderPlainText as renderDataTablePlaintext} from "../DataTable/DataTable";
import {type StructTableProps, renderPlainText as renderStructTablePlaintext} from "../StructTable/StructTable";
import {parse, transform, type MdSrc} from "./markdown";

const padded = (children) => `${children}\n\n`; 
const block = (children) => `${children}\n`;

type Renderer = (children: string, attributes: Record<string, any>, ctx: RenderContext | undefined) => string | undefined;
const renderers: Record<string, Renderer> = {
  p: padded,
  h1: block,
  h2: block,
  h3: block,
  h4: block,
  h5: block,
  h6: block,
  pre: padded,
  li: (children) => block(children),
  ul: block,
  ol: block,
  //custom tags and nodes
  Heading: block,
  ThanksIndex: (children, attributes, ctx) => {
    return ctx ? padded(ctx.allThanks?.join("\n")) : undefined;
  },
  CodeBlock: (children, attributes, ctx) => {
    return block(attributes.code);
  },
  DataTable: (children, attributes, ctx) => {
    return padded(renderDataTablePlaintext(ctx, attributes as DataTableProps));
  },
  StructTable: (children, attributes, ctx) => {
    return padded(renderStructTablePlaintext(ctx, attributes as StructTableProps));
  },
};

function render(node: RenderableTreeNode, ctx: RenderContext | undefined, depth: number): string {
  if (!node) {
    return "";
  } else if (typeof node == "object") {
    const {name, attributes = {}, children = []} = node;
    // console.log("  ".repeat(depth) + name);
    const renderer = renderers[name] ?? (children => children);
    return renderer(children.map(c => render(c, ctx, depth + 1)).join(""), attributes, ctx) ?? "";
  } else if (Array.isArray(node)) {
    return node.map(n => render(n, ctx, depth + 1)).join("\n");
  }
  return node;
}

export default function renderPlaintext(ctx: RenderContext | undefined, node?: RenderableTreeNode): string | undefined {
  return node ? render(node, ctx, 0) : undefined;
};

export function renderPlaintextFromSrc(ctx: RenderContext | undefined, mdSrc: MdSrc): string | undefined {
  if (!mdSrc) return undefined;
  const {frontmatter, ast} = parse(mdSrc);
  const content = transform(ast, ctx, frontmatter);
  return renderPlaintext(ctx, content);
};