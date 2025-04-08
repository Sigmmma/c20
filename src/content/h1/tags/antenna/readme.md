---
title: antenna
about: 'tag:h1/antenna'
img: antenna.jpg
caption: Antennas seen on Scorpions and Warthogs.
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
  Conscars: Tag field testing
keywords:
  - ant!
---
**Antennas** describe a series of springy vertices rendered with a [bitmap](~) texture. As an object [_widget_](~object#tag-field-widgets), they attach to [model markers](~gbxmodel#markers). They are only used on the Warthog and Scorpion vehicles, but during Halo's development they were also present on the player [biped](~).

# Bitmaps
The bitmap referenced by an antenna is a [sprite sheet](~bitmap#sprites) that can contain multiple sequences. Different parts of the antenna can set the [_sequence index_](#tag-field-vertices-sequence-index) to change their texture. Only the first sprite in a sequence is used, so sequences need just a single sprite.

Sprites should be oriented horizontally and will be centered at the base of each antenna segment (vertex) with twice the [defined length](#tag-field-vertices-length). This means the left half of each sprite should be filled with [dummy space](~bitmap#dummy-space) to avoid overlapping the previous segment.

# Physics
Antennas are modeled as a series of up to 20 fixed-length segments with springy joints. Points at the end of each segment use [point_physics](~) so can be affected by gravity and [wind](~).

[Disabling gravity](~point_physics#tag-field-flags-no-gravity) results in the antenna coming to rest in a straight line rather than bending under gravity. Similarly, changing the global strength of gravity with [`physics_set_gravity`](~scripting#functions-physics-set-gravity) will also result in the antenna bending more or less.

Although it's not understood exactly how [density](~point_physics#tag-field-density) is used, low air-like densities result in flowing tail-like antenna behaviour while high densities result in stiffer but more energetic ones.

Antennas with _point_physics_ flags [_collides with structures_](~point_physics#tag-field-flags-collides-with-structures) may interact with collision BSPs (both [scenario_structure_bsp](~) and [model_collision_geometry](~)) under the right conditions, but typically don't because high spring coefficients result in the antenna being too stiff to rest on the BSP, passing through it instead. Antennas with near-zero spring coefficients act more like a rope and may rest on or swing against the BSP, but tend to be too energetically unstable to remain there or partially hang through it. When antennas do interact with the BSP, [high elasticity](~point_physics#tag-field-elasticity) and (counterintuitively) [high surface friction](~point_physics#tag-field-surface-friction) increase instability. The same applies to [_collides with water surface_](~point_physics#tag-field-flags-collides-with-water-surface).

## Simulation culling
Antenna physics are only simulated when on-screen (based on the [bounding sphere](~object#tag-field-bounding-radius) of the object they're a widget on). This is particularly noticeable when a low but non-zero [_spring strength coefficient_](#tag-field-spring-strength-coefficient) is used, since the antenna will wiggle when reappearing on screen before coming to a rest state again.

# Limits
The [game state](~game-state#datum-arrays) has limited space for simulated antennas (12 in legacy, 24 in H1A). Extra antennas in the map will not be rendered.

Antenna segments should not be 0-length or else an assertion will be hit:
```
EXCEPTION halt in c:\mcc\main\h1\code\h1a2\sources\render\render_sprite.c,#446: mode==_build_sprite_normal || (untransformed_direction && magnitude_squared3d(untransformed_direction))
```

# Related HaloScript

{% relatedHsc game="h1" tagFilter="antenna" /%}

# Structure and fields

{% tagStruct "h1/antenna" /%}
