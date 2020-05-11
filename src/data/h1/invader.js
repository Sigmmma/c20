/* This file contains utility functions for working with Invader's
 * tag definition JSON files
 */

//for the given struct, get all structs which comprise it
function expandStructs(struct, structs) {
  return struct.fields
    .filter(field => field.type == "TagReflexive" &&
      field.struct != "PredictedResource"
    )
    .map(field => structs[field.struct]);
}

//get all tag names (e.g. sound_looping) referenced by the given struct (e.g. SoundScenery)
function getDirectReferencedTagNames(structName, structs) {
  const results = new Set();
  let structStack = [structs[structName]];

  while (structStack.length > 0) {
    const struct = structStack.pop();
    if (!struct) throw new Error(structName);
    struct.fields
      .filter(field => field.type == "TagDependency" && !field.unused)
      .flatMap(field => field.classes)
      .forEach(tagClass => {
        results.add(tagClass);
      });
    structStack = [
      ...structStack,
      ...expandStructs(struct, structs)
    ];
  }

  return [...results].sort();
}

module.exports = {
  getDirectReferencedTagNames
};
