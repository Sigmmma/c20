---
title: scenario_structure_bsp
about: 'tag:h1/scenario_structure_bsp'
img: bsp-debug.jpg
caption: >-
  Blood Gulch's BSP surfaces and clusters visualized in [Sapien](~) using
  `debug_structure 1` and `debug_pvs 1`
keywords:
  - lightmap
  - radiosity
  - cluster
  - plane
  - weather
  - polyhedra
  - bsp
thanks:
  MosesOfEgypt: Tag structure research
  Conscars: Collision BSP structure and phantom BSP research
  Galap: Researching the effect of cluster sky index on lighting
  Hari: Collision BSP compilation reversing
  Kavawuvi: Invader tag definitions
---
The **scenario structure BSP** tag, commonly just called the **BSP**, contains level geometry, weather data, material assignments, AI pathfinding information, [lightmaps](~), and other data structures. You can think of the BSP as the "stage" where the game takes place [objects](~object) are placed within it. Aside from sounds and [bitmaps](~bitmap), the BSP tends to be one of the largest tags in a map. Singleplayer [scenarios](~scenario) often use multiple BSPs which are switched between at loading zones.

The term "BSP" stands for [Binary Space Partitioning][about-bsp], a technique where space within a sealed static mesh is recursively subdivided by planes into [convex][] _leaf nodes_. The resulting _BSP tree_ can be used to efficiently answer geometric queries, such as which surfaces should be collision-tested for physics objects.

