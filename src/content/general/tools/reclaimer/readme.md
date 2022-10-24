---
title: Reclaimer (data viewer/extractor)
about: 'tool:Reclaimer'
img: reclaimer.jpg
caption: >-
  Reclaimer being used to view a Halo 3 [render_model](~h3/tags/render_model)
  tag.
info: !<tag:yaml.org,2002:js/undefined> ''
related:
  - /general/tools/assembly
---
**Reclaimer** is a tool capable of viewing and extracting assets from Halo 1-5 maps, OpenSauce [.yelo](~h1/map#opensauce-yelo-maps), modules (H5), and paks (S3D) so they can be ported by modders between games or to other engines. [Support varies][compat] by asset type, game, and platform.

Reclaimer can only extract assets from tags _within_ maps; it does not work on source tag files.

# Usage
Before extracting assets from a map, make sure the map version [is supported][compat] by Reclaimer. You may need to upgrade to a newer version since the project may add supported map and tag formats over time.

1. Use _File > Open_ to open a supported map file, e.g. `riverworld.map`.
2. To navigate by tag hierarchy, select the _Toggle folder hierarchy_ option at the top of the map viewer pane (looks like a stack of blocks).
3. Navigate through the tag tree until you find a supported tag, e.g. `objects/weapons/pistol/needler/needler.render_model`. Double-click to open.
4. In the asset viewer, choose from the save icons in the upper toolbar to extract models or textures. You will be able to choose the model export format when saving.

[compat]: https://github.com/Gravemind2401/Reclaimer/wiki/Compatibility
