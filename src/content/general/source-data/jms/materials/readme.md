The **JMS material naming conventions** are a way to name your 3D asset's materials so they match with [shaders][h1/tags/shader] and using special keywords and symbols which [Tool][h1a-tool] recognizes and gives special treatment. Some examples are adding the `^` symbol to the end of a material name (like `vines^`) so it becomes a climbable ladder, or the special name `+sky` which causes the faces to show the [sky][h1/tags/sky] through them.

This naming convention applies to both [Blender][] and [3ds Max][3dsmax] usage.

# Material naming and shaders
The [JMS][] files you export from your 3D software contain the material names you used. [Tool][h1a-tool] will then search for a matching shader tag within your tags directory when compiling the JMS into a model tag and will automatically assign the shader references. For example, a level BSP which has the material name `vines^` might have a corresponding shader at `tags\levels\my_level\shaders\vines.shader_environment` but it could also match with `tags\levels\some_other_level\shaders\vines.shader_environment`. For this reason it is important to name your materials and shaders uniquely. Always use lower-case names and do not exceed 32 characters.

When no shader tag can be found, Tool will ask you to generate one by choosing a shader type. H1CE Tool will create these in the root of the tags directory, wheras H1A Tool will create them in a `shaders` directory next to the model tag.

# Special materials
These material names are hard-coded into the [tools][h1a-ek] and have special meaning. They do not need shader tags.

