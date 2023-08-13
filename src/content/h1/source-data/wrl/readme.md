---
title: WRL
about: 'resource:wrl'
caption: A collection of nearly coplanar faces seen in isolation.
thanks:
  Conscars: WRL format research
  stunt_man: WRL compatibility and usage notes
---
**WRL files** are created by [Tool](~h1a-tool) when it encounters fatal or warning-level [geometry issues](~bsp-troubleshooting) during model compilation and lightmapping (e.g. open edges, nearly coplanar faces). These files can be reimported back into the user's 3D software to visualize where problematic edges or faces are present and correct them before reattempting model compilation.

When compiling a [BSP](~scenario_structure_bsp), the file will be named after the [JMS](~) file being compiled (e.g. `yourmap.wrl` in H1CE or `yourmap_errors.wrl` in H1A). When geometry errors are found during [radiosity](~lightmaps), Tool will instead output a `debug.wrl`.

The location of the generated WRL file depends on the Tool version:

* [H1CE Tool](~hek/tool) saves to the command prompt's current working directory.
* [H1A Tool](~h1a-tool) saves the file adjacent to the source JMS file, e.g. `data\levels\example\models\example_errors.wrl`

# Compatibility
Some versions of [3ds Max](~3dsmax) (at least 2010) require the 32-bit version in order to import WRL files. [Blender](~) is not able to import Halo's WRL files natively since it supports VRML _2.0_, not _1.0_, but the [Halo Asset Blender Development Toolset](~halo-asset-blender-development-toolset) addon does.
