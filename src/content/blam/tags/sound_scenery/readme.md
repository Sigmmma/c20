---
title: sound_scenery
template: tag
img: ssce.jpg
imgCaption: Sound scenery is used along Timberland's river, made visible in Sapien using `debug_sound 1`
thanks:
  - to: Neo
    for: Discovering the music bug
  - to: Conscars
    for: Testing collision behaviour
---
Sound scenery are a type of object, typically invisible, used to play localized ambient [looping sounds][sound_looping]. They can be found along shorelines and rivers, at the base of waterfalls, and near noisy machinery. These objects complement the "background" [sound_environment][] used for [BSP clusters][scenario_structure_bsp#clusters-and-cluster-data].

# Attaching sounds
When creating a sound scenery tag in [Guerilla][] or other tag editor, simply add an attachment in the attachments block with type `sound_looping`, referring to the desired tag. It is not necessary to specify a model [marker][gbxmodel#markers].

Sound distances are determined by the actual [sound][] tag rather than the object's bounding radius.

# Related commands
The command `debug_sound 1` can be used in [Sapien][] to visualize the sounds playing in the map. The minimum and maximum distances are shown as red and yellow spheres, respectively.

# Difference from scenery
In terms of tag data, sound scenery do not differ from [scenery][] in any way; both are simple extensions of [object][] which do not add any additional fields. Both can play sounds if attached, and both can have [render][gbxmodel] and [collision][model_collision_geometry] models. However, sound scenery collide with [projectiles][projectile] but not [units][unit] and are thus similar to [device_light_fixture][].

# Known issues
You cannot have a sound scenery and background sound at the same time if both are playing a sound tag that is classed as "music". This will crash Sapien when you enter the audible radius of the scenery object, and will crash the game immediately.
