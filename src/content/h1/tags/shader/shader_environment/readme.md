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

# Detail map blending
When this shader's [type](#tag-field-shader-environment-type) is set to _blended_ or _blended base specular_, the [base map's](#tag-field-base-map) alpha channel will be used as a blending mask between the [primary and secondary detail maps](#tag-field-primary-detail-map). 

This allows you to use two detail maps varyingly across a surface and is typically used for ground shaders which need both grassy and dirt areas. In this case the base map provides the general colouring across the ground of the level, while the detail maps tile and provide fine-level detail. There are [a few options](#tag-field-detail-map-function) for how the detail maps blend with the base map.

# Alpha testing
When the [_alpha tested_](#tag-field-shader-environment-flags-alpha-tested) flag is checked, the bump map's alpha channel can be used as a kind of transparency mask. The shader will either be fully opaque or fully transparent depending on if the alpha value is lighter or darker than 50% gray.

You should use this feature for transparent shaders that need to maintain the appearance of sharp edges regardless of distance and where semi-transparency is not needed. Some examples of this include the 2D "billboard" trees outside _Timberland_, the floor grates in _Derelict_, or foliage textures on scenery.

Depending on the texture, you may find that at a distance small transparent or opaque details become lost, such as a chain link fence becoming totally invisible. This is the result of [mipmapping][mip] in the bump map since the alpha chanel is "blurring" as it becomes smaller and details are being lost. It can be important to tune the bump map's mipmap generation to avoid this:

* Limiting [_mipmap count_](~bitmap#tag-field-mipmap-count) results in more [aliasing][] but preserves the impression of fine detail.
* Tuning the [_alpha bias_](~bitmap/#tag-field-alpha-bias) lightens or darkens the alpha channel in mipmaps to result in more or less pixels passing the 50% alpha test.

# Bump maps
_Bump maps_ are special textures that encode the "bumpiness" of the surfaces they map to. They are used to represent fine details like cracks and grooves that affect specular reflections and lighting to make the surface look more geometrically detailed than it actually is.

Artists can create them as simple grayscale height maps in TIFF format, and once compiled by [Tool](~h1-tool) or [invader-bitmap](~) into a [bitmap tag](~bitmap) with ["height map" usage](~bitmap#tag-field-usage-height-map), they are represented as standard [normal maps][normals] for use in-engine. Halo CE does not use height maps and doesn't support tessellation or parallax occlusion. The alpha channel of the bump map is unused unless the shader is _alpha tested_.

The lighting effect of bump maps can be seen under both [dynamic lights](~light) and static [lightmaps](~) (sometimes called _environmental bump maps_), with the latter only natively supported in H1A and H1X unless using the CEnshine shader port for H1PC/H1CE. Environmental bump mapping uses incoming light directions which have been precalculated and stored per-vertex during radiosity.

## Invalid bump maps
Artists should ensure that the bump map referenced by a shader is a valid normal map. Don't forget to set the bitmap's usage to _height map_ if you're using tool to import a greyscale height map. Also, don't simply reuse a diffuse or a multipurpose map for a bump map. Failure to use a valid normal map will result in the surface appearing extremely dark or black.

Modders who are porting older Custom Edition maps to MCC may find that existing shaders have this problem, since environmental bump mapping was unsupported in H1CE and the original mappers would not have seen this darkening.

## Shading artifacts
{% figure src="artifacts.jpg" inline=false %}
Left: default stock shaders in _Chiron TL-34_ and _The Silent Cartographer_. Right: The same shaders with the alternate bump mapping flag enabled.
{% /figure %}

By default, environmental bump mapping is rendered by darkening surfaces based on the dot product (angle difference) between incoming light and the bump map. However, in some locations and lighting setups this can result in strange triangular shading artifacts that _look like_ bad smoothing despite level geometry having the intended normals:

* Where small or point-like light sources are very close to surfaces.
* Where sharp shadows should be, but the area has either low geometric complexity and/or uses shaders with low radiosity detail levels.

The artifact could be considered a problem with the legacy lighting model; the baked lightmap already accounts for diffuse attenuation and it shouldn't be doubly applied. It is made worse by the limited resolution of both the intermediate lightmap mesh and baked lightmap texture which results in light bleeding, and how per-vertex incident radiosity vectors cannot represent quickly changing light directions across a surface.

You can set the new [_alternate bump attenuation_](#tag-field-shader-environment-flags-use-alternate-bump-attenuation) flag to use a different bump mapping method (similar to Halo 2's) which removes these artifacts, but comes at the cost of possibly overexposing highlights from coloured lights and generally lightening surfaces. Using the flag or not is an artistic choice.

Custom Edition mappers never encountered this artifact due to CE's broken bump mapping. If you're porting a map from CE to MCC you may find that this this artifact is now noticeable. The new flag can be a quick fix to better maintain the original map's appearance and, if applied to all shaders, will generally brighten up a map and make it look more like CE.

If you want to avoid this artifact _without_ using the flag because you prefer the classic look for a shader, here are some workarounds:

* Use high radiosity detail level for affected shader(s) if you aren't already.
* Tesselate surfaces where sharp shadows lie, especially where shadow umbras and penumbras would lie. This limits light bleeding by forcing the lightmapper to resolve a higher level of detail than it normally would based on quality settings, and results in more incident radiosity vectors being stored to better match the baked lighting texture, but has the cost of increasing triangle count.
* Replace nearby point light sources with large diffuse invisible light casting surfaces that avoid sharp shadows.
* Avoid putting scenery lights too close to surfaces or in locations that would cast sharp shadows.

# Use by gbxmodels
When a [gbxmodel](~) references this shader type it will not render correctly in H1CE due to [renderer bugs](~renderer#gearbox-regressions). Specular masking and tinting don't work and [sky](~) fog does not render over it. Some affected [scenery](~) include the teleporter base and human barricades. It is not recommended to use this shader type for custom objects when targeting Custom Edition, but it is safe to use in H1A.

# Related HaloScript
{% relatedHsc game="h1" tagFilter="shader_environment" /%}

# Structure and fields

{% tagStruct "h1/shader_environment" /%}

[normals]: https://en.wikipedia.org/wiki/Normal_mapping
[mip]: https://en.wikipedia.org/wiki/Mipmap
[aliasing]: https://en.wikipedia.org/wiki/Aliasing