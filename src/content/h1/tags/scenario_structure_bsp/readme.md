Commonly referred to as the **BSP**, this tag contains level geometry, weather data, material assignments, AI pathfinding information, [lightmaps][], and other data structures. The name "BSP" is commonly used to refer to non-[object][] level geometry in general. Aside from sounds and [bitmaps][bitmap], the BSP tends to be one of the largest tags in a map.

BSP stands for [Binary Space Partitioning][about-bsp], a technique where space within a sealed static mesh is recursively subdivided by planes into [convex][] _leaf nodes_. The resulting _BSP tree_ can be used to efficiently answer geometric queries, such as which surfaces should be collision-tested for physics objects.

# Compilation
After level geometry is exported to [JMS][] format, it can be compiled into a BSP tag using [Tool's structure verb][tool#structure-compilation].

# BSP transitions
While a [scenario][] can reference multiple BSPs, Halo can only have [a single BSP loaded][map#map-loading] at a time. Transitions between BSPs can be scripted (`switch_bsp`), e.g. using trigger volumes. Objects in unloaded BSPs are not simulated.

Although multiple BSPs are intended for singleplayer maps and do not [synchronize][netcode], some custom multiplayer maps have used nearly identical BSPs which only differ in lighting to add a day/night switch [scripted by a button][ui_widget_definition#tag-field-event-handlers-script] in the escape menu.

# Shaders
The most commonly used [shader][] type for BSPs is [shader_environment][], suitable for most opaque surfaces and alpha-tested grates or billboard trees (as in _Timberland_). This shader type supports the blending between multiple detail maps, often used for ground maps with dirt and grass areas.

Transparent shaders can also be used, for example:

* [shader_transparent_chicago][] for flowing rivers or waterfalls
* [shader_transparent_chicago_extended][] for waterfalls
* [shader_transparent_water][] for lakes and oceans

The [shader_model][] type will not be rendered by the game since it is intended for use with [object models][gbxmodel].

# Clusters and cluster data
Clusters are sealed volumes of a BSP separated by portal planes. They are used both as a rendering optimization and artistically; map authors can assign [weather_particle_system][], [wind][], [sound_environment][], and [sound_looping][] tags to define local atmospheric and ambience qualities for each section of the map. Different clusters can also reference [different skies][blender-level-creation-additional-info#multiple-skies].

Note that it may still be desirable to reference weather for indoor clusters if there are outdoor areas visible from them, otherwise snow and rain particles will abruptly disappear. To mask weather in such clusters, use [weather polyhedra](#weather-polyhedra).

# Fog planes
Areas of a map which need a fog layer can be marked using _fog planes_. These are 2D surfaces which reference [fog tags][fog], not to be confused with atmospheric fog which is part of the [sky tag][sky].

# Weather polyhedra

<figure>
  <a href="weather-polys-aotcr.png">
    <img src="weather-polys-aotcr.png" alt="Weather polys from AotCR"/>
  </a>
  <figcaption>
    <p>Weather polys extracted from AotCR.</p>
  </figcaption>
</figure>

Weather polyhedra are simple convex volumes where weather particles will not render. They can be used to mask rain or snow from under overhangs, doorways, and indoor spaces when the cluster has weather.

When a JMS is compiled to BSP by [tool], connected convex faces with the material name `+weatherpoly` will generate _weather polyhedra_. Within the tag, the polyhedra are represented as a center point, bounding radius, and up to 16 planes which enclose a volume.

The game can only support a maximum of 8 visible weather polyhedra. Beyond this point, some polyhedra will be ignored and [Sapien][] will print warnings.

# Lightmaps
_Lightmaps_ are the visual representation of the BSP, and are stored in a separate representation from its collision data. The lightmaps data includes the renderable triangles and a precalculated radiosity bitmap.

_See main page: [Lightmaps][]._

# Lens flare markers

<figure>
  <a href="lens-flare-markers.jpg">
    <img src="lens-flare-markers.jpg" alt="Lens flare markers in a10"/>
  </a>
  <figcaption>
    <p>In a10, lens flare markers were generated for fluorescent lights</p>
  </figcaption>
</figure>

When a [shader_environment][] references a [lens_flare][], _lens flare markers_ are automatically created and stored in the BSP tag during initial [structure compilation][tool#structure-compilation] or updated with [structure-lens-flares][tool#structure-lens-flares]. These are used to give lights a "glowy" appearance. If the shader has a _lens flare spacing_ of `0`, a single lens flare is placed on the surface<sup>(how?)</sup>. Otherwise, the lens flares are evenly spaced within the surface according to the spacing value (world units).

A BSP can contain up to 65535 lens flare markers, and up to 256 types of lens flares. However, there is a much lower limit to how many the game will draw at a given time, exactly how many is unknown.

# Collision artifacts
## Phantom BSP

<figure>
  <a href="phantom.jpg">
    <img src="phantom.jpg" alt=""/>
  </a>
  <figcaption>
    <p>Danger Canyon contains at least two prevalent cases of phantom BSP. The Warthog and bullets are both colliding with invisible extensions of nearby surfaces.</p>
  </figcaption>
</figure>

Phantom BSP is a collision artifact sometimes produced when compiling BSPs. It manifests itself as invisible surfaces which projectiles and vehicles collide with (but not players), and mostly appears around sharp corners near cases of "nearly coplanar faces" warnings in your [WRL file][wrl].

Bungie was aware of this artifact and implemented a feature to help spot it (`collision_debug_phantom_bsp 1` in [Sapien][h1a-sapien] or [standalone][h1a-standalone-build]). If you find phantom BSP in your map, there are a few steps you can take to resolve it:

1. Preemptively, keep your geometry simple and robust without an abundance of dense, complex, or spiky shapes. Flat surfaces like floors and walls should be kept as flat as possible by using alignment tools when modeling rather than "eyeballing it".
2. Fix any "nearly coplanar" warnings in your source model by scaling affected faces to 0 along their normal axis or using alignment. Since Tool slightly rounds vertex coordinates when compiling BSPs, sometimes this warning cannot be resolved for surfaces which are not axis-aligned.
2. There is an element of chance to phantom BSP appearing which depends on how your geometry is recursively subdivided form a BSP tree. Modifying unrelated parts of your level like adding portals or moving vertices can sometimes affect how the level is subdivided and make phantom BSP disappear.
3. Using [phantom_tool][] or H1A Tool's [fix-phantom-bsp option][h1a-tool#phantom-bsp-fix] to compile your BSP will prevent phantom BSP at the cost of slightly increasing the tag size.
4. If you do not have access to source JMS, and are trying to fix a BSP tag, the tool [Ghostbuster][] may fix it but has known issues.

On a technical level, cases of phantom BSP are [dividing planes](#tag-field-collision-bsp-bsp3d-nodes-plane) where a child index is `-1`, but the space on that side of the plane is not actually _completely_ outside the level. The artifact is bounded by all parent dividing planes.

## BSP holes

<figure>
  <a href="hole.mp4">
    <video controls>
      <source src="hole.mp4" type="video/mp4">
    </video>
  </a>
  <figcaption>
    <p>This location in Derelict has a small collision hole where items can fall through the map.</p>
  </figcaption>
</figure>

BSP holes or leaks are another type of collision artifact where items or players can fall through the map. It is not known what causes this, but it can be resolved by altering triangulation around the affected area (rotating edges). Compiling the BSP with [phantom_tool][] or H1A Tool's [fix-phantom-bsp option][h1a-tool#phantom-bsp-fix]  also prevents this.

# Pathfinding data
The BSP contains data on traversable surfaces which aid AI in pathfinding (walking to a destination). This data is generated automatically during BSP compilation and is retained even in when the BSP is compiled into multiplayer maps.

_See more about the [pathfinding system][ai#pathfinding]._

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
rowTagFilter: scenario_structure_bsp
columns:
  - key: info/en
    name: Function/global
    format: text
```

[about-bsp]: https://en.wikipedia.org/wiki/Binary_space_partitioning
[convex]: https://en.wikipedia.org/wiki/Convex_set
