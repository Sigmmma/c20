import {type RenderContext, useCtx} from "../Ctx/Ctx";
import {type FoundHeading} from "../Md/headings";
import StructTable, {type StructTableProps, renderPlaintext as renderStructTablePlaintext, headings as structTableHeadings} from "./StructTable";
import {Lang} from "../../utils/localization";

export type TagStructProps = {
  tag: string;
};

function buildTableProps(tag): StructTableProps {
  return {
    entryModule: tag.structModule,
    entryType: tag.structName,
    noRootComments: true,
    skipPadding: true,
    simpleTypes: true,
    noEmbed: ["TagDependency", "ColorRGB", "ColorARGB", "TagString", "Point3D", "Vector3D", "Vector2D", "Quaternion"],
    id: "tag-field",
    noRootExtend: true,
  };
}

export default function TagStruct(props: TagStructProps) {
  const ctx = useCtx();
  const [game, tagName] = props.tag.split("/");
  const tag = ctx?.data?.tags?.[game]?.[tagName];
  return tag ? (
    <StructTable
      {...buildTableProps(tag)}
    />
  ) : null;
};

export function renderPlaintext(lang: Lang, ctx: RenderContext | undefined, props: TagStructProps): string | undefined {
  const [game, tagName] = props.tag.split("/");
  const tag = ctx?.data?.tags?.[game]?.[tagName];
  if (!tag) return undefined;
  return renderStructTablePlaintext(lang, ctx, buildTableProps(tag));
}

export function headings(ctx: RenderContext | undefined, props: TagStructProps): FoundHeading[] {
  const [game, tagName] = props.tag.split("/");
  const tag = ctx?.data?.tags?.[game]?.[tagName];
  if (!tag) return [];
  return structTableHeadings(ctx, buildTableProps(tag));
}