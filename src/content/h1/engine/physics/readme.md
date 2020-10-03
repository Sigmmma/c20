---
title: Physics engine
stub: true
---
The physics engine of Halo 1 is an in-house implementation which simulates the movement of dynamic objects like [units][unit], [items][item], [projectiles][projectile], and [point_physics][] dynamics systems like [particle_system][] and [weather_particle_system][]. Unlike Halo 2 and later titles, Halo 1 does _not_ use any middleware like [Havok][].

Different object interactions are simulated in different ways. For example, vehicles use [physics][] to drive themselves and collide with other vehicles, but their [model_collision_geometry][] is used in collisions with projectiles, bipeds, and particles. The [scenario_structure_bsp][] collision BSP is tested different for vehicles and projectiles than it is for players, making [phantom BSP][scenario_structure_bsp#phantom-bsp] more apparent.

[havok]: https://en.wikipedia.org/wiki/Havok_%28software%29
