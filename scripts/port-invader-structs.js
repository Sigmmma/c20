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
const commentsBase = "./src/data/h1_old/tags/";
const outDir = "./src/data/structs/h1/tags/";

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
    volatile,
    unused,
    maximum,
    classes,
    hek_maximum,
    normalize, //ignore
    exclude, //ignore
    default_sign, //ignore
    file_offset, //ignore
    external_file_offset,
    cache_only,
    non_cached,
    engine,
    reflexive,
    non_null,
    endian,
    read_only,
    bounds,
    count,
    flagged,
    description,
    comment,
    unit,
    type,
    size,
    //undocumented:
    hidden,
    drop_on_extract_hidden,
    compile_ignore,
    ignore_cached,
    zero_on_index,
    shifted_by_one,
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
    width,
    normalize, //ignore
    title, //ignore
    groups, //ignore
    exclude, //ignore
    fields,
    inherits,
    cache_only,
    fromTagName,
    comment,
    options,
    size,
    read_only,
    //undocumented:
    post_cache_deformat,
    post_cache_parse,
    postprocess_hek_data,
    unsafe_to_dedupe,
    ...rest
  } = obj)};
  if (Object.keys(rest).length > 0) {
    console.log(`Unhandled struct keys:`, rest);
  }
}


function remapTypes(typeName) {
  return {
    TagFourCC: "TagEngineId",
    TagReflexive: "Block",
    Pointer: "ptr32",
    Pointer64: "ptr64",
  }[typeName] || typeName;
}

