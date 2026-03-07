---
title: Blam! engine
keywords:
  - blam
  - build
  - debug
  - release
  - assert
  - assertion
  - play
  - cache
  - tags
  - test
  - profile
  - beta
  - ship
---
The **Halo Engine**, also called **Blam!**, is Bungie's in-house proprietary engine used in all of the Halo games. Each generation added new capabilities and had systems overhauled, but one of its defining characteristics is the [tags system](~intro#tags) used for managing resources. It is written in a combination of C and C++ (about 1.5M LoC for Halo 2).

There are two main groups of engine generations where the asset pipelines and features tend to be more similar to each other:

* Halo 1, Halo 2, and Halo 3/ODST;
* Halo Reach, Halo 2 Anniversary MP, and Halo 4.

# Build types
Halo's developers can create builds of the tools and games with with different features and checks enabled or disabled. This isn't something that can be done by the end user but it's worth knowing what features are enabled or disabled on the build you are using.

Firstly, the engine can load [tags](~intro#tags) in one of two ways:

* **Tag:** Resources are loaded from individual files stored on disk that can be edited using the mod tools. The data is validated on load and an error is shown on failure.
* **Cache:** Resources are loaded from cache files (also called "maps" because of their extension), these can't be easily edited and only go through minimal validation.

Additionally, multiple levels of optimization are available depending on what features are needed. In decreasing order of optimization:

1. **release**: Used for the MCC itself and has minimal checks, no error logging and maximum optimizations. Invalid data will either be ignored or crash the engine.
2. **profile**: More or less the same as `release` but with some extra debug code.
3. **play**: Includes error logging and most [assertions](~help#how-to-read-exception-messages). Optimizations are still enabled for this build type. Invalid data will usually result in an error or a fatal error. It is not recommended to use _sapien_play_ builds for editing scenarios with AI (non-MP), as it excludes some AI tools and editor functionality.
4. **test**: Includes more error checking and has optimizations disabled. AI debugging code is included at this level in H1A (used to only be included in debug builds).
5. **debug**: Includes full error checking and isn't optimized, this is used internally for development.

Legacy Halo 1 used different levels but the same general concepts apply.

The naming convention for builds is `<cache/tag>_<build_configuration>`, for example `halo_tag_test.exe`.

# Architecture
Halo's engine was built to support the kind of features needed for its singleplayer and multiplayer sandbox shooter gameplay. There are only certain types of objects and effects that can exist in the world which are inherent to the engine, and it's not possible to create new ones or extend the game's systems.

However, you can create anything within the possibilities of custom [_tags_](~intro#tags), which allow for a surprising amount of variety. Tags are the game's resource system and contain the properties for each unique type of object, asset, effect, and more. When a level is loaded, all of its tags are loaded into memory.

The properties of the game world and its objects are stored in the _game state_. This is a collection of data that contains everything needed to represent the world at a given time, such as the position of objects, health of bipeds, and the execution state of script threads. It's what gets saved and loaded at checkpoints.

The game state is updated in fixed time steps called _ticks_. This process is deterministic, meaning given any initial game state, advancing it by some number of ticks and replaying player inputs will always produce the same result in the world simulation, important for co-op (synchronous) networking and theater mode. The changes made during ticks are called _updates_ and include physics simulation, handling player input, driving effects, and more. The data in your tags will affect how these updates happen.

Finally, the audio and visuals of the game are rendered based on tag assets too.

The Halo resource system is [quite flexible](http://nikon.bungie.org/misc/gdc2005_mnoguchi/) as it's capable of introspection and abstracted away from the code that uses the data, allowing for the dynamically generated UIs used in [Guerilla](~h1-guerilla). Tools like Sapien are built on the same code the game uses, allowing for player simulation and AI to act out encounters.

## Tag loading
The tag files in your `tags` folder (also called _loose tags_) are not used by the game as-is. The game instead uses _processed_ versions of these tags, e.g. by precalculating additional fields or replacing tag references with more efficient indices or pointers. The goal is to convert a tag intended for editing into a tag efficiently used by the engine.

This processing step will happen in one of two ways depending on the [build type](#build-types) of the game or tool loading them:

* Development tools which need to simulate the game world, like Standalone and Sapien, load the loose tags from your `tags` folder. All the tag files needed for a level are individually loaded from disk and processed. This process is slower but allows for quicker iteration during development of mods.
* Release builds like MCC itself loads levels from _map cache files_ in the `maps` folder. These `.map` files are created using Tool as the final step in map development. The engine can quickly load the single map file into memory and have nearly all the level's data ready to use. Maps must be rebuilt with Tool if you want to make changes to the tags in them.

# More information
For details on each generation see pages dedicated to them:
- [H1 Engine](~h1/engine)
- [H2 Engine](~h2/engine)
- [H3 Engine](~h3/engine)

# History
The engine's history began in Bungie's [_Pathways into Darkness_][pid], according to developer Chris Butcher:

> The \[Halo\] engine is a direct-line descendant of the 1992 Pathways into Darkness engine originally written by Bungie for 68000 Macs using MPW and C. Not much remains except math functions and overall architecture, but the engine definitely has old roots. The path of descent runs through PiD to Marathon to Myth to Halo. In recent years it has shifted away from being primarily a player-driven renderer to being primarily a world simulation.

Something closer to Halo would later evolve from [_Myth_][myth], where an earlier _tags_ system already existed. In a [Jason Jones interview][jones-interview], he says:

> Halo didn't begin as a strategy game but the engine it uses started out that way. The engine Halo uses began as a next-generation Myth terrain engine, with polygonal units.

[jones-interview]: https://web.archive.org/web/20000815110240/http://www.insidemacgames.com/features/99/jones/jones.shtml
[myth]: https://en.wikipedia.org/wiki/Myth_(series)
[pid]: https://en.wikipedia.org/wiki/Pathways_into_Darkness