The [Halo 3 Editing Kit][H3-EK] includes a **standalone build** of that game (**halo3_tag_test.exe**). This build doesn't include network functionality and it intended for testing single-player maps. It includes AI debugging code not included in other published builds of the engine.

```.alert danger
The standalone build is still somewhat experimental and bugs should be expected. Again, only single-player maps are officially supported at this time. Maps should always receive final testing as [map cache files][map] loaded by MCC itself.
```

# Usage
The UI works to a limited degree but no main menu is included. Map load should be done by adding the required [`map_name`][scripting#functions-map-name] command to `init.txt`. Note: you need to use the **full scenario tag path** as this is a [tag build][build-types#tag]. For example:

```console
; load tags\levels\solo\020_base\020_base.scenario:
map_name levels\solo\020_base\020_base
; load tags\levels\solo\040_voi\040_voi.scenario:
map_name levels\solo\040_voi\040_voi
```
Once you are in-game you can change the map using the [console][developer-console]. If you modify tags for the currently loaded map it will be automatically reloaded. You do not need to do anything to enable this behaviour, just edit and let it reload!
Major changes might result in the map restarting, minor changes should be seamless apart from a loading screen.

# Use cases
This build offers a number of benefits for testing over compiling cache files or using player simulation:

* As mentioned above tag reloading is enabled for standalone and Sapien.
* You have access to a HaloScript console which lets you toggle globals and call functions at will.
* It will be closer to the experience of playing through level in the cache build than player simulation.

# Keyboard shortcuts/hotkeys

Some of these shortcuts are only used in certain windows or editor modes.

* <kbd>Ctrl</kbd>+<kbd>R</kbd>: Toggles render model vertex
* <kbd>Ctrl</kbd>+<kbd>F</kbd>: Toggles display_framerate
* <kbd>Ctrl</kbd>+<kbd>J</kbd>: Runs debug_camera_save
* <kbd>Ctrl</kbd>+<kbd>L</kbd>: Runs cheat_teleport_to_camera
* <kbd>Ctrl</kbd>+<kbd>C</kbd>: Toggles cheat_deathless_player
* <kbd>Ctrl</kbd>+<kbd>6</kbd>: Toggles texture cache usage
* <kbd>Ctrl</kbd>+<kbd>7</kbd>: Toggles texture cache status
* <kbd>Ctrl</kbd>+<kbd>8</kbd>: Toggles geometry cache status
* <kbd>Ctrl</kbd>+<kbd>i</kbd>: Enables controller debug stats
* <kbd>Ctrl</kbd>+<kbd>W</kbd>: Enables weapon debug stats
* <kbd>Alt</kbd>+<kbd>-</kbd>: Decreases simulation speed
* <kbd>Alt</kbd>+<kbd>+</kbd>: Increases simulation speed
* <kbd>Shift</kbd>+<kbd>6</kbd>: Toggles texture cache debug mip
* <kbd>Shift</kbd>+<kbd>7</kbd>: Toggles texture cache graph
* <kbd>Shift</kbd>+<kbd>8</kbd>: Toggles geometry cache graph
* <kbd>Shift</kbd>+<kbd>Enter</kbd>: Toggles pause menu
* <kbd>Backspace</kbd> Toggles debug_camera mode

# Debug director flying controls
To use the debug freecam press <kbd>Backspace</kbd> until you are in flying camera mode. Movement of the camera is a little different than in Sapien. You do _not_ hold the middle mouse button and the camera moves in the direction it's pointed rather than its vertical movement being controlled exclusively with buttons.

* <kbd>Backspace</kbd>: Cycle camera modes (1st person, 3rd person, flying)
* Use the mouse to aim
* Move with <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd>, and <kbd>D</kbd>
* Go up with <kbd>R</kbd> and down with <kbd>F</kbd> (camera relative, not world relative)
* Increase/decrease camera speed by scrolling down/up
* Temporarily boost camera speed by holding <kbd>Ctrl</kbd>
* Toggle biped control without switching the camera back to first person by pressing the **middle mouse button**.

You can also use a gamepad to control the camera:

* <kbd>Right bumper (hold)</kbd>: Cycle camera modes (1st person, 3rd person, flying)
* <kbd>Right stick click</kbd>: toggle gamepad control of the debug camera
* <kbd>Right stick</kbd>: aiming
* <kbd>Left stick</kbd>: horizontal movement
* <kbd>Right trigger</kbd>: move up
* <kbd>Left trigger</kbd>: move down
* <kbd>Left stick click</kbd>: speed boost
* <kbd>D-pad up/down</kbd>: speed increase/decrease (make sure to enable `framerate_throttle 1` first)
* <kbd>D-pad left/right</kbd>: roll

Analog control of the camera with the gamepad makes a great filming tool for your custom map trailers.

# Object spawning
You can quickly spawn a variety of objects for testing:

* Spawn all vehicles by entering `cheat_all_vehicles` into the console.
* Spawn all weapons by by entering `cheat_all_weapons` into the console.

# Known issues
* Sound doesn't work.
* No main menu is included so if you launch standalone, you will be spawned in a black void. To get out, refer to [#Usage][h3-standalone-build#usage]
* Particles and the like look different from the cache build.
