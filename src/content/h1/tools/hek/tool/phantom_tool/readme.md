**phantom_tool** is a modified version of [H1CE Tool][hek/tool] which allows the compilation of [BSPs][scenario_structure_bsp] and [model_collision_geometry][] without [collision artifacts][scenario_structure_bsp#collision-artifacts] like phantom BSP. This is done by enabling orphaned code in Tool which fixes phantom BSP.

```.alert
**You do not need this tool if you're working with the H1A Editing Kit.**

The code enabled by this mod is properly supported in [H1A Tool][h1a-tool] using the `fix-phantom-bsp` option for both the `structure` and `collision-geometry` verbs.
```

The produced tags will have larger (by about 23%) collision data compared to tags compiled without the fix applied. The code seems to include more duplication of surfaces at the leaves of the BSP tree.

This tool or [H1A Tool][h1a-tool] should be used instead of [Ghostbuster][] when you have access to the source [JMS][].

# Installation and usage
Move `phantom_tool.exe` to your Halo CE install and use it in the exact same way as regular Tool [structure compilation][tool#structure-compilation]:

```sh
phantom_tool.exe structure levels\a30 a30_a
```

Structure compilation will happen as normal, but with an extra "munging collision bsp" step.

# Caveats
This method of structure compilation is suitable for low complexity BSPs, like multiplayer maps. High polygon count BSPs for singleplayer levels may result in compilation failure with the following error messages:

```
couldn't allocate leaf_map leaves
### ERROR couldn't initialize leaf map.
### ERROR couldn't create leafy bsp.
### ERROR the maid service spilled bleach on the rug.
```

[OpenSauce][] scenarios can cause phantom_tool to hang. Compile the BSP using a dummy stock scenario as a workaround.
