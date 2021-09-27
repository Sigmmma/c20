```.alert
This is an article about the H2 Sapien for use with MCC. For the legacy H2V Sapien for [Halo 2 Vista][h2] see [H2V Sapien][h2v-sapien].
```

**H2-Sapien**, part of the [Halo 2 Anniversary Editing Kit][H2-EK], is a visual [scenario][] and [BSP][scenario_structure_bsp] editor used to populate levels with objects, configure BSP [cluster data][scenario_structure_bsp#clusters-and-cluster-data] like wind and sound environments, compile scripts, and more. Sapien shares some systems with Halo 2 itself, including its AI system to support interactive AI scripting and debugging.

It is roughly analogous to Forge found in later Halo titles, although the user cannot interact with the world as a player. Users primarily interact with Sapien's windows and menus, but the _Game Window_ also includes a scripting console which has support for debug commands.

# Windows
## Game window
The game window is the main interface when interacting with objects in the level. It is also where you can run commands by pressing the <kbd>~</kbd> (tilde) key. The resolution and aspect ratio will be adjusted to fit the game window size automatically.

Movement of the camera is done in the same way as the in-game debug camera; **hold the middle mouse button** plus:

* Use the mouse to aim
* Move with <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd>, and <kbd>D</kbd>
* Go up with <kbd>R</kbd> and down with <kbd>F</kbd>
* Increase camera speed by scrolling down or pressing <kbd>Shift</kbd>
* Decrease camera speed by scrolling up

## Hierarchy view
The Hierarchy view displays all the objects currently placed in the game and organizes them by type. The left pane of the window shows the Hierarchy tree and currently selected type, and the right pane shows the objects of this selected group or type that are currently placed in the level.

## Tool window
This window contains settings for the currently active tool mode, such as object placement, decorator painting, or cluster properties application. The currently active tool depends on the selected hierarchy view item.

The most commonly used settings, or options that are modified the most, are the options under the _Active marker handles_ section and the _Don't draw center marker_ option.

## Properties palette
The Properties palette window displays the properties for the currently selected hierarchy item. The type of object can be changed or chosen in this display as well as various other properties such as the position and rotation of the object, and spawn flags that set various attributes for the object.

You'll be able to highlight clusters by using your cursor in the game window and **left clicking** to set it as your active cluster.

## Output window
Still unknown, maybe we will know one day.

# Keyboard shortcuts/hotkeys
Some of these shortcuts are only used in certain windows or editor modes.

## General
* <kbd>~</kbd>: Opens the command console.
* <kbd>Pause/Break</kbd>: Pauses your Sapien instance. Press "OK" in the opened window to resume Sapien.
* <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>: Creates the file `baggage.txt`. This file shows the memory usage of tags in the editor.
* <kbd>Shift</kbd>+<kbd>Click</kbd>: Select a group of objects or keep previously placed objects selected. You can also use it to select the first and last object in the hierarchy list to select everything in-between at once. Useful for deleting multiple objects or moving them all at once.
* <kbd>Control</kbd>+<kbd>Click</kbd>: Select a group of objects or keep previously placed objects selected. This will only select the object you specifically click in the hierarchy list. Useful for deleting multiple objects or moving them all at once.
* Hold <kbd>Tab</kbd>: Using this key combo while having an object selected will set the rotation gizmo to sync with the local rotation of the object. Only really useful if "Local Axes" is not enabled.
* In the hierarchy view, pressing a key will cycle through all folders that start with that character. For example, pressing <kbd>A</kbd> while having the "Missions" folder expanded will immediately take you to the "AI" folder.
* <kbd>Shift</kbd>+<kbd>Esc</kbd>: Exit Sapien

## Encounters and AI
* <kbd>Middle mouse</kbd>+<kbd>F1</kbd>: Selects the spawned actor in the center of the game view.
* <kbd>Middle mouse</kbd>+<kbd>F2</kbd> Select next encounter. You can also use the console command `ai_select <encounter>`.
* <kbd>Middle mouse</kbd>+<kbd>F3</kbd>: Select previous encounter.
* <kbd>Middle mouse</kbd>+<kbd>F4</kbd>: When an encounter is selected, selects the next actor.
* <kbd>Middle mouse</kbd>+<kbd>Shift</kbd>+<kbd>F4</kbd>: Selects the previous actor.
* <kbd>Middle mouse</kbd>+<kbd>F5</kbd>: Cycles through render modes for actor sprays:
  * Actions
  * Activation status
  * None
* <kbd>Middle mouse</kbd>+<kbd>F6</kbd>: Erase all _spawned_ actors, e.g. those created with `ai_place`.

## Player Cheats
* <kbd>Left Parenthesis</kbd> Teleports the player to location they are looking at. Only seems to work if it's further above the player?

## Camera Perspective 
* <kbd>Backslash</kbd>: While controlling a unit, press this key to switch to another existing unit.
* <kbd>Right Parenthesis</kbd> While controlling a unit, press this key to any existing unit.

# editor_init.txt
At startup, H2-Sapien will load `editor_init.txt` if present in the same folder. This file can contain console commands, one per line, which are executed automatically for you. For example:

```inittxt
error_geometry_hide_all
debug_objects 1
;a comment
```
