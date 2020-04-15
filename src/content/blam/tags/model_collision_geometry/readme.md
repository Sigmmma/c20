---
title: model_collision_geometry
template: tag
img: collisions.png
imgCaption: "Collision geometry for many of Halo's vehicles, scenery, and bipeds"
---

Model collision geometry tags contain collision data for an [object][]. This is in contrast to [model/gbxmodel][gbxmodel] tags, which contain the renderable data. Collision meshes tend to be less detailed than render meshes.

Beyond having a collision mesh, these tags can also contain:

* _Pathfinding spheres_ which prevent AI from trying to walk through the object
* Damage ratios for each part of the object (e.g. weak points)
* Shield and health values

Collision geometry, rather than the [model][gbxmodel], is used to cast [scenery][] shadows in [lightmaps][].

# Pathfinding spheres

<figure>
  <a href="games.svg">
    <img src="pathfinding-spheres.png" alt="Pathfinding spheres visible in Sapien"/>
  </a>
  <figcaption>

Pathfinding spheres (blue) for a50 shown in [Sapien][] after running `debug_objects_pathfinding_spheres 1`

  </figcaption>
</figure>

In Halo CE AI can figure out where to go by checking the pathfinding data on the BSP. But when you place objects in a level this of course doesn't affect the BSP. The solution that Bungie came up with for this is pathfinding spheres.

Pathfinding spheres are spherical markers on objects that AI actively avoid walking into. This helps because it allows the author of the model to tell the AI exactly where not to go. So it won't walk into walls, or rocks or trees.

As far as we know all object types can make use of pathfinding spheres.

## How to add them
Pathfinding spheres are imported from the collision jms file of your object. They are marked with `#pathfinder` and their radius is the actual radius that the AI will avoid walking in relation to the mid-point.

Pathfinding spheres can also be created automatically in some cases:

* When an artist doesn't specify any pathfinding spheres will place one at the object's origin at half the size of the bounding sphere (which can be either too small or too big)
* Mass points in [physics tags][physics] also count as pathfinding spheres. AI will actively avoid these.
* [Units][unit] by default also have a pathfinding sphere around their feet at the size of the width of their physics pill.

## Limits
model_collision_geometry tags can only have up to 16 pathfinding spheres<sup>(confirmation needed)</sup>.

## Related commands

* `debug_objects_pathfinding_spheres 1`
  Can be used to view pathfinding spheres in Sapien.

# Animation
Unlike [BSPs][scenario_structure_bsp], collision geometry can have a self-intersecting mesh. However, this is only permitted between meshes parented by different nodes (e.g. limbs of a biped intersecting each other or the torso). Collision geometry cannot have weighted skinning for animations, so rigidly follows parent nodes in animations.
