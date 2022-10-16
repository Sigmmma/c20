import {RenderContext, useCtx} from "../Ctx/Ctx";
import DataTable, {type DataTableProps, renderPlaintext as renderDataTablePlaintext} from "./DataTable";

export const onlyTypes = ["globals", "functions"] as const;
export type OnlyType = (typeof onlyTypes)[number];

const localizations = {
  global: {
    en: "Global"
  },
  function: {
    en: "Function"
  },
  both: {
    en: "Function/global"
  },
};

export type RelatedHscProps = {
  game: string;
  id?: string;
  tagFilter: string;
  only?: OnlyType;
};

function buildDataTableProps(ctx: RenderContext, props: RelatedHscProps): DataTableProps {
  let dataPath: string[] = [];
  let columnName: keyof typeof localizations = "both";
  if (props.only !== "globals") {
    dataPath.push(`hsc/${props.game}/functions/functions`);
  } else {
    columnName = "global";
  }
  if (props.only !== "functions") {
    dataPath.push(`hsc/${props.game}/globals/external_globals`);
  } else {
    columnName = "function";
  }

  return {
    dataPath: dataPath,
    id: props.id,
    linkCol: true,
    linkSlugKey: "slug",
    noClear: true,
    rowSortKey: "slug",
    rowFilterKey: "tags",
    rowFilterValue: props.tagFilter,
    columns: [
      {key: `info/${ctx?.lang ?? "en"}`, name: localizations[columnName][ctx.lang]}
    ]
  };
}

export default function RelatedHsc(props: RelatedHscProps) {
  const ctx = useCtx();
  if (!ctx) return null;
  return <DataTable {...buildDataTableProps(ctx, props)}/>;
};

export function renderPlaintext(ctx: RenderContext | undefined, props: RelatedHscProps): string | undefined {
  if (!ctx) return undefined;
  return renderDataTablePlaintext(ctx, buildDataTableProps(ctx, props));
}