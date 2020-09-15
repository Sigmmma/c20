const {anchor, detailsList, ul} = require("./bits");

const workflowItemAnchor = (itemName, metaIndex) => {
  const itemInfo = metaIndex.data.h1.getWorkflowItem(itemName);
  const itemUrl = itemInfo.url || metaIndex.resolveUrl(itemInfo.page, itemInfo.heading);
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

const workflowsList = (thisItem, workflows, metaIndex) => {
  const itemAnchor = (itemName) => workflowItemAnchor(itemName, metaIndex);

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
        pushLabeledFlow("edit", "Edit", flow.edit, itemAnchor(flow.edit));
      } else {
        pushLabeledFlow("edit-with", "Edit with", flow.using, itemAnchor(flow.using));
      }
    } else if (flow.from && flow.to && flow.using) {
      //we only want one list item for bi-directional flow pairs
      const hasReverse = workflows.find(other => !flowsEqual(flow, other) && isReverse(other, flow));
      if (hasReverse) {
        const otherItem = flow.to == thisItem ? flow.from : flow.to;
        pushLabeledFlow(`bidi-${otherItem}`, `To/from&nbsp;${itemAnchor(otherItem)} with`, flow.using, itemAnchor(flow.using));
      } else if (thisItem == flow.from) {
        //use &nbsp; to join words for better appearance on narrow windows
        pushLabeledFlow(`to-${flow.to}`, `To&nbsp;${itemAnchor(flow.to)} with`, flow.using, itemAnchor(flow.using));
      } else if (thisItem == flow.to) {
        pushLabeledFlow(`from-${flow.from}`, `From&nbsp;${itemAnchor(flow.from)} with`, flow.using, itemAnchor(flow.using));
      } else if (thisItem == flow.using) {
        pushLabeledFlow(`${flow.from}-to`, `${itemAnchor(flow.from)}&nbsp;to`, flow.to, itemAnchor(flow.to));
      }
    } else {
      throw new Error(`Cannot render unhandled workflow for item '${thisItem}': ${JSON.stringify(flow)}`);
    }
  }

  return detailsList(
    "Workflows",
    Object.values(labeledFlows).map(({base, items}) => {
      items = Object.values(items);
      if (items.length == 1) {
        return `${base}&nbsp;${items[0]}`;
      } else if (items.length <= 3) {
        return `${base} ${items.join(", ")}`;
      }
      return `${base}...${ul(items)}`;
    })
  );
};

module.exports = {workflowsList, workflowItemAnchor};
