# based on https://github.com/Sigmmma/c20/blob/master/src/utility_scripts/hs_doc.ts by Conscars
# Port by Abstract Ingenuity
# Cleanup by Mimickal

from argparse import ArgumentParser
from dataclasses import dataclass
import re
from sys import stderr
from typing import Optional
import yaml

VERSION = '1.0.0'

# Special cases for converting symbolic operators to slug-friendly text.
SLUG_ALIASES = {
    '/': 'div',
    '+': 'plus',
    '-': 'minus',
    '*': 'mult',
    '=': 'eq',
    '!=': 'ne',
    '>': 'gt',
    '<': 'lt',
    '>=': 'ge',
    '<=': 'le',
    '%': 'mod',
    '->': 'arrow',
    '~': 'negative',
}

# NOTE: Some functions have typos in the hs_doc output where : is L,
# making the prefix "NETWORK SAFEL" instead of "NETWORK SAFE:".
# One can only imagine what's happening in Sapien's code to make this
# string change based on the function...
NETWORK_REGEX = re.compile(r'NETWORK SAFE[:L] (.+)')

SLUG_VALIDATION_REGEX = re.compile(r'\w')
USAGE_REGEX = re.compile(r'\(<([^>]+)> (\S+)(?:\s(.*))?\)')

# Customize the YAML dumper to use block style for multiline strings.
# Shamelessly ripped off from https://stackoverflow.com/a/45004775
yaml.SafeDumper.org_represent_str = yaml.SafeDumper.represent_str

def repr_str(dumper, data):
    if '\n' in data:
        return dumper.represent_scalar(u'tag:yaml.org,2002:str', data, style='|')
    return dumper.org_represent_str(data)

yaml.add_representer(str, repr_str, Dumper=yaml.SafeDumper)

@dataclass
class Entry:
    # slug and usage must be set, but because we build this object
    # line-by-line, we still need to initialize them to None.
    slug: str = None
    usage: str = None
    description: Optional[str] = None
    network_safe: Optional[str] = None

    def __init__(self):
        self.line_count = 0

    def consume(self, line: str) -> None:
        self.line_count += 1

        if self.line_count == 1:
            self.usage = line
            self.slug = slugify(line)

        elif self.line_count == 2:
            self.description = line

        elif line.startswith('NETWORK SAFE'):
            self.network_safe = NETWORK_REGEX.match(line).group(1)

def slugify(line: str) -> str|None:
    match = USAGE_REGEX.match(line)

    if not match:
        print(f'Warning: Failed to extract slug from "{line}"')
        return None

    name = match.group(2).lower()
    slug = SLUG_ALIASES.get(name, name)

    if not SLUG_VALIDATION_REGEX.match(slug):
        print(f'Warning: "{slug}" appears to be a bad slug', file=stderr)

    return slug

def parse_file(hs_doc_file: str) -> tuple[list[Entry], list[Entry]]:
    with open(hs_doc_file, 'r') as f:
        lines = f.readlines()

    doc_functions: list[Entry] = list()
    doc_globals: list[Entry] = list()

    current_list: list[Entry] | None = None
    current_entry: Entry | None = None

    for line in lines:
        line = line.strip()

        if not line:
            if  current_entry \
            and current_entry.slug \
            and current_list is not None:
                current_list.append(current_entry)
            current_entry = Entry()
            continue

        line = line.strip('; ')

        if line == 'AVAILABLE FUNCTIONS:':
            current_list = doc_functions
        elif line == 'AVAILABLE EXTERNAL GLOBALS:':
            current_list = doc_globals
        else:
            current_entry.consume(line)

    return doc_functions, doc_globals

def serialize_to_yaml(output_file: str, top_key: str, entries: list[Entry]) -> None:
    output_data = {
        top_key: list(map(lambda entry: {
            'slug': entry.slug,
            'info': {
                'en': (
                    '```hsc\n'
                    f'{entry.usage}\n'
                    '```\n'
                    f'{entry.description or ""}'
                ).strip(),
            },
        }, entries))
    }

    with open(output_file, 'w') as f:
       yaml.safe_dump(output_data, f, sort_keys=False)

if __name__ == '__main__':
    parser = ArgumentParser(
        description='Processes hs_doc.txt from Sapien into C20-compatible YAML.',
        conflict_handler='resolve',
    )
    parser.add_argument('hs_doc')
    parser.add_argument(
        '-h', '--help',
        help='Print this help text and exit.',
        action='help',
    )
    parser.add_argument(
        '-v', '--version',
        help='Print script version and exit.',
        action='version',
        version=f'%(prog)s {VERSION}',
    )
    args = parser.parse_args()

    doc_functions, doc_globals = parse_file(args.hs_doc)
    serialize_to_yaml('functions.yml', 'functions', doc_functions)
    serialize_to_yaml('globals.yml', 'external_globals', doc_globals)
