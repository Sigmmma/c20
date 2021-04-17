const {loadStructModules} = require("./structs");
const loadWorkflows = require("./workflows");
const loadTags = require("./tags");

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
    structs,
    workflows: await loadWorkflows(),
  };
}

module.exports = loadStructuredData;