const outputFiles = {
  common: yaml.load(`
    id: common
    type_defs:
      ScenarioScriptNodeValue:
        class: alias
        type: byte
        count: 4
      Angle:
        class: alias
        type: float
      Fraction:
        class: alias
        type: float
      Index:
        class: alias
        type: uint16
      TagID:
        class: alias
        type: uint32

      TagEngineId:
        class: enum
        size: 4
        options:
          - name: none
            value: 0xFFFFFFFF
          - name: "null"
            value: 0
          - name: actor
            value: 0x61637472
          - name: actor_variant
            value: 0x61637476
          - name: antenna
            value: 0x616E7421
          - name: model_animations
            value: 0x616E7472
          - name: biped
            value: 0x62697064
          - name: bitmap
            value: 0x6269746D
          - name: spheroid
            value: 0x626F6F6D
          - name: continuous_damage_effect
            value: 0x63646D67
          - name: model_collision_geometry
            value: 0x636F6C6C
          - name: color_table
            value: 0x636F6C6F
          - name: contrail
            value: 0x636F6E74
          - name: device_control
            value: 0x6374726C
          - name: decal
            value: 0x64656361
          - name: ui_widget_definition
            value: 0x44654C61
          - name: input_device_defaults
            value: 0x64657663
          - name: device
            value: 0x64657669
          - name: detail_object_collection
            value: 0x646F6263
          - name: effect
            value: 0x65666665
          - name: equipment
            value: 0x65716970
          - name: flag
            value: 0x666C6167
          - name: fog
            value: 0x666F6720
          - name: font
            value: 0x666F6E74
          - name: material_effects
            value: 0x666F6F74
          - name: garbage
            value: 0x67617262
          - name: glow
            value: 0x676C7721
          - name: grenade_hud_interface
            value: 0x67726869
          - name: hud_message_text
            value: 0x686D7420
          - name: hud_number
            value: 0x68756423
          - name: hud_globals
            value: 0x68756467
          - name: item
            value: 0x6974656D
          - name: item_collection
            value: 0x69746D63
          - name: damage_effect
            value: 0x6A707421
          - name: lens_flare
            value: 0x6C656E73
          - name: lightning
            value: 0x656C6563
          - name: device_light_fixture
            value: 0x6C696669
          - name: light
            value: 0x6C696768
          - name: sound_looping
            value: 0x6C736E64
          - name: device_machine
            value: 0x6D616368
          - name: globals
            value: 0x6D617467
          - name: meter
            value: 0x6D657472
          - name: light_volume
            value: 0x6D677332
          - name: gbxmodel
            value: 0x6D6F6432
          - name: model
            value: 0x6D6F6465
          - name: multiplayer_scenario_description
            value: 0x6D706C79
          - name: preferences_network_game
            value: 0x6E677072
          - name: object
            value: 0x6F626A65
          - name: particle
            value: 0x70617274
          - name: particle_system
            value: 0x7063746C
          - name: physics
            value: 0x70687973
          - name: placeholder
            value: 0x706C6163
          - name: point_physics
            value: 0x70706879
          - name: projectile
            value: 0x70726F6A
          - name: weather_particle_system
            value: 0x7261696E
          - name: scenario_structure_bsp
            value: 0x73627370
          - name: scenery
            value: 0x7363656E
          - name: shader_transparent_chicago_extended
            value: 0x73636578
          - name: shader_transparent_chicago
            value: 0x73636869
          - name: scenario
            value: 0x73636E72
          - name: shader_environment
            value: 0x73656E76
          - name: shader_transparent_glass
            value: 0x73676C61
          - name: shader
            value: 0x73686472
          - name: sky
            value: 0x736B7920
          - name: shader_transparent_meter
            value: 0x736D6574
          - name: sound
            value: 0x736E6421
          - name: sound_environment
            value: 0x736E6465
          - name: shader_model
            value: 0x736F736F
          - name: shader_transparent_generic
            value: 0x736F7472
          - name: ui_widget_collection
            value: 0x536F756C
          - name: shader_transparent_plasma
            value: 0x73706C61
          - name: sound_scenery
            value: 0x73736365
          - name: string_list
            value: 0x73747223
          - name: shader_transparent_water
            value: 0x73776174
          - name: tag_collection
            value: 0x74616763
          - name: camera_track
            value: 0x7472616B
          - name: dialogue
            value: 0x75646C67
          - name: unit_hud_interface
            value: 0x756E6869
          - name: unit
            value: 0x756E6974
          - name: unicode_string_list
            value: 0x75737472
          - name: virtual_keyboard
            value: 0x76636B79
          - name: vehicle
            value: 0x76656869
          - name: weapon
            value: 0x77656170
          - name: wind
            value: 0x77696E64
          - name: weapon_hud_interface
            value: 0x77706869
          - name: invader_bitmap
            value: 0x65626974
            meta:
              non_standard: true
          - name: invader_scenario
            value: 0x53636E72
            meta:
              non_standard: true
          - name: invader_sound
            value: 0x65736E64
            meta:
              non_standard: true
          - name: invader_font
            value: 0x6E666E74
            meta:
              non_standard: true
          - name: invader_ui_widget_definition
            value: 0x6E757764
            meta:
              non_standard: true
          - name: invader_unit_hud_interface
            value: 0x6E756869
            meta:
              non_standard: true
          - name: invader_weapon_hud_interface
            value: 0x6E776869
            meta:
              non_standard: true
          - name: shader_transparent_glsl
            value: 0x7374676C
            meta:
              non_standard: true

      Vector2D:
        class: struct
        assert_size: 0x8
        fields:
          - name: i
            type: float
          - name: j
            type: float
      Vector3D:
        class: struct
        assert_size: 0xC
        fields:
          - name: i
            type: float
          - name: j
            type: float
          - name: k
            type: float
      Plane2D:
        class: struct
        assert_size: 0xC
        fields:
          - name: vector
            type: Vector2D
          - name: w
            type: float
      Point2D:
        class: struct
        type: struct
        size: 0x8
        fields:
          - name: x
            type: float
          - name: y
            type: float
      Point3D:
        class: struct
        type: struct
        assert_size: 0xC
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
        assert_size: 0x4
        fields:
          - name: x
            type: int16
          - name: y
            type: int16
      Plane3D:
        class: struct
        assert_size: 0x10
        fields:
          - name: vector
            type: Vector3D
          - name: w
            type: float
      Matrix:
        class: struct
        assert_size: 0x24
        fields:
          - name: elements
            type: float
            count: 9
      Quaternion:
        class: struct
        assert_size: 0x10
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
        assert_size: 0xC
        fields:
          - name: red
            type: float
          - name: green
            type: float
          - name: blue
            type: float
      Euler2D:
        class: struct
        assert_size: 0x8
        fields:
          - name: yaw
            type: Angle
          - name: pitch
            type: Angle
      Euler3D:
        class: struct
        assert_size: 0xC
        fields:
          - name: yaw
            type: Angle
          - name: pitch
            type: Angle
          - name: roll
            type: Angle
      ColorARGB:
        class: struct
        assert_size: 0x10
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
        assert_size: 0x8
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
        assert_size: 0x4
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
            type: TagEngineId
          - name: path_pointer
            type: ptr32
            type_args:
              T: char
            meta:
              compiled: true
          - name: path_length
            type: uint32
          - name: tag_id
            type: TagID
      Block:
        class: struct
        args:
          - T
        assert_size: 0xC
        comments:
          en: Header for a variable-sized array of data in a tag.
        fields:
          - name: item_count
            type: uint32
            comments:
              en: Gives the number of items in this block.
          - name: pointer
            type: ptr64
            type_args:
              T: T
            meta:
              compiled: true
            comments:
              en: Pointer to the first item.
      PredictedResourceType:
        class: enum
        size: 2
        options:
          - name: bitmap
          - name: sound
      PredictedResource:
        class: struct
        assert_size: 0x8
        fields:
          - name: type
            type: PredictedResourceType
          - name: resource_index
            type: Index
          - name: tag
            type: TagID
      TagDataOffset:
        class: struct
        assert_size: 0x14
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
      FramebufferBlendFunction:
        class: enum
        size: 2
        options:
          - name: alpha blend
          - name: multiply
          - name: double multiply
          - name: add
          - name: subtract
          - name: component min
          - name: component max
          - name: alpha multiply add
      FramebufferFadeMode:
        class: enum
        size: 2
        options:
          - name: none
          - name: fade when perpendicular
          - name: fade when parallel
      FunctionOut:
        class: enum
        size: 2
        options:
          - name: none
          - name: a out
          - name: b out
          - name: c out
          - name: d out
      WaveFunction:
        class: enum
        size: 2
        options:
          - name: one
          - name: zero
          - name: cosine
          - name: cosine variable period
          - name: diagonal wave
          - name: diagonal wave variable period
          - name: slide
          - name: slide variable period
          - name: noise
          - name: jitter
          - name: wander
          - name: spark
      MaterialType:
        class: enum
        size: 2
        options:
          - name: dirt
          - name: sand
          - name: stone
          - name: snow
          - name: wood
          - name: metal hollow
          - name: metal thin
          - name: metal thick
          - name: rubber
          - name: glass
          - name: force field
          - name: grunt
          - name: hunter armor
          - name: hunter skin
          - name: elite
          - name: jackal
          - name: jackal energy shield
          - name: engineer skin
          - name: engineer force field
          - name: flood combat form
          - name: flood carrier form
          - name: cyborg armor
          - name: cyborg energy shield
          - name: human armor
          - name: human skin
          - name: sentinel
          - name: monitor
          - name: plastic
          - name: water
          - name: leaves
          - name: elite energy shield
          - name: ice
          - name: hunter shield
      FunctionType:
        class: enum
        size: 2
        options:
          - name: linear
          - name: early
          - name: very early
          - name: late
          - name: very late
          - name: cosine
      FunctionBoundsMode:
        class: enum
        size: 2
        options:
          - name: clip
          - name: clip and normalize
          - name: scale to fit
      FunctionScaleBy:
        class: enum
        size: 2
        options:
          - name: none
          - name: a in
          - name: b in
          - name: c in
          - name: d in
          - name: a out
          - name: b out
          - name: c out
          - name: d out
      FunctionNameNullable:
        class: enum
        size: 2
        options:
          - name: none
          - name: a
          - name: b
          - name: c
          - name: d
      GrenadeType:
        class: enum
        size: 2
        options:
          - name: human fragmentation
          - name: covenant plasma
      IsUnusedFlag:
        class: bitfield
        size: 4
        fields:
          - name: unused
      IsUnfilteredFlag:
        class: bitfield
        size: 2
        fields:
          - name: unfiltered
      ColorInterpolationFlags:
        class: bitfield
        size: 4
        fields:
          - name: blend in hsv
          - name: more colors
  `)
};

