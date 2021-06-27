The **JMS material naming conventions** are a way to name your 3D asset's materials so they match with [shaders][shader] and using special keywords and symbols which [Tool][h1a-tool] recognizes and gives special treatment. Some examples are adding the `^` symbol to the end of a material name (like `vines^`) so it becomes a climbable ladder, or the special name `+sky` which causes the faces to show the [sky][sky] through them.

This naming convention applies to both [Blender][] and [3ds Max][3dsmax] usage.

# Material naming and shaders
The [JMS][] files you export from your 3D software contain the material names you used. [Tool][h1a-tool] will then search for a matching shader tag within your tags directory when compiling the JMS into a model tag and will automatically assign the shader references. For example, a level BSP which has the material name `vines^` might have a corresponding shader at `tags\levels\my_level\shaders\vines.shader_environment` but it could also match with `tags\levels\some_other_level\shaders\vines.shader_environment`. For this reason it is important to name your materials and shaders uniquely. Always use lower-case names and do not exceed 32 characters.

When no shader tag can be found, Tool will ask you to generate one by choosing a shader type. H1CE Tool will create these in the root of the tags directory, wheras H1A Tool will create them in a `shaders` directory next to the model tag.

# Special materials
These material names are hard-coded into the [tools][h1a-ek] and have special meaning. They do not need shader tags.

| Name | Usage
|------|------
| `+sky`, `+sky0`, `+sky1`, ... | Applied to surfaces to render the [skybox][sky]. You can add the index of the sky in the [scenario skies block][/scenario#tag-field-skies] if your scenario has multiple skies. Since each [cluster][scenario_structure_bsp#clusters-and-cluster-data] can only reference [one sky][scenario_structure_bsp#tag-field-clusters-sky], you must ensure that all sky faces within a cluster use the same index.
| `+seamsealer` | Applied to temporary geometry to "seal" the level. Most commonly used to seal holes or other open edged areas of the level during construction and testing. For multiplayer levels, `+seamsealer` should never be applied to a face in the final build of the level.
| `+portal` | Applied to faces that are used to define general portals used in the visibility solution or rendering occlusion for the level. Because they split the level into [clusters][scenario_structure_bsp#clusters-and-cluster-data], they are also used to define areas of different sound environments or weather.
| `+exactportal` | Applied to faces that are used to define an exact volume or portal. Such faces typically cover exactly the opening of a doorway, passage, or hallway to define a very distinct volume that can be used to occlude the rendering of other areas of the level. The portal need not be planar, but all of its vertices must be perfectly aligned (but not welded) with the level's vertices. Both `+portal` and `+exactportal` are represented the same way within a [BSP tag][scenario_structure_bsp] once compiled.
| `+weatherpoly` | Used on the faces of simply [convex shapes](https://en.wikipedia.org/wiki/Polyhedron#Convex_polyhedra) to generate [weather polyhedra][scenario_structure_bsp#weather-polyhedra], which are used to mask [weather particles][weather_particle_system] from areas under overhangs and around doorways. The faces do not need to be sealed but do need to be connected to each other in each polyhedron.
| `+sound` | Applied to faces that are used to define volumes for sound.
| `+unused` | Reserved special material that has many uses and can be used in conjunction with the special shader symbols to define its use and behavior. For example, it can be used with the `$` fog plane shader symbol to make `+unused$`, which can be applied to faces to construct a fog plane used to define a volumetric [fog][] region (assigned using [Sapien][h1a-sapien]).

# Material symbols
Material symbols are added to the **end** of the material name and give the surface certain attributes or behaviours in-engine.

| Symbol | Usage
|--------|------
| `%` | **Two-sided property**. This has the effect of both disabling [back-face culling](https://en.wikipedia.org/wiki/Back-face_culling) so that the surface will _render_ from both sides instead of just its [normal direction](https://en.wikipedia.org/wiki/Normal_(geometry)), and this will cause the surface to have two-sided collision (unless marked render-only with `!`). A surface with this symbol does not need to follow sealed world rules (it can have open edges). This symbol is typically used on glass windows and floor grates if the player will see them from both sides.
| `#` | **Transparent property**. Used for one-sided non-manifold (unsealed) collidable geometry like grates.
| `!` | **Render-only property**. This causes the surface to have no collision and therefore does not need to follow sealed world rules. Use this for things which the player will not interact with like small cables or 2D "billboard" trees outside the playable space.
| `*` | **Large collidable property**, also called **sphere collision only**. This creates non-rendering collision-only geometry that ray tests (such as [projectiles][projectile]) pass through but not sphere-based collisions (like [bipeds physics pills][biped#physics-and-autoaim-pills] and [vehicle physics][physics]). This symbol is ideal for surfaces which prevent the player from getting stuck on small obstacles, covering stairs with invisible ramps, and stopping players from going out of bounds, all while still allowing grenades and bullets to pass through. _Source engine_ modders may know this as **[player clip](https://developer.valvesoftware.com/wiki/Tool_textures#Clips)**.
| `@` | **Collision only property**. Used for non-rendered collision geometry. These surfaces will stop all types of collision rather than sphere only like `*`.
| `$` | **Fog plane property**. This symbol caused faces to be used as a fog plane, to which [fog][] can be assigned in Sapien. The fog region is the space anti-normal to (behind) the surface. When the fog plane exists alone, it is paired with the special material `+unused` to make `+unused$`. When the fog plane is used with [water][shader_transparent_water], you would name the material like `my_water_shader!$`.
| `^` | **Ladder property**. This indicates if the collision surface is [climbable][scenario_structure_bsp#tag-field-collision-bsp-surfaces-flags-climbable]. Use it for ladders.
| `-` | **Breakable property**. Use this for breakable glass surfaces. When destroyed they will shatter into small particles and become collisionless.
| `&` | **AI deafening property**. This is a special kind of portal which does not propagate sound. AI will not be able to hear sounds through it.
| `.` | **Exact portal property**. This symbol can be used for materials which are always used on surfaces that perfectly separate one space from another. In other words, they will work just like `+exactportal`. This is an easy way to automatically create some exact portals where you have enclosed spaces behind glass and grates.
