# Introduction
We will start by going over how Halo requires your folders to be structured for import.

# Creation of a level directory
For the sake of organizing your asset files you should consider keeping all your source files in similar paths used to create the level (.blend, .tif, .psd, .ass, etc..).

Tool will search for subdirectories in the level directory that contain the raw asset data for compilation and eventually package the resulting assets from the raw data into a map cache file that can run in Halo 2. Any assets that you compile will end up in the tags directory plus the local path to the raw assets in the data folder. For example the file below:

`(H2EK Install Path)\data\scenarios\multi\example\structure\example.ASS`

has the compiled assets outputted to:

`(H2EK Install Path)\tags\scenarios\multi\example`

When creating a level the scenario tag will take the name of the folder containing the sub directories and raw assets while the structure BSP tag will take the name of the ASS file itself. Compiled scenario tags can then reference other tags for use in the level.

```.alert danger
The name of the level folder containing our sub directories MUST BE UNIQUE from any other level folder in the data/tags directory as will be explained later during the packaging section.
```

Let's first start by creating our very own level directory in the data folder. We'll call this level tutorial for simplicities sake but you can call it whatever you would like:

1. In the root of your HEK install find a folder named `data`. If it does not exist then create it.
2. In the `data` directory find a folder named `scenarios`. If it does not exist then create it.
3. In the `scenarios` directory find a folder named `multi`. If it does not exist then create it.
4. For our last step we will now create our first level in the `multi` directory.

Your final path in Windows explorer should be something like this:

`(H2EK Install Path)\data\scenarios\multi\(My Level Name)`

Once this is done you may want to create new folders any custom assets that are specifically for your level.
If you have any images or custom models then the folders you will need are as follows:

1. bitmaps
		* `(H2EK Install Path)\data\scenarios\bitmaps\multi\(My Level Name)`
	* The name here is just for organizing your images. Like you probably already guessed this is where you will place your .tif/.tiff files to compile bitmaps tags from. Keep in mind that when we talk about bitmaps in Halo we are not talking about images with a .BMP extension. We are talking about a tag type called bitmaps that stores image data for use in Halo specifically.
2. structure
		* `(H2EK Install Path)\data\scenarios\multi\(My Level Name)\structure`
	* This folder name is something Tool.exe specifically looks for when compiling object meshes. Be sure that the folder is named exactly this. As you have probably already guessed this is where you will compile your example level from.
3. scenery
		* `(H2EK Install Path)\data\scenarios\objects\multi\(My Level Name)`
	* The name here is just for organizing objects used for the level. The folder containing your scenery does not need to be named this but it should help. As you have probably guessed this is where the raw assets for any level specific objects can be placed. This folder should probably contain multiple folders with their own sub directories for model and bitmap assets.

```.alert info
As stated before compiled assets will end up in a path that mirrors the path of the raw asset but replacing the data directory with the tags directory. A packaged map file will take the name of the scenario tag and placed in your game's map folder.
```

# End of file directory info

```.alert success
Now that you fully understand the data directory setup we can begin to work on our level geometry in the [next section][blender-prep]. If you already understand how Blender works then skip ahead to the [modeling section.][blender-level-creation-beginner] If you also already understand Halo level creation in Blender or wish to attempt importing something first then go ahead and skip over to the [export section.][exporting] You can also take the end result file linked in the [file list][file-directories#file-list] section to get used to the data directory setup.
```
