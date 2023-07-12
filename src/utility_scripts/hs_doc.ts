import loadStructuredData from "../data";
import { loadTextTree } from "../lib/utils/files";
import * as R from "ramda";
import yaml from "js-yaml";

const slugAliases = {
    "/": "div",
    "+": "plus",
    "-": "minus",
    "*": "mult",
    "=": "eq",
    "!=": "ne",
    ">": "gt",
    "<": "lt",
    ">=": "ge",
    "<=": "le",
};

function parseDoc(text: string) {
    const results: any = {functions: [], globals: []};
    let mode: "functions" | "globals" | undefined = undefined;
    for (let line of text.split("\n")) {
        line = line.trim();
        if (line == "; AVAILABLE FUNCTIONS:") {
            mode = "functions";
            continue;
        } else if (line == "; AVAILABLE EXTERNAL GLOBALS:") {
            mode = "globals";
            continue;
        } else if (mode == "functions") {
            const match = line.match(/\(<([^>]+)> (\S+)(?:\s(.*))?\)/);
            if (match) {
                const args: string[] = []; //todo
                // if (match[3]) {
                //     for (let argMatch of match[3].matchAll(/<([\w\(\)]+)>/g)) {
                //         args.push(argMatch[1]);
                //     }
                // }
                results.functions.push({name: slugAliases[match[2]] ?? match[2], type: match[1], args});
            } else if (line.startsWith("(")) {
                console.warn(`Missed: ${line}`);
            }
        } else if (mode == "globals") {
            const match = line.match(/\(<([^>]+)> (\S+)\)/);
            if (match) {
                results.globals.push({name: match[2], type: match[1]});
            } else if (line.startsWith("(")) {
                console.warn(`Missed: ${line}`);
            }
        }
    }
    return results;
}

(async function main() {
    const data = await loadStructuredData();
    const docs = await loadTextTree<any>("./src/data/hs_docs");
    
    const h1_standalone_new = parseDoc(docs.h1.hs_doc_standalone).functions.map(f => f.name);
    const h1_sapien_new = parseDoc(docs.h1.hs_doc_sapien).functions.map(f => f.name);
    // const h1_new = R.union(
    //     h1_standalone_new,
    //     h1_sapien_new
    // );
    // // console.log(R.difference(h1_legacy_functions, h1_new));

    //"Gearbox only"
    const contexts = new Set();

    const updatedFunctions = {
        functions: data.hsc.h1.functions.functions.map(f => {
            const present = [] as string[];
            if (h1_standalone_new.includes(f.slug)) {
                present.push("in_h1a_standalone");
            }
            if (h1_sapien_new.includes(f.slug)) {
                present.push("in_h1a_sapien");
            }
            if (f.context && !contexts.has(f.context)) {
                // console.log(`context: ${f.context}`);
                contexts.add(f.context);
            }
            return {
                ...f,
                tags: [...f.tags ?? [], ...present],
            };
        })
    }

    console.log(yaml.dump(updatedFunctions));
})();
