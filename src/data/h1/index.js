const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const {getDirectReferencedTagNames} = require("./invader");

const basicTagsList = glob.sync(path.join(__dirname, "tags", "*.yml")).map(tagFileName => {
  return yaml.safeLoad(fs.readFileSync(tagFileName, "utf8"));
});

const {tools, workflows} = yaml.safeLoad(fs.readFileSync(path.join(__dirname, "tools.yml"), "utf8"));

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

  //todo: md rendering, support downloads, URLs (or use page info??)
  const toolsExpanded = tools.flatMap(group => {
    const names = strAsList(group.names);
    const authors = strAsList(group.authors);
    const sources = strAsList(group.sources);
    return names.map(name => ({name, authors, sources}));
  });

  const getToolInfo = (toolName) => {
    return toolsExpanded.find(it => matchIgnoreCase(it.name, toolName));
  };

  const workflowsExpanded = workflows.flatMap(group => {
    const usingMulti = strAsList(group.using);
    const editMulti = strAsList(group.edit);
    const fromMulti = strAsList(group.from);
    const toMulti = strAsList(group.to);
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

  const getResourceWorkflows = (resource) => {
    return workflowsExpanded.filter(flow =>
      matchIgnoreCase(flow.edit, resource) ||
        matchIgnoreCase(flow.to, resource) ||
        matchIgnoreCase(flow.from, resource)
    );
  };

  return {
    getToolInfo,
    getResourceWorkflows,
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
