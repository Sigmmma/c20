---
title: point_physics
stub: true
about: 'tag:h1/point_physics'
img: pphy.jpg
caption: >-
  Point physics usages shown as red and green markers within a [flag](~) and
  [particles](~particle).
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
---
**Point physics** control how [particles](~particle), [particle systems](~particle_system), [weather](~weather_particle_system), [flags](~flag), [contrails](~contrail), and [antenna](~) interact with the environment. This includes wind, water, density, and collisions with the [BSP](~scenario_structure_bsp). Essentially anything that can be suspended in the atmosphere or water is simulated this way.

They are primarily controlled by density and friction parameters.

# Related HaloScript
The following are related [functions](~scripting#functions) that you can use in your scenario scripts and/or [debug globals](~scripting#external-globals) that you can enter into the developer console for troubleshooting.

{% relatedHsc game="h1" tagFilter="point_physics" /%}
# Structure and fields

{% tagStruct "h1/point_physics" /%}
