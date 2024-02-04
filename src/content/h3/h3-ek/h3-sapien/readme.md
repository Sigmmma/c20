---
title: H3 Sapien
stub: true
about: 'tool:H3-Sapien'
img: h3-sapien.jpg
caption: Sapien being used to edit spawn points in `guardian.scenario`
keywords:
  - scenario
related:
  - /h1/h1a-ek/h1a-sapien
---
**H3-Sapien**, part of the [Halo 3 Editing Kit](~H3-EK), is a visual [scenario](~) and BSP editor used to populate levels with objects, configure BSP cluster data like wind and sound environments, compile scripts, and more. Sapien shares some systems with Halo 3 itself, including its AI system to support interactive AI scripting and debugging.

It is roughly analogous to Forge found in later Halo titles, Users primarily interact with Sapien's windows and menus, but the _Game Window_ also includes a scripting console which has support for debug commands, and by using {% key "Tab" /%} you can switch to player mode to interact with the simulation in real time.

# Windows
## Game window
The game window is the main interface when interacting with objects in the level. It is also where you can run commands by pressing the {% key "~" /%} (tilde) key.

Movement of the camera is done in the same way as the in-game debug camera; **hold the middle mouse button** plus:

* Use the mouse to aim
* **Click the right mouse button** to zoom in and out.
* Move with {% key "W" /%}, {% key "A" /%}, {% key "S" /%}, and {% key "D" /%}
* Go up with {% key "R" /%} and down with {% key "F" /%}
* Change camera speed by pressing {% key "Shift" /%}
* Switch to player mode with {% key "Tab" /%} and by using {% key "Backspace" /%} you can toggle between third person, freecam, and first person.

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
* {% key "~" /%}: Opens the command console.
* {% key "Pause/Break" /%}: Pauses your Sapien instance. Press "OK" in the opened window to resume Sapien.
* {% key "Control" /%}+{% key "B" /%}: Open the [BSP](~scenario_structure_bsp)/[zone set](~scenario_structure_bsp#zone-sets) switch dialog window.
* {% key "Shift" /%}+{% key "Click" /%}: Select a group of objects or keep previously placed objects selected. You can also use it to select the first and last object in the hierarchy list to select everything in-between at once. Useful for deleting multiple objects or moving them all at once.
* {% key "Control" /%}+{% key "Click" /%}: Select a group of objects or keep previously placed objects selected. This will only select the object you specifically click in the hierarchy list. Useful for deleting multiple objects or moving them all at once.
* Hold {% key "Tab" /%}: Using this key combo while having an object selected will set the rotation gizmo to sync with the local rotation of the object. Only really useful if "Local Axes" is not enabled.
* {% key "Shift" /%}+{% key "Esc" /%}: Exit Sapien

## Encounters and AI
* {% key "F1" /%}: Selects the spawned actor in the center of the game view.
* {% key "F2" /%} Select next encounter. You can also use the console command `ai_select <encounter>`.
* {% key "F3" /%}: Select previous encounter.
* {% key "F4" /%}: When an encounter is selected, selects the next actor.
* {% key "Shift" /%}+{% key "F4" /%}: Selects the previous actor.
* {% key "F5" /%}: Cycles through render modes for actor sprays:
  * Actions
  * Activation status
  * None
* {% key "F6" /%}: Erase all _spawned_ actors, e.g. those created with `ai_place`.

## Player Cheats
* {% key "Left Parenthesis" /%}: Teleports the player to location they are looking at. Only seems to work if it's further above the player?

## Debug Toggles
* {% key "F10" /%}: Toggles profile summary. Pressing it multiple times will switch between the following modes:
  * All
  * Objects
  * Graphics
  * Occlusion
  * Effects
  * AI
  * Game-state
  * Environment Artist
  * Disabled
* {% key "Ctrl" /%}+{% key "F10" /%}: Disables profile summary output
* {% key "Shift" /%}+{% key "W" /%}: Toggles weapon debug
* {% key "Ctrl" /%}+{% key "I" /%}: Toggles input debug
* {% key "Ctrl" /%}+{% key "F11" /%}: Toggles 4x3 view in widescreen

## Camera Perspective
* {% key "Tab" /%}: Press this key while near a unit to possess it.
* {% key "Ctrl" /%}+{% key "Q" /%}: Pressing this key combo will switch to player simulation at the current camera location.
* {% key "Backslash" /%}: While controlling a unit, press this key to posses the closest unit.
* {% key "Right Parenthesis" /%} While controlling a unit, press this key to switch to through any existing units.

## Debug menu
* {% key "Home" /%}: This key will open the debug menu that can be used to easily launch saved commands. New command can be added by editing the `debug_menu_init.txt` file found in the bin folder at the root of your H3EK directory

# editor_init.txt
At startup, Sapien will load `editor_init.txt` if present in the same folder. This file can contain console commands, one per line, which are executed automatically for you. For example:

```inittxt
error_geometry_hide_all
debug_objects 1
;a comment
```

# Known issues & Fixes
## Sound doesn't play
Copy over the `fmod` folder from your install of H3 or ODST depending on which game you are working on.
