---
title: H2V Sapien (2007)
about: 'tool:H2V-Sapien'
img: netgame_equipment_04_large.jpg
caption: H2V Sapien being used to place item spawns in `example.scenario`
keywords:
  - scenario
---
{% alert %}
This is an article about the legacy H2V Sapien for use with [Halo 2 Vista](~h2), for the H2 Sapien for MCC see [H2 Sapien](~h2-sapien)
{% /alert %}


**H2V Sapien**, part of the [H2V-EK](~), is a visual [scenario](~) and [BSP](~scenario_structure_bsp) editor used to populate levels with objects, configure BSP [cluster data](~scenario_structure_bsp#clusters-and-cluster-data) like wind and sound environments, compile scripts, and more. H2V Sapien shares some systems with Halo 2 itself, including its AI system to support interactive AI scripting and debugging.

It is roughly analogous to Forge found in later Halo titles, although the user cannot interact with the world as a player. Users primarily interact with H2V Sapien's windows and menus, but the _Game Window_ also includes a scripting console which has support for debug commands.

# Windows
## Game window
The game window is the main interface when interacting with objects in the level. It is also where you can run commands by pressing the {% key "~" /%} (tilde) key.

Movement of the camera is done in the same way as the in-game debug camera; **hold the middle mouse button** plus:

* Use the mouse to aim
* Move with {% key "W" /%}, {% key "A" /%}, {% key "S" /%}, and {% key "D" /%}
* Go up with {% key "R" /%} and down with {% key "F" /%}
* Increase camera speed by scrolling down or pressing {% key "Shift" /%}
* Decrease camera speed by scrolling up

## Hierarchy view
The Hierarchy view displays all the objects currently placed in the game and organizes them by type. The left pane of the window shows the Hierarchy tree and currently selected type, and the right pane shows the objects of this selected group or type that are currently placed in the level.

## Tool window
This window contains settings for the currently active tool mode, such as object placement, detail object painting, or cluster properties application. The currently active tool depends on the selected hierarchy view item.

The most commonly used settings, or options that are modified the most, are the options under the _Active marker handles_ section and the _Don't draw center marker_ option.

## Properties palette
The Properties palette window displays the properties for the currently selected hierarchy item. The type of object can be changed or chosen in this display as well as various other properties such as the position and rotation of the object, and spawn flags that set various attributes for the object.

When applying cluster properties, the camera location in the game window determines the active cluster shown in this window.

# Keyboard shortcuts/hotkeys
Some of these shortcuts are only used in certain windows or editor modes.

## General
* {% key "~" /%}: Opens the command console.
* {% key "Pause/Break" /%}: Pauses your Sapien instance. Press "OK" in the opened window to resume Sapien.
* {% key "Control" /%}+{% key "Shift" /%}+{% key "B" /%}: Creates the file `baggage.txt`. This file shows the memory usage of tags in the editor. This will crash H2V Sapien so do not use this.
* {% key "Shift" /%}+{% key "Click" /%}: Select a group of objects or keep previously placed objects selected. You can also use it to select the first and last object in the hierarchy list to select everything in-between at once. Useful for deleting multiple objects or moving them all at once.
* {% key "Control" /%}+{% key "Click" /%}: Select a group of objects or keep previously placed objects selected. This will only select the object you specifically click in the hierarchy list. Useful for deleting multiple objects or moving them all at once.
* Hold {% key "Tab" /%}: Using this key combo while having an object selected will set the rotation gizmo to sync with the local rotation of the object. Only really useful if "Local Axes" is not enabled.
* In the hierarchy view, pressing a key will cycle through all folders that start with that character. For example, pressing {% key "A" /%} while having the "Missions" folder expanded will immediately take you to the "AI" folder.

# editor_init.txt
At startup, H2V Sapien will load `editor_init.txt` if present in the same folder. This file can contain console commands, one per line, which are executed automatically for you. For example:

```inittxt
error_geometry_hide_all
debug_objects 1
;a comment
```

# Compatibility
Windows users have experienced saving issues related to the Virtual Store. Ensure you have the [right permissions](~custom-edition#installation) before editing tags.
