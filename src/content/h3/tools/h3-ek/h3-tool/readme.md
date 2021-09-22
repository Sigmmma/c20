**H3-Tool** (**tool.exe**), is a [command-line][] utility used to compile data into [tags][], and tags into [maps][map]. It was released as a part of the [Halo 3 Editing Kit][h3-ek] by 343 Industries in 2021.

# Conventions used in this article

- `<arg>` - refers to an argument.
- `<option1|option2>` - Either `option1` or `option2` can be passed as `arg`.
- `Tool` or `tool.exe` - refers to the subject of this article, the H3 Tool, if the legacy Tool is being referred to that will be made explicit.

# Analyze cache file sharing
???

```sh
#  analyze-cache-file-sharing <starting-cache-file> <ending-cache-file>
tool analyze-cache-file-sharing
```

* starting-cache-file - ???
* ending-cache-file - ???

# Analyze dvd cache files
???

```sh
#  analyze-dvd-cache-files <tag-list>
tool analyze-dvd-cache-files
```

* tag-list - ???

# Analyze font
???

```sh
#  analyze-font <font-file>
tool analyze-font
```

* font-file - ???

# Analyze font table
???

```sh
#  analyze-font-table <font-table-to-analyze>
tool analyze-font-table
```

* font-table-to-analyze - ???

# Analyze fonts
Crashes

```sh
#  analyze-fonts
tool analyze-fonts
```

# Analyze implicit sharing
???

```sh
#  analyze-implicit-sharing <tag-list>
tool analyze-implicit-sharing
```

* tag-list - ???

# Analyze shader
???

```sh
#  analyze-shader <tag-containing-render-method>
tool analyze-shader
```

* tag-containing-render-method - ???

# Analyze shaders
Crashes

```sh
#  analyze-shaders
tool analyze-shaders
```

# Bitmap single
Imports a single image file and converts it to a bitmap.

```sh
#  bitmap_single <image-file>
tool bitmap_single
```

* image-file - A local data path to a tif/tiff file with extension.

# Bitmaps
[TIFF][wiki-tiff] (.tif/.tiff) images can be compiled into a [bitmap][] using the `bitmaps` verb:

```sh
# bitmaps <source-directory>
tool bitmaps "levels\multi\chill\bitmaps"
```

* source-directory - A local data path to a folder containing a set of images for processing.

