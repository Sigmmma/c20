---
title: shader_transparent_water
stub: true
about: 'tag:h1/shader_transparent_water'
img: water.jpg
caption: A water shader used in _Death Island_
thanks:
  gbMichelle: Discovering that base maps do not tile
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
keywords:
  - swat
---
**Water shaders** are characterized by their use of layered animated _ripple maps_, tint colours, and reflectance.

They need not exclusively be used for water -- the coolant pools of _Keyes_ (d20) also use water shaders, and the [Halo CE Refined][refined] project uses them for some glass to better [emulate](~renderer#gearbox-regressions) Xbox glass shaders. They are also not exclusively used within the [BSP](~scenario_structure_bsp), with [skies](~sky) like _Damnation's_ also using this shader type.

Flowing water with rapids, like waterfalls and rivers, can instead use [shader_transparent_chicago](~) which allows for more varied animation and map blending.

# Base maps
Water shaders do not tile their base maps. Instead, the edges of the texture continue infinitely (["clamp" texture address mode][clamp]). This can be useful for concentrating texel density near the level without dedicating texture space to surroundings which stretch to the horizon.

# Known issues
Ripple maps are [not rendered correctly](~renderer#gearbox-regressions) in H1PC and H1CE compared to classic Xbox. The highest level of detail [mipmap][] is used for the most distant areas, but water closer to the camera uses the lowest detail mipmap. This is the opposite of how it should be, and results in distant water suffering from major [aliasing][]. The water shader was fixed in H1A.

# Related HaloScript
{% relatedHsc game="h1" tagFilter="shader_transparent_water" /%}

# Structure and fields

{% tagStruct "h1/shader_transparent_water" /%}


[refined]: https://www.reddit.com/r/HaloCERefined/
[mipmap]: https://en.wikipedia.org/wiki/Mipmap
[aliasing]: https://en.wikipedia.org/wiki/Aliasing
[clamp]: https://learn.microsoft.com/en-us/windows/win32/direct3d9/clamp-texture-address-mode
