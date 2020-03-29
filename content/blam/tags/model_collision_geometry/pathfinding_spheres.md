# Pathfinding spheres
In Halo CE AI can figure out where to go by checking the pathfinding data on the BSP. But when you place objects in a level this of course doesn't affect the BSP. The solution that Bungie came up with for this is pathfinding spheres.

## What are pathfinding spheres
Pathfinding spheres are spherical markers on objects that AI actively avoid walking into. This helps because it allows the author of the model to tell the AI exactly where not to go. So it won't walk into walls, or rocks or trees.

## How to add them
Pathfinding spheres are imported from the collision jms file of your object. They are marked with `#pathfinder` and their radius is the actual radius that the AI will avoid walking in relation to the mid-point.

## Other conditions that add pathfinding spheres
When an artist doesn't specify any pathfinding spheres Halo by default will put one at the object's origin at half the size of the bounding sphere. (Note that this can be either too small or too big.)

Mass points in physics tags also count as pathfinding spheres. AI will actively avoid these.

Units by default also have a pathfinding sphere around their feet at the size of the width of their physics pill.

## What object types can use pathfinding spheres
As far as we know all object types can make use of pathfinding spheres.

## Limits
model_collision_geometry tags can only have up to 16 pahtfinding spheres. (Confirmation needed.)

## Related commands
 - `debug_objects_pathfinding_spheres 1`
    Can be used to view pathfinding spheres in Sapien.
