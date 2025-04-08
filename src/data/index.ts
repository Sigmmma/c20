import path from "path";
import {loadYamlTree} from "../lib/utils/files";
import { Lang } from "../lib/utils/localization";
import { MdSrc } from "../lib/markdown/markdown";
const loadWorkflows = require("./workflows");
const loadTags = require("./tags");

type HscFunction = {
  slug: string;
  tags?: string[];
  context?: string;
  info: {[k in Lang]: MdSrc};
};

type GameHscInfo = {
  functions: { functions: HscFunction[] };
  globals: { external_globals: HscFunction[] };
};

type HscInfo = {
  h1: GameHscInfo,
  h2: GameHscInfo,
  h3: GameHscInfo,
  // h3odst: GameHscInfo,
  hr: GameHscInfo,
  // h4: GameHscInfo,
  // h2amp: GameHscInfo,
};

export default async function loadStructuredData() {
  const structsFuture = loadYamlTree(path.join(__dirname, "structs"));
  const hscFuture = loadYamlTree<HscInfo>(path.join(__dirname, "hsc"));
  const workflowsFuture = loadWorkflows();
  const tagsFuture = loadTags(await structsFuture);
  return {
    tags: await tagsFuture,
    hsc: await hscFuture,
    structs: await structsFuture,
    workflows: await workflowsFuture,
  };
};
