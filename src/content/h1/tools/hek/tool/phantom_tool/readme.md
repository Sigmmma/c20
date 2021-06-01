**phantom_tool** is a modified version of [H1CE Tool][hek/tool] which allows the compilation of [BSPs][scenario_structure_bsp] without [collision artifacts][scenario_structure_bsp#collision-artifacts] like phantom BSP. This is done by enabling orphaned code in Tool which fixes phantom BSP.

```.alert
The Tool feature enabled by this mod is properly supported in [H1A Tool][h1a-tool] using the `-fix-phantom-bsp` flag.
```

The produced BSP tag will be slightly larger than a normal Tool-compiled BSP because the unused code seems to include more redundancy of surfaces at the leaves of the BSP tree.

This tool should be used instead of [Ghostbuster][] when you have access to the source [JMS][].

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
