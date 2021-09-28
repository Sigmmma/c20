```.alert
This is an article about the H2 Tool for use with MCC. For the legacy H2V Tool for [Halo 2 Vista][h2] see [H2V Tool][h2v-tool].
```

**H2-Tool** (**tool.exe**), is a [command-line][] utility used to compile data into [tags][], and tags into [maps][map]. It was released as a part of the [Halo 2 Editing Kit][H2-EK] by 343 Industries in 2021.

This new version of Tool has many differences from the 2007 Pi Studios Tool. Most notably, it includes far more verbs and new options for existing ones. A major addition is the FBX to ASS/JMS/JMA toolchain to compile models regardless of what 3D modeling software you use.

# Conventions used in this article

- `<arg>` - refers to a mandatory argument.
- `[arg]` - refers to an optional argument (you can omit these).
- parentheses appended to the `arg` name are used to encode valid argument values.
- `arg(option1, option2)` - Either `option1` or `option2` can be passed as `arg`.
- `arg(optionClass)` - Any value of `optionClass` can be used.
- `Tool` or `tool.exe` - refers to the subject of this article, the H2 Tool, if the legacy Tool is being referred to that will be made explicit.

# Command line flags
- `-data_dir` and `-tags_dir` can be used to change the data and tag directories respectively. This might not work with all verbs as it's experimental. See [using custom content paths][using-custom-content-paths].
- `-pause` wait for user input before exiting, useful for custom launchers.

# Batch bitmap compilation
[TIFF][wiki-tiff] (.tif/.tiff) images can be compiled into a [bitmap][] using the `bitmaps` verb:

```sh
# bitmaps <source-directory> [type] [debug-plate?]
tool bitmaps "scenarios\bitmaps\solo\spacestation"
```

* source-directory - A local data path to a folder containing a set of images for processing.
* type - sets the type of bitmap the image will be converted to. This will change how the source image is expected to be setup. The list of valid options is as follows:
	* *2d*
	* *3d*
	* *cubemaps*
	* *sprites*
	* *interface*
* debug-plate - Set this with a true or false. Dumps the processed image back to your data folder so that you may examine it in your preferred image editor. The path for these will be something like this.
	* data\bitmap-debug\

