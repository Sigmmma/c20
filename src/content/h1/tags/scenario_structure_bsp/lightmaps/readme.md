---
title: Lightmaps
about: 'resource:h1/lightmaps'
img: lightmaps_example.jpg
caption: |
  Timberland's BSP with just lightmap shading visible.
keywords:
  - lightmap
  - radiosity
  - bake
thanks:
  Conscars: Object lighting tests
---
**Lightmaps** are a combination of data storing the static "baked" lighting of a [BSP](~scenario_structure_bsp). Since the BSP does not move, and many shadow-casting objects like [scenery](~) have fixed locations, base [global illumination][global-illumination] can be precalculated. Dynamic objects will cast [shadow-mapped][shadow-mapping] shadows and be lit using lightmap data at runtime.

Lightmap data in the BSP is comprised of both:

* A reference to a generated [bitmap](~) containing diffuse lighting as texture sheets.
* Mesh data which stores local lighting information for dynamic objects, among other purposes.

# Creation
The HEK's built-in _[radiosity][]_ process can be run using [Tool](~h1-tool#lightmaps) or [Sapien](~h1-sapien#radiosity). It splits the BSP's render mesh into many fragments depending on [shader](~) parameters like _simple parameterization_ and _detail level_, and UV-maps them to texture sheets. A texture is rendered to apply levels of light to those surfaces.

If higher resolution or greater control of lighting is desired, [Aether](~) facilitates texture baking in standalone 3D software.

[Sky](~sky) lights, emissive [environment shaders](~shader), scenery with [lights](~light), and [light fixtures](~device_light_fixture) can all be used as light sources to illuminate the BSP. If you change any of these inputs, or move any scenery, you must re-run radiosity.

# Lighting for dynamic objects
All [objects](~object) usually receive their lighting from the environment using data in the BSP tag generated during radiosity. See object [shadows and lighting](~object#shadows-and-lighting).

Only moving objects like [units](~unit) cast real-time shadows; [scenery](~) cast shadows in the baked lightmap using the object's [collision model](~model_collision_geometry) rather than its [render model](~gbxmodel), likely because the collision model is stored using a BSP structure which is more efficient to perform lighting calculations with. Dynamic shadows will only be rendered if the ground point lightmap sample is bright enough or when default lighting applies.

# Related HaloScript
The following are related [functions](~scripting#functions) that you can use in your scenario scripts and/or [debug globals](~scripting#external-globals) that you can enter into the developer console for troubleshooting.

{% relatedHsc game="h1" tagFilter="lightmaps" /%}

[radiosity]: https://en.wikipedia.org/wiki/Radiosity_(computer_graphics)
[shadow-mapping]: https://en.wikipedia.org/wiki/Shadow_mapping
[global-illumination]: https://en.wikipedia.org/wiki/Global_illumination
