---
title: scenery
about: 'tag:h1/scenery'
img: scenery.jpg
caption: >-
  Trees, boulders, landing beacons, and covenant crates are all instances of
  scenery
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
---
**Scenery** are non-moving objects placed within maps that are not part of the [BSP](~scenario_structure_bsp). Some examples of scenery include boulders, trees, crashed pelicans, and smoke emitters. Scenery objects can be added to a palette in [Sapien](~h1-sapien) and placed many times throughout the level, with each scenery implicitly belonging to a particular BSP.

While scenery and their collision models can be animated, they do not have physics like [units](~unit) and [items](~item) and the object technically remains fixed at one location. Doors and elevators are implemented using [device_machine](~) instead.

# Limits
While thousands of scenery can be placed in a [scenario](~), the unmodified game engine only supports rendering at most 256 at any given time. This limit can be increased to 512 using OpenSauce.

# Shadows
Because these objects are non-moving, they cast shadows in [lightmaps](~scenario_structure_bsp). A scenery's [collision](~model_collision_geometry) is used to cast shadows rather than its [gbxmodel](~gbxmodel). Scenery can also be forced to use dynamic shadow mapping; see [object lighting](~object#shadows-and-lighting).

# Structure and fields

{% tagStruct "h1/scenery" /%}
