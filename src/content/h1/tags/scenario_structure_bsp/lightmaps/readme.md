**Lightmaps** are a combination of data storing the static "baked" lighting of a [BSP][scenario_structure_bsp]. Since the BSP does not move, and many shadow-casting objects like [scenery][] have fixed locations, base [global illumination][global-illumination] can be precalculated. Dynamic objects will cast [shadow-mapped][shadow-mapping] shadows and be lit using lightmap data at runtime.

Lightmap data in the BSP is comprised of both:

* A reference to a generated [bitmap][] containing diffuse lighting as texture sheets.
* Mesh data which stores local lighting information for dynamic objects, among other purposes.

# Creation
The HEK's built-in _[radiosity][]_ process can be run using [Tool][tool#lightmaps], [LM_Tool][], or [Sapien][sapien#radiosity]. It splits the BSP's render mesh into many fragments depending on [shader][] parameters like _simple parameterization_ and _detail level_, and UV-maps them to texture sheets. A texture is rendered to apply levels of light to those surfaces.

If higher resolution or greater control of lighting is desired, [Aether][] facilitates texture baking in standalone 3D software.

[Sky][sky] lights, emissive [environment shaders][shader], scenery with [lights][light], and [light fixtures][device_light_fixture] can all be used as light sources to illuminate the BSP. If you change any of these inputs, or move any scenery, you must re-run radiosity.

# Lighting for dynamic objects
All [objects][object] receive their lighting from the environment using data in the BSP, generated during radiosity. Similar to light probes in other engines, this data encodes the shadow direction and incoming light of locations throughout the BSP.

Only moving objects like [units][unit] cast real-time shadows; [scenery][] cast shadows in the baked lightmap using the object's [collision model][model_collision_geometry] rather than its [render model][gbxmodel], likely because the collision model is stored using a BSP structure which is more efficient to perform lighting calculations with.

# Related script functions and globals
The following are related [functions][scripting#functions] that you can use in your scenario scripts and/or [debug globals][developer-console#debug-globals] that you can enter into the developer console for troubleshooting.

```.table
id: functions-globals
dataPath:
  - hsc/h1/functions/functions
  - hsc/h1/globals/external_globals
linkCol: true
linkSlugKey: slug
rowSortKey: slug
rowTagFilter: lightmaps
columns:
  - key: info/en
    name: Function/global
    format: text
```

[radiosity]: https://en.wikipedia.org/wiki/Radiosity_(computer_graphics)
[shadow-mapping]: https://en.wikipedia.org/wiki/Shadow_mapping
[global-illumination]: https://en.wikipedia.org/wiki/Global_illumination
