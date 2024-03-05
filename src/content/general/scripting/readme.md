---
title: Scripting
keywords:
  - hsc
  - scripts
  - functions
  - globals
  - scripting
  - commands
  - bsl
thanks:
  Crisp: 'Engine differences, script parameter info, object type mask info'
redirects:
  - /general/engine/scripting
---
**HaloScript** (HS or HSC), sometimes called **Blam Scripting Language** (BSL), is a [Lisp-like][Lisp] scripting language interpreted by the various iterations of the [Halo engine](~blam). It's primarily used to control the mission structure and encounters of campaign missions when embedded in the map/scenario, but can also be entered interactively through the [developer console](~developer-console) found in Standalone, Sapien, and some Halo builds.

You won't need to do scripting unless you're modifying campaign scripts or creating new campaigns, but it helps to know a bit about HaloScript's syntax and expressions for use in the developer console.

# Tools
Script sources are denoted by the `.hsc` file extension, and are plain text files that you can edit with programs like notepad. However it's highly recommended to use a text editor like [Visual Studio Code][vscode]. The unofficial [HaloScript][] extension provides language support for all HaloScript versions present in *Halo: The Master Chief Collection*.

# Syntax
Here's a taste of HaloScript's syntax:

```hsc
(script continuous kill_player_in_zone
  (if (volume_test_object kill_volume (list_get (players) 0))
    (unit_kill (unit (list_get (players) 0)))
  )
)
```

This continuously checks if player 0 has walked into a trigger volume and kills them if they do. Don't worry if this doesn't make much sense yet, that's what this page is for!

## Expressions
A basic expression looks like this:

```hsc
(print "Hello, world!")
```

_Expressions_ are enclosed by parentheses and contain a _function_ name usually followed by _arguments_, all separated by spaces. In the above example the text is surrounded with `""` so it's treated like a single argument.

The function name is always first, so to add two numbers you would write `(+ 1 2)` and **not** `(1 + 2)`. Each function implemented by the engine has an expected order and type of arguments that it can be given. Some don't need arguments, like `(garbage_collect_now)`, while others may handle a varying number of arguments like `(+ 1 2)` and `(+ 1 2 3 4)`.

Expressions can also evaluate to a value of a certain type depending on the function used. As a simple example, `(+ 1 2)` evaluates to `3`. You can then use expressions as arguments to other expressions:

```hsc
(/ 12 (+ 1 2))
```

If entered into Standalone or Sapien's console, this would output `4.000000`.

You must always balance opening parentheses with closing parentheses and use spaces to separate arguments and the function name; expressions like `(/ 12 (+ 1 2)` and `(+(+1 2)3)` are not valid. To make it easier to tell if your parentheses are matched and to make your scenario scripts easier to read, it is recommended to use nested indentation for longer expressions like so:

```hsc
; equivalent to writing  (* (+ 10 2) (- 5 1))
(*
  (+ 10 2)
  (- 5 1)
)
```

## Control flow
HS does not support [looping][loops] constructs, which ensures that scripts never enter into endless loops that block the game's simulation from advancing.

