---
title: scenario_structure_bsp
about: 'tag:h3/scenario_structure_bsp'
img: bsp.jpg
caption: 'The first BSP of 100_citadel, shown without a sky rendered.'
keywords:
  - bsp
  - h3
  - structure
thanks:
  FaberTheCatgirl: Adding Limits to Wiki.
  R93_Sniper: Posting Limits to Discord.
---
The **BSP** tag contains geometry/structure data about a level and can be thought of as the "foundation" model without any dynamic objects or scenery decorations. Campaign missions tend to be comprised of multiple BSPs for each large section, while multiplayer maps use just one.

BSPs are modeled in 3D software like [Blender](~).

## Related tags
* [scenario_structure_lighting_info](~)
* [scenario_structure_lighting_resource](~)
* [scenario_structure_lightmap](~)

# Zone sets
Unlike Halo 1 and 2, Halo 3 can have multiple BSPs loaded at a time. Combinations of BSPs are called _zone sets_ and are set up in the [scenario](~) tag using [Guerilla](~h3-guerilla). Zone sets may be created for gameplay purposes, cinematics, or debugging. You can switch between BSPs and zone sets using {% key "Ctrl+B" /%} in [Sapien](~h3-sapien).

Related script [functions](~scripting#functions) and [globals](~scripting#external-globals):

{% relatedHsc game="h3" tagFilter="zone_set" /%}

# Clusters
_Clusters_ are spaces in the BSP which are separated by portals. This is both done as an optimization and to assign localized effects in Sapien, where _cluster points_ are analogous to cluster properties from [H1 Sapien](~h1-sapien). Assignable properties are:

* Acoustics: A combination of [sound_environment](~) and [sound_looping](~).
* Weather
* Atmosphere
* CameraFX: Post-processing screen effects defined by [camera_fx_settings](~) with some cluster overrides.

# Limits
|BSP limit|Amount|
|-----|------------|
|Maximum Collision Materials Per Structure|512|
|Maximum Structure Surfaces|32767|
|Maximum Structure Surfaces To Triangle Mappings|262136|
|Maximum Surface References per Structure|262144|
|Maximum Lightmap Groups per Structure|128|
|Maximum Indices per Lightmap Group|20000|
|Maximum Lightmaps per Structure|128|
|Maximum Materials per Structure Lightmap|2048|
|Maximum Surfaces per Structure Material|20000|
|Maximum Vertices per Structure Material|64000|
|Maximum Cluster Portals per Cluster|512|
|Maximum Mirrors per Cluster|16|
|Maximum Subclusters per Cluster|32768|
|Maximum Surfaces per Subcluster|128|
|Maximum Surfaces per Cluster|32768|
|Maximum Vertices per Mirror|512|
|Maximum Temporary Clusters per Structure|8192|
|Maximum Clusters per Structure|256|
|Maximum Cluster Data Size|65536|
|Maximum Cluster Portals per Structure|512|
|Maximum Vertices per Cluster Portal|128|
|Maximum Fog Planes per Structure|127|
|Maximum Fog Zones per Structure|127|
|Maximum Weather Palette Entries per Structure|32|
|Maximum Atmosphere Palette Entries per Structure|32|
|Maximum Camera Fx Palette Entries per Structure|64|
|Maximum Weather Polyhedra per Structure|32|
|Maximum Planes per Weather Polyhedron|16|
|Maximum Cluster Sound Palette Entries per Structure|64|
|Maximum Markers per Structure|1024|
|Maximum Lens Flares per Structure|256|
|Maximum Lens Flare Markers per Structure|65536|
|Maximum Decals per Structure|6144|
|Maximum Environment Objects per Structure|16384|
|Maximum Environment Object Palette Entries per Structure|100|
|Maximum Strip Segments per Structure Cluster|16384|
|Maximum Strip Segment References per Structure Cluster|16384|
|Maximum Subcluster Boundaries per Structure Cluster|6144|
|Maximum Lightmap Fragments per Structure Cluster|255|
|Maximum Lightmap Bsp Leaves per Structure Cluster|4096|
|Maximum Lightmap Surfaces per Structure Cluster|4096|
|Maximum Fake Lightprobes per Structure Bsp|2048|

## Instance Geo Limits
|BSP limit|Amount|
|-----|------------|
|Maximum vertices per Instance|32767|
|Maximum indices per Instance|64000|
|Maximum Instance Geometry Definitions per Structure Bsp|1024|
|Maximum Instance Geometry Instances per Structure Bsp|4096|
|Maximum Instance Geometry Instances per Cluster|4096|
