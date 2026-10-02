---
title: H3 scripting
keywords:
  - script
  - hsc
  - functions
  - globals
---
Like earlier games, Halo 3 supports **scripting** with [HaloScript](~general/scripting).

# Functions
Since H3 documentation will be an ongoing work-in-progress, please refer to the more complete [H1 scripting page](~h1/scripting) for info on common functions.

## Control
Functions related to controlling when and how scripts are executed
{% relatedHsc game="h3" only="functions" id="control-functions" tagFilter="control" /%}

## Logic & Comparison
Functions related to comparing multiple values or expressions and returning a value
{% relatedHsc game="h3" only="functions" id="control-functions" tagFilter="logic OR comp" /%}

## Math
Functions related to basic math operations between values or expressions
{% relatedHsc game="h3" only="functions" id="control-functions" tagFilter="math" /%}

## Trigger Volume
Functions related to the usage of trigger volumes, trigger volumes are created in [sapien](~h3-ek/h3-sapien)
{% relatedHsc game="h3" only="functions" id="control-functions" tagFilter="volume" /%}

## Zone Set
Functions related to the control and logic of zone sets, these are created in [guerilla](~h3-ek/h3-guerilla)
{% relatedHsc game="h3" only="functions" id="control-functions" tagFilter="zone_set" /%}

## Everything else
{% relatedHsc game="h3" only="functions" id="control-functions" tagFilter="NOT control AND NOT math AND NOT comp AND NOT logic AND NOT volume AND NOT zone_set" /%}

# External globals

## AI Globals
Functions related to the usage of trigger volumes, trigger volumes are created in [sapien](~)
{% relatedHsc game="h3" only="globals" id="external-globals" tagFilter="AI" /%}

## Everything Else
Functions related to the usage of trigger volumes, trigger volumes are created in [sapien](~)
{% relatedHsc game="h3" only="globals" id="external-globals" tagFilter="NOT AI" /%}


