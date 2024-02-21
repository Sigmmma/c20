---
title: H1 map cache file
about: 'resource:h1/map'
img: map-icon.jpg
keywords:
  - map
thanks:
  Masterz1337: Context on OpenSauce capabilities
  Jakey: Tag data limit info
  gbMichelle: How maps are loaded into memory
  Kavawuvi: >-
    [Documenting](https://opencarnage.net/index.php?/topic/6693-halo-map-file-structure-revision-21/)
    the map file structure, base addresses, and [Invader
    code](https://github.com/SnowyMouse/invader) for reference
  hellux: Testing and documenting tag space on Xbox
  WaeV: >-
    [Diagrams and
    overview](https://opencarnage.net/index.php?/topic/2869-mapfiles-an-overview/&page=1)
    of the map file structure.
redirects:
  - /h1/map
---
A **map**, also known as a **cache file**, is a bundle of processed [tags](~) which can be loaded and used by [Halo](~h1). With the exception of [_resource maps_](#resource-maps), each map represents a playable campaign, multiplayer level, or main menu.

Maps are found in Halo's `maps` directory and have the ".map" extension. Maps in subdirectories are not loaded by the game. H1CE mods like [Chimera](~) and [HAC2](~) store [downloaded](~sharing#halonet) maps in a separate location and force the game to load them regardless.

Although maps work mainly the same way in each release of H1, there are a number of differences listed on this page which prevent maps from being reused across them as-is. For example, an H1CE map file cannot be used in H1PC Demo without recompiling it from tags.

# Building maps from tags
Tool's [build-cache-file](~h1a-tool#build-cache-file) verb is the official way to build a map for MCC, or for Custom Edition with the HEK, from a scenario tag. The resulting map contains all tags needed by the scenario. The unofficial [invader-build](~) tool can also build maps from tags, including targeting all platforms like Xbox, Retail, and Demo.

When tags are built into a map, their data is prepared for how it will be used at runtime. [Tag path references](~general/tags#tag-paths-and-references) are replaced with pre-calculated indices or pointers, [child scenarios](~scenario#child-scenarios) are merged, extra fields are calculated, and the metadata for [bitmaps](~bitmap) and [sounds](~sound) is separated from their raw data. Tool even makes some [hard-coded tag edits](~h1a-tool#hardcoded-tag-patches).

# Extracting tags from maps
Tag extraction is the process of reconstructing source tag files (also called _loose tags_) from a built map so that they can be easily modified and rebuilt into new maps. H1 is currently the only game where tag extraction is possible due to its well understood tag stuctures and processing, and mature community tools. Source tags can be mostly reconstructed, but some information like [child scenarios](~scenario#child-scenarios) and [bitmap color plate data](~bitmap#tag-field-compressed-color-plate-data) is lost during map building.

Tag extractors must take care to carefully reverse all tag processing performed when the map was built, and [invader-extract](~) is the best tool for this. Do not use outdated tools like [HEK+](~obsolete#hek).

Tag extraction can be hindered if the map has been [protected](#protected-maps).

# Editing and porting maps
The [recommended approach](~porting-maps) to porting or modifying maps is to obtain their source [tags](~) and recompile the map using [Tool](~h1a-tool) or [invader-build](~). This ensures the greatest flexibility and tags will be processed correctly when the new map is built. It is also possible to directly edit ("poke") the tags within a map using tools like [Assembly](~), but this can be error prone or more limiting than working with source tags. Adding new assets ("injecting") is harder than using the intended asset pipeline.

# Map types
The type of a map is determined by the [scenario type field](~scenario#tag-field-type) when the scenario is compiled:

* **Multiplayer**: In H1CE, multiplayer maps can be loaded through the in-game menu or with the [command](~developer-console) `sv_map <map> <gametype>`. Loading a multiplayer map using `map_name <map>` will trap the player in the level without spawning unless there is a singleplayer spawn present in the scenario (a spawn with no game modes set). In [Standalone](~h1a-standalone-build) you need to use the combination of `game_variant <gametype>` followed by `map_name <scenario tag path>`.
* **Singleplayer**: To load a singleplayer map in H1CE, you can either use a modded `ui.map` which includes menu options to launch it, or load it directly using the `map_name <map>` console command. In [Standalone](~h1a-standalone-build) you just need to use `map_name <scenario tag path>`. When [Tool](~h1a-tool) compiles this map type, it strips multiplayer information from [globals](~) and applies some balancing [tag patches](~h1a-tool#hardcoded-tag-patches). These patches are applied at runtime in H1X.
* **UI**: The special `ui.map` contains resources for the game's main menu, including [bitmaps](~bitmap) for its UI elements like the server browser and the Halo ring background. When Tool compiles a UI map, it strips multiplayer info and fall damage blocks from [globals](~). Custom UI maps for Custom Edition which intend to add a campaign menu must include a dummy first menu item since the game is hardcoded to remove it.

## Resource maps
Resource maps provide a way for certain tags to be stored _external_ to a playable map rather than its tags being totally self-contained. These maps themselves are not playable and have a different [header structure](#resource-map-header), but instead contain shared tags referenced by normal map files. This feature was introduced with H1PC with `bitmaps.map` and `sounds.map` to store [bitmap](~) and [sound](~) tags respectively, and `loc.map` was added in H1CE to store [font](~) and [unicode_string_list](~). MCC H1A no longer uses `loc.map` except for backwards compatibility with maps compiled for Custom Edition. H1X does not use resource maps.

Tool's [build-cache-file](~h1a-tool#build-cache-file) will check resource maps for matching [tag paths](~map#resource-header-paths-offset), and the behaviour depends on the version and arguments. HEK tool will exclude any tag data from your map that it finds in a resource map, instead referencing it as external data. You can opt out of this behaviour by temporarily moving the resource maps away. H1A Tool includes a new _resource map usage_ argument which lets you either ignore (default), reference from, or add to resource maps. HEK users can instead use [invader-resource](~) and [OpenSauce](~) to create custom resource maps.

Using incompatible resource maps will result in glitched textures, sounds, and text.

Storing bitmaps and sounds in common files had the benefit of reducing the disk space needed for H1PC's maps because multiple maps are able to reference the same data rather than duplicating it. The other benefit is that the resource map can be swapped out with another to alter tag content without affecting the dependent maps. In the case of `loc.map`, the file itself contains common UI messages and prompts but varies by language of the H1CE installation. This means a custom map can be compiled once but still have localized messages when used in another language of the game, as opposed to compiling a version of the map for each language.

# Compressed maps
H1X maps use [zlib compression][zlib] for all data following their header. Maps are decompressed into one of multiple disk caches depending on the [header's scenario type](#map-header-scenario-type).

This compression scheme is not supported natively in other releases of the game, but it is supported by the H1CE mod [Chimera](~). Maps downloaded from [HaloNet](~sharing#halonet) by this mod may be compressed this way. Although Chimera does not download maps to Halo's main `maps` directory, take care not to mix these maps with stock ones since they are not compatible with the base game and are unsupported by other mods at this time. Compressed maps can be identified using [invader-info](~).

# OpenSauce .yelo maps
Maps with the extension `.yelo` can only be played using the [OpenSauce](~) mod for Custom Edition, since they can contain [non-standard tag groups](~opensauce#new-tag-groups) and rely on extended game features offered by OS. These maps are created using OS_Tool. [Refinery](~) supports extracting OpenSauce tags from these maps.

# Protected maps
A _protected map_ is a map which has been intentionally corrupted in a way which still allows it to be loaded and played in-game, but hinders attempts to extract tags or edit it with [legacy tools](~obsolete) by removing or scrambling data like [tag paths](#resource-header-tag-path-pointer). It is now a discouraged practice.

Map protection was unfortunately common in the H1CE modding scene in the 2000s as a way to prevent others from using ones custom tags, and it has overall negatively impacted the community because the resulting maps are crash-prone, cannot be easily be ported to newer engines like H1A, and new modders cannot extract their tags cleanly for study. H1A even explicitly checks for and refuses to load protected maps.

[Refinery](~) can "deprotect" maps for tag extraction but the results may require cleanup.

# Map file size limit
The maximum allowable file sizes for playable maps varies by version. Halo will reject maps if their [header has a file size](#map-header-file-size) that exceeds this limit.

* H1X:
  * SP: 278 MiB
  * MP: 47 MiB
  * UI: 35 MiB
* H1CE: 384 MiB ([Tool](~h1a-tool) enforces 128 MiB for MP maps)
* H1A: 2 GiB

[invader-build](~) can be used to build cache files which exceeds the stock limits, but this may require the user to use a mod to play the map.

# Tag space
The game's buffer for tag data is limited:

* H1X: 22 MiB
* H1CE and H1PC: 23 MiB
* H1A: 64 MiB

Total tag size is comprised of all non-raw tag data (ie. no bitmap or sound raw data) plus the _largest_ [BSP](~scenario_structure_bsp) size, since the BSP is loaded within the tag space and there will only be a single BSP loaded at a time. Additionally, a maximum of 65535 tags can be in a map.

[Tool](~h1a-tool) will enforce this limit when compiling a map. Keep an eye on its console output:

```
total tag size is 8.43M (14.57M free)
```

Care should be taken not to get too close to the tag limit, because even though you may compile a map with a certain set of resource maps (e.g. the English version of the game), Halo players with different languages may actually have _larger_ resource map tag data which now exceeds the limit and prevents your map from loading.

You can toubleshoot which tags are using the most memory by generating the `baggage.txt` report using the [Sapien](~h1a-sapien#game-window) hotkey: {% key "Control + Shift + B" /%}.

# H1A changes
The H1A engine makes some adjustments to the [map](~) format:

* BSP vertices are stored outside of the BSP tag and BSP data is loaded at address `0x41448000` instead of within the tag data space.
* The tag data address has been adjusted from `0x40440000` to `0x40448000`.
* The maps (and other files) are compressed using a variant of [zlib][] compression.
* [Bitmaps](~bitmap), and [sounds](~sound) have been relocated from their respective bitmaps.map/sounds.map locations. The sounds are now in FMOD sound banks, and the bitmaps are stored inside ipaks.

# Map loading
Within a map, _tag definitions_ (sometimes called _metadata_) are stored separately any _raw data_ used by the tag, such as sounds and bitmaps. [BSP data](~scenario_structure_bsp) for all BSPs is also stored in its own location. The game is able to find these locations using special headers and indexes in the map file.

Each section is loaded in a different way:

* Tag metadata is copied directly into memory at a fixed address. The game has a limited amount of tag space available for the currently loaded map. The size depends on the edition:
  * H1X: 22 MiB
  * H1PC and H1CE: 23 MiB
  * H1A: 64 MiB

  Tag metadata is loaded into the _start_ of this region. Because this data has been preprocessed by Tool, it requires no further processing and thus is very fast to load. The address where tag data is loaded is also dependent on the edition:
  * H1X: `0x803A6000`
  * H1PC Demo: `0x4BF10000`
  * H1PC and H1CE: `0x40440000`
  * H1A: Dynamic or `0x40448000`?
* The active BSP is loaded into the _end_ of the tag space. When a BSP switch occurs, the new BSP data is read from the map file using [information stored in the scenario tag](~scenario#tag-field-structure-bsps) and replaces the previous data in-memory. In H1A, it is loaded at a separate dedicated location instead.
* Raw data is streamed from the map file as needed and dynamically allocated in the [sound cache](~sound-system#sound-cache) and [texture cache](~renderer#texture-cache). The texture cache is cleared during maps loads and BSP switches. Some tags like [BSPs](~scenario_structure_bsp) and [scenarios](~scenario) contain a "predicted resources" block which hints to the game which data should be loaded into these caches.

Tags from resource maps are also loaded into the tag space as needed.

# File structure
Generally map files consist of a map header section followed by BSP, model, raw data, and indexed tag definitions. The header structure and/or values vary by game. Not all maps may look like this exactly, due to map protection or differences in map compiler. All data is [little-endian](https://en.wikipedia.org/wiki/Endianness).

![A map file containing header, BSP data, raw data, and indexed tags](map-layout.png)

![A map file containing header, BSP data, raw data, and indexed tags](map-structure.png)

{% alert %}
This page does not give a full accounting of how BSP and model data are stored and loaded. For further information, see this page's [acknowledgments](#acknowledgements) section for source material.
{% /alert %}

## Map header
Normal playable (non-resource) cache files begin with a header which is always 2048 bytes long.

{% structTable
  entryModule="h1/files/map"
  entryType="CacheFileHeader"
  showOffsets=true
  id="map-header"
/%}

### Demo map header
Demo versions of H1PC use a different cache file header structure with reordered fields and extra padding between them as a means to make it harder to port retail cache files to the demo. The header is still 2048 bytes long.

{% structTable
  entryModule="h1/files/map"
  entryType="DemoCacheFileHeader"
  showOffsets=true
  id="demo-map-header"
  noEmbed=["CacheVersion"]
/%}

## Resource map header

{% structTable
  entryModule="h1/files/map"
  entryType="ResourceMapHeader"
  showOffsets=true
  id="resource-header"
/%}

## Tag index header
The tag index/tag data header is the start of where tag data and definitions are loaded directly into memory at runtime at the game's tag address. For most versions of the game, it looks like this:

{% structTable
  entryModule="h1/files/map"
  entryType="TagDataHeaderPC"
  showOffsets=true
  id="tag-header"
/%}

### Xbox tag index header
The H1X tag index header is slightly different since model data is also in the tag data, so it uses pointers instead of file offsets.

{% structTable
  entryModule="h1/files/map"
  entryType="TagDataHeaderXbox"
  showOffsets=true
  id="xbox-tag-header"
/%}

## Tag array entry
Each 32-byte element in the tag array contains information about a tag in the map, including a pointer or resource index to the actual tag definition itself.

{% structTable
  entryModule="h1/files/map"
  entryType="TagArrayEntry"
  showOffsets=true
  id="tag-entry"
/%}

[os-maps]: https://haloce3.com/category/downloads/open-sauce-maps/
[zlib]: https://en.wikipedia.org/wiki/Zlib