## Value types
All function arguments and expression results have a particular _type_. The types vary by game (e.g. [H1](~h1/scripting#value-types)), but some common types are:

| Type                          | Example                     |
| ----------------------------- | --------------------------- |
| boolean                       | `true`, `false`             |
| real (32-bit floating point)  | `12.5`, `-1234.0001`        |
| long (32-bit signed integer)  | `1000000000`, `-1000000000` |
| short (16-bit signed integer) | `12`, `-5`                  |
| string                        | `"hello, world!"`           |

Note that the `void` type you may see documented for some functions means the function does not return a value.

## Comments
You can include comments in your scenario script files:

```hsc
; this is a comment
(print "Hello, world!")

;*
this is a block comment
with multiple lines
*;
(print "Goodbye, world!")
```

## Global variables
A _global variable_ is a value of a fixed [type](#value-types) that can be set and used by any [script thread](#script-threads) at any time. These variables are given a place in memory so they can be used by scripts over the course of gameplay and are saved in checkpoints. HaloScript did **not** have the notion of [local variables][local] until their introduction in Halo 4's iteration of HaloScript.

You can only declare globals within scenario scripts. Global variables cannot be declared in the developer console, though you can use or update any that were already initialized by the loaded scenario.

To declare a global variable:
```hsc
(global <global type> <global name> <value(s)>)
; example:
(global boolean completed_objective_b false)
```

To set a global:
```hsc
; mark the objective as completed
(set completed_objective_b true)
```

To use a global:
```hsc
; this will evaluate to true only if both objectives are completed:
(and completed_objective_a completed_objective_b)
; prints the value of a global, useful for troubleshooting in-game:
(inspect completed_objective_b)
```

Globals declared by scenario scripts are called _internal globals_. Halo also has built-in globals that belong to the engine itself called _external globals_. These are for toggling debug features of the engine and testing maps, like `cheat_deathless_player` and `debug_objects`.

## Declaring scripts
Firstly, a bit of terminology. The word "script" is a bit overloaded. Modders often collectively call all scripting in a level its "scripts". This may have been compiled from multiple source `.hsc` files, each of which could also be called a script.

However, HaloScript has a specific concept called a _script_, which is sequence of expressions that are executed according to the script's type by the engine. These can be declared in scenario scripts but not the developer console.

Scripts have the following structure:
```hsc
(script <script type> <return type (static scripts only)> <script name>
  <code>
)

; can be called as (player0) from any other script
(script static "unit" player0
  (unit (list_get (players) 0))
)
; runs every tick to check if players are in a volume and kill them
(script continuous kill_players_in_zone
  (if (volume_test_object kill_volume (list_get (players) 0))
    ; note the call to the player0 static script here
    (unit_kill (player0))
  )
  (if (volume_test_object kill_volume (list_get (players) 1))
    (unit_kill (unit (list_get (players) 1)))
  )
)
```

Script types vary by engine, but the common ones are:

* `continuous`: Runs every tick (simulation frame of the engine).
* `dormant`: Initially asleep until started with `(wake <script_name>)`, runs until there are no instructions left, then stops. Waking a second time will not restart the script.
* `startup`: Begins running at the start of the level and only runs once.
* `command_script`: Runs when executed by an ai. Allows the use of special external globals like `ai_current_actor` and `ai_current_squad` which return information about the ai executing the script. This is the only script type which allows the use of cs_ functions (e.g. `cs_go_to`, `cs_play_line`).
* `static`: Can be called by another script and return a value. Useful for re-usable code -- similar to _methods/functions_ from other programming languages.

Halo 3 introduced script parameters to HaloScript. Parameters can only be defined on script types that accept return types (i.e. statics and stubs).

These have the following structure:

```hsc
(script <script type> <return type> (<script name> [(<value type> <parameter name>)])
  <code>
)
```

Scripts can have multiple parameters, and each parameter should be enclosed in a set of parethesis.

Parameters are declared when calling the script.

```hsc
(script static void (player_scaler (object a_player) (real scale) (string str))
    (object_set_scale a_player scale 1)
    (unit_set_maximum_vitality (unit a_player) (* 35 scale) (* 75 scale))
    (unit_set_current_vitality (unit a_player) (* 35 scale) (* 75 scale))
    (print str)
)

(script startup start
    (player_scaler (list_get (players) 0) 3 "player 0 scaled")
    (player_scaler (list_get (players) 1) 2.5 "player 1 scaled")
    (player_scaler (list_get (players) 2) 2 "player 2 scaled")
    (player_scaler (list_get (players) 3) 1.5 "player 3 scaled")
)
```

Note that a parameter name can be anything the user declares so long as it is not already a global / script name or already used by the engine (e.g. value types or function names). Parameters are local to the static script they are named in, so multiple scripts can utilise the same parameter names without affecting one another.

See game-specific pages for further reference, e.g. [H1 Scripting](~h1/scripting#declaring-scripts).

# Mechanics
## Value type casting
HaloScript supports converting data from one type to another, this is called [type casting][cast] or just _casting_. Type casting in HaloScript is done automatically when needed but it's good to keep it in mind as not all types can be converted. Passthrough can be converted to any type and void can be converted to from any type. They are however not the inverse of each other as void destroys the data during conversion.

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

## Script threads
HSC has the notion of threads, i.e. multiple scripts running at the same time (as opposed to waiting until the previous script is done to run). This is not *actual* multithreading (the game still run scripts on a single CPU core). Continuous, dormant, and startup scripts all run in their own threads. Static scripts do not run in their own thread, by virtue of being called by other scripts. For example, a `sleep` within a static script will put the thread of the calling script to sleep. Multiple threads can call the same static script at the same time with no issue. Every thread has its own [stack][stack].

## Implicit returns
Several control structures implicitly return the value of their final expression to the caller. This applies to `if`, `else`, `begin`, `begin_random`, and `cond` blocks, as well as `static` scripts.

```hsc
; The second condition is true, so 6 will be returned from
; the cond block, since it is the final expression.
(cond
  (
    (= 0 1)
    (begin (print "I will never run") 5)
  )
  (
    (= 1 1)
    (begin (print "I will always run!") 6)
  )
  (
    (= 2 2)
    (begin (print "I would run if the code above me hadn't.") 7)
  )
)
```

## Object type masks
Several functions from Halo 2 onwards allow the user to perform actions on all objects of a certain type (e.g. bipeds, vehicles etc) that are currently loaded in a scenario. These functions use `long` values to determine which object types should be referenced.

| Type mask       | Object type     |
| ----------------| --------------- |
| 1               | biped           |
| 2               | vehicle         |
| 4               | weapon          |
| 8               | equipment       |
| 1024            | crate           |

These values can be added together to affect multiple object types at once. For example, using the function `(object_destroy_type_mask 5)` would destroy all bipeds and weapons loaded on a map. Both 0 and 1039 will destroy all objects of the above listed types. The functions which support this are:

```hsc
(<object_list> volume_return_objects_by_type <trigger_volume> <type_mask>) ; Halo 2 onwards
(<void> object_destroy_type_mask <type_mask>) ; Halo 2 onwards
(<void> add_recycling_volume_by_type <trigger_volume> <long> <long> <type_mask>) ; Halo Reach onwards
(<void> add_offscreen_recycling_volume_by_type <trigger_volume> <long> <long> <type_mask>) ; Halo 4 onwards
```
Below is a full listing of object type mask combinations:

| Type mask       | Object types                            |
| ----------------| ---------------                         |
| 0               | biped, vehicle, weapon, equipment, crate|
| 1               | biped                                   |
| 2               | vehicle                                 |
| 3               | biped, vehicle                          |
| 4               | weapon                                  |
| 5               | biped, weapon                           |
| 6               | vehicle, weapon                         |
| 7               | biped, vehicle, weapon                  |
| 8               | equipment                               |
| 9               | biped, equipment                        |
| 10              | vehicle, equipment                      |
| 11              | biped, vehicle, equipment               |
| 12              | weapon, equipment                       |
| 13              | biped, weapon, equipment                |
| 14              | vehicle, weapon, equipment              |
| 15              | biped, vehicle, weapon, equipment       |
| 1024            | crate                                   |
| 1025            | biped, crate                            |
| 1026            | vehicle, crate                          |
| 1027            | biped, vehicle, crate                   |
| 1028            | weapon, crate                           |
| 1029            | biped, weapon, crate                    |
| 1030            | vehicle, weapon, crate                  |
| 1031            | biped, vehicle, weapon, crate           |
| 1032            | equipment, crate                        |
| 1033            | biped, equipment, crate                 |
| 1034            | vehicle, equipment, crate               |
| 1035            | biped, vehicle, equipment, crate        |
| 1036            | weapon, equipment, crate                |
| 1037            | biped, weapon, equipment, crate         |
| 1038            | vehicle, weapon, equipment, crate       |
| 1039            | biped, vehicle, weapon, equipment, crate|

[local]: https://en.wikipedia.org/wiki/Local_variable
[cast]: https://en.wikipedia.org/wiki/Type_conversion
[stack]: http://en.wikipedia.org/wiki/Call_stack
[sexp]: https://en.wikipedia.org/wiki/S-expression#Use_in_Lisp
[Lisp]: https://en.wikipedia.org/wiki/Lisp_(programming_language)
[HaloScript]: https://marketplace.visualstudio.com/items?itemName=Crisp.atlas
[vscode]: https://code.visualstudio.com/
[loops]: https://en.wikipedia.org/wiki/Control_flow#Loops