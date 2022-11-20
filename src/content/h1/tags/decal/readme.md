---
title: decal
about: 'tag:h1/decal'
img: decals.jpg
caption: 'Painted signs, bullet holes, and blood splats are all decal instances.'
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
  Conscars: Testing functions and globals, tag fields, decal geometry
---
The **decal** system is responsible for rendering bullet holes, blood splatter, explosion marks, and other flat textures applied over over [BSP](~scenario_structure_bsp) surfaces (decals cannot appear on [objects](~object)). Decal tags describe the appearance and lifetime of these effects.

# Dynamic decals
Dynamic decals are created from [effects](~effect), such as explosions and projectile impacts. It is recommended to give the decal a [maximum lifetime](#tag-field-lifetime) to avoid poor framerates. The game supports up to [2048](~game-state) decal "slots". However it may also reach a limit at fewer decals when it can no longer allocate decal vertices. This is extremely unlikely there are many decals with a large radius being created, but the console will log:

```
### WUT? decals: failed to allocate vertices (locked=37, permanent=4)
```

This means there are 37 "locked" decals (unexpired). When these decals reach the end of their lifetime, they will be destroyed and their vertices released back to the pool. Rough testing shows that the pool is likely 16*2048 vertices, with each decal able to use as many vertices from the pool as needed to conform to the BSP.

# Permanent decals
Also called _environment decals_, these are placed throughout the [scenario](~) using [Sapien](~) (under _game data_ in the hierarchy window).

# Decal meshes
When a decal needs to be created the game goes through a process to generate geometry for it. In most cases decals are created against flat surfaces so are built as simple 4-sided quads. However, if the decal needs to cover an area which is not flat, the game may need to conform the decal to the underlying BSP geometry (depending on [_type_](#tag-field-type)) which may result in dozens of faces and hundreds of vertices.

You can observe decal mesh generation using `debug_decals 1`. Original corner vertices of decal meshes stand off from their background with a small margin to avoid Z-fighting, controlled by `rasterizer_zoffset`, while additional vertices generated from the conformation process are not necessarily z-offset.

Decals can wrap onto `+sky` faces, but not onto or past [breakable surfaces](~scenario_structure_bsp#tag-field-breakable-surfaces) even after the surface is broken.

# Related HaloScript
{% relatedHsc game="h1" tagFilter="decal" /%}

# Structure and fields

{% tagStruct "h1/decal" /%}
