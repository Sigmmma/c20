---
title: Map cache file
workflowName: map
img: map-icon.jpg
thanks:
  - to: Masterz1337
    for: Context on OpenSauce capabilities
  - to: Jakey
    for: Tag data limit info
  - to: gbMichelle
    for: How maps are loaded into memory
---

A **map**, also known as a **cache file**, is a bundle of compiled [tags][] which can be loaded and used by [Halo][h1]. With the exception of _resource maps_, each map represents a playable campaign, multiplayer level, or main menu.

Tags within a map file are not exactly the same as they exist in your source `tags` directory. When tags are compiled into a map, data is prepared for how it will be used at runtime. [Tag path references][tags#tag-references-and-paths] are replaced with pre-calculated pointers, [child scenarios][scenario#child-scenarios] are merged, extra fields are calculated, and the metadata for [bitmaps][bitmap] and [sounds][sound] is separated from their raw data.

Maps are found in Halo's `maps` directory. Maps in subdirectories are not loaded by the game. Mods like [Chimera][] and HAC2 store [downloaded](map-sharing#halonet) maps in a separate location and force the game to load them regardless.

# Map loading
Within a map, tag _metadata_ (most of the fields seen in tag editors) is stored separately from _raw data_ (sounds and bitmaps). [BSP data][scenario_structure_bsp] for all BSPs is also stored in its own location. The game is able to find these locations using special headers and indexes in the map file.

Each section is loaded in a different way:

* Tag metadata is copied directly into memory at a fixed address. On Xbox, PC, and Custom Edition, the game has just 23 MiB of tag space available for the currently loaded map. Tag metadata is loaded into the _start_ of this region. Because this data has been preprocessed by Tool, it requires no further processing and thus is very fast to load.
* The active BSP is loaded into the _end_ of the 23 MiB tag space. When a BSP switch occurs, the new BSP data is read from the map file and replaces the previous data in-memory.
* Raw data is streamed from the map file as needed and dynamically allocated in a loaded resource pool/cache. The texture cache is cleared during maps loads and BSP switches. Some tags like [BSPs][scenario_structure_bsp] and [scenarios][scenario] contain a "predicted resources" block which hints to the game which data should be loaded into these caches.

Tags from resource maps are also loaded into the tag space as needed.

# Limits
Because the game has a 23 MiB tag space limit (raised to 31 MiB in MCC), [Tool][] will enforce this limit when compiling a map. Keep an eye on its console output:

```
total tag size is 8.43M (14.57M free)
```

Total tag size is comprised of all non-raw tag data (ie. no bitmap or sound raw data) plus the _largest_ [BSP][scenario_structure_bsp] size, since the BSP is loaded within the 23 MiB space and there will only be a single BSP loaded at a time.

Care should be taken not to get too close to the tag limit, because even though you may compile a map with a certain set of resource maps (e.g. the English version of the game), Halo players with different languages may actually have _larger_ resource map tag data which now exceeds the limit and prevents your map from loading.

# Map types
With the exception of resource maps, the type of a map is determined by the type field in the compiled [scenario][] tag.

## Multiplayer
The most common type of map, these were compiled with a scenario type of "multiplayer". Multiplayer maps can be loaded through the ingame menu or with the command `sv_map`. Loading a multiplayer map using `map_name` will trap the player in the level without the ability to use the menu.

## Singleplayer
Singleplayer/campaign maps can be compiled by setting the scenario's type to "singleplayer". Besides via a modded `ui.map`, campaign maps can then be loaded with `map_name`. This map type is also used by modders creating scripted firefight maps. When [Tool][] compiles this map type, it strips multiplayer information from [globals][] and applies some balancing [tag patches][tool#hardcoded-tag-patches].

## UI
The special `ui.map` contains resources for the game's main menu, including [bitmaps][bitmap] for its UI elements like the server browser and the Halo ring background. The [HEK][] supports the creation of custom UI maps. When Tool compiles a UI map, it strips multiplayer info and fall damage blocks from [globals][].

Custom UI maps which intend to add a campaign menu to Custom Edition must include a dummy first menu item since the game is hardcoded to remove it.

## Resource maps
The maps `bitmaps.map`, `sounds.map`, and `loc.map` are special _resource maps_, and contain commonly referenced tags which do not need to be duplicated within each playable map referencing them. Instead, these shared tags are excluded by [tool][] at map compilation time (seen as "cache hits" in its output). Compiling custom resource maps from tags<sup>how?</sup> can be an effective way to reduce the net filesize of a campaign overhaul mod.

# Custom map formats
Some custom map formats have been developed for use by a modified game client:

## Open Sauce .yelo maps
Maps with the extension `.yelo` are compiled with [OS_Tool][opensauce#os-tool] and can only be played using a game client running the [OpenSauce][] mod, which extends Halo's engine with new tag types, higher limits, and extra renderer features. These maps are typically [custom campaign missions][os-maps] specifically designed to take advantage of these extensions. [Refinery][] supports extracting OpenSauce tags from these maps.

## Invader/Chimera compressed maps
Maps [downloaded][map-sharing#halonet] by the [Chimera][] mod or compiled by [invader-build][invader] with the `-c` flag use a custom compressed format intended for use by Chimera and takes up less space. These files also have a `.map` extension, but are not compatible with the base game. Note that Chimera does not download maps to Halo's main `maps` directory, but take care not to mix these maps with stock ones.

[os-maps]: https://haloce3.com/category/downloads/open-sauce-maps/
