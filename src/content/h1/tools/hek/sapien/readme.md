---
title: Sapien
toolName: Sapien
stub: true
img: netgame_equipment_04_large.gif
imgCaption: Sapien being used to place item spawns in `tutorial.map`
thanks:
  - to: Real Fake Doors
    for: Sharing NT Core knowledge
---
**Sapien** is a visual [scenario][] and [BSP][scenario_structure_bsp] editor used to populate levels with objects, configure cluster data like wind and sound environments, compile scripts, and more. Sapien shares some systems with Halo itself, including its AI system to support interactive AI scripting and debugging. Other systems, such as weather rendering, are not represented.

It is roughly analagous to Forge found in later Halo titles, although the user cannot interact with the world as a player. Users primarily interact with Sapien's windows and menus, but the _Game Window_ also includes a scripting console which supports many more debug commands than the in-game one.

# Radiosity
Both [Tool][] and Sapien can be used to generate [lightmaps][]. To use Sapien, press <kbd>~</kbd> (tilde) in the Game Window and enter the console commands:

```console
;0 for low quality, 1 for high, or a value like 0.8
radiosity_quality 1
;begins radiosity. numbers will start to count down
radiosity_start
;wait for the numbers to count down to 0 or near 0, then:
radiosity_save
```

# Compatibility
Windows users have experienced saving issues related to the Virtual Store. Ensure you have the [right permissions][tips#windows-virtual-store] before editing tags.

On Linux, Sapien can be run successfully using [Wine][] but is not yet compatible with [DXVK][]. Use built-in or standard native DirectX libraries instead.

# Limits
As an older 32-bit Windows application, Sapien is limited to 2 GB of virtual memory even on modern 64-bit Windows systems for compatibility. While this memory limit is usually not an issue, an abundance of large textures and other large assets in a map may cause Sapien to crash. To work around this, `sapien.exe` can be patched to tell the OS it supports 4 GB of virtual memory using a utility like [NTCore][ntcore].

[wine]: https://www.winehq.org/
[dxvk]: https://github.com/doitsujin/dxvk
[ntcore]: https://ntcore.com/?page_id=371
