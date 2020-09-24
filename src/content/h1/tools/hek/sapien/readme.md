---
title: Sapien
toolName: Sapien
stub: true
img: netgame_equipment_04_large.gif
imgCaption: Sapien being used to place item spawns in `tutorial.map`
keywords:
  - scenario
thanks:
  - to: Real Fake Doors
    for: Sharing NT Core knowledge
  - to: gruntfromhalo
    for: Discovering fog plane fix
  - to: Jakey
    for: Known issues, transparent self occlusion crash explanation
  - to: GAIGHER
    for: Multi-core crash solution
---
**Sapien**, part of the [HEK][], is a visual [scenario][] and [BSP][scenario_structure_bsp] editor used to populate levels with objects, configure cluster data like wind and sound environments, compile scripts, and more. Sapien shares some systems with Halo itself, including its AI system to support interactive AI scripting and debugging. Other systems, such as weather rendering, are not represented.

It is roughly analagous to Forge found in later Halo titles, although the user cannot interact with the world as a player. Users primarily interact with Sapien's windows and menus, but the _Game Window_ also includes a scripting console which supports many more debug commands than the in-game one.

# Windows
## Hierarchy view
The Hierarchy view displays all the objects currently placed in the game and organizes them by type. The left pane of the window shows the Hierarchy tree and currently selected type, and the right pane shows the objects of this selected group or type that are currently placed in the level.

## Tool window
This window contains settings for the currently active tool mode, such as object placement, detail object painting, or cluster properties application. The currently active tool depends on the selected hierarchy view item.

The most commonly used settings, or options that are modified the most, are the options under the _Active marker handles_ section and the _Don't draw center marker_ option.

## Properties palette
The Properties palette window displays the properties for the currently selected hierarchy item. The type of object can be changed or chosen in this display as well as various other properties such as the position and rotation of the object, and spawn flags that set various attributes for the object.

When applying cluster properties, the camera location in the game window determines the active cluster shown in this window.

## Game window
The game window is the main interface when interacting with objects in the level. It is also where you can run commands by pressing the <kbd>~</kbd> (tilde) key.

The resolution and aspect ratio cannot be adjusted.

## Output window
This window is unused and can be ignored.

# Radiosity
Both Tool and Sapien can be used to generate [lightmaps][]. To use Sapien, enter the following console commands:

```console
;0 for low quality, 1 for high, or a value like 0.8
radiosity_quality 1
;begins radiosity. numbers will start to count down
radiosity_start
;wait for the numbers to count down to 0 or near 0, then:
radiosity_save
```

See [Tool's lightmaps documentation][tool#lightmaps] for an explanation of the `radiosity_quality` value. Using [LM_Tool][] is recommended for high quality lightmaps since it is easier to control the stop parameter (when to save) and is faster than using Sapien or Tool.

# Compatibility
Windows users have experienced saving issues related to the Virtual Store. Ensure you have the [right permissions][tips#windows-virtual-store] before editing tags.

On Linux, Sapien can be run successfully using [Wine][] but is not yet compatible with [DXVK][]. Use built-in or standard native DirectX libraries instead.

# Limits
As an older 32-bit Windows application, Sapien is limited to 2 GB of virtual memory even on modern 64-bit Windows systems for compatibility. While this memory limit is usually not an issue, an abundance of large textures and other large assets in a map may cause Sapien to crash. To work around this, `sapien.exe` can be patched to tell the OS it supports 4 GB of virtual memory using a utility like [NTCore][ntcore].

[wine]: https://www.winehq.org/
[dxvk]: https://github.com/doitsujin/dxvk
[ntcore]: https://ntcore.com/?page_id=371

# Troubleshooting
## Interface
<table>
  <thead>
    <tr>
      <th style="width:50%">Issue</th>
      <th style="width:50%">Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The "edit types" window does not allow tags to be added.</td>
      <td>Unknown. Potential issue with Windows compatibility modes. Try running without a compatibility mode.</td>
    </tr>
    <tr>
      <td>Child windows are not visible or stuck outside the main window.</td>
      <td>
        <p>Open the registry key <code>HKEY_USERS\S-1-5-21-0-0-0-1000\Software\Microsoft\Microsoft Games\Halo HEK\sapien</code> (user ID may vary) using regedit and delete all entries ending with "rect".</p>
      </td>
    </tr>
    <tr>
      <td>
        Sapien debug wireframe colors and bounding radii change at angles and turn black, making it hard to identify their types.
      </td>
      <td>None known.</td>
    </tr>
  </tbody>
</table>

## Crashes
When Sapien crashes, check `debug.txt` for hints. You can ignore `Couldn't read map file './sapienbeta.map'`.

<table>
  <thead>
    <tr>
      <th style="width:50%">Error</th>
      <th style="width:50%">Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
EXCEPTION halt in .\\\\detail_object_tool_handler.cpp,#103: &diffuse_color: assert_valid_real_rgb_color(-9.395227, -3.398408, -2.530689)
      </td>
      <td>

A [detail object][detail_object_collection] was painted outside the map. Be careful when painting around corners and small spaces, and save frequently.
      </td>
    </tr>
    <tr>
      <td>
EXCEPTION halt in /halopc/haloce/source/cseries/profile.c,#442: parent_timesection->self_msec >= child_timesection->elapsed_msec
      </td>
      <td>

This may be caused by a multi-core processor. Try running in Windows 98 compatibility mode, or setting the process affinity to a single core using Task Manager before opening the scenario.
      </td>
    </tr>
    <tr>
      <td>
EXCEPTION halt in \halopc\haloce\source\rasterizer\rasterizer_transparent_geometry.c,#137: group->sorted_index>=0 && group->sorted_index<transparent_geometry_group_count
      </td>
      <td>

An [object][] has _transparent self occlusion_ enabled while also referencing a transparent [shader][] with _extra layers_. This is not a problem in-game.
      </td>
    </tr>
    <tr>
      <td>
EXCEPTION halt in \halopc\haloce\source\rasterizer\dx9\rasterizer_dx9.c,#2014: global_window_parameters.fog.planar_maximum_depth>0.0f
      </td>
      <td>

Try moving or resizing your [fog plane(s)][scenario_structure_bsp#fog-planes].
      </td>
    </tr>
  </tbody>
</table>
