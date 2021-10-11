Halo 2 uses an automatically generated pathfinding mesh using the collision mesh of the BSP as the base.
It takes this mesh and adds scenery and instance geometry collision meshes. It then removes any faces that have a slope greater than 45 degrees (and therefore not considered walkable) and then optimises the mesh so it's only made up of convex sectors and uses the minimum number of sectors possible. This is a rather complicated process and somewhat fragile - it will fail if the BSP has any open edges. See figures 1-4 for examples.

![.figure Figure 1. An outside section of `01a_tutorial` with collision geometry edges highlighted in green.](collision_0.png)
![.figure Figure 2. The same area as figure 1 but now with the pathfinding mesh rendered over the geometry. Each sector uses a different colour. Most surfaces were removed and some where got joined together](pathfinding_0.png)

![.figure Figure 3. Another outside section of `01a_tutorial` with collision geometry edges highlighted in green.](collision_1.png)
![.figure Figure 4. The same area as figure 3 but pathfinding render. It is more clear in this example that multiple surfaces can be merged into one sector](pathfinding_1.png)

As a level designer/map maker you have limited control over the whole process. There are some settings for the generator but most are not user facing and are likely only meant to be tweaked by developers that understand the whole process.
The main setting you control as a map maker is the pathfinding policy used by scenery objects.

# Pathfinding polices

## Dynamic
dunno

## Cut-out
The object will be "cut-out" from the pathfinding mesh. AI will not be able to walk on or over the object but will be able to navigate around this.
This is a reasonable choice most objects in the playable area.

## Static
The object will be added to the pathfinding mesh. AI will be able to walk on it. Use this for large objects AI might end up on.

## None
The object will be ignored by the pathfinding system. It will not affect the mesh. Can be used for objects that won't imped the AI or objects outside the playable area.