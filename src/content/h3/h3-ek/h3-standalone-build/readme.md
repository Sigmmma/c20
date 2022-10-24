---
title: H3 standalone build
about: 'tool:H3-Standalone'
img: halo_3_tag_test.jpg
caption: Watching a cutscene in tag test.
keywords:
  - test
  - cache
  - h3
related:
  - /h1/tools/h1a-ek/h1a-standalone-build
thanks:
  AKlinth: Pointing out that the debug menu is undocumented.
---
The [Halo 3 Editing Kit](~H3-EK) includes a **standalone build** of that game (**halo3_tag_test.exe**). This build doesn't include network functionality and it intended for testing single-player maps. It includes AI debugging code not included in other published builds of the engine.

{% alert type="danger" %}
The standalone build is configuered differently from the retail build of Halo 3 that's part of MCC - bugs or features found in one might not be found in the other. For that reason maps should always receive final testing as [map cache files](~map) loaded by MCC itself.
{% /alert %}

# Usage
The UI works to a limited degree but not all maps can be loaded using it. Map load should be done by adding the required [`game_start`](~scripting#functions-map-name) command to `init.txt`. Note: you need to use the **full scenario tag path** as this is a [tag build](~build-types#tag). For example:

```console
; load tags\levels\solo\020_base\020_base.scenario:
game_start levels\solo\020_base\020_base
; load tags\levels\solo\040_voi\040_voi.scenario:
game_start levels\solo\040_voi\040_voi
```

If you want to load an stock scenario it might be easier to use the debug menu.

Once you are in-game you can change the map using the [console](~developer-console). If you modify tags for the currently loaded map it will be automatically reloaded. You do not need to do anything to enable this behaviour, just edit and let it reload!
Major changes might result in the map/game reset, minor changes should be seamless apart from a loading screen.

# Use cases
This build offers a number of benefits for testing over compiling cache files or using player simulation:

* As mentioned above tag reloading is enabled for standalone and Sapien.
* You have access to a HaloScript console which lets you toggle globals and call functions at will.
* It will be closer to the experience of playing through level in the cache build than player simulation.

# Keyboard shortcuts/hotkeys
Some of these shortcuts are only used in certain windows or editor modes.

## General
* {% key "~" /%}: Opens the command console.
* {% key "Shift" /%}+{% key "Esc" /%}: Exit Standalone
* {% key "Ctrl" /%}+{% key "M" /%}: Disables mouse look and enables the cursor
* {% key "Shift" /%}+{% key "Return" /%}: Clears console output
* {% key "Home" /%} Opens the debug menu. Use the arrow keys and <kdb>enter</kdb> to select an item. The menu or a submenu is closed using <kdb>End</kdb>. Entering the number or letter on the left of an has the same effect as selecting it using the arrow keys and pressing <kdb>Enter</kdb>
  * If you want to add items to the menu create a `bin\debug_menu_user_init.txt` file using the same syntax as `bin\\debug_menu_init.txt`. The two menus will be merged together. Don't edit the stock menu as updates will overwrite it.

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
* {% key "Left Parenthesis" /%} Teleports the player to location they are looking at. Only seems to work if it's further above the player?
* {% key "Ctrl" /%}+{% key "C" /%}: Toggles deathless players

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
* {% key "Ctrl" /%}+{% key "I" /%}: Toggles input debug
* {% key "Shift" /%}+{% key "W" /%}: Toggles weapon debug
* {% key "Ctrl" /%}+{% key "F11" /%}: Toggles 4x3 view in widescreen
* {% key "Ctrl" /%}+{% key "F" /%}: Toggles display framerate
* {% key "Ctrl" /%}+{% key "R" /%}: Toggles render model vertex
* {% key "Ctrl" /%}+{% key "J" /%}: Saves current camera position
* {% key "Ctrl" /%}+{% key "K" /%}: Loads last camera position
* {% key "Ctrl" /%}+{% key "L" /%}: Teleports player to camera position
* {% key "Ctrl" /%}+{% key "6" /%}: Toggles texture cache usage
* {% key "Shift" /%}+{% key "6" /%}: Toggles texture cache debug mip
* {% key "Ctrl" /%}+{% key "7" /%}: Toggles texture cache status
* {% key "Shift" /%}+{% key "7" /%}: Toggles texture cache graph
* {% key "Ctrl" /%}+{% key "8" /%}: Toggles geometry cache status
* {% key "Shift" /%}+{% key "8" /%}: Toggles geometry cache graph
* {% key "=" /%}: Increase game speed by 0.10 units
* {% key "-" /%}: Decrease game speed by 0.10 units
* {% key "Shift" /%}+{% key "=" /%}: Increase game speed by 1.00 units
* {% key "Shift" /%}+{% key "-" /%}: Decrease game speed by 0.50 units

## Camera Perspective
* {% key "Backslash" /%}: While controlling a unit, press this key to posses the closest unit.
* {% key "Right Parenthesis" /%} While controlling a unit, press this key to switch to through any existing units.

# Debug director flying controls
To use the debug freecam press {% key "Backspace" /%} until you are in flying camera mode. Movement of the camera is a little different than in Sapien. You do _not_ hold the middle mouse button and the camera moves in the direction it's pointed rather than its vertical movement being controlled exclusively with buttons.

* {% key "Backspace" /%}: Cycle camera modes (1st person, 3rd person, flying)
* Use the mouse to aim
* Move with {% key "W" /%}, {% key "A" /%}, {% key "S" /%}, and {% key "D" /%}
* Go up with {% key "R" /%} and down with {% key "F" /%} (camera relative, not world relative)
* Increase/decrease camera speed by scrolling down/up
* Temporarily boost camera speed by holding {% key "Ctrl" /%}
* Toggle biped control without switching the camera back to first person by pressing the **middle mouse button**.

# Object spawning
You can quickly spawn a variety of objects for testing:

* Spawn all vehicles by entering `cheat_all_vehicles` into the console.
* Spawn all weapons by by entering `cheat_all_weapons` into the console.

# Known issues & Fixes
* Sound doesn't play - Copy over the `fmod` folder from your install of H3 or ODST depending on which game you are working on.
* Levels that make use of the script function `soft_ceiling_enable` will cause scripts to fail to compile due to post processing not done by standalone. You can fix this by setting the script global `scenario_load_all_tags` to true. The only level known to be affected by this is `110_hc` otherwise known as the singleplayer level named `Cortana`.