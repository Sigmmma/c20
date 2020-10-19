**Water shaders** are characterized by their use of layered animated _ripple maps_, tint colours, and reflectance.

They need not exclusively be used for water -- the coolant pools of _Keyes_ (d20) also use water shaders, and the [Halo CE Refined][refined] project uses them for some glass to better [emulate][renderer#pc-regressions] Xbox glass shaders. They are also not exclusively used within the [BSP][scenario_structure_bsp], with [skies][sky] like _Damnation's_ also using this shader type.

Flowing water with rapids, like waterfalls and rivers, can instead use [shader_transparent_chicago][] which allows for more varied animation and map blending.

# Known issues
Ripple maps are [not rendered correctly][renderer#pc-regressions] in PC retail and Custom Edition compared to Xbox. The highest level of detail [mipmap][] is used for the most distant areas, but water closer to the camera uses the lowest detail mipmap. This is the opposite of how it should be, and results in distant water suffering from major [aliasing][]. The water shader was fixed in MCC.

[refined]: https://www.reddit.com/r/HaloCERefined/
[mipmap]: https://en.wikipedia.org/wiki/Mipmap
[aliasing]: https://en.wikipedia.org/wiki/Aliasing
