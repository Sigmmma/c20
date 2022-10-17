**Jointed Model Skeleton** (JMS) is text-based geometry file format used when importing levels and models into Halo's tag formats. The file contains information such as vertices, normals, material names, UV coordinates, and rigging.

JMS serves as a common target from 3D editors. You can export JMS directly from [Blender][] and [3ds Max][3dsmax] using their respective community-made addons, or by first exporting to [FBX][fbx] and using Tool to [convert to JMS][h1a-tool#creating-a-jms-file-from-an-fbx-file].

Using [Tool][h1a-tool], a JMS file is then compiled into one of Halo's geometry tags. For example with H1:

* To [gbxmodel][] using `tool model`
* To [model_collision_geometry][] using `tool collision-geometry`
* To [physics](~h1/tags/physics) using `tool physics`
* To [scenario_structure_bsp](~h1/tags/scenario_structure_bsp) using `tool structure`

Starting with H2, the [ASS](~) format was introduced to replace JMS for level geometry specifically (though JMS is technically still supported). With Reach, Granny (GR2) is the new unified format instead.