---
title: Scenario structure BSP
template: tag
---

Commonly referred to as the **BSP** (Binary Space Partitioning), this tag contains level geometry, weather data, material assignments, AI pathfinding information, lightmaps, and other data structures.

While a [scenario][] can reference multiple BSPs, Halo can only have a single BSP loaded at a time. Transitions between BSPs are handled by scripts in the campaign.

Aside from sounds and [bitmaps][bitmap], the BSP tends to be one of the largest tags in a map.
