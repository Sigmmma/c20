**Sapien**, part of the [HEK][], is a visual [scenario][] and [BSP][scenario_structure_bsp] editor used to populate levels with objects, configure BSP [cluster data][scenario_structure_bsp#clusters-and-cluster-data] like wind and sound environments, compile scripts, and more. Sapien shares some systems with Halo itself, including its AI system to support interactive AI scripting and debugging. Other systems, such as weather rendering, are not represented.

It is roughly analagous to Forge found in later Halo titles, although the user cannot interact with the world as a player. Users primarily interact with Sapien's windows and menus, but the _Game Window_ also includes a scripting console which supports many more debug commands than the in-game one.

# Windows
## Game window
The game window is the main interface when interacting with objects in the level. It is also where you can run commands by pressing the <kbd>~</kbd> (tilde) key. The resolution and aspect ratio cannot be adjusted.

Movement of the camera is done in the same way as the in-game debug camera; **hold the middle mouse button** plus:

* Use the mouse to aim
* Move with <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd>, and <kbd>D</kbd>
* Go up with <kbd>R</kbd> and down with <kbd>F</kbd>
* Rotate with <kbd>G</kbd>
* Increase camera speed by scrolling down or pressing <kbd>Shift</kbd>
* Decrease camera speed by scrolling up

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

If you want progress feedback updated more frequently, you can set `radiosity_step_count 1`. See [Tool's lightmaps documentation][tool#lightmaps] for an explanation of the `radiosity_quality` value. Using [LM_Tool][] is recommended for high quality lightmaps since it is easier to control the stop parameter (when to save) and is faster than using Sapien or Tool.

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
      <td>The game window is completely black and does not display the console when <kbd>~</kbd> (tilde) is pressed.</td>
      <td>

Sapien, like Halo, does not support [MSAA][msaa]. Add Sapien as a program in your graphics control panel and disable anti-aliasing for it.
      </td>
    </tr>
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
\halopc\haloce\source\rasterizer\dx9\rasterizer_dx9_hardware_bitmaps.c(148): E_OUTOFMEMORY in IDirect3DDevice9_CreateTexture(global_d3d_device, width, height, bitmap->mipmap_count+1-mip_levels_to_drop, 0, rasterizer_bitmap_format_table[bitmap->format], D3DPOOL_MANAGED, &(IDirect3DTexture9*)bitmap->hardware_format, NULL) (code=-2147024882, error=<can't get description>)
10.01.19 17:07:33  couldn't allocate #1398128 tag data for 'bitmap_pixel_data'
      </td>
      <td>You are running out of memory. Try freeing up more physical memory on your system, and/or using a <a href="#limits">large address aware Sapien</a>.</td>
    </tr>
    <tr>
      <td>
EXCEPTION halt in \halopc\haloce\source\sound\sound_dsound_pc.c,#1940: properties->gain>=0.f && properties->gain<=1.f
      </td>
      <td>Restart your PC and the issue should go away.</td>
    </tr>
    <tr>
      <td>
\halopc\haloce\source\rasterizer\dx9\rasterizer_dx9_hardware_bitmaps.c(148): E_OUTOFMEMORY in IDirect3DDevice9_CreateTexture(global_d3d_device, width, height, bitmap->mipmap_count+1-mip_levels_to_drop, 0, rasterizer_bitmap_format_table[bitmap->format], D3DPOOL_MANAGED, &(IDirect3DTexture9*)bitmap->hardware_format, NULL) (code=-2147024882, error=<can't get description>)
      </td>
      <td>

You have a [bitmap][] tag which is too large. Do not exceed dimensions of 2048 pixels because support is GPU-dependent; technically DirectX 9 did not allow sizes over this limit.
      </td>
    </tr>
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

[msaa]: https://en.wikipedia.org/wiki/Multisample_anti-aliasing
