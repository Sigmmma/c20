const buildH1Data = require("./h1");
const loadWorkflows = require("./workflows");

async function loadStructuredData(invaderDefsDir) {
  const h1Data = buildH1Data(invaderDefsDir);
  const workflows = loadWorkflows();
  return {
    h1: await h1Data,
    workflows: await workflows,
    thanks: [
      ...(await h1Data).tagThanks
    ]
  };
}

module.exports = loadStructuredData;
