import {Tag, type RenderableTreeNode} from "@markdoc/markdoc";
import {type RenderContext} from "../Ctx/Ctx";
import {type DataTableProps, renderPlaintext as renderDataTablePlaintext} from "../DataTable/DataTable";
import {type StructTableProps, renderPlaintext as renderStructTablePlaintext} from "../StructTable/StructTable";
import {type RelatedHscProps, renderPlaintext as renderRelatedHscPlaintext} from "../RelatedHsc/RelatedHsc";
import {type TagStructProps, renderPlaintext as renderTagStructPlaintext} from "../StructTable/TagStruct";
import {parse, transform, type MdSrc} from "../../markdown/markdown";
import {Lang} from "../../utils/localization";

const padded = (children) => `${children}\n\n`; 
const block = (children) => `${children}\n`;
const margin = (children) => `${children} `;

type Renderer = (children: string, attributes: Record<string, any>, ctx: RenderContext | undefined, lang: Lang) => string | undefined;
const renderers: Record<string, Renderer> = {
  p: padded,
  h1: block,
  h2: block,
  h3: block,
  h4: block,
  h5: block,
  h6: block,
  th: margin,
  td: margin,
  pre: padded,
  tr: block,
  li: (children) => block(children),
  ul: block,
  ol: block,
  //custom tags and nodes
  Heading: block,
  Key: (children, attributes, ctx, lang) => {
    return attributes.input;
  },
  CodeBlock: (children, attributes, ctx, lang) => {
    return block(attributes.code);
  },
  DataTable: (children, attributes, ctx, lang) => {
    return padded(renderDataTablePlaintext(ctx, lang, attributes as DataTableProps));
  },
  RelatedHsc: (children, attributes, ctx, lang) => {
    return padded(renderRelatedHscPlaintext(lang, ctx, attributes as RelatedHscProps));
  },
  StructTable: (children, attributes, ctx, lang) => {
    return padded(renderStructTablePlaintext(lang, ctx, attributes as StructTableProps));
  },
  TagStruct: (children, attributes, ctx, lang) => {
    return padded(renderTagStructPlaintext(lang, ctx, attributes as TagStructProps));
  },
}

function render(node: RenderableTreeNode, ctx: RenderContext | undefined, lang: Lang, depth: number): string {
  if (!node) {
    return "";
  } else if (Tag.isTag(node)) {
    const {name, attributes = {}, children = []} = node;
    const renderer = renderers[name] ?? (children => children);
    return renderer(children.map(c => render(c, ctx, lang, depth + 1)).join(""), attributes, ctx, lang) ?? "";
  } else if (Array.isArray(node)) {
    return node.map(n => render(n, ctx, lang, depth + 1)).join("\n");
  }
  return String(node);
}

export default function renderPlaintext(ctx: RenderContext | undefined, lang: Lang, node?: RenderableTreeNode): string | undefined {
  return node ? render(node, ctx, lang, 0) : undefined;
}

export function renderPlaintextFromSrc(ctx: RenderContext | undefined, lang: Lang, mdSrc: MdSrc): string | undefined {
  if (!mdSrc) return undefined;
  const {frontmatter, ast} = parse(mdSrc);
  const content = transform(ast, ctx, lang, frontmatter);
  return renderPlaintext(ctx, lang, content);
}