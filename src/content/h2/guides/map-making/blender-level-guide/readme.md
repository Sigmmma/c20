# File list
[End Result](https://drive.google.com/file/d/1M7EEcknk2rla9Ysohbj47wdEiD_0aoyi/view?usp=sharing) -> The end product of this tutorial for you to examine and compare.

[Spartan Model](https://drive.google.com/file/d/12D7pe5I3z7gNfzdETvU0P3-hdhgMWW1w/view?usp=sharing) -> Spartan model that should be to scale with the ingame player.

[Warthog Model](https://drive.google.com/file/d/1gAiTezg-Am9St-v65Cqj2ub8N6PmY9hO/view?usp=sharing) -> Warthog model that should be to scale with the ingame player.

# Creation of a level directory
For the sake of organizing your asset files you should consider keeping all your source files in the same level directory used to create the level (.blend, .tif, .psd, .ass, etc..).

[H2Tool.exe][h2tool] will search for subdirectories in the level directory that contain the raw asset data for compilation and eventually package the resulting assets from the raw data into a map cache file that can run in Halo CE. Any assets that you compile will end up in the tags directory plus the local path to the raw assets in the data folder. For example the file below...

```
(HEK Install Path)\data\scenarios\multi\dreamer\structure\dreamer.ASS
```

has the compiled assets outputted to...

```
(HEK Install Path)\tags\scenarios\multi\dreamer
```

When creating a level the scenario tag will take the name of the folder containing the sub directories and raw assets while the structure BSP tag will take the name of the ASS file itself. Compiled scenario tags can then reference other tags for use in the level.

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

1. bitmaps:
	* Using the previous example the directory structure would look like this:
		* ```(HEK Install Path)\data\levels\test\(My Level Name)\bitmaps```
	* The name here is just for organizing your images. The folder containing your raw image assets does not need to be named bitmaps but it will probably help. Like you probably already guessed this is where you will place your .tif files to compile bitmaps tags from. Keep in mind that when we talk about bitmaps in Halo we are not talking about images with a .BMP extension. We are talking about a tag type called bitmaps that stores image data for use in Halo specifically.
2. models:
	* Using the previous example the directory structure would look like this:
		* ```(HEK Install Path)\data\levels\test\(My Level Name)\models```:
	* This folder name is something Tool.exe specifically looks for when compiling object meshes. Be sure that the folder is named exactly this. As you have probably already guessed this is where you will compile your example level from.
3. scenery:
	* Using the previous example the directory structure would look like this:
		* ```(HEK Install Path)\data\levels\test\(My Level Name)\scenery```
	* The name here is just for organizing objects used for the level. The folder containing your scenery does not need to be named this but it should help. As you have probably guessed this is where the raw assets for any level specific objects can be placed. This folder should probably contain multiple folders with their own sub directories for model and bitmap assets.

As stated before compiled assets will end up in a path that mirrors the path of the raw asset but replacing the data directory with the tags directory. A packaged map file will take the name of the scenario tag and placed in your game's map folder.
