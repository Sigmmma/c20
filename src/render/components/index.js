module.exports = {
  wrapper: require("./wrapper/wrapper"),
  metabox: require("./metabox"),
  thanks: require("./thanks"),
  surveyResults: require("./survey/results"),
  ...require("./markdown"),
  ...require("./tag"),
  ...require("./workflows"),
  ...require("./bits")
};
