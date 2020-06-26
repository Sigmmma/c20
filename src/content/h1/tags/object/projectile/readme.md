---
title: projectile
tagName: projectile
stub: true
thanks:
  - to: gbMichelle
    for: Movement
---
...

# Movement
Projectile movement is simulated during each game tick (smallest unit of simulated time). According to the projectile's velocity and gravity scale, its next position is calculated by the engine and a "trace" line between the two points is tested for collisions.

The trace collision test takes advantage of [objects'][object] bounding radii and the collision BSP structures found in [model_collision_geometry][] and [scenario_structure_bsp][]. If any collision is detected, it is handled accordingly (e.g. applying [effects][effect] or playing [sounds][sound]).

If no collision is detected, the projectile is moved to its next position at the end of the trace line. The process continues, tick by tick, until the projectile collides or reaches its maximum range and is removed.

A sufficiently high velocity projectile is essentially [hitscan][] if it can cross a playable space within a single tick, with the game being simulated at 30 ticks per second. Otherwise, ballistic leading will be required to hit a moving target.

[hitscan]: https://en.wikipedia.org/wiki/Hitscan