For the example above, Tool would expect to find .tif/.tiff files at `data\levels\multi\chill\bitmaps\`. Assuming no errors, each image file will be compiled into a bitmap tag at `tags\levels\multi\chill\bitmaps\`. Each image file that exists in the source directory will be compiled into its own individual tag with the name of the tag coming from the image filename.

Tool supports TIFF files with a [colour depth][wiki-color] of at least 8 bits per pixel, 32-bit color (8 bits per channel) being typical.

Any bitmaps that end in `_bump` will automatically be converted to a bitmap set as a bump map.

# Bitmaps debug
This command compiles images like the `bitmaps` command but was intended to debug the generated plate data. Obsolete as of H3.

```sh
# bitmaps-debug <source-directory>
tool bitmaps-debug "levels\multi\chill\bitmaps"
```

* source-directory - A local data path to a folder containing a set of images for processing.

# Bitmaps with type
This command compiles images like the `bitmaps` command but allows the user to set the type of bitmap to generate.

```sh
# bitmaps-with-type <source-directory> <type>
tool bitmaps-with-type "levels\multi\chill\bitmaps" 2d
```

* source-directory - A local data path to a folder containing a set of images for processing.
* type - sets the type of bitmap the image will be converted to. This will change how the source image is expected to be setup. The list of valid options is as follows:
	* 2d
	* 3d
	* cubemaps
	* sprites
	* interface

# Build and deploy network files
???

```sh
# build-and-deploy-network-files
tool build-and-deploy-network-files
```

# Build and deploy retail network files
???

```sh
# build-and-deploy-retail-network-files
tool build-and-deploy-retail-network-files
```

# Build and deploy tracked network files
???

```sh
# build-and-deploy-tracked-network-files
tool build-and-deploy-tracked-network-files
```

# Build animation database
???

```sh
# build-animation-database
tool build-animation-database
```

# Build cache file
A [scenario][] can be compiled into a [map][] using the `build-cache-file` verb. Simply provide your scenario's tag path.

```sh
# build-cache-file <scenario> <platform> <audio-configuration> <target-language> <dedicated-server-(optional)> <compress_more|compress_most-(optional)> <use-fmod-data-(optional)>
tool build-cache-file "levels\multi\chill\chill" pc 
```

* scenario - A local tag path to your scenario without the file extension
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional arg
* audio-configuration - ??? This is an optional arg
* target-language - ??? This is an optional arg
* dedicated-server - ??? This is an optional arg
* compress_more|compress_most - ??? This is an optional arg
* use-fmod-data - ??? This is an optional arg

The resulting map file can be found in the editing kit's `maps` directory. This verb also generates reports under `reports\<mapname>` including a compilation-specific `debug.txt`.

# Build cache file cache
Builds the resource maps and associated cache files needed for tag sharing.

```sh
# build-cache-file-cache <platform>
tool build-cache-file-cache pc
```

* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional arg

# Build cache file cache campaign second 
Builds resources files and cache files for campaign maps. Requires `build-cache-file-cache-shared-first` to be done first.

```sh
# build-cache-file-cache-campaign-second <platform> <target-language> <minor-version-number> <optimizable> <dedicated-server-(optional)> <use-fmod-data-(optional)>
tool build-cache-file-cache-campaign-second pc
```

* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional arg

# Baking lightmaps (Faux)

Halo 3 uses a fairly sophisticated lightmapping pipeline compared to the earlier games, for more information see the *Lighting and material of Halo 3* [GDC talk][gdc-lighting] or the [research paper of the same name][doi-lighting].
The end result of this is a system that produces much nicer looking lightmaps if used correctly (you are still responsible for setting up the lights correctly).
Lightmapping is also faster than stock H1 and H2 as multi-process/core support is included out of the box - in fact currently single process lightmapping is broken and multi process lightmapping has to be used.

## Data sync

Before you can start the lightmapping process you need to ensure certain data is synced. If the data is synced already this process is nearly instantaneous otherwise it can take a while depending on the BSP.

```sh
#tool faux_data_sync <scenario> <bsp-name>
tool faux_data_sync "levels\multi\riverworld\riverworld" "riverworld"
```

If you use the [Osoyoos launcher][osoyoos] or the Python script supplied this step will be done automatically.

## Lightmapping using the Python script
You need to install [Python][] if you haven't already see the [official documentation on how to do that for your platform](https://docs.python.org/3/using/index.html), if at some point you are asked if you wish to add python to `PATH` it is suggested you do that as it will make your life easier.
Once Python is installed and working run the `calc_lm_farm_local.py` script in the toolkit root directory.

```sh
#python calc_lm_farm_local.py <scenario> <bsp name> <light group> <quality(high, medium, low, direct_only)>
python calc_lm_farm_local.py "levels\multi\riverworld\riverworld" riverworld all medium
```

If you aren't sure what to use for light group/region just use the catch all value of `all`, this will ensure all regions are lit correctly.
As for quality keep in mind that it will have an impact on how long lightmapping takes but should have only a minor impact on CPU utilisation percentage during that time - the script will use 100% of your CPU as it's hardcoded to use all the logical processors accessible to it.

## Lightmapping using the Osoyoos launcher

Lightmapping using the launcher should be more or less the same as lightmapping Halo 2 using it, just keep in mind the fact that `super` quality is somewhat unstable and `high` might be good enough. You don't need to set a `lightmap region` if you don't know what it does.

## Manually lightmapping using the command line

The `faux_lightmap` and `faux_checkerboard` commands are meant to handle local single instance lightmaps but they are sadly currently broken. In principle you can invoke the same commands the launcher and the script invoke manually but this isn't recommended. In the interest of brevity it will not be discussed here - read the Python script if you are interested in how it works, it should be easy to understand as it's quite short.

## Disk usage

The multi-instance faux process dumps a fair bit of intermediate data to disk which might not be desirable on a slow medium (e.g. external HDD or network drive) or an SSD if you are running a lot of lightmaps and don't want to needlessly wear it out. This data will be saved to the `faux` folder in the toolkit root directory. You can create a link (junction point or symbolic) from this folder to somewhere that is more convenient for you. If you have enough free main memory a RAM Disk might be a good solution - 2 gigabytes of dynamically allocated space should be enough (empirical result for a 16 logical processor system - your mileage will vary).

[wiki-tiff]: https://en.wikipedia.org/wiki/TIFF
[wiki-color]: https://en.wikipedia.org/wiki/Color_depth
[wiki-real]: https://en.wikipedia.org/wiki/Real_number
[wiki-wav]: https://en.wikipedia.org/wiki/WAV
[gdc-lighting]: https://www.gdcvault.com/play/253/Lighting-and-Material-of-HALO
[doi-lighting]: https://doi.org/10.1145/1404435.1404437
[python]: https://www.python.org/