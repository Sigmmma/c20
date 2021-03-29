const fs = require("fs").promises;
const path = require("path");
const {findPaths} = require("../../utils");

/* This file contains utility functions for working with Invader's
 * tag definition JSON files
 */

async function loadInvaderStructDefs(invaderDefsDir) {
  const filePaths = await findPaths(path.join(invaderDefsDir, "*.json"));
  if (filePaths.length == 0) {
    throw new Error("Found no invader struct definitions. Forget to init submodules?");
  }
  const defsByFile = await Promise.all(filePaths.map(async (filePath) => {
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents);
  }));
  const defsByStructName = {};
  for (let def of defsByFile.flat()) {
    defsByStructName[def.name] = def;
  }
  return defsByStructName;
}

//for the given struct, get all structs which comprise it
function expandStructs(struct, structDefs, isRoot) {
  const results = struct.fields
    .filter(field =>
      field.type == "TagReflexive" &&
      field.struct != "PredictedResource"
    )
    .map(field => structDefs[field.struct]);
  if (!isRoot && struct.inherits) {
    results.push(structDefs[struct.inherits]);
  }
  return results;
}

//get all tag names (e.g. sound_looping) referenced by the given struct (e.g. SoundScenery)
function getDirectReferencedTagNames(structName, structDefs) {
  const results = new Set();
  let structStack = [structDefs[structName]];
  let isRoot = true;

  while (structStack.length > 0) {
    const struct = structStack.pop();
    if (!struct) throw new Error(`No definition for struct ${structName}`);
    struct.fields
      .filter(field => field.type == "TagDependency" && !field.unused)
      .flatMap(field => field.classes)
      .forEach(tagClass => {
        results.add(tagClass);
      });
    structStack = [
      ...structStack,
      ...expandStructs(struct, structDefs, isRoot)
    ];
    isRoot = false;
  }

  return [...results].sort();
}

module.exports = {
  getDirectReferencedTagNames,
  loadInvaderStructDefs
};
