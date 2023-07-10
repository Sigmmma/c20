import loadStructuredData from "../data";
import { loadTextTree } from "../lib/utils/files";
import * as R from "ramda";

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
            const match = line.match(/\(<([\w\(\)]+)> ([\w\d_\)\()]+)((?:\s<[\w\(\)]+>)*)\)/);
            if (match) {
                const args: string[] = [];
                if (match[3]) {
                    for (let argMatch of match[3].matchAll(/<([\w\(\)]+)>/g)) {
                        args.push(argMatch[1]);
                    }
                }
                results.functions.push({name: slugAliases[match[2]] ?? match[2], type: match[1], args});
            }
        } else if (mode == "globals") {
            const match = line.match(/\(<([\w\(\)]+)> ([\w\d_\)\()]+)\)/);
            if (match) {
                results.globals.push({name: match[2], type: match[1]});
                // console.log(match[2]);
            }
        }
    }
    return results;
}

(async function main() {
    const data = await loadStructuredData() as any;
    const docs = await loadTextTree<any>("./src/data/hs_docs");
    
    const h1_new_standalone_functions = parseDoc(docs.h1.hs_doc_standalone).functions.map(g => g.name);
    const h1_old_standalone_functions = parseDoc(docs.h1.hs_doc_standalone_retail).functions.map(g => g.name);
    console.log(R.difference(h1_old_standalone_functions, h1_new_standalone_functions));
})();
