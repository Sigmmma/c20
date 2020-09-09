---
title: Tool
toolName: Tool
stub: true
img: tool.jpg
imgCaption: "`tool structure` being used to compile a JMS"
keywords:
  - lightmap
  - radiosity
  - cli
thanks:
  - to: gbMichelle
    for: Hardcoded tag patch reversing
  - to: MosesOfEgypt
    for: Explanation of radiosity passes
---

**Tool** (**tool.exe**), is a [command-line][] utility used to compile data into [tags][], and tags into [maps][map]. It is part of the [HEK][].

# Structure compilation

A [JMS][] file containing level geometry can be compiled into a [scenario_structure_bsp][] using the `structure` verb:

```sh
# structure <scenario-directory> <bsp-name>
tool.exe structure levels\a30 a30_a
```

For the example above, Tool would expect to find a corresponding JMS file at `data\levels\a30\models\a30_a.JMS`. Assuming no errors, it would be compiled into `tags\levels\a30\a30_a.scenario_structure_bsp`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

Structure compilation converts the raw polygon and materials data from the JMS into data structures which are more efficient for Halo to use during rendering, collision tests, and AI pathfinding among other tasks. Note that [lightmaps][] are **not** produced during this step, but rather with the [lightmaps verb](#lightmaps).

# Lightmaps
Both Tool and [Sapien][sapien#radiosity] can be used to generate [lightmaps][] (radiosity). Using Tool, you will need the following arguments:

1. **Scenario [tag path][tags#tag-references-and-paths]**: This is _not_ a file path! Leave off the ".scenario" extension and start the path from within the tags directory.
2. **BSP name:** The name of the BSP tag without the file extension.
3. **Radiosity quality:** A value of 0 runs an inaccurate "fast radiosity", with fewer light bounces, a lower resolution lightmap, and ignoring light occlusion or blocking caused by models. A value of 1 runs a "full radiosity", which is much slower but is used for the release version of maps.
4. **The "stop" threshold:** The amount of light remaining to stop calculating at. Light is cast in multiple passes from each surface, getting progressively finer with each pass. Each pass also reduces the total amount of light to be cast from each surface. When the amount of light remaining hits this value, radiosity will stop and be saved. This is the equivalent of choosing when to run `radiosity_save` in Sapien.

For example:

```
tool.exe lightmaps levels\test\tutorial\tutorial tutorial 1 0.01
```

After a short time, you should observe a number counting down towards 0. The radiosity process will stop once this number reaches your "stop" argument. If the number counts _up_ instead, it indicates an issue with your level geometry and you should cancel radiosity to address it (check for [WRL][] warnings).

For high quality lightmaps, consider using the faster [LM_Tool][] instead.

# Build cache file
A [scenario][] can be compiled into a [map][] using the `build-cache-file` verb. Simply provide your scenario's tag path:

```
tool.exe build-cache-file levels\test\tutorial\tutorial
```

The resulting map file can be found in Halo's `maps` directory.

## Hardcoded tag patches
There are a number of gameplay-balancing tag patches ("Jason Jones edits") made at runtime on Xbox, but at map compilation time by [Tool][] on PC. On both platforms, these patches are only made to singleplayer maps.

| Tag type        | Tag path                          | Changes
|-----------------|-----------------------------------|----------------
|[weapon][]       |`weapons\pistol\pistol`            |Min error and first error angle to `0.2` degrees, second error angle to `0.4` for first trigger
|[damage_effect][]|`weapons\pistol\bullet`            |Elite energy shield damage modifier to `0.8`
|[weapon][]       |`weapons\plasma rifle\plasma rifle`|First error angle to `0.25` degrees, second error to `2.5` for first trigger

These changes are made only to the resulting tag data in the map file, but be careful when extracting tags from singleplayer maps! You will actually overwrite the original weapon tags and cause your custom multiplayer maps to _also_ use these values.
