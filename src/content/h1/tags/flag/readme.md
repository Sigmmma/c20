---
title: flag
about: 'tag:h1/flag'
img: flag.jpg
caption: CTF flags are the only use of flag tags in Halo 1.
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
  Conscars: Tag field testing
---
The **flag** tag describes the behaviour and appearance of a cloth-like material. As a type of _widget_, flags can be attached to objects like [weapons](~weapon) using [model markers](~gbxmodel#markers). They are not limited to weapons and can even be attached to [bipeds](~biped), however the game only supports rendering 2 flags.

They are essentially a grid of attached [point_physics](~) vertices forming a rectangular shape with configurable density and cell sizes. One edge is deemed the _attached edge_ and can have several [_attachment points_](#attachment-points) to the object, while the opposite edge is deemed the _trailing edge_ and flows freely. Because they make use of point_physics, flags are affected by [wind](~).

# Physics
The spaces between flag vertices are called _cells_ and have configurable [_cell width_](#tag-field-cell-width) and [_cell height_](#tag-field-cell-height). The cells try to maintain their size and are capable of stretching. Like [antenna](~antenna#physics), flags can make use of a variety of point physics features:

* If [_no gravity_](~point_physics#tag-field-flags-no-gravity) is set then the flag will float around rather than hang.
* If [_collides with structures_](~point_physics#tag-field-flags-collides-with-structures) is set, the points may inconsistently collide with the [BSP](~scenario_structure_bsp). Depending on the other settings, the flag may come to a rest on the BSP for a time before hanging through it. Collisions with [model_collision_geometry](~) seem to require much lower point velocities and are barely noticeable.
* [_Density_](~point_physics#tag-field-density) affects how "floaty" the points are. Low near-zero values will cause the flag to hang in the air, while higher values result in it falling more quickly.
* [_Air friction_](~point_physics#tag-field-air-friction) is especially important for flags given their interaction with wind and movement when carried.
* [_Elasticity_](~point_physics#tag-field-elasticity) determines the bounciness of collisions with structures, not how stretchy the flag is.

## Simulation culling
Flags are not simulated when off-screen (based on the [bounding sphere](~object#tag-field-bounding-radius) of their object). When they reappear you may notice a slight jiggle as they reach their rest state again.

# Attachment points
Along the _attachment edge_ of the flag you can define a series of 2-4 attachment points at a model marker. The flag's height will span these attachment points and be fixed in place at each of them, with a configurable number of cells between the attachment points. The markers used don't need to be unique; it would be possible for the leading edge to form a loop by reusing a marker for the first and final attachment points. The game requires that the sum of all attachment points' [_height to next attachment_](#tag-field-attachment-points-height-to-next-attachment) is 1 less than [_height_](#tag-field-height). The final attachment point should use height `0`.

{% figure src="attachments.jpg" inline=true %}
A 9x9 vertex flag with 3 attachment points at markers `flag top` (A), `flag bottom` (B), and `left hand cyborg` (C). A and B have _height to next attachment_ set to `4`.
{% /figure %}

# Shapes
This tag supports various shapes for the attached and trailing edges of the flag. Different [_trailing edge shape_](#tag-field-trailing-edge-shape) options result in the trailing edge of the flag being visually cut off (though the vertices still exist). The [_trailing edge shape offset_](#tag-field-trailing-edge-shape-offset) allows you to slide this mask along the width of the flag by a positive or negative number of vertices.

The [_attached edge shape_](#tag-field-attached-edge-shape) only supports _flat_ or _concave triangular_, and occurs between each pair of attachment points.

{% figure src="shapes.jpg" inline=true %}
Examples of various trailing edge shapes. The trailing edge offsets are `0` in most of these examples. In the bottom right image, an attached edge shape is used and the trailing edge offset is `-3`.
{% /figure %}

# Limits
The [game state](~game-state#datum-arrays) has only 2 entries for flags in all versions of H1, so any other flags on the map will not render.

# Related HaloScript

{% relatedHsc game="h1" tagFilter="flag" /%}

# Structure and fields

{% tagStruct "h1/flag" /%}
