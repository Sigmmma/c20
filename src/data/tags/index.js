const {loadYamlTree} = require("../../utils");
const R = require("ramda");

//todo
function findTagRefs(struct) {
  return [];
}

async function loadTags(structs) {
  const allTags = await loadYamlTree(__dirname);

  //first pass to augment tag info
  Object.entries(allTags).forEach(([game, gameTags]) => {
    Object.entries(gameTags).forEach(([tagName, tagInfo]) => {
      tagInfo.name = tagName;
      tagInfo.struct = R.path([game, "tags", tagName, "type_defs", tagInfo.structName], structs);
      tagInfo.parent = gameTags[tagInfo.parentName];
      tagInfo.references = findTagRefs(tagInfo.struct);
    });
  });

  //second pass for reverse relationships
  Object.entries(allTags).forEach(([game, gameTags]) => {
    Object.entries(gameTags).forEach(([tagName, tagInfo]) => {
      tagInfo.children = Object.values(gameTags)
        .filter(otherTag => otherTag.parent && otherTag.parent.name == tagInfo.name);
      tagInfo.referencedBy = Object.values(gameTags)
        .filter(otherTag => otherTag.references.find(r => r.name == tagInfo.name));
    });
  });

  return allTags;
}

module.exports = loadTags;
