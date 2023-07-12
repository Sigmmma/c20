---
title: H1 scripting
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
---
**Halo Script** is a scripting language that H1 map designers can use to have greater control over how their map works. It is primarily used in controlling the mission structure of single player maps, but can also be used to achieve certain effects in multiplayer, such as [synchronizing workarounds](~sync-workarounds).

Scripts must be compiled into the [scenario](~) of a [map](~) using [Sapien](~) when using the legacy HEK, but the H1A modding tools now compile scripts on map build and loading the scenario in Standalone using the script sources themselves.

# Compiling a script into a scenario
Sapien searches for scripts in the data version of your scenario's path. For
example, if your scenario is `tags\levels\test\tutorial\tutorial.scenario`, you
would place your script file in `data\levels\test\tutorial\scripts\`.
Your script file can be named anything, but must have a `.hsc` file extension.

Open your scenario in Sapien, then under the file menu, click "Compile Scripts".
If there are any compilation errors, Sapien will display them in the Game View
screen.

# Gotchas and limits
## Using begin_random in startup scripts
The [random number generator][rng] used for things like `begin_random` is
[seeded][rng-seed] on the same tick that `startup` scripts run. This means the
first expression selected by a `begin_random` block in a `startup` script will
always be the same. Generally since the first expression will take a variable
amount of time to complete evaluation, the following items will be random as
expected.

## Syntax nodes are limited
Syntax nodes are sections of memory that the game allocates to handle the
structure of scripts when it compiles them. Syntax data is stuff like
parentheses, function names, variable names... anything that has syntactic
meaning for the script system.

The maximum number of syntax nodes that the game can allocate when
compiling scripts is **19001** in legacy and **32767** (SHORT_MAX) in H1A.

If you exceed this limit, scripts will not compile. This
limit is cumulative across both individual scenarios and child scenarios.
So, even if the main scenario compiles, it might not work once you add its
children (if its children have scripts of their own). If you hit this limit,
your only choice is to remove some syntax data. It can come from anywhere, but
something has to go. This can sometimes be a long and painful process.

## Total scripts and globals are limited
In addition to syntax nodes, the total number of globals and scripts (`startup`,
`dormant`, etc...) is also limited.

| Type    | Legacy limit | H1A limit |
|---------|--------------|-----------|
| scripts | 512          | 1024      |
| globals | 128          | 512       |
| threads | 256          | -         |

## Source file size is limited
The game will not compile scripts for a source file above a given size. Comments
and whitespace **are** counted in this size! If you hit this limit, you can
either remove stuff from the script, or move stuff from one source file
into another source file. Comments and unnecessary whitespace are non-functional
things that can be removed to reduce size, but only do this if you *need* to!

{% alert %}
Comments and indentation are important for understanding your own scripts. Most
projects will not be big enough to need to worry about exceeding source file
size, so good coding conventions should be used until they can't be!

Tools like the Halo Script Preprocessor (see below) can strip comments and
whitespace in the final script, while keeping them in your source file.
{% /alert %}

## Number of source files is limited
A scenario's scripts can be split into multiple files, but the number of files
you can have is limited to 8.

{% alert %}
Sapien silently fails to load all of the files if there are more than 8. It
loads the first 8 in some determined order ("asciibetical"?), then excludes the
rest. No errors are thrown unless scripts fail to compile because of the
excluded files.
{% /alert %}

## Stack space is limited
If you've never heard of a stack in the context of computer programming before,
[skim through this][stack]. Halo allocates a certain amount of memory for each [scripting thread](~scripting#script-threads) in a scenario, called the "stack". Stack memory is used to hold results of invoking functions, parameters for script functions, and so on. Notably, nesting function calls will consume additional stack memory.

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

It is very, very easy to exceed the limits of this memory if you have enough nested statements. The maximum number of nested statements is somewhere between 10 and 16 levels deep, depending on if you're invoking static scripts, if you're invoking methods with parameters, and other things.

{% alert type="danger" %}
**WARNING: The game *DOES NOT* guard against exceeding stack memory in release builds!!** If you exceed a script's stack memory, it will [overflow](http://en.wikipedia.org/wiki/Buffer_overflow) into other scripts' stack memory!
{% /alert %}

This means that one script can ***COMPLETELY*** break another script if it nests too deeply. If another script's memory is clobbered, it can end up doing arbitrary things. It might wake up when it's supposed to be asleep. It might switch to a new BSP for no reason. It might crash the game. It might make objects flicker randomly.

There is not currently a reliable way to exactly tell when stack memory has been exceeded in [release](~build-types) builds, but `play` and lower optimization levels will crash with `a problem occurred while executing the script <script name>: corrupted stack. (valid_thread(thread))`. You can use the [H1A standalone build](~h1a-standalone-build) or Sapien to detect overflows.

## Console scripts
Things manually entered into the console ingame also share script space with the scenario's baked in scripts. In rare circumstances (e.g. you're just on the cusp of using too much memory), a console script's memory can overflow into a scenario script's memory, causing the above mentioned issues.

## When to use short vs long
There are two integer variable types: `short` and `long`. Both hold whole numbers, but `long` variables can hold much larger numbers than `short` variables. It's worth noting both use the same amount of memory, so you should decide the type you use based on what range of values makes sense or the values the functions you call accept (avoids a [cast](~scripting#value-type-casting)).

If you need to optimize memory usage you can use the bitwise functions to implement a [bitfield][].


# Extensions
The [Halo Script Preprocessor][hsc-pre] is effectively a super-set of Halo Script that adds support for C-like `#define` pre-processor macros. The program takes a file with macros in it, then spits out a standard HSC file. This means this program is *purely* for making writing HSC easier. Scripts using the Halo Script Preprocessor are still subject to all of the above limits.

