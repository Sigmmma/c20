---
title: point_physics
about: 'tag:h1/point_physics'
img: pphy.jpg
caption: >-
  Point physics usages shown as red and green markers within a [flag](~) and
  [particles](~particle).
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
  Conscars: Testing and documenting tag features
keywords:
  - pphy
---
**Point physics** control how [particles](~particle), [particle systems](~particle_system), [weather](~weather_particle_system), [flags](~flag), [contrails](~contrail), and [antenna](~) interact with the environment. This includes [wind](~), water, density, and collisions with the [BSP](~scenario_structure_bsp). Essentially anything that can be suspended in the atmosphere or water is simulated this way.

# Effects of particle radius
The fields in this tag should not be considered in isolation. The **radius** of particles using this _point_physics_ is not purely visual, and it's important to understand its effect on particle movement:

* Mass of the particle scales with its _volume_, which increases with the cube of the radius (scaled by density).
* Wind friction scales with _surface area_, which increases with the square of the radius.

In other words, 2x the radius is 4x the surface area but also 8x the mass. A more massive particle is harder to accelerate. You may find that doubling a _weather_particle_system_ particle radius causes it to enter into a faster freefall because air friction at low speeds can no longer overcome the force of gravity. If the particle has any air friction, it will eventually reach some equilibrium because wind resistance increases with the square of velocity while acceleration due to gravity is constant.

# Related HaloScript
The following are related [functions](~scripting#functions) that you can use in your scenario scripts and/or [debug globals](~scripting#external-globals) that you can enter into the developer console for troubleshooting.

{% relatedHsc game="h1" tagFilter="point_physics" /%}
# Structure and fields

{% tagStruct "h1/point_physics" /%}
