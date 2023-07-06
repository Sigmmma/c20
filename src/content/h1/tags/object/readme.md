---
title: object (abstract tag)
about: 'tag:h1/object'
img: objects.jpg
caption: 'Various examples of objects, including projectiles, weapons, and units.'
thanks:
  Jakey: Explaining modifier shaders.
  Satania: Explaining acceleration scale
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
  Connor Dawn: Explaining _cast shadow by default_
  Conscars: Shadow behaviour testing
---
**Objects** are a high-level abstract tag, meaning they serve as a base for many other tag types but cannot be directly created themselves. Generally, they are "things" with a position in the world but are distinct from the ["level"](~scenario_structure_bsp) itself. Some examples include [elevators](~device_machine), [trees](~scenery), [warthogs](~vehicle), and [the player](~biped).

Some capabilities available to objects (though not used by every subtype) are:

* Be rendered with a [model](~gbxmodel)
* Have [physics](~) and be [collideable](~model_collision_geometry)
* Cast shadows using [lightmap data](~lightmaps)
* Have attachments like [particles](~particle_system), [sounds](~sound_looping), and [lights](~light)
* Be attached to each other (e.g. pelicans carrying warthogs)

# Shadows and lighting
For most dynamic objects, Halo uses [shadow mapping][shadow-mapping] with their [render model](~gbxmodel), unless the object's ["does not cast shadow"](#tag-field-flags-does-not-cast-shadow) flag is true or `render_shadows` is disabled. [Scenery](~) shadows are baked into the [lightmap](~lightmaps) using the object's [collision geometry](~model_collision_geometry) instead, regardless of the "does not cast shadow" flag. Static objects can be forced to use shadow mapping if the [_cast shadow by default_](#tag-field-flags-cast-shadow-by-default) flag is set.

Objects receive a few parameters from [the environment](~lightmaps#lighting-for-dynamic-objects) as inputs to their lighting model. These include up to two distant light sources (direction and colour), ambient light, reflection tint, shadow direction, and shadow colour. Lighting is calculated when objects are created and also when dynamic objects move. To do this the game casts a ray straight down to a BSP _ground point_ up to 10 world units away to determine its lighting and can result in a few scenarios:

1. If a ground point is found within 10 units, that surface's lightmap colour is used to light the object. This is why even an object in direct sunlight can appear dark when it is sampling the ground _beneath_ it. The shadow vector is an interpolation of lightmap vertex normals. In this scenario you will see a coloured vector drawn over objects with `debug_object_lights 1`.
2. If a ground point is not found and the BSP tag has a non-zero red value for [_default ambient color_ field](~scenario_structure_bsp#tag-field-default-distant-light-0-color), BSP default lighting fields will apply.
2. Otherwise the object receives hard-coded white light from the +x +y direction and casts shadows straight down.

You can test the latter two scenarios by setting `debug_collision_skip_vectors 1` to make the ray cast always fail. Scenery which are outside the BSP will also fail to get a ground point and therefore receive default lighting.

BSP switches do not cause fixed objects to resample lighting.

# Related HaloScript

{% relatedHsc game="h1" tagFilter="object" /%}

# Structure and fields

{% tagStruct "h1/object" /%}

[shadow-mapping]: https://en.wikipedia.org/wiki/Shadow_mapping