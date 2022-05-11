**H3-Tool** (**tool.exe**), is a [command-line][] utility used to compile data into [tags][], and tags into [maps][map]. It was released as a part of the [Halo 3 Editing Kit][h3-ek] by 343 Industries in 2021.

# Tips
* If an invalid command is typed into tool then tool will print a list of commands that have the same starting character as what was typed in. This means that if we type `tool s` into command prompt then tool will only output commands that start with the letter s.

# Conventions used in this article

- `<argument>` - refers to an argument.
- `<option1|option2>` - Either `option1` or `option2` can be passed as `argument`.
- `Tool` or `tool.exe` - refers to the subject of this article, the H3 Tool, if the legacy Tool is being referred to that will be made explicit.

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


# Building cache files
Cache files can be built using multiple tool verbs, but you will likely only use `build-cache-file` 

## Build cache file
A [scenario][] can be compiled into a [map][] using the `build-cache-file` verb. Simply provide your scenario's tag path.

```sh
# build-cache-file <scenario> <platform> <audio-configuration> <target-language> <dedicated-server-(optional)> <compress_more|compress_most-(optional)> <use-fmod-data-(optional)>
tool build-cache-file "levels\multi\chill\chill" pc
```

* scenario - A local tag path to your scenario without the file extension
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument
* audio-configuration - ??? This is an optional argument
* target-language - ??? This is an optional argument
* dedicated-server - ??? This is an optional argument
* compress_more|compress_most - ??? This is an optional argument
* use-fmod-data - ??? This is an optional argument

The resulting map file can be found in the editing kit's `maps` directory. This verb also generates reports under `reports\<mapname>` including a compilation-specific `debug.txt`.

## Build cache file cache
Builds the resource maps and associated cache files needed for tag sharing.

```sh
# build-cache-file-cache <platform>
tool build-cache-file-cache pc
```

* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument

## Build cache file cache campaign second
Builds resources files and cache files for campaign maps. Requires `build-cache-file-cache-shared-first` to be done first.

```sh
# build-cache-file-cache-campaign-second <platform> <target-language> <minor-version-number> <optimizable> <dedicated-server-(optional)> <use-fmod-data-(optional)>
tool build-cache-file-cache-campaign-second pc
```

* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument
* target-language - ??? This is an optional argument
* minor-version-number - ??? This is an optional argument
* optimizable - ??? This is an optional argument
* dedicated-server - ??? This is an optional argument
* use-fmod-data - ??? This is an optional argument

## Build cache file cache custom
Builds cache files needed for tag sharing.

```sh
# build-cache-file-cache-custom <shared-manifest-list> <campaign-manifest-list> <platform>
tool build-cache-file-cache-custom
```

* shared-manifest-list - ???
* campaign-manifest-list - ???
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument

## Build cache file cache language version
Builds the resource maps and associated cache files needed for tag sharing.

```sh
# build-cache-file-cache-language-version <target-language> <minor-version-number> <platform>
tool build-cache-file-cache-language-version english "" pc
```

* target-language - self explanatory
* minor-version-number - ???
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument

## Build cache file cache shared first
Builds the resource maps and associated cache files needed for tag sharing.

```sh
# build-cache-file-cache-shared-first <platform> <target-language> <minor-version-number> <sound-config> <optimizable> <dedicated-server-(optional)> <use-fmod-data-(optional)>
tool build-cache-file-cache-shared-first pc
```

* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument
* target-language - ??? This is an optional argument
* minor-version-number - ??? This is an optional argument
* sound-config - ??? This is an optional argument
* optimizable - ??? This is an optional argument
* dedicated-server - ??? This is an optional argument
* use-fmod-data - ??? This is an optional argument

## Build cache file cache sounds
Builds the resource maps and associated cache files needed for tag sharing. Requires `build-cache-file-cache-sounds-index` to be done first.

```sh
# build-cache-file-cache-sounds <platform> <target-language> <minor-version-number> <dedicated-server-(optional)> <use-fmod-data-(optional)>
tool build-cache-file-cache-sounds pc
```

* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument
* target-language - ??? This is an optional argument
* minor-version-number - ??? This is an optional argument
* dedicated-server - ??? This is an optional argument
* use-fmod-data - ??? This is an optional argument

## Build cache file for cubemaps
Builds the provided scenario along with the associated cache files needed for tag sharing cubemap data.

```sh
# build-cache-file-for-cubemaps <scenario> <platform>
tool build-cache-file-for-cubemaps "levels\multi\chill\chill" pc
```

* scenario - A local tag path to a scenario tag without extension.
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument

## Build cache file language
A [scenario][] can be compiled into a [map][] using the `build-cache-file-language` verb. Simply provide your scenario's tag path.

```sh
# build-cache-file-language <target-language> <scenario> <platform>
tool build-cache-file-language english "levels\multi\chill\chill" pc
```

* target-language - ???
* scenario - A local tag path to a scenario tag without extension.
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument

## Build cache file language version
A [scenario][] can be compiled into a [map][] using the `build-cache-file-language-version` verb. Simply provide your scenario's tag path.

```sh
# build-cache-file-language-version <target-language> <minor-version-number> <scenario> <platform>
tool build-cache-file-language-version english "" "levels\multi\chill\chill" pc
```

* target-language - ???
* minor-version-number - ???
* scenario - A local tag path to a scenario tag without extension.
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument

# Bulk imports
Bulk import commands allow you to import many files at once using a JMI file. Other than that they work similarly to individual imports.

## Bulk collision
Multiple directories can have their collision files compiled in a single run using this command.

```sh
#  bulk-collision <jmi-file>
tool bulk-collision "objects\multi\jmi_Test.JMI"
```

* jmi-file - A local data path to where the JMI file is located.

## Bulk import crates
Compile multiple source directories in a single run to generate a crate tag and all the relevant tags involved. Render tags will use PRT

```sh
#  bulk-import-crates <jmi-file>
tool bulk-import-crates "objects\multi\jmi_Test.JMI"
```

* jmi-file - A local data path to where the JMI file is located.

## Bulk import crates draft
Compile multiple source directories in a single run to generate a crate tag and all the relevant tags involved. Render tags will not use PRT

