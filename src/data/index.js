const {loadStructModules} = require("./structs");
const loadWorkflows = require("./workflows");
const loadTags = require("./tags");
const path = require("path");
import {loadYamlTree} from "../lib/utils/files";

async function loadStructuredData() {
  const structs = await loadStructModules();
  return {
    tags: await loadTags(structs),
    hsc: await loadYamlTree(path.join(__dirname, "hsc")),
    structs,
    workflows: await loadWorkflows(),
  };
}

module.exports = loadStructuredData;
