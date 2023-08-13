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
redirects:
  - /h1/engine/build-types
  - /general/engine/build-types
  - /general/engine
---
The **Halo Engine**, also called **Blam!**, is Bungie's in-house proprietary engine used in all of the Halo games. Each generation added new capabilities and had systems overhauled, but one of its defining characteristics is the [tags system](~tags) used for managing resources. It is written in a combination of C and C++ (about 1.5M LoC for Halo 2).

There are two main groups of engine generations where the asset pipelines and features tend to be more similar to each other:

* Halo 1, Halo 2, and Halo 3/ODST;
* Halo Reach, Halo 2 Anniversary MP, and Halo 4.

# Build types
Halo's developers can create builds of the tools and games with with different features and checks enabled or disabled. This isn't something that can be done by the end user but it's worth knowing what features are enabled or disabled on the build you are using.

Firstly, the engine can load [tags](~) in one of two ways:

* **Tag:** Resources are loaded from individual files stored on disk that can be edited using the mod tools. The data is validated on load and an error is shown on failure.
* **Cache:** Resources are loaded from cache files (also called "maps" because of their extension), these can't be easily edited and only go through minimal validation.

Additionally, multiple levels of optimization are available depending on what features are needed. In decreasing order of optimization:

1. **release**: Used for the MCC itself and has minimal checks, no error logging and maximum optimizations. Invalid data will either be ignored or crash the engine.
2. **profile**: More or less the same as `release` but with some extra debug code.
3. **play**: Includes error logging and most [assertions](https://en.wikipedia.org/wiki/Assertion_(software_development)). Optimizations are still enabled for this build type. Invalid data will usually result in an error or a fatal error. It is not recommended to use _sapien_play_ builds for editing scenarios with AI (non-MP), as it excludes some AI tools and editor functionality.
4. **test**: Includes more error checking and has optimizations disabled. AI debugging code is included at this level in H1A (used to only be included in debug builds).
5. **debug**: Includes full error checking and isn't optimized, this is used internally for development.

Legacy Halo 1 used different levels but the same general concepts apply.

The naming convention for builds is `<cache/tag>_<build_configuration>`, for example `halo_tag_test.exe`.

# Architecture
Halo's engine was built to support the kind of features needed for its singleplayer and multiplayer sandbox shooter gameplay. There are only certain types of objects and effects that can exist in the world which are inherent to the engine, and it's not possible to create new ones or extend the game's systems.

However, you can create anything within the possibilities of custom [_tags_](~), which allow for a surprising amount of variety. Tags describe all the kinds of assets and behaviours you want to appear in the game. When a level is loaded, all of its tags are loaded into memory and used to create the initial game world and control how it changes over time.

The properties of the game world and its objects are stored in the _game state_. This is a collection of data that contains everything needed to represent the world at a given time, such as the position of objects, health of bipeds, and the execution state of script threads. It's what gets saved and loaded at checkpoints.

The game state is updated in fixed time steps called _ticks_. This process is deterministic, meaning given any initial game state, advancing it by some number of ticks will always produce the same result. Objects will move the same way and AI will make the same decisions (essential for co-op networking). The settings in your tags will affect how updates happen. For example, if a [projectile](~h1/tags/object/projectile) is found to collide with a player then the damage applied will depend on the fields in its referenced [damage_effect](~h1/tags/damage_effect) tag.

Finally, the audio are visuals of the game are rendered based on tag assets too.

The Halo resource system is [quite flexible](http://nikon.bungie.org/misc/gdc2005_mnoguchi/) as it's capable of introspection and abstracted away from the code that uses the data, allowing for the dynamically generated UIs used in [Guerilla](~h1a-guerilla). Tools like Sapien are built on the same code the game uses, allowing for player simulation and AI to act out encounters.

# More information
For details on each generation see pages dedicated to them:
- [H1 Engine](~h1/engine)
- [H2 Engine](~h2/engine)
- [H3 Engine](~h3/engine)

# History
The engine's history began in Bungie's [_Pathways into Darkness_][pid], according to developer Chris Butcher:

> The \[Halo\] engine is a direct-line descendant of the 1992 Pathways into Darkness engine originally written by Bungie for 68000 Macs using MPW and C. Not much remains except math functions and overall architecture, but the engine definitely has old roots. The path of descent runs through PiD to Marathon to Myth to Halo. In recent years it has shifted away from being primarily a player-driven renderer to being primarily a world simulation.

Something closer to Halo would later evolve from [_Myth_][myth]. In a [Jason Jones interview][jones-interview], he says:

> Halo didn't begin as a strategy game but the engine it uses started out that way. The engine Halo uses began as a next-generation Myth terrain engine, with polygonal units.

[jones-interview]: https://web.archive.org/web/20000815110240/http://www.insidemacgames.com/features/99/jones/jones.shtml
[myth]: https://en.wikipedia.org/wiki/Myth_(series)
[pid]: https://en.wikipedia.org/wiki/Pathways_into_Darkness