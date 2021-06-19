The **developer console** is a text-based interface accessible within [Sapien][h1a-sapien], in H1CE if enabled, and in the [H1A standalone build][h1a-standalone-build]. It allows you to enter commands and [Halo Script][scripting] in order to visually troubleshoot and test level content and game systems like the [renderer][], [physics engine][physics-engine], and [AI][].

Not all commands are available in all contexts -- for example, the `radiosity_*` commands used to build lightmaps can only be found in Sapien. Others may be present in the command list, but only have an effect in Sapien or the H1A standalone build.

# Usage
The console is opened and closed with the <kbd>~</kbd> (tilde) key, usually found above <kbd>Tab</kbd> on a US keyboard. The console is enabled in [Sapien][h1a-sapien] and [H1A standalone][h1a-standalone-build], but to use the console in H1CE you must either launch the game with the `-console` [argument][arguments#other] (and optionally `-devmode` to access cheat commands, which will disable multiplayer) or use a mod like [Chimera][] which can enable these features for you while retaining multiplayer functionality. For Sapien, ensure the _Game window_ is focused first.

Commands are then entered into the console by providing their name, then their [argument(s)][scripting#value-types] separated by spaces:

```console
; You do NOT need to enclose the command in parentheses
cheat_super_jump 1
debug_camera_save
physics_set_gravity 0.5 ;h1a only
units_set_current_vitality (players) 75 75
```

Keys you should know are:
* Press <kbd>Enter</kbd> to run a command once inputted.
* Press <kbd>Tab</kbd> to see completions of partially-entered functions and global names.
* Use <kbd>Right Click</kbd> to paste clipboard contents into the console.
* [H1A tools][h1a-ek] support the <kbd>Home</kbd> and <kbd>End</kbd> keys to move the cursor to the start and end of the line.

Helpful commands:
* `help <function name>` to get argument information.
* `cls` for clearing output from the screen.


# Commands reference

```.table
tableDataModule: hsc/h1/debug
tableName: DebugFunctions
rowLinks: true
rowSortKey: slug
```
