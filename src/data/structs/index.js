const {loadYamlTree} = require("../../utils");

async function loadStructModules() {
  return await loadYamlTree(__dirname);
}

module.exports = loadStructModules;
