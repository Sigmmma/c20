const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml");
const R = require("ramda");
const {INTRINSIC_TYPE_DEFS} = require("../src/build/render/components/structs");

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

function invFieldCheck(obj) {
  obj = {...({
    name,
    compound,
    struct,
    minimum,
    maximum,
    classes,
    bounds,
    count,
    unit,
    type,
    size,
    ...rest
  } = obj)};
  delete rest.default; //keyword cannot be included above
  if (Object.keys(rest).length > 0) {
    console.log(`Unhandled field keys:`, rest);
  }
}

function invStructCheck(obj) {
  obj = {...({
    name,
    type,
    post_compile,
    pre_compile,
    post_cache_deformat,
    postprocess_hek_data,
    width,
    fields,
    inherits,
    fromTagName,
    options,
    size,
    ...rest
  } = obj)};
  if (Object.keys(rest).length > 0) {
    console.log(`Unhandled struct keys:`, rest);
  }
}


function remapTypes(typeName) {
  return {
    TagReflexive: "Block",
    Pointer: "ptr32",
    Pointer64: "ptr64",
  }[typeName] || typeName;
}

const outputFiles = {
  common: yaml.load(`
    id: common
    typeDefs:
      ScenarioScriptNodeValue:
        class: alias
        type: byte
        count: 4
      TagId:
        class: alias
        type: uint32
      Angle:
        class: alias
        type: float
      Fraction:
        class: alias
        type: float
      Index:
        class: alias
        type: uint16

      Vector2D:
        class: struct
        assertSize: 0x8
        fields:
          - name: i
            type: float
          - name: j
            type: float
      Vector3D:
        class: struct
        assertSize: 0xC
        fields:
          - name: i
            type: float
          - name: j
            type: float
          - name: k
            type: float
      Plane2D:
        class: struct
        assertSize: 0xC
        fields:
          - name: vector
            type: Vector2D
          - name: w
            type: float
      Point2D:
        type: struct
        size: 0x8
        fields:
          - name: x
            type: float
          - name: y
            type: float
      Point3D:
        type: struct
        assertSize: 0xC
        fields:
          - name: x
            type: float
          - name: y
            type: float
          - name: z
            type: float
      Bounds:
        class: struct
        args:
          - T
        fields:
          - name: min
            type: T
          - name: max
            type: T
      Point2DInt:
        class: struct
        assertSize: 0x4
        fields:
          - name: x
            type: int16
          - name: y
            type: int16
      Plane3D:
        class: struct
        assertSize: 0x10
        fields:
          - name: vector
            type: Vector3D
          - name: w
            type: float
      Matrix:
        class: struct
        assertSize: 0x24
        fields:
          - name: elements
            type: float
            count: 9
      Quaternion:
        class: struct
        assertSize: 0x10
        fields:
          - name: i
            type: float
          - name: j
            type: float
          - name: k
            type: float
          - name: w
            type: float
      ColorRGB:
        class: struct
        assertSize: 0xC
        fields:
          - name: red
            type: float
          - name: green
            type: float
          - name: blue
            type: float
      Euler2D:
        class: struct
        assertSize: 0x8
        fields:
          - name: yaw
            type: Angle
          - name: pitch
            type: Angle
      Euler3D:
        class: struct
        assertSize: 0xC
        fields:
          - name: yaw
            type: Angle
          - name: pitch
            type: Angle
          - name: roll
            type: Angle
      ColorARGB:
        class: struct
        assertSize: 0x10
        fields:
          - name: alpha
            type: float
          - name: red
            type: float
          - name: green
            type: float
          - name: blue
            type: float
      Rectangle2D:
        class: struct
        assertSize: 0x8
        fields:
          - name: top
            type: int16
          - name: left
            type: int16
          - name: bottom
            type: int16
          - name: right
            type: int16
      ColorARGBInt:
        class: struct
        assertSize: 0x4
        comments:
          en: RGB Color with alpha, with 8-bit color depth per channel (0-255)
        fields:
        - name: alpha
          type: uint8
        - name: red
          type: uint8
        - name: green
          type: uint8
        - name: blue
          type: uint8
      TagString:
        class: struct
        fields:
          - name: buffer
            type: char
            count: 0x20
      TagDependency:
        class: struct
        fields:
          - name: tag_class
            type: uint32
          - name: path_pointer
            type: ptr32
            typeArgs:
              T: char
            meta:
              compiled: true
          - name: path_length
            type: uint32
          - name: tag_id
            type: TagId
      Block:
        class: struct
        args:
          - T
        assertSize: 0xC
        comments:
          en: Header for a variable-sized array of data in a tag.
        fields:
          - name: item_count
            type: uint32
            comments:
              en: Gives the number of items in this block.
          - name: pointer
            type: ptr64
            typeArgs:
              T: T
            meta:
              compiled: true
            comments:
              en: Pointer to the first item.
      PredictedResourceType:
        class: enum
        size: 2
        options:
          - bitmap
          - sound
      PredictedResource:
        class: struct
        assertSize: 0x8
        fields:
          - name: type
            type: PredictedResourceType
          - name: resource_index
            type: Index
          - name: tag
            type: TagID
      TagDataOffset:
        class: struct
        assertSize: 0x14
        fields:
          - name: size
            type: uint32
          - name: external
            endianness: little
            type: uint32
          - name: file_offset
            type: uint32
          - name: pointer
            type: ptr64
  `)
};