```sh
#  bulk-import-crates-draft <jmi-file>
tool bulk-import-crates-draft "objects\multi\jmi_Test.JMI"
```

* jmi-file - A local data path to where the JMI file is located.

## Bulk import crates folder
Generates a crate tag and compiles the render, collision, and physics directory of a model in a single run. Just point it at the root of your model folder and go! Render tags will use PRT

```sh
#  bulk-import-crates-folder <source-directory>
tool bulk-import-crates-folder "objects\multi\world_node_a"
```

* source-directory - A local data path to the root of a model source directory.

## Bulk import crates folder draft
Generates a crate tag and compiles the render, collision, and physics directory of a model in a single run. Just point it at the root of your model folder and go! Render tags will not use PRT

```sh
#  bulk-import-crates-folder-draft <source-directory>
tool bulk-import-crates-folder-draft "objects\multi\world_node_a"
```

* source-directory - A local data path to the root of a model source directory.

## Bulk import model folder
Generates a model tag and compiles the render, collision, and physics directory of a model in a single run. Just point it at the root of your model folder and go! Render tags will use PRT

```sh
#  bulk-import-model-folder <source-directory> <skip-coarse-optimization|-s(optional)>
tool bulk-import-model-folder "objects\multi\world_node_a"
```

* source-directory - A local data path to the root of a model source directory.
* skip-coarse-optimization - ???

## Bulk import model folder draft
Generates a model tag and compiles the render, collision, and physics directory of a model in a single run. Just point it at the root of your model folder and go! Render tags will not use PRT

```sh
#  bulk-import-model-folder-draft <source-directory>
tool bulk-import-model-folder-draft "objects\multi\world_node_a"
```

* source-directory - A local data path to the root of a model source directory.

## Bulk import models
Compile multiple source directories in a single run to generate a model tag and all the relevant tags involved. Render tags will use PRT

```sh
#  bulk-import-models <jmi-file>
tool bulk-import-models "objects\multi\jmi_Test.JMI"
```

* jmi-file - A local data path to where the JMI file is located.

## Bulk import models draft
Compile multiple source directories in a single run to generate a model tag and all the relevant tags involved. Render tags will not use PRT

```sh
#  bulk-import-models-draft <jmi-file>
tool bulk-import-models-draft "objects\multi\jmi_Test.JMI"
```

* jmi-file - A local data path to where the JMI file is located.

## Bulk import scenery
Compile multiple source directories in a single run to generate a scenery tag and all the relevant tags involved. Render tags will use PRT

```sh
#  bulk-import-scenery <jmi-file>
tool bulk-import-scenery "objects\multi\jmi_Test.JMI"
```

* jmi-file - A local data path to where the JMI file is located.

## Bulk import scenery draft
Compile multiple source directories in a single run to generate a scenery tag and all the relevant tags involved. Render tags will not use PRT

```sh
#  bulk-import-scenery-draft <jmi-file>
tool bulk-import-scenery-draft "objects\multi\jmi_Test.JMI"
```

* jmi-file - A local data path to where the JMI file is located.

## Bulk import scenery folder
Generates a scenery tag and compiles the render, collision, and physics directory of a model in a single run. Just point it at the root of your model folder and go! Render tags will use PRT

```sh
#  bulk-import-scenery-folder <source-directory>
tool bulk-import-scenery-folder "objects\multi\world_node_a"
```

* source-directory - A local data path to the root of a model source directory.

## Bulk import scenery folder draft
Generates a scenery tag and compiles the render, collision, and physics directory of a model in a single run. Just point it at the root of your model folder and go! Render tags will not use PRT

```sh
#  bulk-import-scenery-folder-draft <source-directory>
tool bulk-import-scenery-folder-draft "objects\multi\world_node_a"
```

* source-directory - A local data path to the root of a model source directory.

## Bulk physics
Multiple directories can have their physics files compiled in a single run using this command.

```sh
#  bulk-physics <jmi-file>
tool bulk-physics "objects\multi\jmi_Test.JMI"
```

* jmi-file - A local data path to where the JMI file is located.

## Bulk render
Multiple directories can have their render files compiled in a single run using this command. Render tags will not use PRT

```sh
#  bulk-render <jmi-file>
tool bulk-render "objects\multi\jmi_Test.JMI"
```

* jmi-file - A local data path to where the JMI file is located.

## Bulk render final
Multiple directories can have their render files compiled in a single run using this command. Render tags will use PRT

```sh
#  bulk-render-final <jmi-file>
tool bulk-render-final "objects\multi\jmi_Test.JMI"
```

* jmi-file - A local data path to where the JMI file is located.


# Camera track
This commands takes a JMA file directly and converts it to a camera_track for the game. The length of the animation should be at most 16 as that is the max number of control points a camera track tag can contain. The JMA should contain a skeleton made up of a single bone that will change its position each frame. The orientation of the bone will determine the position and rotation of the control point for that index. The name of the JMA file will be the name of the tag. Keep in mind that the extension check for this command is case sensitive. Keep the JMA portion lower case.

```sh
# camera-track <source-file>
tool camera-track camera\vehicle_longsword.jma
```

* source-file - A local data path to where the JMA file is located.

# Check all tags
Checks if your tags are valid.

```sh
# check-all-tags
tool check-all-tags
```

# Collision
A [JMS][] file containing a collision model can be compiled into a collision model tag

```sh
# collision <source-directory>
tool collision "objects\characters\masterchief"
```

* source-directory - A local data path to the root of a model source directory.

For the example above, Tool would expect to find a corresponding JMS file at `data\objects\characters\masterchief\collision\mc_collision.JMS`. Assuming no errors, it would be compiled into `tags\objects\characters\masterchief\masterchief.collision_model`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

# Compile shader
Compile the template needed for a specific shader.

```sh
# compile-shader <render-method>
tool compile-shader "objects\block\shaders\discard" "win"
```

* render-method - Shader to compile
* platform - set this to `win`

# Shaders
Compiles non-template shaders, only useful if you are writing custom shaders.

```sh
# shaders <-debug-(optional)> <-pdb-path-(optional)> <platform>
tool shaders win
```