## Halo 1 materials
| Name | Usage
|------|------
| `+sky`, `+sky0`, `+sky1`, ... | Applied to surfaces to render the [skybox][h1/tags/sky]. You can add the index of the sky in the [scenario skies block][h1/tags/scenario#tag-field-skies] if your scenario has multiple skies. Since each [cluster][h1/tags/scenario_structure_bsp#clusters-and-cluster-data] can only reference [one sky][h1/tags/scenario_structure_bsp#tag-field-clusters-sky], you must ensure that all sky faces within a cluster use the same index.
| `+seamsealer` | Applied to temporary geometry to "seal" the level. Most commonly used to seal holes or other open edged areas of the level during construction and testing. These faces functionally behave the same as `+sky` -- they must still form sealed connections with the open edges that they close and the sky renders through them. They cannot be placed inside the level because they would either have open edges or cause ["Couldn't update edge"][bsp-troubleshooting#error-couldn-39-t-update-edge-red] errors. Seamsealer is collideable and deletes projectiles just like `+sky`.
| `+portal` | Applied to faces that are used to define general portals used in the visibility solution or rendering occlusion for the level. Because they split the level into [clusters][h1/tags/scenario_structure_bsp#clusters-and-cluster-data], they are also used to define areas of different sound environments or weather.
| `+exactportal` | Applied to faces that are used to define an exact volume or portal. Such faces typically cover exactly the opening of a doorway, passage, or hallway to define a very distinct volume that can be used to occlude the rendering of other areas of the level. The portal need not be planar, but all of its vertices must be perfectly aligned (but not welded) with the level's vertices. Both `+portal` and `+exactportal` are represented the same way within a [BSP tag][h1/tags/scenario_structure_bsp] once compiled.
| `+weatherpoly` | Used on the faces of simply [convex shapes](https://en.wikipedia.org/wiki/Polyhedron#Convex_polyhedra) to generate [weather polyhedra][h1/tags/scenario_structure_bsp#weather-polyhedra], which are used to mask [weather particles][weather_particle_system] from areas under overhangs and around doorways. The faces do not need to be sealed but do need to be connected to each other in each polyhedron.
| `+sound` | Applied to faces that are used to define volumes for sound.
| `+unused` | Reserved special material that has many uses and can be used in conjunction with the special shader symbols to define its use and behavior. For example, it can be used with the `$` fog plane shader symbol to make `+unused$`, which can be applied to faces to construct a fog plane used to define a volumetric [fog][] region (assigned using [Sapien][h1a-sapien]).

## Halo 2 materials
| Name | Usage
|------|------
| `+sky`, `+sky0`, `+sky1`, ... | Applied to surfaces to render the [skybox][h2/tags/sky]. You can add the index of the sky in the [scenario skies block][h2/tags/scenario#tag-field-skies] if your scenario has multiple skies. Since each [cluster][h2/tags/scenario_structure_bsp#clusters-and-cluster-data] can only reference [one sky][h2/tags/scenario_structure_bsp#tag-field-clusters-sky], you must ensure that all sky faces within a cluster use the same index.
| `+portal` | Applied to faces that are used to define general portals used in the visibility solution or rendering occlusion for the level. Because they split the level into [clusters][h2/tags/scenario_structure_bsp#clusters-and-cluster-data], they are also used to define areas of different sound environments or weather.
| `+weatherpoly` | Used on the faces of simply [convex shapes](https://en.wikipedia.org/wiki/Polyhedron#Convex_polyhedra) to generate [weather polyhedra][h2/tags/scenario_structure_bsp#weather-polyhedra], which are used to mask [weather particles][weather_system] from areas under overhangs and around doorways. The faces do not need to be sealed but do need to be connected to each other in each polyhedron.
| `+seamsealer` | Applied to temporary geometry to "seal" the level. Most commonly used to seal holes or other open edged areas of the level during construction and testing. These faces functionally behave the same as `+sky` -- they must still form sealed connections with the open edges that they close and the sky renders through them. Seamsealer is collideable and deletes projectiles just like `+sky`.
| `+media` | Reserved special material that has many uses and can be used in conjunction with the special shader symbols to define its use and behavior. For example, it can be used with the `$` fog plane shader symbol to make `+media$`, which can be applied to faces to construct a fog plane used to define a volumetric [fog][] region (assigned using [Sapien][h2-sapien]).

## Halo 3 materials
| Name | Usage
|------|------
| `+sky`, `+sky0`, `+sky1`, ... | Applied to surfaces to render the [skybox][h2/tags/sky]. You can add the index of the sky in the [scenario skies block][h2/tags/scenario#tag-field-skies] if your scenario has multiple skies. Since each [cluster][h2/tags/scenario_structure_bsp#clusters-and-cluster-data] can only reference [one sky][h2/tags/scenario_structure_bsp#tag-field-clusters-sky], you must ensure that all sky faces within a cluster use the same index.
| `+portal` | Applied to faces that are used to define general portals used in the visibility solution or rendering occlusion for the level. Because they split the level into [clusters][h2/tags/scenario_structure_bsp#clusters-and-cluster-data], they are also used to define areas of different sound environments or weather.
| `+weatherpoly` | Used on the faces of simply [convex shapes](https://en.wikipedia.org/wiki/Polyhedron#Convex_polyhedra) to generate [weather polyhedra][h2/tags/scenario_structure_bsp#weather-polyhedra], which are used to mask [weather particles][weather_system] from areas under overhangs and around doorways. The faces do not need to be sealed but do need to be connected to each other in each polyhedron. Seems to have been deprecated in Halo 3.
| `+seamsealer` | Applied to temporary geometry to "seal" the level. Most commonly used to seal holes or other open edged areas of the level during construction and testing. These faces functionally behave the same as `+sky` -- they must still form sealed connections with the open edges that they close and the sky renders through them. Seamsealer is collideable and deletes projectiles just like `+sky`.
| `+media` | Reserved special material that has many uses and can be used in conjunction with the special shader symbols to define its use and behavior. For example, it can be used with the `$` fog plane shader symbol to make `+media$`, which can be applied to faces to construct a fog plane used to define a volumetric [fog][] region (assigned using [Sapien][h2-sapien]).
| `+unused` | Reserved special material that has many uses and can be used in conjunction with the special shader symbols to define its use and behavior. For example, it can be used with the `$` fog plane shader symbol to make `+unused$`, which can be applied to faces to construct a fog plane used to define a volumetric [fog][] region (assigned using [Sapien][h1a-sapien]).
| `+seam` | ???
| `+soft_ceiling` | ???
| `+soft_kill` | ???
| `+slip_surface` | ???

# Material symbols
Material symbols are added to the **end** of the material name and give the surface certain attributes or behaviours in-engine.

## Halo 1 symbols
| Symbol | Usage
|--------|------
| `%` | **Two-sided property**. This has the effect of both disabling [back-face culling](https://en.wikipedia.org/wiki/Back-face_culling) so that the surface will _render_ from both sides instead of just its [normal direction](https://en.wikipedia.org/wiki/Normal_(geometry)), and this will cause the surface to have two-sided collision (unless marked render-only with `!`). A surface with this symbol does not need to follow sealed world rules (it can have open edges). This symbol is typically used on glass windows and floor grates if the player will see them from both sides.
| `#` | **Transparent property**. Used for one-sided non-manifold (unsealed) collidable geometry like grates.
| `!` | **Render-only property**. This causes the surface to have no collision and therefore does not need to follow sealed world rules. Use this for things which the player will not interact with like small cables or 2D "billboard" trees outside the playable space.
| `*` | **Large collidable property**, also called **sphere collision only**. This creates non-rendering collision-only geometry that ray tests (such as [projectiles][h1/tags/object/projectile]) pass through but not sphere-based collisions (like [bipeds physics pills][h1/tags/object/unit/biped#physics-and-autoaim-pills] and [vehicle physics][h1/tags/physics]). This symbol is ideal for surfaces which prevent the player from getting stuck on small obstacles, covering stairs with invisible ramps, and stopping players from going out of bounds, all while still allowing grenades and bullets to pass through. _Source engine_ modders may know this as **[player clip](https://developer.valvesoftware.com/wiki/Tool_textures#Clips)**.
| `@` | **Collision only property**. Used for non-rendered collision geometry. These surfaces will stop all types of collision rather than sphere only like `*`.
| `$` | **Fog plane property**. This symbol caused faces to be used as a fog plane, to which [fog][] can be assigned in Sapien. The fog region is the space anti-normal to (behind) the surface. When the fog plane exists alone, it is paired with the special material `+unused` to make `+unused$`. When the fog plane is used with [water][shader_transparent_water], you would name the material like `my_water_shader!$`.
| `^` | **Ladder property**. This indicates if the collision surface is [climbable][h1/tags/scenario_structure_bsp#tag-field-collision-bsp-surfaces-flags-climbable]. Use it for ladders.
| `-` | **Breakable property**. Use this for breakable glass surfaces. When destroyed they will shatter into small particles and become collisionless.
| `&` | **AI deafening property**. This is a special kind of portal which does not propagate sound. AI will not be able to hear sounds through it.
| `.` | **Exact portal property**. This symbol can be used for materials which are always used on surfaces that perfectly separate one space from another. In other words, they will work just like `+exactportal`. This is an easy way to automatically create some exact portals where you have enclosed spaces behind glass and grates.

## Halo 2 symbols
| Symbol | Usage
|--------|------
| `%` | **Two-sided property**. Two-sided path findable geometry. This flag or shader symbol when applied to a material that is applied to a face or surface renders both sides of the surface instead of just the side that the normal is facing.
| `#` | **One-sided Transparent**. One-sided but non-manifold collidable geometry.
| `?` | **Two-sided Transparent**. Two-sided collidable geometry that is not connected to or touching one-sided geometry.
| `!` | **Render-only**. Non-collidable, Non-solid geometry.
| `@` | **Collision Only**, Non-rendered geometry.
| `*` | **Sphere Collision Only**. Non-rendered geometry that ray tests pass through but spheres (bipeds and vehicles) will not.
| `$` | **Fog Plane**. Non-collidable fog plane.   This shader symbol when applied to a material that is applied to a face or surface makes the surface not be rendered. The faces acts as a fog plane that can be used to define a volumetric fog region.
| `^` | **Ladder**. Climbable geometry. This flag or shader symbol when applied to a material that is applied to a face or surface sets the surface up to act as a ladder for the player.
| `-` | **Breakable**. Two-sided breakable geometry.
| `&` | **AI deafening**. A portal that does not propagate sound. This property does not apply to multiplayer levels.
| `=` | **No Shadow**. Does not cast real time shadows.
| `.` | **Shadow Only**. Casts real time shadows but is not visible.
| `;` | **Lightmap Only**. Emits light in the light mapper but is otherwise non-existent. (non-collidable and non-rendered)
| `)` | **Precise**. Points and triangles are precise and will not be fiddled with in the BSP pass.
| `>` | **Conveyor**. Geometry which will have a surface coordinate system and velocity.
| `<` | **Portal (One-Way)**. Portal can only be seen through in a single direction.
| `\|`| **Portal (Door)**. Portal visibility is attached to a device machine state.
| `~` | **Portal (Vis Blocker)**. Portal visibility is completely blocked by this portal.
| `(` | **Dislikes Photons**. Photons from sky/sun quads will ignore these materials.
| `{` | **Ignored by Lightmapper**. Lightmapper will not add this geometry to it's raytracing scene representation.
| `}` | **Portal (Sound Blocker)**. Portal that does not propagate any sound.
| `[` | **Decal Offset**. Offsets the faces that this material is applied to as it would normally for a decal.

## Halo 3 symbols
| Symbol | Usage
|--------|------
| `%` | **Two-sided property**. Two-sided path findable geometry. This flag or shader symbol when applied to a material that is applied to a face or surface renders both sides of the surface instead of just the side that the normal is facing.
| `#` | **One-sided Transparent**. One-sided but non-manifold collidable geometry.
| `?` | **Two-sided Transparent**. Two-sided collidable geometry that is not connected to or touching one-sided geometry.
| `!` | **Render-only**. Non-collidable, Non-solid geometry.
| `@` | **Collision Only**, Non-rendered geometry.
| `*` | **Sphere Collision Only**. Non-rendered geometry that ray tests pass through but spheres (bipeds and vehicles) will not.
| `$` | **Fog Plane**. Non-collidable fog plane.   This shader symbol when applied to a material that is applied to a face or surface makes the surface not be rendered. The faces acts as a fog plane that can be used to define a volumetric fog region.
| `^` | **Ladder**. Climbable geometry. This flag or shader symbol when applied to a material that is applied to a face or surface sets the surface up to act as a ladder for the player.
| `-` | **Breakable**. Two-sided breakable geometry.
| `&` | **AI deafening**. A portal that does not propagate sound. This property does not apply to multiplayer levels.
| `=` | **No Shadow**. Does not cast real time shadows.
| `.` | **Shadow Only**. Casts real time shadows but is not visible.
| `;` | **Lightmap Only**. Emits light in the light mapper but is otherwise non-existent. (non-collidable and non-rendered)
| `)` | **Precise**. Points and triangles are precise and will not be fiddled with in the BSP pass.
| `>` | **Conveyor**. Geometry which will have a surface coordinate system and velocity.
| `<` | **Portal (One-Way)**. Portal can only be seen through in a single direction.
| `\|`| **Portal (Door)**. Portal visibility is attached to a device machine state.
| `~` | **Portal (Vis Blocker)**. Portal visibility is completely blocked by this portal.
| `(` | **Dislikes Photons**. Photons from sky/sun quads will ignore these materials.
| `{` | **Ignored by Lightmapper**. Lightmapper will not add this geometry to it's raytracing scene representation.
| `}` | **Portal (Sound Blocker)**. Portal that does not propagate any sound.
| `[` | **Decal Offset**. Offsets the faces that this material is applied to as it would normally for a decal.
| `\` | **Water Surface**. Sets the surface to be a water surface.
| `0` | **Slip Surface**. Units (bipeds and vehicles) will slip off this surface.
| `]` | **Group Transparents by Plane**. Group transparent geometry by fitted planes.

# Material properties
Material properties are added to the **end** of the material name and set some parameters for the lightmapper to use.

## Halo 2 properties
| Symbol | Usage
|--------|------
| `lm` | **Lightmap Resolution Scale**. Decreased lightmap sizes reduces the memory used and can speed up the lighting process. The effects of this can easily be seen when viewing a level that has been lit with H2Tool using the Checkerboard option for lighting).
| `lp` | **Lightmap Power Scale**. Scales the intensity of light given off by the marked surface.
| `hl` | **Lightmap Half-Life**.
| `ds` | **Lightmap Diffuse Scale**.

## Halo 3 properties
| Symbol | Usage
|--------|------
| `lm` | **Lightmap Resolution Scale**. Decreased lightmap sizes reduces the memory used and can speed up the lighting process. The effects of this can easily be seen when viewing a level that has been lit with H2Tool using the Checkerboard option for lighting).
| `lp` | **Lightmap Power Scale**. Scales the intensity of light given off by the marked surface.
| `hl` | **Lightmap Half-Life**. ???
| `ds` | **Lightmap Diffuse Scale**. ???
| `pf` | **Lightmap Photon Fidelity**. ???
| `lt` | **Lightmap Translucency Tint Color**. ???
| `to` | **Lightmap Transparency Override**. ???
| `at` | **Lightmap Additive Transparency**. ???
| `ro` | **Lightmap Ignore Default Resolution Scale**. ???

ex: city metal_roof lm:0.1
