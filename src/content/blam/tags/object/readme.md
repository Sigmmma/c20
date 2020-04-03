---
title: Object (abstract tag)
template: tag
---

Objects are a high-level abstract tag, meaning they serve as a base for many other tag types but cannot be directly created themselves. Generally, they are "things" with a position in the world but are distinct from the ["level"][scenario_structure_bsp] itself. Some examples include [elevators][device_machine], [trees][scenery], [warthogs][vehicle], and [the player][biped].

Some capabilities available to objects (though not used by every subtype) are:

* Be rendered with a [model][gbxmodel]
* Have physics and be collideable
* Cast shadows using [lightmap data][scenario_structure_bsp]
* Have attachments like [particles][particle_system], [sounds][sound_looping], and lights
* Be attached to each other (e.g. pelicans carrying warthogs)
