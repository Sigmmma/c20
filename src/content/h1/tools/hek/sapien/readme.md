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
Sapien is a visual [scenario][] editor used to place objects, configure cluster data, compile scripts, and more.

# Compatibility
On Linux, Sapien can be run successfully using [Wine][] but is not yet compatible with [DXVK][]. Use built-in or standard native DirectX libraries instead.

# Limits
As an older 32-bit Windows application, Sapien is limited to 2GB of virtual memory even on modern 64-bit Windows systems for compatibility. While this memory limit is usually not an issue, an abundance of large textures and other large assets in a map may cause Sapien to crash. To work around this, `sapien.exe` can be patched to tell the OS it supports 4GB of virtual memory using a utility like [NTCore][ntcore].

[wine]: https://www.winehq.org/
[dxvk]: https://github.com/doitsujin/dxvk
[ntcore]: https://ntcore.com/?page_id=371
