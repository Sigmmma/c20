import { ComponentChild } from "preact";
import {type RenderContext} from "../../components/Ctx/Ctx";
import DetailsList from "../../components/DetailsList/DetailsList";
import {type MetaboxSectionProps} from "../../components/Metabox/Metabox";
import {localizer} from "../../utils/localization";

const localizations = {
  tagStructureHeading: {
    en: "Structure and fields",
    es: "Estructura y campos"
  },
  parentTag: {
    en: "Parent tag",
    es: "Tag principal"
  },
  referencedBy: {
    en: "Referenced by",
    es: "Referenciado por",
  },
  childTags: {
    en: "Child tags",
    es: "Tags secundarias"
  },
  directReferences: {
    en: "Direct references",
    es: "Referencias directas"
  },
  inheritedReferences: {
    en: (parent) => <>{parent} references</>,
    es: (parent) => <>Referencias de {parent}</>
  },
  inheritInfo: {
    en: (thisTag, parentTag) => <>This tag inherits fields from {parentTag} which
      are not shown here. See the parent's page for more information.
      The following information is unique to the <strong>{thisTag}</strong> tag.</>,
    es: (thisTag, parentTag) => <>Esta tag hereda campos de ${parentTag} que
       no se muestran aquí. Consulte la página de los padres para obtener más información.
       La siguiente información es exclusiva de la tag <strong>{thisTag}</strong>.</>,
  },
};

const tagAnchor = (ctx: RenderContext, tagName: string) => {
  const tagPage = ctx.resolvePage(tagName);
  return <a href={tagPage.url}>{tagName}</a>;
};

export default function getTagSections(ctx: RenderContext | undefined, tag: any): MetaboxSectionProps[] {
  if (!tag || !ctx) {
    return [];
  }

  const localize = localizer(localizations, ctx.lang);
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
