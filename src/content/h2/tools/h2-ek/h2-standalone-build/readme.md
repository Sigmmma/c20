---
title: H2 standalone build (2021)
about: 'tool:H2-Standalone'
img: halo_2_tag_test.jpg
caption: Using some debug_object commands
keywords:
  - test
  - cache
  - h2a
related:
  - /h1/h1a-ek/h1a-standalone-build
  - /h3/h3-ek/h3-standalone-build
---
The [Halo 2 Anniversary Editing Kit](~H2-EK) includes a **standalone build** of that game (**halo2_tag_test.exe**). This build doesn't include network functionality and it intended for testing single-player maps. It includes AI debugging code not included in other published builds of the engine.
[Using custom content paths](~mod-tools#using-custom-content-paths) is supported.

{% alert type="danger" %}
The standalone build is still somewhat experimental and bugs should be expected. Maps should always receive final testing as [map cache files](~map) loaded by MCC itself.
{% /alert %}

# Usage
The UI works is largely functional so you can load built in maps using it or add your own maps to the UI but loading maps is easier to do using the [`game_start`](~h1/scripting#functions-map-name) command in the [console](~developer-console). Note: you need to use the **full scenario tag path** as this is a [tag build](~blam#build-types). For example:

```consoleh2a
; load tags\scenarios\solo\01b_spacestation\01b_spacestation.scenario:
game_start scenarios\solo\01b_spacestation\01b_spacestation
; load tags\scenarios\multi\halo\coagulation\coagulation.scenario:
game_start scenarios\multi\halo\coagulation\coagulation
```

 If you modify tags for the currently loaded map it will be automatically reloaded. You do not need to do anything to enable this behaviour, just edit and let it reload!
 Major changes might result in the map restarting, minor changes should be seamless apart from a loading screen.

# Use cases
This build offers a number of benefits for testing over compiling cache files or using player simulation:

* As mentioned above tag reloading is enabled for standalone and Sapien.
* You have access to a HaloScript console which lets you toggle globals and call functions at will.
* It will be closer to the experience of playing through level in the cache build than using player simulation.

# Keyboard shortcuts/hotkeys
Some of these shortcuts are only used in certain windows or editor modes.

## General
* {% key "~" /%}: Opens the command console.
* {% key "Esc" /%}: Opens the pause menu.
* {% key "Pause/Break" /%}: Opens the pause menu.
* {% key "Shift" /%}+{% key "Esc" /%}: Exit Standalone
* {% key "Ctrl" /%}+{% key "M" /%}: Disables mouse look and enables the cursor
* {% key "Shift" /%}+{% key "Return" /%}: Clears console output
* {% key "Home" /%} Opens the debug menu. Use the arrow keys and <kdb>enter</kdb> to select an item The menu or a submenu is closed using <kdb>End</kdb>.

## Encounters and AI
* {% key "F1" /%}: Selects the spawned actor in the center of the game view.
* {% key "F2" /%} Select next encounter. You can also use the console command `ai_select <encounter>`.
* {% key "F3" /%}: Select previous encounter.
* {% key "F4" /%}: When an encounter is selected, selects the next actor.
* {% key "Shift" /%}+{% key "F4" /%}: Selects the previous actor.
* {% key "F6" /%}: Erase all _spawned_ actors, e.g. those created with `ai_place`.

## Player Cheats
* {% key "Shift" /%}+{% key "Return" /%}: Clears console output
* {% key "Left Parenthesis" /%} Teleports the player to location they are looking at. Only seems to work if it's further above the player?
* {% key "Ctrl" /%}+{% key "C" /%}: Toggles deathless players
* {% key "Ctrl" /%}+{% key "Shift" /%}+{% key "C" /%}: Toggles infinite ammo

## Debug Toggles
* {% key "Ctrl" /%}+{% key "F" /%}: Toggles display framerate
* {% key "Ctrl" /%}+{% key "Shift" /%}+{% key "F" /%}: Toggles infinite framerate
* {% key "Ctrl" /%}+{% key "R" /%}: Toggles render model vertex
* {% key "Ctrl" /%}+{% key "Shift" /%}+{% key "R" /%}: Toggles render models names
* {% key "Ctrl" /%}+{% key "J" /%}: Saves current camera position
* {% key "Ctrl" /%}+{% key "K" /%}: Loads last camera position
* {% key "Ctrl" /%}+{% key "L" /%}: Teleports player to camera position
* {% key "Ctrl" /%}+{% key "O" /%}: Loads last xsync camera position
* {% key "Ctrl" /%}+{% key "4" /%}: Toggles sound cache status
* {% key "Shift" /%}+{% key "4" /%}: Toggles sound cache graph
* {% key "Ctrl" /%}+{% key "5" /%}: Toggles animation size
* {% key "Ctrl" /%}+{% key "6" /%}: Toggles texture cache usage
* {% key "Shift" /%}+{% key "6" /%}: Toggles texture cache debug mip
* {% key "Ctrl" /%}+{% key "7" /%}: Toggles texture cache status
* {% key "Shift" /%}+{% key "7" /%}: Toggles texture cache graph
* {% key "Ctrl" /%}+{% key "Shift" /%}+{% key "7" /%}: Toggles texture cache list
* {% key "Ctrl" /%}+{% key "8" /%}: Toggles geometry cache status
* {% key "Shift" /%}+{% key "8" /%}: Toggles geometry cache graph
* {% key "Ctrl" /%}+{% key "Shift" /%}+{% key "8" /%}: Toggles geometry cache list
* {% key "Ctrl" /%}+{% key "Right" /%}: Increase game speed by 0.10 units
* {% key "Ctrl" /%}+{% key "Left" /%}: Decrease game speed by 0.10 units
* {% key "Ctrl" /%}+{% key "Shift" /%}+{% key "Right" /%}: Increase game speed by 1.00 units
* {% key "Ctrl" /%}+{% key "Shift" /%}+{% key "Left" /%}: Decrease game speed by 1.00 units
* {% key "Ctrl" /%}+{% key "0" /%}: Toggles memory summery
* {% key "3" /%}: Toggles 3D sound

## Remastered Toggle
* {% key "4" /%}: Toggles remastered sound

## Camera Perspective
* {% key "Backslash" /%}: While controlling a unit, press this key to posses the closest unit.
* {% key "Right Parenthesis" /%} While controlling a unit, press this key to switch to through any existing units.

# Debug camera controls
To enter into the debug camera, open the [console](~developer-console) and enter `debug_camera_save` followed by `debug_camera_load` or press {% key "Backspace" /%} until you are in flying camera mode. Movement of the camera is a little different than in Sapien. You do _not_ need to hold the middle mouse button and the camera moves in the direction it's pointed rather than its vertical movement being controlled exclusively with buttons.

* {% key "Backspace" /%}: Cycle camera modes (1st person, 3rd person, flying)
* Use the mouse to aim
* Move with {% key "W" /%}, {% key "A" /%}, {% key "S" /%}, and {% key "D" /%}
* Go up with {% key "R" /%} and down with {% key "F" /%} (camera relative, not world relative)
* Increase/decrease camera speed by scrolling down/up
* Temporarily boost camera speed by holding {% key "Ctrl" /%}
* Rotate clockwise with {% key "G" /%}

# Object spawning
You can quickly spawn a variety of objects for testing:

* Spawn all vehicles by entering `cheat_all_vehicles` into the console.
* Spawn all weapons by by entering `cheat_all_weapons` into the console.
