**Halo Script** (HSC), also known as **Blam Scripting Language** (BSL), is a
scripting language that map designers can use to have greater control over how
their map works. It is primarily used in controlling the mission structure of
single player maps, but can also be used to achieve certain effects in
multiplayer, such as synchronizing destructable vehicles.

Halo Script is based on [Lisp][].
Scripts are compiled into the [scenario][] of a [map][] using [Sapien][].
Scripts can be extracted from a scenario using [Refinery][].


# Compiling a script into a scenario
Sapien searches for scripts in the data version of your scenario's path. For
example, if your scenario is `tags\levels\test\tutorial\tutorial.scenario`, you
would place your script file in `data\levels\test\tutorial\scripts\`.
Your script file can be named anything, but must have a `.hsc` file extension.

Open your scenario in Sapien, then under the file menu, click "Compile Scripts".
If there are any compilation errors, Sapien will display them in the Game View
screen.


# HSC reference
[Additional important script engine info below][scripting#gotchas-and-limits]

## Basics
Scripts have the following structure:
```hsc
(script <script type> <return type (static scripts only)> <script name>
  <code>
)
```

Example:
```hsc
(script startup say_this_map_r0x
  (sv_say "This map r0xx0rz!")
)
```

Global variables are defined with the following syntax:
```hsc
(global <global type> <global name> <value(s)>)
```

Example:
```hsc
(global boolean kornman_is_leet true)
```

## Script types
```.table
tableDataModule: hsc/h1/hsc
tableName: ScriptTypes
rowLinks: true
```

## Value types
```.table
tableDataModule: hsc/h1/hsc
tableName: ValueTypes
rowLinks: true
```

### Value type casting

HaloScript supports converting data from one type to another, this is called [type casting][cast] or just casting. Type casting in HaloScript is done automatically when needed but it's good to keep it in mind as not all types can be converted. Passthrough can be converted to any type and void can be converted to from any type. They are however not the inverse of each other as void destroys the data during conversion.

The rules for object name types are equivalent to the matching object types. Object names can be converted to the equivalent object. 

| Target Type     | Source type(s)            | 
| --------------- | ----------------          |
| boolean         | real, long, short, string |
| real            | any enum, short, long     |
| long            | short, real               |
| short           | long, real                |
| object_list     | any object or object_name |
| void            | any type                  |
| any type        | passthrough               |
| object          | an other object type      |
| unit            | vehicle                   |

## Operators and keywords
```.table
tableDataModule: hsc/h1/hsc
tableName: OperatorsAndKeywords
rowLinks: true
```


## Functions
```.table
tableDataModule: hsc/h1/hsc
tableName: Functions
rowLinks: true
rowSortKey: slug
```


## Mechanics

### Script threads
HSC has the notion of threads, i.e. multiple scripts running at the same time
(as opposed to waiting until the previous script is done to run). This is not
*actual* multithreading (the game still runs on a single CPU core). Continuous,
dormant, and startup scripts all run in their own threads. Static scripts do not
run in their own thread, by virtue of being called by other scripts. For
example, a `sleep` within a static script will put the thread of the calling
script to sleep. Multiple threads can call the same static script at the same
time with no issue. Every thread has its own [stack][stack].

### Implicit returns
Several control structures implicitly return the value of their final expression
to the caller. This applies to `if`, `else`, `begin`, `begin_random`, and `cond`
blocks, as well as `static` scripts.

```hsc
; The second condition is true, so 6 will be returned from
; the cond block, since it is the final expression.
(cond
  (
    (= 0 1)
    (print "I will never run")
    5
  )
  (
    (= 1 1)
    (print "I will always run!")
    6
  )
  (
    (= 2 2)
    (print "I would run if the code above me hadn't.")
    7
  )
)
```

# Gotchas and limits
## Using begin_random in startup scripts
The [random number generator][rng] used for things like `begin_random` is
[seeded][rng-seed] on the same tick that `startup` scripts run. This means the
first expression selected by a `begin_random` block in a `startup` script will
always be the same. Generally since the first expression will take a variable
amount of time to complete evaluation, the following items will be random as
expected.

## Syntax nodes are limited
```.alert
The exact limit of syntax nodes is not currently known.
```

Syntax nodes are sections of memory that the game allocates to handle the
structure of scripts when it compiles them. Syntax data is stuff like
parentheses, function names, variable names... anything that has syntactic
meaning for the script system.

There is a maximum number of syntax nodes that the game can allocate when
compiling scripts. If you exceed this limit, scripts will not compile. This
limit is cumulative across both individual scenarios and child scenarios.
So, even if the main scenario compiles, it might not work once you add its
children (if its children have scripts of their own). If you hit this limit,
your only choice is to remove some syntax data. It can come from anywhere, but
something has to go. This can sometimes be a long and painful process.

## Total scripts and globals are limited
In addition to syntax nodes, the total number of globals and scripts (`startup`,
`dormant`, etc...) is also limited.

| Type    | Limit |
|---------|-------|
| scripts | 1024  |
| globals |  128  |
| threads |  256  |

## Source file size is limited
The game will not compile scripts for a source file above a given size. Comments
and whitespace **are** counted in this size! If you hit this limit, you can
either remove stuff from the script, or move stuff from one source file
into another source file. Comments and unnecessary whitespace are non-functional
things that can be removed to reduce size, but only do this if you *need* to!

```.alert
Comments and indentation are important for understanding your own scripts. Most
projects will not be big enough to need to worry about exceeding source file
size, so good coding conventions should be used until they can't be!

