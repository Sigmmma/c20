**Jointed Model Skeleton** (JMS) is the intermediate geometry file format used to import models into Halo's tag formats. Despite the name, it is used for _all_ types of models even if they aren't rigged, such as level geometry.

It is the target format when exporting from 3D editors like [Blender][] and [3ds Max][3dsmax] (using their respective addons), or after conversion from [FBX][using-fbx-in-h1a] using [H1A Tool][h1a-tool#creating-a-jms-file-from-an-fbx-file]. Using [Tool][h1a-tool], a JMS file is then compiled into one of Halo's geometry tags:

* [gbxmodel][] using `tool model`
* [model_collision_geometry][] using `tool collision-geometry`
* [physics][] using `tool physics`
* [scenario_structure_bsp][] using `tool structure`
