#!/usr/bin/env python3
"""
update_scripts.py <MCC[1, 0]> <hs doc path> <yml file>: Update HS script docs using H1/H1A hs_doc.txt
Requires: Python 3.7, ruamel.yaml
Author: num0005
"""

import os
import sys
import re
from typing import Dict
import ruamel.yaml
from dataclasses import dataclass
from ruamel.yaml.comments import CommentedSeq

from ruamel.yaml.compat import ordereddict

@dataclass
class ScriptCommand:
    """Class for keeping track of an item in inventory."""
    name: str
    command: str
    description: str = ""
    
    def __gt__(a, b):
        return a.name.lower() > b.name.lower()

if len(sys.argv) != 4:
    print(__doc__)
    sys.exit(-1)

is_mcc = bool(int(sys.argv[1]))
commands = []
globals = []

current_command = None
parsing_commands = True
with open(sys.argv[2], "r", newline='\r\n') as file:
    for line in file:
        line = line.strip()
        if not line or line == "; AVAILABLE FUNCTIONS:":
            continue
        if parsing_commands:
            if line[0] == '(': # new command
                if current_command != None:
                    #print(current_command)
                    commands.append(current_command)
                if is_mcc:    
                    name = re.sub(r'<[^<>]*?>|\(|\)| ', '', line)
                else:
                    name = re.sub(r'<[^<>]*?>|\[[^\[^\]]*?\]|\(|\)| ', '', line)
                #print(name)
                current_command = ScriptCommand(name, line)
            elif (line[0] == ';'): # comment line append to current command
                current_command.description += line[2:]
            elif not is_mcc:
                current_command.description += line
            else:
                print("Ignoring: " + line) 
            if line == "; AVAILABLE EXTERNAL GLOBALS:":
                print("Parsing globals now!") # should write something proper for this...
                parsing_commands = False
        else:
            globals.append(line)
    current_command = None        

del commands[:22] # remove special functions, those need a manual doc anyways
commands.sort()

yaml = ruamel.yaml.YAML()
yaml.indent(mapping=2, sequence=4, offset=2)
yaml.preserve_quotes = True

def create_function_yml(script_command: ScriptCommand) -> dict:
    info = {}
    info["en"] = ruamel.yaml.scalarstring.PreservedScalarString(
        "```hsc\n" + script_command.command + "\n```\n" + script_command.description
    )

    dict = {}
    dict["slug"] = script_command.name
    dict["info"] = info
    if is_mcc:
        dict["mcc_only"] = "true"

    return dict

with open(sys.argv[3], "r") as file:
    hsc_yml_data = yaml.load(file.read())

# some functions are documented elsewhere (or shouldn't be doc'ed), ignore those
ignore = ("inspect", "not", "pin", "oid_dump", "oid_watch")

functions_yml: CommentedSeq = hsc_yml_data["Functions"]["rows"]
print(functions_yml[0])
offset_last = 0
for command in commands:
    if command.name in ignore:
        continue
    command_found = False
    for function in functions_yml:
        if command.name == function["slug"]:
            offset_last = functions_yml.index(function)
            command_found = True
    if not command_found:
        print(command.name + " is undoc!")
        print(offset_last)
        functions_yml.insert(offset_last + 1, create_function_yml(command))
        offset_last += 1

print("Saving updated yml!")
with open(sys.argv[3], "w") as file:
    yaml.dump(hsc_yml_data, file)
print("Saved!")