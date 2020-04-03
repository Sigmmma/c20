---
title: Tags
---

Tags are the fundamental units of resources in the [Blam][blam] engine. They define the characteristics of everything in a [map][]: vehicles, [weapons][weapon], weather, [shaders][shader] and [level geometry][scenario_structure_bsp] among many other types. Depending on the type, tags have dependencies on each other through references (e.g. a sky referencing a [gbxmodel][]). Halo loads maps and their tags directly into memory for game logic to use.

In the [HEK][], tags are created by [Guerilla][] and [Tool][]. Then, tags can shared for use by others and compiled into a [map][]. A map can have completely unique tags to permit gameplay and visual overhauls, or just a few modified tags to reskin some weapons.
