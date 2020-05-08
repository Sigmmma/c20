const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const {getDirectReferencedTagNames} = require("./invader");

const basicTagsList = glob.sync(path.join(__dirname, "tags", "*.yml")).map(tagFileName => {
  return yaml.safeLoad(fs.readFileSync(tagFileName, "utf8"));
});

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

  return {
    tags,
    tagsById,
    tagsByName,
    invaderStructDefs
  };
};

module.exports = buildData;

/* BREAK GLASS IF NEW YAML FILES NEEDED
function buildYamlFiles(invaderStructDefs, basicTags) {
  const describeStruct = (invaderStructName, name) => {
    const struct = invaderStructDefs[invaderStructName];
    if (!struct) {
      return {
        ...(name && {name}),
        md: "...",
      };
    } else if (struct.type == "enum") {
      return {
        ...(name && {name}),
        md: "...",
        options: struct.options.map(name => ({name, md: "..."}))
      };
    } else if (struct.type == "bitfield") {
      return {
        ...(name && {name}),
        md: "...",
        fields: struct.fields.map(field => ({name: field, md: "..."}))
      };
    } if (struct.type == "struct") {
      const namedFields = struct.fields.filter(it => it.name);
      return {
        ...(name && {name}),
        md: "...",
        fields: namedFields.map(field => ({
          ...(field.type && describeStruct(field.type, field.name)),
          ...(field.type == "TagReflexive" && describeStruct(field.struct, field.name)),
        }))
      };
    } else {
      throw new Error(`Unhandled type: ${struct.type}`);
    }
  };


  for (let tag of basicTags) {
    try {
      const tagOut = {
        name: tag.name,
        id: tag.id,
        ...(tag.parent && {
          parent: tag.parent.name
        }),
        ...(tag.invaderStructName && {
          invaderStructName: tag.invaderStructName
        }),
        ...(tag.invaderStructName && {
          comments: describeStruct(tag.invaderStructName)
        })
      };
      fs.writeFileSync(
        `./tags/${tag.name}.yml`,
        yaml.safeDump(tagOut),
        "utf8"
      );
    } catch (e) {
      console.error(tag.name);
      console.error(e);
    }
  }
}
*/
