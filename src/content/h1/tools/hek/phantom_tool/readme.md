**phantom_tool** is a modified version of [Tool][] which allows the compilation of [BSPs][scenario_structure_bsp] without [collision artifacts][scenario_structure_bsp#collision-artifacts] like phantom BSP. This is done by enabling unused code in Tool which fixes phantom BSP.

The produced BSP tag tag will be slightly larger than a normal Tool-compiled BSP because the unused code seems to include more redundancy of surfaces at the leaves of the BSP tree.

This tool should be used instead of [Ghostbuster][] when you have access to the source [JMS][].

# Installation and usage
Move `phantom_tool.exe` to your Halo CE install and use it in the exact same way as regular Tool [structure compilation][tool#structure-compilation]:

```sh
phantom_tool.exe structure levels\a30 a30_a
```
