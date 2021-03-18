const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml");

/* This script converts struct definitions from invader's JSON files
 * into the YAML struct specs used by c20. We used to build from them directly
 * and overlay comments, but now need a common struct documenting format
 * to include H2 tags and other file types.
 */

const invaderBase = "./lib/invader/src/tag/hek/definition/";
const commentsBase = "./src/data/h1/tags/";
const outDir = "./src/data/h1/tags2/";

const invaderStructs = {};
const c20Comments = {};

for (let jsonFileName of fs.readdirSync(invaderBase)) {
  const jsonFilePath = path.join(invaderBase, jsonFileName);
  const tagName = jsonFileName.substring(0, jsonFileName.length - 5);
  const structsInFile = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

  for (let struct of structsInFile) {
    struct = {...struct, fromTagName: tagName};
    invaderStructs[struct.name] = struct;
  }
}

for (let ymlFileName of fs.readdirSync(commentsBase)) {
  const tagFileName = path.join(commentsBase, ymlFileName);
  const basicTag = yaml.load(fs.readFileSync(tagFileName, "utf8"));
  const tagName = ymlFileName.substring(0, ymlFileName.length - 4);
  c20Comments[tagName] = basicTag;
}

Object.entries(c20Comments).forEach(([tagName, basicTag]) => {
  const outputData = {
    entryType: basicTag.invaderStructName,
    showAbsoluteOffsets: false, //todo
    imports: {},
    id: tagName,
    typeDefs: {}
  };

  // inherits
  function walkStruct(typeName) {
    const invStruct = invaderStructs[typeName];
    if (!invStruct) {
      throw new Error(`Found no invader definition for type ${typeName}`);
    }

    if (invStruct.fromTagName != tagName) {
      if (!outputData.imports[invStruct.fromTagName]) {
        outputData.imports[invStruct.fromTagName] = [];
      }
      outputData.imports[invStruct.fromTagName].push(typeName);
      return;
    }

    const typeDef = {};

    if (invStruct.inherits) {
      walkStruct(invStruct.inherits);
      typeDef.extends = invStruct.inherits;
    }

    typeDef.class = invStruct.type;
    switch (invStruct.type) {
      case "struct":
        break;
      case "bitfield":
        break;
      case "enum":
        break;
      default:
        throw new Error(`Unhandled struct type: ${invStruct.type}`);
    }

    outputData.typeDefs[typeName] = typeDef;
  }

  if (basicTag.invaderStructName) {
    walkStruct(basicTag.invaderStructName);
  }
  console.dir(outputData);
});
