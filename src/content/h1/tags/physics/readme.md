---
title: physics
about: 'tag:h1/physics'
img: warthog-physics.jpg
caption: The mass points of a Warthog.
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
  Conscars: Mass point node testing
keywords:
  - phys
---
**Physics** tags characterize the dynamic physics and propulsion of [vehicles](~vehicle). They are essentially a collection of spherical _mass points_. Since vehicles can have both [model_collision_geometry](~) and physics, each tag is used in different situations:

* Physics are used in collisions between vehicles and is responsible for Halo 1's charactistic ["bouncy" vehicles][bouncy].
* Physics are used in collisions with the [BSP](~scenario_structure_bsp). Because the mass points are somewhat "fuzzy" and are not continuous geometry, vehicles can become [stuck in thin BSP][stuck-bsp].
* Physics are used in collisions with [device_machine](~) and [scenery](~).
* Collision geometry is used in collisions with [bipeds](~biped), [items](~item), and [projectiles](~projectile).
* Note that vehicles cannot collide with [device_light_fixture](~).

Physics tags are created by [importing a JMS](~h1-tool#physics) with specially-named markers parented to nodes. The markers become mass points.

# Mass points
Mass points (also known as physics spheres) are spherical volumes with mass and density. They can have various types of friction and may provide powered impulse for flight and driving.

Even though mass points are parented to nodes, they do not move with base, overlay, or aiming animations unlike [model_collision_geometry](~). However, when mass points are parented to nodes they can be used to engage a vehicle's suspension animation (e.g. the Warthog and Scorpion). The animation tag specifies the compression and extension depth. The mass points move with the node in this case.

# Related HaloScript

{% relatedHsc game="h1" tagFilter="physics" /%}

# Structure and fields

{% tagStruct "h1/physics" /%}

[bouncy]: https://youtu.be/Vz48n5jZaQ8?t=1
[stuck-bsp]: https://youtu.be/n5uN1RuOVRM?t=22
