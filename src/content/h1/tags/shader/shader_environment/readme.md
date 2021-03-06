**Environment shaders** are intended for opaque and alpha-tested surfaces in [BSPs][scenario_structure_bsp]. A key feature of this shader is its ability to blend between two detail maps, making it ideal for outdoor ground shaders. It also supports cubemaps, normal maps, and masked specularity which can be used for metallic surfaces like Forerunner structures.

When the "is alpha tested" flag is checked, the normal map's alpha channel can be used to mask the material. In this case, the material is either fully opaque or fully transparent depending on the alpha value. The billboard trees outside _Timberland_ make use of this feature.

# Use by gbxmodels
When a [gbxmodel][] references this shader type it will not render correctly in H1CE due to [renderer bugs][renderer#gearbox-regressions]. Some affected [scenery][] include the teleporter base and human barricades.

It is not recommended to use this shader type for custom objects when targeting Custom Edition. It is, however, fixed in H1A.