# Count all class sounds
Goes through all of the sound tags in a directory and prints how many sounds belong to a specific class

```sh
# count-all-class-sounds <root-path>
tool count-all-class-sounds "sound\ambience"
```

* root-path - A local tag path to the root of a directory containing sound tags or child folders with sound tags.

# Count class sounds
Goes through all of the sound tags in the tags directory and prints the paths for sounds that use a specific sound class

```sh
# count-class-sounds <sound-class>
tool count-class-sounds projectile_impact
```

* sound-class - The sound class you want to specify. The list is as follows.
	* Placeholder

# Count class sounds
Prints all existing sound tags in a directory.

```sh
# count-sound-tags <root-path>
tool count-sound-tags "sound\ambience"
```

* root-path - A local tag path to the root of a directory containing sound tags or child folders with sound tags.


# Cubemaps
Generates cubemaps to be used by dynamic cubemap enabled shaders. There are two things you will need to do first before running this command. Open the level you want to generate cubemaps for in Sapien and place down some cubemap points. You can find cubemap points in the hierarchy view under the folder path `Structure Data > Cubemaps`.These points will be used by the command `cubemap_dynamic_generate` to generate the cubemaps we will need. Once that's done open up your level in Standalone and run the command `cubemap_dynamic_generate`. The results of this command will be written to a folder in the root of your H3EK named `cubemaps`. Once you've done that you can run the cubemaps command from tool.

```sh
# cubemaps <scenario> <input-folder>
tool cubemaps "levels\multi\guardian\guardian" "F:\H3EK\cubemaps"
```

* scenario - A local tag path to a scenario file without extension.
* input-folder - An absolute path to a folder containing cubemap DDS files generated by standalone

# Decorator set link render model
Sets the render_model tag reference in a decorator-set tag.

```sh
# decorator-set-link-render-model <decorator-set> <render-model>
tool decorator-set-link-render-model "levels\shared\decorators\barnacles\barnacles" "levels\shared\decorators\barnacles\barnacles"
```

* decorator-set - A local tag path to a decorator_set tag file without extension.
* render-model - A local tag path to a render_model tag file without extension.

# Dialogue globals import
Compiles a CSV file to generate a new [ai_dialogue_globals][] tag. The file path for the CSV file is `data\ai\ai_dialogue_globals.csv` and `tags\ai\ai_dialogue_globals.ai_dialogue_globals` is generated.

```sh
# dialogue-globals-import
tool dialogue-globals-import
```

# Dialogue import
Collects all [sound][] tag paths and adds them to a generated [dialogue][] tag.

```sh
# dialogue-import <root-directory>
tool dialogue-import "sound\dialog\combat\brute_bloodthirsty"
```

* root-directory - A local tag path to a root directory containing sound tags. A dialogue tag is generated adjacent to this root directory with the same name, e.g. `sound\dialog\combat\brute_bloodthirsty.dialogue`.


# Dump render method options
Dumps an index of all shader templates used by shaders, once it's done it prints out some statistics and saves information to the `shaders` folder in binary or text form. Required for building templates.
```sh
# dump-render-method-options
tool dump-render-method-options
```


# Exporting bitmaps
Tool has serval commands for exporting bitmap data into various formats.

## Export bitmap DDS
Takes the processed pixel data from a bitmap tag and dumps it to a DDS image.

```sh
# export-bitmap-dds <bitmap-tag> <output-path-prefix>
tool export-bitmap-dds "objects\characters\brute\bitmaps\brute" "C:\pixel_data_"
```

* bitmap-tag - A local tag path to a bitmap tag without extension.
* output-path-prefix - An absolute file path to a directory to output the DDS file to along with a prefix to append to the start of the DDS filename. If only a prefix is given then the file will be dumped at the root of your H3EK directory.

## Export bitmap PFM
Takes the processed pixel data from a bitmap tag and dumps it to a PFM image.

```sh
# export-bitmap-pfm <bitmap-tag> <output-path-prefix>
tool export-bitmap-pfm "objects\characters\brute\bitmaps\brute" "F:\pixel_data_"
```

* bitmap-tag - A local tag path to a bitmap tag without extension.
* output-path-prefix - An absolute file path to a directory to output the PFM file to along with a prefix to append to the start of the PFM filename. If only a prefix is given then the file will be dumped at the root of your H3EK directory.

## Export bitmap TGA
Takes the processed pixel data from a bitmap tag and dumps it to a TGA image.

```sh
# export-bitmap-tga <bitmap-tag> <output-path-prefix>
tool export-bitmap-tga "objects\characters\brute\bitmaps\brute" "F:\pixel_data_"
```

* bitmap-tag - A local tag path to a bitmap tag without extension.
* output-path-prefix - An absolute file path to a directory to output the TGA file to along with a prefix to append to the start of the TGA filename. If only a prefix is given then the file will be dumped at the root of your H3EK directory.

## Export DXT5 array from bitmap array
Takes the processed pixel data from a bitmap tag and dumps it to PFM images.

```sh
# export-dxt5-array-from-bitmap-array <bitmap-tag> <output-path-prefix>
tool export-dxt5-array-from-bitmap-array "levels\multi\cyberdyne\cyberdyne_lightmap_cyberdyne_16f_lp_array_dxt5" "F:\pixel_data_"
```

* bitmap-tag - A local tag path to a lightmap bitmap tag without extension.
* output-path-prefix - An absolute file path to a directory to output the file to along with a prefix to append to the start of the filename. If only a prefix is given then the file will be dumped at the root of your H3EK directory.


# Export structure mesh OBJ
Takes a scenario tag and finds the `structure_bsp` referenced. The mesh is then outputted in an OBJ file format in tool output.

```sh
# export-structure-mesh-obj <scenario>
tool export-structure-mesh-obj "levels\multi\snowbound\snowbound"
```

* scenario - A local tag path to a scenario tag without extension.

# Export tag to XML
Takes a tag and dumps the contents to an XML format. Use this for easy comparisons.

```sh
# export-tag-to-xml <tag-file> <output-file>
tool export-tag-to-xml "F:\H3EK\tags\objects\characters\masterchief\masterchief.render_model" "F:\masterchief.xml"
```

