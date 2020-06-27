const {anchor, detailsList} = require("./bits");

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

  const filteredFlows = [];
  for (let flow of workflows) {
    //at this time we don't need to show cyclic flows
    if (flow.from && flow.to && flow.from == flow.to) {
      continue;
    }
    //ignore duplicates
    if (filteredFlows.find(other => flowsEqual(other, flow))) {
      continue;
    }
    //we only want one list item for bi-directional flow pairs
    const reverse = filteredFlows.find(other => isReverse(other, flow));
    if (reverse) {
      reverse.bidi = true;
      continue;
    }

    filteredFlows.push(flow);
  }

  return detailsList(
    "Workflows",
    filteredFlows.map(flow => {
      if (flow.edit && flow.using) {
        return flow.using == thisItem ?
          `Edit ${itemAnchor(flow.edit)}` :
          `Edit with ${itemAnchor(flow.using)}`;
      } else if (flow.from && flow.to && flow.using) {
        //use &nbsp; to join words for better appearance on narrow windows
        if (thisItem == flow.from) {
          return `${flow.bidi ? "To/from" : "To"}&nbsp;${itemAnchor(flow.to)} with&nbsp;${itemAnchor(flow.using)}`;
        } else if (thisItem == flow.to) {
          return `${flow.bidi ? "To/from" : "From"}&nbsp;${itemAnchor(flow.from)} with&nbsp;${itemAnchor(flow.using)}`;
        } else if (thisItem == flow.using) {
          return `${itemAnchor(flow.from)}&nbsp;${flow.bidi ? "to/from" : "to"} ${itemAnchor(flow.to)}`;
        }
      }
      throw new Error(`Cannot render unhandled workflow for item '${thisItem}': ${JSON.stringify(flow)}`);
    })
  );
};

module.exports = {workflowsList, workflowItemAnchor};
