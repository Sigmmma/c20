The **developer console** is a text-based interface accessible within [Sapien][] and in-game if enabled. It allowed Halo's developers and artists to enter commands and [Halo Script][scripting] in order to troubleshoot and test the game, and now it allows modders to do the same for their content. Most commands toggle debug information on the screen and features of the [renderer][], [physics engine][physics-engine], and [AI][].

Not all commands are available in all contexts -- for example, the `radiosity_*` commands used to build lightmaps can only be found in [Sapien][]. Others may be present in the command list, but only have an effect in [Sapien][] or debug builds of the game like the Halo beta.

# Usage
The console is opened and closed with the <kbd>~</kbd> (tilde) key, usually found above <kbd>Tab</kbd>. To use the console in-game, ensure you have either launched the game with the `-console` [argument][arguments#other] (and optionally `-devmode` to access cheat commands, which will disable multiplayer) or are using a mod like [Chimera][] which can enable these features for you. In Sapien, ensure the game window is focused first. Commands are then entered into the console by providing their name, then their [arguments][scripting#value-types] separated by spaces:

```console
; You do NOT need to enclose the command in parentheses
cheat_super_jump 1
```

Press <kbd>Enter</kbd> to run the command.

The console supports <kbd>Tab</kbd> completion of function names and `cls` for clearing output. You can also use `help <function name>` to get argument information.

# Commands reference

```.table
tableDefs: debug.yml
tableName: DebugFunctions
rowLinks: true
rowSortKey: slug
```
