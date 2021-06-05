const fs = require("fs").promises;
const path = require("path");
const yaml = require("js-yaml");

function strAsList(strOrList) {
  if (!strOrList) return null;
  return typeof(strOrList) === "string" ? [strOrList] : strOrList;
}

async function loadWorkflows() {
  const yamlContent = await fs.readFile(path.join(__dirname, "workflows.yml"), "utf8");
  const {workflowItems, similarItems, workflows} = yaml.safeLoad(yamlContent);

  const workflowsExpanded = workflows.flatMap(workflow => {
    const usingMulti = strAsList(workflow.using);
    const editMulti = strAsList(workflow.edit);
    const fromMulti = strAsList(workflow.from);
    const toMulti = strAsList(workflow.to);
    if (editMulti) {
      return usingMulti.flatMap(using =>
        editMulti.map(edit => ({using, edit}))
      );
    } else if (fromMulti && toMulti) {
      return usingMulti.flatMap(using =>
        fromMulti.flatMap(from =>
          toMulti.map(to => ({using, from, to}))
        )
      );
    }
  });

  const getWorkflowItem = (itemName) => {
    const originalItemName = itemName;
    let result = {similarTo: [], workflows: []};

    while (itemName) {
      const info = workflowItems[itemName];
      if (!info) break;

      const similarTo = similarItems
        .flatMap(group => group.includes(itemName) ? group : [])
        .filter(otherName => otherName != itemName && !workflowItems[otherName].deprecated);

      const workflows = workflowsExpanded.filter(flow =>
        flow.edit == itemName ||
          flow.using == itemName ||
          flow.to == itemName ||
          flow.from == itemName
      );

      result = {
        ...info,
        ...result,
        similarTo: [...result.similarTo, ...similarTo],
        workflows: [...result.workflows, ...workflows]
      };
      itemName = info.inherit;
    }

    if (!result.url && !result.page) {
      throw new Error(`The workflow item '${originalItemName}' does not define a page or URL`);
    }

    result.similarTo = [...new Set(result.similarTo)]; //unique only

    return result;
  };

  return {
    getWorkflowItem
  };
}

module.exports = loadWorkflows;
