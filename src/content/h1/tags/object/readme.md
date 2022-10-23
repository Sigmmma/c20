**Objects** are a high-level abstract tag, meaning they serve as a base for many other tag types but cannot be directly created themselves. Generally, they are "things" with a position in the world but are distinct from the ["level"][scenario_structure_bsp] itself. Some examples include [elevators][device_machine], [trees][scenery], [warthogs][vehicle], and [the player][biped].

Some capabilities available to objects (though not used by every subtype) are:

* Be rendered with a [model][gbxmodel]
* Have [physics][] and be [collideable][model_collision_geometry]
* Cast shadows using [lightmap data][lightmaps]
* Have attachments like [particles][particle_system], [sounds][sound_looping], and [lights][light]
* Be attached to each other (e.g. pelicans carrying warthogs)

# Shadows
For most dynamic objects, Halo uses [shadow mapping][shadow-mapping] with their render [model][gbxmodel], unless the object's ["does not cast shadow"](#tag-field-flags-does-not-cast-shadow) flag is true. However, with [scenery][], shadows are baked into the [lightmap][scenario_structure_bsp] using the object's [collision geometry][model_collision_geometry] instead, regardless of the "does not cast shadow" flag.

[shadow-mapping]: https://en.wikipedia.org/wiki/Shadow_mapping
