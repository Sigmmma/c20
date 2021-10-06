# File List
| File Link                                                                                                         | Description
|------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------
[Multiple Skies Example Blend](https://drive.google.com/file/d/1GxyTNx5mcGwroXOfMEx6wANg5gxpYG4w/view?usp=sharing)  | A blend file showcasing how to use multiple skies in a scene.

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
You may be aware of weather polyhedra from previous games. This was a feature that allowed map designers to prevent weather effects from appearing in a certain section of level. I regret to inform you that this is not a feature in Halo 3. It seems to be have been deprecated during the switch from weather tags to atmosphere parameters.

# Multiple BSPs
It is common for singleplayer maps to have multiple BSPs. This helps manage game resources and avoid BSP limits for long missions. To accomplish this, place multiple `ASS` files in the same `structure` folder for the level. Each ASS will be compiled into it's own unique BSP tag for your scenario to use. Do not attempt to use multiple BSPs in an MP scenario.

# Object Symbols

# Portals

# Instance Geometry

# Infinite Water Plane

# XREFs

[wiki-polyhedron]: https://en.wikipedia.org/wiki/Convex_polytope


