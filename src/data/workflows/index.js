const fs = require("fs").promises;
const path = require("path");
const R = require("ramda");
const yaml = require("js-yaml");
const {loadYamlTree} = require("../../utils");

function strAsList(strOrList) {
  if (!strOrList) return [];
  return typeof(strOrList) === "string" ? [strOrList] : strOrList;
}

function preprocessPass(items) {
  return R.mapObjIndexed(
    R.pipe(
      //name
      (item, itemName) => R.assoc("name", itemName, item),
      //defaults
      R.mergeRight({
        inherit: [],
        authors: [],
        similarTo: [],
        buildTypes: [],
        workflows: [],
      }),
      //shorthand expansion
      R.evolve({
        inherit: strAsList,
        authors: strAsList,
        similarTo: strAsList,
        buildTypes: strAsList,
        workflows: R.pipe(
          R.defaultTo([]),
          R.chain(R.pipe(
            R.evolve({
              edit: strAsList,
              diff: strAsList,
              from: strAsList,
              to: strAsList,
              between: strAsList,
            }),
            (flow) => {
              if (flow.between) {
                return R.xprod(flow.between, flow.between)
                  .filter(([a, b]) => a != b)
                  .map(([a, b]) => ({
                    from: a,
                    to: b,
                  }));
              } else if (flow.edit) {
                return flow.edit.map(item => ({
                  edit: item,
                }));
              } else if (flow.from && flow.to) {
                return R.xprod(flow.from, flow.to)
                  .filter(([a, b]) => a != b)
                  .map(([a, b]) => ({
                    from: a,
                    to: b,
                  }));
              } else if (flow.diff) {
                return flow.diff.map(item => ({
                  diff: item,
                }));
              } else {
                throw new Error(`Unrecognized workflow type: ${JSON.stringify(flow)}`);
              }
            }
          )),
        ),
      }),
    ),
    items
  );
}

function inheritancePass(items) {
  return R.mapObjIndexed(
    R.until(
      (item) => item.abstract || item.inherit.length == 0,
      (item) => {
        const parents = item.inherit.map(parentName => {
          if (!items[parentName]) {
            throw new Error(`Could not find workflow parent with name ${parentName} (from ${item.name})`);
          }
          return items[parentName];
        });
        const mergeLists = (prop) => R.concat(
          R.prop(prop, item),
          R.chain(R.prop(prop), parents),
        );
        return {
          ...R.reduce(R.mergeLeft, {}, [item, ...parents]),
          abstract: false,
          inherit: R.chain(R.prop("inherit"), parents),
          authors: mergeLists("authors"),
          similarTo: mergeLists("similarTo"),
          buildTypes: mergeLists("buildTypes"),
          workflows: mergeLists("workflows"),
        };
      }
    ),
    items
  );
}

function relationshipsPass(items) {
  Object.entries(items).forEach(([itemName, item]) => {
    if (!item.abstract) {
      item.workflows.forEach(flow => {
        if (flow.edit) {
          items = R.over(R.lensPath([flow.edit, "workflows"]), R.append({editWith: itemName}), items);
        } else if (flow.diff) {
          items = R.over(R.lensPath([flow.diff, "workflows"]), R.append({diffWith: itemName}), items);
        } else if (flow.from && flow.to) {
          items = R.over(R.lensPath([flow.from, "workflows"]), R.append({to: flow.to, via: itemName}), items);
          items = R.over(R.lensPath([flow.to, "workflows"]), R.append({from: flow.from, via: itemName}), items);
        }
      });
      item.similarTo.forEach(similarName => {
        const similarItem = items[similarName];
        if (!similarItem) {
          throw new Error(`Could not find similar workflow item with name ${similarName} (from ${itemName})`);
        }
        items = R.over(R.lensPath([similarName, "similarTo"]), R.append(itemName), items);
      });
    }
  });
  return items;
}

function bidiKey(f) {
  let bidiKey = [f.to, f.from, f.via].filter(R.identity);
  bidiKey.sort();
  return bidiKey.join("-");
}

function uniquePass(items) {
  return R.mapObjIndexed(
    R.evolve({
      authors: R.uniq,
      similarTo: R.uniq,
      buildTypes: R.uniq,
      workflows: R.pipe(
        R.map(flow => {
          return (flow.to || flow.from) ?
            R.assoc("bidiKey", bidiKey(flow), flow) :
            R.assoc("bidiKey", "N/A", flow);
        }),
        R.groupBy(R.prop("bidiKey")),
        R.mapObjIndexed((bidiFlows, bidiKey) => {
          if (bidiKey != "N/A" && bidiFlows.length > 1) {
            return [R.assoc("bidi", true, bidiFlows[0])];
          }
          return bidiFlows;
        }),
        R.values,
        R.flatten,
        R.map(R.dissoc("bidiKey"))
      ),
    }),
    items
  );
}

function noDeprecatedPass(items) {
  const isDepr = (itemName) => itemName && items[itemName].deprecated;
  return R.mapObjIndexed(
    (item) => {
      return R.evolve({
        workflows: R.pipe(
          R.filter(flow => {
            return item.deprecated || !isDepr(flow.from) &&
              !isDepr(flow.to) &&
              !isDepr(flow.via) &&
              !isDepr(flow.editWith) &&
              !isDepr(flow.edit);
          })
        ),
        similarTo: R.filter(sim => item.deprecated || !isDepr(sim))
      })(item);
    },
    items
  );
}

async function loadWorkflows() {
  const items = R.pipe(
    preprocessPass,
    inheritancePass,
    relationshipsPass,
    uniquePass,
    noDeprecatedPass,
  )(await loadYamlTree(__dirname, true));

  return {
    getWorkflowItem: (itemName, ctx) => {
      let result = items[itemName];
      if (!result) {
        throw new Error(`Could not find workflow item with name ${itemName} (from ${ctx ? ctx.page.pageId : "unknown"})`);
      }
      if (!result.url && !result.page) {
        throw new Error(`The workflow item ${itemName} does not exist or is missing page/url attribute`);
      }
      return result;
    }
  };
}

module.exports = loadWorkflows;
