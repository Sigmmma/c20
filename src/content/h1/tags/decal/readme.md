---
title: decal
about: 'tag:h1/decal'
img: decals.jpg
caption: 'Painted signs, bullet holes, and blood splats are all decal instances.'
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
  Conscars: Testing functions and globals
---
The **decal** system is responsible for rendering bullet holes, blood splatter, explosion marks, and other flat textures applied over over [BSP](~scenario_structure_bsp) surfaces (decals cannot appear on [objects](~object)). Decal tags describe the appearance and lifetime of these effects.

# Dynamic decals
Dynamic decals are created from [effects](~effect), such as explosions and projectile impacts. It is recommended to give the decal a [maximum lifetime](#tag-field-lifetime) to avoid poor framerates. The game supports up to [2048](~game-state) decal "slots".

# Permanent decals
Also called _environment decals_, these are placed throughout the [scenario](~) using [Sapien](~) (under _game data_ in the hierarchy window).

# Decal meshes
Although often created as quads against a flat surface, the game may generate more complex decal meshes to conform to the underlying geometry. You can observe decal mesh generation using `debug_decals 1`. Original corner vertices of decal meshes stand off from their background with a small margin to avoid Z-fighting, controlled by `rasterizer_zoffset`, while additional vertices generated from the conformation process are not z-offset.

# Related HaloScript
{% relatedHsc game="h1" tagFilter="decal" /%}

# Structure and fields

{% tagStruct "h1/decal" /%}
