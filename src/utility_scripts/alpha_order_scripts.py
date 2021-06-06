#!/usr/bin/env python3
"""
update_scripts.py <yml file>: Sorts the commands in the script doc alphabetically 
Requires: Python 3.7, ruamel.yaml
Author: num0005
"""

import sys
import ruamel.yaml
from dataclasses import dataclass
from ruamel.yaml.comments import CommentedSeq


if len(sys.argv) != 2:
    print(__doc__)
    sys.exit(-1)

yaml = ruamel.yaml.YAML()
yaml.indent(mapping=2, sequence=4, offset=2)
yaml.preserve_quotes = True

with open(sys.argv[1], "r") as file:
    hsc_yml_data = yaml.load(file.read())

functions_yml: CommentedSeq = hsc_yml_data["Functions"]["rows"]
def get_slug(dict) -> str:
    return dict["slug"]
functions_yml.sort(key=get_slug)
print("Functions sorted, saving!")

with open(sys.argv[1], "w") as file:
    yaml.dump(hsc_yml_data, file)

print("Saved!")