# Compilation
After level geometry is exported to [JMS](~) format, it can be compiled into a BSP tag using [Tool's structure verb](~tool#structure-compilation).

# BSP transitions
While a [scenario](~) can reference multiple BSPs, Halo can only have [a single BSP loaded](~map#map-loading) at a time. Transitions between BSPs can be scripted (`switch_bsp`), e.g. using trigger volumes. Objects in unloaded BSPs are not simulated.

Although multiple BSPs are intended for singleplayer maps and do not [synchronize](~netcode), some custom multiplayer maps have used nearly identical BSPs which only differ in lighting to add a day/night switch [scripted by a button](~ui_widget_definition#tag-field-event-handlers-script) in the escape menu.

# Shaders
The most commonly used [shader](~) type for BSPs is [shader_environment](~), suitable for most opaque surfaces and alpha-tested grates or billboard trees (as in _Timberland_). This shader type supports the blending between multiple detail maps, often used for ground maps with dirt and grass areas.

Transparent shaders can also be used, for example:

* [shader_transparent_chicago](~) for flowing rivers or waterfalls
* [shader_transparent_chicago_extended](~) for waterfalls
* [shader_transparent_water](~) for lakes and oceans

The [shader_model](~) type will not be rendered by the game since it is intended for use with [object models](~gbxmodel).

# Clusters and cluster data
Clusters are sealed volumes of a BSP separated by portal planes. They are used both as a rendering optimization and artistically; map authors can assign [weather_particle_system](~), [wind](~), [sound_environment](~), and [sound_looping](~) tags to define local atmospheric and ambience qualities for each section of the map. Different clusters can even reference [different skies](~blender-level-creation-additional-info#multiple-skies). The level will contain a single large cluster if no portals were created.

Note that it may still be desirable to reference weather for indoor clusters if there are outdoor areas visible from them, otherwise snow and rain particles will abruptly disappear. To mask weather in such clusters, use [weather polyhedra](#weather-polyhedra).

## Indoor vs. outdoor clusters
Clusters are either _outdoor/exterior_ or _indoor/interior_. When a cluster contains [+sky faces](~h1-materials) it is an outdoor cluster and has a [sky index](#tag-field-clusters-sky) of `0` or greater. Furthermore, any cluster from which an outdoor cluster is [potentially visible](#potentially-visible-set) will also be an outdoor cluster.

An indoor cluster is one where none of its potentially visible clusters are outdoor. These clusters have a sky index of `-1` instead and use the indoor parameters of sky index `0` (the first sky), which always has the special role of doubling as the "indoor sky". For example, indoor clusters will use use its [_indoor fog color_](~sky#tag-field-indoor-fog-color) rather than its [_outdoor fog color_](~sky#tag-field-outdoor-fog-color).

When the game transitions between indoor and outdoor clusters the fog colour fades based on cumulative camera movement, not time. This effect can be seen easily in Danger Canyon: load it in [Sapien](~h1a-sapien) and fly the camera through the hallways while `debug_pvs 1` and `rasterizer_wireframe 1` are enabled.

# Potentially visible set
The _potentially visible set_ data (PVS) is precomputed when a BSP is compiled and helps the engine determine which [clusters](#clusters-and-cluster-data) are visible from each other. A cluster can "see" any other cluster behind portals visible from itself plus one level of clusters further. Any clusters beyond that will not be rendered.

Tool also takes into account the indoor sky's [_indoor fog opaque distance_](~sky#tag-field-outdoor-fog-opaque-distance) and [_indoor fog maximum density_](~sky#tag-field-indoor-fog-maximum-density) when computing the PVS. If the density is `1.0` (fully opaque) then Tool knows that indoor clusters cannot see beyond the opaque distance even if there are clusters within a line of sight. Tool logs the indoor maximum world units when the BSP is compiled (if there a sky referenced).

# Fog planes
Areas of a map which need a fog layer can be marked using _fog planes_. These are 2D surfaces which reference [fog tags](~fog), not to be confused with atmospheric fog which is part of the [sky tag](~sky). It is invalid for a cluster to be able to see multiple fog planes ([see more](~bsp-troubleshooting#warning-two-fog-planes-visible-from-a-cluster)).

# Weather polyhedra

{% figure src="weather-polys-aotcr.png" %}
Weather polys extracted from AotCR.
{% /figure %}

Weather polyhedra are simple convex volumes where weather particles will not render. They can be used to mask rain or snow from under overhangs, doorways, and indoor spaces when the cluster has weather.

When a JMS is compiled to BSP by [tool], connected convex faces with the material name `+weatherpoly` will generate _weather polyhedra_. Within the tag, the polyhedra are represented as a center point, bounding radius, and up to 16 planes which enclose a volume.

The game can only support a maximum of 8 visible weather polyhedra. Beyond this point, some polyhedra will be ignored and [Sapien](~) will print warnings.

# Lightmaps
_Lightmaps_ are the visual representation of the BSP, and are stored in a separate representation from its collision data. The lightmaps data includes the renderable triangles and a precalculated radiosity bitmap.

_See main page: [Lightmaps](~)._

# Lens flare markers

{% figure src="lens-flare-markers.jpg" %}
In a10, lens flare markers were generated for fluorescent lights
{% /figure %}

When a [shader_environment](~) references a [lens_flare](~), _lens flare markers_ are automatically created and stored in the BSP tag during initial [structure compilation](~tool#structure-compilation) or updated with [structure-lens-flares](~tool#structure-lens-flares). These are used to give lights a "glowy" appearance. If the shader has a _lens flare spacing_ of `0`, a single lens flare is placed on the surface<sup>(how?)</sup>. Otherwise, the lens flares are evenly spaced within the surface according to the spacing value (world units).

A BSP can contain up to 65535 lens flare markers, and up to 256 types of lens flares. However, there is a much lower limit to how many the game will draw at a given time, exactly how many is unknown.

# Collision artifacts
## Phantom BSP

{% figure src="phantom.jpg" %}
Danger Canyon contains at least two prevalent cases of phantom BSP. The Warthog and bullets are both colliding with invisible extensions of nearby surfaces.
{% /figure %}

Phantom BSP is a collision artifact sometimes produced when compiling BSPs. It manifests itself as invisible surfaces which projectiles and vehicles collide with (but not players), and mostly appears around sharp corners near cases of "nearly coplanar faces" warnings in your [WRL file](~wrl).

Bungie was aware of this artifact and implemented a feature to help spot it (`collision_debug_phantom_bsp 1` in [Sapien](~h1a-sapien) or [standalone](~h1a-standalone-build)). If you find phantom BSP in your map, there are a few steps you can take to resolve it:

1. Preemptively, keep your geometry simple and robust without an abundance of dense, complex, or spiky shapes. Flat surfaces like floors and walls should be kept as flat as possible by using alignment tools when modeling rather than "eyeballing it".
2. Fix any "nearly coplanar" warnings in your source model by scaling affected faces to 0 along their normal axis or using alignment. Since Tool slightly rounds vertex coordinates when compiling BSPs, sometimes this warning cannot be resolved for surfaces which are not axis-aligned.
2. There is an element of chance to phantom BSP appearing which depends on how your geometry is recursively subdivided form a BSP tree. Modifying unrelated parts of your level like adding portals or moving vertices can sometimes affect how the level is subdivided and make phantom BSP disappear.
3. Using [phantom_tool](~) or H1A Tool's [fix-phantom-bsp option](~h1a-tool#phantom-bsp-fix) to compile your BSP will prevent phantom BSP at the cost of slightly increasing the tag size.
4. If you do not have access to source JMS, and are trying to fix a BSP tag, the tool [Ghostbuster](~) may fix it but has known issues.

On a technical level, cases of phantom BSP are [dividing planes](#tag-field-collision-bsp-bsp3d-nodes-plane) where a child index is `-1`, but the space on that side of the plane is not actually _completely_ outside the level. The artifact is bounded by all parent dividing planes.

## BSP holes

{% figure src="hole.mp4" %}
This location in Derelict has a small collision hole where items can fall through the map.
{% /figure %}

BSP holes or leaks are another type of collision artifact where items or players can fall through the map. It is not known what causes this, but it can be resolved by altering triangulation around the affected area (rotating edges). Compiling the BSP with [phantom_tool](~) or H1A Tool's [fix-phantom-bsp option](~h1a-tool#phantom-bsp-fix)  also prevents this.

# Pathfinding data
The BSP contains data on traversable surfaces which aid AI in pathfinding (walking to a destination). This data is generated automatically during BSP compilation and is retained even in when the BSP is compiled into multiplayer maps.

_See more about the [pathfinding system](~ai#pathfinding)._

# Related script functions and globals
The following are related [functions](~scripting#functions) that you can use in your scenario scripts and/or [debug globals](~scripting#external-globals) that you can enter into the developer console for troubleshooting.

{% relatedHsc game="h1" tagFilter="scenario_structure_bsp" /%}

[about-bsp]: https://en.wikipedia.org/wiki/Binary_space_partitioning
[convex]: https://en.wikipedia.org/wiki/Convex_set

# Structure and fields

{% tagStruct "h1/scenario_structure_bsp" /%}
