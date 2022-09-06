# Introduction
We will start by going over how Halo requires your folders to be structured for import.

# Creation of an object directory
For the sake of organizing your asset files you should consider keeping all your source files in similar paths used to create the level (.blend, .tif, .psd, .jms, etc..).

Tool will search for subdirectories in the objects directory that contain the raw asset data for compilation and eventually package the resulting assets from the raw data into a map cache file that can run in Halo 3. Any assets that you compile will end up in the tags directory plus the local path to the raw assets in the data folder. For example the file below:

`(H3EK Install Path)\data\objects\vehicle\example_vehi\render\example_vehi.JMS`

has the compiled assets outputted to:

`(H3EK Install Path)\tags\objects\vehicle\example_vehi`

Let's first start by creating our very own custom object directory in the data folder. We'll call this object "new_scenery_piece" for simplicities sake but you can call it whatever you would like:

1. In the root of your H3EK install find a folder named `data`. If it does not exist then, you likely haven't [extracted the zip file properly][h3-ek].
2. In the `data` directory find a folder named `objects`. If it does not exist then create it.
3. In the `objects` directory find a folder named `scenery`. If it does not exist then create it.
4. For our last step we will now create our first custom object in the `scenery` directory.

Your final path in Windows explorer should be something like this:

`(H3EK Install Path)\data\objects\scenery\(Your Object Name Here)`

Once this is done you may want to create new folders for any custom assets that are specifically for your object.
An object will typically at *least* require a "render" folder for the render model, but they may also need:

1. bitmaps
		* `(H3EK Install Path)\data\objects\scenery\(Your Object Name Here)\bitmaps`
	* Like you probably already guessed this is where you will place your texture .tif/.tiff files to compile bitmaps tags from. Keep in mind that when we talk about bitmaps in Halo we are not talking about images with a .BMP extension. We are talking about a tag type called bitmaps that stores image data for use in Halo specifically.

2. render
		* `(H3EK Install Path)\data\objects\scenery\(Your Object Name Here)\render`
	* This `render` folder name is something Tool.exe specifically looks for when compiling object render meshes. Be sure that the folder is named exactly this. As you have probably already guessed this is where you will compile your object's render mesh from, into a .render_model tag.

3. collision
		* `(H3EK Install Path)\data\objects\scenery\(Your Object Name Here)\collision`
	* This `collision` folder name is something Tool.exe specifically looks for when compiling object collison meshes. Be sure that the folder is named exactly this. As you have probably already guessed this is where you will compile your object's collision mesh from, into a .collision_model tag. 

4. physics
		* `(H3EK Install Path)\data\objects\scenery\(Your Object Name Here)\physics`
	* This `physics` folder name is something Tool.exe specifically looks for when compiling object physics meshes. Be sure that the folder is named exactly this. As you have probably already guessed this is where you will compile your object's physics mesh from, into a .physics_model tag.

5. animations
		* `(H3EK Install Path)\data\objects\scenery\(Your Object Name Here)\animations`
	* This `animations` folder name is something Tool.exe specifically looks for when compiling object animations. Be sure that the folder is named exactly this. As you have probably already guessed this is where you will compile your object's animations from, into a .model_animation_graph tag.

```.alert info
As stated before compiled assets will end up in a path that mirrors the path of the raw asset but replacing the data directory with the tags directory. The output path is typically shown in the command prompt when Tool is finished compiling the data.
```

# End of file directory info

```.alert success
Now that you fully understand the data directory setup we can begin to work on our custom model in the [next section][blender-prep]. If you already understand how Blender works then skip ahead to the [modeling section.][blender-level-creation-beginner] If you also already understand Halo object creation in Blender or wish to attempt importing something first then go ahead and skip over to the [export section.][exporting]
```
