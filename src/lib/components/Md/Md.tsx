import {createElement, Fragment, VNode} from "preact";
import Markdoc, {type RenderableTreeNodes, type RenderableTreeNode} from "@markdoc/markdoc";
import {parse, transform, type MdSrc} from "../../markdown/markdown";
import {useCtx} from "../Ctx/Ctx";
import {components} from "./components";
import {useLocalize} from "../Locale/Locale";

//preact works as a ReactShape
const react = {createElement, Fragment} as any;

export type MdProps = {
  src?: MdSrc;
  content?: RenderableTreeNode;
  inline?: boolean;
};

function unwrapParagraph(nodes: RenderableTreeNode[], inline?: boolean): RenderableTreeNodes {
  if (nodes.length == 1 && inline) {
    const node = nodes[0];
    return (!node || typeof(node) == "string") ? node : node.children ?? null;
  }
  return nodes;
}

export default function Md(props: MdProps) {
  if (!props.src && !props.content) return null;
  const ctx = useCtx();
  const {lang} = useLocalize();
  let content = props.content;
  if (!content && props.src) {
    const {ast, frontmatter} = parse(props.src);
    content = transform(ast, ctx, lang, frontmatter);
  }
  const contentToRender = (!content || typeof(content) == "string") ?
    content :
    unwrapParagraph(content.children, props.inline); //skip <article>

  return Markdoc.renderers.react(contentToRender ?? null, react, {
    components
  }) as VNode;
};
