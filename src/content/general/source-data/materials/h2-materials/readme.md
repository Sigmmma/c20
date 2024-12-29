---
title: H2 materials
img: materials.jpg
caption: >-
  An example of some material names used for a level
  [BSP](~h2/tags/scenario_structure_bsp) in [Blender](~).
---
**Halo 2** saw some much needed improvements to material processing. The user can now define a directory to search for a shader in a directory. The amount of flags was expanded and some new properties were added to help with lightmap settings. 

# Material naming and shaders
Intermediate files such as [JMS](~) or [ASS](~) files you export from your 3D software contain the material names you used. How **Tool** finds the shader from there varies depending on whether or not a `shader_collection.shader_collection` file exists and whether or not the material name includes a shader collection prefix. We will go over how this works in the shader_collection section. Be sure to always use lower-case names and do not exceed 32 characters.

When no shader tag can be found, Tool will instead assign a default. The file path for the default shader can be found at `tags\shaders\invalid.shader`

# Shader collection
Shader_collection files are text based files that contain a list of prefixes followed by a directory. These prefixes can then be used at the start of a material name to tell tool what directory to search in for the shader tag. Find the file at the following path.

`tags\scenarios\shaders\shader_collections.shader_collections`

Don't get confused by the extension used by this file. This is a standard text file you can open up in notepad. You should be able to open it to view the contents and see the shader collections created for Halo 2's development.

## Adding a new directory
Adding a new shader collection is very simple. Use the following steps in order to add your own shader collection:

1. Open the shader_collections.shader_collections file in notepad.
2. Scroll down to the bottom and add a newline if needed. Each prefix and directory you add should start on a newline.
3. Choose a prefix name. This string of characters should have no spaces. In this case we will use the name `example`
4. Once you've done that press tab once to separate your prefix from the directory.
5. Now add a file path to a directory containing your level shaders. In our example we will use `scenarios\shaders\multi\example\shaders`

You should have ended up with the following:

`example	scenarios\shaders\multi\example`

## Using a shader collection
In order to use a shader collection you will need to have your material name start with the prefix you wish tool to use. If we wanted to use our newly created `example` collection then we would name our material the following:

`example metal_floor`

In the case of our example we want the prefix to be the start of the material name. This will be followed by a space and then the actual material name. The prefix will be stripped from the material name on import. In the case of our example above Tool would strip the `example ` portion of the material name. It would then look for a shader tag named `metal_floor` in the `tags\scenarios\shaders\multi\example\shaders` directory.

## Shader referencing
There are a few ways **Tool** looks for shaders on import. Here are some of the following ways:

* If a shader_collection file exists and the imported file is a level then the only way to assign shaders is a shader collection prefix

* If a shader_collection file does not exist and the imported file is a level then Tool will instead scan the tag directory for a matching shader. Tool will be looking for a matching shader tag starting with the shaders folder in the level root directory from the tags folder.

* If a shader_collection file exists and the imported file is a model then Tool will first check for a valid shader collection prefix in the material name. If the prefix does not match or does not exist then Tool will check the model root directory for a matching shader tag in a shaders folder.

# Special materials
These material names are hard-coded into the [tools](~h2-tool) and have special meaning. They do not need shader tags.

| Name | Usage
|------|------
| `+sky`, `+sky0`, `+sky1`, ... | Applied to surfaces to render the [skybox](~h2/tags/sky). You can add the index of the sky in the [scenario skies block](~h2/tags/scenario#tag-field-skies) if your scenario has multiple skies. Since each [cluster](~h2/tags/scenario_structure_bsp#clusters-and-cluster-data) can only reference [one sky](~h2/tags/scenario_structure_bsp#tag-field-clusters-sky), you must ensure that all sky faces within a cluster use the same index.
| `+portal` | Applied to faces that are used to define general portals used in the visibility solution or rendering occlusion for the level. Because they split the level into [clusters](~h2/tags/scenario_structure_bsp#clusters-and-cluster-data), they are also used to define areas of different sound environments or weather.
| `+weatherpoly` | Used on the faces of simply [convex shapes](https://en.wikipedia.org/wiki/Polyhedron#Convex_polyhedra) to generate [weather polyhedra](~h2/tags/scenario_structure_bsp#weather-polyhedra), which are used to mask [weather particles](~weather_system) from areas under overhangs and around doorways. The faces do not need to be sealed but do need to be connected to each other in each polyhedron.
| `+seamsealer` | Applied to temporary geometry to "seal" the level. Most commonly used to seal holes or other open edged areas of the level during construction and testing. These faces functionally behave the same as `+sky` -- they must still form sealed connections with the open edges that they close and the sky renders through them. Seamsealer is collideable and deletes projectiles just like `+sky`.
| `+media` | Reserved special material that has many uses and can be used in conjunction with the special shader symbols to define its use and behavior. For example, it can be used with the `$` fog plane shader symbol to make `+media$`, which can be applied to faces to construct a fog plane used to define a volumetric [fog](~) region (assigned using [Sapien](~h2-sapien)).

# Material symbols
Material symbols are added to the **end** of the material name and give the surface certain attributes or behaviours in-engine.

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

# Material properties
Material symbols are added to the **start** or **end** of the material name and set some parameters for the lightmapper to use.

| Symbol | Usage
|--------|------
| `lm` | **Lightmap Resolution Scale**. Decreased lightmap sizes reduces the memory used and can speed up the lighting process. The effects of this can easily be seen when viewing a level that has been lit with H2Tool using the Checkerboard option for lighting).
| `lp` | **Lightmap Power Scale**. Scales the intensity of light given off by the marked surface.
| `hl` | **Lightmap Half-Life**.
| `ds` | **Lightmap Diffuse Scale**. Scales how much light the marked surface can reflect.

```
city metal_roof lm:2.5
city metal_roof lp:5
city metal_roof hl:1
city metal_roof ds:0.5
```

Let's break down the examples above one by one.

1. In the first example we are looking for a shader tag named metal_roof from the city collection. Any surfaces using this material would have their generated lightmap resolution multiplied by 2.5 making shadows much sharper
2. In the first example we are looking for a shader tag named metal_roof from the city collection. Any surfaces using this material that would have any emissive values multiplied by 5 making them much brighter 
3. In the first example we are looking for a shader tag named metal_roof from the city collection. Any surfaces using this material would do something.
4. In the first example we are looking for a shader tag named metal_roof from the city collection. Any surfaces using this material would cut reflected light by half.