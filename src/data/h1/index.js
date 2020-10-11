const fs = require("fs").promises;
const path = require("path");
const yaml = require("js-yaml");
const {findPaths} = require("../../utils");
const {getDirectReferencedTagNames, loadInvaderStructDefs} = require("./invader");

async function buildH1Data(invaderDefsDir) {
  const invaderStructDefs = await loadInvaderStructDefs(invaderDefsDir);

  const tagYamlPaths = await findPaths(path.join(__dirname, "tags", "*.yml"));
  const tags = await Promise.all(tagYamlPaths.map(async (tagFileName) => {
    try {
      const basicTag = yaml.safeLoad(await fs.readFile(tagFileName, "utf8"));
      return {
        ...basicTag,
        //augment the basic list of tags with more detail provided by external libs
        invaderStruct: basicTag.invaderStructName ?
          invaderStructDefs[basicTag.invaderStructName] :
          null
      };
    } catch (ex) {
      console.error(`Failed to parse tag data file ${tagFileName}`);
      throw ex;
    }
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

  return {
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

module.exports = buildH1Data;
