import {ComponentChild} from "preact";
import {RenderContext} from "../Ctx/Ctx";
import DetailsList from "../DetailsList/DetailsList";
import {MetaboxSectionProps} from "./MetaBox";
import {Lang, localizer} from "../../utils/localization";
import {addBreaks} from "../../utils/strings";

const localizations = {
  tagStructureHeading: {
    en: "Structure and fields",
  },
  parentTag: {
    en: "Parent tag",
  },
  referencedBy: {
    en: "Referenced by",
  },
  childTags: {
    en: "Child tags",
  },
  directReferences: {
    en: "Direct references",
  },
  inheritedReferences: {
    en: (parent) => <>{parent} references</>,
  },
  inheritInfo: {
    en: (thisTag, parentTag) => <>This tag inherits fields from {parentTag} which
      are not shown here. See the parent's page for more information.
      The following information is unique to the <strong>{thisTag}</strong> tag.</>,
  },
};

const tagAnchor = (ctx: RenderContext, tagName: string) => {
  const tagPage = ctx.resolvePage(tagName);
  return <a href={tagPage.url}>{addBreaks(tagName, <wbr/>)}</a>;
};

export default function getTagSections(lang: Lang, ctx: RenderContext | undefined, tag: any): MetaboxSectionProps[] {
  if (!tag || !ctx) {
    return [];
  }

  const localize = localizer(localizations, lang);
  const sections: MetaboxSectionProps[] = [];

  if (tag.parent) {
    sections.push({
      class: "content-tag-minor",
      body: <p>{localize("parentTag")}: {tagAnchor(ctx, tag.parent.name)}</p>
    });
  }

  if (tag.children && tag.children.length > 0) {
    sections.push({
      class: "content-tag-minor",
      body:
        <p>
          <DetailsList summary={localize("childTags")} items={tag.children.map(childTag => tagAnchor(ctx, childTag.name))}/>
        </p>
    });
  }

  let refLevel = tag;
  const referencesSubSections: ComponentChild[] = [];
  while (refLevel) {
    if (refLevel.references && refLevel.references.length > 0) {
      const summary = refLevel.name == tag.name ?
        localize("directReferences") :
        localize("inheritedReferences")(tagAnchor(ctx, refLevel.name));
      const items = refLevel.references.map(otherTag => tagAnchor(ctx, otherTag.name));
      const maxOpen = refLevel.name == tag.name ? undefined : 0;
      referencesSubSections.push(<DetailsList summary={summary} items={items} maxOpen={maxOpen}/>);
    }
    refLevel = refLevel.parent;
  }
  if (referencesSubSections.length > 0) {
    sections.push({
      class: "content-tag-minor",
      body: <p>{referencesSubSections}</p>
    });
  }

  if (tag.referencedBy && tag.referencedBy.length > 0) {
    sections.push({
      class: "content-tag-minor",
      body:
        <p>
          <DetailsList
            summary={localize("referencedBy")}
            items={tag.referencedBy.map(otherTag => tagAnchor(ctx, otherTag.name))}
            maxOpen={1}
          />
        </p>
    });
  }

  return sections;
};