const missingCrap = [
  ['preferences_network_game', 'PreferencesNetworkGame'],
  ['hud_interface_types', 'HUDInterfaceAnchor'],
  ['hud_interface_types', 'HUDInterfaceFlashFlags'],
  ['hud_interface_types', 'HUDInterfaceMessagingFlags'],
  ['hud_interface_types', 'HUDInterfaceMeterFlags'],
  ['hud_interface_types', 'HUDInterfaceMultitextureOverlay'],
  ['hud_interface_types', 'HUDInterfaceNumberFlags'],
  ['hud_interface_types', 'HUDInterfaceOverlayFlashFlags'],
  ['hud_interface_types', 'HUDInterfaceScalingFlags'],
  // ['model', 'ModelFlags'],
  // ['model', 'ModelGeometryPart'],
  // ['model', 'ModelMarker'],
  // ['model', 'ModelNode'],
  // ['model', 'ModelRegion'],
  // ['model', 'ModelShaderReference'],
  ['object', 'BasicObject'],
  ['object', 'ObjectNoise'],
  ['shader', 'ShaderColorFunctionType'],
  ['shader', 'ShaderDetailFunction'],
  ['shader', 'ShaderFirstMapType'],
  ['shader', 'ShaderTransparentExtraLayer'],
];

function fieldEq(a, b) {
  return a.toLowerCase().replaceAll(" ", "") == b.toLowerCase().replaceAll(" ", "");
}

