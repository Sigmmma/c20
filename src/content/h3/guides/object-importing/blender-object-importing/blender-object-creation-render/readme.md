```.alert
This guide assumes you have already [prepared Blender][blender-prep].
```

# File list
| File Link                                                                                          | Description
|--------------------------------------------------------------------------------------------------- | -----------------------------------
|[End Result](https://drive.google.com/file/d/1mteG515evA6pH74s-XFSnwx96Xe6MsOY/view?usp=sharing)    | The end product of this tutorial for you to examine and compare.

# Introduction
Welcome to the Halo 3 custom object importing guide. If you have any experience with importing objects in previous games then you should feel mostly at home for better or worse. In this guide we will be showing you how to go about with creating your very own custom scenery object for Halo 3 in the 3D modeling software app known as Blender. This guide will include a completed version of our work as an example for you to contrast and compare but be sure to follow along.

If there are any images that you find difficult to read then try opening the image in a new tab to view it in full resolution.

By the end of this guide, the aim is to create a basic "platform" of sorts, with a custom texture, that the player can stand on and interact with. On top of that, there will be an extra section for adding a custom animation, to turn it into a moving platform device machine that can carry the player around, sort of like an elevator.

# Directory setup and Blender scene
Here, we will simply create a new empty blender scene, and save it inside your `H3EK\data` directory, making the sub-folders for the new object as we go:

1. Open Blender, New File, General
2. Press <kbd>A</kbd> to select all, hit <kbd>X</kbd> and click delete to confirm
3. Press File -> Save As, or simply hit <kbd>Ctrl+S</kbd>
4. Inside the save window that pops up, navigate to your `H3EK` directory
5. Enter the `data` folder. Enter the `objects` folder, or create it if it does not exist.
6. Enter the `scenery` folder, or create it if it does not exist.
7. Create a new folder called `custom_platform`, navigate inside it, and save your .blend file here, naming it `custom_platform.blend`.

# Creation of an Armature
All objects created for Halo, be they vehicles, scenery, weapons, or any other type, are required to have at least one `node`. A Halo `node` is essentially the same thing as a `bone` in Blender, which are usually used for animating. This requirement means that it is always necessary to have an Armature object as the root object in the Blender scene for a custom object, and you will become used to creating these often. For basic objects such as ours, the Armature usually requires little to no fiddling, as we will not be animating the object with more than one bone.

To create an Armature, do the following:

1. Press <kbd>Shift+A</kbd> to open the Add menu
2. Select Armature from the list  
* ![](A.png "Add an Armature from the Add menu")

For now, this is all we need to do with the Armature. The Armature can remain named the default, or you can rename it if you so wish.
* ![](B.png "Your scene should look like this")


# Creation of a simple model
For the purposes of this tutorial, the model we will be creating shall be extremely simple. However if you can 3D model, feel free to make a more complex custom model here, but bare in mind that this may make other sections of the tutorial, such as materials/shader creation, longer and more complex.

## Creating a simple cube

1. Press <kbd>Shift+A</kbd> to open the Add menu
2. Select Mesh, then Cube to add a new cube to the scene
* ![](C.png "Add a simple cube to the scene")
3. You should now see a basic cube in the center of your scene

## Matching Halo scale
The scale of Halo objects in Blender is actually very large, and so we will need to both scale the Cube to be much larger, as well as adjusting our camera clipping in Blender to make sure we can always see what we are doing.

If you have not done so already, follow the section called `Clip start and end` [on the blender prep page.][blender-prep]

To determine how big objects need to be in Blender, the addon you installed earlier comes with handy scale helper models that can be added to your scene, which accurately depict the size of different Halo objects in Blender, such as characters and vehicles. We want a platform that is big enough for at least a couple of Spartans to stand on, so we will use the Master Chief model as a reference for how big to make the cube:

1. Once again look to the sidebar, but this time change the tab to `Halo Tools`. Open the `Scale Model Helper` section.
2. Set `Game` to Halo 3, `Unit Type` to Character, and `Model` to Master Chief. Hit the `Generate Scale Model` button.
3. As Halo scale is so large, you will likely have to use your mouse scroll wheel to zoom out of the scene until the Spartan model is well within view

Your scene should now hopefully look like this:
* ![](E.png "Master Chief has arrived in the scene")

As you can see, we need to scale the cube up quite a bit to fit a full-grown Spartan!
1. Select your Cube object
2. Press <kbd>S</kbd> to scale the object, and press <kbd>Shift+Z</kbd> to prevent scaling along the Z-axis
3. You will notice that as you move your mouse, the cube scales in the X and Y directions. You can also input numbers with your keyboard to define how much to scale by.
4. If you wish to follow my example exactly, I scale by 60 on the X and Y axis.
5. The exact input required would be: <kbd>S</kbd>,<kbd>Shift+Z</kbd>,<kbd>60</kbd>,<kbd>Enter</kbd>

The cube in your scene should now look something like this, which for now will serve us quite well as a basic platform object
* ![](F.png "Scaled up cube")

# Application of materials
Halo Materials can be quite a tricky topic to understande for newcomers, and so it is HIGHLY recommended that the [Materials Overview][materials] page be read at some point before the texturing page. However, this information won't be required for this section, as we are not applying any custom textures for now. However, it is good practice to apply a material now, as we will be using it later.

## Creating new materials
1. Select the cube object and navigate to the materials tab.
	* ![](G.png "The Material Properties Tab in Blender")  
2. [Add a material](https://youtu.be/2yOOzN0zJfQ) named `material` to your cube object. We will rename this at a later stage. Keep the color default, as it is common practice for only physics and collision meshes to use solid colors to stand out.

For now, this material is simply a placeholder. As we will not yet be importing any custom textures into Halo 3, the cube will simply use the default/missing "DaVinci" texture that Halo assings to faces with no texture.

# Setting up the Armature
Right now, the Armature and Cube are two separate entities, and have no way to interact. We need the Cube to be a child object of the Armature, or else it will not be included when we export the scene to Halo. To do this, we make use of Blender's Parenting feature:
1. Select your Cube
2. Holding <kbd>Ctrl</kbd>, click/select the Armature object in the outliner (the list in the top right that shows all of the objects in your scene)
3. You should have both objects selected, with the Cube being a darker orange
* ![](H.png "The Outliner, with both Cube and Armature selected")
4. With your mouse over the 3D Viewport, press <kbd>Ctrl+P</kbd> to show the Parenting menu.
5. Select `Object (Keep Transform)`. Your Cube should now appear inside the Armature in the Outliner.
* ![](I.gif "Parenting the Cube to the Armature")

# Saving your progress!
We are pretty much done with the Blender part of this tutorial, so now would be a very good time to make sure you have saved your Blender scene recently. It is also a good idea to make backups often of stuff you wouldn't want to lose, or when you make major changes to a file.

The file as is will be used for future sections in this tutorial, so be careful not to delete it!

# Exporting from Blender
Thanks to *General_101*'s fantastic Import/Export addon for halo formats, exporting our work into a format Halo 3 can understand is quite trivial. For render/physics/collision models, this means exporting to the propriety Halo .JMS format. Don't worry too much about understanding what JMS is or how it works, just know that it stores all of the object data you export from Blender, and is the primary format for importing models into Halo 3.

You may be wondering what to do about the scale model we still have in our scene. The exporter will *only* export meshes that are parented to the Armature, so it won't include the scale model in the JMS file, so don't worry about it. That being said, we won't really need it again, so feel free to delete it from your Blender scene, it won't be showing up again.

1. In Blender, navigate to `File` -> `Export` -> `Halo Jointed Model Skeleton (.JMS)`.
2. The export box should open into your `custom_platform` directory. Create a new folder called `render`, and navigate into it.
3. Type `custom_platform` as the name for your file.
4. Select `Game Version: Halo 3 MCC` from the drop-down on the right
5. Whilst not strictly necessary as we have no collision or physics data in the scene, it is good practice to uncheck the `Export Collision Geometry` and `Export Physics Geometry` boxes.
6. Check `Fix Rotations` to ensure that nothing goes wrong with your bone rotations.
7. Hit Export JMS! If you see `Export Completed Succesfully` along the bottom in Blender, everything is good.
See the process in realtime [here.](https://youtu.be/Tu436ifYA3A)

# Importing your Render JMS with Tool
If you aren't already familiar, Tool (tool.exe) is a commandline program used within the Halo Editing Kits mostly to provide import and export functionality. As such, we will need to use it now to turn our newly exported .JMS file into a `.render_model` tag. You can read more about tool [here.][h3-tool]

1. Open a command prompt within your H3EK directory. You can do this by typing `cmd` into the address bar whilst in the H3EK folder, and pressing <kbd>Enter</kbd>.
* ![](J.gif "Opening command prompt")
2. Take note of the filepath of your custom object. If you've been following along exactly, that would be `H3EK\data\objects\scenery\custom_platform`. The tool command we are about to run only requires the relative path, and for H3EK this means you can exclude everything up to and including `data` from the filepath. Therefore, we just need `objects\scenery\custom_platform`
3. The command also takes one last option, `draft` or `final`. This is to do with PRT shadow creation, which is out of the scope of this tutorial. For now, we will simply use `draft`.
4. Type the command `tool render objects\scenery\custom_platform draft` into CMD, and hit enter. If you used a different filepath, be sure to use that instead - if your path contains spaces in folder names, you will need to wrap the filepath in quotes when inputting this command.
5. Do not be alarmed if you don't understand most of what is printed to the screen - if you see `writing out render model` somewhere, then it has succeeded. Refer to the following image to check that your output matches:
* ![](K.png "Tool.exe output when successfully running the render command")

That's about all there is to the .JMS importing process. Tool has taken our .JMS file, processed it, and produced a .render_model tag in the *mirror* filepath inside of the `H3EK\tags` directory. For example, our .JMS filepath of `H3EK\data\objects\scenery\custom_platform` means that the .render_model has been saved to `H3EK\tags\objects\scenery\custom_platform`. Try to find it in explorer!

# Creating the Model and Scenery tags
Now, render model tags themselves cannot be directly displayed in the Halo 3 engine - they need to be added to a `.model` tag, and the that model tag needs to be added to a high-level tag, such as `.vehicle`, `.scenery`, `.biped` etc, depending on the type of object you want. Scenery is a typically static object that can have collision, but otherwise floats where you place. This is what we want right now, and heres how to get there:

1. Open [Guerilla.exe][h3-guerilla]
2. Create a new tag, either with `File -> New` or <kbd>Ctrl+N</kbd>
3. You can manually look for `model` in the drop-down, or you can start typing the word model and it should come up. Click OK
4. We only need to do one thing in this tag, which is to add a reference to our newly generated `.render_model` tag - Click the `...` next to the `render model` box near the top of the tag. This will open a file browser. Navigate to `H3EK\tags\objects\scenery\custom_platform`, and double-click the `custom_platform.render_model` tag.
5. Now that it is in the model, we can save this tag with <kbd>Ctrl+S</kbd>. Save it to `H3EK\tags\objects\scenery\custom_platform`, where the render model tag is also stored. We generally give all the tags the same name, and rely only on the file extension, so in this case save the tag with the name `custom_platform`. Once this is done, you can close the tag with the X in the top right.
6. Create another new tag, this time making it a `Scenery` tag.
7. For `bounding radius`, give it a value of 3 (this is a rough approximation of the size of the object).
8. Find the `model` box a little way down from the top, click the `...` and select the `custom_platform.model` tag you just saved.
9. Once this is done, you can save the tag. Once again, preferable just as `custom_platform.scenery` in `H3EK\tags\objects\scenery\custom_platform`.

If you need, [there is a video](https://youtu.be/HH_Zcs1wxEE) which follows this exact process.

Done! Our custom object is now ready to be placed and used in [Sapien][h3-sapien] just like any other scenery object.

## Checking out the object in Sapien
Now that we have a functional `.scenery` tag with the custom render model in it, we can add it to any map with sapien and use it! Although currently, it will be using the default missing texture, and wont be collideable (yet!).

1. Open [Sapien][h3-sapien] and lauch any `.scenario` of your choosing
2. Once it has loaded, in the Hierarchy View, click on `Scenario -> Objects -> Scenery`, and the click the `Edit Types` button.
3. Click `Add`, and navigate to our new `custom_platform.scenery` tag in `H3EK\tags\objects\scenery\custom_platform`.
4. Double click it, then click `Done`, then `OK`.
5. The object has now been added to the scenario! With `Scenery` still selected in the Hierarchy View, right-click on the ground anywhere in the 3D Viewport to place a new scenery object.
6. In the Properties Palette window, change the `type` drop-down to our new `custom_platform` scenery piece
7. You should see the platform, although you may need to use the grab handles to position it better for you to see.

Check the video [here](https://youtu.be/DgsMVhR1FN8) to see this process in action.


```.alert success
Once you've gotten to this point, you are ready to look at adding a custom material! Proceed to the [next section][exporting]
```
