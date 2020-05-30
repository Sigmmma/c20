const buildH1Data = require("./h1");

function buildData(invaderStructDefs) {
  const h1Data = buildH1Data(invaderStructDefs);
  return {
    h1: h1Data,
    thanks: [
      ...h1Data.tagThanks
    ]
  };
}

module.exports = buildData;
