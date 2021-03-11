

# File List
[End Result](https://drive.google.com/file/d/1GSaJ-JgygxatxY0dYsGC6WEojKAXnmfW/view?usp=sharing) -> The end product of this tutorial for you to examine and compare.

[Spartan Model](https://drive.google.com/file/d/1fbm6QT1tSGNw4cY_pxE1vZJCm2sw3-LF/view?usp=sharing) -> Spartan model that should be to scale with the ingame player.

[Warthog Model](https://drive.google.com/file/d/1rdBXdWcl2LOQpkD_-le4kpblXIJ9wNCm/view?usp=sharing) -> Warthog model that should be to scale with the ingame player.

# Introduction
Everything starts with an idea. Sometimes however we realize that we've made a terrible mistake just like this page I'm currently writing. Hello you and welcome to the Halo CE level modeling guide. In this guide we will be showing you how to go about with creating your very own level geometry for Halo CE in the 3D modeling software app known as Blender. This guide will include a completed version of our work as an example for you to contrast and compare but be sure to follow along.

If there are any images that you find difficult to read then try opening the image in a new tab to view it in full resolution.

# Setting Up Blender
[Installing the Blender addon](https://general-101.github.io/HEK-Docs/w/Plugin/Install/Install.html)

See the above link for setting up the Blender addon for exporting Halo assets if you haven't installed the addon already. Beyond that there may be a few other settings you may want to mess with before starting with any modeling.

## Undo Count
Consider increasing the number of edits you can undo in Blender by changing the setting in preferences. Be aware that increasing this setting will use up more of your system RAM. Don't have stats cause I'm not a nerd so go forth.

![](assets\A.png "Be sure to keep this value reasonable.")

## Hotkeys
There will probably be certain Blender functions you will be using over and over again so it's probably a good idea to setup some quick hotkeys for important functions.

## Unit Measurement
All units given in this guide are given with the expectation that your Blender instance is set to use metric units. If you haven't messed with this then it's already set to metric by default most likely. All units will also be given with the expectation that you are using global transforms.

![](assets\C.png "Use the default settings or I'm coming for those kneecaps")

## Scene options
An option added by the exporter to keep settings you don't need to care about hidden. Be sure to set game version to Halo CE as seen in the image below.

![](assets\D.png "This should help you stay focused on what matters to you.")

## Workspace
Since we are modeling lets be sure to pick the correct workspace for our work. Choose the "Modeling" workspace found in the top left by default.

![](assets\E.png "You don't need to see things like the timeline if you're just making a level so this should help.")

## Key Configuration

All hotkeys given in this guide are given with the expectation that you are using the default Blender 2.8 preset.

# Creation of a Level Directory
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

The name of the level folder containing our sub directories MUST BE UNIQUE from any other level folder in the data/tags directory as will be explained later during the packaging section
{: .danger}

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

As stated before compiled assets will end up in a path that mirrors the path of the raw asset but replacing the data directory with the tags directory. A packaged map file will take the name of the scenario tag and placed in your game's map folder.
{: .info}

# Creation of a Reference Frame
In order to create a Halo level you first have to create a reference frame for all our geometry to be linked to. The reference frame is the origin for all objects in our scene.

Be aware that once you have started to edit the level using the Halo level editing tool known as Sapien you can not move the origin of the reference frame. Changing the origin will cause all placed objects to move.
{: .warning}

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

The Reference Frame does not have to have a specific Material applied to it. The application of Materials in Blender will be discussed in a later section
{: .info}

# Creation of a Simple Level
The following steps and example images will demonstrate the creation of a box that will serve as the tutorial level and will be utilized for all the subsequent tutorials.
When creating or starting out a level try and keep the level centered at the origin.  This can make the creation process much easier, such as when mirroring level geometry (such as team bases and other symmetric elements of the level).

The level must be a sealed. The level must be a contiguous structure that forms a sealed volume, the following rules are referred to as the Sealed World Rules:

* There must not be any open edges, the component parts or geometry of the level must match (edges and verts). There are some exceptions to the rule which will be covered in later tutorials and examples in later sections, but basically, anything that is solid (has to have collision with the player and vehicles) cannot have any open edges.

* The normals of the faces used to create the level geometry must face towards the playable area of the level or section of the level. The normals of the faces or polygons determine not just the face that will be rendered or seen by the player but also the surface to be used for collision and physics.

Additional information on the Reference Frame and Sealed World Rules and other technical rules or guidelines can be found under the Technical Rules discussion topic under the General Overview section under Multiplayer Level Design.

## Creation of a simple box room

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

The last object you selected is considered the active object and will be the parent of all other objects you have selected when doing Set to parent object.
{: .info}

# Application of Materials
Before discussing and demonstrating materials and the application of materials to surfaces in the level, it is HIGHLY recommended that the Materials Overview section under the General Reference section be reviewed.  The information contained in the Material Naming Conventions and Rules as well as the names of Special Materials and special Shader Symbols of this section will be referenced in the following examples.

The following section will show you how to create new materials and use them across multiple objects properly. We will also show how to assign a texture to a material so that it displays on surfaces that have that material assigned. This is not necessary for exporting or the compiling of raw assets but it should help you visualize the look of your level in your scene. The only data exported to the .JMS is the name of our material and the path to the texture it has assigned if one exists. The name of the material is the only important bit here. The name of the material will be the filename tool.exe searches for when looking for a shader tag to assign to a surface.

Images assigned to materials can be used to examine generated UVs from your scene along with just checking out the aesthetics of your assets. Special materials like +sky or +portal do not have any use for assigned images. Consider instead using the diffuse color in the material nodes to display a solid color for all surfaces that have that material assigned in your scene.

Every face for the game level must have a material assigned to it (except for the Reference Frame as previously mentioned).

## Creating New Materials

1. Select the box object (level) and navigate to the materials tab.

	* ![](assets\K.png "Match the numbers in the image to the numbers in the list below.")

2. [Add a material](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#material-creation) named "+sky" to your box (level) object.

3. [Add a material](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#material-creation) named "example_tutorial_ground" to your box (level) object.

4. This is where we will assign a texture to our "example_tutorial_ground" material. Your material will need to have "Use Nodes" enabled in order to make use of textures.

5. [ Assign an image texture node](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#material-creation) to your material.

6. Once the image texture node has been assigned you should now see file directory options instead of a diffuse color option. We will be clicking on the button labeled "Open" and browsing to our HEK install directory.

7. Navigate to the following directory ```(HEK Install Path)\data\levels\test\tutorial\bitmaps```
	* ![](assets\N.png "Match the numbers in the image to the numbers in the list below.")

8. Select an image texture to use for your material. In this instance we shall use example_tutorial_ground.tif.

9. Go ahead and click the button labeled "Open Image" to set the selected image to be used by your material. This completes the texture assigning process.

Material names in Blender must be unique. Blender does not allow for any duplicate material names in your scene. If you have an existing material named "test" and create a new material in another object named "test" then that material will be renamed to test.001. If you need the same material name then reselect it from the material dropdown.
{: .info}

Be sure to also not use a digit at the end of your material name unless you are specifically working with shader permutations. A shader with a digit at the end will have that digit culled on import.
{: .info}

Be sure to keep your material names lowercase as all tags paths in Halo should not make use of uppercase letters.
{: .info}

## Applying New Materials

We will now be going over how to apply your newly created materials to faces in your scene.

1. Select the box (level) object.
	* ![](assets\O.png "Match the numbers in the image to the numbers in the list below.")

2. [Change context mode](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#context-mode) from object mode to edit mode.

3. Make sure you are in [face selection](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#geometry-selection-type) so that you can properly select the object faces.

4. [Select all](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#select-all) faces of the cube except for the bottom area.

5. [Select the material](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#material-creation) named "+sky" from the materials list in the object.

6. Click the assign button.

7. Select the bottom face of the cube that we didn't assign +sky to.

8. [Assign the material](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#material-creation) named "example_tutorial_ground".

You've completed this section. There are two ways you can see what materials you have applied to your object surfaces. Read the section [here](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#viewport-shading) to see your options.

 Materials that have "Use Nodes" enabled and either define a texture or use base color for a diffuse will be displayed in the ```render preview shading```. Materials that have "Use Nodes" disabled can use ```solid shading``` and set the diffuse colors to differentiate materials but keep in mind that you will not be able to assign textures. You can switch between both to assign a diffuse and assign a texture when switching between solid and render. Most images in this guide will be using solid shading for rendering.

# UV Mapping
Now that we have assigned our textures we can begin to modify the UV coordinates for our mesh to properly display our textures. Since we only have one material that makes use of the texture in the scene at the moment we will only need to modify the UV mapping coordinates for the surfaces that have "example_tutorial_ground" assigned to them.

Follow the instructions below to begin.

## Setting Up A Second Viewport For UV Editing

1. Lets start by [setting up our second window](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#viewport-editing) for UV mapping.

2. Go ahead and select [UV Editor](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#uv-creation) from the dropdown to switch the viewport to that editor type.

Now that you set up your scene there is one more detail you should be aware of. You may notice that if your viewport shading settings are set to this.

![](assets\T.png "Settings that will render textures assigned to materials in solid shading")

You will not have to switch to rendered viewport shading to see your textures but you have to deal with image alpha. If you do not want to see the alpha you can disable it in the newly created UV window. Move your cursor over your UV editing window and bring up the [UV properties window.](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#uv-creation)

This will let you set some specific settings for your materials. Make sure to have a surface that has the "example_tutorial_ground" material selected in the viewport on the left so that we set the settings for the proper material.

![](assets\U.png "Disable alpha so that the material isn't see through.")

Change the setting labeled "Alpha" from "Straight" to "None".

## Editing UVs

Now that we can properly view our textures lets set up our UVs for the level. Have only the surfaces with the "example_tutorial_ground" material selected and do a quick unwrap.

Using the info you learned from [here](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#uv-creation), run a smart UV unwrap. Just use the default settings for the menu that pops up like you see in the example.

The result from that should be something that looks like this.

![](assets\X.png "You can use smart UV project to quickly unwrap on object but you will eventually need to use unwraps and UV seams to manually fix certain objects. More on this in future sections.")

# Assigning Sharp Edges
A key difference between work in Blender VS 3DS Max is that Blender does not have a smoothing groups feature. For our modeling work in Blender we must instead make use of sharp/smooth edges with an edge split modifier to properly set up our normals. Please be aware that options like auto smooth or shade smooth/flat will not have any effect on the resulting JMS.

The purpose of assigning sharp edges is to make our polygon count seem higher than it actually is or just design more aesthetically pleasing geometry. Geometry with properly set edges can have drastic effects on a piece of geometry. See the following examples.

![](assets\Y.png "These two meshes have the same number of faces yet look pretty different")

![](assets\Z.png "Assigning sharp edges and setting up a proper edge split modifier can help you get the look you need.")

As you can see we have two cylinder objects that have the same number of faces but two different looks. The object on the left could be considered a pipe or a paint can while the object on the right could be a hex nut. Making proper use of sharp edges can get you the look you need for your objects.

Normals if it isn't clear is the direction the face or vertex is pointing in and directly affects the look of lighting and specular on our object. Lets go over how to set up some sharp edges for our level.

Firstly lets set shading to smooth so that we can see the effects of our sharp edges properly.

![](assets\1A.png "Lets set our shading to smooth")

1. Make sure you have the box (level) object selected. Now [set shading to smooth](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#set-shading)

The result should look something like this.

![](assets\1B.png "A blank canvas")

Now that we finished our work we can begin to mark the edges as sharp.

Do not worry about sharp edges for materials that are considered special materials such as +portal and +sky.
{: .info}

Follow the instructions [here](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#set-sharp-edges) for setting up the sharp edges on your geometry.

Now to see the results of our assigned sharp edges we will need an edge split modifier for our object. The next section will go over what you need.

## Assigning a Modifier

Lets go over how to assign a modifier if you don't know how real quick.

![](assets\1D.png "There are lots of different modifiers that have all sorts of effects for your mesh. We are going to focus on edge split for now though.")

Review the information found [here](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#assigning-a-modifier).

You will want to use these settings for your newly added edge split modifier.

![](assets\1E.png "Keep it clean!")

We are unchecking "Edge Angle" so that we don't split edges automatically based on degrees and only split based on what we have personally marked as sharp. Due to the level being a cube with only a flat plane as the ground for our level geo this option makes very little difference at the moment. This will be more important as we start to sculpt our geo in later sections to have hills and pits.

The modifier can also be permanently applied from this area. Simply click on the dropdown area and hit apply like so.

![](assets\1F.png "If you like what you see then you can make it a permanent addition to your geo.")

# Saving the Level
It's probably a good idea to make frequent backups as you make progress just in case. Follow the instructions below to save a scene.

1. Go to File dropdown in the top left and click it.

2. Click on the menu item labeled "Save As".

3. A window named "Blender File Dialog" should come up. Navigate to ```(HEK Install Path)\data\levels\test\(Level Name)\models``` and set the name of the blend file to the name of your level. You'll remember that we created this directory in the [creation of a level directory](https://general-101.github.io/HEK-Docs/w/Halo%201/H1%20Model%20Guides/My%20First%20H1%20Level/My_First_H1_Level.html#creation-of-a-level-directory) section

4. Click on the button labeled "Save As".

You've now saved your level. The file as is will be used for future sections in this tutorial.

# End of Basics
Once you've gotten to this point your level is ready to export. We will go over some more in depth features in the next section to help you design a more interesting map. If you do drop off at this point then keep in mind that any sections from here on out will show the tutorial level in a different state than it was during the last section.

# Modifying the Level
Lets paint some hills and gullies in our level to get out of this plane hell.

## Subdividing a Face

Assuming you still have your tutorial level loaded you can continue on from where we last left off.

![](assets\1G.png "Match the numbers in the image to the numbers in the list below.")

1. Select your box (level) object

2. [Change context mode](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#context-mode) from object mode to edit mode.

3. Set your [selection mode](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#geometry-selection-type)  to face selection.

4. Select the bottom of the box (level) object. Only the face that has your "example_tutorial_ground" material applied should be selected.

5. Drag your cursor over your 3D viewport and right click. It should bring up a [face context menu](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#geometry-context-menu).

6. Select the [subdivide](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#subdividing) option from the menu. Repeat this process 4 times to match our setup.

The end result of this should look something like this.

![](assets\1H.png "That's some view.")

You may have noticed that I am seeing through the object in this image. If you want to enable this then you can enable [backface culling](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#backface-culling) in shading options. You must be in the solid renderer for this option to work. You can also enable the xray option here to select faces through other faces. This will make working in backface culling mode less awkward.
{: .info}

![](assets\1I.png "I got xray powers and all I can do is this lousy geo stuff.")

## Creating the Border For Our Level

We will need to create some hills on the edge of our level that our players can't see past. We don't want them to be able to stare into the abyss and ruin their immersion after all.

![](assets\1J.png "Match the numbers in the image to the numbers in the list below.")

1. Select your box (level) object.

2. [Change context mode](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#context-mode) from object mode to edit mode.

3. Set your [selection mode](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#geometry-selection-type) to face selection.

4. Select two rows of quads on the west and east and select one row on the north and south.

5. Select the [move tool.](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#set-transform)

6. Move the planes to around 128 units up on the Z axis.

You can find the exact units you are setting during translation by looking in the top left by default. Should look something like the image below.
{: .info}

![](assets\1K.png "Depending on your setting this could be in any other corner. This is the default place for it though.")

# Using the Sculpting Tools
Lets get creative and use the sculpting tools to generate some details in our level.

The first step is the generate a mask for where we will be sculpting our hills. Lets start with the following.

![](assets\1L.png "Match the numbers in the image to the numbers in the list below.")

1. Ensure the steps from the [creating the border for our level](https://general-101.github.io/HEK-Docs/w/Halo%201/H1%20Model%20Guides/My%20First%20H1%20Level/My_First_H1_Level.html#creating-the-border-for-our-level) section is complete.

2. [Change context mode](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#context-mode) to sculpt mode.

3. Find the "Face Sets" dropdown option.

4. In the "Face Sets" dropdown there will be an option labeled "Face Set From Edit Mode Selection"

![](assets\1M.png "Match the numbers in the image to the numbers in the list below.")

## Sculpt Tool Settings
A couple of things to keep in mind while working in [sculpt mode](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#sculpting). If you don't see the tool settings for setting things like brush radius and strength then you'll want to right click the context option and set some settings there.

![](assets\1N.png "Should look something like this. Make sure the option labeled 'Show Tool Settings' is checked.")

From here we will change a few settings. You can choose to ignore these suggestions if you rather have them enabled.

1. You can disable symmetry for brush strokes. The symmetry option here will mirror your changes on the axis of your choosing. Can be a bit annoying when the work you're doing shouldn't be mirrored so go ahead and change this. For our setup we will disable symmetry completely. By default you should only have to click the X button to do this.
	* ![](assets\1O.png "Match the numbers in the image to the numbers in the list below.")

2. Set the axis that your sculpt goes in. You can lock all changes you make to a particular axis. In this case we will go with Z since we are making some hills.
	* ![](assets\1P.png "Match the numbers in the image to the numbers in the list below.")

3. You can set the direction of your sculpt to be positive or negative. In terms of directions this would mean either up or down respectively if you were doing changes locked to the Z axis.
	* ![](assets\1Q.png "Match the numbers in the image to the numbers in the list below.")

4. Change the radius of your brush so that you affect a larger area. The default is 50 units so we will change it to around 100 units.
	* ![](assets\1R.png "Match the numbers in the image to the numbers in the list below.")

## Editing the mesh
This is where the face set you created comes into play. We will be using it to hide the geometry we do not want to edit currently.

1. Drag your cursor over a patch of colored geometry that was generated from the face set.

2. Click the **H** key. This should [hide](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#hide) all geometry except for the geometry connected to the face set we currently hovering over.

3. Left click on the remaining geometry until you have hills you are satisfied with. You can always hit **CTRL + Z** to undo if you are unsatisfied with any of your work.

The end result should look something like the following image.

![](assets\1S.png "Lets paint some happy little hills.")

If you can't see your masks in sculpt mode then temporarily disable any modifiers you have until the job is done.
{: .info}

![](assets\1T.png "Clicking on the computer icon will hide it from the viewport. Reenable it once you're done.")

Lets add some final touches to the geometry we sculpted.

You can add another [mask](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#sculpting) for the interior geometry if you want to. Should help with the next few steps.

![](assets\1U.png "Consider setting up masks when you're sculpting.")

Use what you learned from the [sculpting](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#sculpting) instructions to create a small hill in the middle of the level.

![](assets\1V.png "Something like this should look nice.")

Consider raising the geometry on the -X axis like in the following image. This will give the play space in your level some more varied height.

![](assets\1W.png "Add some nice cover")

Mess with the edges of the map a bit to make it also look a bit more varied. Do not mess with the edge on the +X axis too much. We will mess with that in a bit.

![](assets\1X.png "I know it's a ring world but you don't want it to look that artificial.")

# Creating a Stream Bed
Lets finally take care of that area we didn't mess with on the +X axis. Select the faces seen in the following image.

![](assets\1Y.png "The selected area is where we will put down a small stream of water.")

Go ahead and use the [subdivide](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#subdividing) function on the selected faces again. Only one time so that we get the effect we need. The end result should look something like this.

![](assets\1Z.png "Now we have the amount of polygons we need to work with.")

Go head and select the vertices that are inside the dirt texture. Bring them down a few units on the Z axis using the [translation tool](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#set-transform). The end result should look something like this.

![](assets\2A.png "Now we have the amount of polygons we need to work with.")

Now go to the add tab and add a plane object like you did with the cubes. Make sure to set frame to be the parent on the plane object. Lets now move the object over to the stream bed and [scale](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#set-transform) it so that it covers it completely.

You will probably have to manually edit both the geometry of the level and of the stream for this to look correct. Lets go over some of the steps you will have to do.

1. Take your plane [scale](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#set-transform) it to properly cover the stream bed area.

	* ![](assets\2B.png "Look at the dimensions used in the image. Should be something like that.")

2. While having the plane selected, change your [context](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#context-mode) from object mode to edit mode. We will add 8 segments to our plane so that we can make it fit the stream a bit better. Use edge select and select only the sides of the plane. Run [subdivide](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#subdividing) around 4 times to get the 8 segments you need.

	* ![](assets\2C.png "Should end up like this.")

3. [Move](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#set-transform) the plane to somewhere a bit below the stream bed. You may have to edit the surrounding geometry to get this to look right.

	* ![](assets\2D.png "Should end up like this.")

4. Run a [smart UV unwrap](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#uv-creation) while you're here.

5. Edit the shape of the stream in edit mode to get it to fit the stream and get the texture to look like it's bending with the shape of the stream. This is why we created the segments a while back.

	* ![](assets\2E.png "Should end up like this.")

## Adding a Material

Lets add a material to our stream object. Go ahead and [add a new material](https://general-101.github.io/HEK-Docs/w/Blender%20Overview/Blender_Overview.html#material-creation) named "example_tutorial_stream". We need to also assign the texture this material is going to use so that we can see how our UVs will look.

Go ahead and set your base color to an image node and navigate to

```(HEK Install Path)\data\levels\test\(Level Name)\bitmaps```

Select the texture "example_tutorial_stream.tif" for your material.

Now due to it being a one sided plane that means it has open edges and does not follow the sealed world rules. In order to solve this we need to add a shader symbol to the end of our material name.

rename your stream material from...

```example_tutorial_stream```

to...

```example_tutorial_stream!```

This will set the geometry that has this material assigned to be render only. Render only here meaning that the geometry does not generate collision geometry and will not break the sealed world rules.

Now that we've set up our materials and textures lets make sure our UVs are correct.

## UV Mapping our stream

Go ahead and open a viewport for a UV editor if you don't have one open already. Once you have it open select all faces of the stream mesh with the **A** key. You should see the UV for the mesh in the UV editor now. Let's go over a few tools you'll need to know for manually adjusting UVs.

* The highlighted options are your selection modes like the ones found in edit mode. You can pick from vertex, edge, face, and island selection. We will go with island for this example.
	* ![](assets\2H.png "Should end up like this.")

* Some of the hotkeys you may be familiar with from edit mode work here as well. We can use the **R** key to rotate selected UVs. You can also use the **G** key to move the selected UVs and **S** to scale them. You can of course also hold **CTRL** while doing any of these actions to have fine control over them. Using the **X** or **Y** key while doing a transform will lock your transform to that axis.

Lets fix the UV for this stream mesh. If you were to look at it you probably have noticed that it appears stretched. We need to rotate it in the correct direction and scale it to fix this issue. Use the **R** key while holding **CTRL** to rotate it 90 degrees counter clockwise.

![](assets\2I.png "Should end up like this.")

Now make sure to scale it on the X axis to fit the texture. Press the **S** key to enter scale mode then press the **X** key to lock it to that axis. Click your **LEFT MOUSE BUTTON** to confirm your transform. Should end up with something that looks like this.

![](assets\2J.png "Should end up like this.")

Scale it again but this time on the Y axis. Repeat the steps from above but replace the **X** key with a **Y** key press. This should be the end result.

![](assets\2K.png "Should end up like this.")

## Final thoughts

The stream now has a material and mapping coordinates applied to it that once viewed in game will scroll and give the appearance of running water.
For additional water effects the stream bed will have a different material applied to it than the currently applied terrain material. Such additional water effects include: the sound of water splashing when the player runs through the water or stream bed, the water particle effects when the player runs through the stream or stream bed, and the explosion effects and particle effects that occur when such an event occurs in the stream.

It should be noted that the steam in the examples and tutorials is the simplest case of creating or "simulating" water.  Before continuing, a short discussion on water and water volumes and how they exist and behave in Halo is in order.

# Water and Water Volumes in Halo
Water in Halo is very simple, almost to the point where water does not truly exist (at least in the sense that most people that have edited or created water in other games are used to).  This is understandable since there are no specifically designed underwater missions or environments in Halo.  In the case of streams, the water is shallow and the player cannot get under the surfaces of the water and be completely immersed.  Couple these facts with the game play mechanic that the player in the role of the Master Chief has a self contained suit of armor and has no fear of drowning, there was no need for complicated underwater player behaviors, physics, and effects.

The majority of water encountered is in the form of simple streams.  This kind of "water" has 2 parts: a stream surface with a shader whose settings simulate a water surface (small waves, flowing water, etc...) and the terrain underneath which has specific settings so that when objects interact with the terrain water effects occur (particles, sprites, sounds, etc...) giving the appearance that the stream itself is water.  It is this kind of water that is demonstrated in the tutorial below.

There is one instance in the game where a large volume of water exists that the player can interact with or go "completely under water", this occurs for the island level in single player Halo, Silent Cartographer and in its multiplayer derivative, Death Island.

In this instance, the water is still very simple.  Just like the stream example, there are the water surfaces that have the water shader effects and the terrain or surfaces underneath that are setup to simulate water with the effects that occur when objects interact with these surfaces.  In the case of the water surfaces, these are defined with a .shader_transparent_water where as the streams use .shader_transparent_chicago or shader_transparent_chicago_extended shader tags.  The water is made to have no collision using the "!" Render Only Shader Symbol just as with the stream example below.

The combination of the .shader_transparent_water and water fog volumes described below determine additional game behaviors such as the ability of vehicles to travel over the water (Ghosts will eventually stop and sink).

For large volumes of water, a water fog volume is created.  This is done by adding the fog plane Shader Symbol "$" to the material names for the water surfaces, or a similar plane is created with another fog plane defined shader assigned to the surfaces of the plane.  The volume is defined to be a water fog volume by enabling the "is water" flag located in the .fog tag.

Fog planes or volumes (such as those seen throughout the game and in the chasm in the multiplayer level Gephyrophobia) as well as water fog volumes are all created in a similar manner.

Make a plane that covers the entire area and extends past the level borders (this plane does not have to follow the Sealed World Rules), face the normals for the faces of the plane upwards, apply a material with the fog plane symbol or use the +unused special material (this material has no collision nor will it draw) with the fog plane symbol (to create the material +unused$).  In Sapien, create a fog reference (a .fog tag that contains fog color and density as well as other properties) for the "fog palette" and then enter the volume and set the .fog palette entry to be applied to this volume.

The following procedures and example images will discuss the implementation of materials to achieve water effects.  The faces that compose the stream bed will be assigned a material that will give the stream the appearance of being water when the player and other game objects interact with it.

# Water Effects For Our Stream Bed
Now that we have our stream bed will we need to create a new material identical to our "example_tutorial_ground" material. The key difference between these two materials will be that their ingame physics material setting will be set differently. The "example_tutorial_ground" material will be set to dirt while the "example_tutorial_streambed" material will be set to water. A couple of things you might want to consider.

* You should triangulate your geometry so that you can get specific with how the new material will be applied. You can find the option here.
	1. Select your mesh objects and set their context mode to edit mode and set your selection type to face select.

	2. Go over to the "Face" dropdown

	3. While having all the faces in your mesh selected press the option labeled "Triangulate Faces"

You may need to edit the geo so that your stream looks correct. The end result of all this should look something like this.

![](assets\2M.png "Should end up like this.")

Once that's done you should create a new material named "example_tutorial_streambed" if you haven't already. We will start assigning this to the triangles that make up the dirt area in our stream. Should look something like this.

![](assets\2N.png "Should end up like this.")
![](assets\2O.png "Should end up like this.")

# Creation of a Simple Base Structure
This section of the guide will be covering how to create a simple structure from a mesh. This object will eventually be mirrored to have a base on the opposite end. We will cover this in future sections along with application of materials and UV editing for our structure.

## Adding a Reference Model
When creating a level, particularly indoor environments and\or buildings or structures, it is always helpful to have a scale reference.  The dimensions of various game elements of Halo, including the player dimensions, are available for reference in the Halo Player Statistics.

Another technique is to use a reference model. The file list in this guide has links to a reference model for the player (the Master Chief) and a vehicle (the Warthog) for use in Blender.  The following procedures will demonstrate how to add a reference model to our scene for use as scale reference for the creation of the base structure geometry. Here's how to do this.

![](assets\2P.png "Should end up like this.")

1. Find the "File" dropdown in the top left.

2. Click on the option labeled "Append"

3. A file browser dialog window should pop up. Navigate to some blend files that contain assets you would like to add to the scene.

Once you've found it then go ahead and click on the asset you've chosen. This will reveal the contents of the file to you.

1. Click on "Object"
	* ![](assets\2Q.png "Should end up like this.")

2. Select the object you want from the blend file's object list. In our case will we be picking the Cyborg.
	* ![](assets\2R.png "Should end up like this.")

3. With the object highlighted you can now press the button labeled "Append" to add it to your scene.

The Master Chief reference model will now appear in the level and can be moved and rotated as necessary. For this tutorial, the reference model will be moved to the southern dirt patch of the level where the base structure will be constructed.

Note that the model may appear below the terrain but will be selected, move the model up to make it visible.

The reference model will NEVER be linked to the reference frame and only exists as a reference tool. Since the model is not linked to the frame, it will never be part of the level and will never be exported. Therefore, the model can be kept in the .blend file and does not have to be deleted each time the level is exported to a .JMS.

The second image further explains the above procedures.

## Creation of The Base Structure Geometry

1. Go to the "Mesh" tab and add a cube shaped mesh.

2. Set the dimensions of the cube to X: 96.0 Y: 280.0 Z: 96.0

3. Select the edges along the Y axis and subdivide them.
	* ![](assets\2S.png "Should end up like this.")

	* ![](assets\2T.png "Should end up like this.")

4 Position the cube so that it's somewhat center of the dirt patch but closer to the middle. We will be doing X: 0.0 Y: -820.0 Z: 48.0

The box will now be manipulated to create a ramp and simple hallway.

1. Select the new box object you made and change your context from object mode to edit mode.

2. Merge the two edges facing the center of the map. Here's how to do that.
	* A: Use vertex selection for this. You'll need it to merge the vertices.

	* B: Start with the verts on the left side from top to bottom

	* C: While having your cursor over your 3D viewport hit the **M** key to bring up the merge menu. Select the "At Last" option from the menu.

	* D: Repeat this for the right side. The end result should look something like this.

	* ![](assets\2U.png "What a nice ramp there.")

Now lets create the hallways in our structure.

1. Switch to face selection and delete the faces on the sides of the cube along with the bottom. You can do this by having your cursor over the 3D viewport and pressing **X** to bring up a menu. Select the "Faces" option to delete the selected faces.

![](assets\2V.png "Cast it into the void")

Once that's done you can extrude the areas you made to generate the area we will use for our hallways.

1. Select the edges that belonged to the faces on the side of the structure and hit the **E** key then right click.

2. Press the **S** key to scale it and then press **X** to lock it to the X axis. Extend it around 3 units. Take this opportunity to also move the ramp forward a bit. The end result should look something like this.

![](assets\2W.png "Getting there.")

Now lets start with the internals. Consider bringing your reference model over to see how big the hallway needs to be to fit our players.

1. Select the left and right edge on both ends of the hallway.

2. Extrude them with the **E** key and right click once. Press the **S** key to scale it and then **Y** to scale it in the Y axis. Bring them in for around 0.4 units
	* ![](assets\2X.png "Get some door ways going")

3. Bring down the vertices on the top of the doorway like so.
	* ![](assets\2Y.png "We're gonna make some room to connect the top edge with our doorframe")

4. Select the top edges of the door frame and of the roof then hit the **F** key to fill it. You can do **ALT** + **Shift** while selecting an edge to quickly select the entire thing you need. Do each side individually to avoid the edges connecting to each other from opposite ends.
	* ![](assets\2Z.png "Now our doorframe is complete")

5. Select the edges on the left side of the door frame from both ends and press the **F** key to connect them. Repeat this process for each side until you have a hallway
	* ![](assets\3A.png "Lets make the actual hallway now")

6. Make sure the normals for the object are pointing in the correct direction. Use the "Recalculate Outside" from the "Normals" menu in the "Mesh" tab

7. Move the edges on the bottom a bit away from the center of the hallway. Select the edges and then hit the **S** key to scale and then the **Y** key to lock it to the Y axis. Move it around 1.2 units
	* ![](assets\3B.png "Lets make it look a tad bit more interesting to look at.")

## Creation of ladder guides and ladder faces

When adding ladders to a level, it is always good to provide some geometry that helps "guide" the player while getting on or off the ladder and that helps keep the player from falling off or shifting on the ladder as the player travels along the ladder face.

1. Go ahead and delete the back and top faces on the left and right.
	* ![](assets\3C.png "Should look something like this.")

2. Grab each edge on the back faces and press **E** to extend it then press right click. Press **S** to scale it and then **X** to lock it to the X axis. Pull the selected edges in about 0.5 units. Do each side individually to avoid any issues.
	* ![](assets\3D.png "The frame for our ladder.")

3. Repeat the previous steps on the new faces you made but move it for about 0.7 units on the X axis. Once it's done move it around 5 units in the Y axis
	* ![](assets\3E.png "Add some corners to funnel players into the ladder that will be placed here.")

4. Now Press **E** and right click then move it around 4 units on the Y axis
	* ![](assets\3F.png "The actual area for the ladder")

5. Go ahead and fill in the areas you deleted with the **F** key. Should end up like this.
	* ![](assets\3G.png "Lets add back the faces we deleted")

6. Select the back faces where the ladder belongs and press **SHIFT** + **D** to duplicate the selected faces. Move them around -2 units on the Y axis.
	* ![](assets\3H.png "The ladder faces itself")

## Creation of a teleporter gateway

1. Delete the face in the middle of the backside of the structure. We will be extruding the edges for our teleporter.
	* ![](assets\3I.png "Should look something like this.")

2. Select the left, right, and top edges of the hole you just made and press **E** to extrude it and right click. Press **S** to scale the selected edges for around 0.7 units. Once the scaling is done move the two vertices on the bottom so that they touch the floor again.
	* ![](assets\3J.png "Should look something like this.")

3. Select the left, right, and top edges of the hole again and press **E** to extrude it and right click. Move the selected edges around -20 units on the Y axis. Press **S** to scale the selected edges for around 0.8 units. Make sure the vertices on the bottom are touching the floor as well.
	* ![](assets\3K.png "Should look something like this.")

4. Select the left, right, and top edges of the hole again and press **E** to extrude it and right click. Press **S** to scale the selected edges for around 0.8 units. Make sure the vertices on the bottom are touching the floor one last time.
	* ![](assets\3L.png "Should look something like this.")

5. Select the edges on the left and right and press **E** to extrude it and right click. Move them around 30 units on the Y axis. Fill in the back and roof face from here.
	* ![](assets\3M.png "Should look something like this.")

Now that the gateway is done lets add the teleporter mesh real quick to finish this off.

1. While in edit mode on the structure (blue base) object add a plane object from the mesh menu. Adding a mesh while in edit mode will add that geometry to the current object instead of creating a new object. Drag that plane over to the teleporter gateway. Go ahead and rotate it and scale it until the plane fits the gateway entrance.
	* ![](assets\3N.png "Should look something like this.")

2. Select the top and bottom edges and subdivide twice to add a few segments
	* ![](assets\3O.png "Should look something like this.")

3. Move the edges around to give it some curvature.
	* ![](assets\3P.png "Should look something like this.")

4. Make sure the normals for the object are pointing in the correct direction. Select the entire structure and use the "Recalculate Outside" from the "Normals" menu in the "Mesh" tab

These faces will be made render only later when materials are applied just as the stream faces were and therefore these faces may have open edges since they will be non-solid (no collision).

The netgame flags required to make the teleporter work will be placed using Sapien and will be demonstrated in the Population section.

## Addition of lights to the base hallway

Lets create some faces in the roof of the hallway for lights.

1. Select the roof of the hallway and duplicate it. Scale the plane until it looks something like in the image below. Do this for both sides. Make sure to lower the plane on the Z axis to avoid z fighting.
	* ![](assets\3Q.png "Should look something like this.")

Note that these lights currently do not follow the Sealed World Rules since they have open edges. As was demonstrated with the creation of the stream in the level, these faces will be made "render only" and will have no collision once the appropriate material is applied to the faces.  These faces will then comply with the Sealed World Rules.

In this case, the light faces WILL be visible AND cast light for use in radiosity.  As will be covered in the Radiosity (Lighting) section, faces can emit light and not render, or render and not emit light, or both.

The Master Chief reference model was moved or hidden in the example image.

# Separation of the Level into Separate Mesh Objects
Before creating the materials for the base structure we created above and applying the materials, texture coordinates, and smooth/hard edges to the base structure mesh, the structure must be made part of the level and satisfy the Sealed World Rules.

There are several ways to build a level. It is perfectly valid to make the entire level a single object that satisfies the Sealed World Rules.

Since there are so many parts to a level and a level can become quite large and cumbersome to work with, it is very advantageous to separate the level into several objects. This separation of mesh parts greatly helps in the organization of the level and greatly decreases the cumbersome nature of dealing with a single large mesh when creating something as complicated as a game environment.

It is the latter approach that will be followed and demonstrated in the proceeding tutorials and examples.

When the level data is exported using the Blender toolset, only the vertices and subsequent face data (material name, image nodes, smooth/hard polys, texture coordinates, etc...) are exported. Therefore, objects that meshes are separated into only exist in Blender.  Because of this, as long as the vertices and related edges match exactly between the mesh objects (satisfying the Sealed World Rules), the exported data will reflect this.  The level will export and compile properly.

The following procedures and example images will demonstrate the merging of the base with the level terrain to create polygons to seal the world and to match the relevant vertices and associated edges.  The faces that compose the base will then be detached from the level mesh to create a separate object.  The base object will then be linked to the reference frame.

The following procedures and example images will demonstrate the merging of the base with the level terrain to satisfy the Sealed World Rules.

# Making the Base Structure Geometry Follow Sealed World Rules
Now that we've made our structure geometry lets make it something Halo would accept.

1. Start by selecting your level object and adding a boolean modifier to your modifier list.
	* ![](assets\3R.png "You can use a boolean to merge or remove geometry from intersecting objects.")

2. We will want to set up our boolean properly. Go ahead and click the black area in the object box and it will reveal a dropdown to select your object. Find your blue base structure object in this list and select it. You can also click the drop picker icon on the right of the black box and select your blue base structure object from the 3D viewport.

3. Now set the boolean to "Union" to cut out most of the geometry keeping our level from being valid.
	* ![](assets\3S.png "The results of the current step")
4. Apply the modifier to your geometry.

5. Clean up the leftover faces that it didn't get rid of such as the level faces from the interior hallway. You should triangulate the geometry so that you can delete the hallway faces properly.

Now that we've finished the boolean application you'll want to add a basic material to the base real quick. This will be important for later steps so don't skip it.

1. Select your base object

2. Add a material named "base" and make sure it's applied.

We will be using this unique material to select the faces in a later section.

Now lets join the level and base geometry to help make cleaning up triangles in the next section easier.

1. Select your base object.

2. While holding **CTRL** also select your level object.

3. **CTRL** + **J** to join the two objects as one.

Now lets go into edit mode on the object and do what we need to do.

Lets merge the verts first.

1. Select your level object and switch from object mode to edit mode.

2. Press **A** to select all faces in the level.

3. While having your cursor over the 3D viewport press the **M** key to bring up the merge menu and select "By Distance" or press **B**

Now you'll want to select the faces around the structure. Make sure to get in there and ensure you have everything selected. There may be some small triangles generated from the boolean modifier.

![](assets\3T.png "It's important then you select all the faces for the next step to work properly.")

While having your cursor over the 3D viewport press the **X** key to bring up the delete menu. Either select the "Limited Dissolve" option or press the **L** key. You don't need to mess with any of the options so you can just triangulate the geometry to see how the wireframe ended up.

Once that's all done you can go into edge select mode and press the **PRINT SCREEN** key to run "Select Non Manifold".

![](assets\3U.png "What it should look like.")

If the only things that light up match the image then you're good. Otherwise try running the laid out steps again until it matches.

Now that we've cleaned up the triangles and made sure our geometry is sealed we can make the base object separate once more.

Go into face selection and select one of the base faces. Press the key combo **SHIFT** + **G** to open the "Select Similar" menu. This is where that material you made will come in handy cause otherwise you're gonna have to select all the faces of the base manually. Select the material option from the menu so that the base gets highlighted and while having the cursor over the 3D viewport hit the **P** key and then select "Selection" or press **S**. For the final step make sure to rename level.001 to "blue base"

# Application of Materials to the Base
Now that the blue base has been separated into a separate object, we will start creating materials for our base object.
The following steps and example images will demonstrate the application of our new materials needed to complete the base structure.

Start by creating the listed materials in your base object along with assigning the texture we will be using for the material. Just like before you can find these images in...

```(HEK Install Path)\data\levels\test\tutorial\bitmaps```

| Name | Diffuse Map (.tif file) |
| ---- | -----|
| example_tutorial_metal | example_tutorial_metal.tif |
| example_tutorial_panels | example_tutorial_panels.tif |
| example_tutorial_metal_floor | example_tutorial_metal_floor.tif |
| example_tutorial_plate_floor | example_tutorial_plate_floor.tif |
| example_tutorial_ladder%^ | example_tutorial_ladder.tif |
| example_tutorial_lights_blue! | example_tutorial_lights_blue.tif |
| example_tutorial_lights_red! | example_tutorial_lights_red.tif |
| example_tutorial_teleporter! | example_tutorial_shield.tif |

Note that the Shader Symbols have been included.  The material example_tutorial_ladder%^ demonstrates that materials can have multiple Shader Symbols applied.  In this case the ladder material has been made viewable from both sides or two-sided using the % symbol and has been made a ladder or climbable by the player using the ^ symbol.

The .tif files listed above were included with the Halo PC End User Editing Kit.

As before, the completed or provided example resources will be used for the following examples for the sake of simplicity.

Lets now apply the materials we created to our structure geometry.

* Select all the faces that make up the teleporter gateway and assign it the "example_tutorial_metal" material.
	* ![](assets\3V.png "What it should look like.")

* Select all the faces that make up the interior hallway ceiling and assign it the "example_tutorial_metal" material.
	* ![](assets\3W.png "What it should look like.")

* Select all the faces that make up the interior hallway side walls and assign it the "example_tutorial_metal" material.
	* ![](assets\3X.png "What it should look like.")

* Select all the faces that make up the exterior walls of the structure and assign it the "example_tutorial_panels" material.
	* ![](assets\3Y.png "What it should look like.")

* Select all the faces that make up the interior hallway floor and assign it the "example_tutorial_metal_floor" material.
	* ![](assets\3Z.png "What it should look like.")

* Select all the faces that make up the top faces of the structure along with the ramp and assign it the "example_tutorial_plate_floor" material.
	* ![](assets\4A.png "What it should look like.")

* Select all the faces that make up the ladder planes and assign it the "example_tutorial_ladder%^" material.
	* ![](assets\4B.png "What it should look like.")

* Select all the faces that make up the light planes and assign it the "example_tutorial_lights_blue!" material.
	* ![](assets\4C.png "What it should look like.")

* Select all the faces that make up the teleporter planes and assign it the "example_tutorial_teleporter!" material.
	* ![](assets\4D.png "What it should look like.")

# Unwrapping the Base
Now that we've set up the materials on our faces we can start working on UV unwrapping the structure object so that our textures look nice.

Another feature that we should introduce here is UV seams. Seams help you split up UV faces when you run an unwrap to fine tune the results. Start with the following...

1. With the blue base structure selected, change your context from object mode to edit mode and enable edge selection.

2. Select the highlighted edges as seen in the following image.
	* ![](assets\4E.png "What it should look like.")

3. While having your cursor over the 3D viewport, right click to bring up the edge context menu. From there you should select the option labeled "Mark Seam". The edges you have selected should turn a red color once you're done.

## Why use seams
Seams help you split up the UVs to finely edit your texture coordinates. See the two images below to see a comparison between geometry using no seams VS seams.

![](assets\4F.png "No seams used in this image.")
![](assets\4G.png "Seams used in this image.")

You can think of seams like the creases in a piece of paper used to shape an origami piece.

## Starting our Unwrap
With the previous section in mind lets unwrap the teleporter gateway and scale the created UV by around 2 units.

![](assets\4H.png "What it should look like.")

Scale the interior hallway ceiling UV so that it resembles something like this. The **N** key was used in the UV viewport to bring up the UV vertex menu. This will give us more fine control over the texture coordinates.

![](assets\4I.png "What it should look like.")

Scale the interior hallway side wall UVs so that it resembles something like this.

![](assets\4J.png "What it should look like.")

Scale the exterior wall UVs so that it resembles something like this. 12.3 units was used for the scale in this image.

![](assets\4K.png "What it should look like.")

Scale the interior hallway floor UV so that it resembles something like this. The **N** key was used in the UV viewport to bring up the UV vertex menu. This will give us more fine control over the texture coordinates.

![](assets\4L.png "What it should look like.")

Scale the roof and ramp UVs so that they resemble something like this.

![](assets\4M.png "What it should look like.")

Run a smart UV unwrap on the ladder plane UVs so that they resemble something like this.

![](assets\4N.png "What it should look like.")

Scale the light plane UVs so that they resemble something like this.

![](assets\4O.png "What it should look like.")

Scale the teleporter plane UVs so that they resemble something like this.

![](assets\4P.png "What it should look like.")

## Setting Up Our Sharp Edges
Lets set up sharp edges for our structure. We are going to use an option that will quickly select all edges it deems sharp based on angle and then set those to sharp.

Start by navigating to the "Select" tab and finding the "Select Sharp Edges" button.

![](assets\4Q.png "This should help things go by faster")

Be sure to be in edge select mode before selecting it. Certain edges in your object should now be highlighted like below. Lets add and remove a few edges. Add the edge where the top of the ramp meets the top structure faces. Remove the edges that curve into the structure near the ladder. Should look something like this.

![](assets\4R.png "Should have all the edges you need selected.")

Go ahead and mark these edges as sharp through the edge context menu. The edge split modifier will take care of the rest.

# Creating the Opposing  Base Structure
Now that the blue base structure has been completed, it can be copied and used to construct a second base structure on the opposite end of the level. We will be using a mirror modifier to generate a structure on the opposite side of the Y axis to quickly construct a base for our red players.

1. Start by selecting your blue base structure object and adding a mirror modifier to the object.

2. Set the mirror modifier to these settings. This will create a mirror of the structure of the Y axis. Once it's set, apply the modifier to make it a permanent addition.
	* ![](assets\4S.png "What it should look like.")

Select all of the faces of the newly created structure. You can quickly do this by hovering your mouse over sections of the structure and pressing the **L** hotkey to select linked geometry. Once that is done hit the **P** key and then select "Selection" or press **S**. Once you've finished separating it you can rename the object to "red base".

Repeat the process you went through with the blue base to make the red base follow the sealed world rules. If the boolean modifier doesn't cut through the geometry properly then extrude the bottom of the base and bring it down in the Z axis so that it intersects with the level geometry.

Once that's done go into the red base structure and change the lights in the interior hallway from "example_tutorial_lights_blue!" to "example_tutorial_lights_red!". You will have to edit the UVs so that they fit the texture image for your new material

Make sure both base structures are children of your frame object so that they are included in export.

# Player Clipping Techniques
It is sometimes necessary to create additional collision geometry in the level that prohibits the ability of the player to reach certain areas of the level or to help smooth the movement of the player around certain geometry. This technique is sometimes referred to as "player clipping". Geometry that is not rendered, but only affects the player and vehicles is added to the existing geometry of the level.

Restricting access to certain areas of the level such as the tops of canyon walls, roofs of structures, pillars, etc... can be crucial in creating a good game play experience. The player must not be allowed to exploit the game environment and break the game mechanics.  A good example are the Capture the Flag (CTF) game modes in Halo, if a player has the flag and can take it to an unexpected area where it is easily defended or they cannot be reached, this breaks the game. Fortunately, Halo does have mechanisms to help when objectives such as the flag or oddball get into odd areas, these items will eventually respawn or reset after a specific amount of time.

Restricting the player is also often used to keep the player from seeing "behind the scenes" of the level by preventing the player from seeing past the edges or over the tops of the core geometry of the level, typically where the level geometry for the terrain mesh intersects with the faces used to render the sky model or sky box.

The following tutorials will discuss the uses of and demonstrate the creation of the player clipping material and the implementation of player containment or player clipping.

1. Select the edges of the entrance to your teleporter gateways and press the **F** key to create a face. Go ahead and separate it from the base mesh.
	* ![](assets\4T.png "What it should look like.")

2. We will be creating a wall that surrounds the level so that players can't walk to the very edge and stare into the abyss. Start by deleting the top face of your sky mesh to open the level up. You'll need this for the new faces you'll create.
	* ![](assets\4U.png "What it should look like.")

3. Do you remember that row of faces we raised before in [Creating the Border For Our Level](https://general-101.github.io/HEK-Docs/w/Halo%201/H1%20Model%20Guides/My%20First%20H1%20Level/My_First_H1_Level.html#creating-the-border-for-our-level) section. We will be selecting the edges of that to form a wall.

4. Once it's selected press the **E** key to extrude your selection. Press **Z** to lock movement to the Z axis and move it up to around the same height as the skybox currently is.

5. Press the **S** key to scale the edges and lock it to the Z axis. Scale it so that the units read 0.0 units. This will make the edges you just raised flat along the Z axis.

6. Set the Z coordinates for the selected edges to a value of 1600.0 units. You can do this through the properties panel.

7. Dissolve any vertices on the top besides the corners. We won't be needing them.

8. Fill in the hole you created and apply the "+sky" material to the geometry once more. You can use "Bridge Edge Loops" in the "Edge" tab to help you with this. Separate the faces you raised from the border like with the teleporter gateway faces.

Go ahead and join the teleporter gateway faces and wall you just created to form one object. Rename this object to "player_clip". Remove all materials from the object with the "-" symbol in the material list and add a new one. Name this material "example_tutorial_playerclip*". You can use the texture named example_tutorial_playerclip.tif for this material.

Notice the "*" Shader Symbol which denotes that this material will be treated by Tool and the game as collideable only, it will not render in the game. Now that you've finished this you have completed the player clip mesh be sure to leave plenty of room in the Z axis by moving the skybox up. You'll want room for things Fuel Rod Gun to arc or vehicles such as Banshees so that they don't collide with the skybox collision ingame

# Placement of Portals
The final step to completing the core geometry for the level is the addition of surfaces or planes that define portals. These portals are used by the engine for several purposes. The primary function of these portals are as "visibility portals", portals that the Halo game engine uses to try and cull out objects that cannot be seen to improve performance by not rendering such objects.

The portals in general help break up the level so that it can be handled in parts to help performance in general. Attributes can also be set for portals, such as ambient sounds to play in the portal as well as environmental audio effects. Portals can also be used to define weather volumes and fog volumes.

There are two kinds of portals that are defined, "portals" and "exact portals". The following are descriptions for each:

1. Exact Portals: These are portals defined by surfaces or planes with the "+exactportal" material applied to them. Exact portals are created such that the faces (edges and vertices) match the surrounding geometry (edges and vertices). These faces in effect create a "seal". The volume that is between these surfaces or planes is an exact portal. The direction of the normals of the faces helps determine how the portal is defined.

2. Portals: These are portals defined by surfaces or planes with the "+portal" material applied to them. These portals are created by faces or planes that are used to divide the game environment. These planes must create a seal with the level, but do not have to match vertices and the associated edges with the surrounding geometry. These planes are much more loosely defined and placed in the level and are used to break or divide the level up into sections. The direction of the normals for the faces helps determine how the portal is defined.

A volume defined as an Exact portal CAN have standard Portal areas defined within it and vice versa as long as the above rules outlined in their definitions are satisfied. However, an open ended or non-enclosed Portal cannot intersect an Exact portal, a "vis error" or rendering anomaly will occur. In other words, be careful to not let a Portal plane improperly divide or bisect an Exact portal volume.

Portals can be used to help portal horizontally (looking left and right in the XY plane) AND vertically (looking up and over objects or geometry that vary in the Z-Axis).

The tutorials below will demonstrate the creation and placement of planes that will define Portal volumes and Exact portal volumes.

# The Creation and Placement of Portals
In this section we will be using the entrances to our interior hallway on both structures to create an exact portal volume.

Later, when the level is running in the game, use rasterizer_wireframe 1 to view the level and exit and enter the hallways to see how the level geometry and objects are not drawn from the player view as this portal volume is entered and exited.

1. Select the edges that make up the entrance of the hallway and create a face using the **F** key. Once you've done this for all 4 entrances separate them from the structure objects to make them a unique object. Join the new objects you created from the structure and rename it to "base portals"
	* ![](assets\4W.png "What it should look like.")

2. Remove all other materials from the object and create a new material. Name this material "+exactportal".

3. Make sure the normals for the faces are pointing outwards. This will help define the volume

Now lets set divide up the level using standard portals.

1. Create a plane and rotate it 90 degrees on the Y axis. Make sure to apply the rotation with **CTRL** + **A** and then set the dimensions of the plane to Y: 3600.0 Z: 2000.0. Set the position of the plane to X: 0.0 Y: 0.0 Z: 650.0. Subdivide the top and bottom plane edges to get five sections.

2. Make sure the sections you created split the map somewhat nicely. The values we used for ours is...
	* X: 0.0 Y: -1200.0 Z: 650.0
	* X: 0.0 Y: -400.0 Z: 650.0
	* X: 0.0 Y: 400.0 Z: 650.0
	* X: 0.0 Y: 1200.0 Z: 650.0

3. Duplicate the object so that it splits the map into five sections. The location for the planes in the image from left to right is...
	* X: -750.0 Y: 0.0 Z: 650.0
	* X: -300.0 Y: 0.0 Z: 650.0
	* X: 300.0 Y: 0.0 Z: 650.0
	* X: 750.0 Y: 0.0 Z: 650.0
	* ![](assets\4X.png "What it should look like.")

4. Now go ahead and fill in the edges you created and then extrude the edges on the outside to extent the plane past the BSP.
	* ![](assets\4Y.png "What it should look like.")

Take this opportunity to name your object "terrain portals" and add a material named "+portal" to the geometry you just created. Also set the parent of terrain portals to frame.

# Saving the Level Again
It's probably a good idea to make frequent backups as you make progress just in case. Follow the instructions below to save a scene.

1. Go to File dropdown in the top left and click it.

2. Click on the menu item labeled "Save As".

3. A window named "Blender File Dialog" should come up. Navigate to ```(HEK Install Path)\data\levels\test\(Level Name)\models``` and set the name of the blend file to the name of your level. You'll remember that we created this directory in the [creation of a level directory](https://general-101.github.io/HEK-Docs/w/Halo%201/H1%20Model%20Guides/My%20First%20H1%20Level/My_First_H1_Level.html#creation-of-a-level-directory) section

4. Click on the button labeled "Save As".

You've now saved your level. The file as is will be used for future sections in this tutorial.

# Conclusion of Level Creation
The level geometry is now "complete" and can be successfully exported and compiled and is ready to go through the steps that will get it running in Halo.
As previously mentioned, a completed version or example version of the level created in the tutorial sections can be found under...

```(HEK Install Path)\data\levels\test\tutorial```

The source and related materials have been provided as a reference to aid in the learning process.

Once the user has successfully completed the tutorials in Level Creation they can proceed to the next section Level Exporting.

Please note that the section Level Exporting and the subsequent sections will assume that the end user has completed all of the examples and tutorials up to and including those in Level Creation. The remaining sections in Multiplayer Level Design will use the completed "tutorial.blend" file from these sections.

# Additional Information
This section will go over some features the original tutorial did not cover.

# Multiple skies

## File List
[Multiple Skies Example Blend](https://drive.google.com/file/d/1k55u_cATxIHayTQeFGjXz58tlTpUuCV2/view?usp=sharing) -> A blend file showcasing how to use multiple skies in a level.

It's possible to use multiple skies in your level by adding a digit to the end of your "+sky" material. If we wanted three skies in our level for example we would have...

```
+sky0
+sky1
+sky2
```

It's important that the digit at the end of the material starts at zero. The digit will be used as an index by the cluster to get a sky tag reference from the skies tag block. You'll also have to make sure that a cluster does not use more than one sky or you will get an error on import.

If you were not aware a cluster is a section of a level divided by a portal. In the case of the provided blend file above there are 7 clusters. If a map has no portals then it is one cluster. Be sure to also prevent multiple skies from being able to be seen by the player at once. The player will see a sudden transition otherwise. Tool will output a warning if a sky can see another sky.

Avoid using this on regular shaders. You'll get tool warnings about duplicate shaders otherwise. This means avoiding digits at the end of your material names unless it's a sky material and avoiding numbers in shader tags. Use letters if you need to make variants.

# Weather Portals

## File List
[Weather Portals Example Blend](https://drive.google.com/file/d/1C28LuHtk-Nrym8h22Dr3UCDvW8KIB3A4/view?usp=sharing) -> A blend file showcasing how to use the special +weatherpoly material in a level.

Lets say you wanted to have weather on tutorial. You may notice that either your weather effects go through the walls of your structure or that it instantly disappears the moment you enter the hallway. This can be quite jarring so naturally there is a solution for this that mappers can implement. The +weatherpoly material is assigned to polyhedron geometry to create a volume that deletes any spawned effects that enter the volume. You can see an example of this in blend file provided above.

You can compare the videos below to see the difference.

Here's what the hallway looks like without a weatherpoly volume.

![](assets\5B.mp4)

Here's what the hallway looks like with a weatherpoly volume.

![](assets\5C.mp4)

The weatherpoly geometry in a cluster is used to generate a polyhedron from the area they cover. There can be a max of 8 on screen at any given time. Any weatherpolys that go over this limit will have no effect. Sapien will print a message in the console if you hit this limit.

# Markers
You can use markers to snap objects to a specific location in a level. You can create a marker object by adding a mesh object to your scene and having the first character of the name use a "#" symbol.

![](assets\5D.png "An example of a marker in a scene.")

Once the level is compiled you can toggle the "Snap to markers" checkbox in the Tool window.

![](assets\5E.png "Here is where you can find the option along with what should show up in the game view once you enable it.")

Once the option is enabled all markers in the BSP will be rendered on screen. Spawning an object and moving it near the marker should snap the object's center of origin to the position of the marker. This can make it must easier to get exact positions for device machines and scenery.

# Multiple BSPs
Want to have multiple BSPs in your scenario for an SP map? All you have to do is place multiple JMS files in the same models folder. Each JMS will be compiled into it's own unique structure_bsp tag for your scenario to use. Do not attempt to use multiple BSPs in an MP scenario as there is no way for this to properly work.

