**H3-Sapien**, part of the [Halo 3 Editing Kit][H3-EK], is a visual [scenario][] and BSP editor used to populate levels with objects, configure BSP cluster data like wind and sound environments, compile scripts, and more. Sapien shares some systems with Halo 3 itself, including its AI system to support interactive AI scripting and debugging.

It is roughly analogous to Forge found in later Halo titles, Users primarily interact with Sapien's windows and menus, but the _Game Window_ also includes a scripting console which has support for debug commands, and by using <kbd>Tab</kbd> you can switch to player mode to interact with the simulation in real time.

# Windows
## Game window
The game window is the main interface when interacting with objects in the level. It is also where you can run commands by pressing the <kbd>~</kbd> (tilde) key.

Movement of the camera is done in the same way as the in-game debug camera; **hold the middle mouse button** plus:

* Use the mouse to aim
* **Click the right mouse button** to zoom in and out.
* Move with <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd>, and <kbd>D</kbd>
* Go up with <kbd>R</kbd> and down with <kbd>F</kbd>
* Change camera speed by pressing <kbd>Shift</kbd>
* Switch to player mode with <kbd>Tab</kbd> and by using <kbd>Backspace</kbd> you can toggle between third person, freecam, and first person.

## Hierarchy view
The Hierarchy view displays all the objects currently placed in the game and organizes them by type. The left pane of the window shows the Hierarchy tree and currently selected type, and the right pane shows the objects of this selected group or type that are currently placed in the level.

## Tool window
This window contains settings for the currently active tool mode, such as object placement, decorator painting, or cluster properties application. The currently active tool depends on the selected hierarchy view item.

## Properties palette
The Properties palette window displays the properties for the currently selected hierarchy item. The type of object can be changed or chosen in this display as well as various other properties such as the position and rotation of the object, and spawn flags that set various attributes for the object.

You'll be able to highlight clusters by using your cursor in the game window and **left clicking** to set it as your active cluster.

## Output window
Prints debug info for loaded tags along with actions taken by the user.

# Keyboard shortcuts/hotkeys
Some of these shortcuts are only used in certain windows or editor modes.

## General
* <kbd>~</kbd>: Opens the command console.
* <kbd>Pause/Break</kbd>: Pauses your Sapien instance. Press "OK" in the opened window to resume Sapien.
* <kbd>Shift</kbd>+<kbd>Click</kbd>: Select a group of objects or keep previously placed objects selected. You can also use it to select the first and last object in the hierarchy list to select everything in-between at once. Useful for deleting multiple objects or moving them all at once.
* <kbd>Control</kbd>+<kbd>Click</kbd>: Select a group of objects or keep previously placed objects selected. This will only select the object you specifically click in the hierarchy list. Useful for deleting multiple objects or moving them all at once.
* Hold <kbd>Tab</kbd>: Using this key combo while having an object selected will set the rotation gizmo to sync with the local rotation of the object. Only really useful if "Local Axes" is not enabled.

## Encounters and AI
* <kbd>F1</kbd>: Selects the spawned actor in the center of the game view.
* <kbd>F2</kbd> Select next encounter. You can also use the console command `ai_select <encounter>`.
* <kbd>F3</kbd>: Select previous encounter.
* <kbd>F4</kbd>: When an encounter is selected, selects the next actor.
* <kbd>Shift</kbd>+<kbd>F4</kbd>: Selects the previous actor.
* <kbd>F5</kbd>: Cycles through render modes for actor sprays:
  * Actions
  * Activation status
  * None
* <kbd>F6</kbd>: Erase all _spawned_ actors, e.g. those created with `ai_place`.

# editor_init.txt
At startup, Sapien will load `editor_init.txt` if present in the same folder. This file can contain console commands, one per line, which are executed automatically for you. For example:

```inittxt
error_geometry_hide_all
debug_objects 1
;a comment
```

