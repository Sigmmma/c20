import path from "path";
import {loadYamlTree} from "../lib/utils/files";
const loadWorkflows = require("./workflows");
const loadTags = require("./tags");

export default async function loadStructuredData() {
  const structsFuture = loadYamlTree(path.join(__dirname, "structs"));
  const hscFuture = loadYamlTree(path.join(__dirname, "hsc"));
  const workflowsFuture = loadWorkflows();
  const tagsFuture = loadTags(await structsFuture);
  return {
    tags: await tagsFuture,
    hsc: await hscFuture,
    structs: await structsFuture,
    workflows: await workflowsFuture,
  };
};
