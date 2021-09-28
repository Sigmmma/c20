const R = require("ramda");
const {localizer, anchor, detailsList, ul, icon, p} = require("../components");

const localizations = localizer({
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
  buildTypes: {
    en: "Published build type(s)",
    es: "Tipo(s) de compilación publicados"
  },
  bidiUsingThis: {
    en: (item) => `${item} to/from`,
    es: (item) => `${item} a/de`
  },
  bidiOfThis: {
    en: (other) => `To/from&nbsp;${other} with`,
    es: (other) => `A/de&nbsp;${other} con`
  },
  flowTo: {
    en: (other) => `To&nbsp;${other} with`,
    es: (other) => `A&nbsp;${other} con`
  },
  flowFrom: {
    en: (other) => `From&nbsp;${other} with`,
    es: (other) => `De&nbsp;${other} con`
  },
  flowUsing: {
    en: (other) => `${other}&nbsp;to`,
    es: (other) => `${other}&nbsp;a`,
  }
});

const workflowItemAnchor = (ctx, itemName) => {
  const item = ctx.data.workflows.getWorkflowItem(itemName);
  const itemUrl = item.url || ctx.resolveUrl(item.page, item.heading);
  return anchor(itemUrl, itemName);
};

function workflowType(flow) {
  if (flow.edit) {
    return "edit";
  } else if (flow.editWith) {
    return "editWith";
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

const workflowsList = (ctx, item) => {
  const itemAnchor = (itemName) => workflowItemAnchor(ctx, itemName);
  const {workflows, deprecated} = item;
  const localize = localizations(ctx.lang);

  const flowTypeRenderers = {
    edit: (flows) => {
      return [detailsList(localize("edit"), flows.map(f => itemAnchor(f.edit)))];
    },
    editWith: (flows) => {
      return [detailsList(localize("editWith"), flows.map(f => itemAnchor(f.editWith)))];
    },
    bidiToFrom: R.pipe(
      R.groupBy(flow => flow.to || flow.from),
      R.map(flows => {
        const other = itemAnchor(flows[0].to || flows[0].from);
        return detailsList(localize("bidiOfThis")(other), flows.map(f => itemAnchor(f.via)));
      }),
      R.values
    ),
    bidiVia: R.pipe(
      R.groupBy(R.prop("from")),
      R.map(flows => {
        const other = itemAnchor(flows[0].from);
        return detailsList(localize("bidiUsingThis")(other), flows.map(f => itemAnchor(f.to)));
      }),
      R.values
    ),
    convertVia: R.pipe(
      R.groupBy(R.prop("from")),
      R.map(flows => {
        const other = itemAnchor(flows[0].from);
        return detailsList(localize("flowUsing")(other), flows.map(f => itemAnchor(f.to)));
      }),
      R.values
    ),
    convertDst: R.pipe(
      R.groupBy(R.prop("from")),
      R.map(flows => {
        const other = itemAnchor(flows[0].from);
        return detailsList(localize("flowFrom")(other), flows.map(f => itemAnchor(f.via)));
      }),
      R.values
    ),
    convertSrc: R.pipe(
      R.groupBy(R.prop("to")),
      R.map(flows => {
        const other = itemAnchor(flows[0].to);
        return detailsList(localize("flowTo")(other), flows.map(f => itemAnchor(f.via)));
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

  return p(detailsList(localize(deprecated ? "deprecatedWorkflows" : "workflows"), renderedFlows));
};

module.exports = async function(ctx) {
  const {page} = ctx;

  const localize = localizations(ctx.lang);
  let workflowItemName = page.workflowName || page.toolName || page.tagName;
  if (!workflowItemName) {
    return {};
  }

  const defaultMetaTitle = page.tryLocalizedTitle(ctx.lang);
  const metaSections = [];
  const item = ctx.data.workflows.getWorkflowItem(workflowItemName);

  if (item.authors && item.authors.length > 0) {
    metaSections.push({
      body: p(detailsList(localize("authors"), item.authors))
    });
  }
  if (item.buildTypes && item.buildTypes.length > 0) {
    metaSections.push({
      body: p(detailsList(anchor(ctx.resolveUrl("build-types", "conventions"), localize("buildTypes")), item.buildTypes))
    });
  }
  if (item.similarTo && item.similarTo.length > 0) {
    metaSections.push({
      body: p(detailsList(localize("similar"), item.similarTo.map(itemName => {
        return workflowItemAnchor(ctx, itemName);
      })))
    });
  }
  if (item.workflows && item.workflows.length > 0) {
    metaSections.push({
      cssClass: "content-tool-minor",
      body: workflowsList(ctx, item)
    });
  }

  return {
    metaSections,
    metaTitle: page.toolName ?
      `${icon("tool", localize("tool"))} ${page.toolName}` :
      `${icon("file", localize("resource"))} ${defaultMetaTitle}`,
    metaClass: page.toolName ? "content-tool" : undefined,
  };
};
