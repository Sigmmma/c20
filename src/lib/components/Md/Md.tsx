import {createElement, Fragment, VNode} from "preact";
import Markdoc, { RenderableTreeNode } from "@markdoc/markdoc";
import {parseMdDoc, ValidationError} from "../../markdown/markdown";
import type {MdSrc} from "..";
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
  if (!content) {
    try {
      content = parseMdDoc(props.src).content;
    } catch (e) {
      if (ctx?.devMode && e instanceof ValidationError) {
        console.warn(e.errors);
        return <p style="color:red">The markdown is invalid</p>;
      } else {
        throw e;
      }
    }
  }
  return Markdoc.renderers.react(content, react, {
    components
  }) as VNode;
};