Object.entries(c20Comments).forEach(([tagName, basicTag]) => {
  const outputData = {
    entry_type: basicTag.invaderStructName,
    imports: {},
    type_defs: {}
  };

  function getComments(tagName, fieldPath) {
    let level = c20Comments[tagName].comments;
    level.id = c20Comments[tagName].id;
    for (let part of fieldPath) {
      if (level && part && level.fields) {
        level = level.fields.find(f => fieldEq(f.name, part));
      } else if (level && part && level.options) {
        level = level.options.find(f => fieldEq(f.name, part));
      } else if (part) {
        level = undefined;
      }
    }
    if (!level) {
      console.warn(`Couldn't find comments for path (${tagName}): `, fieldPath);
    }
    return level;
  }

  function walkStruct(typeName, fieldPath) {
    if (outputFiles["common"].type_defs[typeName]) {
      if (!outputData.imports["h1/tags/common"]) {
        outputData.imports["h1/tags/common"] = [];
      }
      if (!outputData.imports["h1/tags/common"].includes(typeName)) {
        outputData.imports["h1/tags/common"].push(typeName);
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
      const depName = (invStruct.fromTagName == "enum" || invStruct.fromTagName == "bitfield") ?
        "common" : invStruct.fromTagName;
      const modulePath = `h1/tags/${depName}`;
      if (!outputData.imports[modulePath]) {
        outputData.imports[modulePath] = [];
      }
      if (!outputData.imports[modulePath].includes(typeName)) {
        outputData.imports[modulePath].push(typeName);
      }
      return;
    }

    const typeDef = {class: invStruct.type};

    if (invStruct.inherits) {
      walkStruct(invStruct.inherits, fieldPath);
      typeDef.extends = {
        type: invStruct.inherits
      };
    }
    const structComments = getComments(tagName, fieldPath);
    if (structComments && structComments.id) {
      typeDef.meta = {tag_id: structComments.id};
      if (structComments.en != "...") {
        typeDef.comments = {en: structComments.en};
      }
    }

    if (invStruct.comment) {
      // console.log(`struct comment ${typeName}: ${invStruct.comment}`);
    }

    switch (invStruct.type) {
      case "struct":
        if (invStruct.size) {
          typeDef.assert_size = invStruct.size;
        }
        [
          "post_cache_deformat",
          "post_cache_parse",
          "unsafe_to_dedupe",
          "postprocess_hek_data",
          "pre_compile",
          "post_compile",
          "read_only",
        ].forEach(metaFlag => {
          if (invStruct[metaFlag]) {
            if (!typeDef.meta) typeDef.meta = {};
            typeDef.meta[metaFlag] = invStruct[metaFlag];
          }
        });
        typeDef.fields = invStruct.fields.map(invField => {
          walkStruct(remapTypes(invField.type), [...fieldPath, invField.name]);
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
            walkStruct(remapTypes(invField.struct), [...fieldPath, invField.name]);
            setAttr(["type_args"], {"T": invField.struct});
          }
          if (invField.type == "TagDependency") {
            setAttr(["meta", "tag_classes"], invField.classes);
          }
          if (invField.reflexive) {
            setAttr(["meta", "index_of"], invField.reflexive);
          }
          if ((invField.comment && invField.comment.includes("MCC only")) || (invField.engine && invField.engine.includes("mcc"))) {
            setAttr(["meta", "mcc_only"], true);
          }
          if (invField.comment && invField.comment.includes("Xbox only")) {
            setAttr(["meta", "xbox_only"], true);
          }
          if (invField.hek_maximum) {
            setAttr(["meta", "hek_max_count"], invField.hek_maximum);
          }
          [
            "cache_only",
            "non_cached",
            "unit",
            "volatile",
            "unused",
            "external_file_offset",
            "shifted_by_one",
            "hidden",
            "drop_on_extract_hidden",
            "compile_ignore",
            "flagged",
            "zero_on_index",
            "ignore_cached",
          ].forEach(metaFlag => {
            if (invField[metaFlag]) {
              setAttr(["meta", metaFlag], invField[metaFlag]);
            }
          });
          if (invField.minimum !== undefined) {
            setAttr(["meta", "min"], invField.minimum);
          }
          if (invField.endian) {
            setAttr(["endianness"], invField.endian);
          }
          if (invField.maximum !== undefined) {
            setAttr(["meta", "max"], invField.maximum);
          }
          if (invField.default !== undefined) {
            setAttr(["meta", "default"], invField.default);
          }
          if (invField.non_null) {
            setAttr(["meta", "non_null"], true);
          }
          if (invField.read_only) {
            setAttr(["meta", "read_only"], true);
          }
          if (invField.bounds) {
            fieldDef.type = "Bounds";
            fieldDef.type_args = {"T": invField.type};
          }

          if (invField.name) {
            const fieldComments = getComments(tagName, [...fieldPath, invField.name]);
            if (fieldComments && fieldComments.en != "...") {
              setAttr(["comments", "en"], fieldComments.en);
            }
          }

          let invComm = invField.comment || invField.description;
          if (invComm) {
            if (fieldDef.comments && fieldDef.comments.en) {
              // console.log();
              // console.log(`struct field comment collision ${typeName}:`);
              // console.log([...fieldPath, invField.name]);
              // console.log("--------------");
              // console.log(invComm);
              // console.log("--------------");
              // console.log(fieldDef.comments.en);
              // console.log("--------------");
              // console.log();
            } else {
              setAttr(["comments", "en"], invComm);
            }
          }

          return fieldDef;
        });
        break;
      case "bitfield":
        typeDef.size = invStruct.width / 8;
        typeDef.bits = invStruct.fields.map(invField => {
          let bitDef = {
            name: invField.replaceAll(" ", "_"),
            ...(invStruct.cache_only && invStruct.cache_only.includes(invField) && {
              meta: {
                cache_only: true
              }
            })
          };

          const fieldComments = getComments(tagName, [...fieldPath, invField]);
          if (fieldComments && fieldComments.en != "...") {
            bitDef.comments = {en: fieldComments.en};
          }

          return bitDef;
        });
        break;
      case "enum":
        typeDef.size = 2; //all tag enums are 16 bit
        typeDef.options = invStruct.options.map(invOpt => {
          let optDef = {
            name: invOpt.replaceAll(" ", "_")
          };

          const optComments = getComments(tagName, [...fieldPath, invOpt]);
          if (optComments && optComments.en != "...") {
            optDef.comments = {en: optComments.en};
          }

          return optDef;
        });
        break;
      default:
        throw new Error(`Unhandled struct type: ${invStruct.type}`);
    }

    outputData.type_defs[typeName] = typeDef;
  }

  //start recursion
  if (basicTag.invaderStructName) {
    walkStruct(basicTag.invaderStructName, []);
  }

  missingCrap.forEach(([mTagName, mTypeName]) => {
    if (mTagName == tagName) {
      walkStruct(mTypeName, ["dummy"]);
    }
  });

  outputFiles[tagName] = outputData;
});

