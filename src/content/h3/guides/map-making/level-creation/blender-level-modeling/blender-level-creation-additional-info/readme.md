---
title: H3 Blender level guide - Additional info
keywords:
  - modeling
  - exporter
  - water
  - material symbols
  - object symbols
  - symbols
thanks:
  General_101: Writing this guide
  MercyMoon: Writing the Seams sections
  Crisp: Adding additional information on instanced geometry
  ShmeeGrim: Adding additional information about water
---
# File List
| File Link                                                                                                           | Description
|-------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------
[Multiple Skies Example Blend](https://drive.google.com/file/d/1DqdrsiNjLA20PeOLmGFNauaFg1M3_CWm/view?usp=sharing)    | A blend file showcasing how to use multiple skies in a scene.
[Portals Example Blend](https://drive.google.com/file/d/1fl1C5nudc9VzZ3NBqkMrH-lNWiohM_rY/view?usp=sharing)           | A blend file showcasing how to use the special +portal material in a level.
[Instance Geometry Example Blend](https://drive.google.com/file/d/1h7xZVafaPgFIvF0gHUQK1_G_IJ5R2q7v/view?usp=sharing) | A blend file showcasing how to use the instance geometry in a level.
[Water Visual Example Blend](https://drive.google.com/file/d/16Ew77K3itFb0a9lTrIU0-bFo3P14KRde/view?usp=sharing)      | A blend file showcasing how to create water in a level.
[Water Physical Example Blend](https://drive.google.com/file/d/1b0jP8e7-ohO9BEqOCbhXLgoemqKz2uTK/view?usp=sharing)    | A blend file showcasing how to create water in a structure-design file.
[Design Surfaces Example Blend](https://drive.google.com/file/d/1Zz1ELeQUMowB91_rDC-qUy3pkmT11JNu/view?usp=sharing)   | A blend file showcasing how to create barriers in a structure-design file.
[Seams Example Blend](https://drive.google.com/file/d/1PH0-JH7yQaTPDEMQ-U8jCfagD_Rfb--b/view?usp=sharing)   | A compilation of blend files showcasing how to create seams to connect bsps.

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
You may be aware of weather polyhedra from previous games. This was a feature that allowed map designers to prevent weather effects from appearing in a certain section of level. I regret to inform you that this is not a feature in Halo 3. It seems to have been deprecated during the switch from weather tags to atmosphere parameters.

# Multiple BSPs
It is common for singleplayer maps to have multiple BSPs. This helps manage game resources and avoid BSP limits for long missions. To accomplish this, place multiple `ASS` files in the same `structure` folder for the level. Each ASS will be compiled into it's own unique BSP tag for your scenario to use. Do not attempt to use multiple BSPs in an MP scenario.

# Object/Material Symbols
Object symbols are characters that go at the start of the object name.

| Symbol | Description
|------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| `#`    | Marker object prefix. Used to tell the JMS exporter that this object is to be treated as a marker. If used in an ASS file then tool will use the object for direction in structure-design files.
| `!`    | World node object prefix. Used to tell the JMI exporter that this object is to be treated as a world node.
| `%`    | Instanced object prefix. Used to tell the ASS exporter that this object is to be treated as instance geo.
| `@`    | Collision object prefix. Used to tell the JMI exporter that the object is to be written to a JMS containing only collision geometry.
| `$`    | Physics object prefix. Used to tell the JMI exporter that the object is to be written to a JMS containing only physics geometry.
| `~`    | Water group object prefix. If used in an ASS file then tool will use the object to generate water in a structure-design file.

Some symbols are specific when used in conjunction with instanced geometry

| Symbol | Description
|------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| `+`    | Static pathfinding prefix. Used in conjunction with the instance object prefix to tell tool how to handle pathfinding for this object. In the case of this symbol it will generate static pathfinding for the mesh.
| `-`    | None pathfinding prefix. Used in conjunction with the instance object prefix to tell tool how to handle pathfinding for this object. In the case of this symbol ignore the object while generating the pathfinding mesh (note AI will not attempt to walk around these meshes).
| `?`    | Light object per vertex. Used in conjunction with the instance object prefix to tell tool how to handle lighting for this object. In the case of this symbol it will set the geo to use per vertex for lightmap policy.
| `!`    | Light object per pixel. Used in conjunction with the instance object prefix to tell tool how to handle lighting for this object. In the case of this symbol it will set the geo to use per pixel for lightmap policy.
| `*`    | Render only prefix. Used in conjunction with the instance object prefix to tell tool how this object should be treated. In the case of this symbol it will set the geo to use only render geometry.
| `&`    | Chops portals prefix. Used in conjunction with the instance object prefix to tell tool how this object should be treated. In the case of this symbol it will set the geo to chop portals (as regular bsp geometry does).
| `^`    | Does not block AOE prefix. Used in conjunction with the instance object prefix to tell tool how this object should be treated. In the case of this symbol it will set the geo to not block area of effect damage.
| `<`    | Excluded from lightprobes prefix. Used in conjunction with the instance object prefix to tell tool how this object should be treated. In the case of this symbol it will set the geo to be excluded from lightprobes.
| `\|`    | Decal spacing prefix. Used in conjunction with the instance object prefix to tell tool how this object should be treated. In the case of this symbol it will set the geo to use decal spacing.
| `@`    | Instanced Geometry collision prefix. Used as a prefix for a child object of an instanced geometry object. In the case of this symbol it will override the collision of the parent object with its own collision mesh (note that you do not need the % prefix when using this).

Material symbols are located on the [H3 Materials page](~h3-materials#material-symbols).

# Portals
Portals are plane objects that cut through geometry to divide it into sections called clusters. This is either usually to enhance performance or section off a part of a level in order to set specific environment sounds or effects in that area. Portals are defined by the special material name `+portal`. Portals can also intersect without needing to be connected unlike CE. This makes it extremely simple to just generate a set of grid portals to quickly test high poly geometry before making better portals. See the `Portals Example Blend` and [Materials Overview](~materials) for examples.

![](portals.jpg "Portals! Not to be confused with the ingame portals.")

# Instance Geometry
Instance geometry is geometry that is linked and duplicated to cut down on used memory. It's also a decent way to avoid having to stich in geometry into your BSP. Think of it like scenery objects with lightmaps. The ASS exporter checks if an object is an instance by seeing if it has linked mesh data. They should also have the `%` symbol at the start of their object names. The only unique property that instance can have is uniform scale. All instances will otherwise look the same. See the `Instance Geometry Example Blend` for an example on how to use this.

Object data in Blender can be linked with the {% key "Ctrl" /%} + {% key "L" /%} hotkeys.

![](instancegeo.jpg "Copy pasta your geo for fun.")

# Infinite Water Plane
You may be aware of infinite water planes from Halo 2. This was a feature that allowed map designers to set an infinite water plane at a certain height in the level. I regret to inform you that this is not a feature in Halo 3. It seems to have been deprecated.

# XREFs

# Water
We will be using the end result of the level guide for this example but you can look at the completed files in the file list for the items listed here.

Water in Halo 3 is handled by two different files. The ASS file located in the level's `structure` sub directory will handle the visual aspects of our water plane while out of water. The ASS file located in the level's `structure-design` sub directory will handle things related to how our water region interacts with objects in the world. This includes actions such as objects floating on the surface and screen effects while the game camera is inside a water region. Lets go over setting up the visual aspect in the `structure` ASS file first.

## Visual
Starting with the visual aspects of our water, we will create a simple plane in our example level to represent the water in our game world. Do not worry about following the sealed world rules for now. We will be naming our new plane object `water_plane` and give it a Z height of -400 units. The plane should have a scale of `1000` units on the XYZ axis. We will also be giving it the following material name.

`river riverworld_water_rough'`

There are three aspects to this material name

* river - This is the shader_collection prefix that will be used to find the material name that follows after the space. In the case of the river prefix, that will tell tool to search for shaders in `levels\multi\riverworld` as set by the shader_collections.txt file in the `tags\levels` directory.
* riverworld_water_rough - The material name that will be used for the water on our level.
* `'` - This is a material symbol that lets tool know we are intending for this surface to be used as a water surface. This will help satisfy the sealed world rules for this mesh.

Once that is done go ahead and give the water plane four UV channels. The purpose of each UV channel are as follows:

* UV_0 - Used by the visual part of our mesh for displaying the texture.
* UV_1 - Used to mask the strength of displacement from the waves and the color of our water. Move your UV coordinates in the positive X direction to increase the displacement strength, and in the positive Y direction to make the water color more pronounced.
* UV_2 - Unknown. Possibly unused in the MCC version of the H3 engine, but it still needs to exist on the water mesh for the shader to read the correct UV indices.
* UV_3 - Used by the global shape texture. Unwrap this channel inside the 0-1 space.

## Global Shape Texture
The `global shape texture` is used as a mask for certain water characteristics. Using this texture, you can mask the strength of wave displacement, the strength of wave choppiness, and the opacity of the foam texture by painting in the R, G, and B channels of the image, respectively.

![](example_water_global_shape.jpg "Example global shape texture from riverworld")

This ends everything we need to create in our `structure` ASS file. We can export our current scene and move on the the `structure-design` ASS file in the physical section.

## Physical
Now lets handle our water regions properly. We will start by creating another plane in our example level to represent the water in our game world. Give it a Z height of -400 units and set the scale to `1000` units on the XYZ axis. Go into edit mode and extrude the object down around `-100` units so that it will reach the bottom of our example level. Make sure that the normals are facing outside/away from the center of our object. We will also be giving it the following object name.

`~water_physics00`

There are two aspects to this material name

* `~` - This symbol tells tool to treat the mesh as a water group
* water_physics00 - Just the name for our object. Call it whatever you would like. We will be using water_physics00 in this example.

Now that we've created a water region lets add another object to define the direction objects will flow in. You can skip this step if you do not want there to be direction in a body of water you make. Add an `Arrows` object found under the `Empty` list in the `Add` menu. Set the scale on this object to 600.0 units on the XYZ axis. We will also be giving it the following object name.

`#water_direction00`

* `#` - This symbol tells tool to use the object rotation for direction.
* water_direction00 - Just the name for our object. Call it whatever you would like. We will be using water_direction00 in this example.

We will be using {% key "Ctrl" /%} + {% key "P" /%} with both `#water_direction00` and `~water_physics00` selected with `~water_physics00` being the active object in our scene. This will set `#water_direction00` to use `~water_physics00` as it's parent object. Now we can rotate our `#water_direction00` to define the direction that objects will flow in with the X axis being forward in this case. Lets rotate it 90 degrees.

Now we can export these assets to an ASS file. The ass file we create from the meshes we created must go in a different subdirectory from the assets created in the `Visuals` section. The `structure-design` command will also be used instead of the standard `structure` command to compile our ASS file.

Once the ASS file is compiled, the water_physics00 can be referenced in the map's `sky_atm_parameters` tag under the `Underwater Settings` block to change the `Murkiness` and `Fog Color`. This is the color the player sees beneath the surface of the water. Additionally, the `sky_atm_parameters` tag is referenced in the `scenario` tag under the `Screen Effect References` block in the `atmospheric` slot.

# Design surfaces
Design surfaces are special surfaces that can be used to keep players in a set play space. These barriers do not affect AI and do not need to follow the sealed world rules. They can also be enabled or disabled with the script function `soft_ceiling_enable`.

There are three different types of surfaces.

```
+soft_ceiling
+soft_kill
+slip_surface
```

The following HS commands can be used to debug these.

```
debug_structure_soft_ceilings 1
debug_structure_soft_kill 1
debug_structure_slip_surfaces 1
```

## Soft ceilings
Objects that are set as soft ceilings will produce invisible barriers that prevent users from walking past the facing normal. If a user somehow ends up on the other side of one then walking near one will allow the user back into the play space. The format for these are as follows:

`+soft_ceiling:main_barrier`

There are four aspects to this name so lets break this down.

* `+` - Material symbol that lets tool know this is a special material.
* soft_ceiling - The type of barrier we wish to use for surfaces that have this material assigned.
* `:` - The separator between the barrier type and the name.
* main_barrier - The name for our barrier. This is what the user will give to the `soft_ceiling_enable` script function to disable it.

## Soft kill
Objects that are set as soft kill will produce invisible regions that kill the user once they enter it for longer than a second. The format for these are as follows:

`+soft_kill:death_barrier`

There are four aspects to this name so lets break this down.

* `+` - Material symbol that lets tool know this is a special material.
* soft_kill - The type of barrier we wish to use for surfaces that have this material assigned.
* `:` - The separator between the barrier type and the name.
* death_barrier - The name for our barrier. This is what the user will give to the `soft_ceiling_enable` script function to disable it.

## Slip surface
Objects that are set as slip surface will produce surfaces that cause players to slide back. This will prevent users from walking past the map boundary without making it too obvious that there is an invisible wall. The facing angle for faces marked as slip surfaces should be greater than 35 degrees. Tool will throw out an error otherwise and the surface will be disabled. The format for these are as follows:

`+slip_surface:slip_and_slide`

There are four aspects to this name so lets break this down.

* `+` - Material symbol that lets tool know this is a special material.
* slip_surface - The type of barrier we wish to use for surfaces that have this material assigned.
* `:` - The separator between the barrier type and the name.
* death_barrier - The name for our barrier. This is what the user will give to the `soft_ceiling_enable` script function to disable it.

[wiki-polyhedron]: https://en.wikipedia.org/wiki/Convex_polytope

## Seams

Seams connect BSPs together. Surfaces that are set as a seam surface will connect to another seam surface if the two surfaces are identical (including triangulation) and occupy the same space. The easiest way to do this in Blender is to use the magnetic snapping tool set to edge mode and sliding the surfaces together on an axis. A seam can only connect two BSPs.

![](example_seams_blender.jpg "You can use the magnet tool to easily align seams")

A seam can be made by creating a material called `+seam:example_seams_1`

* `+` - Material symbol that lets tool know this is a special material.
* seam - Tells Tool that this is a seam surface with this material assigned.
* `:` - The separator between the seam and the name.
* example_seams_1 - The name for our seam. This is what Tool will use to identify the seams in a bsp. It is usually the name of the bsp.

Once we have multiple bsps that seamed together properly, you can use Tool's `structure` command to import the individual .ASS files for each bsp.

Once all the .ASS files are imported, you can run `structure-seams levels\multi\example_seams` to create the `example_seams.structure_seams` file that will later be referenced in the `scenario` tag.

After the `example_seams.structure_seams` file is created, you might be asked to reimport the .ASS files. This varies depending on what bsps have seams. Reimport those bsps and continue.

Now the `example_seams.structure_seams` file can be referenced in the scenario under the `Structure Bsps` block. 

![](example_seams_scenario.png "Your structure seams should be in your scenario")

### Zone Sets

Now that seams have been added to the scenario, you must create `zone sets`. Zone sets specify which bsps will be loaded as a player progresses and can be triggered through scripting and trigger volumes. For example, if the player starts in `zone_set_a` that has `bsp_j` and `bsp_k` loaded, and the player progresses to `zone_set_b` that has `bsp_k` and `bsp_l` loaded, `zone_set_a` will switch to `zone_set_b`. There are also zone sets that have all bsps marked to be loaded at once for debugging purposes.

Create a zone set called `all` and check all the `bsp zone flags`. Save your scenario and open it up in Sapien.

![](example_seams_zonesets.png "This is how your zone sets should look")

In Sapien, zone sets can be switched by pressing `Ctrl+B` or going to `Edit > Switch Zone Set...`

![](example_seams_sapien.jpg "This is the end result in Sapien")
