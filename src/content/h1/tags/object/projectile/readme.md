---
title: projectile
about: 'tag:h1/projectile'
img: proj.jpg
caption: >-
  Projectiles can be given a render model and a variety of effects and
  attachments, like [contrails](~contrail) and [lights](~light).
thanks:
  gbMichelle: Movement
  Mimickal: Explaining bounce timer
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
  Vennobennu: Field documentation
  FD: Explaining "combine initial velocity with parent velocity"
  Conscars: Testing collision radius
  xScruffyDaSasquatchx: Explaining noise volumes for AI perception
keywords:
  - proj
---
**Projectiles** are a type of object that can be fired from [weapon](~) triggers and thrown as grenades. They can have render models and various attachments, and are capable of bouncing, detonations, different responses by impacted material, ballistic trajectories, and various other settings.

# Movement
Projectile movement is simulated during each game tick (smallest unit of simulated time). According to the projectile's velocity and gravity scale, its next position is calculated by the engine and a "trace" ray between the two points is tested for collisions.

The trace collision test takes advantage of other [objects'](~object) bounding radii and the collision BSP structures found in [model_collision_geometry](~) and [scenario_structure_bsp](~). If any collision is detected, it is handled accordingly (e.g. applying [effects](~effect) or playing [sounds](~sound)).

If a _[collision radius](#tag-field-collision-radius)_ is set then and the game uses an additional 2 offset rays to check for collisions with objects.

If no collision is detected, the projectile is moved to its next position at the end of the trace line. The process continues, tick by tick, until the projectile collides, detonates at its _maximum range_, or is removed at its maximum _air_ or _water damage range_.

A sufficiently high velocity projectile is effectively [hitscan][] if it can cross a playable space within a single tick, with the game being simulated at 30 ticks per second. Otherwise, ballistic leading will be required to hit a moving target.

# Related HaloScript
{% relatedHsc game="h1" tagFilter="projectile" /%}

# Structure and fields

{% tagStruct "h1/projectile" /%}


[hitscan]: https://en.wikipedia.org/wiki/Hitscan
