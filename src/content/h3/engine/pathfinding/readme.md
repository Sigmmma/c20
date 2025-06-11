---
title: Pathfinding
stub: true
noSearch: false
img: pathfinding.png
caption: Various elements of pathfinding like hints and firing points
about: 
keywords:
  - AI
  - navmesh
  - navigation
  - cookie cutters
  - jump hints
thanks:
  odchylanie_uderzenia: writing and research
--- 
When a level is imported, depending on the conditions of the level, the ability for the AI to find a navigable path along the geometry is effected. For example small gaps that players would ignore may cause AI to be unable to transition the platforms between the gap, thus a jump hint would be needed so the AI can bridge the jump.

A notable cause of pathfinding failure on new levels can be from open edges, levels in early itertations of the blam engine rely on collision supplied from BSP calculations, as such levels much be entirely sealed: like a balloon, any holes in this balloon will cause pathfinding failure.

# Usage

While your level may be sealed and pathfinding can take place, this is fundamentally useless to the AI unless they have zones and areas set to them for them to navigate, this section will detail the various types of pathfinding and navigation info needed for proper AI usage.

## Zones

The highest level of the AI pathfinding system for gameplay purposes, [objectives](~) will reference these so that their tasks can reference the areas of that zone, squads can reference an initial zone to navigate around (assuming their objective doesn't move them to a different zone).

## Areas

{% alert %}
Scarabs do not use vehicle areas, they use normal infantry areas, keep in mind they still need [giant hints](~pathfinding#hints)
{% /alert %}

Contains firing positions, contained within zones, [tasks](~objectives) will reference these in order to determine what area of the map this AI (Using this task) shall navigate around. Areas can be marked so that only vehicle units can use them.

The intended method is to assign a zone to an objective, then all tasks will be assigned areas in that zone, trying to assign areas from other zones will **crash sapien**, however if you do **not** set a zone in the objective then tasks will freely allow different areas from other zones to be referenced, though you will lose the visual UI element for adding areas and must manually add them via the properties window

## Firing positions

The lowest level of the AI pathfinding system for gameplay purposes, AI use these individual points as spots they can fire from or move between and these firing points can be set with various properties.

{% figure src="postures.png" %}
Pictured from left to right: corner left, bunker and corner right, vectors of firing points facing south
{% /figure %}

| Posture flags | Description
|-------|----------
| corner_left | allows AI to perch along walls facing to the right of this firing points vector, uses "corner_cover_left" and "cover_open_left" animations
| corner_right | allows AI to perch along walls facing to the left of this firing points vector, uses "corner_cover_right" and "cover_open right" animations
| bunker | allows AI to bunker on this firing point when accounting for an enemy presence in front of this firing points vector, uses "bunker_cover" and "bunker_open" animation

# Pathfinding polices

The main setting you control as a map maker is the pathfinding policy used by objects such as [crates](~) or [scenery](~).

| Policy type | Description
|-------|----------
| Default | Uses the default pathfinding type that the object itself has, scenery usually uses cut-out while crates use dynamic
| Dynamic | This policy is typically used on objects that can move around the map, allowing AI to constantly update their pathfinding around and on this object, used for crates and device machines
| Cut-out | This item is cut-out of the pathfinding mesh entirely, being a "dead zone" of sorts that AI will navigate around
| Static | Similar to dynamic but for non-moving objects, stitches them into the pathfinding mesh so AI can navigate around, ontop and through them
| None | This item is ignored entirely for AI pathfinding calculations, AI will not attempt to navigate around this object

# Hints

Hints are used by the scenario editor to allow more fine tuning of the AI navigation when interacting with the level geometry, examples include things like cookie cutters to block pathfinding entirely or climb hints to allow AI to climb walls that are normally impassable. Hints can be viewed using `ai_render_hints 1`.

Most hints will have two general flags:
- bidirectional : AI can use this hint going fowards and backwards across it, some exceptions apply
- closed : Unknown/needs additional research

{% figure src="wellhint.png" %}
Pictured: How correctly set up well and flood hints are seen from the view of the well hint selection, note how the well hints draw paths that enter and exit the flood hint
{% /figure %}

| Hint type | Description
|-------|----------
| well | Using right click you draw a path for certain AI to take to jump on or off flood hint sectors, closing the path with left click
| jump | Using right and left click you draw a set of vectors (starting from the top two points) that detmermines a direction for AI to take jumps in, can also be used for for vaulting, a section below will detail additional flags
| climb | Using right and left click draw a verticle path from which AI will attempt to climb up using their hoist animations
| flight | Using right click draw a path of points in which flying AI can use to fly around an area without the use of firing positions, close with left click
| cookie cutter | Using right creat a box that you can alter the dimensions of, inhibits *all* pathfinding through the area of the cookie cutter
| flood | Using right click you draw an enclosed area that certain AI will climb on or off, seal this area with left click, typically used for drones or flood pureforms to climb on, walk around and attack from walls, needs well hints
| giant | Consists of two sub-types: sector hints and rail hints, sector hints are used to define the area in which scarabs will pathfind (Used *with* scarab zones) and rail hints are used for the scarab to transition between different sectors, use right click to create vertices in the sector or the starting position of the rail and left click to seal the sector or end the rail, **see [the scarab usage guide ](~h3/guides/scarab) for more info about setting up scarab units for gameplay.**

| Jump hint flags | Description
|-------|----------
| magic lift  | Unknown/needs additional research
| vehicle only  | Unknown/needs additional research
| railing  | Treat this hint as a vault in which AI will try to vault over the obstacle using their vault animations
| vault  | Unknown/needs additional research

## Object hints

Objects such as [crates](~) have the ability to use dynamic hints such as vaulting, mounting and hoisting, these are defined by markers on the [render_model](~)

# Debugging

When spawning in AI, you may notice certain issues with them, among these are colored triangles above their heads: green means no objective set or no firing points available within the current task of that AI, yellow can appear if there's a rather limited number of firing points for the number of AI in the task, or if the AI cannot pathfind to the firing points.