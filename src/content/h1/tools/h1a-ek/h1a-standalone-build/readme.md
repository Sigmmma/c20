The [H1A-EK][] includes a **standalone build** of that game (**halo_tag_test.exe**). This build doesn't include network functionality and it intended for testing single-player maps. It includes AI debugging code not included in other published builds of the engine.
[Using custom content paths][using-custom-content-paths] is supported.

```.alert danger
The standalone build is still somewhat experimental and bugs should be expected. Again, only single-player maps are officially supported at this time. Maps should always receive final testing as [map cache files][map] loaded by MCC itself.
```

# Usage
The UI works to a limited degree but loading maps is best done using the [`map_name`][scripting#functions-map-name] command in the [console][developer-console]. Note: you need to use the **full scenario tag path** as this is a [tag build][build-types#tag]. For example:

```consoleh1a
; load tags\levels\a30\a30.scenario:
map_name levels\a30\a30
; load tags\levels\test\bloodgulch\bloodgulch.scenario:
map_name levels\test\bloodgulch\bloodgulch
```

This build supports some of the same [arguments][arguments#arguments-list] that H1CE does, such as `-vidmode 2560,1440,120` to set resolution and `-windowed` mode.

# Use cases
This build offers a number of benefits for testing over compiling cache files for H1A:

* Since it loads tags, you can edit tags then simply reload the map with `map_name` to see changes. Pair this with `game_save` to return to the same place. This is not quite real-time tag editing, but it's close.
* [Script stack space][scripting#stack-space-is-limited] is validated unlike release builds.
* You have access to **all** console functions and globals in a much more interactive environment than Sapien to help you troubleshoot your content.

# Debug camera controls
To enter into the debug camera, open the [console][developer-console] and enter `debug_camera_save` followed by `debug_camera_load` or press <kbd>Backspace</kbd> until you are in flying camera mode. Movement of the camera is a little different than in Sapien or H1CE. You do _not_ need to hold the middle mouse button and the camera moves in the direction it's pointed rather than its vertical movement being controlled exclusively with buttons.

* <kbd>Backspace</kbd>: Cycle camera modes (1st person, 3rd person, flying)
* Use the mouse to aim
* Move with <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd>, and <kbd>D</kbd>
* Go up with <kbd>R</kbd> and down with <kbd>F</kbd> (camera relative, not world relative)
* Increase/decrease camera speed by scrolling down/up
* Temporarily boost camera speed by holding <kbd>Ctrl</kbd>
* Rotate clockwise with <kbd>G</kbd>

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

* Spawn all [bipeds][biped] by pressing <kbd>Ctrl + F7</kbd>.
* Spawn all [vehicles][vehicle] by pressing <kbd>Shift + F7</kbd> or entering `cheat_all_vehicles` into the console.
* Spawn all [weapons][weapon] by pressing <kbd>F7</kbd> or entering `cheat_all_weapons` into the console.
* Spawn just a Warthog by entering `cheat_spawn_warthog` into the console.

# Known issues

* Sound cuts out - ensure `framerate_throttle 1` is set.
* Menus are rendered at their native size of 640x480 in the top left corner of the screen rather than stretched to the entire game resolution.
* Low mouse sensitivity in vehicles and when zoomed in.
* Some AI may behave differently than in a [cache build][build-types#cache]. For example, the sentinels during d40's Warthog run are inactive.
* Player cannot be controlled while in debug camera mode.
* Some transparent geometry like lights and decals may be visible even when they are behind an obstruction.
* Crashes that [happen in H1A Sapien][h1a-sapien#crashes] may also occur.
