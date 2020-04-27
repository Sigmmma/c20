const buildH1Data = require("./h1");

function buildData(invaderStructDefs) {
  return {
    h1: buildH1Data(invaderStructDefs)
  };
}

module.exports = buildData;
