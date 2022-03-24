The [Halo 3 Editing Kit][H3-EK] includes a **standalone build** of that game (**halo3_tag_test.exe**). This build doesn't include network functionality and it intended for testing single-player maps. It includes AI debugging code not included in other published builds of the engine.

```.alert danger
The standalone build is configuered differently from the retail build of Halo 3 that's part of MCC - bugs or features found in one might not be found in the other. For that reason maps should always receive final testing as [map cache files][map] loaded by MCC itself.
```

# Usage
The UI works to a limited degree but not all maps can be loaded using it. Map load should be done by adding the required [`game_start`][scripting#functions-map-name] command to `init.txt`. Note: you need to use the **full scenario tag path** as this is a [tag build][build-types#tag]. For example:

```console
; load tags\levels\solo\020_base\020_base.scenario:
game_start levels\solo\020_base\020_base
; load tags\levels\solo\040_voi\040_voi.scenario:
game_start levels\solo\040_voi\040_voi
```

If you want to load an stock scenario it might be easier to use the debug menu.

Once you are in-game you can change the map using the [console][developer-console]. If you modify tags for the currently loaded map it will be automatically reloaded. You do not need to do anything to enable this behaviour, just edit and let it reload!
Major changes might result in the map/game reset, minor changes should be seamless apart from a loading screen.

# Use cases
This build offers a number of benefits for testing over compiling cache files or using player simulation:

* As mentioned above tag reloading is enabled for standalone and Sapien.
* You have access to a HaloScript console which lets you toggle globals and call functions at will.
* It will be closer to the experience of playing through level in the cache build than player simulation.

# Keyboard shortcuts/hotkeys
Some of these shortcuts are only used in certain windows or editor modes.

## General
* <kbd>~</kbd>: Opens the command console.
* <kbd>Shift</kbd>+<kbd>Esc</kbd>: Exit Standalone
* <kbd>Ctrl</kbd>+<kbd>M</kbd>: Disables mouse look and enables the cursor
* <kbd>Shift</kbd>+<kbd>Return</kbd>: Clears console output
* <kbd>Home</kbd> Opens the debug menu. Use the arrow keys and <kdb>enter</kdb> to select an item. The menu or a submenu is closed using <kdb>End</kdb>. Entering the number or letter on the left of an has the same effect as selecting it using the arrow keys and pressing <kdb>Enter</kdb>
  * If you want to add items to the menu create a `bin\debug_menu_user_init.txt` file using the same syntax as `bin\\debug_menu_init.txt`. The two menus will be merged together. Don't edit the stock menu as updates will overwrite it.

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

## Player Cheats
* <kbd>Left Parenthesis</kbd> Teleports the player to location they are looking at. Only seems to work if it's further above the player?
* <kbd>Ctrl</kbd>+<kbd>C</kbd>: Toggles deathless players

## Debug Toggles
* <kbd>F10</kbd>: Toggles profile summary. Pressing it multiple times will switch between the following modes:
  * All
  * Objects
  * Graphics
  * Occlusion
  * Effects
  * AI
  * Game-state
  * Environment Artist
  * Disabled
* <kbd>Ctrl</kbd>+<kbd>F10</kbd>: Disables profile summary output
* <kbd>Ctrl</kbd>+<kbd>I</kbd>: Toggles input debug
* <kbd>Shift</kbd>+<kbd>W</kbd>: Toggles weapon debug
* <kbd>Ctrl</kbd>+<kbd>F11</kbd>: Toggles 4x3 view in widescreen
* <kbd>Ctrl</kbd>+<kbd>F</kbd>: Toggles display framerate
* <kbd>Ctrl</kbd>+<kbd>R</kbd>: Toggles render model vertex
* <kbd>Ctrl</kbd>+<kbd>J</kbd>: Saves current camera position
* <kbd>Ctrl</kbd>+<kbd>K</kbd>: Loads last camera position
* <kbd>Ctrl</kbd>+<kbd>L</kbd>: Teleports player to camera position
* <kbd>Ctrl</kbd>+<kbd>6</kbd>: Toggles texture cache usage
* <kbd>Shift</kbd>+<kbd>6</kbd>: Toggles texture cache debug mip
* <kbd>Ctrl</kbd>+<kbd>7</kbd>: Toggles texture cache status
* <kbd>Shift</kbd>+<kbd>7</kbd>: Toggles texture cache graph
* <kbd>Ctrl</kbd>+<kbd>8</kbd>: Toggles geometry cache status
* <kbd>Shift</kbd>+<kbd>8</kbd>: Toggles geometry cache graph
* <kbd>=</kbd>: Increase game speed by 0.10 units
* <kbd>-</kbd>: Decrease game speed by 0.10 units
* <kbd>Shift</kbd>+<kbd>=</kbd>: Increase game speed by 1.00 units
* <kbd>Shift</kbd>+<kbd>-</kbd>: Decrease game speed by 0.50 units

## Camera Perspective
* <kbd>Backslash</kbd>: While controlling a unit, press this key to posses the closest unit.
* <kbd>Right Parenthesis</kbd> While controlling a unit, press this key to switch to through any existing units.

# Debug director flying controls
To use the debug freecam press <kbd>Backspace</kbd> until you are in flying camera mode. Movement of the camera is a little different than in Sapien. You do _not_ hold the middle mouse button and the camera moves in the direction it's pointed rather than its vertical movement being controlled exclusively with buttons.

* <kbd>Backspace</kbd>: Cycle camera modes (1st person, 3rd person, flying)
* Use the mouse to aim
* Move with <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd>, and <kbd>D</kbd>
* Go up with <kbd>R</kbd> and down with <kbd>F</kbd> (camera relative, not world relative)
* Increase/decrease camera speed by scrolling down/up
* Temporarily boost camera speed by holding <kbd>Ctrl</kbd>
* Toggle biped control without switching the camera back to first person by pressing the **middle mouse button**.

# Object spawning
You can quickly spawn a variety of objects for testing:

* Spawn all vehicles by entering `cheat_all_vehicles` into the console.
* Spawn all weapons by by entering `cheat_all_weapons` into the console.

# Known issues & Fixes
* Sound doesn't play - Copy over the `fmod` folder from your install of H3 or ODST depending on which game you are working on.
* Maps can't be loaded using the UI - see [#Usage][h3-standalone-build#usage] for a workaround.
* Levels that make use of the script function `soft_ceiling_enable` will cause scripts to fail to compile due to post processing not done by standalone. You can fix this by setting the script global `scenario_load_all_tags` to true. The only level known to be affected by this is `110_hc` otherwise known as the singleplayer level named `Cortana` 