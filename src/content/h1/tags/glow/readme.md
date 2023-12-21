---
title: glow
about: 'tag:h1/glow'
img: glow.jpg
caption: The gold Elite's energy sword is the only use of glow tags in Halo 1.
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
  Conscars: Testing behaviour of tag fields and glow path creation
  Kornman: Limits and how path construction works in glow updates
---
**Glow** tags are an [object widget](~object#tag-field-widgets) used to create a particle-based glowing effect, where camera-facing sprite particles travel along and/or emit from a path defined by markers in the [gbxmodel](~). This tag is capable of much more complex effects than used in the energy sword, though has some known issues too.

# Particle types
Glows can contain two types of particles. _Normal particles_ follow the glow path and can be distanced from it radially, as well as animated in colour, speed, rotation, and distance. Once a normal particle reaches the end of the path they can bounce back or wrap to the beginning again. _Trailing particles_ are emitted at a given rate from a defineable segment of the path, either in random directions or vertically. They have limited lifetimes and can fade, scale down, and slow down over the lifetime.

In the case that the glow path is a single marker or the root node default, only trailing particles will be emitted from that single point.

# Glow path
The glow path is a smooth 3D spline connecting **up to 5** [object markers](~gbxmodel#markers) with the same name, determined by the [_attachment marker_](#tag-field-attachment-marker) field. Any more will be ignored. It's also possible to define a "path" of a single marker or leave the field blank to use the root node as the default, in which case only trailing particles can emit.

A model can have multiple sets of glow markers so multiple widgets can be added. For example, the energy sword has 5 `glow 1` markers for the upper blade and and 5 `glow 2` markers for the lower.

{% alert %}
Blender doesn't allow multiple objects to have the same name, so you will need to use the [Blender toolset's](~halo-asset-blender-development-toolset) marker name override feature. You can find it under the _Object Data Properties_ pane when an object's name begins with `#`.
{% /alert %}

![](glow_path.jpg "A glow effect with many pink particles shows how a smooth path is created between markers.")

**Marker rotation matters!** A marker's local +X axis (red) is its "forward" direction and +Z (blue) is "up". The ordering of markers is determined by how they point forward to each other in a chain (see [initialization](#initialization)). The up direction can matter for [_trailing particle distribution_](#tag-field-trailing-particle-distribution-emit-normal-up), and introducing twist to markers along the path allows for more complex radial rotations and "pinching" than can be achieved with [_effect rotational velocity_](#tag-field-effect-rotational-velocity) alone. Markers can also be slightly misaligned with the resulting path to create oval cross sections.

## Initialization
Since the markers all have the same name, the game needs to determine their actual ordering and the total path length at runtime in an initialization step. This step is only done once and not redone if the model animates its marker positions.

1. Get up to 5 markers from the model.
2. For each marker, find which other marker it points at the best to be its "next" marker. This is done using the highest dot product between marker forward and direction to another marker. Negative dot products are ignored, meaning any other markers "behind" it won't be the next.
3. Store a lookup table of marker indices in order in the glow effect's gamestate.
4. Calculate total length as the sum of segment lengths.

Improper placement and rotation of markers can lead to different failure modes:

* Crash of the game with exception when looking at the glow: `render_cameras.c,#1086: bounds->x0<=bounds->x1`.
* Game becoming unresponsive. This happens if markers form a closed loop.
* Some markers being unused.
* Paths looping back on themselves in unexpected ways.
* Sharp discontinuities at some markers in the smooth path.

Some general tips to avoid these issues are:

* Avoid high curvature.
* Point the +X axis of each marker in the path toward the next marker.
* Avoid circular loops.
* Don't use more than 5 markers.

{% alert %}
When creating glow paths it's helpful to set small [size bounds](#tag-field-particle-size-bounds), `0` [distance](#tag-field-min-distance-particle-to-object), and a high [particle count](#tag-field-number-of-particles) to make the curve easy to see. You should also enable `render_model_markers 1` so you can make sure all markers are being used as intended.
{% /alert %}

## Animation
Since markers can be parented to nodes and animated with a [model_animations](~), it's possible to have an animated glow path. The path will continue to be smoothly interpolated between the markers. Note that it's still possible to make the game unresponsive if some frames put the path into a bad shape.

# Limits
Glow particles are distinct from other [particles](~particle). Halo's [gamestate](~game-state) can store up to **512 glow particles**, which are shared across up to **8 glows**. Note that a single model with two glow widgets still counts as 2 glows. Each glow effect can have up to **5 markers** defining its path.

Be sure to budget [_number of particles_](#tag-field-number-of-particles) and [_particle generation freq_](#tag-field-particle-generation-freq) according to how many glows you expect will exist simultaneously. Although [normal particles](#particle-types) stop spawning once the limit is reached, creating too many trailing particles with long lifetimes will cause a crash:
```
EXCEPTION halt in c:\mcc\main\h1\code\h1a2\sources\objects\widgets\glow.c,#547: the map limit for the number of active glow particles has been reached
```

# Known issues
The glow functionality does not appear to be fully implemented by the engine. It's only used for the energy sword, which doesn't make use of all the features of the tag. See the tag structure descriptions below.

This effect does not render on first person models.

# Structure and fields

{% tagStruct "h1/glow" /%}
