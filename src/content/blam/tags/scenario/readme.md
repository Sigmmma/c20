---
title: scenario
template: tag
tagExtension: scenario
stub: true
---

Scenarios are the main "root" tag used to compile a playable [map][]. Though tool will also will include globals, tag collections, and some UI tags automatically, the majority of a map's tags are dendencies or transitive dependencies of the scenario.

Scenarios can contain multiple [scenario_structure_bsp][] and reference all tags needed for gameplay in the map.

# Child scenarios
It is known that Bungie did not originally author singleplayer scenarios as a single tag, but used _child scenarios_ to break them up into multiple tags. During map compilation, [tool][] merges child scenarios together. This is why stock scenarios extracted with tools like [Refinery][mek] can exceed Sapien's limits or have duplicated objects.
