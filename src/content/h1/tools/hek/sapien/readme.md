---
title: Sapien
toolName: Sapien
stub: true
img: netgame_equipment_04_large.gif
imgCaption: Sapien being used to place item spawns in `tutorial.map`
thanks:
  - to: Real Fake Doors
    for: Sharing NT Core knowledge
  - to: gruntfromhalo
    for: Discovering fog plane fix
---
**Sapien** is a visual [scenario][] and [BSP][scenario_structure_bsp] editor used to populate levels with objects, configure cluster data like wind and sound environments, compile scripts, and more. Sapien shares some systems with Halo itself, including its AI system to support interactive AI scripting and debugging. Other systems, such as weather rendering, are not represented.

It is roughly analagous to Forge found in later Halo titles, although the user cannot interact with the world as a player. Users primarily interact with Sapien's windows and menus, but the _Game Window_ also includes a scripting console which supports many more debug commands than the in-game one.

# Radiosity
Both Tool and Sapien can be used to generate [lightmaps][]. To use Sapien, press <kbd>~</kbd> (tilde) in the Game Window and enter the console commands:

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
  </tbody>
</table>

## Crashes
When Sapien crashes, check `debug.txt` for hints.

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
10.24.08 07:45:44 EXCEPTION halt in \halopc\haloce\source\rasterizer\dx9\rasterizer_dx9.c,#2014: global_window_parameters.fog.planar_maximum_depth>0.0f
      </td>
      <td>
        Try moving or resizing your <a href="/h1/tags/scenario_structure_bsp#fog-planes">fog plane(s)</a>.
      </td>
    </tr>
  </tbody>
</table>
