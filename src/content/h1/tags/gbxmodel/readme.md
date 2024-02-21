---
title: gbxmodel
about: 'tag:h1/gbxmodel'
img: warthog-nodes.jpg
caption: >-
  The gbxmodel tag stores not only mesh data, but also markers, animation nodes,
  shader references, and more.
keywords:
  - model
thanks:
  Fubih: Regions render order tip
  gbMichelle: Node limits and reversing hard-coded markers
  Kavawuvi: Invader tag definitions, filthy part index research
  MosesOfEgypt: Tag structure research
  Kolshgamer: Common marker name
  Galap: Base map UV scale research
---
The Gearbox model tag contains the marker points and render models for [objects](~object) such as [vehicles](~vehicle), [scenery](~), and [weapons](~weapon) among others. It is not collideable nor animated on its own, and objects may reference additional [model_collision_geometry](~) and [model_animations](~) tags. This tag supports LODs and permutations, and includes [shader_model](~) references.

Don't confuse this tag with the Xbox-only [model](~). Gearbox Software created this tag class for the PC port, and it is therefore used in all [derivatives](~h1) of that port, like Mac, Demo, and MCC. Unlike [model](~), this tag uses uncompressed vertices.

# Shaders
Each [part](#tag-field-geometries-parts) of a model can reference a different [shader](~), like the Warthog's windscreen using a [shader_transparent_glass](~) while its body uses a [shader_model](~). While a model can _technically_ reference any kind of shader, referencing a [shader_environment](~) is **not recommended** when targeting H1CE because it [renders incorrectly](~renderer#gearbox-regressions) in atmospheric fog.

# Nodes
Nodes can be thought of as the model's "skeleton" and can be animated to move parts of the model. Each vertex can be influenced by up to 2 nodes. H1A and H1CE 1.10 allow up to 63 model nodes. Older versions of H1CE and H1X allow 48.

# Markers
Markers are simple named points with orientation attached to a model. Since they are parented by nodes, they can be animated. Markers can be used for a variety of purposes, such as attaching objects together with scripts (e.g. Pelicans carrying Warthogs), attaching widgets like [antenna](~), or firing [projectiles](~projectile) from in the case of weapons.

This tag only contains the marker data but other tags usually determine how they are used. However, certain marker names have special behaviour in-engine:

* `head`:
  * Determines where AI look at when scripted to talk to another character.
  * Base location for the friendly indicator in multiplayer.
  * Used as a ray origin when testing if AI can see their enemy.
* `primary trigger`: Where a weapon's primary trigger projectiles and effects come from. See also the [_projectiles use weapon origin_ field](~weapon#tag-field-triggers-flags-projectiles-use-weapon-origin).
* `secondary trigger`: As above, for secondary triggers (second trigger slot).
* `body`
* `front`: Possibly used to used to see if you're facing a [device_control](~), if present.
* `ground point`: Determines the resting point for [items](~item).
* `left hand`: Used during the grenade throwing animation.
* `melee`: Where melee damage comes from here. If not present, the engine picks an unknown default location.
* `hover thrusters`:
  * When used on a vehicle with "alien scout" or "alien fighter" [vehicle physics type](~vehicle#tag-field-vehicle-type), spawns [an effect](~vehicle#tag-field-effect) when the vehicle is hovering close to the ground. This can be seen at a piloted Banshee's wingtips when sitting on the ground.
  * When the vehicle physics type is "human plane", creates a similar dust effect if the marker is pointed at nearby ground. Used for the Pelican's thrusters.
* `jet thrusters`: Can also be used for vehicles with "human plane" physics to create the Pelican's thruster dust effect.

Commonly used marker names without hard-coded behaviour include:

* `primary ejection`: Used to indicate where casings fly out when firing the primary trigger.

[Tool](~h1a-tool#model) only includes markers from the `superhigh` LOD.

# Regions
Regions are named sections of the model which can have multiple [permutations](#permutations). Region names are used by the engine to relate parts of the render model with the [collision model](~model_collision_geometry). For example, a Flood combat form losing an arm. Some regions have special behaviour in-engine:

* `head`: Sets headshot areas for [damage_effect](~).

Regions render in the order they are stored in the tag. When naming regions, consider that they will be sorted by name when compiled into the `.gbxmodel`. This can be important for [skyboxes](~skyboxes#regions) and objects with multiple layers of alpha-blended transparent shaders which aren't [z-culled][z-buf] and need a correct sorting order to be explicitly defined, assuming the object is viewed mostly from one direction.

# Permutations
A permutation is a variation of a [region](#regions) that can be randomly selected. They are often used to give [bipeds](~biped) visual variety. Some permutations have special behaviour in-engine:

* `~blur`: Switched to depending on [weapon rate of fire](~weapon#tag-field-triggers-blurred-rate-of-fire) and [vehicle speed](~vehicle#tag-field-blur-speed) to fake motion blur. Used for the Warthog tires and chaingun when spinning fast enough.
* `~damaged`: Switched to depending how much damage the object takes based on [Damage Threshold](~model_collision_geometry#tag-field-regions-damage-threshold)

Permutations can also be set via [script](~scripting#functions-object-set-permutation) or the [Desired Permutation](~scenario#tag-field-scenery-desired-permutation) field when placing objects in a Scenario.
In order to use the Desired Permutation field the model's permutations must be named in a specific way: `Permutation_name-###`

Randomly selected permutations are not [network synchronized](~netcode).

# Level of detail
{% figure src="lod.jpg" %}
Low quality LODs shown for the Chief biped and Warthog. Note the reduced geometric detail.
{% /figure %}

Models can contain multiple levels of detail (LODs), ranging from simplified meshes with reduced shader count to high detail meshes with numerous complex shaders. The game will select a LOD based on the on-screen diameter of the object's [bounding sphere](~object#tag-field-bounding-radius) in pixels and this tag's [LOD cutoffs](#tag-field-super-high-detail-cutoff). Objects which are very distant or small don't need a lot of geometric detail, so they can be rendered using low quality LODs to keep the framerate high in busy scenes.

Halo CE supports 5 LODs. From best to worst quality:

* super high
* high
* medium
* low
* super low

When rendering first person models, Halo always uses the lowest quality LOD instead of the highest. When creating FP arms or weapons create a separate FP model from your 3P model which only includes a single super high LOD.

LODs are created by using [a special naming convention](~h1a-tool#model) when compiling models with Tool.

[z-buf]: https://en.wikipedia.org/wiki/Z-buffering

# Related HaloScript

{% relatedHsc game="h1" tagFilter="gbxmodel" /%}

# Structure and fields

{% tagStruct "h1/gbxmodel" /%}
