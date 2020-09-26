---
title: ui_widget_definition
tagName: ui_widget_definition
stub: true
thanks:
  - to: Jakey
    for: Bounds scaling workaround
---
...

# Size on screen
The game uses a 640x480 UI space stretched to the player's resolution. The size of widgets within this space is usually 1:1 with their bitmap's size, making it hard to scale them down while retaining detail. You can work around it somewhat by using negative _bounds_ values, but this doesn't help with some existing widget bitmaps that are heavily cropped by bounds already (like map previews, which use the same bitmaps from Xbox but are cropped for PC).
