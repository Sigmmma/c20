module.exports = function(hljs) {
  return {
    keywords: {
      keyword: [
        "Separator",
        "Coordinate3",
        "MaterialBinding",
        "Material",
        "IndexedLineSet",
        "IndexedFaceSet"
      ].join(" "),
      built_in: [
        "point",
        "value",
        "diffuseColor",
        "coordIndex",
        "transparency"
      ].join(" "),
      literal: "PER_VERTEX PER_FACE"
    },
    contains: [
      hljs.COMMENT("#", "$"),
      hljs.C_NUMBER_MODE
    ]
  };
};
