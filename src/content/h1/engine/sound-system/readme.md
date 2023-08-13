---
title: Sound system
img: sound-system.jpg
caption: Active sounds visualized in Sapien.
---
The **sound system** is responsible for playing effects and music [sounds](~sound) in-game and in Sapien.

# Sound cache
Like the [renderer's texture cache](~renderer#texture-cache), the sound system also holds sound data in an in-memory _sound cache_. When a sound must be played that is not in this cache, it will be loaded from a [map cache file](~map) (possibly a shared resource map) or the [tags directory](~tags) depending on the [build type](~blam#build-types) of the engine. The cache can hold a maximum of 512 entries or 64 MB.

The [predicted resources](~scenario#tag-field-predicted-resources) block seen in some tag classes are meant to give the engine a hint about what sounds (and textures) should be cached.

# Environmental audio
MCC and Custom Edition (when using EAX emulation with [DSOAL][dsoal]) apply positional and environmental effects to sounds. For this reason, it is important that level artists ensure [BSP clusters](~scenario_structure_bsp#clusters-and-cluster-data) have an appropriate [sound_environment](~) applied.

# Sound obstruction
Sounds which are playing behind an obstruction are muffled. An obstruction is anything which blocks a collision ray test between the sound source and the camera. This may be the [BSP](~scenario_structure_bsp) or an object with [collision geometry](~model_collision_geometry).

# Channels
The engine has the following channel limits:

* 26 mono 3D channels
* 4 mono channels
* 4 stereo channels
* 4 44k stereo channels

# Related script functions and globals
The following are related [functions](~scripting#functions) that you can use in your scenario scripts and/or [debug globals](~scripting#external-globals) that you can enter into the developer console for troubleshooting.

{% relatedHsc game="h1" tagFilter="sound" /%}

[dsoal]: https://github.com/kcat/dsoal
