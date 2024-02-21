---
title: sound_scenery
about: 'tag:h1/sound_scenery'
img: ssce.jpg
caption: >-
  Sound scenery is used along Timberland's river, made visible in Sapien using
  `debug_sound 1`
thanks:
  Neo: Discovering the music bug
  Conscars: Testing collision behaviour
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
---
Sound scenery are a type of object, typically invisible, used to play localized ambient [looping sounds](~sound_looping). They can be found along shorelines and rivers, at the base of waterfalls, and near noisy machinery. These objects complement the "background" [sound_environment](~) used for [BSP clusters](~scenario_structure_bsp#clusters-and-cluster-data).

# Attaching sounds
When creating a sound scenery tag in [Guerilla](~h1a-guerilla) or other tag editor, simply add an attachment in the attachments block with type `sound_looping`, referring to the desired tag. It is not necessary to specify a model [marker](~gbxmodel#markers).

Sound distances are determined by the actual [sound](~) tag rather than the object's bounding radius.

# Difference from scenery
In terms of tag data, sound scenery do not differ from [scenery](~) in any way; both are simple extensions of [object](~) which do not add any additional fields. Both can play sounds if attached, and both can have [render](~gbxmodel) and [collision](~model_collision_geometry) models. However, sound scenery collide with [projectiles](~projectile) but not [units](~unit) and are thus similar to [device_light_fixture](~).

# Known issues
You cannot have a sound scenery and background sound at the same time if both are playing a sound tag that is classed as "music". This will crash Sapien when you enter the audible radius of the scenery object, and will crash the game immediately.

# Related script functions and globals
The following are related [functions](~scripting#functions) that you can use in your scenario scripts and/or [debug globals](~scripting#external-globals) that you can enter into the developer console for troubleshooting.

{% relatedHsc game="h1" tagFilter="sound_scenery" /%}

# Structure and fields

{% tagStruct "h1/sound_scenery" /%}
