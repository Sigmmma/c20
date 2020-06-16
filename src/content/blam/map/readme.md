---
title: Map cache file
resourceName: map
img: map-icon.jpg
thanks:
  - to: Masterz1337
    for: Context on OpenSauce capabilities
---

A map, also known as a **cache file**, is a bundle of compiled [tags][] which can be loaded and used by [Halo][h1]. With the exception of _resource maps_, each map represents a playable campaign, multiplayer level, or main menu.

As the name _cache_ suggests, these files are intended to be loaded directly into Halo's memory at a fixed address with no further processing of data needed. The files contain pre-calculated pointers

Maps are found in Halo's `maps` directory. Maps in subdirectories are not loaded by the game. Mods like Chimera and HAC2 store downloaded maps in a separate location and force the game to load them regardless.

# Map types
## Multiplayer
The most common type of map, these were compiled with a scenario type of "multiplayer". Multiplayer maps can be loaded through the ingame menu or with the command `sv_map`. Loading a multiplayer map using `map_name` will trap the player in the level without the ability to use the menu.

## Singleplayer
Singleplayer/campaign maps can be compiled by setting the scenario's type to "singleplayer". Besides via a modded `ui.map`, campaign maps can then be loaded with `map_name`.

## UI
The special `ui.map` contains resources for the game's main menu, including [bitmaps][bitmap] for its UI elements like the server browser and the Halo ring background. The [HEK][] supports the creation of custom UI maps.

## Resource maps
The maps `bitmaps.map`, `sounds.map`, and `loc.map` are special _resource maps_, and contain commonly referenced tags which do not need to be duplicated within each playable map referencing them. Instead, these shared tags are excluded by [tool][] at map compilation time (seen as "cache hits" in its output). Compiling custom resource maps from tags<sup>how?</sup> can be an effective way to reduce the net filesize of a campaign overhaul mod.

## Open Sauce .yelo maps
Maps with the extension `.yelo` can only be played using a game client running the [OpenSauce][] mod, which extends Halo's engine with new tag types, higher limits, and extra renderer features. These maps are typically [custom campaign missions][os-maps] specifically designed to take advantage of these extensions.

## Invader/Chimera compressed maps
Note that Chimera's downloaded map files, or Invader-compressed maps, use a custom compressed format which is not backwards compatible with the base game or other mods despite sharing the `.map` extension.

[os-maps]: https://haloce3.com/category/downloads/open-sauce-maps/
