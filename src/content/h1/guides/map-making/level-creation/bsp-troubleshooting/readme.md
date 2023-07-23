---
title: BSP troubleshooting
related:
  - /h1/tags/scenario_structure_bsp
  - /h1/tools/h1a-ek/h1a-tool
  - /h1/source-data/wrl
thanks:
  Hari: Reverse engineering the cause of T-junction warnings
  EmmanuelCD: Subcluster limits
  Kornman: Theorizing cause of floating point precision differences in MCC-era tools.
  Conscars: Documenting various problems and solutions
---
When compiling a level's [structure BSP](~scenario_structure_bsp) using [Tool](~h1a-tool#structure-compilation) you may encounter warnings or errors in Tool's output indicating problems with your model, for example:

```
### Warning found nearly coplanar surfaces (red and green).
### Warning found #1 degenerate triangles.
```

With some exceptions, Halo requires your BSP to be a completely sealed volume with no intersecting faces, open edges, 0-area faces, or other _non-manifold_ surfaces. It should not be too geometrically complex or too large. Many of these errors can also show up when compiling [model_collision_geometry](~) and the solutions will be the same. You should attempt to fix all errors and warnings in your map.

For most types of problems Tool generates a [WRL](~) file that can be imported back into your 3D software to find the sources of the problems. The path of this WRL file depends on if you are using Gearbox Tool or H1A Tool (see [WRL page](~wrl)).

Use this guide to understand how to avoid problems _before_ you start modeling and you will have an easier time getting your BSP in-game. This guide offers examples in [Blender](~), but the concepts are equally applicable to modeling BSPs in [Max](~3dsmax). Note that the shown model is triangulated during export to JMS and quads are used for modeling ease.

# General geometry problems
## Error: Edge is open (red)
An _open edge_ is one where the surface ends abruptly, like the edge of a sheet of paper. In other words, it is not shared between two adjacent triangles. The mesh must not contain any "holes" like this and must be a completely sealed/closed volume including faces for the sky (`+sky` material). It doesn't matter if the hole is completely airtight; if the edges are technically open then Tool will not allow it.

The exceptions to this rule are render-only surfaces like lights and water, and other special 2D surfaces like ladders, glass, and fog planes that are typically modeled as simple floating quads (a rectangle made of two triangles). If you are attempting to model one of these special surfaces, make sure you are including the [necessary material symbol(s)](~materials).

Closing open edges usually involves merging vertices. In Blender you can select multiple and press {% key "M" /%}, or use [_Auto Merge_][blender-tool-settings]   with snap to ensure vertices are merged when you move them to the same location as another vertex. Max users can use _Target Weld_.

![](open_edge.mp4)

## Error: Couldn't update edge (red)
This error indicates that an edge is shared by _more_ than 2 adjacent faces. This is usually seen where 3 faces meet and share a common edge. Like with open edges, render-only (`!`) and double-sided (`%`) faces don't count.

This is usually fixed by deleting any accidental leftover faces present after stitching together multiple objects (e.g. a base to the ground) and by avoiding connecting the edges of two shapes by a single edge.

Another common cause for this error is incorrect level [scale](~scale); Tool merges together vertices which are very close together (within 0.1 JMS units) and may interpret many faces as sharing a common edge when in Blender they don't. Remember that with default JMS export settings, 1 Blender meter = 1 JMS unit and the Chief is 70 JMS units tall. Make sure you are modeling the level at the correct scale

![](couldnt_update_edge.mp4)
![](couldnt_update_edge_2.mp4)

## Warning: Nearly coplanar faces (red and green)
This is one of the most common warnings map-makers will encounter. Let's first define coplanarity. If two faces are "coplanar" it means they are _on the same plane_; there is a flat infinite surface that both faces would perfectly lie on. Tool warns you when connected faces are _nearly coplanar_, meaning they are actually facing slightly different directions and the edge they share is a slight hill or valley.

