The **JMS material naming conventions** are a way to name your 3D asset's materials with special keywords and symbols which [Tool][h1a-tool] recognizes and gives special treatment. An example is adding the `^` symbol to the end of a material name (like `vines^`) which makes a collision surface a climbable ladder, or the special name `+sky` which causes the faces to show the [sky][sky] through them.

Material names usually match one of your model's [shader][] tag names. For example, a level which has the material name `vines^` might have a corresponding shader at `tags\levels\example\shaders\vines.shader_environment`.

# Special materials
These material names are hard-coded into the [tools][h1a-ek] and have special meaning. They do not need shader tags.

| Name | Usage
|------|------
| `+sky`, `+sky0`, `+sky1`, ... | Applied to surfaces to render the [skybox][sky]. You can add the index of the sky in the [scenario skies block][/scenario#tag-field-skies] if your scenario has multiple skies. Since each [cluster][scenario_structure_bsp#clusters-and-cluster-data] can only reference [one sky][scenario_structure_bsp#tag-field-clusters-sky], you must ensure that all sky faces within a cluster use the same index.
| `+seamsealer` | Applied to temporary geometry to "seal" the level. Most commonly used to seal holes or other open edged areas of the level during construction and testing. For multiplayer levels, `+seamsealer` should never be applied to a face in the final build of the level.
| `+portal` | Applied to faces that are used to define general portals used in the visibility solution or rendering occlusion for the level. Because they split the level into [clusters][scenario_structure_bsp#clusters-and-cluster-data], they are also used to define areas of different sound environments or weather.
| `+exactportal` | Applied to faces that are used to define an exact volume or portal.  Such faces typically cover exactly the opening of a doorway, passage, or hallway to define a very distinct volume that can be used to occlude the rendering of other areas of the level. Both `+portal` and `+exactportal` are represented the same way within a [BSP tag][scenario_structure_bsp] once compiled.
| `+weatherpoly` | Used on the faces of simply [convex shapes](https://en.wikipedia.org/wiki/Polyhedron#Convex_polyhedra) to generate [weather polyhedra][scenario_structure_bsp#weather-polyhedra], which are used to mask [weather particles][weather_particle_system] from areas under overhangs and around doorways. The faces do not need to be sealed but do need to be connected to each other in each polyhedron.
| `+sound` | Applied to faces that are used to define volumes for sound.
| `+unused` | Reserved special material that has many uses and can be used in conjunction with the special shader symbols to define its use and behavior. For example, it can be used with the `$` fog plane shader symbol to make `+unused$`, which can be applied to faces to construct a fog plane that is used to define a volumetric [fog][] region.

# Material symbols
_Not yet documented_.
