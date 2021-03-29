const loadStructModules = require("./structs");
const loadWorkflows = require("./workflows");

async function loadStructuredData() {
  return {
    structs: await loadStructModules(),
    workflows: await loadWorkflows(),
  };
}

module.exports = loadStructuredData;
