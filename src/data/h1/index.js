const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const {getDirectReferencedTagNames} = require("./invader");

function strAsList(strOrList) {
  if (!strOrList) return null;
  return typeof(strOrList) === "string" ? [strOrList] : strOrList;
}

function buildData(invaderStructDefs) {
  const basicTagsList = glob.sync(path.join(__dirname, "tags", "*.yml")).map(tagFileName => {
    try {
      return yaml.safeLoad(fs.readFileSync(tagFileName, "utf8"));
    } catch (ex) {
      console.error(`Failed to parse data file ${tagFileName}`);
      throw ex;
    }
  });

  const {workflowItems, similarItems, workflows} = yaml.safeLoad(fs.readFileSync(path.join(__dirname, "tools.yml"), "utf8"));

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
        .filter(otherName => otherName != itemName);

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

    return result;
  };

  return {
    getWorkflowItem,
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
