The [Halo Editing Kit][hek] was first released alongside [Halo: Custom Edition][h1]. It consists of modified and often cut down versions of Bungie's internal tools.

Updated versions of some of these internal tools were released by 343 Industries as the official modding tools for the MCC version of [Halo: Combat Evolved Anniversary][h1/cea].

# Notable changes

This is just a brief overview of some of the more important changes in no particular order, the updated toolkit includes a lot of minor and QOL changes. More complete descriptions are included on the pages for the individual tools.

- [Blitzkrieg][hek/blitzkrieg] was not re-released. 
Use [Jointed Model Blender Toolset][tools/jointed-model-blender-toolset] or the new tool commands for converting [Autodesk FBX](https://en.wikipedia.org/wiki/FBX) to JMS and JMA files.

- The tools now use the modern [DX11](https://en.wikipedia.org/wiki/DirectX#DirectX_11) graphics API instead of the obsolete [D3D9](https://en.wikipedia.org/wiki/DirectX#DirectX_9) API.

- Asserts can be disabled using the `-noassert` command line flag negating the need for modifications like [LM tool][hek/lm_tool].

- Tag and data directories can also be set using command line the flags `-tags_dir` and `-data_dir` respectively.

- The functionality used by [phantom_tool][hek/phantom_tool] to remove [collision artifacts][scenario_structure_bsp#collision-artifacts] is now exposed without needing to modify tool.

- Resource maps can optionally be modified by tool when building a cache file to include all the resource data for the scenario being packaged.

- All the tags used in retail MCC plus the ones used for the old HEK tutorial are included alongside the tools, meaning tag extraction or prebuilt tag sets are no longer required if someone wants to mod the stock maps.

- The tools are in general faster and more responsive (partially due to manual optimizations, partially due to being built with a modern optimizing compiler).