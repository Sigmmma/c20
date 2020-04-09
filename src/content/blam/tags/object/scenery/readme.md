---
title: scenery
template: tag
img: scenery.jpg
imgCaption: "Trees, boulders, landing beacons, and covenant crates are all instances of scenery"
---

Scenery are static objects placed within maps that are not part of the [BSP][scenario_structure_bsp]. They are Halo CE's implementation of [instanced geometry][wiki-instancing].

Some examples of scenery include rocks, trees, crates, crashed pelicans, and particle emitters. While scenery can be animated and have complex collision models, they do not have physics like vehicles and other moving units.

Scenery is placed using [Sapien][] and belongs to the [scenario][], with each scenery assigned to a particular BSP index. Because these objects are non-moving, they cast shadows and emit light in [lightmaps][scenario_structure_bsp].

[wiki-instancing]: https://en.wikipedia.org/wiki/Geometry_instancing