For the example above, Tool would expect to find .tif/.tiff files at `data\scenarios\bitmaps\solo\spacestation\`. Assuming no errors, each image file will be compiled into a bitmap tag at `tags\scenarios\bitmaps\solo\spacestation\`. Each image file that exists in the source directory will be compiled into its own individual tag with the name of the tag coming from the image filename.

Tool supports TIFF files with a [colour depth][wiki-color] of at least 8 bits per pixel, 32-bit color (8 bits per channel) being typical.

# Build cache file
A [scenario][] can be compiled into a [map][] using the `build-cache-file` verb. Simply provide your scenario's tag path. (the last two arguments are optional):

```sh
#  build-cache-file <scenario> [platform] [flags]
tool build-cache-file "scenarios\multi\example\example" dx11_64 compress|resource_sharing
tool build-cache-file "scenarios\multi\example\example" dx11_64 compress|resource_sharing
```

* scenario - A local tag path to your scenario without the file extension
* platform - Sets the platform the cache file is intended for. The default platform used and the only valid platform for MCC is as follows:
	* win64_dx11
* flags - A set of flags that can be used to toggle certain settings during cache complication. The options are as follows.
	* compress - If this string is present then the cache file will be compressed
	* resource_sharing - If this string is present then raw tag data, such as bitmap plate data, use shared maps for their data
	* mp_tag_sharing - If this string is present then tags will use shared maps for their data
	* multilingual_sounds  - If this string is present then the cache file will support and include multiple languages for sounds
	* remastered_support  - If this string is present then the cache file will support Saber3D

The resulting map file can be found in the editing kit's `h2_maps_win64_dx11` directory. This verb also generates reports under `reports\<mapname>` including a compilation-specific `debug.txt`.

# Build convolution map
???

```sh
#  build-convolution-map <tiff-file> <passes> <blur-subpasses> <e> <scale>
tool build-convolution-map
```

* tiff-file - ???
* passes - ???
* blur-subpasses - ???
* e - ???
* scale - ???

# Build gradient map
???

```sh
#  build-gradient-map <tiff-file> <width> <height> <exponent> <options>
tool build-gradient-map
```

* tiff-file - ???
* width - ???
* height - ???
* exponent - ???
* options - ???

# Build noise map
This command generates random noise like you would see in an image editor. The result can then be converted into a bitmap tag or taken to your image editing software to tweak further.

```sh
#  build-noise-map <tiff-file> <width> <height> <low-freq-skip> <high-freq-skip> <roughness> <blur-passes> <random-seed>
tool build-noise-map bitmap_test\256x256_20001_noise.tif 256 256 2 0 0 0 1
```

* tiff-file - A local data path to where the generated tiff will be placed. Make sure to include filename and extension.
* width - The width of the image with a max range of 16-4096. Value should be a power of 2 dimension
* height - The height of the image with a max range of 16-4096. Value should be a power of 2 dimension
* low-freq-skip - Low-frequency "octaves" to skip. A higher value means more noise
* high-freq-skip - High-frequency "octaves" to skip. A higher value more blur
* roughness - How smooth or rough the image is with a range of 0.0-1.0. With 0.0 being the smoothest image possible and 1.0 being the roughest image possible.
* blur-passes - The number of times to apply a blur pass.
* random-seed - A random seed for noise.

The resulting can be found in the `data` folder with the path you set in tiff-file.

# Build plasma control map
???

```sh
#  build-plasma-control-map <tiff-file> <k> <e>
tool build-plasma-control-map
```

* tiff-file - ???
* k - ???
* e - ???

# Build quadratic map
???

```sh
#  build-quadratic-map <tiff-file>
tool build-quadratic-map
```

* tiff-file - ???

# Build trace map
???

```sh
#  build-trace-map <tiff-file> <options> <time-bias> <time-scale> <min-delta-time> <max-delta-time>
tool build-trace-map
```

* tiff-file - ???
* options - ???
* time-bias - ???
* time-scale - ???
* min-delta-time - ???
* max-delta-time - ???

# Bulk collision
Multiple directories can have their collision files compiled in a single run using this command.

```sh
#  bulk-collision <jmi-file>
tool bulk-collision "objects\multi\jmi_Test.JMI"
```

* jmi-file - A local data path to where the JMI file is located.

# Bulk import crates
Compile multiple source directories in a single run to generate a crate tag and all the relevant tags involved.

```sh
#  bulk-import-crates <jmi-file>
tool bulk-import-crates "objects\multi\jmi_Test.JMI"
```

* jmi-file - A local data path to where the JMI file is located.

# Bulk import crates folder
Generates a crate tag and compiles the render, collision, and physics directory of a model in a single run. Just point it at the root of your model folder and go!

```sh
#  bulk-import-crates-folder <source-directory>
tool bulk-import-crates-folder "objects\multi\world_node_a"
```

* source-directory - A local data path to the root of a model source directory.

# Bulk import model folder
Generates a model tag and compiles the render, collision, and physics directory of a model in a single run. Just point it at the root of your model folder and go!

```sh
#  bulk-import-model-folder <source-directory>
tool bulk-import-model-folder "objects\multi\world_node_a"
```

* source-directory - A local data path to the root of a model source directory.

# Bulk import models
Compile multiple source directories in a single run to generate a model tag and all the relevant tags involved.

```sh
#  bulk-import-models <jmi-file>
tool bulk-import-models "objects\multi\jmi_Test.JMI"
```

* jmi-file - A local data path to where the JMI file is located.

# Bulk import scenery
Compile multiple source directories in a single run to generate a scenery tag and all the relevant tags involved.

```sh
#  bulk-import-scenery <jmi-file>
tool bulk-import-scenery "objects\multi\jmi_Test.JMI"
```

* jmi-file - A local data path to where the JMI file is located.

# Bulk import scenery folder
Generates a scenery tag and compiles the render, collision, and physics directory of a model in a single run. Just point it at the root of your model folder and go!

```sh
#  bulk-import-scenery-folder <source-directory>
tool bulk-import-scenery-folder "objects\multi\world_node_a"
```

* source-directory - A local data path to the root of a model source directory.

# Bulk physics
Multiple directories can have their physics files compiled in a single run using this command.

```sh
#  bulk-physics <jmi-file>
tool bulk-physics "objects\multi\jmi_Test.JMI"
```

* jmi-file - A local data path to where the JMI file is located.

# Bulk render
Multiple directories can have their render files compiled in a single run using this command.

```sh
#  bulk-render <jmi-file>
tool bulk-render "objects\multi\jmi_Test.JMI"
```

* jmi-file - A local data path to where the JMI file is located.

# Camera track
This commands takes a JMA file directly and converts it to a camera_track for the game. The length of the animation should be at most 16 as that is the max number of control points a camera track tag can contain. The JMA should contain a skeleton made up of a single bone that will change its position each frame. The orientation of the bone will determine the position and rotation of the control point for that index. The name of the JMA file will be the name of the tag.

```sh
# camera-track <source-file>
tool camera-track cameras\ohno.JMA
```

* source-file - A local data path to where the JMA file is located.

# Collision
A [JMS][] file containing a collision model can be compiled into a collision model tag

```sh
# collision <source-directory>
tool collision "objects\characters\masterchief"
```

* source-directory - A local data path to the root of a model source directory.

For the example above, Tool would expect to find a corresponding JMS file at `data\objects\characters\masterchief\collision\mc_collision.JMS`. Assuming no errors, it would be compiled into `tags\objects\characters\masterchief\masterchief.collision_model`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

# Convert pixel shaders
???

```sh
# convert-pixel-shaders
tool convert-pixel-shaders
```

# Convert tiled tiff
???

```sh
# convert-tiled-tiff <input-tiff-file> <output-tiff-file>
tool convert-tiled-tiff "(F:\masterchief.tiff" "F:\masterchief_output.tiff"
```

* input-tiff-file - An absolute path to a tiff file.
* output-tiff-file - An absolute path to a path with filename and extension to generate the output file in.

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

# Dialogue globals import
Compiles a CSV file to generate a new AI dialogue tag. The file path for the CSV file is `data\ai\ai_dialogue_globals.csv`

```sh
# dialogue-globals-import
tool dialogue-globals-import
```

# Dialogue import
Collects all sound tag paths and adds them to a generated dialogue tag.

```sh
# dialogue-import <root-directory>
tool dialogue-import "sound\dialog\combat\brute_bloodthirsty"
```

* root-directory - A local tag path to the root of a directory containing sound tags.

# Dump tiff to header
???

```sh
# dump-tiff-to-header <quantization-factor> <tiff-file> <constant-prefix-string> <output-file>
tool dump-tiff-to-header
```

* quantization-factor - ???
* tiff-file - ???
* constant-prefix-string - ???
* output-file - ???

# Dump uncompressed sounds
Prints the paths of sound tags that use `none (little endian)` as their compression format.

```sh
# dump-uncompressed-sounds <root-path>
tool dump-uncompressed-sounds "sound_remastered"
```

* root-path - A local tag path to the root of a directory containing sound tags.

# Export tag to XML
Dumps the tag values set in the tag to an XML format to easily compare in text editors.

```sh
# export-tag-to-xml <tag-file> <output-file>
tool export-tag-to-xml "(ABSOLUTE-PATH-TO-H2-EK)\tags\objects\characters\masterchief\masterchief.render_model" "(ABSOLUTE-PATH-TO-H2-EK)\tags\objects\characters\masterchief\masterchief.xml"
```

* tag-file - An absolute tag path with extension.
* output-file - A absolute path with file name and XML extension to set where to write the XML to.

# Export tags to XML
Exports multiple tags to multiple XML files in a single run to easily compare in text editors. Files will get dumped to the root of your H2-EK root unless you give an absolute path

```sh
# export-tags-to-xml <export-tag-to-xml-params-listing>
tool export-tags-to-xml "F:\tag_list.txt"
```

* export-tag-to-xml-params-listing - An absolute file path to a text file containing a list of tags to export. Sample file below.

## Format
```
<tag-file>,<output-file>
<tag-file>,<output-file>
<newline-here-is-not-optional>
```

## Sample
```
ui\hud\banshee.new_hud_definition,banshee.new_hud_definition.xml
ui\hud\battle_rifle.new_hud_definition,battle_rifle.new_hud_definition.xml

