---
title: H1CE Sapien (2004)
about: 'tool:Sapien'
img: netgame_equipment_04_large.gif
caption: Sapien being used to place item spawns in `tutorial.map`
keywords:
  - scenario
thanks:
  General_101: Additional Sapien hotkey documentation
  The Cereal Killer: Discovering Sapien keyboard shortcuts
  kirby_422: Describing baggage.txt file
  Real Fake Doors: Sharing NT Core knowledge
  gruntfromhalo: Discovering fog plane fix
  Jakey: 'Known issues, transparent self occlusion crash explanation'
  GAIGHER: Multi-core crash solution
  InfernoPlus: Sound gain crash solution
  aLTis: Relight detail object collections tip
---
{% alert %}
This is an article about the legacy Sapien for use with [Halo: Custom Edition](~h1), for the H1A Sapien for MCC see [H1A Sapien](~h1a-sapien)
{% /alert %}
**Sapien**, part of the [HEK](~), is a visual [scenario](~) and
[BSP](~scenario_structure_bsp) editor used to populate levels with objects,
configure BSP [cluster data](~scenario_structure_bsp#clusters-and-cluster-data) like wind and sound environments, compile [scripts](~scripting), and more. Sapien shares some systems with Halo itself, including its AI system to support interactive AI scripting and debugging. Other systems, such as weather rendering, are not represented.

It is roughly analagous to Forge found in later Halo titles, although the user cannot interact with the world as a player. Users primarily interact with Sapien's windows and menus, but the _Game Window_ also includes a scripting console which supports many more debug commands than the in-game one.

# Menu options
## Switch BSP
It is common for singleplayer scenarios to be comprised of multiple [BSPs](~scenario_structure_bsp). The _Edit > Switch BSP_ option is used to change between them. **Always use this option to switch BSPs** and don't use [`switch_bsp`](~scripting#functions-switch-bsp) in the [console](~developer-console). The menu option performs additional functions that maintain proper editor state, whereas `switch_bsp` is intended for level scripts.

# Windows
## Game window
The game window is the main interface when interacting with objects in the level. It is also where you can run commands by pressing the {% key "~" /%} (tilde) key. The resolution and aspect ratio cannot be adjusted.

Movement of the camera is done in the same way as the in-game debug camera; **hold the middle mouse button** plus:

* Use the mouse to aim
* Move with {% key "W" /%}, {% key "A" /%}, {% key "S" /%}, and {% key "D" /%}
* Go up with {% key "R" /%} and down with {% key "F" /%}
* Increase camera speed by scrolling down or pressing {% key "Shift" /%}
* Decrease camera speed by scrolling up

Camera rotation with the {% key "G" /%} key is only supported in-game and not in Sapien.

## Hierarchy view
The Hierarchy view displays all the objects currently placed in the game and organizes them by type. The left pane of the window shows the Hierarchy tree and currently selected type, and the right pane shows the objects of this selected group or type that are currently placed in the level.

## Tool window
This window contains settings for the currently active tool mode, such as object placement, detail object painting, or cluster properties application. The currently active tool depends on the selected hierarchy view item.

The most commonly used settings, or options that are modified the most, are the options under the _Active marker handles_ section and the _Don't draw center marker_ option.

## Properties palette
The Properties palette window displays the properties for the currently selected hierarchy item. The type of object can be changed or chosen in this display as well as various other properties such as the position and rotation of the object, and spawn flags that set various attributes for the object.

When applying cluster properties, the camera location in the game window determines the active cluster shown in this window.

## Output window
This window is unused and can be ignored.

# Keyboard shortcuts/hotkeys
Some of these shortcuts are only used in certain windows or editor modes.

## General
* {% key "~" /%}: Opens the command console.
* {% key "Space" /%}: clones the selected object to the camera's location and orientation. If multiple objects are selected, uses the first.
* {% key "Pause/Break" /%}: Pauses your Sapien instance. Press "OK" in the opened window to resume Sapien.
* {% key "Control + B" /%}: Open the BSP switch dialog window.
* {% key "Control + Shift + B" /%}: Creates the file `baggage.txt`. If you end up getting a maximum tag slots error or are [running low on tag space](~map#limits), this file shows the memory usage of tags in the editor.
* {% key "Shift + Click" /%}: Select a group of objects or keep previously placed objects selected. You can also use it to select the first and last object in the hierarchy list to select everything in-between at once. Useful for deleting multiple objects or moving them all at once.
* {% key "Control + Click" /%}: Select a group of objects or keep previously placed objects selected. This will only select the object you specifically click in the hierarchy list. Useful for deleting multiple objects or moving them all at once.
* Hold {% key "Tab" /%}: Using this key combo while having an object selected will set the rotation gizmo to sync with the local rotation of the object. Only really useful if "Local Axes" is not enabled.
* In the hierarchy view, pressing a key will cycle through all folders that start with that character. For example, pressing {% key "A" /%} while having the "Missions" folder expanded will immediately take you to the "AI" folder.
* {% key "N" /%}: This hotkey will snap a selected object to the normal of the ground below it. **This hotkey is broken in the Gearbox HEK release and can cause Sapien to crash when restarted. Do not use it!** It also causes editor icons and name overlays to disappear for the session. This issue is fixed in [H1A Sapien](~h1a-sapien).

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
* {% key "Caps lock" /%}: Start/stop animation recording. Unfortunately it is not possible to control the posessed unit while recording.
* {% key "Shift + Q" /%}: Exits a posessed unit while in scripted camera mode.

See main page: [recorded-animations](~)

## Detail objects painting
* {% key "Shift + Right Click" /%}: Erases all detail objects in a highlighted cell.
* {% key "Shift + Control + Right Click" /%}: As above, but also deleted the cell itself.
* {% key "Shift + Control + L" /%}: Relight detail objects (useful after updating [lightmaps](~)).

# Radiosity
Both Tool and Sapien can be used to generate [lightmaps](~). To use Sapien, enter the following console commands:

```console
;0 for low quality, 1 for high, or a value like 0.8
radiosity_quality 1
;begins radiosity. numbers will start to count down
radiosity_start
;wait for the numbers to count down to 0 or near 0, then:
radiosity_save
```

If you want progress feedback updated more frequently, you can set `radiosity_step_count 1`. See [Tool's lightmaps documentation](~tool#lightmaps) for an explanation of the `radiosity_quality` value. Using [LM_Tool](~) is recommended for high quality lightmaps since it is easier to control the stop parameter (when to save) and is faster than using Sapien or Tool.

# editor_init.txt
At startup, Sapien will load `editor_init.txt` if present in the same folder. This file can contain [console commands](~developer-console), one per line, which are executed automatically for you. For example:

```inittxt
sound_enable 0
debug_objects 1
;a comment
```

# Compatibility
Windows users have experienced saving issues related to the Virtual Store. Ensure you have the [right permissions](~tips#windows-virtual-store) before editing tags.

On Linux, Sapien can be run successfully using [Wine][] but is not yet compatible with [DXVK][]. Use built-in or standard native DirectX libraries instead.

# Limits
As an older 32-bit Windows application, Sapien is limited to 2 GB of virtual memory even on modern 64-bit Windows systems for compatibility. While this memory limit is usually not an issue, an abundance of large textures and other large assets in a map may cause Sapien to crash. To work around this, `sapien.exe` can be patched to tell the OS it supports 4 GB of virtual memory (large address aware, or LAA) using a utility like [NTCore][ntcore]. To do this:

* Install [NTCore 4GB Patch](https://ntcore.com/?page_id=371)
* Run the 4GB Patch.
* Select the Sapien executable.
* NTCore will apply the patch. After it's finished, press OK. Sapien has now been patched to support 4 GB of virtual memory.

[H1A Sapien](~h1a-sapien) is already LAA.

# Troubleshooting
## Interface

{% table %}
* Issue
* Solution
---
* The game window is completely black and does not display the console when {% key "~" /%} (tilde) is pressed.
* Sapien, like Halo, does not support [MSAA][msaa]. Add Sapien as a program in your graphics control panel and disable anti-aliasing for it. Fixed in [H1A Sapien](~h1a-sapien)
---
* The "edit types" window does not allow tags to be added.
* Unknown. Potential issue with Windows compatibility modes. Try running without a compatibility mode.
---
* Child windows are not visible or stuck outside the main window.
* Open the registry key `HKEY_USERS\S-1-5-21-0-0-0-1000\Software\Microsoft\Microsoft Games\Halo HEK\sapien` (user ID may vary) using regedit and delete all entries ending with "rect".
---
* Sapien debug wireframe colors and bounding radii change at angles and turn black, making it hard to identify their types.
* None known for Gearbox Sapien, fixed in [H1A Sapien](~h1a-sapien)
{% /table %}

## Crashes
When Sapien crashes, check `debug.txt` for hints. You can ignore `Couldn't read map file './sapienbeta.map'`.

{% dataTable
  dataPath="crashes/crashes"
  wrapPre=true
  columns=[
    {name: "Error", key: "error", format: "codeblock", style: "width:50%"},
    {name: "Solution", key: "solution", style: "width:50%"}
  ]
/%}


[msaa]: https://en.wikipedia.org/wiki/Multisample_anti-aliasing
[wine]: https://www.winehq.org/
[dxvk]: https://github.com/doitsujin/dxvk
[ntcore]: https://ntcore.com/?page_id=371