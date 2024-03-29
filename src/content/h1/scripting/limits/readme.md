---
title: Gotchas and limits
---
This page lists the various limits and gotchas (hidden dangers) you should be aware of when writing scripts.

# Gotchas
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

# Limits
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

There is a limit to the total number of declared globals in your merged scenario, either 128 (HEK) or 512 (H1A). At runtime, the values of all scenario globals and [external globals](#external-globals) are stored in the [script globals datum array](~game-state#datum-arrays). Since the datum array can hold up to 1024 globals and there are nearly 500 external globals (depending on the game), H1A was able to safely expand the limit on scenario globals to 512.

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

These tag paths are not stored as strings once compiled, but rather as compact tag references [in the scenario](~scenario#tag-field-references). This also helps [Tool](~h1-tool) determine which tags the scenario depends on and need to be included in the built map.

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

There is not currently a reliable way to exactly tell when stack memory has been exceeded in [release](~blam#build-types) builds, but `play` and lower optimization levels will crash with `a problem occurred while executing the script <script name>: corrupted stack. (valid_thread(thread))`. You can use the [H1A standalone build](~h1-standalone-build) or Sapien to detect overflows.

## Console scripts
Things manually entered into the console ingame also share script space with the scenario's baked in scripts. In rare circumstances (e.g. you're just on the cusp of using too much memory), a console script's memory can overflow into a scenario script's memory, causing the above mentioned issues.