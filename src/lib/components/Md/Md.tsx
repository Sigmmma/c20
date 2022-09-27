import {createElement, Fragment} from "preact";
import Markdoc from "@markdoc/markdoc";
import Alert from "../Alert/Alert";
import {parseMdDoc} from "../../markdown/markdown";

//preact works as a ReactShape
const react = {createElement, Fragment} as any;
// These are the components needed by tags for rendering
const components = {
  Alert,
};

export type MdProps = {
  src?: string;
};

export default function Md(props: MdProps) {
  if (!props.src) return null;
  const {content, frontmatter} = parseMdDoc(props.src);
  const node = Markdoc.renderers.react(content, react, {
    components
  });
  return node; 
};