```

# Export windows font
???

```sh
# export-windows-font <output-directory> <font-file-(optional)> <typeface-name> <point-size>
tool export-windows-font
```

* output-directory - ???
* font-file-(optional) - ???
* typeface-name - ???
* point-size - ???

# Extract collision data
Extracts import info from a collision_model tag to retrieve the original JMS used to create the tag. Don't expect this command to do anything if there is no import info.

```sh
# extract-collision-data <collision_model>
tool extract-collision-data "objects\characters\masterchief\masterchief"
```

* collision_model - A local tag path to a collision tag without file extension.

# Extract HS scripts
Finds all scenario_hs_source_file tags in a directoty and dumps the contents to an .hsc file in data.

```sh
# extract-hs-scripts <name_substring>
tool extract-hs-scripts "scenarios\solo\01b_spacestation\scripts"
```

* name_substring - A local tag path to a directory containing scenario_hs_source_file tag files.

# Extract LPC data
Dumps a file called test.aif in the root of H2-EK
This is likely to be [linear predictive coding](https://en.wikipedia.org/wiki/Linear_predictive_coding) data for the sound file but this hasn't be verified.

```sh
# extract-lpc-data <sound-file>
tool extract-lpc-data "sound_test\aiff\soundtest.aiff"
```

* sound-file - A local data path to an AIF/AIFF file.

# Extract physics data
Extracts import info from a physics_model tag to retrieve the original JMS used to create the tag. Don't expect this command to do anything if there is no import info.

```sh
# extract-physics-data <physics_model>
tool extract-physics-data "objects\vehicles\scorpion\scorpion"
```

* physics_model - A local tag path to a physics_model tag without extension.

# Extract render data
Extracts import info from a render_model tag to retrieve the original JMS used to create the tag. Don't expect this command to do anything if there is no import info.

```sh
# extract-render-data <render_model>
tool extract-render-data "objects\vehicles\scorpion\scorpion"
```

* render_model - A local tag path to a render_model tag without extension.

# Extract structure data
Extracts import info from a scenario_structure_bsp tag to retrieve the original ASS/JMS used to create the tag. Don't expect this command to do anything if there is no import info.

```sh
# extract-structure-data <scenario_structure_bsp>
tool extract-structure-data "scenarios\solo\01b_spacestation\01_bsp_2"
```

* scenario_structure_bsp - A local tag path to a scenario_structure_bsp tag without extension.

# Extract unicode strings
Extract strings from multilingual_unicode_string_list and dumps the results back to a text file in data. Results may not match original source exactly so give the files a read to make sure tool won't have any issues.

```sh
# extract-unicode-strings <multilingual_unicode_string_list>
tool extract-unicode-strings "ui\hud\hud_messages"
```

* multilingual_unicode_string_list - A local tag path to a multilingual_unicode_string_list tag without extension.

# FBX to ASS
This command takes an FBX and converts it to an ASS file for Halo 2 level importing. Use this if you don't have access to an export script.

```sh
# fbx-to-ass <fbx> <ass>
tool fbx-to-ass "F:\dreamer.fbx" "F:\dreamer.ASS"
```

* fbx - An absolute filepath to a valid FBX file.
* ass - An absolute filepath that includes name and extension to write the output to.

For some details on how to setup the FBX file see [FBX for H2][fbx].

# FBX to JMA
This command takes an FBX and converts it to an animation source file for Halo 2 importing. Use this if you don't have access to an export script. Be aware that the extension can be any of the avaliable extensions for animation importing. It does not specifically needs to be JMA. You can type JMO as the extension and the output is still valid.

```sh
# fbx-to-jma <fbx> <jma> [Start-frame] [Last-frame]
tool fbx-to-jma "E:\my_fbx_files\cyborg_dab.fbx" F:\cyborg_my_custom_anim.JMA
tool fbx-to-jma "E:\my_fbx_files\cyborg_dab.fbx" F:\cyborg_my_custom_anim.JMA 5 10
```

* fbx - An absolute filepath to a valid FBX file.
* jma - An absolute filepath that includes name and extension to write the output to.
* Start-frame - Sets the first frame index that the converter will start from. Use this if you want only a specific section of an animation from your FBX. This arg is optional so you can leave this and Last-frame out if you want the animation as is.
* Last-frame - Sets the last frame index that the converter will end on. Use this if you want only a specific section of an animation from your FBX. This arg is optional so you can leave this and Last-frame out if you want the animation as is.

For some details on how to setup the FBX file see [FBX for H2][fbx].

# FBX to JMS

```sh
# fbx-to-jms <render-or-collision-or-physics> <fbx> <jms>
tool fbx-to-jms render "F:\dreamer.fbx" "F:\dreamer.JMS"
```

* render-or-collision-or-physics - Sets the type of geo this FBX is for. Use either render, collision, or physics only. The geo class set will determine what geometry gets exported from the JMS
* fbx - An absolute filepath to a valid FBX file.
* jms - An absolute filepath that includes name and extension to write the output to.

For some details on how to setup the FBX file see [FBX for H2][fbx].

# Fix model materials
Sets global material names for model tags in a directory if the name is invalid.

```sh
# fix-model-materials <root-directory> <material-name>
tool fix-model-materials "incompetent" hey
```

* root-directory - A local tag path to a directory containing model tags.
* material-name - What to set the global material name to.

# Fix tags
Various command to fix up tags. Almost all of them are meant for porting Xbox to PC.

```sh
# fix-tags <action>
tool fix-tags count-scripts
```


* action - What action to take. Type something invalid like "help" to see a full list of options.

Most commands will not do anything but a few might be useful if you have a very specific issue.


# FP model animations
Import animation source files as a first person animation. Use this if you're making FP weapon animations.

```sh
# fp-model-animations <source-directory> <character-directory> <weapon-directory> [flags]
tool fp-model-animations "objects\characters\masterchief\fp\weapons\rifle\fp_smg" "objects\characters\masterchief\fp" "objects\weapons\rifle\smg\fp_smg"
```

* source-directory - A local data path to the root of a model source directory.
* character-directory - A local data path to the root of the first person character model source directory the weapon is using.
* weapon-directory - A local data path to the root of the first person weapon model source directory the character is using.
* flags - ??? This is an optional arg.

# Import damage table
Imports `data\globals\armor_vs_damage.csv` to generate a tag.

```sh
# import-damage-table
tool import-damage-table
```

# Import decorator set
Imports a JMI set to generate a decorator_set tag.

```sh
# import-decorator-set <jmi-file>
tool import-decorator-set "objects\characters\brute\garbage\brute_helmet.JMI"
```

* jmi-file - A local data path to a JMI file.

# Import particle set
Imports a JMI set to generate a particle tag.

```sh
# import-particle-model <jmi-file>
tool import-particle-model "objects\characters\brute\garbage\brute_helmet.JMI"
```

* jmi-file - A local data path to a JMI file.


# Lightmap merge

```.alert danger
Multi-instance/worker lightmaps currently don't work. Use [single instance lightmaps][h2-tool#Lightmaps] for now.
```

Merge the results from `lightmap-slave` to form the final lightmap bitmap tag.

```sh
# lightmap-merge <scenario> <bsp-name> <slave-count>
tool lightmap-merge "scenarios\multi\halo\coagulation\coagulation" "coagulation" 2
```

* scenario - A local tag path to a scenario tag without extension.
* bsp-name - The name of a scenario_structure_bsp tag without extension and belongs to the referenced scenario.
* slave-count - The number of lightmap-slaves that were used.

# Lightmap render model
Generates section leaves in a render_model tag. Probably meant to test PRT related things.

```sh
# lightmap-rendermodel <render-model>
tool lightmap-rendermodel "scenarios\objects\covenant\military\scarab\scarab"
```

* scenario - A local tag path to a render_model tag without extension.

# Lightmap slave

```.alert danger
Multi-instance/worker lightmaps currently don't work. Use [single instance lightmaps][h2-tool#Lightmaps] for now.
```

Run a lightmap-slave instance to cut down on time spent lighting. Make sure to run `lightmap-merge` afterwards to complete the process.

```sh
# lightmap-slave <scenario> <bsp-name> <quality-setting> <slave-index> <slave-count>
tool lightmap-slave "scenarios\multi\halo\coagulation\coagulation" "coagulation" direct_only 0 3
```

* scenario - A local tag path to a scenario tag without extension.
* bsp-name - The name of a scenario_structure_bsp tag without extension and belongs to the referenced scenario.
* quality-setting - Standard Halo 2 light quality string. The list of options is as follows.
	* checkerboard
	* cuban
	* draft_low
	* draft_medium
	* draft_high
	* draft_super
	* direct_only
	* low
	* medium
	* high
	* super
* slave-index - The instance ID starting from 0. The range for this depends on the number set for slave-count.
* slave-count - The number of instances that will be launched.

# Lightmaps
Run a lightmap instance. No fuss no muss.

```sh
# lightmaps <scenario> <bsp-name> <quality-setting>
tool lightmaps "scenarios\multi\halo\coagulation\coagulation" "coagulation" direct_only
```

* scenario - A local tag path to a scenario tag without extension.
* bsp-name - The name of a scenario_structure_bsp tag without extension and belongs to the referenced scenario.
* quality-setting - Standard Halo 2 light quality string. The list of options is as follows.
	* checkerboard
	* cuban
	* draft_low
	* draft_medium
	* draft_high
	* draft_super
	* direct_only
	* low
	* medium
	* high
	* super

# Lightmaps debug
A command to debug lightmaps. Debug them how you ask? That's an excellent question! Lets move on to the next command.

```sh
# lightmaps-debug <scenario> <bsp-name> <quality-setting> <begin-light-index> <end-light-index>
tool lightmaps-debug "scenarios\multi\halo\coagulation\coagulation" "coagulation" direct_only 0 1
```

* scenario - A local tag path to a scenario tag without extension.
* bsp-name - The name of a scenario_structure_bsp tag without extension and belongs to the referenced scenario.
* quality-setting - Standard Halo 2 light quality string. The list of options is as follows.
	* checkerboard
	* cuban
	* draft_low
	* draft_medium
	* draft_high
	* draft_super
	* direct_only
	* low
	* medium
	* high
	* super
* begin-light-index - ???
* end-light-index - ???

# Lightprobes
???

```sh
# lightprobes <scenario> <bsp-name> <quality-setting>
tool lightprobes "scenarios\multi\halo\coagulation\coagulation" "coagulation" direct_only
```

* scenario - A local tag path to a scenario tag without extension.
* bsp-name - The name of a scenario_structure_bsp tag without extension and belongs to the referenced scenario.
* quality-setting - Standard Halo 2 light quality string. The list of options is as follows.
	* checkerboard
	* cuban
	* draft_low
	* draft_medium
	* draft_high
	* draft_super
	* direct_only
	* low
	* medium
	* high
	* super

# Mission dialogue import
Gathers all sound tags in a directory to generate an ai_mission_dialogue tag

```sh
# mission-dialogue-import <root-directory>
tool mission-dialogue-import "sound\dialog\levels\08_controlroom"
```

* root-directory - A local tag path to a directory containing a cinematic and mission folder that contain sound files.

# Model animation count
Goes to all the animations in a directory and child directories. Once it's done it prints debug info.

```sh
# model-animation-count <source-directory>
tool model-animation-count "objects\characters\masterchief"
```

* source-directory - A local tag path to a directory containing model_animation_graph tags or child folders with model_animation_graph tags.

# Model animation reset compression
???

```sh
# model-animation-reset-compression <model-animation-graph>
tool model-animation-reset-compression "objects\characters\masterchief\masterchief"
```

* model-animation-reset-compression - A local tag path to a model_animation_graph tag without file extensions.

# Model animation status
Goes to all the animations in a directory and child directories. Once it's done it prints debug info.

```sh
# model-animation-status <source-directory>
tool model-animation-status "objects\characters\masterchief"
```

* source-directory - A local tag path to a directory containing model_animation_graph tags or child folders with model_animation_graph tags.

# Model animations
A set of animation source files can be compiled into a model_animation_graph tag

```sh
# model-animations <source-directory> [flags]
tool model-animations "objects\characters\masterchief"
```

* source-directory - A local data path to the root of a model source directory.
* flags - ???

For the example above, Tool would expect to find a set of corresponding animation source files at `data\objects\characters\masterchief\animations`. Assuming no errors, it would be compiled into `tags\objects\characters\masterchief\masterchief.model_animation_graph`.

# Monitor bitmaps
Keeps watch of the data directory for any file changes. If any tiff places are modified or placed in the data directory then tool will immediately attempt to import the image file as bitmap tags.

```sh
# monitor-bitmaps
tool monitor-bitmaps
```

# Monitor models
Keeps watch of the data directory for any file changes. If any model related intermediate files are modified or moved to the data directory then tool will immediately attempt to import the source files as render_model, coliision_model, or physics_model tags.

```sh
# monitor-models
tool monitor-models
```

# Monitor structures
Keeps watch of the data directory for any file changes. If any level related intermediate files are modified or moved to the data directory then tool will immediately attempt to import the source files as levels.

```sh
# monitor-structures
tool monitor-structures
```

# New strings
Converts all text files in a directory to multilingual_unicode_string_list tags. Text files should be saved as UTF-16

```sh
# new-strings <source-directory>
tool new-strings "ui\hud"
```

* source-directory - A local data path to a directory containing text files.


# Pack unicode strings
This command generates the STR files found in the font folder. These files contain the string data the game reads to display text ingame.

```sh
# pack-unicode-strings <language> <tag-list-file>
tool pack-unicode-strings en "F:\Program Files (x86)\Steam\steamapps\common\Halo MCCEK\Halo Assets\2\Vanilla\data\strings_list.txt"
```

* language - The language you are compiling a STR file for. The following the the list of languages currently used by MCC.
	* chs
	* cht
	* de
	* en
	* es
	* fr
	* it
	* jpn
	* kor
	* pt_br
	* sp
* tag-list-file - An absolute file path to a text file containing a list of multilingual_unicode_string_list tags to include in the packaged STR file.

## Format
```
<local-tag-file-path>
```

## Sample
```
ui\screens\singleplayer\07a_highcharity
ui\screens\game_shell\settings_screen\variant_settings\editing_format_screens\quick_options
```

# Physics
A [JMS][] file containing physic meshes can be compiled into a physics_model tag

```sh
# physics <source-directory>
tool physics "objects\characters\masterchief"
```

* source-directory - A local data path to the root of a model source directory.

For the example above, Tool would expect to find a corresponding JMS file at `data\objects\characters\masterchief\physics\masterchief_ragdoll.JMS`. Assuming no errors, it would be compiled into `tags\objects\characters\masterchief\masterchief.physics_model`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

# Pixel shaders
???

```sh
# pixel-shaders <platform>
tool pixel-shaders
```

* platform - ???

# Plate
Gather images in a directory and set up a plate with all the images placed properly. Useful for creating animated textures from multiple images easily.

```sh
# plate <source-directory> [raw?]
tool plate "F:\bitmap_test" true
```

* source-directory - An absolute file path to a directory containing image files.
* raw - An optional arg to enable RAW file importing when building a plate. The files must be named in the following format.
	* filename_WxH.RAW
	* Replace W and H with the width and height of the image respectively.

# Process sounds
???

```sh
# process-sounds <source-directory> <path-spec> <command> <value>
tool process-sounds
```

* source-directory - ???
* path-spec - ???
* command - ???
* value - ???

# PRT simulation

```.alert danger
A utility required to run the PRT simulation was not shipped with the initial release of the tools. The commands are currently non-functional.
```

Run a PRT simulation on an already existing render_model tag.

```sh
# prt-simulation <render-model>
tool prt-simulation "scenarios\objects\covenant\military\scarab\scarab"
```

* render-model - A local tag path to a render_model tag without extension.

# Rebuild scenario scripts
Recompiles HSC script files from data using the scenario_hs_source_file tags referenced in the scenario tag.

```sh
# rebuild-scenario-scripts <scenario>
tool rebuild-scenario-scripts "scenarios\solo\01b_spacestation\01b_spacestation"
```

* scenario - A local tag path to a scenario tag without extension.

# Rebuild structure audibility
???

```sh
# rebuild-structure-audibility <structure>
tool rebuild-structure-audibility "scenarios\solo\01b_spacestation\01_bsp_2"
```

* structure - A local tag path to a scenario_structure_bsp tag without extension.

# Reimport model animations
???

```sh
# reimport-model-animations
tool reimport-model-animations
```

# Reimport sounds
Goes through all sound tags in a directory or child directories. Any sound tags that are found will have their sound files from data reimported.

```sh
# reimport-sounds <source-directory>
tool reimport-sounds "sound\dialog\combat"
```

* source-directory - A local tag path to a directory or child directory containing sound tags.

# Reimport sounds single
Reimports the specified sound if sound data was found in the data folder.

```sh
# reimport-sounds-single <source-file>
tool reimport-sounds-single "sound\dialog\combat\brute_bloodthirsty\01_alert\coming"
```

* source-file - A local tag path to a sound tag without extension.

# Reimport sounds to opus
Goes through all sound tags in a directory or child directories. Any sound tags that are found will have their sound files from data reimported. Sounds reimported using this command will use Opus for their compression setting.

```sh
# reimport-sounds-to-opus <source-directory>
tool reimport-sounds-to-opus "sound\dialog\combat"
```

* source-directory - A local tag path to a directory or child directory containing sound tags.

# Reimport sounds to opus single
Reimports the specified sound if sound data was found in the data folder. Sounds reimported using this command will use Opus for their compression setting.

```sh
# reimport-sounds-to-opus-single <source-directory>
tool reimport-sounds-to-opus-single "sound\dialog\combat\brute_bloodthirsty\01_alert\coming"
```

* source-directory - A local tag path to a directory or child directory containing sound tags.

# Render

```.alert danger
A utility required to run the PRT simulation was not shipped with the initial release of the tools. The commands are currently non-functional.
Attempting to import a render model that uses it will not work for now.
```

A [JMS][] file containing render geometry can be compiled into a render_model tag

```sh
#  render <source-directory> [accurate?] [run-prt?]
tool render "objects\characters\masterchief" false false
```

* source-directory - A local data path to the root of a model source directory.
* accurate - ???
* run-prt - Run a PRT simulation on the import data. Skinned meshes are not supported.

For the example above, Tool would expect to find a corresponding JMS file at `data\objects\characters\masterchief\render\L5_masterchief.JMS`. Assuming no errors, it would be compiled into `tags\objects\characters\masterchief\masterchief.render_model`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

# Replace font char
???

```sh
#  replace-font-char <font-file> <tiff-file> <utf16-code>
tool replace-font-char
```

* font-file - ???
* tiff-file - ???
* utf16-code - ???

# Scenario analyze
Run an action on a scenario for debug purposes.

```sh
#  scenario-analyze <scenario> <inspection-type>
tool scenario-analyze "scenarios\multi\halo\coagulation\coagulation" "count tags"
```

* scenario - A local tag path to a scenario tag without extension.
* inspection-type - The action to run on the referenced scenario. Make sure to surround it in quotes since someone at Bungie thought it would be funny.
	* count tags
	* dump tags
	* find material references
	* count edges
	* check effects
	* dump scenery

# Set sound class
Grabs all the sound tags in a directory and changes the class to whatever was specified by the user.

```sh
#  set-sound-class <source-directory> <path-spec> <new-sound-class>
tool set-sound-class sound_test ??? projectile_impact
```

* source-directory - A local tag path to the root of a directory containing sound tags or child folders with sound tags.
* path-spec - ???
* new-sound-class - A sound class string.

# Sound looping
???

```sh
#  sound-looping <source-directory> <type> <compression>
tool sound-looping
```

* source-directory - ???
* type - ???
* compression - ???

# Sound looping scenery
???

```sh
#  sound-looping-scenery <source-directory> <type> <compression>
tool sound-looping-scenery
```

* source-directory - ???
* type - ???
* compression - ???

# Sound multi layer
Imports sound files in a directory with the import type set to multi-layer. All sound files the source directory and child directories will be combined into one sound file.

```sh
#  sound-multi-layer <source-directory> <type> <compression>
tool sound-multi-layer "sound_test" projectile_impact adpcm
```

* source-directory - A local data path to a directory or child directories containing sound files. Supported extensions are WAV saved as 16 bit PCM, WMA, and AIFF.
* type - Set the sound class
* compression - Set the compression. The list of valid options is as follows.
	* uncompressed
	* adpcm
	* opus

# Sound single
Imports a single sound file

```sh
#  sound-single <source-file> <type> <compression>
tool sound-multi-layer "sound_test\aiff" projectile_impact adpcm
```

* source-file - A local data path to the root of a directory containing sound files. Supported extensions are WAV saved as 16 bit PCM, WMA, and AIFF.
* type - Set the sound class
* compression - Set the compression. The list of valid options is as follows.
	* uncompressed
	* adpcm
	* opus

# Sounds music
Generates an empty sound looping tag from the folders in data. Probably an error?

```sh
#  sounds-music <source-directory> <type> <compression>
tool sounds-music "sound_test" projectile_impact adpcm
```

* source-file - A local data path to the root of a directory or child directories containing sound files. Supported extensions are WAV saved as 16 bit PCM, WMA, and AIFF.
* type - Set the sound class
* compression - Set the compression. The list of valid options is as follows.
	* uncompressed
	* adpcm
	* opus

# Sounds one shot
Imports sound files in a directory with the import type set to single-shot. Each sound file will get its own sound tag.

```sh
#  sounds-one-shot <source-directory> <type> <compression>
tool sounds-one-shot "sound_test" projectile_impact adpcm
```

* source-file - A local data path to the root of a directory or child directories containing sound files. Supported extensions are WAV saved as 16 bit PCM, WMA, and AIFF.
* type - Set the sound class
* compression - Set the compression. The list of valid options is as follows.
	* uncompressed
	* adpcm
	* opus

# Sounds single layer
Imports sound files in a directory with the import type set to single-layer. Each directory will get its own sound tag.

```sh
#  sounds-single-layer <source-directory> <type> <compression>
tool sounds-single-layer "sound_test" projectile_impact adpcm
```

* source-file - A local data path to the root of a directory or child directories containing sound files. Supported extensions are WAV saved as 16 bit PCM, WMA, and AIFF.
* type - Set the sound class
* compression - Set the compression. The list of valid options is as follows.
	* uncompressed
	* adpcm
	* opus

# Sounds single mixed
Imports sound files in a directory with the import type set to single-layer. Each directory will get its own sound tag.

```sh
#  sounds-single-mixed <source-directory> <type> <compression>
tool sounds-single-mixed "sound_test" projectile_impact adpcm
```

* source-file - A local data path to the root of a directory or child directories containing sound files. Supported extensions are WAV saved as 16 bit PCM, WMA, and AIFF.
* type - Set the sound class
* compression - Set the compression. The list of valid options is as follows.
	* uncompressed
	* adpcm
	* opus

# strip-single-tag-file
Imports sound files in a directory with the import type set to single-layer. Each directory will get its own sound tag.

```sh
#  strip-single-tag-file <tag>
tool strip-single-tag-file "objects\characters\masterchief\masterchief.render_model"
```

* tag - A local tag path to a tag file with extension.

# Structure
A [JMS][] file containing level geometry can be compiled into a [scenario_structure_bsp][] tag. Do not use this command for level imports as it's outdated.

```sh
# structure <scenario-directory> <bsp-name>
tool structure "scenarios\multi\example" "example"
```

* scenario-directory - A local data path to root directory of a level.
* bsp-name - The JMS filename without extension.

For the example above, Tool would expect to find a corresponding JMS file at `data\scenarios\multi\example\structure\example.JMS`. Assuming no errors, it would be compiled into `tags\scenarios\multi\example\example.scenario_structure_bsp`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

Structure compilation converts the raw polygon and materials data from the JMS into data structures which are more efficient for Halo to use during rendering, collision tests, and AI pathfinding among other tasks. Note that [lightmaps][] are **not** produced during this step, but rather with the [lightmaps verb](#lightmaps). Structure compilation will create a [scenario][] tag if one does not exist already.

Multiple JMS files can be placed in a level's `structure` directory for multiple BSPs (used for large singleplayer levels). Each JMS will be compiled into a separate structure BSP and added to the scenario. Scripts and trigger volumes can then be used to switch between the BSPs.

# Structure analyze
A dev command for running misc tasks on a scenario, unlikely to be useful.

```sh
# structure-analyze <scenario_structure_bsp>
tool structure-analyze "scenarios\multi\halo\coagulation\coagulation"
```

* scenario_structure_bsp - A local tag path to a scenario_structure_bsp tag without extension.

# Structure compatible
A [JMS][] file containing level geometry can be compiled into a [scenario_structure_bsp][] tag. Do not use this command for level imports as it's outdated.

```sh
# structure-compatible <scenario-directory> <bsp-name>
tool structure-compatible "scenarios\multi\example" "example"
```

* scenario-directory - A local data path to root directory of a level.
* bsp-name - The JMS filename without extension.

For the example above, Tool would expect to find a corresponding JMS file at `data\scenarios\multi\example\structure\example.JMS`. Assuming no errors, it would be compiled into `tags\scenarios\multi\example\example.scenario_structure_bsp`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

Structure compilation converts the raw polygon and materials data from the JMS into data structures which are more efficient for Halo to use during rendering, collision tests, and AI pathfinding among other tasks. Note that [lightmaps][] are **not** produced during this step, but rather with the [lightmaps verb](#lightmaps). Structure compilation will create a [scenario][] tag if one does not exist already.

Multiple JMS files can be placed in a level's `structure` directory for multiple BSPs (used for large singleplayer levels). Each JMS will be compiled into a separate structure BSP and added to the scenario. Scripts and trigger volumes can then be used to switch between the BSPs.

# Structure compatible from JMS
A [JMS][] file containing level geometry can be compiled into a [scenario_structure_bsp][] tag. Do not use this command for level imports as it's outdated.

```sh
# structure-compatible-from-jms <jms-file>
tool structure-compatible-from-jms "scenarios\multi\example\structure\example.JMS"
```

* jms-file - A local data path to a JMS file with extension.

For the example above, Tool would expect to find a corresponding JMS file at `data\scenarios\multi\example\structure\example.JMS`. Assuming no errors, it would be compiled into `tags\scenarios\multi\example\example.scenario_structure_bsp`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

Structure compilation converts the raw polygon and materials data from the JMS into data structures which are more efficient for Halo to use during rendering, collision tests, and AI pathfinding among other tasks. Note that [lightmaps][] are **not** produced during this step, but rather with the [lightmaps verb](#lightmaps). Structure compilation will create a [scenario][] tag if one does not exist already.

Multiple JMS files can be placed in a level's `structure` directory for multiple BSPs (used for large singleplayer levels). Each JMS will be compiled into a separate structure BSP and added to the scenario. Scripts and trigger volumes can then be used to switch between the BSPs.

# Structure from JMS
A [JMS][] file containing level geometry can be compiled into a [scenario_structure_bsp][] tag. Do not use this command for level imports as it's outdated.

```sh
# structure-from-jms <jms-file>
tool structure-from-jms "scenarios\multi\example\structure\example.JMS"
```

* jms-file - A local data path to a JMS file with extension.

For the example above, Tool would expect to find a corresponding JMS file at `data\scenarios\multi\example\structure\example.JMS`. Assuming no errors, it would be compiled into `tags\scenarios\multi\example\example.scenario_structure_bsp`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

Structure compilation converts the raw polygon and materials data from the JMS into data structures which are more efficient for Halo to use during rendering, collision tests, and AI pathfinding among other tasks. Note that [lightmaps][] are **not** produced during this step, but rather with the [lightmaps verb](#lightmaps). Structure compilation will create a [scenario][] tag if one does not exist already.

Multiple JMS files can be placed in a level's `structure` directory for multiple BSPs (used for large singleplayer levels). Each JMS will be compiled into a separate structure BSP and added to the scenario. Scripts and trigger volumes can then be used to switch between the BSPs.

# Structure new
A [ASS][] file containing level geometry can be compiled into a [scenario_structure_bsp][] tag. Do not use this command for level imports as it's outdated.

```sh
# structure-new <scenario-directory> <bsp-name>
tool structure-new "scenarios\multi\example" "example"
```

* scenario-directory - A local data path to root directory of a level.
* bsp-name - The ASS filename without extension.

For the example above, Tool would expect to find a corresponding ASS file at `data\scenarios\multi\example\structure\example.ASS`. Assuming no errors, it would be compiled into `tags\scenarios\multi\example\example.scenario_structure_bsp`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

Structure compilation converts the raw polygon and materials data from the JMS into data structures which are more efficient for Halo to use during rendering, collision tests, and AI pathfinding among other tasks. Note that [lightmaps][] are **not** produced during this step, but rather with the [lightmaps verb](#lightmaps). Structure compilation will create a [scenario][] tag if one does not exist already.

Multiple ASS files can be placed in a level's `structure` directory for multiple BSPs (used for large singleplayer levels). Each ASS will be compiled into a separate structure BSP and added to the scenario. Scripts and trigger volumes can then be used to switch between the BSPs.

# Structure new from ass
A [ASS][] file containing level geometry can be compiled into a [scenario_structure_bsp][] tag.

```sh
# structure-new-from-ass <ass-file>
tool structure-new-from-ass "scenarios\multi\example\structure\example.ASS"
```

* ass-file - A local data path to a ASS file with extension.

For the example above, Tool would expect to find a corresponding ASS file at `data\scenarios\multi\example\structure\example.ASS`. Assuming no errors, it would be compiled into `tags\scenarios\multi\example\example.scenario_structure_bsp`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

Structure compilation converts the raw polygon and materials data from the JMS into data structures which are more efficient for Halo to use during rendering, collision tests, and AI pathfinding among other tasks. Note that [lightmaps][] are **not** produced during this step, but rather with the [lightmaps verb](#lightmaps). Structure compilation will create a [scenario][] tag if one does not exist already.

Multiple ASS files can be placed in a level's `structure` directory for multiple BSPs (used for large singleplayer levels). Each ASS will be compiled into a separate structure BSP and added to the scenario. Scripts and trigger volumes can then be used to switch between the BSPs.

# Structure new verbose from ass
A [ASS][] file containing level geometry can be compiled into a [scenario_structure_bsp][] tag. This version of the structure command gives verbose output.

```sh
# structure-new-verbose-from-ass <ass-file>
tool structure-new-verbose-from-ass "scenarios\multi\example\structure\example.ASS"
```

* ass-file - A local data path to a ASS file with extension.

For the example above, Tool would expect to find a corresponding ASS file at `data\scenarios\multi\example\structure\example.ASS`. Assuming no errors, it would be compiled into `tags\scenarios\multi\example\example.scenario_structure_bsp`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

Structure compilation converts the raw polygon and materials data from the JMS into data structures which are more efficient for Halo to use during rendering, collision tests, and AI pathfinding among other tasks. Note that [lightmaps][] are **not** produced during this step, but rather with the [lightmaps verb](#lightmaps). Structure compilation will create a [scenario][] tag if one does not exist already.

Multiple ASS files can be placed in a level's `structure` directory for multiple BSPs (used for large singleplayer levels). Each ASS will be compiled into a separate structure BSP and added to the scenario. Scripts and trigger volumes can then be used to switch between the BSPs.

# Structure plane debug
???
Something about a plane_debug_geometry.txt

```sh
# structure-plane-debug <scenario-directory> <bsp-name>
tool structure-plane-debug "scenarios\multi\example" "example"
```

* scenario-directory - A local data path to root directory of a level.
* bsp-name - The ASS filename without extension.

# Structure plane debug generate
???

```sh
# structure-plane-debug-generate <scenario-directory> <bsp-name>
tool structure-plane-debug-generate "scenarios\multi\example" "example"
```

* scenario-directory - A local data path to root directory of a level.
* bsp-name - The ASS filename without extension.

# Structure verbose
A [JMS][] file containing level geometry can be compiled into a [scenario_structure_bsp][] tag. Do not use this command for level imports as it's outdated. This version of the structure command gives verbose output.

```sh
# structure-verbose <scenario-directory> <bsp-name>
tool structure-verbose "scenarios\multi\example" "example"
```

* scenario-directory - A local data path to root directory of a level.
* bsp-name - The JMS filename without extension.

For the example above, Tool would expect to find a corresponding JMS file at `data\scenarios\multi\example\structure\example.JMS`. Assuming no errors, it would be compiled into `tags\scenarios\multi\example\example.scenario_structure_bsp`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

Structure compilation converts the raw polygon and materials data from the JMS into data structures which are more efficient for Halo to use during rendering, collision tests, and AI pathfinding among other tasks. Note that [lightmaps][] are **not** produced during this step, but rather with the [lightmaps verb](#lightmaps). Structure compilation will create a [scenario][] tag if one does not exist already.

Multiple JMS files can be placed in a level's `structure` directory for multiple BSPs (used for large singleplayer levels). Each JMS will be compiled into a separate structure BSP and added to the scenario. Scripts and trigger volumes can then be used to switch between the BSPs.

# Structure verbose from JMS
A [JMS][] file containing level geometry can be compiled into a [scenario_structure_bsp][] tag. Do not use this command for level imports as it's outdated. This version of the structure command gives verbose output.

```sh
# structure-verbose-from-jms <jms-file>
tool structure-verbose-from-jms "scenarios\multi\example\structure\example.JMS"
```

* jms-file - A local data path to a JMS file with extension.

For the example above, Tool would expect to find a corresponding JMS file at `data\scenarios\multi\example\structure\example.JMS`. Assuming no errors, it would be compiled into `tags\scenarios\multi\example\example.scenario_structure_bsp`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

Structure compilation converts the raw polygon and materials data from the JMS into data structures which are more efficient for Halo to use during rendering, collision tests, and AI pathfinding among other tasks. Note that [lightmaps][] are **not** produced during this step, but rather with the [lightmaps verb](#lightmaps). Structure compilation will create a [scenario][] tag if one does not exist already.

Multiple JMS files can be placed in a level's `structure` directory for multiple BSPs (used for large singleplayer levels). Each JMS will be compiled into a separate structure BSP and added to the scenario. Scripts and trigger volumes can then be used to switch between the BSPs.

# Structure verbose new
A [ASS][] file containing level geometry can be compiled into a [scenario_structure_bsp][] tag. This version of the structure command gives verbose output.

```sh
# structure-verbose-new <scenario-directory> <bsp-name>
tool structure-verbose-new "scenarios\multi\example\structure\example.ASS"
```

* scenario-directory - A local data path to root directory of a level.
* bsp-name - The ASS filename without extension.

For the example above, Tool would expect to find a corresponding ASS file at `data\scenarios\multi\example\structure\example.ASS`. Assuming no errors, it would be compiled into `tags\scenarios\multi\example\example.scenario_structure_bsp`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

Structure compilation converts the raw polygon and materials data from the JMS into data structures which are more efficient for Halo to use during rendering, collision tests, and AI pathfinding among other tasks. Note that [lightmaps][] are **not** produced during this step, but rather with the [lightmaps verb](#lightmaps). Structure compilation will create a [scenario][] tag if one does not exist already.

Multiple ASS files can be placed in a level's `structure` directory for multiple BSPs (used for large singleplayer levels). Each ASS will be compiled into a separate structure BSP and added to the scenario. Scripts and trigger volumes can then be used to switch between the BSPs.

# Tag file report
???

```sh
# tag-file-report <tag-file>
tool tag-file-report "scenarios\multi\halo\coagulation\coagulation.scenario_structure_bsp"
```

* scenario-directory - A local tag path to a tag file with extension.

# Verify sound folder
Gathers all sounds in a directory or child directories and prints some debug info at the end.

```sh
# verify-sound-folder <root-path>
tool verify-sound-folder "sound\characters"
```

* root-path - A local tag path to a directory or child directories containing sound tags.

# Verify tag load
???

```sh
# verify-tag-load <tag-file>
tool verify-tag-load
```

* tag-file - ???

# Version
Outputs the build version for tool.exe

```sh
# version
tool version
```

# Vertex shader
???

```sh
# vertex-shader <platform> <src-platform> <shader>
tool vertex-shader
```

* platform - ???
* src-platform - ???
* shader - ???

# Vertex shaders
???

```sh
# vertex-shaders <platform> <src-platform>
tool vertex-shaders
```

* platform - ???
* src-platform - ???

# Windows font
???

```sh
# windows-font <font-file> <-ea:n-where-n-is-a-number-(optional)>
tool windows-font
```

* font-file - ???
* ea:n - ???


# Obsolete commands
A few commands in tool don't do anything of note:
* `old-physics <source-directory>`
* `lightmap-farm <scenario> <bsp-name> <quality-setting> <priority> <branch>`
* `lightmap-farm-update-sql <scenario-directory> <bsp-name> <sql_record_id>`
* `dump-tag-table <tag-type>`
* Most `fix-tags` subcommands.

[wiki-tiff]: https://en.wikipedia.org/wiki/TIFF
[wiki-color]: https://en.wikipedia.org/wiki/Color_depth
[wiki-real]: https://en.wikipedia.org/wiki/Real_number
[wiki-wav]: https://en.wikipedia.org/wiki/WAV
