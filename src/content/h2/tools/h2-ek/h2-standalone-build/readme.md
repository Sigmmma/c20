The [Halo 2 Anniversary Editing Kit][H2-EK] includes a **standalone build** of that game (**halo2_tag_test.exe**). This build doesn't include network functionality and it intended for testing single-player maps. It includes AI debugging code not included in other published builds of the engine.
[Using custom content paths][using-custom-content-paths] is supported.

```.alert danger
The standalone build is still somewhat experimental and bugs should be expected. Maps should always receive final testing as [map cache files][map] loaded by MCC itself.
```

# Usage
The UI works is largely functional so you can load built in maps using it or add your own maps to the UI but loading maps is easier to do using the [`game_start`][scripting#functions-map-name] command in the [console][developer-console]. Note: you need to use the **full scenario tag path** as this is a [tag build][build-types#tag]. For example:

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
* <kbd>~</kbd>: Opens the command console.
* <kbd>Esc</kbd>: Opens the pause menu.
* <kbd>Pause/Break</kbd>: Opens the pause menu.
* <kbd>Shift</kbd>+<kbd>Esc</kbd>: Exit Standalone
* <kbd>Ctrl</kbd>+<kbd>M</kbd>: Disables mouse look and enables the cursor
* <kbd>Shift</kbd>+<kbd>Return</kbd>: Clears console output

## Encounters and AI
* <kbd>F1</kbd>: Selects the spawned actor in the center of the game view.
* <kbd>F2</kbd> Select next encounter. You can also use the console command `ai_select <encounter>`.
* <kbd>F3</kbd>: Select previous encounter.
* <kbd>F4</kbd>: When an encounter is selected, selects the next actor.
* <kbd>Shift</kbd>+<kbd>F4</kbd>: Selects the previous actor.
* <kbd>F6</kbd>: Erase all _spawned_ actors, e.g. those created with `ai_place`.

## Player Cheats
* <kbd>Shift</kbd>+<kbd>Return</kbd>: Clears console output
* <kbd>Left Parenthesis</kbd> Teleports the player to location they are looking at. Only seems to work if it's further above the player?
* <kbd>Ctrl</kbd>+<kbd>C</kbd>: Toggles deathless players
* <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd>: Toggles infinite ammo

## Debug Toggles
* <kbd>Ctrl</kbd>+<kbd>F</kbd>: Toggles display framerate
* <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd>: Toggles infinite framerate
* <kbd>Ctrl</kbd>+<kbd>R</kbd>: Toggles render model vertex
* <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>: Toggles render models names
* <kbd>Ctrl</kbd>+<kbd>J</kbd>: Saves current camera position
* <kbd>Ctrl</kbd>+<kbd>K</kbd>: Loads last camera position
* <kbd>Ctrl</kbd>+<kbd>L</kbd>: Teleports player to camera position
* <kbd>Ctrl</kbd>+<kbd>O</kbd>: Loads last xsync camera position
* <kbd>Ctrl</kbd>+<kbd>4</kbd>: Toggles sound cache status
* <kbd>Shift</kbd>+<kbd>4</kbd>: Toggles sound cache graph
* <kbd>Ctrl</kbd>+<kbd>5</kbd>: Toggles animation size
* <kbd>Ctrl</kbd>+<kbd>6</kbd>: Toggles texture cache usage
* <kbd>Shift</kbd>+<kbd>6</kbd>: Toggles texture cache debug mip
* <kbd>Ctrl</kbd>+<kbd>7</kbd>: Toggles texture cache status
* <kbd>Shift</kbd>+<kbd>7</kbd>: Toggles texture cache graph
* <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>7</kbd>: Toggles texture cache list
* <kbd>Ctrl</kbd>+<kbd>8</kbd>: Toggles geometry cache status
* <kbd>Shift</kbd>+<kbd>8</kbd>: Toggles geometry cache graph
* <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>8</kbd>: Toggles geometry cache list
* <kbd>Ctrl</kbd>+<kbd>Right</kbd>: Increase game speed by 0.10 units
* <kbd>Ctrl</kbd>+<kbd>Left</kbd>: Decrease game speed by 0.10 units
* <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Right</kbd>: Increase game speed by 1.00 units
* <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Left</kbd>: Decrease game speed by 1.00 units
* <kbd>Ctrl</kbd>+<kbd>0</kbd>: Toggles memory summery
* <kbd>3</kbd>: Toggles 3D sound

## Remastered Toggle
* <kbd>4</kbd>: Toggles remastered sound

## Camera Perspective
* <kbd>Backslash</kbd>: While controlling a unit, press this key to posses the closest unit.
* <kbd>Right Parenthesis</kbd> While controlling a unit, press this key to switch to through any existing units.

# Debug camera controls
To enter into the debug camera, open the [console][developer-console] and enter `debug_camera_save` followed by `debug_camera_load` or press <kbd>Backspace</kbd> until you are in flying camera mode. Movement of the camera is a little different than in Sapien. You do _not_ need to hold the middle mouse button and the camera moves in the direction it's pointed rather than its vertical movement being controlled exclusively with buttons.

* <kbd>Backspace</kbd>: Cycle camera modes (1st person, 3rd person, flying)
* Use the mouse to aim
* Move with <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd>, and <kbd>D</kbd>
* Go up with <kbd>R</kbd> and down with <kbd>F</kbd> (camera relative, not world relative)
* Increase/decrease camera speed by scrolling down/up
* Temporarily boost camera speed by holding <kbd>Ctrl</kbd>
* Rotate clockwise with <kbd>G</kbd>

# Object spawning
You can quickly spawn a variety of objects for testing:

* Spawn all vehicles by entering `cheat_all_vehicles` into the console.
* Spawn all weapons by by entering `cheat_all_weapons` into the console.
