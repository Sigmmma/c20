import {createElement, Fragment, VNode} from "preact";
import Markdoc, {type RenderableTreeNode} from "@markdoc/markdoc";
import {parse, transform, type MdSrc} from "./markdown";
import {useCtx} from "../Ctx/Ctx";
import {components} from "./components";

//preact works as a ReactShape
const react = {createElement, Fragment} as any;

export type MdProps = {
  src?: MdSrc;
  content?: RenderableTreeNode;
};

export default function Md(props: MdProps) {
  if (!props.src && !props.content) return null;
  const ctx = useCtx();
  let content = props.content;
  if (!content && props.src) {
    const {ast, frontmatter} = parse(props.src);
    content = transform(ast, ctx, frontmatter);
  }
  return Markdoc.renderers.react(content ?? null, react, {
    components
  }) as VNode;
};