import {type RenderableTreeNode} from "@markdoc/markdoc";
import {type RenderContext} from "../Ctx/Ctx";
import {headings as tagStructHeadings, TagStructProps} from "../StructTable/TagStruct";
import {headings as structTableHeadings, StructTableProps} from "../StructTable/StructTable";

export type FoundHeading = {
  level: number;
  title: string;
  id: string;
};

const heading = (level) => {
  return (children, attributes, results, ctx) => {
    results.push({
      level,
      id: attributes.id,
      title: attributes.plaintext
    });
  };
};

type Finder = (children: RenderableTreeNode[], attributes: Record<string, any>, results: FoundHeading[], ctx: RenderContext) => void;
const finders: Record<string, Finder> = {
  h1: heading(1),
  h2: heading(2),
  h3: heading(3),
  h4: heading(4),
  h5: heading(5),
  h6: heading(6),
  //custom tags
  StructTable: (children, attributes, results, ctx) => {
    results.push(...structTableHeadings(ctx, attributes as StructTableProps));
  },
  TagStruct: (children, attributes, results, ctx) => {
    results.push(...tagStructHeadings(ctx, attributes as TagStructProps));
  },
  Heading: (children, attributes, results, ctx) => {
    results.push({
      //these attributes were already populated during the transform step
      level: attributes.level,
      id: attributes.id,
      title: attributes.plaintext
    });
  },
};

export default function findHeadings(ctx: RenderContext, node?: RenderableTreeNode): FoundHeading[] {
  const results: FoundHeading[] = [];
  if (node) find(node, ctx, results);
  return results;
};

function find(node: RenderableTreeNode, ctx: RenderContext, results: FoundHeading[]) {
  if (!node) {
    return;
  } else if (typeof node == "object") {
    const {name, attributes = {}, children = []} = node;
    const finder = finders[name];
    if (finder) finder(children, attributes, results, ctx);
    children.forEach(c => find(c, ctx, results));
  } else if (Array.isArray(node)) {
    node.forEach(n => find(n, ctx, results));
  }
}