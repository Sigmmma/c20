const {loadStructModules} = require("./structs");
const loadWorkflows = require("./workflows");
const loadTags = require("./tags");
const {loadYamlTree} = require("../utils");
const path = require("path");

async function loadStructuredData() {
  const structs = await loadStructModules();
  return {
    tagThanks: {
      h1: {
        MosesOfEgypt: {
          en: "Tag structure research",
          es: "Investigación de estructura de tags"
        },
        Kavawuvi: {
          en: "Invader tag definitions",
          es: "Definiciones de tags de Invader"
        },
      },
    },
    tags: await loadTags(structs),
    hsc: await loadYamlTree(path.join(__dirname, "hsc")),
    structs,
    workflows: await loadWorkflows(),
  };
}

module.exports = loadStructuredData;
