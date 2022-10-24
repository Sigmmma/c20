---
title: scenario_structure_bsp
stub: true
noSearch: true
about: 'tag:h3/scenario_structure_bsp'
img: bsp.jpg
caption: 'The first BSP of 100_citadel, shown without a sky rendered.'
keywords:
  - bsp
  - h3
related:
  - /h3/tags/scenario_structure_lighting_info
  - /h3/tags/scenario_structure_lighting_resource
  - /h3/tags/scenario_structure_lightmap
---
The **BSP** tag contains geometry/structure data about a level and can be thought of as the "foundation" model without any dynamic objects or scenery decorations. Campaign missions tend to be comprised of multiple BSPs for each large section, while multiplayer maps use just one.

BSPs are modeled in 3D software like [Blender](~).

# Zone sets
Unlike Halo 1 and 2, Halo 3 can have multiple BSPs loaded at a time. Combinations of BSPs are called _zone sets_ and are set up in the [scenario](~) tag using [Guerilla](~h3-guerilla). Zone sets may be created for gameplay purposes, cinematics, or debugging. You can switch between BSPs and zone sets using {% key "Ctrl+B" /%} in [Sapien](~h3-sapien).

Related script [functions](~scripting#functions) and [globals](~scripting#external-globals):

{% dataTable
  dataPath="hsc/h3/functions/functions,hsc/h3/globals/external_globals"
  id="zone-sets-functions-globals"
  linkCol=true
  noClear=true
  linkSlugKey="slug"
  rowSortKey="slug"
  rowFilterKey="tags"
  rowFilterValue="zone_set"
  columns=[
    {name: "Function/global", key: "info/en"}
  ]
/%}

# Clusters
_Clusters_ are spaces in the BSP which are separated by portals. This is both done as an optimization and to assign localized effects in Sapien, where _cluster points_ are analogous to cluster properties from [H1 Sapien](~h1/tools/h1a-ek/h1a-sapien). Assignable properties are:

* Acoustics: A combination of [sound_environment](~) and [sound_looping](~).
* Weather
* Atmosphere
* CameraFX: Post-processing screen effects defined by [camera_fx_settings](~) with some cluster overrides.
