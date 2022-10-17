The physics engine of Halo 1 is an in-house implementation which simulates the movement of dynamic objects like [units][unit], [items][item], [projectiles][projectile], and [point_physics][] dynamics systems like [particle_system][] and [weather_particle_system][]. Unlike [Halo 2][h2] and later titles, Halo 1 does _not_ use any middleware like [Havok][].

Different object interactions are simulated in different ways. For example, vehicles use [physics][] to drive themselves, collide with scenery and the BSP, and collide with other vehicles, but their [model_collision_geometry][] is used in collisions with projectiles, bipeds, and particles. The [scenario_structure_bsp][] collision BSP is tested differently for vehicles and projectiles than it is for players, making [phantom BSP][scenario_structure_bsp#phantom-bsp] more apparent.

[havok]: https://en.wikipedia.org/wiki/Havok_%28software%29

# Limits
Vehicles cannot exist below approximately -4,950 world units in the Z (vertical) axis. Vehicles spawned at this extreme distance will sit on an invisible floor and return to the floor if moved below. This is not far from the -5,000 world unit [limit][renderer#limits] for the game camera. Vehicles can freely move beyond 5,000 units in a horizontal axis.

# Related script functions and globals
The following are related [functions][scripting#functions] that you can use in your scenario scripts and/or [debug globals][scripting#external-globals] that you can enter into the developer console for troubleshooting.

{% relatedHsc game="h1" tagFilter="physics-engine" /%}