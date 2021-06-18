# File list
| File Link                                                                                       | Description
|------------------------------------------------------------------------------------------------ | -----------------------------------
|[End Result](https://drive.google.com/file/d/1YWeG2lSZpZRF4FDwCcH-qIu7B62h5JT5/view?usp=sharing) | The end product of this tutorial for you to examine and compare.

# Introduction
We will start by going over how Halo requires your folders to be structured for import.

# Creation of a level directory
For the sake of organizing your asset files you should consider keeping all your source files in the same level directory used to create the level (.blend, .tif, .psd, .jms, etc..).

[Tool][] will search for subdirectories in the level directory that contain the raw asset data for compilation and eventually package the resulting assets from the raw data into a map cache file that can run in Halo CE. Any assets that you compile will end up in the tags directory plus the local path to the raw assets in the data folder. For example the file below:

`(HEK Install Path)\data\levels\test\dreamer\models\test.JMS`

has the compiled assets outputted to:

`(HEK Install Path)\tags\levels\test\dreamer\`

When creating a level the scenario tag will take the name of the folder containing the sub directories and raw assets while the structure BSP tag will take the name of the JMS file itself. Compiled scenario tags can then reference other tags for use in the level.

```.alert danger
The name of the level folder containing our sub directories MUST BE UNIQUE from any other level folder in the data/tags directory as will be explained later during the packaging section.
```

Let's first start by creating our very own level directory in the data folder. We'll call this level tutorial for simplicities sake but you can call it whatever you would like:

1. In the root of your HEK install find a folder named `data`. If it does not exist then create it.
2. In the "data" directory find a folder named `levels`. If it does not exist then create it.
3. In the "levels" directory find a folder named `test`. If it does not exist then create it.
4. For our last step we will now create our first level in the `test` directory.

Your final path in Windows explorer should be something like this:

`(HEK Install Path)\data\levels\test\(My Level Name)`

Once this is done you may want to create new subdirectories in the level directory for any custom assets that are specifically for your level.
If you have any images or custom models then the folders you will need are as follows:

1. bitmaps
	* Using the previous example the directory structure would look like this
		* `(HEK Install Path)\data\levels\test\(My Level Name)\bitmaps`
	* The name here is just for organizing your images. The folder containing your raw image assets does not need to be named bitmaps but it will probably help. Like you probably already guessed this is where you will place your .tif files to compile bitmaps tags from. Keep in mind that when we talk about bitmaps in Halo we are not talking about images with a .BMP extension. We are talking about a tag type called bitmaps that stores image data for use in Halo specifically.
2. models
	* Using the previous example the directory structure would look like this
		* `(HEK Install Path)\data\levels\test\(My Level Name)\models`
	* This folder name is something Tool.exe specifically looks for when compiling object meshes. Be sure that the folder is named exactly this. As you have probably already guessed this is where you will compile your example level from.
3. scenery
	* Using the previous example the directory structure would look like this
		* `(HEK Install Path)\data\levels\test\(My Level Name)\scenery`
	* The name here is just for organizing objects used for the level. The folder containing your scenery does not need to be named this but it should help. As you have probably guessed this is where the raw assets for any level specific objects can be placed. This folder should probably contain multiple folders with their own sub directories for model and bitmap assets.

```.alert info
As stated before compiled assets will end up in a path that mirrors the path of the raw asset but replacing the data directory with the tags directory. A packaged map file will take the name of the scenario tag and placed in your game's map folder.
```

# End of file directory info

```.alert success
Now that you fully understand the data directory setup we can begin to work on our level geometry in the [next section][blender-level-creation-beginner]. If you already understand Halo level creation in Blender or wish to attempt importing something first then go ahead and skip over to the [export section.][exporting] You can also take the end result file linked in the [file list][file-directories#file-list] section to get used to the data directory setup.
```