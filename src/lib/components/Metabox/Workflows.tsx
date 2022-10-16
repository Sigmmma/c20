import * as R from "ramda";
import {useCtx, useLocalize} from "../Ctx/Ctx";
import DetailsList from "../DetailsList/DetailsList";
import Wat from "../Wat/Wat";

const localizations = {
  authors: {
    en: "Author(s)",
    es: "Autores/Autoras"
  },
  similar: {
    en: "Similar to",
    es: "Similar a"
  },
  tool: {
    en: "Tool",
    es: "Herramienta"
  },
  resource: {
    en: "Resource",
    es: "Recurso"
  },
  workflows: {
    en: "Workflows",
    es: "Flujos de trabajo"
  },
  deprecatedWorkflows: {
    en: "Deprecated workflows",
    es: "Flujos de trabajo obsoletos"
  },
  edit: {
    en: "Edit",
    es: "Editar"
  },
  editWith: {
    en: "Edit with",
    es: "Editar con"
  },
  diff: {
    en: "Compare",
  },
  diffWith: {
    en: "Compare with",
  },
  buildTypes: {
    en: "Published build type(s)",
    es: "Tipo(s) de compilación publicados"
  },
  bidiUsingThis: {
    en: (item) => <>{item} to/from</>,
    es: (item) => <>{item} a/de</>,
  },
  bidiOfThis: {
    en: (other) => <>To/from {other} with</>,
    es: (other) => <>A/de {other} con</>,
  },
  flowTo: {
    en: (other) => <>To {other} with</>,
    es: (other) => <>A {other} con</>,
  },
  flowFrom: {
    en: (other) => <>From {other} with</>,
    es: (other) => <>De {other} con</>,
  },
  flowUsing: {
    en: (other) => <>{other} to</>,
    es: (other) => <>{other} a</>,
  }
};

const workflowItemAnchor = (ctx, itemName) => {
  const item = ctx.data.workflows.getWorkflowItem(itemName, ctx);
  if (item.url) {
    return <a href={item.url}>{itemName}</a>;
  }
  const target = ctx.resolvePage(item.page, item.heading);
  return <a href={target.url}>{target.title}</a>;
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

export type WorkflowsProps = {
  itemName: string;
};

export default function Workflows(props: WorkflowsProps) {  
  const ctx = useCtx();
  const localize = useLocalize(localizations);
  const item = ctx?.data?.workflows?.getWorkflowItem(props.itemName);
  if (!item) return null;
  
  return <>
    {item.authors && item.authors.length > 0 &&
      <section>
        <p>
          <DetailsList
            summary={localize("authors")}
            items={item.authors}
          />
        </p>
      </section>
    }  
    {item.buildTypes && item.buildTypes.length > 0 &&
      <section>
        <p>
          <DetailsList
            summary={<>{localize("buildTypes")}<Wat href={ctx?.resolvePage("build-types", "conventions").url}/></>}
            items={item.buildTypes}
          />
        </p>
      </section>
    }
    {item.similarTo && item.similarTo.length > 0 &&
      <section>
        <p>
          <DetailsList
            summary={localize("similar")}
            items={item.similarTo.map(otherItemName =>
              <a>{workflowItemAnchor(ctx, otherItemName)}</a>
            )}
          />
        </p>
      </section>
    }
    {item.workflows && item.workflows.length > 0 &&
      <section className="content-tool-minor">
        {workflowsList(ctx, localize, item)}
      </section>
    }
  </>;
};