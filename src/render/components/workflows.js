const {anchor, detailsList} = require("./bits");

const workflowItemAnchor = (itemName, metaIndex) => {
  const itemInfo = metaIndex.data.h1.getWorkflowItem(itemName);
  const itemUrl = itemInfo.url || metaIndex.resolveUrl(itemInfo.page, itemInfo.heading);
  return anchor(itemUrl, itemName);
};

const workflowsList = (thisItem, workflows, metaIndex) => {
  const itemAnchor = (itemName) => workflowItemAnchor(itemName, metaIndex);
  return detailsList(
    "Workflows",
    workflows.map(flow => {
      if (flow.edit && flow.using) {
        return flow.using == thisItem ?
          `Edit ${itemAnchor(flow.edit)}` :
          `Edit with ${itemAnchor(flow.using)}`;
      } else if (flow.from && flow.to && flow.using) {
        //use &nbsp; to join words for better appearance on narrow windows
        if (thisItem == flow.from) {
          return `To&nbsp;${itemAnchor(flow.to)} with&nbsp;${itemAnchor(flow.using)}`;
        } else if (thisItem == flow.to) {
          return `From&nbsp;${itemAnchor(flow.from)} with&nbsp;${itemAnchor(flow.using)}`;
        } else if (thisItem == flow.using) {
          return `From&nbsp;${itemAnchor(flow.from)} to&nbsp;${itemAnchor(flow.to)}`;
        }
      }
      throw new Error(`Cannot render unhandled workflow for item '${thisItem}': ${JSON.stringify(flow)}`);
    })
  );
};

module.exports = {workflowsList, workflowItemAnchor};
