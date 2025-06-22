---
title: weather_particle_system
stub: true
about: 'tag:h1/weather_particle_system'
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
keywords:
  - rain
---
**Weather particle systems** define the appearance of weather like rain and snow. They are assigned to [BSP clusters](~scenario_structure_bsp#clusters-and-cluster-data) using [Sapien](~h1-sapien) and can be masked from localized areas using [weather polyhedra](~scenario_structure_bsp#weather-polyhedra).

# Known issues
When the player is within a dense [fog](~) with a nearby _opaque distance_, weather particles will stop drawing even if set for the cluster containing fog. Ensure the _opaque distance_ is sufficiently far away if weather particles in fog are desired.

# Related HaloScript
{% relatedHsc game="h1" tagFilter="weather_particle_system" /%}

# Structure and fields

{% tagStruct "h1/weather_particle_system" /%}
