import {ComponentChildren} from "preact";
import {MdSrc} from "../../markdown/markdown";
import {RenderContext, useCtx} from "../Ctx/Ctx";
import MetaBox, {MetaboxProps} from "./MetaBox";
import {addBreaks} from "../../utils/strings";
import Wat from "../Wat/Wat";
import getTagSections from "./tag";
import getWorkflowSections from "./workflow";
import {IconName} from "../Icon/names";
import {useLocalize} from "../Locale/Locale";
import {Lang} from "../../utils/localization";

const metaboxStyles: Record<string, Partial<MetaboxProps>> = {
  tool: {
    iconTitle: "Tool",
    class: "content-tool",
  },
  resource: {
    iconTitle: "Resource",
  },
  tag: {
    iconTitle: "Tag",
    class: "content-tag",
  },
  guide: {
    iconTitle: "Guide",
    class: "content-guide",
  }
};

const iconMappings: Record<string, IconName> = {
  stub: "file",
  article: "file-text",
  tool: "tool",
  resource: "file-text",
  tag: "share-2",
  tags: "share-2",
  guide: "book-open",
  scripts: "terminal",
};

export interface InfoBoxProps {
  about?: string;
  img?: string;
  caption?: MdSrc;
  info?: MdSrc;
  children?: ComponentChildren;
}

export default function InfoBox(props: InfoBoxProps) {
  const ctx = useCtx();
  const {lang} = useLocalize();
  if (Object.values(props).filter(v => v).length == 0) {
    return null;
  }
  const metaboxProps = getMetaboxProps(lang, ctx, props);
  return <MetaBox {...metaboxProps}/>;
}

function getMetaboxProps(lang: Lang, ctx: RenderContext | undefined, props: InfoBoxProps): MetaboxProps {
  const [aboutType, aboutArg] = (props.about?.split(":") ?? []) as [string?, string?];
  let metaboxProps: Partial<MetaboxProps> = {
    title: ctx?.pageTitle,
    img: props.img,
    caption: props.caption,
    info: props.info,
    sections: [],
    icon: iconMappings[aboutType ?? "article"],
    ...(aboutType ? metaboxStyles[aboutType] : undefined),
  };
  if (aboutType && aboutArg) {
    if (aboutType == "tag") {
      const [game, tagName] = aboutArg.split("/");
      if (!tagName) throw new Error(`Incorrectly formatted about:tag ${aboutArg}`);
      const tag = ctx?.data?.tags?.[game]?.[tagName];
      if (tag?.id) {
        metaboxProps.title = <>{addBreaks(tagName, <wbr/>)} (<code>{tag.id}</code><Wat idTail="h1/tags" headingId="group-ids"/>)</>;
        metaboxProps.sections!.push(...getTagSections(lang, ctx, tag));
      }
    } else {
      metaboxProps.title = aboutArg;
    }
    if (["tag", "tool", "resource", "tags"].includes(aboutType)) {
      metaboxProps.sections!.push(...getWorkflowSections(lang, ctx, aboutArg));
    }
  }
  if (props.children) {
    metaboxProps.sections!.push({
      body: props.children,
    });
  }
  return metaboxProps;
}
