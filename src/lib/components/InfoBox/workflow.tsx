import * as R from "ramda";
import {RenderContext} from "../Ctx/Ctx";
import DetailsList from "../DetailsList/DetailsList";
import {MetaboxSectionProps} from "./MetaBox";
import Wat from "../Wat/Wat";
import {Lang, localizer} from "../../utils/localization";
import {addBreaks} from "../../utils/strings";
import {resolvePageGlobal} from "../../content/pages";

const localizations = {
  authors: {
    en: "Author(s)",
  },
  similar: {
    en: "Similar to",
  },
  tool: {
    en: "Tool",
  },
  resource: {
    en: "Resource",
  },
  workflows: {
    en: "Workflows",
  },
  deprecatedWorkflows: {
    en: "Deprecated workflows",
  },
  edit: {
    en: "Edit",
  },
  editWith: {
    en: "Edit with",
  },
  diff: {
    en: "Compare",
  },
  diffWith: {
    en: "Compare with",
  },
  buildTypes: {
    en: "Published build type(s)",
  },
  bidiUsingThis: {
    en: (item) => <>{item} to/from</>,
  },
  bidiOfThis: {
    en: (other) => <>To/from {other} with</>,
  },
  flowTo: {
    en: (other) => <>To {other} with</>,
  },
  flowFrom: {
    en: (other) => <>From {other} with</>,
  },
  flowUsing: {
    en: (other) => <>{other} to</>,
  }
};

const workflowItemAnchor = (ctx, itemName) => {
  const item = ctx.data.workflows.getWorkflowItem(itemName);
  itemName = addBreaks(itemName, <wbr/>);
  if (item.url) {
    return <a href={item.url}>{itemName}</a>;
  }
  const target = resolvePageGlobal(ctx.pageIndex, ctx.pageId, item.page, item.heading);
  return target ? <a href={target.url}>{itemName}</a> : itemName;
};

function workflowType(flow) {
  if (flow.edit) {
    return "edit";
  } else if (flow.editWith) {
    return "editWith";
  } else if (flow.diff) {
    return "diff";
  } else if (flow.diffWith) {
    return "diffWith";
  } else if (flow.bidi && flow.via) {
    return "bidiToFrom";
  } else if (flow.bidi && flow.from && flow.to) {
    return "bidiVia";
  } else if (flow.from && flow.to) {
    return "convertVia";
  } else if (flow.from && flow.via) {
    return "convertDst";
  } else if (flow.to && flow.via) {
    return "convertSrc"
  }
  throw new Error(`Could not categorize workflow: ${JSON.stringify(flow)}`);
}

const workflowsList = (ctx, localize, item) => {
  const itemAnchor = (itemName) => workflowItemAnchor(ctx, itemName);
  const {workflows, deprecated} = item;

  const flowTypeRenderers = {
    edit: (flows) => {
      return [<DetailsList summary={localize("edit")} items={flows.map(f => itemAnchor(f.edit))}/>];
    },
    editWith: (flows) => {
      return [<DetailsList summary={localize("editWith")} items={flows.map(f => itemAnchor(f.editWith))}/>];
    },
    diff: (flows) => {
      return [<DetailsList summary={localize("diff")} items={flows.map(f => itemAnchor(f.diff))}/>];
    },
    diffWith: (flows) => {
      return [<DetailsList summary={localize("diffWith")} items={flows.map(f => itemAnchor(f.diffWith))}/>];
    },
    bidiToFrom: R.pipe(
      R.groupBy(flow => flow.to || flow.from),
      R.map(flows => {
        const other = itemAnchor(flows[0].to || flows[0].from);
        return <DetailsList summary={localize("bidiOfThis")(other)} items={flows.map(f => itemAnchor(f.via))}/>;
      }),
      R.values
    ),
    bidiVia: R.pipe(
      R.groupBy(R.prop("from")),
      R.map(flows => {
        const other = itemAnchor(flows[0].from);
        return <DetailsList summary={localize("bidiUsingThis")(other)} items={flows.map(f => itemAnchor(f.to))}/>;
      }),
      R.values
    ),
    convertVia: R.pipe(
      R.groupBy(R.prop("from")),
      R.map(flows => {
        const other = itemAnchor(flows[0].from);
        return <DetailsList summary={localize("flowUsing")(other)} items={flows.map(f => itemAnchor(f.to))}/>;
      }),
      R.values
    ),
    convertDst: R.pipe(
      R.groupBy(R.prop("from")),
      R.map(flows => {
        const other = itemAnchor(flows[0].from);
        return <DetailsList summary={localize("flowFrom")(other)} items={flows.map(f => itemAnchor(f.via))}/>;
      }),
      R.values
    ),
    convertSrc: R.pipe(
      R.groupBy(R.prop("to")),
      R.map(flows => {
        const other = itemAnchor(flows[0].to);
        return <DetailsList summary={localize("flowTo")(other)} items={flows.map(f => itemAnchor(f.via))}/>;
      }),
      R.values
    ),
  };

  const renderedFlows = R.pipe(
    R.groupBy(workflowType),
    R.evolve(flowTypeRenderers),
    R.values(),
    R.flatten(),
  )(workflows);

  return (
    <p>
      <DetailsList
        summary={localize(deprecated ? "deprecatedWorkflows" : "workflows")}
        items={renderedFlows}
      />
    </p>
  );
};

export default function getWorkflowSections(lang: Lang, ctx: RenderContext | undefined, itemName: string): MetaboxSectionProps[] {
  const localize = localizer(localizations, lang);
  const item = ctx?.data?.workflows?.getWorkflowItem(itemName);
  const sections: MetaboxSectionProps[] = [];

  if (item?.authors && item.authors.length > 0) {
    sections.push({body:
      <p>
        <DetailsList
          summary={localize("authors")}
          items={item.authors}
        />
      </p>
    });
  }  
  if (item?.buildTypes && item.buildTypes.length > 0) {
    sections.push({body:
      <p>
        <DetailsList
          summary={<>{localize("buildTypes")}<Wat idTail="blam" headingId="build-types"/></>}
          items={item.buildTypes}
        />
      </p>
    });
  }
  if (item?.similarTo && item.similarTo.length > 0) {
    sections.push({body:
      <p>
        <DetailsList
          summary={localize("similar")}
          items={item.similarTo.map(otherItemName =>
            <a>{workflowItemAnchor(ctx, otherItemName)}</a>
          )}
        />
      </p>
    });
  }
  if (item.workflows && item.workflows.length > 0) {
    sections.push({class: "content-tool-minor", body:
      workflowsList(ctx, localize, item)
    });
  }

  return sections;
};