Tools like the Halo Script Preprocessor (see below) can strip comments and
whitespace in the final script, while keeping them in your source file.
```

## Number of source files is limited
A scenario's scripts can be split into multiple files, but the number of files
you can have is limited to 8.

```.alert
Sapien silently fails to load all of the files if there are more than 8. It
loads the first 8 in some determined order ("asciibetical"?), then excludes the
rest. No errors are thrown unless scripts fail to compile because of the
excluded files.
```

## Stack space is limited
If you've never heard of a stack in the context of computer programming before,
[skim through this][stack].

Halo allocates a certain amount of memory for each [scripting
thread][scripting#script-threads] in a scenario, called the "stack". Stack
memory is used to hold results of invoking functions, parameters for script
functions, and so on. Notably, nesting function calls will consume additional
stack memory.

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

It is very, very easy to exceed the limits of this memory if you have enough
nested statements. The maximum number of nested statements is somewhere between
10 and 16 levels deep, depending on if you're invoking static scripts, if you're
invoking methods with parameters, and other things.

```.alert danger
**WARNING: The game *DOES NOT* guard against exceeding stack memory in release builds!!**

If you exceed a script's stack memory, it will
[overflow](http://en.wikipedia.org/wiki/Buffer_overflow) into other scripts'
stack memory!
```

This means that one script can ***COMPLETELY*** break another script if it
nests too deeply. If another script's memory is clobbered, it can end up doing
arbitrary things. It might wake up when it's supposed to be asleep. It might
switch to a new BSP for no reason. It might crash the game. It might make
objects flicker randomly.

```.alert danger
There is not currently a reliable way to exactly tell when stack memory has been
exceeded in [release][build-types] builds. `play` and lower optimization levels will crash with `a problem occurred while executing the script <script name>: corrupted stack. (valid_thread(thread))`. 
You can use the [H1A standalone build][h1a-standalone-build] or Sapien to detect overflows.
```

## Console scripts
Things manually entered into the console ingame also share script space with the
scenario's baked in scripts. In rare circumstances (e.g. you're just on the cusp
of using too much memory), a console script's memory can overflow into a
scenario script's memory, causing the above mentioned issues.

## When to use short vs long
There are two integer variable types: `short` and `long`. Both hold whole
numbers, but `long` variables can hold much larger numbers than `short`
variables. It's worth noting both use the same amount of memory, 
so you should decide the type you use based on what range of values makes sense or the values the functions you call accept (avoids a [cast][scripting#value-type-casting]).

If you need to optimize memory usage you can use the bitwise functions to implement a [bitfield][].


# Extensions
The [Halo Script Preprocessor][hsc-pre] is effectively a super-set of Halo
Script that adds support for C-like `#define` pre-processor macros. The program
takes a file with macros in it, then spits out a standard HSC file. This means
this program is *purely* for making writing HSC easier. Scripts using the Halo
Script Preprocessor are still subject to all of the above limits.

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

[Lisp]: https://en.wikipedia.org/wiki/Lisp_(programming_language)
[c-format]: http://www.cplusplus.com/reference/cstdio/printf/
[rng]: https://en.wikipedia.org/wiki/Pseudorandom_number_generator
[rng-seed]: https://en.wikipedia.org/wiki/Random_seed
[stack]: http://en.wikipedia.org/wiki/Call_stack
[hsc-pre]: http://hce.halomaps.org/index.cfm?fid=6552
[bitfield]: https://en.wikipedia.org/wiki/Bit_field
[cast]: https://en.wikipedia.org/wiki/Type_conversion
