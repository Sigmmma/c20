module.exports = {
  wrapper: require("./wrapper/wrapper"),
  metabox: require("./metabox"),
  thanks: require("./thanks"),
  ...require("./markdown"),
  ...require("./tag"),
  ...require("./workflows"),
  ...require("./bits")
};
