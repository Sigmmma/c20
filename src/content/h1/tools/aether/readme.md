---
title: Aether
toolName: Aether
img: aether.png
imgCaption: |
  Timberland's [BSP][scenario_structure_bsp] and [scenery][] extracted
  for advanced baked lighting
info: |
  * [Download](http://hce.halomaps.org/index.cfm?fid=4312)
keywords:
  - lightmap
  - radiosity
  - max
  - maya
---
Aether is a tool which supports externally baking [lightmaps][] within 3D software like [3ds Max][3dsmax] rather than with the [HEK's][hek] radiosity process. This allows for much higher resolution lightmaps than possible with Tool or Sapien, and shorter baking times since external software is much better optimized for lighting.

# Process
In order to externally light a [BSP][scenario_structure_bsp], all information about shadow-casting surfaces must be present. Aether supports extracting the BSP itself (crucially including its lightmap UVs), [bitmaps][bitmap] with transparency, and instanced shadow-casting fixed objects like [scenery][].

The extracted assets can then be exported for [3ds Max][3dsmax] or [Maya][] using Aether's interactive GUI. Though Aether does not support [Blender][], it should be possible to transfer assets using a 3D interchange format like _collada_ if the supported software is also available.

Within the 3D software, the artist can place lights and bake lighting to a texture using the BSP's lightmap UVs. Aether can then compile the texture back to [bitmap][] format and optionally [dither][dithering] the texture to avoid banding, since lightmaps are 16-bit.


[dithering]: https://en.wikipedia.org/wiki/Dither
