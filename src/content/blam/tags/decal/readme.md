---
title: decal
template: tag
img: decals.jpg
imgCaption: Painted signs, bullet holes, and blood splats are all decal instances.
---
The game's decal system is responsible for rendering bullet holes, blood splatter, explosion marks, and other flat textures applied over over [BSP][scenario_structure_bsp] surfaces (decals cannot appear on [objects][object]). Decal tags describe the appearance and lifetime of these effects.

# Effect decals
Decals are most commonly created dynamically from [effects][effect], such as explosions and bullet impacts. In these cases, it is recommended to give the decal a maximum lifetime to avoid poor framerates.

# Environment decals
A [scenario][scenario] can also contain permanent decals placed throughout the environment. These can be placed in [Sapien][] under the _game data_ section.

# Decal meshes
Although often created as quads, the game may generate more complex decal meshes to conform to the underlying geometry. Vertices of decal meshes typically stand off from their background with a small margin to avoid Z-fighting, but the distance is not consistent.