For example, the following block:
```hsc
#define UNIT_IN_COMBAT (= 6 (ai_command_list_status my_unit))

(if UNIT_IN_COMBAT
  (sleep 30)
)
```
...becomes this:
```hsc
(if (= 6 (ai_command_list_status my_unit))
  (sleep 30)
)
```

# HSC reference
To learn more about HSC's general syntax and execution model, see our [cross-game scripting page](~general/engine/scripting). There is also [additional important script engine info below](~scripting#gotchas-and-limits).

## Script types
{% dataTable
  dataPath="script_types/script_types"
  linkCol=0
  columns=[
    {name: "Type", key: "type", format: "code"},
    {name: "Comments", key: "info/en"},
    {name: "Example", key: "ex", format: "codeblock-hsc", style: "width:50%"}
  ]
/%}

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

## Keywords
{% dataTable
  dataPath="keywords/keywords"
  linkCol=true
  linkSlugKey="slug"
  columns=[
    {name: "Keyword", key: "info/en"}
  ]
/%}

## Control
{% relatedHsc game="h1" only="functions" tagFilter="control" /%}

## Math
{% relatedHsc game="h1" only="functions" tagFilter="math" /%}

## Logic and comparison
{% relatedHsc game="h1" only="functions" tagFilter="logic OR comp" /%}

## Functions
{% relatedHsc game="h1" only="functions" tagFilter="NOT math AND NOT control AND NOT comp AND NOT logic" /%}

## External globals
{% relatedHsc game="h1" only="globals" /%}

## Removed
{% relatedHsc game="h1" tagFilter="removed_in_mcc" /%}

[Lisp]: https://en.wikipedia.org/wiki/Lisp_(programming_language)
[c-format]: http://www.cplusplus.com/reference/cstdio/printf/
[rng]: https://en.wikipedia.org/wiki/Pseudorandom_number_generator
[rng-seed]: https://en.wikipedia.org/wiki/Random_seed
[stack]: http://en.wikipedia.org/wiki/Call_stack
[hsc-pre]: http://hce.halomaps.org/index.cfm?fid=6552
[bitfield]: https://en.wikipedia.org/wiki/Bit_field
[cast]: https://en.wikipedia.org/wiki/Type_conversion