* tag-file - An absolute tag path to a tag with extension.
* output-file - An absolute file path to an output directory with file name and extension.

# Extract import info
Dumps the stored import-info data used to originally import the tag file. Only tags that contain valid import-info can use this. This means only [render_model][], [collision_model][], [physics_model][], and [scenario_structure_bsp][].

```sh
# extract-import-info <tag-file>
tool extract-import-info "F:\H3EK\tags\objects\characters\masterchief\masterchief.render_model"
tool extract-import-info "F:\H3EK\tags\objects\characters\masterchief\masterchief.collision_model"
tool extract-import-info "F:\H3EK\tags\objects\characters\masterchief\masterchief.physics_model"
tool extract-import-info "F:\H3EK\tags\levels\multi\zanzibar\zanzibar.scenario_structure_bsp"
```

* tag-file - An absolute file path to a tag containing valid import info.

# Extract LPC data
Dumps a file called `test.aif` in the root of H3EK. This is likely to be [linear predictive coding](https://en.wikipedia.org/wiki/Linear_predictive_coding) data for the sound file but this hasn't be verified.

```sh
# extract-lpc-data <sound-file>
tool extract-lpc-data "sound_test\aiff\soundtest.aiff"
```

* sound-file - A local data path to an AIF/AIFF file.

# Extract render data
Dumps the stored import-info data used to originally import the render_model file. Only render_model tags that contain valid import-info can use this.

```sh
# extract-render-data <render-model>
tool extract-render-data "objects\characters\masterchief\masterchief"
```

* render-model - A local tag path to a render_model tag without extension.

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

* scenario - A local tag path to a scenario without extension
* bsp-name - The name of a BSP tag referenced by the scenario tag

If you use the [Osoyoos launcher][osoyoos] or the Python script supplied this step will be done automatically.

## Lightmapping using the Python script
You need to install [Python][] if you haven't already see the [official documentation on how to do that for your platform](https://docs.python.org/3/using/index.html), if at some point you are asked if you wish to add python to `PATH` it is suggested you do that as it will make your life easier.
Once Python is installed and working run the `calc_lm_farm_local.py` script in the toolkit root directory.

```sh
#python calc_lm_farm_local.py <scenario> <bsp name> <quality(high, medium, low, direct_only)> <light group>
python calc_lm_farm_local.py "levels\multi\riverworld\riverworld" riverworld medium all
```

If you aren't sure what to use for light group/region just use the catch all value of `all`, this will ensure all regions are lit correctly.
As for quality keep in mind that it will have an impact on how long lightmapping takes but should have only a minor impact on CPU utilisation percentage during that time - the script will use 100% of your CPU as it's hardcoded to use all the logical processors accessible to it.

## Lightmapping using the Osoyoos launcher

Lightmapping using the launcher should be more or less the same as lightmapping Halo 2 using it, just keep in mind the fact that `super` quality is somewhat unstable and `high` might be good enough. You don't need to set a `lightmap region` if you don't know what it does.

## Manually lightmapping using the command line

The `faux_lightmap` and `faux_checkerboard` commands are meant to handle local single instance lightmaps but they are sadly currently broken. In principle you can invoke the same commands the launcher and the script invoke manually but this isn't recommended. In the interest of brevity it will not be discussed here - read the Python script if you are interested in how it works, it should be easy to understand as it's quite short.

## Disk usage

The multi-instance faux process dumps a fair bit of intermediate data to disk which might not be desirable on a slow medium (e.g. external HDD or network drive) or an SSD if you are running a lot of lightmaps and don't want to needlessly wear it out. This data will be saved to the `faux` folder in the toolkit root directory. You can create a link (junction point or symbolic) from this folder to somewhere that is more convenient for you. If you have enough free main memory a RAM Disk might be a good solution - 30 gigabytes of dynamically allocated space should be enough (empirical result for a 16 logical processor system lighting Edge at the highest quality - your mileage will vary).


# FBX to ASS
This command takes an FBX and converts it to an [ASS][] file for Halo 3 level importing. Use this if you don't have access to an export script.

```sh
# fbx-to-ass <fbx> <ass>
tool fbx-to-ass "F:\dreamer.fbx" "F:\dreamer.ASS"
```

* fbx - An absolute filepath to a valid FBX file.
* ass - An absolute filepath that includes name and extension to write the output to.

For some details on how to setup the FBX file see [FBX for H3][fbx].

# FBX to JMA
This command takes an FBX and converts it to an animation source file for Halo 3 importing. Use this if you don't have access to an export script. Be aware that the extension can be any of the available extensions for animation importing. It does not specifically needs to be JMA. You can type JMO as the extension and the output is still valid.

```sh
# fbx-to-jma <fbx> <jma> [Start-frame] [Last-frame]
tool fbx-to-jma "E:\my_fbx_files\cyborg_dab.fbx" F:\cyborg_my_custom_anim.JMA
tool fbx-to-jma "E:\my_fbx_files\cyborg_dab.fbx" F:\cyborg_my_custom_anim.JMA 5 10
```

* fbx - An absolute filepath to a valid FBX file.
* jma - An absolute filepath that includes name and extension to write the output to.
* Start-frame - Sets the first frame index that the converter will start from. Use this if you want only a specific section of an animation from your FBX. This argument is optional so you can leave this and Last-frame out if you want the animation as is.
* Last-frame - Sets the last frame index that the converter will end on. Use this if you want only a specific section of an animation from your FBX. This argument is optional so you can leave this and Last-frame out if you want the animation as is.

For some details on how to setup the FBX file see [FBX for H3][fbx].

# FBX to JMI
This command takes an FBX and converts it to a JMI source file for Halo 3 importing. Use this if you don't have access to an export script.

```sh
# fbx-to-jmi <fbx> <jmi>
tool fbx-to-jmi "E:\my_fbx_files\scenery_set.fbx" F:\scenery_set.JMI
```

* fbx - An absolute filepath to a valid FBX file.
* jmi - An absolute filepath that includes name and extension to write the output to.

For some details on how to setup the FBX file see [FBX for H3][fbx].

# FBX to JMS

```sh
# fbx-to-jms <render,collision,physics-or-all> <fbx> <jms>
tool fbx-to-jms render "F:\dreamer.fbx" "F:\dreamer.JMS"
```

* render,collision,physics-or-all - Sets the type of geo this FBX is for. Use either render, collision, physics, or all only. The geo class set will determine what geometry gets exported from the JMS
* fbx - An absolute filepath to a valid FBX file.
* jms - An absolute filepath that includes name and extension to write the output to.

For some details on how to setup the FBX file see [FBX for H3][fbx].

# Import Bitmap Folder as Single Tag
This command compiles multiple .tif files from a folder into a single .bitmap tag.

```sh
# import-bitmap-folder-as-single-tag <source_directory>
tool import-bitmap-folder-as-single-tag "objects\scenery\example\bitmaps\combined-images"
```

* source-directory - A local data path to a folder containing the set of images to be combined

For the example above, Tool would expect to find .tif/.tiff files at `data\objects\scenery\example\bitmaps\combined-images`. Assuming no errors, the images will be compiled into a single .bitmap tag at `tags\objects\scenery\example\bitmaps`, using the name of the containing folder for the .bitmap name, e.g. `combined-images.bitmap`.

By default, the images will be imported as the `Interface Bitmap` type, this can be changed by re-saving the .bitmap tag with different settings, and running the command again.

The individual images will be imported as separate "sequences", or layers, inside the bitmap.

For images to be combined this way, Bungie naming convention is to name all of the images the same as the containing folder, with a numbered extension in square brackets for each. For example:
`flares_generic[0], flares_generic[1], flares_generic[2]....`. However, this is optional, and in some cases it may be better to give the images distinct names so that they can be more easily recognized within the bitmap.

# Sounds
## Reimport sounds
Goes through all sound tags in a directory or child directories. Any sound tags that are found will have their sound files from data reimported.

```sh
# reimport-sounds <source-directory> <compressor> <downmix> <-bank:suffix-where-suffix-is-a-fmod-bank-suffix-(optional)>
tool reimport-sounds "sound\dialog\combat" default downmix unit_dialog english
```

* source-directory - A local tag path to a directory or child directory containing sound tags.
* compressor - Specify the compressor (default, pcm, xma, xma2)
* downmix - Down mix the adpcm sample (downmix). This is an optional argument
* bank - Specify the fmod soundbank that should contain this sound. This is an optional argument

## Reimport sounds for senario
Reimports the sounds for a scenario if the sound data is found in the data folder.

```sh
# reimport-sounds-for-senario <scenario> <compressor> <downmix> <type> <-bank:suffix-where-suffix-is-a-fmod-bank-suffix-(optional)>
tool reimport-sounds-for-senario "levels\multi\riverworld\riverworld" default downmix music sfx
```

* scenario - A local tag path to a scenario without extension.
* compressor - Specify the compressor (default, pcm, xma, xma2)
* downmix - Down mix the adpcm sample (downmix). This is an optional argument
* type - Only reimport the sample if it matches the specified type criteria.
* bank - Specify the fmod soundbank that should contain this sound. This is an optional argument

## Reimport sounds single
Reimports the specified sound if sound data was found in the data folder.

```sh
# reimport-sounds-single <source-file> <compressor> <downmix> <-bank:suffix-where-suffix-is-a-fmod-bank-suffix-(optional)>
tool reimport-sounds "sound\dialog\combat" default downmix unit_dialog english
```

* source-file - A local tag path to a sound tag without extension.
* compressor - Specify the compressor (default, pcm, xma, xma2)
* downmix - Down mix the adpcm sample (downmix). This is an optional argument
* bank - Specify the fmod soundbank that should contain this sound. This is an optional argument

## Set sound class
Grabs all the sound tags in a directory and changes the class to whatever was specified by the user.

```sh
#  set-sound-class <source-directory> <path-spec> <new-sound-class>
tool set-sound-class sound_test ??? projectile_impact
```

* source-directory - A local tag path to the root of a directory containing sound tags or child folders with sound tags.
* path-spec - ???
* new-sound-class - A sound class string.

## Sound looping
???

```sh
#  sound-looping <source-directory> <type> [-bank:suffix-where-suffix-is-a-fmod-bank-suffix-(optional)]
tool sound-looping
```

* source-directory - ???
* type - ???
* bank - ???

## Sound looping scenery
???

```sh
#  sound-looping-scenery <source-directory> <type> [-bank:suffix-where-suffix-is-a-fmod-bank-suffix-(optional)]
tool sound-looping-scenery
```

* source-directory - ???
* type - ???
* bank - ???

## Sound multi layer
Imports sound files in a directory with the import type set to multi-layer. All sound files the source directory and child directories will be combined into one sound file.

```sh
#  sound-multi-layer <source-directory> <type> [-bank:suffix-where-suffix-is-a-fmod-bank-suffix-(optional)]
tool sound-multi-layer "sound_test" projectile_impact sfx
```

* source-directory - A local data path to a directory or child directories containing sound files. Supported extensions are WAV saved as 16 bit PCM and AIFF.
* type - Set the sound class
* bank - Specify the fmod soundbank that should contain this sound. This is an optional argument

## Sound single
Imports a single sound file

```sh
#  sound-single <source-file> <type> [-bank:suffix-where-suffix-is-a-fmod-bank-suffix-(optional)]
tool sound-multi-layer "sound_test\aiff" projectile_impact sfx
```

* source-file - A local data path to the root of a directory containing sound files. Supported extensions are WAV saved as 16 bit PCM and AIFF.
* type - Set the sound class
* bank - Specify the fmod soundbank that should contain this sound. This is an optional argument

## Sounds music
Generates an empty sound looping tag from the folders in data. Probably an error?

```sh
#  sounds-music <source-directory> <type> [-bank:suffix-where-suffix-is-a-fmod-bank-suffix-(optional)]
tool sounds-music "sound_test" projectile_impact sfx
```

* source-file - A local data path to the root of a directory or child directories containing sound files. Supported extensions are WAV saved as 16 bit PCM and AIFF.
* type - Set the sound class
* bank - Specify the fmod soundbank that should contain this sound. This is an optional argument

## Sounds one shot
Imports sound files in a directory with the import type set to single-shot. Each sound file will get its own sound tag.

```sh
#  sounds-one-shot <source-directory> <type> [-bank:suffix-where-suffix-is-a-fmod-bank-suffix-(optional)]
tool sounds-one-shot "sound_test" projectile_impact sfx
```

* source-file - A local data path to the root of a directory or child directories containing sound files. Supported extensions are WAV saved as 16 bit PCM and AIFF.
* type - Set the sound class
* bank - Specify the fmod soundbank that should contain this sound. This is an optional argument

## Sounds single layer
Imports sound files in a directory with the import type set to single-layer. Each directory will get its own sound tag.

```sh
#  sounds-single-layer <source-directory> <type> [-bank:suffix-where-suffix-is-a-fmod-bank-suffix-(optional)]
tool sounds-single-layer "sound_test" projectile_impact sfx
```

* source-file - A local data path to the root of a directory or child directories containing sound files. Supported extensions are WAV saved as 16 bit PCM and AIFF.
* type - Set the sound class
* bank - Specify the fmod soundbank that should contain this sound. This is an optional argument

## Sounds single mixed
Imports sound files in a directory with the import type set to single-layer. Each directory will get its own sound tag.

```sh
#  sounds-single-mixed <source-directory> <type> [-bank:suffix-where-suffix-is-a-fmod-bank-suffix-(optional)]
tool sounds-single-mixed "sound_test" projectile_impact sfx
```

* source-file - A local data path to the root of a directory or child directories containing sound files. Supported extensions are WAV saved as 16 bit PCM and AIFF.
* type - Set the sound class
* bank - Specify the fmod soundbank that should contain this sound. This is an optional argument

# Structure
A [ASS][] file containing level geometry can be compiled into a [scenario_structure_bsp][] tag.

```sh
# structure <ass-file>
tool structure "levels\multi\example\structure\example.ASS"
```

* ass-file - A local data path to a ASS file with extension.

For the example above, Tool would expect to find a corresponding ASS file at `data\levels\multi\example\structure\example.ASS`. Assuming no errors, it would be compiled into `tags\levels\multi\example\example.scenario_structure_bsp`. Geometry errors will cause Tool to create [WRL files][wrl-2.0] for troubleshooting.

Structure compilation converts the raw polygon and materials data from the ASS into data structures which are more efficient for Halo to use during rendering, collision tests, and AI pathfinding among other tasks. This step does not produce [lightmaps][scenario_structure_lightmap] -- see [baking lightmaps](#baking-lightmaps-faux).

Multiple ASS files can be placed in a level's `structure` directory for multiple BSPs (used for large singleplayer levels). Each ASS will be compiled into a separate structure BSP and added to the scenario.

# Broken and development commands
Not all commands work or are of any use to anyone anymore. They are listed here for completeness but shouldn't be used.

- `faux-unit-tests` - [Unit tests](unit-testing) for the lightmapping process. Currently these fail for an unknown reason but even if they succeeded they wouldn't be useful for end users.
- `dump-tag-table` - Broken/doesn't do anything. Intended use is unknown.
- `cubemap-farm-new` - This command does not work. Was intended to run a farm setup for generating cubemaps to be used by dynamic cubemap enabled shaders.
- `crash` - Intentionally induces a crash to test the crash reporting subsystem. Crash types: `test_fatal_error`, `assert`, `now` and `halt`
- `progress-quest` - Doesn't do anything other than display a progress bar.
- `old-physics` - Doesn't do anything at all.
- `convert-tag-files-pilot` - Doesn't work anymore as it tries to use a removed backend.
- `analyze-dvd-cache-files` - H3 no longer runs of a DVD.
- `build-cache-file-verify-dvd-layouts` - ...
- `analyze-shader` - Is meant to analyse shader performance but it doesn't work since it was designed for [Xenon](xenon).
- `analyze-shaders` - Runs out of 32-bit addressable memory and crashes.
- `faux_checkerboard`- is meant to compile checkboard quality lightmaps but it crashes for unknown reasons.
- `export-structure-mesh` - This command has not been updated for DX11. Avoid this command.
- `export-render-model-mesh` - This command has not been updated for DX11. Avoid this command.
- `export-fmod-banks` - FMOD banks are automatically updated so you shouldn't need to rebuild them.
- `dump-tag-file-index` - creates a copy of the tag_database_index.dat, seems like a dev command but maybe could be used to index tags without using Guerilla?
- `convert-pc-bitmaps` - Likely used when porting.

## Convert tag files explicit pilot
Converts tags from one backend to another. E.g. loose tag files to the monolithic backend.
Seems to crash, maybe will be fixed in the future. Likely not useful for non-devs.

```sh
# convert-tag-files-explicit-pilot <source-backend> <dest-backend> <optional:-tag-list>
tool convert-tag-files-explicit-pilot default monolithic_new ""
```

## Dump binary
Dumps binary files to a C style array. Meant for developers.

```sh
# dump-binary <binary-file> <output-file>
tool dump-binary "C:\processed_pixel_data.bin" "C:\processed_pixel_data_output.txt"
```

* binary-file - An absolute file path to a binary file with extension.
* output-file - An absolute file path to an output location with filename and extension

## Estimate overdraw threshold
Requires the shader compiler fix, but it's very useful seems to be designed for [Xenon](xenon).

```sh
# estimate-overdraw-threshold <effect>
tool estimate-overdraw-threshold "objects\weapons\turret\flamethrower\fx\projectile"
```

* effect - A local tag path to an effect tag without extension.


## Export game variant settings
Takes a `multiplayer_variant_settings_interface_definition` tag and outputs some debug info in command prompt.

```sh
# export-game-variant-settings <tag-file>
tool export-game-variant-settings "multiplayer\game_variant_settings\slayer\slayer.multiplayer_variant_settings_interface_definition"
```

* tag-file - A local tag path to a `multiplayer_variant_settings_interface_definition tag with extension.

## Export shipping game variants
Writes gametype bin files to your H3EK root. Currently broken.

```sh
# export-shipping-game-variants
tool export-shipping-game-variants
```


## Xbox live config commands?
These seem to be meant to configure Xbox live, likely not useful?

### Build and deploy network files
???

```sh
# build-and-deploy-network-files
tool build-and-deploy-network-files
```

### Build and deploy retail network files
???

```sh
# build-and-deploy-retail-network-files
tool build-and-deploy-retail-network-files
```

### Build and deploy tracked network files
???

```sh
# build-and-deploy-tracked-network-files
tool build-and-deploy-tracked-network-files
```

# Commands with unknown usage
Not much is know about these commands, if you know something let us know!

## Analysis commands
Tool includes a few commands to analyze (memory usage, read time, GPU usage, etc) files and caches but these aren't very useful for modders.
### Analyze cache file sharing
???

```sh
#  analyze-cache-file-sharing <starting-cache-file> <ending-cache-file>
tool analyze-cache-file-sharing
```

* starting-cache-file - ???
* ending-cache-file - ???

### Analyze font
???

```sh
#  analyze-font <font-file>
tool analyze-font
```

* font-file - ???

### Analyze font table
???

```sh
#  analyze-font-table <font-table-to-analyze>
tool analyze-font-table
```

* font-table-to-analyze - ???

### Analyze fonts
Crashes

```sh
#  analyze-fonts
tool analyze-fonts
```

### Analyze implicit sharing
???

```sh
#  analyze-implicit-sharing <tag-list>
tool analyze-implicit-sharing
```

* tag-list - ???


## Build animation database
???

```sh
# build-animation-database
tool build-animation-database
```

## Build cache file generate DLC layout
Crashes

```sh
# build-cache-file-generate-dlc-layout <map-name> <platform> <dedicated-server-(optional)> <use-fmod-data-(optional)>
tool build-cache-file-generate-dlc-layout "" pc
```

* map-name - ???
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument
* dedicated-server - ??? This is an optional argument.
* use-fmod-data - ??? This is an optional argument.

## Build cache file generate main menu layout
Crashes

```sh
# build-cache-file-generate-main-menu-layout <map-name> <platform> <dedicated-server-(optional)> <use-fmod-data-(optional)>
tool build-cache-file-generate-main-menu-layout "" pc
```

* map-name - ???
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument
* dedicated-server - ??? This is an optional argument.
* use-fmod-data - ??? This is an optional argument.

## Build cache file generate new layout
Crashes

```sh
# build-cache-file-generate-new-layout <map-name> <platform> <dedicated-server-(optional)> <use-fmod-data-(optional)>
tool build-cache-file-generate-new-layout "" pc
```

* map-name - ???
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument
* dedicated-server - ??? This is an optional argument.
* use-fmod-data - ??? This is an optional argument.

## Build cache file language version optimizable use sharing
Crashes

```sh
# build-cache-file-language-version-optimizable-use-sharing <target-language> <minor-version-number> <scenario> <platform> <sound-config> <dedicated-server-(optional)> <use-fmod-data-(optional)>
tool build-cache-file-language-version-optimizable-use-sharing english "" "levels\multi\chill\chill" pc
```

* target-language - ???
* minor-version-number - ???
* scenario - A local tag path to a scenario tag without extension.
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument
* sound-config - ???
* dedicated-server - ???
* use-fmod-data - ???

## Build cache file language version sharing main menu
Crashes

```sh
# build-cache-file-language-version-sharing-main-menu <target-language> <minor-version-number> <scenario> <platform>
tool build-cache-file-language-version-sharing-main-menu english "" "levels\multi\chill\chill" pc
```

* target-language - ???
* minor-version-number - ???
* scenario - A local tag path to a scenario tag without extension.
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument

## Build cache file link
???

```sh
# build-cache-file-link <scenario> <platform> <dedicated-server-(optional)> <use-fmod-data-(optional)>
tool build-cache-file-link "levels\multi\chill\chill" pc
```

* scenario - A local tag path to a scenario tag without extension.
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument
* dedicated-server - ???  This is an optional argument
* use-fmod-data - ???  This is an optional argument

## Build cache file optimize
???

```sh
# build-cache-file-optimize <map-name> <platform>
tool build-cache-file-optimize "chill" pc
```

* map-name - The filename of a map file located in your maps folder without extension
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument

## Build cache file optimize post link
Crashes

```sh
# build-cache-file-optimize-post-link <map-name> <platform>
tool build-cache-file-optimize-post-link "chill" pc
```

* map-name - The filename of a map file located in your maps folder without extension
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument

## Build cache file pilot
Crashes

```sh
# build-cache-file-pilot <scenario> <platform>
tool build-cache-file-pilot "levels\multi\chill\chill" pc
```

* scenario - A local tag path to a scenario tag without extension.
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument

## Build cache file profile
???

```sh
# build-cache-file-profile <scenario>
tool build-cache-file-profile "levels\multi\chill\chill"
```

* scenario - A local tag path to a scenario tag without extension.

## Build cache file use sharing
crashes

```sh
# build-cache-file-use-sharing <scenario> <platform> <target-language> <minor-version-number> <sound-config> <dedicated-server-(optional)> <use-fmod-data-(optional)>
tool build-cache-file-use-sharing "levels\multi\chill\chill" pc
```

* scenario - A local tag path to your scenario without the file extension
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument
* target-language - ??? This is an optional argument
* minor-version-number - ??? This is an optional argument
* sound-config - ??? This is an optional argument
* dedicated-server - ??? This is an optional argument
* use-fmod-data - ??? This is an optional argument

## Build cache file cache sounds index
???

```sh
# build-cache-file-cache-sounds-index <scenario> <append> <sound-configuration> <platform>
tool build-cache-file-cache-sounds-index
```

* scenario - ??? This is an optional argument
* append - ??? This is an optional argument
* sound-configuration - ??? This is an optional argument
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument

## Build cache file cache version
Build a cache files with a specific version

```sh
# build-cache-file-cache-version <minor-version-number> <platform>
tool build-cache-file-cache-version "" pc
```

* minor-version-number - ??? This is an optional argument
* platform - The platform this cache file is being built for. If nothing is set then it will default to `pc`. This is an optional argument


## Cache asset depot thumbnails
???

```sh
#  cache-asset-depot-thumbnails <tag-file>
tool cache-asset-depot-thumbnails
```

* tag-file - ???

## Cache asset depot thumbnails from directory
???

```sh
#  cache-asset-depot-thumbnails-from-directory <tag-directory>
tool cache-asset-depot-thumbnails-from-directory
```

* tag-directory - ???

## Cache asset depot thumbnails list
???

```sh
#  cache-asset-depot-thumbnails-list <tag-list>
tool cache-asset-depot-thumbnails-list
```

* tag-list - ???

## Convert tiled tiff
???

```sh
# convert-tiled-tiff <input-tiff-file> <output-tiff-file>
tool convert-tiled-tiff "F:\masterchief.tiff" "F:\masterchief_output.tiff"
```

* input-tiff-file - An absolute path to a tiff file.
* output-tiff-file - An absolute path to a path with filename and extension to generate the output file in.

## Create custom network hopper and variant files
???

```sh
# create-custom-network-hopper-and-variant-files <hopper-file>
tool create-custom-network-hopper-and-variant-files
```

* hopper-file - ???

## Create custom network hopper file
???

```sh
# create-custom-network-hopper-file <hopper-file>
tool create-custom-network-hopper-file
```

* hopper-file - ???

## Create custom network variant file
???

```sh
# create-custom-network-variant-file <variant-file> <output-directory>
tool create-custom-network-variant-file
```

* variant-file - ???
* output-directory - ???

## Create network hopper file
???

```sh
# create-network-hopper-file
tool create-network-hopper-file
```

## Dump cache resource gestalt
???

```sh
# dump-cache-resource-gestalt <cache-resource-gestalt>
tool dump-cache-resource-gestalt
```

* cache-resource-gestalt - ???

## Dump cache resource gestalt file locations
???

```sh
# dump-cache-resource-gestalt-file-locations <cache-resource-gestalt>
tool dump-cache-resource-gestalt-file-locations
```

* cache-resource-gestalt - ???

## Dump gestalt links
???

```sh
# dump-gestalt-links <cache-resource-gestalt> <tag/resource-substring> <tag-type>
tool dump-gestalt-links
```

* cache-resource-gestalt - ???
* tag/resource-substring - ???
* tag-type - ???

## Dump gestalt links from file
???

```sh
# dump-gestalt-links-from-file <cache-resource-gestalt> <file-of-tag/resource-substrings-(one-per-line)> <tag-type>
tool dump-gestalt-links
```

* cache-resource-gestalt - ???
* file-of-tag/resource-substrings - ???
* tag-type - ???

## Dump tiff to header
???

```sh
# dump-tiff-to-header <quantization-factor> <tiff-file> <constant-prefix-string> <output-file>
tool dump-tiff-to-header
```

* quantization-factor - ???
* tiff-file - ???
* constant-prefix-string - ???
* output-file - ???


## Export windows font
???

```sh
# export-windows-font <output-directory> <font-file-(optional)> <typeface-name> <point-size>
tool export-windows-font
```

* output-directory - ???
* font-file - ???
* typeface-name - ???
* point-size - ???

## Export xenon bitmap PFM
???

```sh
# export-xenon-bitmap-pfm <bitmap-tag> <output-path-prefix>
tool export-xenon-bitmap-pfm
```

* bitmap-tag - ???
* output-path-prefix - ???

## Faux build linear textures-with intensity from quadratic
???

```sh
# faux-build-linear-textures-with-intensity-from-quadratic <scenario> <bsp-name>
tool faux-build-linear-textures-with-intensity-from-quadratic "levels\multi\example\example" "example"
```

* scenario - A local tag path to a scenario without extension
* bsp-name - The name of a BSP tag referenced by the scenario tag

## Faux compress scenario bitmaps DXT5
???

```sh
# faux-compress-scenario-bitmaps-dxt5 <scenario> <bsp-name>
tool faux-compress-scenario-bitmaps-dxt5 "levels\multi\example\example" "example"
```

* scenario - A local tag path to a scenario without extension
* bsp-name - The name of a BSP tag referenced by the scenario tag

## Faux farm compression merge
???

```sh
# faux-farm-compression-merge <scenario> <bsp-name>
tool faux-farm-compression-merge "levels\multi\example\example" "example"
```

* scenario - A local tag path to a scenario without extension
* bsp-name - The name of a BSP tag referenced by the scenario tag


## Faux farm begin
???

```sh
# faux_farm_begin <scenario> <bsp-name> <light-group-name> <quality-setting> <job-id>
tool faux_farm_begin "levels\multi\example\example" "example" all direct_only 123
```

* scenario - A local tag path to a scenario without extension.
* bsp-name - The name of a BSP tag referenced by the scenario tag.
* light-group-name - Only light a certain region of the level.
* quality-setting - The quality used for lightmapping. The following are valid options:
	* direct_only
	* draft
	* debug
	* low
	* medium
	* high
	* super
* job-id - A random value to use for the faux data.

## Faux farm dillum
???

```sh
# faux_farm_dillum <blob-path> <client-index> <client-count>
tool faux_farm_dillum 
```

* blob-path - ???
* client-index - ???
* client-count - ???

## Faux farm dillum merge
???

```sh
# faux_farm_dillum_merge <blob-path> <client-count>
tool faux_farm_dillum 
```

* blob-path - ???
* client-count - ???




[wiki-tiff]: https://en.wikipedia.org/wiki/TIFF
[wiki-color]: https://en.wikipedia.org/wiki/Color_depth
[wiki-real]: https://en.wikipedia.org/wiki/Real_number
[wiki-wav]: https://en.wikipedia.org/wiki/WAV
[gdc-lighting]: https://www.gdcvault.com/play/253/Lighting-and-Material-of-HALO
[doi-lighting]: https://doi.org/10.1145/1404435.1404437
[python]: https://www.python.org/
[unit-testing]: https://en.wikipedia.org/wiki/Unit_testing
[xenon]: https://en.wikipedia.org/wiki/Xenon_(processor)
