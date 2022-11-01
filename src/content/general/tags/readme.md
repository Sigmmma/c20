---
title: Tags
stub: true
---
The **tags** resource system a central and distinguishing feature of Halo's engine, dating back even to Myth. While the core mechanics are implemented in the game's code, nearly everything else is data-driven using tags. They are used across all Halo games and represent all assets and entities in the game world, such as textures, models, particle effects, AI behaviours, and weapons.

Halo's engine is itself a sort of sandbox providing the basis of a first-person shooter with systems like physics, AI, and scripting. Within this framework, tags are what allowed Bungie's artists (and now you) to create a huge variety of assets, objects, effects, and experiences without having to code.

Tags are packaged into distributable _maps_.

# Creating and editing tags
Each games' mod tools ship with a set of stock tags needed to build the game's original maps, as well as a set of tools used to create and edit tags. Your workflows might include:

* Creating a new texture by compiling a TIFF to [bitmap tag](~/h1/tags/bitmap) format using [Tool](~h1a-tool).
* Changing the type of projectile a [weapon](~/h1/tags/object/item/weapon) fires by editing its tag in [Guerilla](~h1a-guerilla).
* Placing new AI encounters in a [scenario](~/h1/tags/scenario) using [Sapien](~h1a-sapien).

# Tag groups
Tags come in many different types (called tag _classes_ or _groups_), each with a predefined structure and data fields, and they may depend on other tags by [reference](#tag-references-and-paths). The set of tag groups is different in each game, and tags are not transferrable between games because their structure has changed.

# Tags vs. maps
A _map cache file_ is basically just a way to package the tags needed for a level into a file that can be efficiently loaded by the release build of the game. Tags are still the core resources. Some builds of Halo's engine, such as the [Standalone](~h1a-standalone-build) and [Sapien](~h1a-sapien) tools, directly load _loose tags_ files from the mod tools `tags` folder rather than map files. This is slower but allows for quicker iteration during development of mods.

Modders should consider _tags_ to be an output of their modding efforts, not just maps. The games and their stock tags still receive updates so it may be necessary to generate new versions of your mod's map files, and this is easy to do if you maintain your tags. 343 industries avoids breaking backwards compatibility with tags, but changes to the map format may be necessary to improve the engine or add new capabilities.