const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const {getDirectReferencedTagNames} = require("./invader");

const basicTagsList = glob.sync(path.join(__dirname, "tags", "*.yml")).map(tagFileName => {
  return yaml.safeLoad(fs.readFileSync(tagFileName, "utf8"));
});

const {workflowItems, similarItems, workflows} = yaml.safeLoad(fs.readFileSync(path.join(__dirname, "tools.yml"), "utf8"));

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
    const similarTo = similarItems
      .flatMap(group => group.includes(itemName) ? group : [])
      .filter(otherName => otherName != itemName);

    const workflows = workflowsExpanded.filter(flow =>
      matchIgnoreCase(flow.edit, itemName) ||
        matchIgnoreCase(flow.using, itemName) ||
        matchIgnoreCase(flow.to, itemName) ||
        matchIgnoreCase(flow.from, itemName)
    );

    let result = {similarTo, workflows};
    while (itemName) {
      const info = workflowItems[itemName];
      if (!info) break;
      result = {...info, ...result};
      itemName = info.inherit;
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
