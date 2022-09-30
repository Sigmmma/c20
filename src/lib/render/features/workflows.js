import * as R from "ramda";
const {anchor, detailsList, icon, p} = require("../../components");
import {localizer} from "../../utils/localization";

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
};

const workflowItemAnchor = (ctx, itemName) => {
  const item = ctx.data.workflows.getWorkflowItem(itemName, ctx);
  if (item.url) {
    return anchor(item.url, itemName);
  }
  const target = ctx.resolvePage(item.page, item.heading);
  return anchor(target.url, target.title);
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

const workflowsList = (ctx, item) => {
  const itemAnchor = (itemName) => workflowItemAnchor(ctx, itemName);
  const {workflows, deprecated} = item;
  const localize = localizer(localizations, ctx.lang);

  const flowTypeRenderers = {
    edit: (flows) => {
      return [detailsList(localize("edit"), flows.map(f => itemAnchor(f.edit)))];
    },
    editWith: (flows) => {
      return [detailsList(localize("editWith"), flows.map(f => itemAnchor(f.editWith)))];
    },
    diff: (flows) => {
      return [detailsList(localize("diff"), flows.map(f => itemAnchor(f.diff)))];
    },
    diffWith: (flows) => {
      return [detailsList(localize("diffWith"), flows.map(f => itemAnchor(f.diffWith)))];
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

module.exports = function(ctx, input) {
  const {page} = input;

  const localize = localizer(localizations, ctx.lang);
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
      body: p(detailsList(anchor(ctx.resolvePage("build-types", "conventions").url, localize("buildTypes")), item.buildTypes))
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

  let metaTitle = undefined;
  if (page.toolName) {
    metaTitle = `${icon("tool", localize("tool"))} ${page.toolName}`;
  } else if (!page.tagName) {
    //we don't give tags a meta title because the tag feature does that itself
    metaTitle = `${icon("file", localize("resource"))} ${defaultMetaTitle}`;
  }

  return {
    metaSections,
    metaTitle,
    metaClass: page.toolName ? "content-tool" : undefined,
  };
};
