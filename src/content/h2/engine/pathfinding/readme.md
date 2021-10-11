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

![.figure Figure 5. An example of static collision with BSP collision in green (`debug_structure 1`) and pathfinding mesh rendered in red (`ai_render_sectors 1`)](static.jpg)

## None
The object will be ignored by the pathfinding system. It will not affect the mesh. Can be used for objects that won't imped the AI or objects outside the playable area.

# Debugging
Pathfinding edges can be rendered using `ai_render_sectors 1`, you are meant to be able to render sectors and some information about then using `ai_render_sector_bsps 1` but this is currently crashes with an assertion failure if you point your camera at a surface that doesn't have a sector (e.g. a vertical wall) - someone forgot to check a surface has a pathing sector before trying to get some sector info. If you know how to bypass the assertion it should work fine.

![.figure Figure 6. `ai_render_sectors 1` and `ai_render_sector_bsps 1` used on `05b_deltatowers`. The coloured dots represent the sector (colour is generated from the sector ID) and the colour ball in the centre represent the section with is getting it's information printed in the top left. if the surface the ball is on has no sector it will be red, otherwise it will be green for device machines and a random colour based on the sector ID for all other sectors. ](ai_sectors.jpg)

You can see what path (if any) an AI would take using the *structure data ⇒ pathfinding debug* hierarchy entry. Use the left and right click to select start and end points respectively.
If no path can be found the reason will be printed on screen. If the distance is too long the whole path wouldn't be rendered but some of it will be and the on-screen message will inform you that it was able to find a path.

![.figure Figure 7. Pathfinding debug used on `05b_deltatowers`](debug.jpg)

If you have any instances or scenery that use cutout you need to ensure they actually intersect with the BSP, otherwise they wouldn't get cutout and pathfinding system wouldn't be aware of them.

# Optimisations
A complex pathfinding can cause issues for AI - it's better for the mesh to be as simple as possible. Long and narrow sectors are a common issue, these can make the AI move in a weird way when navigating in their vicinity.
If there is a particularly problematic area/junction you can use a *cookie cutter* of the appropriate size to remove it. Don't over-use this or make the cutter too large as cookie cutters remove the pathfinding and that can cause it's own issues.
In general well optimised collision geometry should generate good collision geometry.

# Scenery tag considerations
The scenery tag defines the default pathfinding policy for a scenery object. Set this to whatever is most reasonable for that scenery item.