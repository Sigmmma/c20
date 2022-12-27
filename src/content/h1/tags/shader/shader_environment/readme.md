---
title: shader_environment
about: 'tag:h1/shader_environment'
img: shader_environment.jpg
caption: >
  Some uses of shader_environment showing features like
  blending between two detail maps (grass and stone), specular reflections,
  bump mapping, and alpha testing (foliage).
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
  Conscars: Notes on bump mapping and alpha testing
---
**shader_environment** is intended for opaque and alpha-tested surfaces and is typically used for the majority of shaders in level [BSPs](~scenario_structure_bsp), though it can also be used on [gbxmodels](~gbxmodel). A key feature of this shader is its ability to blend between two detail maps, making it ideal for outdoor ground shaders. It also supports cube maps, bump maps, detail maps, and masked specularity.

# Alpha testing
When the [_alpha tested_](#tag-field-shader-environment-flags-alpha-tested) flag is checked, the bump map's alpha channel can be used as a kind of transparency mask. The shader will either be fully opaque or fully transparent depending on if the alpha value is lighter or darker than 50% gray.

You should use this feature for transparent shaders that need to maintain the appearance of sharp edges regardless of distance and where semi-transparency is not needed. Some examples of this include the "billboard" trees outside _Timberland_, the floor grates in _Derelict_, or foliage textures on scenery.

Depending on the texture, you may find that at a distance small transparent or opaque details become lost, such as a chain link fence becoming totally invisible. This is the result of [mipmapping][mip] in the bump map since the alpha chanel is "blurring" as it becomes smaller and details are being lost. It can be important to tune the bump map's mipmap generation to avoid this:

* Limiting [_mipmap count_](~bitmap#tag-field-mipmap-count) results in more [aliasing][] but preserves the impression of fine detail.
* Tuning the [_alpha bias_](~bitmap/#tag-field-alpha-bias) lightens or darkens the alpha channel in mipmaps to result in more or less pixels passing the 50% alpha test.

# Bump maps
_Bump maps_ are special textures that encode the "bumpiness" of the surfaces they map to. They can be used to represent fine surface details like cracks and grooves and affect specular reflections and lighting to make the surface look more geometrically detailed than it actually is.

Artists can create them as simple grayscale height maps in TIFF format, and once compiled by [Tool](~h1a-tool) or [invader-bitmap](~) into a [bitmap tag](~bitmap) with ["height map" usage](~bitmap#tag-field-usage-height-map), they are represented as standard [normal maps][normals] for use in-engine. Halo CE does not use height maps and doesn't support tessellation or parallax occlusion. The alpha channel of the bump map is unused unless the shader is _alpha tested_.

The lighting effect of bump maps can be seen under both [dynamic lights](~light) and static [lightmaps](~) (sometimes called _environmental bump maps_), with the latter only natively supported in H1A and H1X unless using the CEnshine shader port for H1PC/H1CE. Environmental bump mapping uses incoming light directions which have been precalculated and stored per-vertex during radiosity.

## Invalid bump maps
Artists should ensure that the bump map referenced by a shader is a valid normal map. Don't forget to set the bitmap's usage to _height map_ if you're using tool to import a greyscale height map. Also, don't simply reuse a diffuse or a multipurpose map for a bump map. Failure to use a valid normal map will result in the surface appearing extremely dark or black.

Modders who are porting older Custom Edition maps to MCC may find that existing shaders have this problem, since environmental bump mapping was unsupported in H1CE and the original mappers would not have seen this darkening.

## Attenuation artifacts
{% comment %}
{% figure src="artifacts.jpg" inline=false %}
Left: default stock shaders in _Chiron TL-34_ and _The Silent Cartographer_. Right: The same shaders with the alternate bump mapping flag enabled.
{% /figure %}
{% /comment %}

By default, environmental bump mapping is rendered by darkening surfaces based on the dot product (angle difference) between incoming light and the bump map. However, in some locations and lighting setups this can result in strange triangular shading artifacts that _look like_ bad smoothing despite level geometry having the intended normals.

* Where small or point-like light sources are very close to surfaces.
* Where sharp shadows should be, but the area has either low geometric complexity and/or uses shaders with low radiosity detail levels.

This is because the incident radiosity vector is stored only per-vertex and can vary greatly across a surface, while the lightmap is limited in detail. Another factor is that the baked lightmap already accounts for diffuse attenuation and it shouldn't be doubly applied, which could be considered a legacy bug.

{% comment %}
You can set the new [_alternate bump attenuation_](#tag-field-shader-environment-flags-use-alternate-bump-attenuation) flag to use a different bump mapping method that instead darkens or brightens the surface based on how the bump map differs from a flat surface, which removes these artifacts at the cost of overbrightening some highlights near coloured light sources towards white.

If you are noticing these artifacts then you should use this option on the affected shaders. You can use `debug_camera 1` to help identify the shader if needed. Modders who are porting maps from Custom Edition to MCC may also find this useful since the lack of bump mapping in H1CE meant the original mappers never would have seen this issue in their maps and worked around it.
{% /comment %}

If you are having this issue and want to change your lighting setup or level geometry to fix it, you can:

* Use high radiosity detail level for affected shaders if you aren't already.
* Tesselate surfaces where sharp shadows lie, especially where shadow umbras and penumbras would lie. This limits light bleeding by forcing the lightmapper to resolve a higher level of detail than it normally would based on quality settings, and results in more incident radiosity vectors being stored to better match the baked lighting texture, but has the cost of increasing triangle count.
* Replace point light sources with large diffuse invisible light casting surfaces that avoid hard shadows. This blurs away sharp shadows but removes artistic choice.
* Avoid putting lights too close to surfaces or in locations that would cast sharp shadows.

# Use by gbxmodels
When a [gbxmodel](~) references this shader type it will not render correctly in H1CE due to [renderer bugs](~renderer#gearbox-regressions). Specular masking and tinting don't work and [sky](~) fog does not render over it. Some affected [scenery](~) include the teleporter base and human barricades. It is not recommended to use this shader type for custom objects when targeting Custom Edition, but it is safe to use in H1A.

# Structure and fields

{% tagStruct "h1/shader_environment" /%}

[normals]: https://en.wikipedia.org/wiki/Normal_mapping
[mip]: https://en.wikipedia.org/wiki/Mipmap
[aliasing]: https://en.wikipedia.org/wiki/Aliasing