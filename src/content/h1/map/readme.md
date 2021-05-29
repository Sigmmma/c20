A **map**, also known as a **cache file**, is a bundle of processed [tags][] which can be loaded and used by [Halo][h1]. With the exception of [_resource maps_](#resource-maps), each map represents a playable campaign, multiplayer level, or main menu.

Tags within a map file are not exactly the same as they exist in your source `tags` directory. When tags are compiled into a map, data is prepared for how it will be used at runtime. [Tag path references][tags#tag-references-and-paths] are replaced with pre-calculated indices or pointers, [child scenarios][scenario#child-scenarios] are merged, extra fields are calculated, and the metadata for [bitmaps][bitmap] and [sounds][sound] is separated from their raw data.

Maps are found in Halo's `maps` directory and have the ".map" extension. Maps in subdirectories are not loaded by the game. Mods like [Chimera][] and HAC2 store [downloaded](map-sharing#halonet) maps in a separate location and force the game to load them regardless.

# Map types
The type of a map is determined by the [scenario type field][scenario#tag-field-type] when the scenario is compiled, with the exception of resource maps which are not compiled from one.

## Multiplayer
In H1CE, multiplayer maps can be loaded through the in-game menu or with the [command][developer-console] `sv_map <map> <gametype>`. Loading a multiplayer map using `map_name <map>` will trap the player in the level without the ability to use the menu.

## Singleplayer
To load a singleplayer map in H1CE, you can either use a modded `ui.map` which includes menu options to launch it, or load it directly using the `map_name <map>` console command. When [Tool][] compiles this map type, it strips multiplayer information from [globals][] and applies some balancing [tag patches][tool#hardcoded-tag-patches]. These patches are applied at runtime in H1X.

## UI
The special `ui.map` contains resources for the game's main menu, including [bitmaps][bitmap] for its UI elements like the server browser and the Halo ring background. The [HEK][] supports the creation of custom UI maps. When Tool compiles a UI map, it strips multiplayer info and fall damage blocks from [globals][].

Custom UI maps which intend to add a campaign menu to H1CE must include a dummy first menu item since the game is hardcoded to remove it.

## Resource maps
Resource maps provide a way for certain tags to be stored _external_ to a playable map rather than its tags being totally self-contained. These maps themselves are not playable and have a different [header structure](#resource-map-header), but instead contain shared tags referenced by normal map files. This feature was introduced with H1PC with `bitmaps.map` and `sounds.map` to store [bitmap][] and [sound][] tags respectively, and `loc.map` was added in H1CE to store [font][] and [unicode_string_list][].

When playable maps are compiled using [Tool][], any needed tags for the map which are already present in a resource map will be excluded and referenced by pointer to the loaded resource map instead. The resource maps were created once using an internal version of Tool and were not originally intended to be modified, though [invader-resource][invader#invader-resource] is capable of compiling new ones. Using incompatible resource maps will result in glitched textures, sounds, and text.

Storing bitmaps and sounds in common files had the benefit of reducing the disk space needed for H1PC's maps because multiple maps are able to reference the same data rather than duplicating it. The other benefit is that the resource map can be swapped out with another to alter tag content without affecting the dependent maps. In the case of `loc.map`, the file itself contains common UI messages and prompts but varies by language of the H1CE installation. This means a custom map can be compiled once but still have localized messages when used in another language of the game, as opposed to compiling a version of the map for each language.

# Other map formats
In addition to [CEA's compressed map format][cea#changes], some custom map formats have been developed for use by a modified game client:

## Open Sauce .yelo maps
Maps with the extension `.yelo` are compiled with [OS_Tool][opensauce#os-tool] and can only be played using a game client running the [OpenSauce][] mod, which extends Halo's engine with new tag types, higher limits, and extra renderer features. These maps are typically [custom campaign missions][os-maps] specifically designed to take advantage of these extensions. [Refinery][] supports extracting OpenSauce tags from these maps.

## Invader/Chimera compressed maps
Maps downloaded by the [Chimera][] mod use a custom compressed format taking up less space. These maps are produced by compiling them using [invader-build][invader] with the `-c` flag, or using `invader-compress`. The map's header is uncompressed, but all other data is compressed. These files also have a `.map` extension, but when downloaded directly from [HaloNet][map-sharing#halonet] they have a `.inv` extension. Although Chimera does not download maps to Halo's main `maps` directory, take care not to mix these maps with stock ones since they are not compatible with the base game and are unsupported by other mods at this time. You can, however, decompress them easily with `invader-compresss -d <map>`.

# Limits
Because the game has a 23 MiB tag space limit (22 MiB on Xbox and raised to 31 MiB in CEA), [Tool][] will enforce this limit when compiling a map. Keep an eye on its console output:

```
total tag size is 8.43M (14.57M free)
```

Total tag size is comprised of all non-raw tag data (ie. no bitmap or sound raw data) plus the _largest_ [BSP][scenario_structure_bsp] size, since the BSP is loaded within the 23 MiB space and there will only be a single BSP loaded at a time.

Care should be taken not to get too close to the tag limit, because even though you may compile a map with a certain set of resource maps (e.g. the English version of the game), Halo players with different languages may actually have _larger_ resource map tag data which now exceeds the limit and prevents your map from loading.

You can toubleshoot which tags are using the most memory by generating `baggage.txt` using the [Sapien][Sapien#game-window] hotkey: <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>.

# Map loading
Within a map, tag _metadata_ (most of the fields seen in tag editors) is stored separately from _raw data_ (sounds and bitmaps). [BSP data][scenario_structure_bsp] for all BSPs is also stored in its own location. The game is able to find these locations using special headers and indexes in the map file.

Each section is loaded in a different way:

* Tag metadata is copied directly into memory at a fixed address. The game has a limited amount of tag space available for the currently loaded map. The size depends on the edition:
  * Xbox: `0x1600000` (22 MiB)
  * PC/CE: `0x1700000` (23 MiB)
  * CEA: `0x1f00000` (31 MiB)

  Tag metadata is loaded into the _start_ of this region. Because this data has been preprocessed by Tool, it requires no further processing and thus is very fast to load. The address where tag data is loaded is also dependent on the edition:
  * Xbox: `0x803A6000`
  * Demo: `0x4BF10000`
  * PC/CE: `0x40440000`
  * CEA: `0x40448000`
* The active BSP is loaded into the _end_ of the tag space. When a BSP switch occurs, the new BSP data is read from the map file and replaces the previous data in-memory. In CEA, it is loaded at memory address `0x41448000` instead.
* Raw data is streamed from the map file as needed and dynamically allocated in a loaded resource pool/cache. The texture cache is cleared during maps loads and BSP switches. Some tags like [BSPs][scenario_structure_bsp] and [scenarios][scenario] contain a "predicted resources" block which hints to the game which data should be loaded into these caches.

Tags from resource maps are also loaded into the tag space as needed. Halo CEA uses compressed maps and additional files to store sounds and bitmaps, so loads maps [differently][cea#changes].

# File structure

## Cache file header
Normal (non-resource) cache files begin with a header which is always 2048 bytes long.

```.struct
entry_type: CacheFileHeader
showOffsets: true
id: map-header
imports:
  h1/files/map:
    - CacheFileHeader
```

## Cache file header (demo)
Demo versions of H1PC use a different cache file header structure with reordered fields and extra padding between them as a means to make it harder to port retail cache files to the demo. The header is still 2048 bytes long.

```.struct
entry_type: DemoCacheFileHeader
showOffsets: true
id: demo-map-header
noEmbed:
  - CacheVersion
imports:
  h1/files/map:
    - DemoCacheFileHeader
```

## Resource map header
Demo versions of H1PC use a different cache file header structure with reordered fields and extra padding between them as a means to make it harder to port retail cache files to the demo. The header is still 2048 bytes long.

```.struct
entry_type: ResourceMapHeader
showOffsets: true
noEmbed:
  - CacheVersion
id: resource-header
imports:
  h1/files/map:
    - ResourceMapHeader
```

[os-maps]: https://haloce3.com/category/downloads/open-sauce-maps/
