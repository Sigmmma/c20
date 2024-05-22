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

# Functions
_Functions_ are values of objects that can change over time and/or react to external stimulus. They can be combined in complex ways and used to drive dynamic changes across various aspects of the object, like its appearance, sound, and attachments. Some examples are Jackal shields changing colour in reaction to damage, Warthog headlights turning on when you enter the vehicle, Banshee wingtips emitting contrails when banking, and the Assault Rifle's compass pointing north.

Objects can receive up to 4 sources of input from the engine called _A in_, _B in_, _C in_, and _D in_. These can be used as inputs by your _functions_ or _change colors_. Every type of object has access to sources from the _[export to functions](#tag-field-a-in)_ section. However, certain types of objects can override these base sources with additional sources related to that object type. To name a few, devices have access to [position and power](~device#tag-field-device-a-in) while vehicles have access to [speed and slide](~vehicle#tag-field-vehicle-a-in).

The next relevant section is the [_functions_ block](#tag-field-functions). This is where you can define functions and how the change over time, and if they use any of the _export to functions_ inputs. Each function produces a simple numeric value over time, typically between `0` and `1`. This could be as simple as an oscillating sine wave or as complex as a noise value scaled by recent damage and clipped to a certain range. You can create up to 4 functions.

The outputs of functions can be used by a variety of other tags related to the object, including but not limited to:

* Set the [scales](#tag-field-attachments-primary-scale) of attachments like [lights](~light) or [sounds](~sound_looping).
* Affect values in widgets like [glows](~glow#tag-field-attachment-1).
* Scale or darken [_change colors_](#tag-field-change-colors-scale-by).
* Affect the object's shaders in various ways, like [fade](~shader_transparent_chicago#tag-field-framebuffer-fade-source) or [texture animation](~shader_transparent_chicago#tag-field-maps-u-animation-source).


# Shadows and lighting
For most dynamic objects, Halo uses [shadow mapping][shadow-mapping] with their [render model](~gbxmodel), unless the object's ["does not cast shadow"](#tag-field-flags-does-not-cast-shadow) flag is true or `render_shadows` is disabled. [Scenery](~) shadows are baked into the [lightmap](~lightmaps) using the object's [collision geometry](~model_collision_geometry) instead, regardless of the "does not cast shadow" flag. Static objects can be forced to use shadow mapping if the [_cast shadow by default_](#tag-field-flags-cast-shadow-by-default) flag is set.

Objects receive a few parameters from [the environment](~lightmaps#lighting-for-dynamic-objects) as inputs to their lighting model. These include up to two distant light sources (direction and colour), ambient light, reflection tint, shadow direction, and shadow colour. Lighting is calculated when objects are created and also when dynamic objects move. To do this the game casts a ray straight down to a BSP _ground point_ up to 10 world units away (device_machine can optionally [sample nearby surfaces instead](~device_machine#tag-field-machine-flags-elevator)) to determine its lighting and can result in a few scenarios:

1. If a ground point is found within 10 units, that surface's lightmap colour is used to light the object. This is why even an object in direct sunlight can appear dark when it is sampling the ground _beneath_ it. The shadow vector is an interpolation of lightmap vertex normals. In this scenario you will see a coloured vector drawn over objects with `debug_object_lights 1`.
2. If a ground point is not found and the BSP tag has a non-zero red value for [_default ambient color_ field](~scenario_structure_bsp#tag-field-default-distant-light-0-color), BSP default lighting fields will apply.
2. Otherwise the object receives hard-coded white light from the +x +y direction and casts shadows straight down.

You can test the latter two scenarios by setting `debug_collision_skip_vectors 1` to make the ray cast always fail. Objects which are outside the BSP will fail to find a valid ground point and therefore receive default lighting. Objects above [phantom BSP](~scenario_structure_bsp#phantom-bsp) and nearly coplanar faces may similarly fail.

BSP switches do not cause fixed objects to resample lighting.

# Related HaloScript

{% relatedHsc game="h1" tagFilter="object" /%}

# Structure and fields

{% tagStruct "h1/object" /%}

[shadow-mapping]: https://en.wikipedia.org/wiki/Shadow_mapping