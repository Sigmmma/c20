```.alert
This guide assumes you have already [prepared Blender][blender-prep].
```

# File list
[End Result](https://drive.google.com/file/d/1GSaJ-JgygxatxY0dYsGC6WEojKAXnmfW/view?usp=sharing) -> The end product of this tutorial for you to examine and compare.

[Spartan Model](https://drive.google.com/file/d/1fbm6QT1tSGNw4cY_pxE1vZJCm2sw3-LF/view?usp=sharing) -> Spartan model that should be to scale with the ingame player.

[Warthog Model](https://drive.google.com/file/d/1rdBXdWcl2LOQpkD_-le4kpblXIJ9wNCm/view?usp=sharing) -> Warthog model that should be to scale with the ingame player.


# Introduction
Everything starts with an idea. Sometimes, however, we realize that we've made a terrible mistake just like this page I'm currently writing. Hello you, and welcome to the Halo CE level modeling guide. In this guide we will be showing you how to go about with creating your very own level geometry for Halo CE in the 3D modeling software app known as Blender. This guide will include a completed version of our work as an example for you to contrast and compare but be sure to follow along.

If there are any images that you find difficult to read then try opening the image in a new tab to view it in full resolution.

# Creation of a level directory
For the sake of organizing your asset files you should consider keeping all your source files in the same level directory used to create the level (.blend, .tif, .psd, .jms, etc..).

Tool.exe will search for subdirectories in the level directory that contain the raw asset data for compilation and eventually package the resulting assets from the raw data into a map cache file that can run in Halo CE. Any assets that you compile will end up in the tags directory plus the local path to the raw assets in the data folder. For example the file below...

```
(HEK Install Path)\data\levels\test\dreamer\models\test.JMS
```

has the compiled assets outputted to...

```
(HEK Install Path)\tags\levels\test\dreamer\
```

When creating a level the scenario tag will take the name of the folder containing the sub directories and raw assets while the structure BSP tag will take the name of the JMS file itself. Compiled scenario tags can then reference other tags for use in the level.

```.alert danger
The name of the level folder containing our sub directories MUST BE UNIQUE from any other level folder in the data/tags directory as will be explained later during the packaging section.
```

Let's first start by creating our very own level directory in the data folder. We'll call this level tutorial for simplicities sake but you can call it whatever you would like.

1. In the root of your HEK install find a folder named "data". If it does not exist then create it.

2. In the "data" directory find a folder named "levels". If it does not exist then create it.

3. In the "levels" directory find a folder named "test". If it does not exist then create it.

4. For our last step we will now create our first level in the "test" directory.

Your final path in Windows explorer should be something like this.

```(HEK Install Path)\data\levels\test\(My Level Name)```

Once this is done we will need to create 3 new sub directories in our level directory for the raw assets. The folders you will need are as follows...

1. bitmaps

	* Using the previous example the directory structure would look like this

		* ```(HEK Install Path)\data\levels\test\(My Level Name)\bitmaps```

	* The name here is just for organizing your images. The folder containing your raw image assets does not need to be named bitmaps but it will probably help. Like you probably already guessed this is where you will place your .tif files to compile bitmaps tags from. Keep in mind that when we talk about bitmaps in Halo we are not talking about images with a .BMP extension. We are talking about a tag type called bitmaps that stores image data for use in Halo specifically.

2. models

	* Using the previous example the directory structure would look like this

		* ```(HEK Install Path)\data\levels\test\(My Level Name)\models```

	* This folder name is something Tool.exe specifically looks for when compiling object meshes. Be sure that the folder is named exactly this. As you have probably already guessed this is where you will compile your example level from.

3. scenery

	* Using the previous example the directory structure would look like this

		* ```(HEK Install Path)\data\levels\test\(My Level Name)\scenery```

	* The name here is just for organizing objects used for the level. The folder containing your scenery does not need to be named this but it should help. As you have probably guessed this is where the raw assets for any level specific objects can be placed. This folder should probably contain multiple folders with their own sub directories for model and bitmap assets.

```.alert info
As stated before compiled assets will end up in a path that mirrors the path of the raw asset but replacing the data directory with the tags directory. A packaged map file will take the name of the scenario tag and placed in your game's map folder.
```

# Creation of a reference frame
In order to create a Halo level you first have to create a reference frame for all our geometry to be linked to. The reference frame is the origin for all objects in our scene.

```.alert danger
Be aware that once you have started to edit the level using the Halo level editing tool known as [Sapien][] you cannot move the origin of the reference frame. Changing the origin will cause all placed objects to move.
```

Any objects that are not a child of the reference frame are excluded from export. This helps the designer keep reference models for scale but not have to fumble around with deleting objects before export to prevent issues. This can also be used to remove objects from the reference frame to debug which object in particular may be causing an issue.

Keep in mind that in order for the exporter to write a JMS file successfully there must be a reference frame and at least one valid object in your scene linked to that reference frame. Not having any reference frames will return an error labeled...

```
No nodes in scene. Add an armature or object mesh named frame.
```

Having a reference frame but no valid geometry will also return

```
No objects in scene
```

In order to create a reference frame we must first add an object to our scene. The object can be anything that contains location and rotation data. In our example we will use a simple box mesh to represent the origin of our level. The origin of the mesh object will be what is used here so make sure it's center to your geometry.

consider placing the frame outside of the level you are creating as to not interfere with object selection or obscure geometry but this is up to your own preference.

To create a reference frame do the following:

1. [Add a cube object](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#new-object-meshes) to your scene.

2. [Change the name](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#set-name) of the object to "frame".

We can now [move](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#set-transform) the reference frame to it's new location. Your translation coordinates should read

X: ```0.0``` Y: ```1800.0``` Z: ```0.0```

```.alert info
The Reference Frame does not have to have a specific Material applied to it. The application of Materials in Blender will be discussed in a later section.
```

# Creation of a simple level
The following steps and example images will demonstrate the creation of a box that will serve as the tutorial level and will be utilized for all the subsequent tutorials.
When creating or starting out a level try and keep the level centered at the origin.  This can make the creation process much easier, such as when mirroring level geometry (such as team bases and other symmetric elements of the level).

The level must be a sealed. The level must be a contiguous structure that forms a sealed volume, the following rules are referred to as the Sealed World Rules:

* There must not be any open edges, the component parts or geometry of the level must match (edges and verts). There are some exceptions to the rule which will be covered in later tutorials and examples in later sections, but basically, anything that is solid (has to have collision with the player and vehicles) cannot have any open edges.

* The normals of the faces used to create the level geometry must face towards the playable area of the level or section of the level. The normals of the faces or polygons determine not just the face that will be rendered or seen by the player but also the surface to be used for collision and physics.

Additional information on the Reference Frame and Sealed World Rules and other technical rules or guidelines can be found under the Technical Rules discussion topic under the General Overview section under Multiplayer Level Design.

## creation of a simple box room

1. [Add a new box object](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#new-object-meshes)

2. Bring up the [properties panel](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#properties-window) and set it to the item tab.

3. Set the [location](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#set-transform) of the box to X: ```0.0``` Y: ```0.0``` Z: ```800.0```

4. The [dimensions](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#set-transform) for the Box can be manually set. The dimensions for the box that will be used are X: ```2400.0```  Y: ```3200.0```  Z: ```1600.0```

5. [Set the name](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#set-name) of the object to "level".

6. While having the box selected [change the context mode](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#context-mode) from object mode to edit mode

	* The following steps will make the box satisfy the Sealed World Rules and will link it to the frame, in effect making it a simple Halo level in terms of geometry.

7. [Flip all the normals](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#editing-normals) for the box inwards, the interior of the box will be the playable area of the level.

8. [Set context](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#context-mode) back to object mode if you haven't already.

9. [Set the parent](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#set-parent) of the box to the Reference Frame (frame).

```.alert info
The last object you selected is considered the active object and will be the parent of all other objects you have selected when doing Set to parent object.
```

# Application of materials
Before discussing and demonstrating materials and the application of materials to surfaces in the level, it is HIGHLY recommended that the Materials Overview section under the General Reference section be reviewed.  The information contained in the Material Naming Conventions and Rules as well as the names of Special Materials and special Shader Symbols of this section will be referenced in the following examples.

The following section will show you how to create new materials and use them across multiple objects properly. We will also show how to assign a texture to a material so that it displays on surfaces that have that material assigned. This is not necessary for exporting or the compiling of raw assets but it should help you visualize the look of your level in your scene. The only data exported to the .JMS is the name of our material and the path to the texture it has assigned if one exists. The name of the material is the only important bit here. The name of the material will be the filename tool.exe searches for when looking for a shader tag to assign to a surface.

Images assigned to materials can be used to examine generated UVs from your scene along with just checking out the aesthetics of your assets. Special materials like +sky or +portal do not have any use for assigned images. Consider instead using the diffuse color in the material nodes to display a solid color for all surfaces that have that material assigned in your scene.

Every face for the game level must have a material assigned to it (except for the Reference Frame as previously mentioned).

## Creating new materials

1. Select the box object (level) and navigate to the materials tab.

	* <a href="K.png" target="_blank"> <img src="K.png" title="Match the numbers in the image to the numbers in the list below." style="max-width: 400px; height: auto; "/> </a>


2. [Add a material](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#material-creation) named "+sky" to your box (level) object.

3. [Add a material](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#material-creation) named "example_tutorial_ground" to your box (level) object.

4. This is where we will assign a texture to our "example_tutorial_ground" material. Your material will need to have "Use Nodes" enabled in order to make use of textures.

5. [ Assign an image texture node](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#material-creation) to your material.

6. Once the image texture node has been assigned you should now see file directory options instead of a diffuse color option. We will be clicking on the button labeled "Open" and browsing to our HEK install directory.

7. Navigate to the following directory ```(HEK Install Path)\data\levels\test\tutorial\bitmaps```

	* <a href="N.png" target="_blank"> <img src="N.png" title="Match the numbers in the image to the numbers in the list below." style="max-width: 400px; height: auto; "/> </a>

8. Select an image texture to use for your material. In this instance we shall use example_tutorial_ground.tif.

9. Go ahead and click the button labeled "Open Image" to set the selected image to be used by your material. This completes the texture assigning process.

```.alert info
Material names in Blender must be unique. Blender does not allow for any duplicate material names in your scene. If you have an existing material named "test" and create a new material in another object named "test" then that material will be renamed to test.001. If you need the same material name then reselect it from the material dropdown.
```

```.alert info
Be sure to also not use a digit at the end of your material name unless you are specifically working with shader permutations. A shader with a digit at the end will have that digit culled on import.
```

```.alert info
Be sure to keep your material names lowercase as all tags paths in Halo should not make use of uppercase letters.
```

## Applying new materials

We will now be going over how to apply your newly created materials to faces in your scene.

1. Select the box (level) object.
	* <a href="O.png" target="_blank"> <img src="O.png" title="Match the numbers in the image to the numbers in the list below." style="max-width: 400px; height: auto; "/> </a>

2. [Change context mode](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#context-mode) from object mode to edit mode.

3. Make sure you are in [face selection](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#geometry-selection-type) so that you can properly select the object faces.

4. [Select all](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#select-all) faces of the cube except for the bottom area.

5. [Select the material](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#material-creation) named "+sky" from the materials list in the object.

6. Click the assign button.

7. Select the bottom face of the cube that we didn't assign +sky to.

8. [Assign the material](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#material-creation) named "example_tutorial_ground".

You've completed this section. There are two ways you can see what materials you have applied to your object surfaces. Read the section [here](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#viewport-shading) to see your options.

 Materials that have "Use Nodes" enabled and either define a texture or use base color for a diffuse will be displayed in the ```render preview shading```. Materials that have "Use Nodes" disabled can use ```solid shading``` and set the diffuse colors to differentiate materials but keep in mind that you will not be able to assign textures. You can switch between both to assign a diffuse and assign a texture when switching between solid and render. Most images in this guide will be using solid shading for rendering.

# UV mapping
Now that we have assigned our textures we can begin to modify the UV coordinates for our mesh to properly display our textures. Since we only have one material that makes use of the texture in the scene at the moment we will only need to modify the UV mapping coordinates for the surfaces that have "example_tutorial_ground" assigned to them.

Follow the instructions below to begin.

## Setting up a second viewport for UV editing

1. Lets start by [setting up our second window](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#viewport-editing) for UV mapping.

2. Go ahead and select [UV Editor](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#uv-creation) from the dropdown to switch the viewport to that editor type.

Now that you set up your scene there is one more detail you should be aware of. You may notice that if your viewport shading settings are set to this.

<a href="T.png" target="_blank">
	<img src="T.png" title="Settings that will render textures assigned to materials in solid shading." style="max-width: 400px; height: auto; "/>
</a>

You will not have to switch to rendered viewport shading to see your textures but you have to deal with image alpha. If you do not want to see the alpha you can disable it in the newly created UV window. Move your cursor over your UV editing window and bring up the [UV properties window.](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#uv-creation)

This will let you set some specific settings for your materials. Make sure to have a surface that has the "example_tutorial_ground" material selected in the viewport on the left so that we set the settings for the proper material.

<a href="U.png" target="_blank">
	<img src="U.png" title="Disable alpha so that the material isn't see through." style="max-width: 400px; height: auto; "/>
</a>

Change the setting labeled "Alpha" from "Straight" to "None".

## Editing UVs

Now that we can properly view our textures lets set up our UVs for the level. Have only the surfaces with the "example_tutorial_ground" material selected and do a quick unwrap.

Using the info you learned from [here](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#uv-creation), run a smart UV unwrap. Just use the default settings for the menu that pops up like you see in the example.

The result from that should be something that looks like this.

<a href="X.png" target="_blank">
	<img src="X.png" title="You can use smart UV project to quickly unwrap on object but you will eventually need to use unwraps and UV seams to manually fix certain objects. More on this in future sections." style="max-width: 400px; height: auto; "/>
</a>

# Assigning sharp edges
A key difference between work in Blender VS 3DS Max is that Blender does not have a smoothing groups feature. For our modeling work in Blender we must instead make use of sharp/smooth edges with an edge split modifier to properly set up our normals. Please be aware that options like auto smooth or shade smooth/flat will not have any effect on the resulting JMS.

The purpose of assigning sharp edges is to make our polygon count seem higher than it actually is or just design more aesthetically pleasing geometry. Geometry with properly set edges can have drastic effects on a piece of geometry. See the following examples.

<a href="Y.png" target="_blank">
	<img src="Y.png" title="These two meshes have the same number of faces yet look pretty different. More on this in future sections." style="max-width: 400px; height: auto; "/>
</a>

<a href="Z.png" target="_blank">
	<img src="Z.png" title="Assigning sharp edges and setting up a proper edge split modifier can help you get the look you need." style="max-width: 400px; height: auto; "/>
</a>

As you can see we have two cylinder objects that have the same number of faces but two different looks. The object on the left could be considered a pipe or a paint can while the object on the right could be a hex nut. Making proper use of sharp edges can get you the look you need for your objects.

Normals if it isn't clear is the direction the face or vertex is pointing in and directly affects the look of lighting and specular on our object. Lets go over how to set up some sharp edges for our level.

Firstly lets set shading to smooth so that we can see the effects of our sharp edges properly.

<a href="1A.png" target="_blank">
	<img src="1A.png" title="Lets set our shading to smooth." style="max-width: 400px; height: auto; "/>
</a>

1. Make sure you have the box (level) object selected. Now [set shading to smooth](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#set-shading)

The result should look something like this.

<a href="1B.png" target="_blank">
	<img src="1B.png" title="A blank canvas." style="max-width: 400px; height: auto; "/>
</a>

Now that we finished our work we can begin to mark the edges as sharp.

```.alert info
Do not worry about sharp edges for materials that are considered special materials such as +portal and +sky.
```

Follow the instructions [here](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#set-sharp-edges) for setting up the sharp edges on your geometry.

Now to see the results of our assigned sharp edges we will need an edge split modifier for our object. The next section will go over what you need.

## Assigning a modifier

Lets go over how to assign a modifier if you don't know how real quick.

<a href="1D.png" target="_blank">
	<img src="1D.png" title="There are lots of different modifiers that have all sorts of effects for your mesh. We are going to focus on edge split for now though." style="max-width: 400px; height: auto; "/>
</a>

Review the information found [here](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#assigning-a-modifier).

You will want to use these settings for your newly added edge split modifier.

<a href="1E.png" target="_blank">
	<img src="1E.png" title="Keep it clean!" style="max-width: 400px; height: auto; "/>
</a>

We are unchecking "Edge Angle" so that we don't split edges automatically based on degrees and only split based on what we have personally marked as sharp. Due to the level being a cube with only a flat plane as the ground for our level geo this option makes very little difference at the moment. This will be more important as we start to sculpt our geo in later sections to have hills and pits.

The modifier can also be permanently applied from this area. Simply click on the dropdown area and hit apply like so.

<a href="1F.png" target="_blank">
	<img src="1F.png" title="A blank canvas." style="max-width: 400px; height: auto; "/>
</a>

# Saving the level
It's probably a good idea to make frequent backups as you make progress just in case. Follow the instructions below to save a scene.

1. Go to File dropdown in the top left and click it.

2. Click on the menu item labeled "Save As".

3. A window named "Blender File Dialog" should come up. Navigate to ```(HEK Install Path)\data\levels\test\(Level Name)\models``` and set the name of the blend file to the name of your level. You'll remember that we created this directory in the [creation of a level directory](#creation-of-a-level-directory) section

4. Click on the button labeled "Save As".

You've now saved your level. The file as is will be used for future sections in this tutorial.

# End of basics

```.alert success
Once you've gotten to this point your level is ready to export. We will go over some more in-depth features in the [next section][level-creation-advanced] to help you design a more interesting map. If you do drop off at this point then keep in mind that any following sections will show the tutorial level in a different state than it was during the last section.
```
