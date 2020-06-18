---
title: scenery
tagName: scenery
img: scenery.jpg
imgCaption: "Trees, boulders, landing beacons, and covenant crates are all instances of scenery"
---

Scenery are static objects placed within maps that are not part of the [BSP][scenario_structure_bsp]. They are Halo CE's implementation of [instanced geometry][wiki-instancing]. Some examples of scenery include rocks, trees, crates, crashed pelicans, and particle emitters.

Scenery is placed using [Sapien][] and belongs to the [scenario][], with each scenery implicitly belonging to a particular BSP.

While scenery can be animated and have moving collision models, they do not have physics like vehicles and other moving [units][unit].

# Limits
While thousands of scenery can be placed in a map, the unmodified Game engine only supports rendering at most 256 at any given time. This limit can be increased to 512 using OpenSauce and 1024 with other mods like Vulpes.

# Shadows
Because these objects are non-moving, they cast shadows and emit light in [lightmaps][scenario_structure_bsp]. A scenery's [collision][model_collision_geometry] is used to cast shadows, not its [model][gbxmodel].

[wiki-instancing]: https://en.wikipedia.org/wiki/Geometry_instancing
