const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const {getDirectReferencedTagNames} = require("./invader");

const basicTagsList = glob.sync(path.join(__dirname, "tags", "*.yml")).map(tagFileName => {
  return yaml.safeLoad(fs.readFileSync(tagFileName, "utf8"));
});

const toolsList = yaml.safeLoad(fs.readFileSync(path.join(__dirname, "tools.yml"), "utf8"));

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

  const getToolIntegrations = (resource) => {
    return toolsList.filter(tool =>
      tool.edits && tool.edits.includes(resource) ||
      tool.converts && tool.converts.find(c => c.from == resource || c.to == resource)
    );
  };

  return {
    toolsList,
    tags,
    tagsById,
    tagsByName,
    getToolIntegrations,
    invaderStructDefs
  };
};

module.exports = buildData;
