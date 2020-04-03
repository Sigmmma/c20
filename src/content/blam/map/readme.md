---
title: Map cache file
stub: true
---

A map, also known as a **cache file**, is a bundle of compiled [tags][] which can be loaded and used by [Halo][ce]. As the name _cache_ suggests, Halo loads these into memory at game startup so that the tags within can be quickly read and accessed without having to load them from disk. With the exception of **resource maps** and **ui.map**, each map represents a playable campaign or multiplayer level.

# Map types
## Campaign
...

## Multiplayer
...

## UI
The special `ui.map` contains resources for the game's main menu, including [bitmaps][bitmap] for its UI elements like the server browser and the Halo ring background. The [HEK][] supports the creation of custom UI maps.

## Resource maps
The maps `bitmaps.map`, `sounds.map`, and `loc.map` are special _resource maps_, and contain commonly referenced tags which do not need to be duplicated within each playable map referencing them. Instead, these shared tags are excluded by [tool][] at map compilation time (seen as "cache hits" in its output). Compiling custom resource maps from tags<sup>how?</sup> can be an effective way to reduce the net filesize of a campaign overhaul mod.

## Open Sauce .yelo maps
Maps with the extension `.yelo` can only be played using a game client running the _Open Sauce_ mod, which extends Halo's engine with new tag types, higher limits, and extra renderer features. These maps are typically [custom campaign missions][os-maps] specifically designed to take advantage of these extensions.

[os-maps]: https://haloce3.com/category/downloads/open-sauce-maps/