Object.entries(outputFiles).forEach(([fromModule, data]) => {
  if (data.imports) {
    Object.entries(data.imports).forEach(([toModule, toTypeNames]) => {
      toModule = toModule.split("/")[2];
      if (!outputFiles[toModule]) {
        outputFiles[toModule] = {
          imports: {},
          type_defs: {}
        };
      }
      toTypeNames.forEach((toTypeName) => {
        const outputData = outputFiles[toModule];
        if (!outputData.type_defs[toTypeName]) {
          console.error(`Missing type ${toTypeName} in module ${toModule}`);
        }
      });
    });
  }
});

const ignoredTags = [
  "ui_widget_collection",
  "spheroid",
  "continuous_damage_effect",
  "placeholder",
  "preferences_network_game",
  "model",
  "hud_interface_types",
  "placeholder"
];
Object.entries(outputFiles).forEach(([groupName, data]) => {
  const content = yaml.dump(data, {
    indent: 2,
    noRefs: true,
  });
  if (!ignoredTags.includes(groupName)) {
    const outPath = path.join(outDir, `${groupName}.yml`);
    fs.writeFileSync(outPath, content, "utf8");
  }
});

/*
moved to common
-------------
bitfield
enum

ignore
-----------------
invader_bitmap
invader_sound

no invader structs
-----------
spheroid
ui_widget_collection
continuous_damage_effect


backfilled:
-------------
hud_interface_types
*/
