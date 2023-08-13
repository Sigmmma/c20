---
title: Art tools
redirects:
  - /tools
  - /general/tools
---
While you can accomplish a lot with the mod tools alone, you'll need to use other software to create new assets like textures, models, and animations. Bungie traditionally used [Photoshop](~), [3ds Max](~3dsmax), and [Maya](~). These days we can use free alternatives like [GIMP](~), [Krita](~), and [Blender](~).

# Texturing
Custom textures are created by converting [TIFF][wiki-tiff] images into [bitmap](~h1/tags/bitmap) tags using Tool. TIFF is widely supported and you can use any software that can save TIFFs without compression, with an alpha channel, and preserving RGB data where alpha is 0.

# Modeling
Models and animations are most commonly made in [Blender](~) and exported to [source data](~) format using the [Halo Asset Blender Development Toolset](~halo-asset-blender-development-toolset) and [Foundry](~). Other 3D software is supported using the [FBX pipeline](~fbx).

Sapien allows you place certain objects and set up the scenario but it's not a 3D modeling program. This is different from some other engines that have built-in level editors like Unreal and Source's Hammer. You will need to use external software like Blender to model your [BSP](~h1/tags/scenario_structure_bsp).

[wiki-tiff]: https://en.wikipedia.org/wiki/TIFF