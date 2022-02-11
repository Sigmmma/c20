**Halo Script** (HSC), also known as **Blam Scripting Language** (BSL), is a
scripting language interpreted by the [Halo engine][engine]. It is used in two main contexts:

1. To control the mission structure and encounters of campaign missions. These scripts are embedded in the map/scenario.
2. In the interactive [developer console][h1/engine/developer-console] of Halo and Sapien, used when debugging and developing maps. This includes files executed at startup like `init.txt` and `editor_init.txt`. Script expressions entered this way are often called **commands**.

Script sources are denoted by the `.hsc` file extension.

If you are writing Halo Script using [Visual Studio Code][vscode], the [Atlas][] extension provides syntax highlighting and completion suggestions (supports H1-H3).

# Syntax
As a language, HSC is [Lisp-like][Lisp] and is comprised of [S-expressions][sexp], though it lacks some constructs like looping. This limitation also ensures that scripts never enter into endless loops that block the game's simulation from advancing.

## Expressions
Here's a basic HSC expression:

```hsc
(print "Hello, world!")
```

_Expressions_ are enclosed by parentheses and contain a _function_ name usually followed by _arguments_, all separated by spaces. Note that in the above example, `"Hello, world!"` The function name is always first, so to add two numbers you would write `(+ 1 2)` and **not** `(1 + 2)`. Not all functions need arguments, for example `(garbage_collect_now)`.

Expressions can also evaluate to a value of a certain type, depending on the function used. As a simple example, `(+ 1 2)` evaluates to `3`. You can then use expressions in place of arguments of other expressions:

```hsc
(/ 12 (+ 1 2))
```

If entered into Halo or Sapien's console, this would output "4.000000" as the result of dividing 12 by 3.

You must always balance opening parentheses with closing parentheses and you must use spaces to separate arguments and the function name. Some expressions which would not be allowed are `(/ 12 (+ 1 2)` and `(+(+1 2)3)`. To make it easier to tell if your parentheses are matched and to make your scenario scripts easier to read, it is recommended to use nested indentation for longer expressions like so:

```hsc
; equivalent to writing  (* (+ 10 2) (- 5 1))
(*
  (+ 10 2)
  (- 5 1)
)
```

## Value types
All function arguments and expression results have a particular _type_. The types vary by game, but some common types are:

| Type                          | Example                     |
| ----------------------------- | --------------------------- |
| boolean                       | `true`, `false`             |
| real (32-bit floating point)  | `12.5`, `-1234.0001`        |
| long (32-bit signed integer)  | `1000000000`, `-1000000000` |
| short (16-bit signed integer) | `12`, `-5`                  |
| string                        | `"hello, world!"`           |

Note that the `void` type you may see documented for some functions means the function does not return a value.

See game-specific pages for further reference, e.g. [H1 Scripting][h1/engine/scripting#value-types].

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
A _global variable_ is a value of a fixed [type](#value-types) that can be set and used by any [script thread](#script-threads) at any time. These variables are given a place in memory so they can be used by scripts over the course of gameplay and are saved in checkpoints. HaloScript did **not** have the notion of [local variables][local] until their introduction in Halo 4's iteration of Halo Script.

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

Halo 3 introduced script parameters to Halo Script. Parameters can only be defined on script types that accept return types (i.e. statics and stubs). 

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

See game-specific pages for further reference, e.g. [H1 Scripting][h1/engine/scripting#script-types].

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
Several functions from Halo 2 onwards allow the user to perform actions on all objects of a certain type (e.g. bipeds, vehicles etc) that are currently loaded in a scenario. These functions use long values to determine which object types should be referenced.

| Type Mask       | Object Type     |
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

| Type Mask       | Object Type                             |
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
[sexp]: https://en.wikipedia.org/wiki/S-expression
[Lisp]: https://en.wikipedia.org/wiki/Lisp_(programming_language)
[atlas]: https://marketplace.visualstudio.com/items?itemName=Crisp.atlas
[vscode]: https://code.visualstudio.com/