Exact coplanarity is desirable because Tool will combine together adjacent coplanar faces into a single larger collision surface as an optimization. _Nearly coplanar_ faces are undesirable because they can cause a problem called [phantom BSP](~scenario_structure_bsp#collision-artifacts), including cases undetectable by [`collision_debug_phantom_bsp`](~scripting#external-globals-collision-debug-phantom-bsp) but which cause objects to fall back to [BSP default lighting](~object#shadows-and-lighting).

You should deal with this problem even though it's a warning. This is not to say all your cliffs need to be flat walls and the ground featureless, but just avoid very slightly deviations in angle from face to face. Any collection of faces which _should_ be flat, like walls and floors, should be aligned and coplanar.

To avoid this issue you can:

* Avoid "eyeballing it" when modeling things which should be straight and aligned. Use snap when moving vertices along an axis to ensure they align with others;
* Scale sets of faces which should be coplanar to 0 along an axis (see video);
* Avoid sculpting tools, which produce a lot of slight angles in dense geometry;
* Model with simple, low poly-count shapes.

In some cases having nearly coplanar faces is unavoidable. When faces are axis-aligned it is easy to make them coplanar, but when they are meant to be at an 45-degree or other angle you may encounter the nearly coplanar warning due to a loss of precision in the [JMS](~) format, which is only capable of storing up to 6 digits to the right of the decimal points (e.g. `123.123456`). This will result in vertices on angled surfaces going slightly out of alignment. In this case check for phantom BSP around the area identified in the WRL file. If any is found, you may be able to clear it up with simple triangulation changes or other minor alterations in the vicinity.

You should also avoid using the [Halo Asset Blender Development Toolset.](~halo-asset-blender-development-toolset) custom or world unit export scales when working with collision models/BSPs. Stick to JMS scale to avoid amplifying floating point precision inherent to the editor and causing the same issue as JMS precision loss.

![](nearly_coplanar.mp4)

## Error: Z-buffered triangles (red)
_Z-buffered triangles_ are when two triangles intersect each other rather than being connected by edges and vertices. This rule applies only to collideable geometry and not render-only geometry. The [WRL](~) error file represents this error as an edge along the intersection.

Modders who are used to working with other engines where this is allowed will probably find this restriction annoying, but it's a requirement for how Halo creates collision models. Avoid poking parts of your model through other parts without attaching them to form a continuous mesh.

![](z_buffered.mp4)

## Warning: Degenerate triangles (red)
A _degenerate triangle_ is one that has zero (or near-zero) surface area. In other words, it's not functioning as a proper triangle because all 3 of its vertices are in a line (colinear) or at a single point. The warning applies to both collideable and render-only geometry. When edges are below 0.1 JMS units in length, they will also collapse into a single point when compiled by Tool and cause this warning.

You can avoid this warning by avoiding:

* Extremely small or thin triangles;
* N-gons with colinear points (points which line up perfectly) since these may triangulate in a way that produces degenerate triangles.

Like with [_Couldn't update edge_](#error-couldn-39-t-update-edge-red), this warning can also be caused by improper level scale and may not actually be due to actual degenerate triangles.

![](degenerate_face.mp4)

## Warning: A surface clipped to no leaves (cyan)
This warning occurs when a collideable or render-only surface is _outside_ the BSP. It is usually a sign of an improper triangulation or modeling mistake and should be corrected, since the rationale is that if the player can't leave the level then they probably won't see or interact with such a surface anyway.

However, you might have legitimate reasons for putting render-only faces outside the BSP and ignoring this warning:

* The faces are visible through `+sky` and you do not want to expand the BSP to encompass them, e.g. to reduce [lightmap](~lightmaps) size.
* The faces are part of a larger render-only object which is only partially outside the BSP and removing the faces outside the BSP would be tedious or limit your ability to adjust the model later. Examples might be foliage or wires/cables.

![](surface_clipped_to_no_leaves.mp4)

## Error: Couldn't build BSP because of overlapping surfaces (orange)
This error indicates that two collideable surfaces are overlapping ([Z-fighting](https://en.wikipedia.org/wiki/Z-fighting)). They are on the same plane and are intersecting each other. This is not an issue for render-only geometry. It can happen for similar reasons to the [z-buffered triangle example](#error-z-buffered-triangles-red) or when special floating surfaces like ladders and glass are coplanar with walls. The solution is usually to move one of the overlapping surfaces slightly:

![](overlapping_faces.mp4)

## Warning: Found possible T-junction (pink)
This is likely a side-effect of other issues with your geometry. Correct them first and this should go away. On a more technical level, this warning happens when a leaf surface is colinear with a BSP2D plane. Such surfaces would have to be very narrow. If you are seeing a T-junction warning in isolation you should look for extremely thin or small faces and resolve them the same way as [degenerate faces](#warning-degenerate-triangles-red).

## Error: Vertex has a bad point
A vertex is too far away from the origin (0, 0, 0 coordinate). All points must be within -1500 and +1500 [world units](~scale) (-150000 and +150000 JMS units) in each axis. If you have encountered this error it means your BSP is too large and must be scaled down.

## Exception: bsp3d_plane_test_point(plane, point0, NULL)==_bsp3d_plane_test_on
In full, this rare exception appears as:
```
EXCEPTION halt in e:\jenkins\workspace\mcch1codebuild\mcc\main\h1\code\h1a2\sources\tool\import_collision_bsp\build_collision_geometry.c,#979: bsp3d_plane_test_point(plane, point0, NULL)==_bsp3d_plane_test_on
```
The likely culprit is that your BSP is **too large**. Scale it down to a reasonable playable size.

## Exception: global_plane_count < MAXIMUM_BSP3D_DEPTH
The collision BSP's role is to allow efficient lookups of collideable surfaces (e.g. where a projectile will impact) without the game having to test every single surface in the level. It does this by recursively organizing all surfaces under a tree of dividing planes, where at each branch the game checks only the surfaces in front or behind the plane. The more collision surfaces (triangles) your level has, the more planes are needed to organize them. Due to the way planes are chosen, certain shapes like spheres can also exacerbate the issue. This assertion failure happens when you reach the limit of dividing planes because your model is too complex.

You can attempt to pass the limit using H1A Tool's `-noassert` option, but will probably encounter the error _"Couldn't build leaf map"_ next. The best solution is to simplify your geometry and reduce polygon count. From the outset of modeling you should also avoid sculpting tools which generate geometry or heavy subdividing.

![](max_bsp_depth.mp4)

## Couldn't allocate subcluster
This error means you have too many triangles in a cluster (>16k). Simplify your level geometry or add portals to divide triangles among more clusters.

## Exception: dividing_edge->vertex_indices\[1]==NONE
In full, this exception appears as:
```
EXCEPTION halt in .\import_collision_bsp\build_collision_bsp.c,#1529: dividing_edge->vertex_indices[1]==NONE
```
The exact cause of this is unknown, but it _may_ be related to improper level scale or improper portal placement. Please contact a c20 maintainer if you encounter this.

# Portal problems
## Warning: Unearthed edge (magenta)
An _unearthed edge_ is where a portal's open edge is exposed within the BSP. It is similar to the [open edges error](#error-edge-is-open-red), but for portals. Portal edges should either extend through the BSP or be connected with another portal. If connecting the portal to another portal you must ensure that they are attached at vertices rather than simply touching.

![](unearthed_edge.mp4)
![](unearthed_edge_2.mp4)

## Error: Portal does not define two closed spaces (yellow)
This error is encountered when there are _more_ than two closed spaces ([clusters](~scenario_structure_bsp#clusters-and-cluster-data)) created by the portal. Portals must create only [two clusters](~scenario_structure_bsp#tag-field-cluster-portals-front-cluster). Some scenarios to avoid are:

* If two portals intersect without being attached at vertices then there are 2 clusters for each side of a portal, which is invalid. Portals should be connected to each other as if they were [exact portals](~materials#special-materials) connecting to map geometry.
* If a single portal passes through the BSP multiple times it could create more than two sealed spaces. Simply split up the portal into multiple portals.

![](portal_two_closed_spaces.mp4)
![](portal_two_closed_spaces_2.mp4)

## Warning: Portal outside the BSP (magenta)
This warning is pretty much what it sounds like -- a portal is completely outside the BSP and therefore serves no purpose. You can delete it or move it into the BSP:

![](portal_outside_bsp.mp4)

## Warning: Portal doesn't divide any space (green)
If you are seeing this warning you likely have other issues with your portals that need addressing first, such as portals outside the BSP or unearthed edges. This warning could not be reproduced in isolation even when placing portal planes outside the BSP, or coincident with its boundary or seamsealer.

# Other
## Two fog planes intersected in a cluster (black)
This error indicates that you have two fog planes in the same sealed space (cluster). Clusters are only capable of referencing a single fog plane, and only one fog plane can be rendered at a time. You should not only avoid having multiple fog planes within a cluster, but also within the same sealed section of the level no matter how many clusters it has (see ["two fog planes visible from cluster"](#warning-two-fog-planes-visible-from-a-cluster)).

Note that a fog plane which is not completely flat (not planar) will be counted as multiple fog planes because each triangle becomes its own fog plane.

![](fog_planes_intersected.mp4)
![](fog_planes_intersected_2.mp4)

## Warning: two fog planes visible from a cluster
Although you can add portals to ensure two fog planes are not in the same localized cluster and avoid ["two fog planes intersected in a cluster"](#two-fog-planes-intersected-in-a-cluster-black), Tool will still warn you when two fog planes are [potentially visible](~scenario_structure_bsp#potentially-visible-set) to each other. In this case Sapien will only allow the assignment of a fog palette to a single fog plane and only one will render in-game.

Consider combining together your fog planes into a singular plane. If this is not desirable because you want different fog palette assignments or fog planes at different heights then you will need to ensure the clusters which contain them are completely isolated from each other either by separating the BSP into two volumes (e.g. connected by a teleporter) or ensuring there is an indoor cluster between them by creating a series of long hallways that block visibility.

![](two_fog_planes.mp4)
![](two_fog_planes_2.mp4)
![](multiple_cluster_data.mp4)

## Warning: Cluster can see multiple skies
According to the [material naming conventions](~materials), you can reference multiple skies in a BSP by including a sky index in the sky material name, e.g. `+sky0`, `+sky1`, `+sky2`, etc. Similar to how a cluster cannot see multiple fog planes, a cluster cannot see multiple skies either. This warning will happen when you have a cluster with a mix of e.g. `+sky0` and `+sky1` faces or a cluster where both are potentially visible.

The solution is to either use a single sky or separate the clusters as seen in ["two fog planes visible from a cluster"](#warning-two-fog-planes-visible-from-a-cluster).

## Weather polyhedra not working
[Weather polyhedra](~scenario_structure_bsp#weather-polyhedra) are volumes within which [weather particles](~weather_particle_system) do not render. They are created by assigning the `+weatherpoly` material to faces which form a [convex volume][wiki-convex].

If you are finding that a weather polyhedron you created isn't working at all (weather still renders inside of it) then there are two possibilities:

1. The polyhedron isn't convex. A hypothetical ant standing on any side of the polyhedron should not be able to see any other side or face than the one it's standing on; the surface should always be curving away behind the "horizon" from the ant's point of view. Halo requires these weather-masking volumes to be convex so they can be represented as an efficient [series of planes](~scenario_structure_bsp#tag-field-weather-polyhedra-planes). Modify your polyhedron to be convex or split it into multiple which are.
2. You have more than 8 weather polyhedra _visible_ at the same time (you can have more than 8 total). Combine some together if possible or alter your level to not require so many.

![](weatherpoly_convex.mp4)

## Error: Couldn't allocate polyhedron plane
This error does not show up in [WRL files](~wrl), but it is usually easy to find. It means one of your [weather polyhedra](~scenario_structure_bsp#weather-polyhedra) has more than 16 sides. To be clear, this is _not_ a triangle limit for the polyhedron. One side of the shape might be comprised of multiple triangles, but as long as they are coplanar they will be treated as a single side. To resolve this error you can:

1. Simplify any polyhedra which have too many sides. Players will not notice if a polyhedra doesn't perfectly follow the contour of an overhang. As long as it generally hides rain and snow from under overhangs the effect will be convincing enough. Ensure any sides which are meant to be flat actually have coplanar faces.
2. Split the polyhedron into multiple more simple shapes. It is OK for the volumes to intersect, just stay within the 8 visible polyhedra limit.
3. Delete any sides of the polyhedra which are not necessary because they are outside the level and wouldn't usefully "contain" the masking volume. Polyhedra don't actually need to be sealed, in fact a single plane is valid.

![](weatherpoly_sides.mp4)

# JMS problems
## Error: reached end of file during parse
This means the JMS file was incomplete or improperly formatted. Tool expected it to have more data but the file ended. You should never see this error unless the JMS exporter addon/script you are using has a bug, in which case you should upgrade it to the latest version or use a different JMS exporter. This error has been known to occur with some 3ds Max scripts.

## Error: model file has wrong version number
Your JMS file was exported for the wrong game version (e.g. Halo 2). If using the [Halo Asset Blender Development Toolset](~halo-asset-blender-development-toolset), pay attention to the export settings and choose Halo CE.

# Radiosity problems
## Degenerate triangle or triangle with bad UVs (blue)
A _degenerate triangle_ error encountered during [radiosity](~h1a-tool#lightmaps) is due to a triangle being degenerate in UV space (texture coordinates). In other words, the triangle has zero surface area in UV space because all 3 vertices are in a line or the same location so the triangle's texture will appear extremely stretched. This by itself isn't a problem for radiosity, but when the corresponding material has the [_simple parameterization_](~shader#tag-field-shader-flags-simple-parameterization) flag enabled you will encounter this error, since that flag forces radiosity to use texture UV coordinates for lightmap UVs.

It is common for modeling operations like extruding and merging to produce degenerate/stretched UVs. You can use Blender's ["Correct Face Attributes"][blender-tool-settings] tool option to help avoid stretched UVs while modifying your model, or use a simple cube projection to unwrap faces during map development.

![](degenerate_uvs.mp4)

## Exception: !point_is_coplanar || _realcmp(transformed_point.z, 0.f, k_real_epsilon * 2)
In full this error appears as:

```
EXCEPTION halt in e:\jenkins\workspace\mcch1code-release\mcc\release\h1\code\h1a2\sources\structures\radiosity\intermediate_radiosity.c,#890: !point_is_coplanar || _realcmp(transformed_point.z, 0.f, k_real_epsilon * 2)
```

Tool is encountering a floating point precision problem, likely from your map being too big. This was less likely to occur in the legacy HEK because MCC-era tools use SSE2 which has [lower floating point precision][precision] than the x87 FPU. You can try working around this issue with `-noassert`.

## Exception: bitmap_format_type_valid_height(format, _bitmap_type_2d, height)
This means that radiosity has internally completed, but the final resulting lightmap texture dimension is larger than supported. This will happen if you have large continuous sections of your level that require a lot of lightmap space, possibly due to them using a high [radiosity detail level](~shader#tag-field-detail-level-high) and/or [simple parameterization](~shader#tag-field-shader-flags-simple-parameterization). Avoid this by:

* Making your level smaller.
* Introducing seams to large continuous surfaces, especially those with continuous UV unwraps and simple parameterization. This will let Tool treat the UV islands as different packable charts rather than a single larger one that needs to fit in a single lightmap page. These seams can be in UV space or through adding modeled details like short cliffs.
* Reducing radiosity detail level.
* Disabling simple parameterization where not needed.

## Error: smooth triangle group too big for page
An example error appears like:
```
radiosity error: smooth triangle group too big for page radon\levels\grounded\shaders\grounded_snow
EXCEPTION halt in e:\jenkins\workspace\mcch1codebuild\mcc\main\h1\code\h1a2\sources\structures\radiosity\intermediate_radiosity.c,#2311: surface_index==last_material->first_surface_index+last_material->surface_count
```

This likely has the same cause as [above](#exception-bitmap-format-type-valid-height-format-bitmap-type-2d-height); you have a smooth continuous area which should form a single lightmap chart but is too big to fit in a bitmap page.

## Warning: Clusters have no background sound or sound environment
During radiosity you may see this warning logged:

```
<number> clusters in structure_bsp <bsp-tag-path> have no background sound or sound environment.
```

It is totally harmless and just means you have not assigned [background sounds](~sound_looping) and [sound environments](~sound_environment) to all of your [clusters](~scenario_structure_bsp#clusters-and-cluster-data). This step is done in Sapien and is recommended but optional for your map.

# Unknown causes
{% alert %}
If you encounter any of these errors, please contact a c20 maintainer so examples can be added.
{% /alert %}

The following error messages were found in `tool.exe` but could not be reproduced in experiments:

* **Edge has more than four triangles (red)**: Attempting to cause this results in "couldn't update edge" errors instead.
* **Error: Edge is too short (red)**: Creating very short edges leads to degenerate face errors instead.
* **Warning: Found duplicate triangle building connected geometry (orange)**: Attempting to recreate only causes "couldn't update edge" errors. If you encounter this, probably something is wrong with your JMS exporter.

[blender-tool-settings]: https://docs.blender.org/manual/en/latest/modeling/meshes/tools/tool_settings.html#transform
[wiki-convex]: https://en.wikipedia.org/wiki/Convex_polytope
[precision]: https://en.wikipedia.org/wiki/SSE2#Differences_between_x87_FPU_and_SSE2