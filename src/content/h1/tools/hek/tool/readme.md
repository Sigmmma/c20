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
---

**Tool** (**tool.exe**), is a [command-line][] utility used to compile data into [tags][], and tags into [maps][map]. It is part of the [HEK][].

# Structure compilation

A JMS file containing level geometry can be compiled into a [scenario_structure_bsp][] using the `structure` verb:

```sh
# structure <scenario-directory> <bsp-name>
tool.exe structure levels\a30 a30_a
```

For the example above, Tool would expect to find a corresponding JMS file at `data\levels\a30\models\a30_a.JMS`. Assuming no errors, it would be compiled into `tags\levels\a30\a30_a.scenario_structure_bsp`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

Structure compilation converts the raw polygon and materials data from the JMS into data structures which are more efficient for Halo to use during rendering, collision tests, and AI pathfinding among other tasks. Note that [lightmaps][] are **not** produced during this step, but rather with the [lightmaps verb](#lightmaps).

# Lightmaps
To run radiosity with Tool and generate [lightmaps][], run it with the following arguments:

1. Scenario [tag path][tags#tag-references-and-paths] (**not** a file path)
2. BSP name (the name of the BSP tag without the file extension)
3. Radiosity quality (1 for max quality, 0 for min, or a value in-between)
4. The "stop" value (how close to 0 the countdown should go)

For example:

```
tool.exe lightmaps levels\test\tutorial\tutorial tutorial 0.8 0.1
```

After a short time, you should observe numbers counting down towards 0. The radiosity process will stop once this number reaches your "stop" argument. If the number counts _up_ instead, it indicates an issue with your level geometry and you should cancel radiosity to address it (check for [WRL][] warnings).

Consider using the faster [LM_Tool][] for lightmaps instead.

# Build cache file
A [scenario][] can be compiled into a [map][] using the `build-cache-file` verb. Simply provide your scenario's tag path:

```
tool.exe build-cache-file levels\test\tutorial\tutorial
```

The resulting map file can be found in Halo's `maps` directory.

## Hardcoded tag patches
There are a number of gameplay-balancing tag patches ("Jason Jones edits") made at runtime on Xbox, but at map compilation time by [Tool][] on PC. On both platforms, these patches are only made to singleplayer maps.

| Tag path                          | Changes
|-----------------------------------|----------
|`weapons\pistol\pistol`            | Min error and first error angle to `0.2` degrees, second error angle to `0.4` for first trigger
|`weapons\pistol\bullet`            | Elite energy shield damage modifier to `0.8`
|`weapons\plasma rifle\plasma rifle`| First error angle to `0.25` degrees, second error to `2.5` for first trigger

These changes are made only to the resulting tag data in the map file, but be careful when extracting tags from singleplayer maps! You will actually overwrite the original weapon tags and cause your custom multiplayer maps to _also_ use these values.
