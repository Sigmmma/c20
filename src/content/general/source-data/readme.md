---
title: Source data
keywords:
  - uncompiled
  - data
  - sources
  - raw
  - assets
  - textures
  - export
redirects:
  - /h2/sources
childOrder:
  - jms
  - ass
  - fbx
  - materials
  - wrl
  - animation-data
---
{% figure src="src-data.png" alt="" inline=false %}
Scripts, textures, and models are some examples of source data files.
{% /figure %}
**Source data** are the raw assets which have not yet been converted into [tags](~) useable by the [engine](~blam). They live under the `data` directory of your mod tools and include uncompressed TIFF textures exported from your [2D software](~art-tools#texturing), models and animations you have exported from your [3D software](~art-tools#modeling), and level [scripts](~scripting). In most cases, assets within `data` will have a corresponding tag under the same folder layout in `tags`.

Converting these assets into tags is called _importing_ or _compiling_ and is usually done by [Tool](~mod-tools#tools-overview). The types of source data formats used depends on the game; some are common but others are generational. H1-H3/ODST differ between each other, but differ even more compared to later games like Reach, H2A, and H4.

# More information
{% childList /%}