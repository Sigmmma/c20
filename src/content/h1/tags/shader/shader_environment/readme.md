---
title: shader_environment
stub: true
about: 'tag:h1/shader_environment'
img: bloodgulch.jpg
caption: A shader_environment can be used to blend between two detail maps.
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
---
**shader_environment** is intended for opaque and alpha-tested surfaces and is typically used for the majority of shaders in level [BSPs](~scenario_structure_bsp), though it can also be used on [gbxmodels](~gbxmodel). A key feature of this shader is its ability to blend between two detail maps, making it ideal for outdoor ground shaders. It also supports cube maps, bump maps, detail maps, and masked specularity.

# Bump maps
_Bump maps_ are textures that add local surface shape information for reflections and lighting. Artists can create them as simple grayscale height maps in TIFF format, and once compiled by [Tool](~h1a-tool) or [invader-bitmap](~) into a [bitmap tag](~bitmap) with ["height map" usage](~bitmap#tag-field-usage-height-map), they are represented as standard [normal maps][normals] for use in-engine. Halo does not use height maps and doesn't support tessellation or parallax occlusion.

Use bump maps in your environment shaders to give the surface a bumpy appearance when dynamic light sources like explosions or flashlights are nearby, and when illuminated by [lightmaps](~) (supported in H1A and H1X only, not H1PC or H1CE unless using CEnshine).

When the "is alpha tested" flag is checked, the bump map's alpha channel can be used to mask the material. In this case, the material is either fully opaque or fully transparent depending on the alpha value. Some examples of this include the "billboard" trees outside _Timberland_, the floor grates in _Derelict_, or foliage textures on scenery.

# Use by gbxmodels
When a [gbxmodel](~) references this shader type it will not render correctly in H1CE due to [renderer bugs](~renderer#gearbox-regressions). Specular masking and tinting don't work and [sky](~) fog does not render over it. Some affected [scenery](~) include the teleporter base and human barricades. It is not recommended to use this shader type for custom objects when targeting Custom Edition, but it is safe to use in H1A.

[normals]: https://en.wikipedia.org/wiki/Normal_mapping

# Structure and fields

{% tagStruct "h1/shader_environment" /%}
