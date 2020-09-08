---
title: scenario
tagName: scenario
tagExtension: scenario
img: scenario.jpg
imgCaption: The scenario contains information needed to make a map playable, including the placement of objects, spawn points, and AI encounters.
stub: true
thanks:
  - to: Masterz1337
    for: Encounters vs bipeds
---

**Scenarios** are the main "root" tag used to compile a playable [map][]. Though tool will also will include globals, tag collections, and some UI tags automatically, the majority of a map's tags are direct or indirect dependencies of the scenario.

The scenario is essential for defining all gameplay elements such as AI encounters, item spawns, multiplayer flags, [scenery][] and other objects. It may reference one multiple [scenario_structure_bsp][]. Level scripts, cinematics, and trigger volumes are also defined in this tag.

# Child scenarios
It is known that Bungie did not originally author singleplayer scenarios as a single tag, but used _child scenarios_ to break them up into multiple tags. During map compilation, [Tool][] merges child scenarios together. This is why stock scenarios extracted with tools like [Refinery][mek] can exceed [Sapien's][sapien] limits or have duplicated objects.
