---
title: shader_transparent_water
tagName: shader_transparent_water
img: water.jpg
imgCaption: "A water shader used in _Death Island_"
stub: true
---

Water shaders are characterized by their use of layered animated _ripple maps_, tint colours, and reflectance.

They need not exclusively be used for water -- the coolant pools of _Keyes_ (d20) also use water shaders, and the [Halo CE Refined][refined] project uses them for some glass to better emulate Xbox glass shaders. They are also not exclusively used within the [BSP][scenario_structure_bsp], with [skies][sky] like _Damnation's_ also using this shader type.

Water shaders are **not** typically used for waterfalls ([shader_transparent_chicago_extended][]) nor rivers ([shader_transparent_chicago][]), though there are exceptions (the water in _Battle Creek_).

# Known issues
Ripple maps are not rendered correctly on PC compared to Xbox. The highest level of detail [mipmap][] is used for the most distant areas, but water closer to the camera uses the lowest detail mipmap. This is the opposite of how it should be, and results in distant water suffering from major aliasing.

[refined]: https://www.reddit.com/r/HaloCERefined/
[mipmap]: https://en.wikipedia.org/wiki/Mipmap
