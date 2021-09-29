# File List
| File Link                                                                                                         | Description
|------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------
[Multiple Skies Example Blend](https://drive.google.com/file/d/1k55u_cATxIHayTQeFGjXz58tlTpUuCV2/view?usp=sharing)  | The Blender application that we will be using to create our assets.
[Weather Portals Example Blend](https://drive.google.com/file/d/1Nfjg2E7CP_rxpt9UIshCljRT3pCMkfXD/view?usp=sharing) | A blend file showcasing how to use the special +weatherpoly material in a level.

# Multiple skies
It's possible to use multiple skies in your level by adding a digit to the end of your `+sky` material. If we wanted three skies in our level for example we would have the following:

```
+sky0
+sky1
+sky2
```

It's important that the digit at the end of the material starts at zero. The digit will be used as an index by the cluster to get a sky tag reference from the scenario skies tag block. You'll also have to make sure that a cluster does not use more than one sky or you will get an error on import.

If you were not aware, a cluster is a section of a level divided by a portal. In the case of the provided blend file above there are 7 clusters. If a map has no portals then there is one cluster. Be sure to also prevent multiple skies from being able to be seen by the player at once, or else the player will see a sudden transition between them when moving between clusters. Tool will output a warning if a sky can see another sky.

Avoid using trailing digits on non-sky material names, or you'll get tool warnings about duplicate shaders, and avoid numbers in shader tag names. Use letters instead if you need to make variants.

# Weather polyhedra
Let's say you wanted to have weather on the tutorial map. You may notice that either your weather effects go through the walls of your structure or that it instantly disappears the moment you enter the hallway. This can be quite jarring, so naturally there is a solution for this that mappers can implement.

The special `+weatherpoly` material can be assigned to [convex polyhedron][wiki-polyhedron] geometry to create a volume that hides any weather effects within the volume. You can see an example of this in blend file provided above.

You can compare the videos below to see the difference.

Here's what the hallway looks like without a weatherpoly volume.


The weather poly geometry is included in the BSP tag when you compile your [ASS][]. There can be a max of 8 on screen at any given time. Any weather polys that go over this limit will have no effect. Sapien will print a message in the console if you hit this limit.

# Multiple BSPs
It is common for singleplayer maps to have multiple BSPs. This helps manage game resources and avoid BSP limits for long missions. To accomplish this, place multiple ASS files in the same `structure` folder for the level. Each ASS will be compiled into it's own unique [BSP tag][scenario_structure_bsp] for your [scenario][] to use. Do not attempt to use multiple BSPs in an MP scenario.

# Object Symbols

# Portals

# Instance Geometry

# Infinite Water Plane

# XREFs

[wiki-polyhedron]: https://en.wikipedia.org/wiki/Convex_polytope


