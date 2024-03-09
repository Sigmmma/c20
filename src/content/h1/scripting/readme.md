---
title: Scripting
about: 'resource:h1/hsc'
img: bslbible.png
keywords:
  - script
  - hsc
  - bsl
thanks:
  kornman00: >-
    Original Blam Scripting Language Bible,
    http://www.modacity.net/docs/bslbible/
  Mimickal: 'Additional background on scripting, edits for clarity and extra information'
  t3h lag: 'Additional script information (limits, types, functionality, etc...)'
  Ifafudafi: Script limits information
  InfernoPlus: Flipped vehicle test
  Krevil: Modulus operator
redirects:
  - /h1/engine/scripting
---
**HaloScript** is a scripting language that H1 map designers can use to have greater control over how their map works. It is primarily used in controlling the mission structure of singleplayer maps, but can also be used to achieve certain effects in multiplayer, though AI is not synchronized.

To learn HaloScript basics see our [introduction page](~general/scripting). Reading the stock campaign scripts included with the H1A mod tools can also be a great way to learn.

# Compiling scripts into a scenario
Scripts live in a `data\...\your_level\scripts` folder and are text files ending with `.hsc`. With the newer H1A modding tools these scripts will be automatically compiled and added to the processed [scenario](~) tag when the level is loaded with the tools or built into a map.

