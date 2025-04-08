import {RenderContext, useCtx} from "../Ctx/Ctx";
import DataTable, {type DataTableProps, renderPlaintext as renderDataTablePlaintext} from "../DataTable/DataTable";
import {useLocalize} from "../Locale/Locale";
import {Lang, localizer} from "../../utils/localization";

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
  type: {
    en: "Type"
  },
};

export type RelatedHscProps = {
  game: string;
  id?: string;
  tagFilter?: string;
  only?: OnlyType;
  noClear?: boolean;
};

function buildDataTableProps(lang: Lang, ctx: RenderContext, props: RelatedHscProps): DataTableProps {
  let dataPath: string[] = [];
  const localize = localizer(localizations, lang);
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

  const columns: DataTableProps["columns"] = [
    {key: `info/${lang}`, name: localize(columnName)}
  ];
  if (!props.only) {
    columns.push({name: localize("type"), key: "dataPathIndex", values: [localize("function"), localize("global")], format: "indexedValue"});
  }

  return {
    dataPath: dataPath,
    id: props.id ?? "functions-globals",
    linkCol: true,
    linkSlugKey: "slug",
    noClear: props.noClear ?? true,
    rowSortKey: "slug",
    rowFilterKey: props.tagFilter ? "tags" : undefined,
    rowFilterExpr: props.tagFilter,
    columns,
  };
}

export default function RelatedHsc(props: RelatedHscProps) {
  const ctx = useCtx();
  const {lang} = useLocalize();
  if (!ctx) return null;
  return <DataTable {...buildDataTableProps(lang, ctx, props)}/>;
};

export function renderPlaintext(lang: Lang, ctx: RenderContext | undefined, props: RelatedHscProps): string | undefined {
  if (!ctx) return undefined;
  return renderDataTablePlaintext(ctx, lang, buildDataTableProps(lang, ctx, props));
}