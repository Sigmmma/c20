---
title: Tags
---
The **tags** resource system is a central and distinguishing feature of Halo's engine, dating back even to Myth. They represent all assets and entities in the game world, such as textures, models, particle effects, AI behaviours, and weapons. The core systems of a sandbox FPS are implemented in the game's code (like physics, AI, and rendering) but tags are what allowed Bungie's artists (and now you) to create a huge variety of assets, objects, effects, and experiences without having to code (aside from [scripts](~scripting)).

The creation and editing of tags are the core workflows of modding. Tags are packaged into distributable [maps](~).

# Creating and editing tags
Each games' mod tools come with a set of stock tags needed to build the game's original maps, plus tools used to create and edit tags. Here are some example workflows:

* Creating a new texture by compiling a TIFF to [bitmap tag](~/h1/tags/bitmap) format using [Tool](~h1a-tool).
* Changing the type of projectile a [weapon](~/h1/tags/object/item/weapon) fires by editing its tag in [Guerilla](~h1a-guerilla).
* Placing new objects in a [scenario](~/h1/tags/scenario) using [Sapien](~h1a-sapien).

# Tag groups
Tags come in many different types (called tag _groups_ or _classes_), each with a predefined structure and data fields. Each game introduces or removes tag groups compared to its predecessor, but there is a lot of overlap in tag groups and they tend to work similarly in each generation. Tags are usually incompatible across games because their layout changes, unless the tag's layout hasn't changed (e.g. many H3 and ODST tags).

You can see a full list of tag groups for [H1](~h1/tags#tags-list), [H2](~h2/tags#tag-list), [H3](~h3/tags#tag-list), and [Reach](~hr/tags#tag-list). Some commonly used ones are:

* [scenario](~h1/tags/scenario): A level's root tag, including all object placements, AI encounters, weather assignments, and more.
* [scenery](~h1/tags/object/scenery): For basic non-moving objects like boulders.
* [scenario_structure_bsp](~h1/tags/scenario_structure_bsp): Contains level geometry and lighting information.
* [biped](~h1/tags/object/unit/biped): Defines a playable or AI character, including its physics shape and movement.
* [weapon](~h1/tags/object/item/weapon): Sets weapon characteristics like charging time, ammo account, what projectile it fires.
* [bitmap](~h1/tags/bitmap): Contains textures in a format ready to use by the engine and your GPU.
* [effect](~h1/tags/effect): Defines the particles, sounds, lights, and decals that can appear from effects like impacts or detonations.

An individual tag belonging to one of these tag groups, e.g. `warthog.vehicle`, is called a _tag instance_ or _definition_ since it defines one case of that tag class.

# Tag paths and references
A _tag path_ is like a URL for a tag; it corresponds to where you find a tag under the `tags` folder. For example, a [scenario](~h1/tags/scenario) tag file at `tags\levels\test\bloodgulch\bloodgulch.scenario` would have the tag path `levels\test\bloodgulch\bloodgulch` (the file extension is not part of the tag path).

Many tag groups can _reference_ other tags to take advantage of common assets, like different [effects](~h1/tags/effect) referencing the same [particle](~h1/tags/particle). These references can be set when editing tags in Guerilla or Sapien and are stored using tag paths. Don't forget to update references to a tag if you need to move or rename it. Broken references will prevent your level from loading or building!

# Tag loading
The tag files in your `tags` folder (also called _loose tags_) are not used by the game as-is. The game instead uses _processed_ versions of these tags, e.g. by precalculating additional fields or replacing tag references with more efficient indices or pointers. The goal is to convert a tag intended for editing into a tag efficiently used by the engine.

This processing step will happen in one of two ways depending on the [build type](~blam#build-types) of the game or tool loading them:

* Development tools which need to simulate the game world, like Standalone and Sapien, load the loose tags from your `tags` folder. All the tag files needed for a level are individually loaded from disk and processed. This process is slower but allows for quicker iteration during development of mods.
* Release builds like MCC itself loads levels from _map cache files_ in the `maps` folder. These `.map` files are created using Tool as the final step in map development and include [_almost_](~maps#shared-maps) all the tags needed for a level in an already-processed state. The engine can quickly load the single map file into memory and have all tags ready to use. Maps must be rebuilt with Tool if you want to make changes to the tags in them.
