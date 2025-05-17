import {createElement, Fragment, VNode} from "preact";
import Markdoc, {RenderableTreeNodes, RenderableTreeNode} from "@markdoc/markdoc";
import {parse, transform, MdSrc} from "../../markdown/markdown";
import {useCtx} from "../Ctx/Ctx";
import {useLocalize} from "../Locale/Locale";

import Alert from "../Alert/Alert";
import Heading from "../Heading/Heading";
import CodeBlock from "../CodeBlock/CodeBlock";
import DataTable from "../DataTable/DataTable";
import StructTable from "../StructTable/StructTable";
import Figure from "../Figure/Figure";
import Key from "../Key/Key";
import RelatedHsc from "../RelatedHsc/RelatedHsc";
import TagStruct from "../StructTable/TagStruct";
import {UnitConverterMountpoint} from "../UnitConverter/UnitConverter";
import Color from "../Color/Color";
import ChildList from "../ChildList/ChildList";
import Tabs from "../Tabs/Tabs";
import InfoBox from "../InfoBox/InfoBox";

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

  const components = {
    Alert,
    Heading,
    CodeBlock,
    DataTable,
    StructTable,
    Figure,
    Key,
    RelatedHsc,
    TagStruct,
    UnitConverterMountpoint,
    Color,
    ChildList,
    Tabs,
    InfoBox,
    Hidden: () => null,
  };

  if (Object.values(components).some(it => it === undefined)) {
    console.error(components);
    throw new Error("Component imports are broken! There's an import order problem somewhere.");
  }

  return Markdoc.renderers.react(contentToRender ?? null, react, {
    components
  }) as VNode;
};
