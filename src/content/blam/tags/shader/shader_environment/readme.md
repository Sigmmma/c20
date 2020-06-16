---
title: shader_environment
tagName: shader_environment
stub: true
img: bloodgulch.jpg
imgCaption: A shader_environment can be used to blend between two detail maps.
---
Environment shaders are intended for opaque and alpha-tested surfaces in [BSPs][scenario_structure_bsp]. A key feature of this shader is its ability to blend between two detail maps, making it ideal for outdoor ground shaders. It also supports cubemaps, normal maps, and masked specularity which can be used for metallic surfaces like Forerunner structures.

When the "is alpha tested" flag is checked, the normal map's alpha channel can be used to mask the material. In this case, the material is either fully opaque or fully transparent depending on the alpha value. The billboard trees outside _Timberland_ make use of this feature.
