---
title: Tool
toolName: Tool
stub: true
img: tool.jpg
imgCaption: "`tool structure` being used to compile a JMS"
keywords:
  - lightmap
  - radiosity
---

Tool, or sometimes called **tool.exe**, is a command line utility used to compile data into [tags][], and tags into [maps][map]. It is part of the [HEK][].

# Structure compilation

A JMS file containing level geometry can be compiled into a [scenario_structure_bsp][] using the `structure` subcommand. For example:

```sh
# structure <scenario-directory> <bsp-name>
tool.exe structure levels\\a30 a30_a
```

For the example above, Tool would expect to find a corresponding JMS file at `data\levels\a30\models\a30_a.JMS`. Assuming no errors, it would be compiled into `tags\levels\a30\a30_a.scenario_structure_bsp`.

Structure compilation converts the raw polygon and materials data from the JMS into data structures which are more efficient for Halo to use during rendering, collision tests, and AI pathfinding among other tasks. Note that [lightmaps][scenario_structure_bsp#lightmaps] are **not** produced during this step, but rather with the [lightmaps subcommand](#lightmaps).

# Lightmaps
...
