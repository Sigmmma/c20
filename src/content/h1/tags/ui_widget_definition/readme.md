---
title: ui_widget_definition
stub: true
about: 'tag:h1/ui_widget_definition'
thanks:
  Jakey: Bounds scaling workaround
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
keywords:
  - DeLa
---
...

# Size on screen
The game uses a 640x480 UI space stretched to the player's resolution. The size of widgets within this space is usually 1:1 with their bitmap's size, making it hard to scale them down while retaining detail. You can work around it somewhat by using negative _bounds_ values, but this doesn't help with some existing widget bitmaps that are heavily cropped by bounds already (like map previews, which use the same bitmaps from Xbox but are cropped for PC).

# Structure and fields

{% tagStruct "h1/ui_widget_definition" /%}
