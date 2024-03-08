---
title: globals
stub: true
about: 'tag:h1/globals'
img: globals.jpg
caption: >-
  The precomputed distortion [cube map](~bitmap#cube-maps) of active camouflage
  is one of many things configured in this tag.
thanks:
  MosesOfEgypt: Tag structure research
  gbMichelle: Active camo tint and distortion testing
  Jakey: Active camo rasterizer settings documentation
  Kavawuvi: Invader tag definitions
---
The **globals** tag contains settings for player control, difficulty, grenade types, rasterizer data, the HUD, materials types, and more. In other words, things that only need to be defined once and are rarely edited.

This tag and its dependencies are also included in a [map](~maps) when compiled, and the engine is [hard-coded to reference it](~hard-coded-data#globals).

# Related HaloScript
The following are related [functions](~scripting#functions) that you can use in your scenario scripts and/or [debug globals](~scripting#external-globals) that you can enter into the developer console for troubleshooting.

{% relatedHsc game="h1" tagFilter="globals" /%}

# Structure and fields

{% tagStruct "h1/globals" /%}
