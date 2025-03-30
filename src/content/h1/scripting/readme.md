---
title: Scripting
about: 'resource:h1/hsc'
icon: guide
img: bslbible.png
caption: |-
  Second edition.
keywords:
  - script
  - hsc
  - bsl
thanks:
  kornman00: >-
    Writing the original [Blam Scripting Language Bible](http://www.modacity.net/docs/bslbible/), explaining garbage collection
  Mimickal: 'Additional background on scripting, edits for clarity and extra information'
  t3h lag: 'Additional script information (limits, types, functionality, etc...)'
  Ifafudafi: Script limits information
  InfernoPlus: Flipped vehicle test
  Krevil: Modulus operator
  MattDratt: AI following the player tutorial
  aLTis: Scripting tips
redirects:
  - /h1/engine/scripting
childOrder:
  - limits
  - advanced-scripting
---
**HaloScript** is a scripting language that H1 map designers can use to have greater control over how their map works. It is primarily used in controlling the mission structure of singleplayer maps, but can also be used to achieve certain effects in multiplayer, though AI is not synchronized.

To learn HaloScript basics see our [introduction page](~general/scripting) and a list of [gotchas and limits](~limits). Reading the stock campaign scripts included with the H1A mod tools can also be a great way to learn.

# Compiling scripts into a scenario
Scripts source files end with `.hsc` and live in a `data\...\your_level\scripts` folder. You're limited with the [number](~limits#number-of-source-files) and [size](~limits#source-file-size) of these files. With the newer H1A modding tools these scripts will be automatically compiled and added to the processed [scenario](~) tag when the level is loaded with the tools or built into a map.

Users of the legacy HEK must instead [use Sapien](~h1-sapien#compile-scripts) to compile scripts before they will take effect.

# Extensions
Advanced users may be interested in the [Halo Script Preprocessor](~), which allows you to use C-like preprocessor directives like `#define`. Modders targeting [OpenSauce](~) also have access to additional non-standard scripting functions, although some of these are now present in H1A.

# HSC reference
To learn more about HSC's general syntax and execution model, see our [cross-game scripting page](~general/scripting).

## Declaring scripts
Within a script source file you can delcare multiple _scripts_ which contain a series of expressions. There are different types of scripts which run at different times:

{% dataTable
  dataPath="script_types/script_types"
  linkCol=0
  columns=[
    {name: "Type", key: "type", format: "code"},
    {name: "Comments", key: "info/en"},
    {name: "Example", key: "ex", format: "codeblock-hsc", style: "width:50%"}
  ]
/%}

The number of scripts you can declare [is limited](~limits#script-declarations).

## Declaring globals
_Globals_ are variables that can be read and set by your scripts. They exist for the lifetime of the level so can be used to store state related to a mission, or commonly used constant values that you want to declare once and reuse. Globals must be declared before they are used:

```hsc
(global <value type> <name> <inital value>)
```

Globals for stock levels are typically declared in the `base_*.hsc` file but used in the `mission_*.hsc` and/or `cinematics_*.hsc` files, but there is no requirement that you separate them this way. Here are some examples from a30's scripts:

```hsc
(global long delay_calm (* 30 3)) ; 3 seconds
(global boolean global_rubble_end false)

(script dormant mission_rubble
  ; ...
  (set global_rubble_end true)
)

(script dormant mission_river
  ; ...
  (sleep delay_calm)
  (if (and global_rubble_end global_cliff_end) (set play_music_a30_07 true))
)
```

The number of globals you can declare [is limited](~limits#globals).

## Value types
{% dataTable
  dataPath="value_types/value_types"
  linkCol=0
  columns=[
    {name: "Type", key: "type", format: "code"},
    {name: "Details", key: "info/en"},
    {name: "Example", key: "ex"}
  ]
/%}

### When to use short vs long
There are two integer variable types: `short` and `long`. Both hold whole numbers, but `long` variables can hold much larger numbers than `short` variables. It's worth noting both use the same amount of memory, so you should decide the type you use based on what range of values makes sense or the values the functions you call accept (avoids a [cast](~general/scripting#value-type-casting)). If you need to optimize memory usage you can use the [bitwise functions](~scripting#logic-and-comparison) to implement a [bitfield][].

# Functions
## Control
Control functions include waking and sleeping script theads and conditionally executing expressions.
{% relatedHsc game="h1" only="functions" id="control-functions" tagFilter="control" /%}

See also [advanced control](~advanced-scripting#control) methods.

## Math
{% relatedHsc game="h1" only="functions" id="math-functions" tagFilter="math" /%}

Other [unsupported math operations](~advanced-scripting#math) can be built using functions the game does support.

## Logic and comparison
These functions can be used to perform logical comparisons and bitwise integer operations. Bitwise functions are new to H1A only.

{% relatedHsc game="h1" only="functions" id="logic-functions" tagFilter="logic OR comp" /%}

## Server functions
These functions apply to running a dedicated server or locally-hosted server for Custom Edition/PC retail.

{% relatedHsc game="h1" only="functions" id="server-functions" tagFilter="server" /%}

## Other functions
All other functions are used for debugging and gameplay scripting purposes, such as controlling AI, cinematics, checkpoints, and more.

{% relatedHsc game="h1" only="functions" id="functions" tagFilter="NOT math AND NOT control AND NOT comp AND NOT logic AND NOT server" /%}

# External globals
_External globals_ are globals which belong to the engine itself, as opposed to [declared in level scripts](#declaring-globals), are are typically used to toggle debug features. If manipulating them via scripts, you need to use `set`. From the [console](~developer-console) you can just set them like this:

```console
rasterizer_fog_atmosphere false
```

{% relatedHsc game="h1" only="globals" id="external-globals" /%}

# Removed
Some defunct parts of HaloScript were removed in H1A MCC. This is not a complete list.
{% relatedHsc game="h1" tagFilter="removed_in_mcc" /%}

[Lisp]: https://en.wikipedia.org/wiki/Lisp_(programming_language)
[c-format]: http://www.cplusplus.com/reference/cstdio/printf/
[bitfield]: https://en.wikipedia.org/wiki/Bit_field
[cast]: https://en.wikipedia.org/wiki/Type_conversion