Users of the legacy HEK must instead [use Sapien](~h1a-sapien#compile-scripts) to compile scripts before they will take effect.

# Extensions
Advanced users may be interested in the [Halo Script Preprocessor](~), which allows you to use C-like preprocessor directives like `#define`. Modders targeting [OpenSauce](~) also have access to additional non-standard scripting functions, although some of these are now present in H1A.

# Gotchas and limits
## Random functions in startup scripts
The script functions `begin_random`, `random_range`, and `real_random_range` use a [pseudorandom number generator][rng] which is [seeded][rng-seed] with a fixed value on the same tick that `startup` scripts run. This means the results of these random functions will always be the same if used at startup.

```hsc
(script startup mission
  (begin_random
    (begin (wake objective_a) (sleep_until (= 0 (ai_living_count obj_a_cov))))
    (begin (wake objective_b) (sleep_until (= 0 (ai_living_count obj_b_cov))))
    (begin (wake objective_c) (sleep_until (= 0 (ai_living_count obj_c_cov))))
  )
)
```

In the above example, the first expression selected by this `begin_random` will be the same. However, since each expression sleeps for a variable amount of time the subsequent expressions will appear more random.


## Syntax nodes
| Constant                             | HEK | H1A |
|--------------------------------------|-----|-----|
|`MAXIMUM_HS_SYNTAX_NODES_PER_SCENARIO`|19001|32767|

Syntax nodes, also called syntax data, are how scripts are represented [within the scenario tag](~scenario#tag-field-script-syntax-data) after they are compiled. Expressions and their values in the source script get compiled into compact nodes, but there is an upper limit on how many can be stored in the scenario.

If you exceed this limit, scripts will not compile. This limit is cumulative across both individual scenarios and child scenarios. So, even if the main scenario compiles, it might not work once you add its children (if its children have scripts of their own). If you hit this limit then your only choice is to remove some scripting from the level.

## Script declarations
| Constant                        | HEK | H1A |
|---------------------------------|-----|-----|
|`MAXIMUM_HS_SCRIPTS_PER_SCENARIO`|512  |1024 |

The total number of scripts (`startup`, `dormant`, etc...) is also limited. If you find yourself hitting this limit then you'll need to combine together multiple scripts or remove unnecessary ones. This could include "inlining" some static scripts.

## Globals
| Constant                        | HEK | H1A |
|---------------------------------|-----|-----|
|`MAXIMUM_HS_GLOBALS_PER_SCENARIO`|128  |512  |

There is a limit to the total number of declared globals in your merged scenario. The runtime state of scenario globals share space in the [script globals datum array](~game-state#datum-arrays) (limit of 1024) with [external globals](#external-globals), of which there are nearly 500 depending on the game.

## Source file size
| Constant                        | HEK | H1A |
|---------------------------------|-----|-----|
|`MAXIMUM_HS_SOURCE_DATA_PER_FILE`|256kb|1mb  |

The tools will not compile scripts for a source file above a certain size. Most projects will not be big enough to encounter this limit. If a single source file is getting too large, you can simply move some scripts to another source file as is common with the stock scenarios which separate cinematics from mission scripts.

As a last resort, you can remove comments and whitespace since they are not functional parts of the script but this will hurt the readability of your scripts. The [Halo Script Preprocessor](~) can help you strip comments from a source file.

## Number of source files
| Constant                             | HEK | H1A |
|--------------------------------------|-----|-----|
|`MAXIMUM_HS_SOURCE_FILES_PER_SCENARIO`| 8   | 16  |

A scenario's scripts can be split into multiple files, but the number of files you can have is limited.

Sapien silently fails to load all of the files if there are more than the limit. It loads the first 8/16 in some order ("asciibetical"?), then excludes the rest. No errors are thrown unless scripts fail to compile because of the excluded files.

## Tag references
| Constant                             | HEK | H1A |
|--------------------------------------|-----|-----|
|`MAXIMUM_HS_REFERENCES_PER_SCENARIO`  | 256 | 512 |

Various HS functions take [tag paths](~general/tags#tag-paths-and-references) as arguments, for example spawning an [effect](~) at a cutscene flag:

```hsc
(effect_new "effects\coop teleport" teleporting_flag)
```

These tag paths are not stored as strings once compiled, but rather as compact tag references [in the scenario](~scenario#tag-field-references). This also helps [Tool](~h1a-tool) determine which tags the scenario depends on and need to be included in the built map.

## String data
| Constant                             | HEK | H1A |
|--------------------------------------|-----|-----|
|`MAXIMUM_HS_STRING_DATA_PER_SCENARIO` |256kb|800kb|

Strings used in scripts are also stored [in the scenario](~scenario#tag-field-script-string-data). This could include parameters like [marker](~gbxmodel#markers) names:

```hsc
(objects_attach chief "right hand" ar1 "")
```

The total amount of string data from all the scenario's scripts must remain below the limit.

## Threads
Although you can declare [512 or 1024 scripts](#script-declarations), the [game state](~game-state#datum-arrays) supports at most **256** running threads, which static scripts wouldn't contribute to.

## Stack space
If you've never heard of a stack in the context of computer programming before,
[skim through this][stack]. Halo allocates 1280 bytes for each [scripting thread](~scripting#script-threads) in a scenario, called the "stack". Stack memory is used to hold results of invoking functions, parameters for script functions, and so on.

Notably, nesting function calls will consume additional stack memory. It is very, very easy to exceed the limits of this memory if you have enough nested statements. The maximum number of nested statements is somewhere between 10 and 16 levels deep, depending on if you're invoking static scripts, if you're invoking methods with parameters, and other things.

Avoid unncessary expressions; for example `(+ 1 (+ 2 3))` can be simplified to `(+ 1 2 3)` and `begin` isn't necessary to wrap a single expression or at the top-level of a script.

```hsc
; Nested statements are statements like these, where many
; things happen that are "nested" within one another

(if ;; some condition
  (begin
    (if ;; some condition
      (begin
        ;; ... do something
      )
    )
    ;; ... do something else
  )
)
```

{% alert type="danger" %}
**WARNING: The game *DOES NOT* guard against exceeding stack memory in release builds!!** If you exceed a script's stack memory, it will [overflow](http://en.wikipedia.org/wiki/Buffer_overflow) into other scripts' stack memory!
{% /alert %}

This means that one script can ***COMPLETELY*** break another script if it nests too deeply. If another script's memory is clobbered, it can end up doing arbitrary things. It might wake up when it's supposed to be asleep. It might switch to a new BSP for no reason. It might crash the game. It might make objects flicker randomly.

There is not currently a reliable way to exactly tell when stack memory has been exceeded in [release](~blam#build-types) builds, but `play` and lower optimization levels will crash with `a problem occurred while executing the script <script name>: corrupted stack. (valid_thread(thread))`. You can use the [H1A standalone build](~h1a-standalone-build) or Sapien to detect overflows.

## Console scripts
Things manually entered into the console ingame also share script space with the scenario's baked in scripts. In rare circumstances (e.g. you're just on the cusp of using too much memory), a console script's memory can overflow into a scenario script's memory, causing the above mentioned issues.

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
There are two integer variable types: `short` and `long`. Both hold whole numbers, but `long` variables can hold much larger numbers than `short` variables. It's worth noting both use the same amount of memory, so you should decide the type you use based on what range of values makes sense or the values the functions you call accept (avoids a [cast](~scripting#value-type-casting)). If you need to optimize memory usage you can use the [bitwise functions](~scripting#logic-and-comparison) to implement a [bitfield][].

# Functions
## Control
Control functions include waking and sleeping script theads and conditionally executing expressions.
{% relatedHsc game="h1" only="functions" id="control-functions" tagFilter="control" /%}

## Math
{% relatedHsc game="h1" only="functions" id="math-functions" tagFilter="math" /%}

### Modulo
You can create a [modulo/modulus operator](https://en.wikipedia.org/wiki/Modulo) with a static script and a global. The global is necessary because it forces a cast from `real` to `short`.

```hsc
(global short mod_buffer 0)

(script static short (mod (short x) (short y))
  (set mod_buffer (/ x y))
  (- x (* mod_buffer y))
)

(mod 10 3) ; returns 1
```


## Logic and comparison
These functions can be used to perform logical comparisons and bitwise integer operations. Bitwise functions are new to H1A only.

{% relatedHsc game="h1" only="functions" id="logic-functions" tagFilter="logic OR comp" /%}

## Other functions
All other functions are used for gameplay scripting purposes, such as controlling AI, cinematics, checkpoints, and more.

{% relatedHsc game="h1" only="functions" id="functions" tagFilter="NOT math AND NOT control AND NOT comp AND NOT logic" /%}

# External globals
_External globals_ are globals which belong to the engine itself, as opposed to declared in level scripts, are are typically used to toggle debug features. If manipulating them via scripts, you need to use `set`. From the [console](~developer-console) you can just set them like this:

```console
rasterizer_fog_atmosphere false
```

{% relatedHsc game="h1" only="globals" id="external-globals" /%}

# Removed
Some defunct parts of HaloScript were removed in H1A MCC. This is not a complete list.
{% relatedHsc game="h1" tagFilter="removed_in_mcc" /%}

[Lisp]: https://en.wikipedia.org/wiki/Lisp_(programming_language)
[c-format]: http://www.cplusplus.com/reference/cstdio/printf/
[rng]: https://en.wikipedia.org/wiki/Pseudorandom_number_generator
[rng-seed]: https://en.wikipedia.org/wiki/Random_seed
[stack]: http://en.wikipedia.org/wiki/Call_stack
[bitfield]: https://en.wikipedia.org/wiki/Bit_field
[cast]: https://en.wikipedia.org/wiki/Type_conversion
