---
title: H1 Sapien
about: 'tool:H1-Sapien'
img: h1a-sapien-c20.jpg
caption: Editing chapter titles on the c20 campaign scenario using H1A Sapien.
keywords:
  - scenario
  - h1a
  - ai
  - encounter
  - squad
  - weather
  - spawns
  - pickups
  - population
  - populate
  - place
  - cinematic
redirects:
  - /h1/tools/hek/sapien
  - /h1/tools/h1a-ek/h1a-sapien
thanks:
  num0005: Update for H1A
  General_101: Additional Sapien hotkey documentation and update for H1A.
  The Cereal Killer: Discovering some Sapien keyboard shortcuts
  kirby_422: Describing baggage.txt file
  Real Fake Doors: Sharing NT Core knowledge
  gruntfromhalo: Discovering fog plane fix
  Jakey: 'Known issues, transparent self occlusion crash explanation'
  InfernoPlus: Sound gain crash solution
  GAIGHER: Multi-core crash solution
  aLTis: Relight detail object collections tip
  Shigure: Confirming fix for firing positions outside BSP
---
**Sapien** is an interactive [scenario](~) and [BSP](~scenario_structure_bsp) editor used for populating levels with objects and AI encounters,
configuring BSP [cluster data](~scenario_structure_bsp#clusters-and-cluster-data) like wind and sound environments, running [radiosity](#radiosity), compiling [scripts](~scripting), and more. It includes a [scripting console](~developer-console) and runs many of the same systems as Halo like AI and scripting, allowing you to preview encounters and inspect the game world with debug settings.

Unlike later games, H1 Sapien does not include a full player simulation mode and there is only a basic recorded animations mode, but you can use [Standalone](~h1-standalone-build) to test a level as a player instead.

This page covers both H1A and [HEK](~custom-edition#halo-editing-kit) versions of Sapien, which generally work the same but have [some differences](~h1-ek#sapien).

# Configuration
Similar to how [Custom Edition](~custom-edition) and [Standalone](~h1-standalone-build) automatically run [console](~developer-console) commands at startup from `init.txt`, you can also create `editor_init.txt` for Sapien. Include console commands, one per line, in this file and Sapien will run them at startup. You can comment-out lines with a semicolon.

For example, enabling `debug_objects 1` in H1A Sapien has some different defaults than HEK Sapien. You may wish to change these defaults for each startup:

```inittxt
;restore default debug_objects appearance from HEK Sapien for H1A Sapien
debug_objects_collision_models 1
debug_objects_bounding_spheres 1
debug_objects_root_node 0
```

Or if you prefer not to see the green lines on the BSP when the camera goes outside it, you can disable it:

```inittxt
debug_structure_automatic 0
```

These lines will also be present in your console's history so you can use this to preload commonly used toggles.

H1A Sapien also supports several command line arguments. These features are experimental and might not work as expected:

* `-multipleinstance`: Allow multiple instances of Sapien to be launched at once.
* `-data_dir` and `-tags_dir`: Used to set [custom content paths](~mod-tools#using-custom-content-paths).

# Menu options
## Compile scripts
With the classic HEK tools, it's necessary to _compile scripts_ into your scenario tag using Sapien before they will take effect. Open your scenario in Sapien, then select _File > Compile Scripts_.

This takes the [script sources](~scripting) from your level's `scripts` folder and compiles them into script node data embedded in your scenario tag, which is what the game actually uses at runtime. For example, if your scenario is `tags\levels\test\tutorial\tutorial.scenario`, you would place your script file in `data\levels\test\tutorial\scripts\`. Your script file can be named anything, but must have a `.hsc` file extension. If there are any compilation errors, Sapien will display them in the _Game window_.

This step is **not necessary with the H1A tools** because they automatically compile scripts from source data whenever a scenario tag is loaded by Sapien or Standalone, or built into a map using Tool.

## Switch BSP
It's common for singleplayer scenarios to include multiple [BSPs](~scenario_structure_bsp). Use the _Edit > Switch BSP_ menu to change between them, but **never use** [`switch_bsp`](~scripting#functions-switch-bsp) in the console. The menu option maintains proper editor state, whereas `switch_bsp` is intended for level scripts.

# Windows
## Game window
The game window is the main interface when interacting with objects in the level. It is also where you can run commands by pressing the {% key "~" /%} (tilde) key. The resolution and aspect ratio cannot be adjusted.

Movement of the camera is done in the same way as the in-game debug camera; **hold the middle mouse button**  (unless you lock the mouse) plus:

* Use the mouse to aim
* Move with {% key "W" /%}, {% key "A" /%}, {% key "S" /%}, and {% key "D" /%}
* Go up with {% key "R" /%} and down with {% key "F" /%}
* Increase camera speed by scrolling down or pressing {% key "Shift" /%}
* Decrease camera speed by scrolling up
* Temporarily boost camera speed by holding {% key "Ctrl" /%} (new in H1A Sapien)

Camera rotation with the {% key "G" /%} key is only supported in-game and not in Sapien. If you have accidentally opened the singleplayer pause menu, it can be closed again with {% key "Middle mouse + Escape" /%}.

New in H1A Sapien, you can also use a gamepad to control the camera:

* {% key "Right stick click" /%}: toggle gamepad control
* {% key "Right stick" /%}: aiming
* {% key "Left stick" /%}: horizontal movement
* {% key "Right trigger" /%}: move up
* {% key "Left trigger" /%}: move down
* {% key "Left stick click" /%}: speed boost
* {% key "D-pad up/down" /%}: speed increase/decrease (make sure to enable `framerate_throttle 1` first)

Known issues with gamepad camera control include low aiming sensitivity, lack of stick deadzones, slowness of vertical movement, and speed control framerate dependence.

## Hierarchy view
The Hierarchy view displays all the objects currently placed in the game and organizes them by type. The left pane of the window shows the Hierarchy tree and currently selected type, and the right pane shows the objects of this selected group or type that are currently placed in the level.

## Tool window
This window contains settings for the currently active tool mode, such as object placement, detail object painting, or cluster properties application. The currently active tool depends on the selected hierarchy view item.

The most commonly used settings, or options that are modified the most, are the options under the _Active marker handles_ section and the _Don't draw center marker_ option.

## Properties palette
The Properties palette window displays the properties for the currently selected hierarchy item. The type of object can be changed or chosen in this display as well as various other properties such as the position and rotation of the object, and spawn flags that set various attributes for the object. When applying cluster properties, the camera location in the game window determines the active cluster shown in this window.

If this window doesn't let you interact with it and plays a Windows alert sound when you try, you have an invalid field. Look for which field is being highlighted and correct it (e.g. change `-0` rotation to just `0`).

## Output window
This window is only relevant when [recording animations](~recorded-animations) and can be ignored or minimized otherwise.

# Keyboard shortcuts/hotkeys
Some of these shortcuts are only used in certain windows or editor modes.

## General
* {% key "~" /%}: Opens the HaloScript [console](~developer-console), pressing it again or pressing {% key "enter" /%} on an empty console will close it.
* {% key "Space" /%}: clones the selected object to the camera's location and orientation. If multiple objects are selected, uses the first.
* {% key "Pause/Break" /%}: Pauses your Sapien instance. Press "OK" in the opened window to resume Sapien.
* {% key "Control + B" /%}: Open the BSP switch dialog window.
* {% key "Control + Shift + B" /%}: Creates the file `baggage.txt`. If you end up getting a maximum tag slots error or are [running low on tag space](~maps#limits), this file shows the memory usage of tags in the editor.
* {% key "Shift + Click" /%}: Select a group of objects or keep previously placed objects selected. You can also use it to select the first and last object in the hierarchy list to select everything in-between at once. Useful for deleting multiple objects or moving them all at once.
* {% key "Control + Click" /%}: Select a group of objects or keep previously placed objects selected. This will only select the object you specifically click in the hierarchy list. Useful for deleting multiple objects or moving them all at once.
* Hold {% key "Tab" /%}: Using this key combo while having an object selected will set the rotation gizmo to sync with the local rotation of the object. Only really useful if "Local Axes" is not enabled.
* In the hierarchy view, pressing a key will cycle through all folders that start with that character. For example, pressing {% key "A" /%} while having the "Missions" folder expanded will immediately take you to the "AI" folder.
* {% key "N" /%}: This hotkey will snap a selected object to the normal of the ground below it. **This hotkey is broken in HEK Sapien and can cause it to crash when restarted**, also causing editor icons and name overlays to disappear for the session. This problem was fixed in H1A Sapien.

## Encounters and AI
* {% key "Middle mouse + F1" /%}: Selects the spawned actor in the center of the game view.
* {% key "Middle mouse + F2" /%} Select next encounter. You can also use the console command `ai_select <encounter>`.
* {% key "Middle mouse + F3" /%}: Select previous encounter.
* {% key "Middle mouse + F4" /%}: When an encounter is selected, selects the next actor.
* {% key "Middle mouse + Shift + F4" /%}: Selects the previous actor.
* {% key "Middle mouse + F5" /%}: Cycles through render modes for actor sprays:
  * Actions
  * Activation status
  * None
* {% key "Middle mouse + F6" /%}: Erase all _spawned_ actors, e.g. those created with `ai_place`.
* {% key "M" /%}: Toggles group labels on [firing positions](~ai#firing-positions), shows the default actor for move positions used by a squad instance, and highlights [editor gizmos/placeholders](~placeholder), making them easier to see.

## Recorded animations
These hotkeys apply in scripted camera mode.

* {% key "A" /%}: Toggle "Attach camera to unit" option.
* {% key "E" /%}: Toggle "Edit camera point" option.
* {% key "C" /%}: Toggle "Scripted camera control".
* {% key "Space" /%}: Creates a new camera point at the game view camera's location if "Edit camera point" is disabled. If "Edit camera point" is enabled then it instead moves the "Active camera point" to the camera's location.
* {% key "Shift + V" /%}: Using this key combo while in scripted camera mode will take over (posess) the selected unit.
* {% key "Backspace" /%}: Cycles through camera types for the posessed unit:
  * First person
  * Third person
  * Flycam
* {% key "Caps lock" /%}: Start/stop animation recording.
* {% key "Shift + Q" /%}: Exits a posessed unit while in scripted camera mode.

See main page: [recorded-animations](~)

## Detail objects painting
With detail objects added to their palette, you can use the _Tool window_ to adjust painting settings and paint within the _Game window_.

* {% key "Left Click" /%}: Paints detail objects around the cursor.
* {% key "Right Click" /%}: Erases detail objects around the cursor.
* {% key "Shift + Right Click" /%}: Erases all detail objects in the red-highlighted [cell](~detail_object_collection#cells).
* {% key "Shift + Control + Right Click" /%}: As above, but also deleted the cell itself.
* {% key "Shift + Control + L" /%}: Relight detail objects (useful after updating [lightmaps](~)).

# Radiosity
Both Tool and Sapien can be used to generate [lightmaps](~), though [using H1A tool](~h1-tool#lightmaps) with asserts disabled is **strongly recommended** for high quality lightmaps since it is easier to control the stop parameter (when to save), is much faster, and doesn't require the window to be focused.

Sapien is suitable for draft lighting on basic maps. Enter these console commands in order:

```consoleh1a
;0 for draft quality, 1 for final
radiosity_quality 0
;begins radiosity. numbers will start to count down
radiosity_start
;wait for the numbers to count down to 0 or near 0, then:
radiosity_save
```

Set `radiosity_step_count 1` for more frequent progress feedback.

# Limits
Sapien has 5x higher object limits than the game itself (memory pool size and object count at 2048*5). This is because many objects may simultaneously exist in Sapien which are actually scripted to appear at certain times only during gameplay. Despite this, you may run into other engine limits when dealing with extracted scenarios originally merged from [child scenarios](~scenario#child-scenarios) which wouldn't have individually hit limits.

HEK Sapien is limited to 2 GB of virtual memory even on modern 64-bit Windows systems, which is common for older 32-bit applications. H1A Sapien is already "large address aware" (LAA). While this memory limit is usually not an issue, an abundance of large textures or other tags in a map may cause HEK Sapien to crash. To work around this, `sapien.exe` can be marked LAA to tell the OS it supports 4 GB of virtual memory:

* Applying value `0x2F` at offset `0x136` in the executable if you're comfortable using a hex editor like [ImHex][].
* Or, install and run [NTCore 4GB Patch][ntcore]. Select the Sapien executable.

# Compatibility
* H1A Sapien requires DX11 support, whereas HEK Sapien requires DX9.
* HEK Sapien users have reported problems saving tags due to the Windows VirtualStore. Ensure you have the [right permissions](~custom-edition#installation).
* On Linux, HEK Sapien can be run successfully using [Wine][] but may not yet be compatible with [DXVK][]. If not, use built-in or standard native DirectX libraries instead.

# Troubleshooting
## Interface

{% table %}
* Issue
* Solution
---
* Child windows are not visible or stuck outside the main window.
* Open the following registry key using regedit and delete all entries ending with "rect":
  * H1A: `HKEY_CURRENT_USER\Software\i343\halo1a_sapien`
  * HEK: `HKEY_USERS\S-1-5-21-0-0-0-1000\Software\Microsoft\Microsoft Games\Halo HEK\sapien` (user ID may vary)
---
* Clicking the _Edit Types_ button doesn't open a window.
* Delete `HKEY_CURRENT_USER\Software\i343\halo1a_sapien` in regedit.
---
* Can't change the open scenario
* This is a known issue, simply close Sapien and open it again; this will allow you to open the scenario.
---
* Mouse is locked to game view
* Issue/feature with some keyboard layouts, press the middle mouse button to unlock it.
---
* The game window is completely black and does not display the console when {% key "~" /%} (tilde) is pressed.
* HEK Sapien, like Custom Edition, does not support [MSAA][msaa]. Disable anti-aliasing for Sapien in your graphics control panel. Fixed in [H1A Sapien](~h1-sapien).
---
* The _Edit Types_ window does not allow tags to be added.
* Check the debug.txt log for errors. Otherwise, with HEK Sapien, try running without a compatibility mode if you've set one.
---
* Child windows are not visible or stuck outside the main window.
* Open the registry key  using regedit and delete all entries ending with "rect".
---
* Debug wireframe colors and bounding radii change at angles and turn black, making it hard to identify their types.
* None known for HEK Sapien, fixed in [H1A Sapien](~h1-sapien)
{% /table %}

## Crashes
When Sapien crashes, check `debug.txt` for hints. Most problems are due to invalid tags. HEK Sapien logs `Couldn't read map file './sapienbeta.map'` but you can ignore this.

{% dataTable
  dataPath="crashes/crashes"
  wrapPre=true
  columns=[
    {name: "Error", key: "error", format: "code"},
    {name: "Solution", key: "solution", style: "width:50%"}
  ]
/%}

[msaa]: https://en.wikipedia.org/wiki/Multisample_anti-aliasing
[wine]: https://www.winehq.org/
[dxvk]: https://github.com/doitsujin/dxvk
[ntcore]: https://ntcore.com/?page_id=371
[imhex]: (https://github.com/WerWolv/ImHex)
