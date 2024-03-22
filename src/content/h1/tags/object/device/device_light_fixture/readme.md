---
title: device_light_fixture
stub: true
about: 'tag:h1/device_light_fixture'
img: device.jpg
caption: Light fixtures used decoratively in _Assault on the Control Room_
keywords:
  - device
thanks:
  zatarita: Per-object settings tip
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
---
**Light fixtures** are a type of static object whose dynamic [light](~) can be enabled or disabled dynamically (e.g. by script or by [device_control](~)). They can also just be used to decorate and illuminate [lightmaps](~lightmaps), although their effect on baked lighting cannot be toggled dynamically. Their intensity and falloff/cutoff angles can be set per-object when placed in [Sapien](~h1a-sapien).

# Collisions
A feature of light fixtures is that [projectiles](~projectile) like bullets will collide with them, but [units](~unit) like the player will not. This makes them ideal for small decorative lighting objects which might obstruct player movement otherwise. The [sound_scenery](~) object has the same collision rules.

# Structure and fields

{% tagStruct "h1/device_light_fixture" /%}
