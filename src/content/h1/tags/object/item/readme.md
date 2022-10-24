---
title: item (abstract tag)
about: 'tag:h1/item'
img: powerups.jpg
caption: Powerups are an example of items.
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
---
**Items** are simple moveable objects and the parent tag of [weapon](~), [garbage](~), and [equipment](~). Although they can have a hitbox in the form of a [model_collision_geometry](~), when moving they are simulated as simple point-like objects that can bounce off the [BSP](~scenario_structure_bsp) and non-item objects. Unlike [units](~unit), they cannot be controlled or die (though they can despawn).

# Structure and fields

{% tagStruct "h1/item" /%}
