const basicTagsList = require("./tags");
const {getDirectReferencedTagNames} = require("./invader");

const basicTagsById = Object.fromEntries(basicTagsList.map(basicTag =>
  [basicTag.id, basicTag]
));

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
    tag.parent = tag.parentId ? tagsById[tag.parentId] : null;
    tag.children = tags.filter(otherTag => otherTag.parentId == tag.id);
  }

  //easier to do referencedBy using the references built in previous pass
  for (let tag of tags) {
    tag.referencedBy = tags.filter(otherTag =>
      otherTag.references.find(ref => ref.id == tag.id)
    );
  }

  return {
    tags,
    tagsById,
    tagsByName,
    invaderStructDefs
  };
};

module.exports = buildData;
