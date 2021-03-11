**WRL files** are created by [H2Tool][] when it encounters fatal or warning-level geometry issues during model compilation and lightmapping (e.g. open edges, nearly coplanar faces). These files can be reimported back into the user's 3D software to visualize where problematic edges or faces are present and correct them before reattempting model compilation.

They are placed in the source directory of the level that H2Tool is working with. When compiling a [BSP][scenario_structure_bsp], the file will be named after the [ASS][] file being compiled (e.g. `yourmap.wrl`).

# Compatibility
Unlike Halo 1 Tool's [WRL 1.0 files][wrl], the WRL files exported by H2Tool are VRML _2.0_. While Blender has some support for the 2.0 version, you may still require older software to import these files. Luckily they aren't nearly as important as they are in CE since [H2Sapien][] displays level errors for you.

# File format description
The WRL ("world") file format is not Halo-specific, but rather a 1997 industry standard called [VRML 2.0][vrml]. They consist of a list of `Separator` nodes, one for each error found by Tool. The file always begins with the comment `#VRML V2.0 utf8`.

[vrml]: https://en.wikipedia.org/wiki/VRML
