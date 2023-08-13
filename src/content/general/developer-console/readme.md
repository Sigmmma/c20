---
title: Developer console
img: prompt.jpg
caption: The console prompt open with a command entered
keywords:
  - script
  - hsc
  - bsl
  - devmode
  - console
thanks:
  Conscars: Documenting developer mode functions
redirects:
  - /h1/engine/developer-console
---
The **developer console** is a [HaloScript](~scripting) interface accessible within Sapien and Standalone in the all games' [mod tools](~mod-tools#tools-overview), and in Halo Custom Edition. It allows you to enter HaloScript expressions in order test and debug your custom content, including setting debug globals to visualize engine internals.

# Usage
The console is opened and closed with the {% key "~" /%} (tilde) key, usually found above {% key "Tab" /%} on a US keyboard. The console is already enabled in Sapien and Standalone, but to use it in Custom Edition you must either launch the game with the `-console` [argument](~arguments#other) (and optionally `-devmode` to access cheat commands, which will disable multiplayer) or use a mod like [Chimera](~) which can enable these features for you while retaining multiplayer functionality. For Sapien, ensure the _Game window_ is focused first.

Commands are then entered into the console by providing their name, then their [argument(s)](~scripting#value-types) separated by spaces. Unlike level scripts, you don't need to surround the outer expressions with parentheses, and globals can be set like `cheat_deathless_player 1` rather than `(set cheat_deathless_player 1)`.

```console
; You don't need to enclose the command in parentheses
cheat_super_jump 1
debug_camera_save
physics_set_gravity 0.5 ;h1a only
units_set_current_vitality (players) 75 75
```

Keys you should know are:
* Press {% key "Enter" /%} to run a command once inputted.
* Press {% key "Tab" /%} to see completions of partially-entered functions and global names.
* Use {% key "Right Click" /%} to paste clipboard contents into the console.
* The {% key "Home" /%} and {% key "End" /%} keys move the cursor to the start and end of the line.

Helpful commands:
* `help <function name>` to get argument information.
* `cls` for clearing output from the screen.

# Caveats
Not all functions and globals are necessarily available in all contexts, like Custom Edition's `sv_` server commands not being applicable to Sapien while the `radiosity_` commands are not applicable to Halo. Custom Edition also contains a large number of globals and functions which are non-functional and were removed in the updated mod tools.

Each game will have a different set of functions and globals, so be sure to reference the scripting information for the game you're modding.