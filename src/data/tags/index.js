const R = require("ramda");
const {loadYamlTree} = require("../../utils");
const {walkTypeDefs} = require("../structs");

function findDirectTagRefs(structName, structModule, structModules, tagName) {
  const walkOpts = {noRootExtend: true};
  const results = {};
  walkTypeDefs(structName, structModule, structModules, walkOpts, tagName, (typeDef) => {
    if (typeDef.class == "struct") {
      typeDef.fields
        .filter(f => f.meta && f.meta.tag_classes && !f.meta.unused)
        .flatMap(f => f.meta.tag_classes)
        .forEach(c => results[c] = true);
    }
  });
  return Object.keys(results);
}

async function loadTags(structModules) {
  const allTags = await loadYamlTree(__dirname);

  //first pass to augment tag info
  Object.entries(allTags).forEach(([game, gameTags]) => {
    Object.entries(gameTags).forEach(([tagName, tagInfo]) => {
      tagInfo.name = tagName;
      // tagInfo.struct = R.path([game, "tags", tagName, "type_defs", tagInfo.structName], structModules);
      tagInfo.parent = gameTags[tagInfo.parentName];
      tagInfo.references = findDirectTagRefs(tagInfo.structName, tagInfo.structModule, structModules, tagName)
        .filter(r => r != "*")
        .map(r => gameTags[r]);
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
