const {loadYamlTree} = require("../../lib/utils");
const R = require("ramda");
const INTRINSIC_TYPE_DEFS = require("./intrinsics");

async function loadStructModules() {
  return await loadYamlTree(__dirname);
}

function processGenerics(genericParams, type_args) {
  if (!type_args) return genericParams;
  return {
    ...genericParams,
    type: type_args[genericParams.type] || genericParams.type,
    type_args: genericParams.type_args === undefined ? undefined :
      Object.fromEntries(Object.entries(genericParams.type_args).map(([k, v]) =>
      [k, type_args[v] || v]
    ))
  };
}

function buildTypeDefs(initialTypeDefs, initialImports, modules) {
  let typeDefs = {
    ...INTRINSIC_TYPE_DEFS,
    ...initialTypeDefs
  };

  let importsQueue = [initialImports];
  while (importsQueue.length > 0) {
    const imports = importsQueue.pop();
    if (!imports) continue;
    for (let modulePath of Object.keys(imports)) {
      const importedModule = R.path(modulePath.split("/"), modules);
      if (!importedModule) {
        throw new Error(`Failed to find data module ${modulePath}`);
      }
      importsQueue.push(importedModule.imports);
      typeDefs = {...importedModule.type_defs, ...typeDefs};
    }
  }
  return typeDefs;
}

/* responsible for resolving aliases, calculating type, and replacing type args
 */
function instantiateTypeInner(typeDefs, typeParams, parentTypeArgs, opts, isRoot) {
  if (parentTypeArgs) {
    typeParams = processGenerics(typeParams, parentTypeArgs);
  }
  const {type: typeName, type_args, size, count} = typeParams;
  let typeDef = typeDefs[typeName];
  if (!typeDef) {
    throw new Error(`Failed to resolve type ${typeName}`);
  }

  if (typeDef.class == "alias") {
    return instantiateTypeInner(typeDefs, {...typeParams, ...typeDef}, type_args, opts, isRoot);
  }

  const canExtend = !isRoot || !opts.noRootExtend;
  if (canExtend && typeDef.class == "struct" && typeDef.extends) {
    const {typeDef: parentTypeDef} = instantiateTypeInner(typeDefs, typeDef.extends, type_args, opts, false);
    typeDef = {
      ...parentTypeDef,
      ...typeDef,
      fields: [...parentTypeDef.fields, ...typeDef.fields]
    };
  }

  const singleSize = size ||
    typeDef.size ||
    (typeDef.class == "struct" && typeDef.fields.reduce((s, f) => instantiateTypeInner(typeDefs, f, type_args, opts, false).totalSize + s, 0)) ||
    0;

  const totalSize = singleSize * (count || 1);
  if (canExtend && typeDef.assert_size && totalSize != typeDef.assert_size) {
    throw new Error(`Type ${typeName} size did not match assertion: ${totalSize} != ${typeDef.assert_size}`);
  }

  return {typeDef, totalSize, singleSize, variableSize: size, count, type_args, typeName};
}

function walkTypeDefs(structName, structModule, structModules, opts, cb) {
  const typeDefs = buildTypeDefs({}, {[structModule]: [structName]}, structModules);

  function walkStructInner(typeParams, typeArgs, isFirst) {
    if (typeArgs) {
      typeParams = processGenerics(typeParams, typeArgs);
    }

    let typeDef = typeDefs[typeParams.type];
    if (!typeDef) {
      throw new Error(`Failed to resolve type ${typeName}`);
    }

    if (typeDef.class == "alias") {
      walkStructInner({...typeParams, ...typeDef}, typeParams.type_args, false);
      return;
    }

    cb(typeDef);
    if (typeDef.extends && (!isFirst || !opts.noRootExtend)) {
      walkStructInner(typeDef.extends, typeArgs, false);
    }
    if (typeDef.class == "struct") {
      typeDef.fields.forEach(f => walkStructInner(f, typeParams.type_args, false));
    } else if (typeParams.type == "ptr32" || typeParams.type == "ptr64") {
      if (typeParams.type_args) {
        walkStructInner({type: Object.values(typeParams.type_args)[0]}, typeParams.type_args, false);
      }
    }
  }

  walkStructInner({type: structName}, null, true);
}

function instantiateType(typeDefs, typeParams, parentTypeArgs, opts) {
  return instantiateTypeInner(typeDefs, typeParams, parentTypeArgs, opts, true);
}

module.exports = {
  walkTypeDefs,
  buildTypeDefs,
  instantiateType,
  loadStructModules
};
