const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const {getDirectReferencedTagNames} = require("./invader");

const basicTagsList = glob.sync(path.join(__dirname, "tags", "*.yml")).map(tagFileName => {
  return yaml.safeLoad(fs.readFileSync(tagFileName, "utf8"));
});

const {toolInfos, resourceInfos, similarTools, workflows} = yaml.safeLoad(fs.readFileSync(path.join(__dirname, "tools.yml"), "utf8"));

function strAsList(strOrList) {
  if (!strOrList) return null;
  return typeof(strOrList) === "string" ? [strOrList] : strOrList;
}

function matchIgnoreCase(a, b) {
  if (!a) return !b;
  if (!b) return !a;
  return a.toLowerCase() == b.toLowerCase();
}

function buildData(invaderStructDefs) {
  //augment the basic list of tags with more detail provided by external libs
  const tags = basicTagsList.map(basicTag => ({
    ...basicTag,
    invaderStruct: basicTag.invaderStructName ?
      invaderStructDefs[basicTag.invaderStructName] :
      null
  }));

  const tagsById = Object.fromEntries(tags.map(tag =>
    [tag.id, tag]
  ));
  const tagsByName = Object.fromEntries(tags.map(tag =>
    [tag.name, tag]
  ));

  //next, build most inter-tag relationships
  for (let tag of tags) {
    tag.references = [];
    if (tag.invaderStructName) {
      tag.references = getDirectReferencedTagNames(tag.invaderStructName, invaderStructDefs)
        .map(tagName => tagName == "*" ? tagName : tagsByName[tagName]);
    }
    tag.parent = tag.parentName ? tagsByName[tag.parentName] : null;
    tag.children = tags.filter(otherTag => otherTag.parentName == tag.name);
  }

  //easier to do referencedBy using the references built in previous pass
  for (let tag of tags) {
    tag.referencedBy = tags.filter(otherTag =>
      otherTag.references.find(ref => ref.name == tag.name)
    );
  }

  const getToolInfoByName = (toolName) => {
    let result = {};
    while (toolName) {
      const toolInfo = toolInfos[toolName];
      if (!toolInfo) {
        throw new Error(`Tool '${toolName}' is undefined`);
      }
      result = {...toolInfo, ...result};
      toolName = toolInfo.inherit;
    }
    return result;
  };

  const getResourceInfoByName = (resourceName) => {
    let result = {};
    while (resourceName) {
      const resourceInfo = resourceInfos[resourceName];
      if (!resourceInfo) {
        throw new Error(`Resource '${resourceName}' is undefined`);
      }
      result = {...resourceInfo, ...result};
      resourceName = resourceInfo.inherit;
    }
    return result;
  };

  const getSimilarToolNames = (toolName) => {
    const group = similarTools.find(group => group.includes(toolName)) || [];
    return group.filter(otherToolName => otherToolName != toolName);
  };

  const workflowsExpanded = workflows.flatMap(workflow => {
    const usingMulti = strAsList(workflow.using);
    const editMulti = strAsList(workflow.edit);
    const fromMulti = strAsList(workflow.from);
    const toMulti = strAsList(workflow.to);
    if (editMulti) {
      return usingMulti.flatMap(using =>
        editMulti.map(edit => ({toolName: using, edit}))
      );
    } else if (fromMulti && toMulti) {
      return usingMulti.flatMap(using =>
        fromMulti.flatMap(from =>
          toMulti.map(to => ({toolName: using, from, to}))
        )
      );
    }
  });

  const getToolWorkflows = (toolName) => {
    return workflowsExpanded.filter(flow =>
      matchIgnoreCase(flow.toolName, toolName)
    );
  };

  const getResourceWorkflows = (resourceName) => {
    return workflowsExpanded.filter(flow =>
      matchIgnoreCase(flow.edit, resourceName) ||
        matchIgnoreCase(flow.to, resourceName) ||
        matchIgnoreCase(flow.from, resourceName)
    );
  };

  return {
    getToolInfoByName,
    getSimilarToolNames,
    getToolWorkflows,
    getResourceWorkflows,
    getResourceInfoByName,
    tags,
    tagsById,
    tagsByName,
    invaderStructDefs,
    tagThanks: [
      {to: "MosesOfEgypt", for: "Tag structure research"},
      {to: "Kavawuvi", for: "Invader tag definitions"},
    ]
  };
};

module.exports = buildData;
