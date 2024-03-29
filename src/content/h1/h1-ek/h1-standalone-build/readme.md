---
title: H1 Standalone
about: 'tool:H1-standalone'
img: halo_tag_test.jpg
caption: Using some `ai_render_*` and `ai_debug_*` globals
keywords:
  - test
  - cache
  - h1a
  - tag_test
  - tag test
redirects:
  - /h1/tools/h1a-ek/h1a-standalone-build
thanks:
  num0005: Documenting H1A standalone build
  Zeddikins: Finding the spawning hotkeys
---
**Standalone** (halo_tag_test.exe), often called **tag test** after its [build type](~blam#build-types), is a special build of H1 used for testing mods. It loads scenarios from loose [tags](~general/tags) rather than built [maps](~general/maps), and includes a wide variety of debugging features. Standalone is part of the H1A mod tools and not included in the [HEK](~custom-edition#halo-editing-kit).

This build doesn't include network functionality but can load multiplayer scenarios and test [game modes](~game-modes). For testing singleplayer missions, it includes AI debugging code not included in other published builds of the engine. [Using custom content paths](~mod-tools#using-custom-content-paths) is supported.

{% alert type="info" %}
There can be small differences between the way a map plays in Standalone and MCC. Maps should always receive final testing as [map cache files](~maps) loaded by MCC itself.
{% /alert %}

# Usage
The UI works to a limited degree but loading scenarios is best done using the [`map_name`](~scripting#functions-map-name) command in the [console](~developer-console). Note: you need to use the **full scenario tag path** since this is a [tag build](~blam#build-types). The path is relative to the `tags` folder and does not include the `.scenario` suffix. For example:

```consoleh1a
; load the singleplayer mission a30:
map_name levels\a30\a30
; set the game mode to slayer and load blood gulch:
game_variant slayer
map_name levels\test\bloodgulch\bloodgulch
; if your tag path contains spaces, use quotes:
map_name "levels\test\my level\my level"
```

To avoid having to enter these and other debugging commands every time you start Standalone, you can place commands in an [init.txt](~arguments#init-txt) file and they will be run automatically on startup. You also don't need to reopen Standalone every time you maked changes to your tags; simple access `map_name` again in your console history ({% key "Up" /%} key) to reload the map with updated tags.

Standalone supports some of the same [arguments](~arguments#arguments-list) that H1CE does, such as `-vidmode 2560,1440,120` to set resolution and `-windowed` mode. You can toggle full-screen with {% key "Alt+Enter" /%}.

# Use cases
This build offers a number of benefits for testing over compiling cache files for H1A:

* Since it loads tags, you can edit tags then simply reload the map with `map_name` to see changes. Remember that the [console](~developer-console) contains the history of previously run commands. This is not quite real-time tag editing, but it's close.
* [Script stack space](~scripting#stack-space-is-limited) is validated unlike release builds.
* You have access to **all** console functions and globals in a much more interactive environment than Sapien to help you troubleshoot your content.

# Debug camera controls
To enter into the debug camera, open the [console](~developer-console) and enter `debug_camera_save` followed by `debug_camera_load` or press {% key "Backspace" /%} until you are in flying camera mode. Movement of the camera is a little different than in Sapien or H1CE. You do _not_ need to hold the middle mouse button and the camera moves in the direction it's pointed rather than its vertical movement being controlled exclusively with buttons.

* {% key "Backspace" /%}: Cycle camera modes (1st person, 3rd person, flying)
* Use the mouse to aim
* Move with {% key "W" /%}, {% key "A" /%}, {% key "S" /%}, and {% key "D" /%}
* Go up with {% key "R" /%} and down with {% key "F" /%} (camera relative, not world relative)
* Increase/decrease camera speed by scrolling down/up
* Temporarily boost camera speed by holding {% key "Ctrl" /%}
* Rotate clockwise with {% key "G" /%}

You can also use a gamepad to control the camera:

* {% key "Right bumper (hold)" /%}: Cycle camera modes (1st person, 3rd person, flying)
* {% key "Right stick click" /%}: toggle gamepad control of the debug camera
* {% key "Right stick" /%}: aiming
* {% key "Left stick" /%}: horizontal movement
* {% key "Right trigger" /%}: move up
* {% key "Left trigger" /%}: move down
* {% key "Left stick click" /%}: speed boost
* {% key "D-pad up/down" /%}: speed increase/decrease (make sure to enable `framerate_throttle 1` first)
* {% key "D-pad left/right" /%}: roll

Analog control of the camera with the gamepad makes a great filming tool for your custom map trailers.

# Object spawning
You can quickly spawn a variety of objects for testing:

* Spawn all [bipeds](~biped) by pressing {% key "Ctrl + F7" /%}.
* Spawn all [vehicles](~vehicle) by pressing {% key "Shift + F7" /%} or entering `cheat_all_vehicles` into the console.
* Spawn all [weapons](~weapon) by pressing {% key "F7" /%} or entering `cheat_all_weapons` into the console.
* Spawn just a Warthog by entering `cheat_spawn_warthog` into the console.

# Profile files
H1 standalone stores its profiles and savegames in a [binary format](~files#profile-and-savegame-files) under `C:\Users\%username%\Documents\My Games\Halo1A`. Sometimes you may need to delete the contents of this folder if scenarios which loaded successfully before will no longer load, often with `debug.txt` errors like these:

```
EXCEPTION halt in c:\mcc\release\h1\code\h1a2\sources\tag_files\tag_groups.c,#4437: !block->definition || block->definition->element_size==element_size

EXCEPTION halt in e:\jenkins\workspace\mcch1code-release\mcc\release\h1\code\h1a2\sources\memory\data.c,#723: script node index #0 (0x12d0000) is unused or changed

EXCEPTION halt in e:\jenkins\workspace\mcch1code-release\mcc\release\h1\code\h1a2\sources\memory\data.c,#723: hs thread index #0 (0xf3690000) is unused or changed

EXCEPTION halt in e:\jenkins\workspace\mcch1code-release\mcc\release\h1\code\h1a2\sources\memory\data.c,#723: object looping sounds index #4059 (0x40c90fdb) is unused or changed
```

This is because the files in your profile can contain memory dumps which, when loaded, are not compatible between reloads of your tags or tag edits.

# Known issues

* Sound cuts out - ensure `framerate_throttle 1` is set.
* Menus are rendered at their native size of 640x480 in the top left corner of the screen rather than stretched to the entire game resolution.
* Low mouse sensitivity in vehicles and when zoomed in.
* Some AI may behave differently than in a [cache build](~blam#build-types). For example, the sentinels during d40's Warthog run are inactive.
* Player cannot be controlled while in debug camera mode.
* Some transparent geometry like lights and decals may be visible even when they are behind an obstruction.
* Crashes that [happen in H1A Sapien](~h1-sapien#crashes) may also occur.
