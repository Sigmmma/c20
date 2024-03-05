---
title: Porting maps
keywords:
  - porting
  - conversion
  - port
---
**Porting maps** means taking [maps](~map) built for one [edition](~h1#editions-and-versions) of H1 and converting them to work on another edition. For example, porting a Custom Edition map to Xbox or MCC.

Map cache files themselves are incompatible between editions of the game due to differing [map versions](~map#map-header-cache-version), [compression](~map#compressed-maps), [size limits](~map#map-file-size-limit), and changes to [how maps are loaded](~map#map-loading). Beyond this, engine features vary and the [tags](~tags) within the maps can be be incompatible. Porting maps is non-trivial, especially when the map is complex and includes a lot of custom content.

# Process
The current recommended approach to porting maps is:

1. Obtain a stock base tagset for the target game.
2. Extract tags from the source map using [invader-extract](~).
3. Identify what custom tags are present, and make any changes needed to make them compatible with the target game.
4. Layer the custom tags over the base tagset.
5. Build the map with [invader-build](~) for the target game.

# Challenges

* Some maps are [protected](~map#protected-maps) and/or include corrupted data from buggy community tools.
* Custom tags may be poorly organized.
* Some tags are unsupported or buggy. For example, H1X uses [model](~) while others use [gbxmodel](~). H1CE cannot render [shader_transparent_generic](~) and needs to use [shader_transparent_chicago](~) to emulate it.
* Available [script functions](~scripting#hsc-reference) varies. Only H1A supports [static script parameters](~scripting#script-types-static).
* New tag features have been introduced to H1A, like new tag fields and flags, which are not implemented in other editions.
* Higher limits in H1A are not present in other editions.
* Visual differences can arise from [renderer regressions](~renderer#gearbox-regressions) or different [limits](~renderer#limits).
* [Multipurpose map](~shader_model/#multipurpose-map) channel order has two conventions.
