const R = require("ramda");
const {localizer, anchor, detailsList, ul} = require("../components");

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
  workflows: {
    en: "Workflows",
    es: "Flujos de trabajo"
  },
  edit: {
    en: "Edit",
    es: "Editar"
  },
  editWith: {
    en: "Edit with",
    es: "Editar con"
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
  const itemInfo = ctx.data.workflows.getWorkflowItem(itemName);
  const itemUrl = itemInfo.url || ctx.resolveUrl(itemInfo.page, itemInfo.heading);
  return anchor(itemUrl, itemName);
};

const flowsEqual = (flowA, flowB) => {
  return flowA.edit == flowB.edit &&
    flowA.from == flowB.from &&
    flowA.to == flowB.to &&
    flowA.using == flowB.using;
};

const isReverse = (flowA, flowB) => {
  return flowA.from && flowB.from && flowA.to && flowB.to &&
    flowA.using == flowB.using &&
    flowA.from == flowB.to &&
    flowA.to == flowB.from;
};

const workflowsList = (ctx, thisItem, workflows) => {
  const itemAnchor = (itemName) => workflowItemAnchor(ctx, itemName);
  const localize = localizations(ctx.lang);

  const labeledFlows = {};
  const pushLabeledFlow = (baseKey, base, itemKey, item) => {
    if (!labeledFlows[baseKey]) {
      labeledFlows[baseKey] = {base, items: {}};
    }
    labeledFlows[baseKey].items[itemKey] = item;
  };

  for (let flow of workflows) {
    //at this time we don't need to show cyclic flows
    if (isReverse(flow, flow)) {
      continue;
    }

    if (flow.edit && flow.using) {
      if (flow.using == thisItem) {
        pushLabeledFlow("edit", localize("edit"), flow.edit, itemAnchor(flow.edit));
      } else {
        pushLabeledFlow("edit-with", localize("editWith"), flow.using, itemAnchor(flow.using));
      }
    } else if (flow.from && flow.to && flow.using) {
      //we only want one list item for bi-directional flow pairs
      const hasReverse = workflows.find(other => !flowsEqual(flow, other) && isReverse(other, flow));
      if (hasReverse) {
        if (thisItem == flow.using) {
          const bidiItems = [flow.from, flow.to];
          bidiItems.sort();
          pushLabeledFlow(`bidi-${bidiItems[0]}`, localize("bidiUsingThis")(itemAnchor(bidiItems[0])), bidiItems[1], itemAnchor(bidiItems[1]));
        } else {
          const otherItem = flow.to == thisItem ? flow.from : flow.to;
          pushLabeledFlow(`bidi-${otherItem}`, localize("bidiOfThis")(itemAnchor(otherItem)), flow.using, itemAnchor(flow.using));
        }
      } else if (thisItem == flow.from) {
        //use &nbsp; to join words for better appearance on narrow windows
        pushLabeledFlow(`to-${flow.to}`, localize("flowTo")(itemAnchor(flow.to)), flow.using, itemAnchor(flow.using));
      } else if (thisItem == flow.to) {
        pushLabeledFlow(`from-${flow.from}`, localize("flowFrom")(itemAnchor(flow.from)), flow.using, itemAnchor(flow.using));
      } else if (thisItem == flow.using) {
        pushLabeledFlow(`${flow.from}-to`, localize("flowUsing")(itemAnchor(flow.from)), flow.to, itemAnchor(flow.to));
      }
    } else {
      throw new Error(`Cannot render unhandled workflow for item '${thisItem}': ${JSON.stringify(flow)}`);
    }
  }

  return detailsList(
    localize("workflows"),
    Object.values(labeledFlows).map(({base, items}) => {
      items = Object.values(items);
      if (items.length == 1) {
        return `${base}&nbsp;${items[0]}`;
      }
      return `${base}:${ul(items)}`;
    })
  );
};

module.exports = async function(ctx) {
  const {page} = ctx;

  const localize = localizations(ctx.lang);
  const workflowItemName = page.workflowName || page.toolName || page.tagName;
  if (!workflowItemName) {
    return {};
  }

  const defaultMetaTitle = `\u{2699}\u{FE0F} ${page.tryLocalizedTitle(ctx.lang)}`;
  const metaSections = [];
  const itemInfo = ctx.data.workflows.getWorkflowItem(workflowItemName);

  if (itemInfo.authors && itemInfo.authors.length > 0) {
    metaSections.push({
      body: detailsList(localize("authors"), itemInfo.authors)
    });
  }
  if (itemInfo.similarTo && itemInfo.similarTo.length > 0) {
    metaSections.push({
      body: detailsList(localize("similar"), itemInfo.similarTo.map(itemName => {
        return workflowItemAnchor(ctx, itemName);
      }))
    });
  }
  if (itemInfo.workflows && itemInfo.workflows.length > 0) {
    metaSections.push({
      cssClass: "content-tool-minor",
      body: workflowsList(ctx, workflowItemName, itemInfo.workflows)
    });
  }

  return {
    metaSections,
    metaTitle: page.toolName ? `\u{1F527} ${localize("tool")}: ${page.toolName}` : defaultMetaTitle,
    metaClass: page.toolName ? "content-tool" : undefined,
  };
};
