---
title: Portals and clusters
thanks:
  Conscars: Writing this guide
---
The concepts of _portals_ (not to be confused with teleporters) and _clusters_ are a frequent source of difficulty and misunderstanding for new level artists. Let's demystify them so you can get the most from your levels.

# What are portals?
{% figure src="portals.jpg" %}
Rat Race's portals visible with `debug_pvs 1`.
{% /figure %}

[_Portals_](~scenario_structure_bsp#portals) are invisible "doorways" that divide a level's space into a series of closed room-like _clusters_, and are placed by artists when modeling the level in their 3D software.

[Portal rendering][wiki] is a common decades-old techique which Halo has adapted for its mixed indoor/outdoor levels. Imagine your home's interior as a 3D model with various rooms with doorways between them. How would you render a viewpoint from a given room?

1. You could render just the faces belonging to the current room, but you would miss parts of an adjacent visible room.
2. You could render all the faces in the house to make sure, but this isn't performant.
3. You could identify just the set of rooms that might be visible from the current room and render only their faces.

Option 3 is clearly the best, and since the scene is static (non-moving) you can precalculate which rooms are visible to each other through adjacent or even multiple doorways. This is called a [potentially visible set](~scenario_structure_bsp#potentially-visible-set) and it's [calculated by Tool][portal-pvs] when importing your BSP tag. It relies on your level effectively being a series of rooms (_clusters_) only connected by doorways (_portals_) and is part of the reason you follow the [sealed world rules](~bsp-troubleshooting#sealed-world-rules).

Halo further groups the faces within each cluster into [_subclusters_](~scenario_structure_bsp#tag-field-clusters-subclusters) contained within bounding boxes. It then uses [portal-based occlusion culling][portal-occlusion] to limit which subclusters and [objects](~object) in the PVS will actually get rendered based on the camera's location. This is still important to do even with modern hardware, and you can get a lot of benefit from just a few well-placed portals.

# What are clusters?
{% figure src="clusters.jpg" %}
The a30_a BSP divides its walkable outdoor space into 11 clusters, with various background sounds assigned to each (color coded). The surrounding space where the camera occupies is also a single large cluster.
{% /figure %}

[_Clusters_](~scenario_structure_bsp#clusters-and-cluster-data) are sections of your level, sealed by the level geometry and/or portals connecting to other clusters. Placing valid portals causes the level to be split into multiple clusters. A level without any portals usually has a single large cluster, or multiple clusters in the case of a level like Chiron TL-34 which has multiple completely separated rooms.

Each cluster can be assigned unique weather, sound environment, background sound, sky, and fog using [Sapien](~h1-sapien). Therefore portals are also an artistic tool that let you define areas of your map with differing environmental properties which will apply when the camera is in that cluster.

# Portal placement
To create portals you need to add extra geometry to your level's model with certain [material names or symbols](~h1-materials):

* The `+portal` material name creates normal portal planes suitable for a variety of locations, like outdoors, hallways, and doorways.
* The `+exactportal` material name requires the portal geometry to exactly follow the edges and vertices of a doorway it seals off.
* The `.` material symbol causes an existing material to also act like an exact portal, e.g. `floor_grate%.`. It's suitable when the existing material is always used in a way where it would form a good exact portal too, like floor gratings over sealed-off pits.

## Placement rules
You need to follow some rules when adding portal geometry, or else you will encounter [problems](~bsp-troubleshooting#portal-problems) when importing the BSP:

* There must not be any leaks around a portal, called "unearthed edges". They need to form a perfect seal against the level and/or other portals. Exact portals must follow the edges and vertices of a doorway, while regular portal planes can intersect the level like a knife to form their seal.
* All entrances to a sealed space must have portals. If you have a small base with 1 doorway and 2 windows, then you need 3 portals to seal off the interior space of the base from the outdoor space. These could be a mix a regular and exact portals.
* A single portal cannot seal multiple entrances and must separate exactly 2 spaces.
* Portals must not intersect each other, but can be connected to each other along their edges.
* Portals must be grounded to the level geometry in some way. Don't create floating cubes of portals which form an empty cluster in mid-air.
* Prefer portals which are perfectly coplanar (flat) since it will reduce the amount of portal data needed and help you avoid hitting limits, as well as prevent cases of [_Portal does not define two closed spaces_](~bsp-troubleshooting#error-portal-does-not-define-two-closed-spaces-yellow) errors.

# Related HaloScript
{% relatedHsc game="h1" tagFilter="portals" /%}

# External tutorials
{% dataTable
  dataPath="tutorials/tutorials"
  rowSortKey="updated"
  rowSortReverse=true
  columns=[
    {name: "Name", key: "name/en"},
    {name: "Description", key: "description/en"},
    {name: "Author(s)", key: "authors"},
    {name: "Last updated", key: "updated"},
    {name: "Links", key: "links/en"}
  ]
/%}

[portal-pvs]: https://www.youtube.com/watch?v=Mr1vHM0P8U4
[portal-occlusion]: https://www.youtube.com/watch?v=8xgb-ZcZV9s
[wiki]: https://en.wikipedia.org/wiki/Portal_rendering