/* todo:
 * - unhandled fields
 *   - cache_only vs compiled
 * - comments
 */
Object.entries(c20Comments).forEach(([tagName, basicTag]) => {
  const outputData = {
    //todo: can be null
    entryType: basicTag.invaderStructName,
    id: "tag-struct",
    showOffsets: false,
    imports: {},
    typeDefs: {}
  };

  function walkStruct(typeName) {
    if (outputFiles["common"].typeDefs[typeName]) {
      if (!outputData.imports["common"]) {
        outputData.imports["common"] = [];
      }
      if (!outputData.imports["common"].includes(typeName)) {
        outputData.imports["common"].push(typeName);
      }
      return;
    }

    if (INTRINSIC_TYPE_DEFS[typeName]) {
      return;
    }

    const invStruct = invaderStructs[typeName];
    if (!invStruct) {
      throw new Error(`Found no invader definition for type ${typeName}`);
    }

    invStructCheck(invStruct);

    if (invStruct.fromTagName != tagName) {
      if (!outputData.imports[invStruct.fromTagName]) {
        outputData.imports[invStruct.fromTagName] = [];
      }
      if (!outputData.imports[invStruct.fromTagName].includes(typeName)) {
        outputData.imports[invStruct.fromTagName].push(typeName);
      }
      return;
    }

    const typeDef = {class: invStruct.type};

    if (invStruct.inherits) {
      walkStruct(invStruct.inherits);
      typeDef.extends = {
        type: invStruct.inherits
      };
    }

    switch (invStruct.type) {
      case "struct":
        if (invStruct.size) {
          typeDef.assertSize = invStruct.size;
        }
        [
          "post_cache_deformat",
          "postprocess_hek_data",
          "pre_compile",
          "post_compile",
        ].forEach(metaFlag => {
          if (invStruct[metaFlag]) {
            if (!typeDef.meta) typeDef.meta = {};
            typeDef.meta[metaFlag] = invStruct[metaFlag];
          }
        });
        typeDef.fields = invStruct.fields.map(invField => {
          walkStruct(remapTypes(invField.type));
          invFieldCheck(invField);
          let fieldDef = {};
          const setAttr = (path, val) => fieldDef = R.assocPath(path, val, fieldDef);

          if (invField.name) {
            setAttr(["name"], invField.name.replaceAll(" ", "_"));
          }
          if (invField.type) {
            setAttr(["type"], remapTypes(invField.type));
          }
          if (invField.size) {
            setAttr(["size"], invField.size);
          }
          if (invField.count) {
            setAttr(["count"], invField.count);
          }
          if (invField.type == "TagReflexive") {
            setAttr(["typeArgs"], {"T": invField.struct});
          }
          if (invField.type == "TagDependency") {
            setAttr(["meta", "classes"], invField.classes);
          }
          [
            "unit",
          ].forEach(metaFlag => {
            if (invField[metaFlag]) {
              setAttr(["meta", metaFlag], invField[metaFlag]);
            }
          });
          if (invField.minimum !== undefined) {
            setAttr(["value", "min"], invField.minimum);
          }
          if (invField.default !== undefined) {
            setAttr(["value", "default"], invField.default);
          }
          if (invField.maximum !== undefined) {
            setAttr(["value", "max"], invField.maximum);
          }

          if (invField.bounds) {
            fieldDef.type = "Bounds";
            fieldDef.typeArgs = {"T": invField.type};
          }

          return fieldDef;
        });
        break;
      case "bitfield":
        typeDef.size = invStruct.width / 8;
        typeDef.bits = invStruct.fields.map(invField => ({
          name: invField
        }));
        break;
      case "enum":
        typeDef.size = 2; //all tag enums are 16 bit
        typeDef.options = invStruct.options.map(invOpt => ({
          name: invOpt
        }));
        break;
      default:
        throw new Error(`Unhandled struct type: ${invStruct.type}`);
    }

    outputData.typeDefs[typeName] = typeDef;
  }

  //start recursion
  if (basicTag.invaderStructName) {
    walkStruct(basicTag.invaderStructName);
  }
  outputFiles[tagName] = outputData;
});

// console.log(yaml.dump(outputFiles["object"], {
//   indent: 2,
//   noRefs: true,
// }));
