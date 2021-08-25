**shader_environment** is intended for opaque and alpha-tested surfaces in [BSPs][scenario_structure_bsp]. A key feature of this shader is its ability to blend between two detail maps, making it ideal for outdoor ground shaders. It also supports cubemaps, bump maps, and masked specularity which can be used for metallic surfaces like Forerunner structures.

# Bump maps
_Bump maps_ are textures that add additional local surface shape information for reflections and lighting. They are represented as standard [normal maps][normals] once converted from source by [Tool][h1a-tool] or [invader-bitmap][invader#invader-bitmap] into a [bitmap tag][bitmap]. They are _not_ height maps and Halo doesn't support tessellation or parallax occlusion.

Use bump maps in your environment shaders to give the surface a bumpy appearance when dynamic light sources light explosions or flashlights are nearby, and when illuminated by [lightmaps][]. Unfortunately bump maps are not visible by lightmaps alone in H1PC and H1CE. Support for environmental bump mapping like Xbox had was added back in H1A.

When the "is alpha tested" flag is checked, the bump map's alpha channel can be used to mask the material. In this case, the material is either fully opaque or fully transparent depending on the alpha value. The billboard trees outside _Timberland_ make use of this feature.

# Use by gbxmodels
When a [gbxmodel][] references this shader type it will not render correctly in H1CE due to [renderer bugs][renderer#gearbox-regressions]. Specular masking and tinting don't work and [sky][] fog does not render over it. Some affected [scenery][] include the teleporter base and human barricades.

It is not recommended to use this shader type for custom objects when targeting Custom Edition. It is fixed in H1A.

[normals]: https://en.wikipedia.org/wiki/Normal_mapping
