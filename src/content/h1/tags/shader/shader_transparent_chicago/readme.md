---
title: shader_transparent_chicago
stub: true
about: 'tag:h1/shader_transparent_chicago'
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Research on tag structure research, extra layers crash, rotation coordinate offset
  Galap: Rotation coordinate offset writeup
keywords:
  - schi
---
The **transparent chicago shader** is applied to surfaces that require transparent elements. This shader can contain up to 4 "stages" of [bitmaps](~bitmap), where each stage and its alpha can animate and blend to form final accumulated diffuse and alpha channels. The shader can be given a final framebuffer blending function too, like _add_ for holograms.

Alpha-tested [BSP](~scenario_structure_bsp) surfaces like 2D billboard trees and ladders can use the simpler [shader_environment](~) instead.

If referenced as an extra shader layer, this tag will inherit some fields from its parent regardless of its own flags (e.g. _first map type_).

# Related HaloScript
{% relatedHsc game="h1" tagFilter="shader_transparent_chicago" /%}

# Structure and fields

{% tagStruct "h1/shader_transparent_chicago" /%}
