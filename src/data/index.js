const {loadStructModules} = require("./structs");
const loadWorkflows = require("./workflows");
const loadTags = require("./tags");

async function loadStructuredData() {
  const structs = await loadStructModules();
  return {
    tags: await loadTags(structs),
    structs,
    workflows: await loadWorkflows(),
  };
}

module.exports = loadStructuredData;
