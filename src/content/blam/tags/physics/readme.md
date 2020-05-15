---
title: physics
template: tag
img: warthog-physics.jpg
imgCaption: The mass points of a Warthog, extracted using [rec0's importer](http://hce.halomaps.org/index.cfm?fid=1669). See also the [scorpion](scorpion-physics.jpg).
---

Physics tags characterize the dynamic physics and propulsion of [vehicles][vehicle]. They are essentially a collection of spherical _mass points_. Since vehicles can have both [model_collision_geometry][] and physics, each tag is used in different situations:

* Physics are used in collisions between vehicles and is responsible for Halo 1's charactistic ["bouncy" vehicles][bouncy].
* Physics are used in collisions with the [BSP][scenario_structure_bsp]. Because the mass points are somewhat "fuzzy" and are not continuous geometry, vehicles can become [stuck in thin BSP][stuck-bsp].
* Physics are used in collisions with [device_machine][] and [scenery][].
* Collision geometry is used in collisions with [bipeds][biped], [items][item], and [projectiles][projectile].
* Note that vehicles cannot collide with [device_light_fixture][].

Physics tags are created by [compiling a JMS][tool] with specially-named<sup>(how?)</sup> markers parented to nodes. The markers become mass points.

# Mass points
Mass points are spherical volumes with mass and density. They can have various types of friction and may provide powered impulse for flight and driving.

Even though mass points are parented to nodes, they do not move with base, overlay, or aiming animations unlike [model_collision_geometry][]. However, when mass points are parented to nodes they can be used to engage a vehicle's suspension animation (e.g. the Warthog and Scorpion). The animation tag specifies the compression and extension depth. It is unknown if the mass points move with the node in this case.

[bouncy]: https://youtu.be/Vz48n5jZaQ8?t=1
[stuck-bsp]: https://youtu.be/n5uN1RuOVRM?t=22
