---
title: H1 Tool
about: 'tool:H1-Tool'
img: h1a-tool-structure.png
caption: Importing the tutorial BSP tag from JMS format.
keywords:
  - lightmap
  - radiosity
  - cli
  - h1atool
  - tool
  - h1
  - import
redirects:
  - /h1/tools/hek/tool
  - /h1/tools/h1a-ek/h1a-tool
related:
  - /h2/tools/h2-ek/h2-tool
  - /h3/h3-ek/h3-tool
thanks:
  num0005: Documenting H1A commands and updating documentation for other commands.
  gbMichelle: Hardcoded tag patch reversing
  MosesOfEgypt: Explanation of radiosity passes
  General_101: Documenting tool commands (legacy and some H1A)
  Kavawuvi: Warning about Tool only using marker from superhigh LOD
  Vaporeon: Explaining how invader-build treats the Jason Jones opt-out flag
---
**H1A Tool** (**tool.exe**), is a [command-line](~) utility used to import [source data](~source-data) into [tags](~), and build tags into [maps](~maps).

This page covers both H1A and [HEK](~custom-edition#halo-editing-kit) versions of Tool. Its usage has generally not changed, but the new version of Tool has [many differences](~h1-ek#tool) including more verbs, new options for existing ones, usability improvements, and the addition of the FBX to JMS/JMA asset pipeline.

# Conventions used in this article

- `<arg>` - refers to a mandatory argument.
- `[arg]` - refers to an optional argument (you can omit these).
- parentheses appended to the `arg` name are used to encode valid argument values.
- `arg(option1, option2)` - Either `option1` or `option2` can be passed as `arg`.
- `arg(optionClass)` - Any value of `optionClass` can be used.
- `Tool` or `tool.exe` - refers to the subject of this article, the H1A Tool, if the legacy Tool is being referred to that will be made explicit.

# Command line flags

- `-noassert` command line flag can be used with any verb to disable all asserts.
- `-data_dir`, `-tags_dir`, and `-game_root_dir` can be used to change the tags, data, and maps directories. This might not work with all verbs as it's experimental. See [using custom content paths](~mod-tools#using-custom-content-paths).
- `-pause` wait for user input before exiting, useful for custom launchers.

# Verbs
Each type of Tool command is called a _verb_, and each verb can take several _arguments_, all separated by spaces. Arguments which include spaces need to be enclosed in quotes.

{% alert %}
Tool is used via Command Prompt. Don't worry if you're not unfamiliar -- [we've got you covered](~command-line).
{% /alert %}

## animations
[Animation data](~animation-data) files containing transforms for a skeleton can be imported into a [model_animations](~) tag using the `animations` verb:

```cmd
Usage: animations <source-directory>
tool animations "characters\cyborg"
```

Arguments:
* source-directory - A local data path to the root of a model source directory.

For the example above, Tool would expect to find corresponding animation data files at `data\characters\cyborg\animations\`. Assuming no errors, it would be imported as `tags\characters\cyborg\cyborg.model_animations`.

The source files can have different extensions. That depends on the type of animation they are intended to be. See the page about [animation data](~animation-data) for information about the various extensions and the different types of animation.

Add [rename.txt](~rename-txt) to reuse animations as other animations, without copying and renaming files.

## bitmap
Import a single TIFF image into a [bitmap](~) using the `bitmap` verb:

```cmd
Usage: bitmap <source-file> [debug-plate?]
tool bitmap "characters\cyborg\bitmaps\cyborg"
```

Arguments:
* source-file - A local data path to a tiff without extension.
* debug-plate - H1A Tool only. Set this with a `true` or `false`. Dumps the processed image back to your data folder so that you may examine it in your preferred image editor. The path for these will be something like `data\bitmap-debug\`.

For the example above, Tool would expect to find a _.tif or .tiff_ file at `data\characters\cyborg\bitmaps\cyborg.tif`. Assuming no errors, the image file will be imported into a bitmap tag at `tags\characters\cyborg\bitmaps\cyborg.bitmap`. The bitmap filename will come from the image filename.

As with the `bitmaps` verb, TIFF files must have at least 8-bit colour depth and are typically 32-bit. Image data is encoded using DirectXTex.

## bitmaps
A folder of [TIFF][wiki-tiff] (.tif/.tiff) images can be bulk-imported into [bitmap](~) tags using the `bitmaps` verb:

```cmd
Usage: bitmaps <source-directory> [2d|3d|cubemaps|sprites|interface] [debug-plate?]
tool bitmaps "characters\cyborg\bitmaps"
```

Arguments:
* source-directory - A local data path to a folder containing a set of images for processing.
* type - H1A Tool only. sets the type of bitmap the image will be converted to. This will change how the source image is expected to be setup. The list of valid options is as follows:
  * *2d*
  * *3d*
  * *cubemaps*
  * *sprites*
  * *interface*
* debug-plate - H1A Tool only. Set this with a `true` or `false`. Dumps the processed image back to your data folder so that you may examine it in your preferred image editor. The path for these will be something like `data\bitmap-debug\`.

For the example above, Tool would expect to find .tif/.tiff files at `data\characters\cyborg\bitmaps\`. Assuming no errors, each image file will be imported into a bitmap tag at `tags\characters\cyborg\bitmaps\`. Each image file that exists in the source directory will be imported into its own individual tag with the name of the tag coming from the image filename.

With HEK Tool, **all images must use the _.tif_ extension** for this command to work. If you have _.tiff_ files in the source directory, then rename their extensions to _.tif_. This is not a problem with H1A Tool.

Tool supports TIFF files with a [colour depth][wiki-color] of at least 8 bits per pixel, 32-bit color (8 bits per channel) being typical.

## build-cache-file
A [scenario](~) can be built into a [map](~maps) using the `build-cache-file` verb. Simply provide your scenario's tag path and choose classic or remastered mode (the last two arguments are optional):

```cmd
Usage: build-cache-file <scenario-name> <classic|remastered> [resource-map-usage<none|read|read_write>] [log-tag-loads]
tool build-cache-file "levels\test\tutorial\tutorial"
tool build-cache-file "levels\test\tutorial\tutorial" classic none
```

Arguments:
* scenario-name - A local tag path to your scenario without the file extension.
* classic|remastered - H1A Tool only. Whether or not S3D is disabled. There is no way to edit S3D files currently so only use remastered if you know what you're doing:
  * `classic` - Disables the S3D graphics engine. Users will not be able to toggle to the remastered graphics or sounds. This is intended for custom maps that don't support remastered graphics.
  * `remastered` - Enables the S3D graphics engine. Users will be able to toggle to the remastered graphics and sounds. This is intended for building maps compatible with S3D-based remastered graphics and sounds. Some HUD bitmaps will be read from S3D data files instead of tags. Make sure you're not including any objects in your map which don't have remastered graphics support, such as the flamethrower, or else MCC will crash.
* resource-map-usage - H1A Tool only. How Tool uses [resource maps](~maps#resource-maps) such a bitmaps.map and sounds.map during map packaging.
  * `none` - Tool will build self-contained maps and resource maps will not be used during packaging. All assets will be internalized. This is the default and also the behaviour when resource maps are missing from their expected location under the editing kit's `maps` folder.
  * `read` - Tool will allow your map to rely on tags within `maps\bitmaps.map` and `maps\sounds.map` if present. Any assets that don't exist will instead be internalized. Make sure the resource maps are exact copies of the ones the game will use at runtime, or else the assets will be incorrectly referenced and all textures will appear corrupted in-game.
  * `read_write` - Tool will add bitmaps and sounds from the map being built into the respective resource maps if they weren't already present. [Lightmaps](~) bitmaps are still kept in the map's own cache file rather than added to `bitmaps.map`.
* log-tag-loads - H1A Tool only. A `true` or `false` arg that writes the tags loading during packaging to `tool_tags_loaded.txt` in the H1AEK root. This helps build a list of tags needed for a scenario if you are releasing a tag set.

Note: H1A Tool will never update nor read `loc.map` because it is unused in H1A aside from H1CE compatibility.

The resulting map file can be found in the editing kit's `maps` directory. This verb also generates reports under `reports\<mapname>` including a compilation-specific `debug.txt` and a `tag_dump.txt`.

{% alert type="danger" %}
H1A Tool recompiles scripts during cache build using **.hsc source files** from the [data directory](~source-data) when available. HEK Tool _only_ uses sources stored [within the scenario tag](~scenario#tag-field-source-files) which was sometimes a source of confusion.

**It is very important** that you extract the mod tool's provided `data.zip` so the campaign scripts are available for this step because the scripts contained within the scenario tags themselves are not enough to build the stock campaign maps correctly.
{% /alert %}

### Hardcoded tag patches
There are a number of gameplay-balancing tag patches ("Jason Jones edits") made at runtime on Xbox, but also at map build time by Tool. These patches are only made to [singleplayer scenarios](~scenario#tag-field-type):

| Tag type        | Tag path                          | Changes
|-----------------|-----------------------------------|----------------
|[weapon](~)       |`weapons\pistol\pistol`            |Min error and first error angle to `0.2` degrees, second error angle to `0.4` for first trigger
|[damage_effect](~)|`weapons\pistol\bullet`            |Elite energy shield damage modifier to `0.8`
|[weapon](~)       |`weapons\plasma rifle\plasma rifle`|First error angle to `0.25` degrees, second error to `2.5` for first trigger

H1A introduced a [new scenario flag](~scenario#tag-field-flags-do-not-apply-bungie-campaign-tag-patches) to opt out of these changes. It's obviously not supported by the legacy HEK Tool, but if the flag is present in the scenario tag [invader-build](~) will still respect it when targeting Custom Edition.

These changes are made only to the resulting tag data in the built map file, not your loose tags. But be careful when extracting tags from singleplayer maps (both PC and Xbox)! You will actually overwrite the original weapon tags and cause your custom multiplayer maps to _also_ use these values.

## build-resource-list
Resource lists are used by the S3D engine (engine developed in-house by [Saber Interactive](https://en.wikipedia.org/wiki/Saber_Interactive) that's used for the remastered graphics). This verb is only applicable to H1A Tool.

```cmd
Usage: build-resource-list <scenario-name>
tool build-resource-list a10
tool build-resource-list bloodgulch
```

Arguments:
* scenario-name - The name of a scenario file without extension.

The command will create the resource list in the `..\preload\lsa` folder relative to the current working directory.
It is your responsibility to ensure this path exists, it will fail silently if it doesn't.

## camera-track
H1A Tool only. This commands takes a JMA file path and imports it as a [camera_track](~) tag. The length of the animation should be at most 16 frames, wich is the maximum number of control points a camera_track tag can contain. The JMA should contain a skeleton made up of a single bone that will change its position each frame. The orientation of the bone will determine the position and rotation of the control point for that index. The name of the JMA file will be the name of the tag.

```cmd
Usage: camera-track <source-file>
tool camera-track cameras\mytrack.jma
```

Arguments:
* source-file - A local data path to where the JMA file is located.

## check-map
H1A Tool only. This checks the scenario tag and tags it references for issues. Errors will be printed to console. You should not consider this to be a complete check for any invalid tag data; [invader-build](~) can do a much better job of that.

```cmd
Usage: check-map <scenario-name>
tool check-map levels\test\my_broke_level\my_broke_level
```

Arguments:
* scenario-name - A local tag path to your scenario without the file extension.


## check-shaders
H1A Tool only. Checks all the [shader](~) tags in a tag path (including sub-directories). Errors will be printed to console.

```cmd
Usage: check-shaders <root-directory>
tool check-shaders levels\test\my_broke_level
```

Arguments:
* root-directory - A local tag path to a directory containing shader tags.

## collision-geometry
Imports a [JMS](~) file containing a collision model to a [model_collision_geometry](~) tag.

```cmd
Usage: collision-geometry <source-directory> [fix-phantom-bsp]
tool collision-geometry "scenery\rock"
tool collision-geometry "scenery\rock" true
```

Arguments:
* source-directory - A local data path to the root of a model source directory. Tool will look for the JMS file under the `physics` folder within.
* fix-phantom-bsp - H1A Tool only. Set `true` to attempt fixing [model collision artifacts](~model_collision_geometry#phantom-bsp) by enabling the same fixup code used for structure BSPs.

For the example above, Tool would expect to find a corresponding JMS file at `data\scenery\rock\physics\rock.JMS`. Assuming no errors, it would be imported as `tags\scenery\rock\rock.model_collision_geometry`. Geometry errors will generate a [WRL file](~wrl) for troubleshooting, located either in the same folder as the JMS (H1A Tool) or in the root of the mod tools (HEK Tool).

Permutations and LODs are also supported using the same file name conventions as [render model importing](#gbxmodel):

```sh
# <permutation_string> <lod_level>.JMS
base superhigh.JMS
```

## compile-shaders
H1A Tool only. Compiles the [shader files](https://en.wikipedia.org/wiki/Shader) in the `shaders` subdirectory into `fx.bin`, `psh.bin` and `vsh.bin`. These are not the same as the [shader](~) tags and unless you have a working understanding of 3D graphics programming you don't need to touch this command. You would use this to create distributable graphics modifications for your mod which alter how the game is rendered.

```cmd
Usage: compile-shaders <xbox1|xbox1_debug|dx11|dx11_debug> <fx|psh|vsh|all>
tool compile-shaders dx11 all
```

Arguments:
* xbox1|xbox1_debug|dx11|dx11_debug - What platform to compile shaders for:
  * xbox1 - Compile shaders for the Xbox One platform
  * xbox1_debug - Compile debug shaders for the Xbox One platform
  * dx11 - Compile shaders for the PC platform
  * dx11_debug - Compile debug shaders for the PC platform
* fx|psh|vsh|all - What files to compile.
  * fx
  * psh
  * vsh
  * all

The `xbox1` and `xbox1_debug` target platforms won't work without a copy of the XDK; [which is not publicly available](https://docs.microsoft.com/en-us/gaming/xbox-live/get-started/setup-ide/managed-partners/vstudio-xbox/live-where-to-get-xdk).


## copy-detail-objects
H1A Tool only. This command takes two scenarios and copies [detail objects](~detail_object_collection) from the source to the destination. The scenarios do not have to be the same but it was probably intended to be used on child scenarios. This command has no output to indicate success or failure so you will have to check if the detail objects got copied correctly yourself.

```cmd
Usage: copy-detail-objects <source scenario> <destination scenario>
tool copy-detail-objects levels\test\deathisland\deathisland levels\test\my_deathisland_test\my_deathisland_test
```

Arguments:
* source scenario - A local tag path to your scenario without the file extension.
* destination scenario - A local tag path to your scenario without the file extension.

## dump-metagame-info
H1A Tool only. Dumps information about the "metagame" (MCC scoring information) to a file `metagame_info_dump.txt`.

```cmd
tool dump-metagame-info
```

## export-sounds-to-fsb
H1A uses FMOD as its sound middleware. This command builds a FMOD SoundBank file for that use case.

```cmd
Usage: export-sounds-to-fsb <sound\sfx path>
tool export-sounds-to-fsb "sound\sfx" # export all sounds in sounds/sfx
tool export-sounds-to-fsb "" # export all sounds that exist
```

Arguments:
* sound\sfx path - tag path from which sounds will be exported. Can be an empty string to export all sounds.

Builds a `sounds_adpcm.fsb` and `sounds_adpcm.lst.bin` using `data\sounds\tags.lst` to decide which sounds it needs to include, you can find a copy of this file in your MCC install at: `<MCC root>\halo1\sound\pc\lst\tags.lst`

Make sure you have plenty of free disk space as it will cache the sound data in `.fsbcache`. This directory can be deleted once you are done building the SoundBank.

## export-structure-mesh-obj
H1A Tool only. This writes a scenario's first BSP's render mesh to OBJ format in standard output. Don't use this to bring models into your 3D software; instead use the [Halo Asset Blender Development Toolset](~halo-asset-blender-development-toolset/) to import the BSP tag directly with better support.

```cmd
Usage: export-structure-mesh-obj <scenario-tag-path>
tool export-structure-mesh-obj levels\tutorial\tutorial # print in the console
tool export-structure-mesh-obj levels\a30\a30 > output.obj # write to a file
```

Although Tool prints the argument as an optional `[tag]` in its usage, not providing it will crash Tool. It does not appear to be possible to specify a specific BSP of a scenario; Tool will select the first BSP of the scenario.

The OBJ file is extremly basic. It comes from the BSP's renderable mesh and does not include materials, normals, or UV coordinates, and all triangles are separated. The OBJ file uses the Y-up convention unlike Halo itself which is Z-up.

## export-tag-to-xml
H1A Tool only. This exports a tag to XML format, but some data isn't included so should only be used to compare tags and not as an alternative storage format.

```cmd
Usage: export-tag-to-xml <tag file> <output file>
tool export-tag-to-xml tags\ui\english.virtual_keyboard english.virtual_keyboard.xml
tool export-tag-to-xml ui\english.virtual_keyboard english.virtual_keyboard.xml
```

## export-tags-to-xml
H1A Tool only. Exports multiple tags to multiple XML files.

```cmd
Usage: export-tags-to-xml <params listing file> [ignore-structure-bsps?]
tool export-tags-to-xml tags.txt 1
```

Sample params listing file:
```
ui\gamespy.font,gamespy.font.xml
ui\interstate.font,interstate.font.xml

```

Make sure to include a new line after each entry (including the last), otherwise the export file name will be corrupted.

## fbx-to-jma
H1A Tool only. This is used to create [JMA](~general/source-data/animation-data) files from an FBX file. The start and end keyframes are optional and will default to including the full animation provided. For some details on how to setup the FBX file see [FBX for H1A](~fbx).

```cmd
Usage: fbx-to-jma <in-file> <out-file> [animation-start-keyframe] [animation-end-keyframe]
tool fbx-to-jms data\characters\cyborg\models\cyborg_my_custom_anim.fbx data\characters\cyborg\animations\cyborg_my_custom_anim.jma
tool fbx-to-jms E:\my_fbx_files\cyborg_dab.fbx data\characters\cyborg\animations\cyborg_my_custom_anim.jms
```

*You need to use a standard file path not a path relative to the `data` folder*

## fbx-to-jms
H1A Tool only. This is used to create [JMS](~) files from an FBX file. For some details on how to setup the FBX file see [FBX for H1A](~fbx).

```cmd
Usage: fbx-to-jms <in-file> <out-file>
tool fbx-to-jms data\characters\cyborg\models\cyborg.fbx data\characters\cyborg\models\cyborg.jms
tool fbx-to-jms E:\my_fbx_files\better_cyborg.fbx data\characters\cyborg\models\cyborg.jms
```

*You need to use a standard file path not a path relative to the `data` folder*

## find-dialogue
H1A Tool only. This command allows scanning a directory (including sub-directories) for sound references to add to a [dialogue](~) tag.

```cmd
Usage: find-dialogue <dialogue tag> <directory>
tool find-dialogue test\test_dialogue sound\dialog\jackal\combat2
```

The command can at most process 512 sounds during one invocation as that is the size of the buffer it stores the filenames in. If you invoke it on a larger directory it will say it found 512 files even when there are more in the directory.

## hud-messages
Imports UTF-16 LE text files with an [.HMT extension](~hmt) into a [hud_message_text](~) tag.

```cmd
Usage: hud-messages <path> <scenario-name>
tool hud-messages "levels\a10" "a10"
```

For the example above, Tool would expect to find a text file at `data\levels\a10\hud messages.hmt`. Assuming no errors, a file named "hud messages.hmt" would be imported at `tags\levels\a10\hud messages.hud_message_text`.

It's important that the file's name be "hud messages.hmt". Tool specifically looks for a file with this name when importing HUD messages. An HMT file is just a text file, so you can just create it with notepad. Make sure the extension is ".hmt" and the file is UTF-16 LE encoded. The text file must also exist in the root of the scenario folder in data. See [more in-depth instructions](~hmt#creating-a-text-file-for-hud-messages) on writing the file.

| Error | Solution
|------------------------------------------------------------------|----------
| `the text specified is not 16-bit unicode text`                  | Ensure the file is saved with UTF-16 LE encoding.
| `cannot import hud message text that isn't named "hud messages"` | Rename the file to "hud messages.hmt".

## import-device-defaults
Unknown purpose.

```cmd
# import-device-defaults <defaults|profiles> <savegame path>
tool import-device-defaults <(defaults,profiles)> <savegame path>
```

## lightmaps
{% figure src="radiosity.jpg" %}
The radiosity process can be visualized in Sapien using `rasterizer_wireframe 1`. Notice how shadow edges and high detail shaders are subdivided more.
{% /figure %}

This generates static lighting ([lightmaps](~)) for a level's BSP using the radiosity process. Although you can also [use Sapien](~h1-sapien#radiosity), it's recommended to use Tool since it's faster.

```cmd
Usage: lightmaps <scenario> <bsp index> <quality> <stop threshhold>
tool lightmaps "levels\test\tutorial\tutorial" tutorial 0 0.1
tool lightmaps "levels\a30\a30" a30_b 1 0.0001 -noassert
```

Arguments:
1. **Scenario [tag path](~tags#tag-references-and-paths)**: This is _not_ a file path! Leave off the ".scenario" extension and start the path from within the tags directory.
2. **BSP name:** The name of the BSP tag without the file extension. Although this is labeled as "bsp index" in Tool's usage, it is not intended to be a numeric value.
3. **Radiosity quality:** A value of 0 runs an inaccurate "fast radiosity", with fewer light bounces, a lower resolution lightmap, and ignoring light occlusion or blocking caused by models. A value of 1 runs a "full radiosity", which is much slower but is used for the release version of maps. For further details, see the [radiosity quality settings](#radiosity-quality-technical-details) below.
4. **Stop threshold:** Light is cast in multiple passes from each surface, getting progressively finer with each pass. Each pass also reduces the total amount of light to be cast from each surface. When the average radiosity of the scene reaches this value, the process will stop and results get saved. This is the equivalent of choosing when to run `radiosity_save` in Sapien.


After a short time, you should observe a number counting down towards 0. The radiosity process will stop once this number reaches your "stop" argument. If the number counts _up_ instead, it indicates an issue with your level geometry and you should cancel radiosity to address it (check for [WRL](~) warnings). Radiosity can also fail outright on [degenerate UV coordinates](~bsp-troubleshooting#degenerate-triangle-or-triangle-with-bad-uvs-blue) when using _simple parameterization_ shaders. This will generate a [WRL](~) called `debug.wrl` located either beside your level's JMS file (H1A Tool) or in the root of the HEK.

Consider using the `-noassert` command line flag to increase speed at the expense of skipping error checking. This should only be used once you know your structure won't cause assertions without the flag and you want to skip doing these checks again during high quality lightmaps.

If your level's lighting is always coming out black, make sure you actually have emitters of light and set a sky reference in your scenario in the case of outdoor levels.

### Radiosity quality technical details

| Radiosity quality | Default stop threshold| Samples per [sky light](~sky#tag-field-lights) |
|-------------------|-----------------------|---------------------------|
|0 (preview)        | 10.0 / 255.0          | 4                         |
|1 (final)          | 1.0 / 255.0           | 16                        |

The radiosity process internally subdivides/tessellates the mesh into an intermediate lightmap structure which is much denser in some places. Depending on the radiosity quality chosen and [shader detail level](~shader#tag-field-detail-level), different constraints will be placed on this process:

| Radiosity quality         | Shader detail level | Max adjacent light difference   | Minimum edge length | Lit patch max edge length | Unlit patch max edge length |
|---------------------------|---------------------|---------------------------------|---------------------|------------------------------------|--------------------------------------|
| 0 (preview)               | High                | 1.0                             | 0.5                 | 2.0                                | 4.0                                  |
| 0 (preview)               | Medium              | 2.0                             | 1.0                 | 4.0                                | 8.0                                  |
| 0 (preview)               | Low                 | 3.0                             | 2.0                 | 8.0                                | 16.0                                 |
| 0 (preview)               | Turd                | float_max                       | 20.0                | 40.0                               | 80.0                                 |
| 1 (final)                 | High                | 0.5                             | 0.125               | 0.5                                | 0.9                                  |
| 1 (final)                 | Medium              | 0.7                             | 0.3                 | 1.2                                | 2.4                                  |
| 1 (final)                 | Low                 | 0.8                             | 0.5                 | 2.0                                | 4.0                                  |
| 1 (final)                 | Turd                | float_max                       | 20.0                | 40.0                               | 80.0                                 |


## merge-scenery
This verb can merge the scenery tag blocks of the source scenario to the destination scenario. This was probably used to automate work on [child scenarios](~scenario#child-scenarios) in Halo's development.

```cmd
Usage: merge-scenery <source scenario> <destination scenario>
tool.exe merge-scenery "levels\a30\a30" "levels\my_a30\my_a30"
```

For the example above, Tool would expect to find a source scenario tag file at `tags\levels\a10\a10.scenario`. The tag blocks in the scenery tag block will be copied over to the destination scenario tag file at `tags\levels\my_a30\my_a30.scenario`. This will not include scenery palette tag block or object names tag block so watch out for bad indices.

## model
A [JMS](~) file containing model geometry can be compiled into a [gbxmodel](~) using the `model` verb:

```cmd
Usage: model <source-directory> [use-halo2-permutation-lod-selection-logic?]
tool model "scenery\rock"
tool model "weapons\mygun" 1
```

For the example above, Tool would expect to find a corresponding JMS file at `data\scenery\rock\models\rock.JMS`. Assuming no errors, it would be imported as `tags\scenery\rock\rock.gbxmodel`. Geometry errors will cause Tool to create [WRL files](~wrl) for troubleshooting, located either adjacent to the JMS or in the HEK root.

Something to note is that Tool reads the filename of the JMS to decide how to generate specific tag data for the model. The format for this is as follows:

```sh
# <permutation_string> <lod_level>.JMS
base superhigh.JMS
```

[Permutations](~gbxmodel#permutations) are variants for model's [regions](~gbxmodel#regions). LODs (level of detail) are different quality models rendered depending on the object's size on screen. Permutations can be named arbitrarily, though they should match a model's existing permutation names if modifying an existing asset. LOD needs to use a specific string from the list below:

* `superhigh`
* `high`
* `medium`
* `low`
* `superlow`

Use multiple JMS files to generate multiple permutations in a model.

{% alert type="danger" %}
Tool only uses [markers](~gbxmodel#markers) from the `superhigh` LOD when making a model tag. If you don't have a superhigh LOD (i.e. you have something explicity set as superlow/low/medium/high but not superhigh), no markers will be generated.
{% /alert %}

### Halo 2 LOD selection logic
The optional boolean argument `[use-halo2-permutation-lod-selection-logic?]` is new to H1A Tool and causes Tool to use [H2 Tool](~h2-tool) logic for choosing LODs. The 'base' permutation's LODs are chosen the same way as the non-base; all permutations propagate using any existing LOD in that permutation when LODs are missing. Any missing LODs for a permutation will use the last non-NONE LOD within that permutation.

This is the more intuitive behaviour and probably what you want to use. The prior lack of this is what causes the Banshee's destroyed permutation to appear intact at the lowest LODs because it re-uses the base permutation's LOD.

## physics
A [JMS](~) file containing collision spheres can be compiled into a [physics](~) using the `physics` verb:

```cmd
Usage: physics <source-directory>
tool physics "vehicles\wraith"
```

For the example above, Tool would expect to find a corresponding JMS file at `data\vehicles\wraith\physics\wraith.JMS`. Assuming no errors, it would be imported as `tags\wraith\wraith.physics`.

## plate
H1A Tool only. The plate verb takes a set of images and places them in a sequence surrounded by a border to be imported as either sprites or animated images.

```cmd
Usage: plate <source-path> <scale(2,8)> <alpha(0.0,1.0)> <desired-sequence-count>
tool plate "scenery\rock\bitmaps" 2 0.5 2
```

Arguments:
* source-path - Folder containing the `.tif` files, these should be at least 24-bit.
* scale - How much the images are scaled down by (8 results in a smaller image than 2).
* alpha - Blending alpha of border between image and surrounding mask.
* desired-sequence-count - Number of images you want to include, it's recommended to set this to exactly the number of images in the folder.

## print-tag-to-xml
More or less the same thing as `export-tag-to-xml` but prints the tag to standard output (the console) instead. This can be useful for shell scripting or integrating with other tooling like `git diff`.

```cmd
Usage: print-tag-to-xml <tag file>
tool print-tag-to-xml ui\english.virtual_keyboard
```

## process-sounds
This command applies bulk changes in gain or distance settings to [sound](~) tags in a directory.

```cmd
Usage: process-sounds <root path> <substring> <gain+|gain-|gain=|maximum-distance|minimum-distance> <value>
tool process-sounds "sound\sfx\ambience\a10" "klax" gain+ 1
```

For the example above, Tool would expect to find a set of sound tags at `tags\sound\sfx\ambience\a10\`. Any sound tags that contain the substring "klax" in the filename will have a value of 1 added to gain.

## script_doc
H1A Tool only. The `script_doc` verb can be used to output documentation for script functions and globals. You can also run `script_doc` in the [console](~developer-console) to generate `hs_doc.txt`. The documentation has already been incorporated into this site's [H1 scripting page](~scripting).

```cmd
Usage: script_doc [function|global name]
tool script_doc # generate a full hs_doc.txt
tool script_doc recording_play # get documentation for the `recording_play` function
tool script_doc developer_mode # get documentation for the `developer_mode` global
```

## sounds
A 16-bit [WAV][wiki-wav] file can be imported into a [sound](~) tag using the `sounds` verb:

```cmd
Usage: sounds <source-directory> <platform(xbox,wav,ogg)> [ogg_only_value_flag<quality or bitrate>]
tool sounds "vehicles\ghost" ogg 1
```

The "ogg_only_value_flag" argument is only required if "platform" is OGG, and must be a [real number][wiki-real] in the range `0.0 - 1.0`. The value `0` is the lowest quality and `1` is the highest.

In order to import Xbox sounds you will need the XBADPCM codec installed on your PC. You will get tool errors when trying to convert the sound file otherwise.

Regardless of the platform you choose, the sound file you import should still be saved as a 16 bit WAV file.

## sounds_by_type
Similar to the `sounds` verb, but imports sounds with a given sound class and defaults to the Xbox platform so make sure you have the codec installed.

```cmd
Usage: sounds_by_type <source-directory> <type(sound_class)> <round to 64 samples:yes/no>
tool sounds_by_type "vehicles\ghost" projectile_impact yes
```

The sound class will influence the capabilities of the sound tag, and may be used when the map is built or at runtime. See the [sound class field](~sound#tag-field-sound-class) for more info.

| Sound class                        | Comments
|------------------------------------|-----------------------------------
|projectile_impact                   |
|projectile_detonation               |
|weapon_fire                         |
|weapon_ready                        |
|weapon_reload                       |
|weapon_empty                        |
|weapon_charge                       |
|weapon_overheat                     |
|weapon_idle                         |
|object_impacts                      |
|particle_impacts                    |
|slow_particle_impacts               |
|unit_footsteps                      |
|unit_dialog                         |Sound file sample rate must be 22Hz. Tool will error out otherwise.
|vehicle_collision                   |
|vehicle_engine                      |
|device_door                         |
|device_force_field                  |
|device_machinery                    |
|device_nature                       |
|device_computers                    |
|music                               |
|ambient_nature                      |
|ambient_machinery                   |
|ambient_computers                   |
|first_person_damage                 |
|scripted_dialog_player              |
|scripted_effect                     |
|scripted_dialog_other               |
|scripted_dialog_force_unspatialized |
|game_event                          |

## strings
This verb is only present in HEK Tool. UTF-8 text files containing strings can be compiled into a [string_list](~) using the `strings` verb.

{% alert type="danger" %}
There is generally no reason to create [string_list](~) tags. Use [unicode_string_list](~) instead.
{% /alert %}

```sh
# strings <source-directory>
tool.exe strings "weapons\assault rifle"
```

For the example above, Tool would expect to find text files at `data\weapons\assault rifle\`. Assuming no errors, a file named "assault rifle.txt" would be imported as `tags\weapons\assault rifle.string_list`. Each text file that exists in the source directory will be imported as its own individual tag with the name of the tag coming from the text filename.

## structure
A [JMS](~) file containing level geometry can be imported into a [scenario_structure_bsp](~) using the `structure` verb:

```cmd
Usage: structure <scenario-directory> <bsp-name> [fix-phantom-bsp]
tool structure levels\a30 a30_a
tool structure levels\test\tutorial tutorial
tool structure levels\test\tutorial tutorial true
```

For the example above, Tool would expect to find a corresponding JMS file at `data\levels\a30\models\a30_a.JMS`. Assuming no errors, it would be imported as `tags\levels\a30\a30_a.scenario_structure_bsp`. Geometry errors will cause Tool to create [WRL files](~wrl) for [troubleshooting](~bsp-troubleshooting), named either `yourmap_errors.wrl` by H1A Tool or `yourmap.wrl` by HEK Tool and located either adjacent to the JMS (H1A Tool) or in the HEK root.

Structure compilation converts the raw polygon and materials data from the JMS into data structures which are more efficient for Halo to use during rendering, collision tests, audibility tests, and AI pathfinding. Note that [lightmaps](~) are **not** produced during this step, but rather with the [lightmaps verb](#lightmaps). Structure import will create a [scenario](~) tag if one does not exist already.

Multiple JMS files can be placed in a level's `models` directory for multiple BSPs (used for large singleplayer levels). Each JMS will be imported into a separate structure BSP and added to the scenario. Scripts and trigger volumes can then be used to switch between the BSPs.

[OpenSauce](~) scenarios can cause Tool to freeze if not using OS_Tool. Import the BSP using a dummy stock scenario as a workaround.

### Phantom BSP fix
When the H1A-only optional argument `[fix-phantom-bsp]` is `true`, sructure import will happen as normal but with an extra "munging collision bsp" step where Tool attempts to fix [collision artifacts](~scenario_structure_bsp#collision-artifacts) like phantom BSP. It is known that this flag does not always resolve all cases of phantom BSP.

The produced tag will have larger collision data by roughly 23%, as the flag seems to cause more duplication of surfaces at the leaves of the BSP tree. Therefore this method is unsuitable for high polygon count BSPs which may result in import failure with errors like these:

```
couldn't allocate leaf_map leaves
### ERROR couldn't initialize leaf map.
### ERROR couldn't create leafy bsp.
### ERROR the maid service spilled bleach on the rug.
```

## structure-breakable-surfaces
Updates [breakable surface data](~scenario_structure_bsp#tag-field-breakable-surfaces) for an existing BSP tag. Saves the tag if only if there was no error.

```cmd
Usage: structure-breakable-surfaces <bsp-path>
tool structure-breakable-surfaces "levels\a10\a10a"
```

## structure-lens-flares
This command updates a BSP's [lens flare markers](~scenario_structure_bsp#lens-flare-markers) using the current lens flare fields in the BSP's referenced [shader_environment](~) tags. This can be used to update the markers after changes to the shader fields without having to recompile the BSP entirely with the `structure` verb.

```cmd
Usage: structure-lens-flares <bsp-path>
tool structure-lens-flares "levels\a10\a10a"
```

## unicode-strings
UTF-16 text files containing strings can be imported into a [unicode_string_list](~) using the `unicode-strings` verb:

```cmd
Usage: unicode-strings <source-directory>
tool unicode-strings "ui\mp_map_ui"
```

For the example above, Tool would expect to find text files at `data\ui\mp_map_ui\`. Assuming no errors, a file named "prisoner.txt" would be imported as `tags\ui\mp_map_ui\prisoner.unicode_string_list`. Each text file that exists in the source directory will be imported into its own individual tag with the name of the tag coming from the text filename.

For more in depth instructions see the [string list format reference](~strings-txt#creating-a-text-file-for-string-lists).


## windows-font
This will open a window to preview font packaged installed on your machine. From there you can select a font to package into a valid [font](~) tag for Halo to make use of.

```cmd
Usage: windows-font
tool windows-font
```

## zoners_model_upgrade
This verb is only present in HEK Tool. It upgrades [models](~model) to [gbxmodel](~), likely used to port models from the Xbox edition of the game to PC by Gearbox.

```cmd
Usage: zoners_model_upgrade
tool zoners_model_upgrade
```

[wiki-tiff]: https://en.wikipedia.org/wiki/TIFF
[wiki-color]: https://en.wikipedia.org/wiki/Color_depth
[wiki-real]: https://en.wikipedia.org/wiki/Real_number
[wiki-wav]: https://en.wikipedia.org/wiki/WAV