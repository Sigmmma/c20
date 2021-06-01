**H1A Tool** (**tool.exe**), is a [command-line][] utility used to compile data into [tags][], and tags into [maps][map]. It is part of the [H1A-EK][].

# Changes from legacy Tool
If you are used to the legacy tools here is a quick primer on what's changed, if you are new to halo modding you can skip this section.

- Commands can now include optional arguments
- The tags and data directories can now be set when launching Sapien (`-tags_dir <tags path>` and `-data_dir <data path>` respectively).
- The `-noassert` command line flag can be used to disable all asserts (useful for lightmapping).
- Lightmapping code has been optimised to be faster even with asserts enabled.
- Most logs are now saved to a `reports` subfolder (similarly to Halo 2+).
- Bitmap DXT1-3 (BC1-3) encoding now uses DirectXTex, instead of some S3TC code, this should result in higher quality.
- `sounds_by_type` has been renamed to `sounds-by-type`.
- `build-cache-file` has new arguments.
- `structure` now includes an optional argument to fix phantom BSPs
- Documentation for some existing commands was fixed.
- `zoners_model_upgrade` and `strings` commands have been removed.
- Lots of new commands have been added and old bugs fixed.

The new commands allow along other things better error checking of tags, exporting some data needed for the S3D engine and creating JMS and JMA files from FBX.

# Conventions used in this article

- `<arg>` - refers to a mandatory argument.
- `[arg]` - refers to an optional argument (you can omit these).
- parentheses appended to the `arg` name are used to encode valid argument values.
- `arg(option1, option2)` - Either `option1` or `option2` can be passed as `arg`.
- `arg(optionClass)` - Any value of `optionClass` can be used.
- `Tool` or `tool.exe` - refers to the subject of this article, the H1A Tool, if the legacy Tool is being referred to that will be made explicit.


# Animation compilation
[Animation data][animation-data] files containing transforms for a skeleton can be compiled into a [model_animations][] tag using the `animations` verb:

```sh
# animations <source-directory>
tool animations "characters\cyborg"
```

For the example above, Tool would expect to find corresponding animation data files at `data\characters\cyborg\animations\`. Assuming no errors, it would be compiled into `tags\characters\cyborg\cyborg.model_animations`.

See the [animation data][animation-data] page for more info on the various extensions used during animation importing and their purpose.

# Bitmap compilation
Compile a single TIFF image into a [bitmap][] using the `bitmap` verb:

```sh
# bitmap <source-file>
tool bitmaps "characters\cyborg\bitmaps\cyborg"
```

For the example above, Tool would expect to find a _.tif or .tiff_ file at `data\characters\cyborg\bitmaps\cyborg.tif`. Assuming no errors, the image file will be compiled into a bitmap tag at `tags\characters\cyborg\bitmaps\cyborg.bitmap`. The bitmap filename will come from the image filename.

As with the `bitmaps` verb, TIFF files must have at least 8-bit colour depth and are typically 32-bit.

# Batch bitmap compilation
[TIFF][wiki-tiff] (.tif/.tiff) images can be compiled into a [bitmap][] using the `bitmaps` verb:

```sh
# bitmaps <source-directory>
tool bitmaps "characters\cyborg\bitmaps"
```

For the example above, Tool would expect to find .tif/.tiff files at `data\characters\cyborg\bitmaps\`. Assuming no errors, each image file will be compiled into a bitmap tag at `tags\characters\cyborg\bitmaps\`. Each image file that exists in the source directory will be compiled into its own individual tag with the name of the tag coming from the image filename.

Tool supports TIFF files with a [colour depth][wiki-color] of at least 8 bits per pixel, 32-bit color (8 bits per channel) being typical.

# Build cache file
A [scenario][] can be compiled into a [map][] using the `build-cache-file` verb. Simply provide your scenario's tag path and choose classic or remastered mode (the last two arguments are optional):

```sh
# build-cache-file <scenario-name> <classic|remastered> [write-resource-maps] [log-tag-loads]
tool build-cache-file "levels\test\tutorial\tutorial" classic 0 # classic graphics with update resource disabled
tool build-cache-file "levels\test\tutorial\tutorial" remastered
```

The resulting map file can be found in editing kit's `maps` directory.

## Classic and remastered mode

- "classic" is intended for custom maps that don't support remastered graphics.
- "remastered" is intended for building maps compatible with S3D-based remastered graphics and sounds.

Using classic graphics is recommended for most custom maps.

## Updating resource maps

By default `build-cache-file` will update the resource maps, this can be disabled to match the behavior of legacy Tool.

## Log tag loads

Tag loads during cache compilation can be logged to `tool_tags_loaded.txt`, this helps build a list of tags needed for a scenario if you are releasing a tag set.

## Hardcoded tag patches
There are a number of gameplay-balancing tag patches ("Jason Jones edits") made at runtime on Xbox, but also at map compilation time by Tool. On both platforms, these patches are only made to [singleplayer scenarios][scenario#tag-field-type].

| Tag type        | Tag path                          | Changes
|-----------------|-----------------------------------|----------------
|[weapon][]       |`weapons\pistol\pistol`            |Min error and first error angle to `0.2` degrees, second error angle to `0.4` for first trigger
|[damage_effect][]|`weapons\pistol\bullet`            |Elite energy shield damage modifier to `0.8`
|[weapon][]       |`weapons\plasma rifle\plasma rifle`|First error angle to `0.25` degrees, second error to `2.5` for first trigger

These changes are made only to the resulting tag data in the map file, but be careful when extracting tags from singleplayer maps (both PC and Xbox)! You will actually overwrite the original weapon tags and cause your custom multiplayer maps to _also_ use these values.

# Build resource list

Resource lists are used by the S3D engine (engine developed in-house by [Saber Interactive](https://en.wikipedia.org/wiki/Saber_Interactive) that's used for the remastered graphics)

```sh
# build-resource-list <scenario-name>
tool build-resource-list a10
tool build-resource-list bloodgulch
```

The command will create the resource list in the `...\preload\lsa` folder relative to the current working directory. 
It is your responsibility to ensure this path exists, it will fail silently if it doesn't. 

# Camera track

This commands takes a JMA file directly and converts it to a camera_track for the game. The length of the animation should be at most 16 as that is the max number of control points a camera track tag can contain. The JMA should contain a skeleton made up of a single bone that will change its position each frame. The orientation of the bone will determine the position and rotation of the control point for that index. The name of the JMA file will be the name of the tag.

```sh
# camera-track <source-file>
tool camera-track data\cameras\ohno.jma
```

**Currently this command is case sensitive when it attempts to check if the source file file is a JMA file.** Only use lower case for the extension when typing the command into Tool. The actual case of the file itself is irrelevant.

**<i>You need to use a standard file path not a path relative to the `data` folder</i>**, the command will also not save the the camera track in a location mirroring the data path but in the root tags directory (e.g. the command in the example above will create a tag called `ohno.camera_track` not `cameras\ohno.camera_track`).

# Check bitmaps

```sh
# check-bitmaps <root-directory>
tool check-bitmaps levels\test\my_broke_level
```

Checks all the [bitmap][] tags in a tag path (including sub-directories). Errors will be printed to console.

# Check lights

```sh
# check-lights <root-directory>
tool check-lights levels\test\my_broke_level
```

Checks all the [light][] tags in a tag path (including sub-directories). Errors will be printed to console.

# Check map

```sh
# check-map <scenario-name>
tool check-map levels\test\my_broke_level\my_broke_level
```

Checks the scenario tag and tags it references for issues. Errors will be printed to console.

# Check shaders

```sh
# check-shaders <root-directory>
tool check-shaders levels\test\my_broke_level
```

Checks all the [shader][] tags in a tag path (including sub-directories). Errors will be printed to console.

# Check tags

```sh
# check-tags <root-directory>
tool check-tags levels\test\my_broke_level
```

Equivalent to consecutively running `check-bitmaps`, `check-shaders` and `check-lights` for the same path.


# Collision geometry compilation
A [JMS][] file containing a collision model can be compiled into a [model_collision_geometry][] using the `collision-geometry` verb:

```sh
# collision-geometry <source-directory>
tool collision-geometry "scenery\rock"
```

For the example above, Tool would expect to find a corresponding JMS file at `data\scenery\rock\physics\rock.JMS`. Assuming no errors, it would be compiled into `tags\scenery\rock\rock.model_collision_geometry`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

Permutations and LODs are also supported using the same file name conventions as [render model compilation](tool#model-compilation):

```sh
# <permutation_string> <lod_level>.JMS
base superhigh.JMS
```

# Compiling DX11 shaders

```sh
# compile-shaders <xbox1|xbox1_debug|dx11|dx11_debug> <fx|psh|vsh|all>
tool compile-shaders dx11 all
```

Compiles the [shader files](https://en.wikipedia.org/wiki/Shader) in the `shaders` subdirectory into `fx.bin`, `psh.bin` and `vsh.bin`. These are not the same as the [shader][] tags and unless you have a working understanding of 3D graphics programming you don't need to touch this command.
The `xbox1` and `xbox_debug` commands won't work without a copy of the XDK; [which is not publicly available](https://docs.microsoft.com/en-us/gaming/xbox-live/get-started/setup-ide/managed-partners/vstudio-xbox/live-where-to-get-xdk).

# Copy detail objects

This command takes two scenarios and copies detail objects from the source to the destination. The scenarios do not have to be the same but it was probably intended to be used on child scenarios. This command has no output to indicate success or failure.
```sh
# copy-detail-objects <source scenario> <destination scenario>
tool copy-detail-objects levels\test\deathisland\deathisland levels\test\my_deathisland_test\my_deathisland_test
```

As there is no error checking you will have to check if the detail object got copied correctly yourself.

# Dump metagame info

```sh
tool dump-metagame-info
```

Dumps information about the "metagame" (MCC scoring information) to a file called `metagame_info_dump.txt` in the current directory.

# Export bitmaps

Helper command for S3D development, exports all bitmaps in the tags matching a predefined criteria.

```sh
# export-bitmaps <path>
tool export-bitmaps E:\s3d\h1a\preload\images
```


# Export sounds to FSB

H1A uses FMOD as it's sound middleware, this command builds a FMOD SoundBank file for that use-case.

```sh
# export-sounds-to-fsb <sound\sfx path>
tool export-sounds-to-fsb sound\sfx
```

Builds a `sounds_adpcm.fsb` and `sounds_adpcm.lst.bin` using `data\sounds\tags.lst` to decide which sounds it needs to include, you can find a copy of this file in your MCC install at: `<MCC root>\halo1\sound\pc\lst\tags.lst`

Make sure you have plenty of free disk space as it will cache the sound data in `.fsbcache`. This directory can be deleted once you are done building the SoundBank.


# Export tag to xml

```sh
# export-tag-to-xml <tag file> <output file>
tool export-tag-to-xml D:\SteamLibrary\steamapps\common\H1A-EK\tags\ui\english.virtual_keyboard english.virtual_keyboard.xml
```

Exports a tag to an XML file, some data isn't include this can only be used to compare tags not as an alternative storage format.

**NB: The path to the tag file needs to be fully qualified, a relative path won't work**

# Creating a JMA file from an FBX file

```sh
# fbx-to-jma <in-file> <out-file>

tool fbx-to-jms data\characters\cyborg\models\cyborg_my_custom_anim.fbx data\characters\cyborg\animations\cyborg_my_custom_anim.jma
tool fbx-to-jms E:\my_fbx_files\cyborg_dab.fbx data\characters\cyborg\animations\cyborg_my_custom_anim.jms
```

**<i>You need to use a standard file path not a path relative to the `data` folder</i>**

For some details on how to setup the FBX file see [FBX for H1A][fbx-for-h1a].

# Creating a JMS file from an FBX file

```sh
# fbx-to-jms <in-file> <out-file>

tool fbx-to-jms data\characters\cyborg\models\cyborg.fbx data\characters\cyborg\models\cyborg.jms
tool fbx-to-jms E:\my_fbx_files\better_cyborg.fbx data\characters\cyborg\models\cyborg.jms
```

**<i>You need to use a standard file path not a path relative to the `data` folder</i>**

For some details on how to setup the FBX file see [FBX for H1A][fbx-for-h1a].

# Find and add sounds to a dialogue tag

This command allows scanning a directory (including sub-directories) for sound references to add to a dialogue tag.

```sh
# find-dialogue <dialogue tag> <directory>
tool find-dialogue test\test_dialogue sound\dialog\jackal\combat2
```

The command can at most process 512 sounds during one invocation as that is the size of the buffer it stores the filenames in. If you invoke it on a larger directory it will say it found 512 files even when there are more in the directory.

# HUD messages compilation
UTF-16 text files with an [.HMT extension][hmt] can be compiled into a [hud_message_text][] using the `hud-messages` verb:

```sh
# hud-messages <path> <scenario-name>
tool hud-messages "levels\a10" "a10"
```

For the example above, Tool would expect to find a text file at `data\levels\a10\hud messages.hmt`. Assuming no errors, a file named "hud messages.hmt" would be compiled into `tags\levels\a10\hud messages.hud_message_text`.

It's important that the file's name be "hud messages.hmt". Tool specifically looks for a file with this name when compiling HUD messages. You can simply edit the ".hmt" file with notepad. Simply renaming it from .TXT to .HMT will take care of that. The text file must also exist in the root of the scenario folder in data.

[_See more in-depth instructions_][hmt#creating-a-text-file-for-hud-messages].

| Error | Solution
|------------------------------------------------------------------|----------
| `the text specified is not 16-bit unicode text`                  | Ensure the file is saved with UTF-16 LE encoding.
| `cannot import hud message text that isn't named "hud messages"` | Rename the file to "hud messages.hmt".

# Import device defaults
Unknown purpose.

```sh
# import-device-defaults <defaults|profiles> <savegame path>
tool import-device-defaults <defaults|profiles> <savegame path>
```

# Lightmaps
<figure>
  <a href="radiosity.jpg">
    <img src="radiosity.jpg" alt=""/>
  </a>
  <figcaption>
    <p>The radiosity process can be visualized in Sapien using <code>rasterizer_wireframe 1</code>. Notice how shadow edges and high detail shaders are subdivided more.</p>
  </figcaption>
</figure>

Both Tool and [Sapien][h1a-sapien#radiosity] can be used to generate [lightmaps][] (radiosity). Using Tool, you will need the following arguments:

1. **Scenario [tag path][tags#tag-references-and-paths]**: This is _not_ a file path! Leave off the ".scenario" extension and start the path from within the tags directory.
2. **BSP name:** The name of the BSP tag without the file extension. Although this is labeled as "bsp index" in Tool's usage, it is not intended to be a numeric value.
3. **Radiosity quality:** A value of 0 runs an inaccurate "fast radiosity", with fewer light bounces, a lower resolution lightmap, and ignoring light occlusion or blocking caused by models. A value of 1 runs a "full radiosity", which is much slower but is used for the release version of maps. For further details, see the [radiosity quality settings](#radiosity-quality-technical-details) below.
4. **Stop threshold:** Light is cast in multiple passes from each surface, getting progressively finer with each pass. Each pass also reduces the total amount of light to be cast from each surface. When the average radiosity of the scene reaches this value, the process will stop and results saved. This is the equivalent of choosing when to run `radiosity_save` in Sapien.

For example:

```sh
# lightmaps <scenario> <bsp index> <quality> <stop threshhold>
tool lightmaps "levels\test\tutorial\tutorial" tutorial 1 0.01
```

After a short time, you should observe a number counting down towards 0. The radiosity process will stop once this number reaches your "stop" argument. If the number counts _up_ instead, it indicates an issue with your level geometry and you should cancel radiosity to address it (check for [WRL][] warnings).

Consider using the `-noassert` command line flag to increase speed at the expense of skipping error checking.

```sh
# lightmaps <scenario> <bsp index> <quality> <stop threshhold>
tool lightmaps "levels\test\tutorial\tutorial" tutorial 1 0.01 -noassert
```

## Radiosity quality technical details

| Radiosity quality | Default stop threshold| Samples per [sky light][sky#tag-field-lights] |
|-------------------|-----------------------|---------------------------|
|0 (preview)        | 10.0 / 255.0          | 4                         |
|1 (final)          | 1.0 / 255.0           | 16                        |

The radiosity process internally subdivides/tessellates the mesh into an intermediate lightmap structure which is much denser in some places. Depending on the radiosity quality chosen and [shader detail level][shader#tag-field-detail-level], different constraints will be placed on this process:

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


# Merge scenery
This command can merge the scenery tag blocks of the source scenario to the destination scenario. This was probably used to automate work on [child scenarios][scenario#child-scenarios] in Halo's development.

# Model compilation
A [JMS][] file containing model geometry can be compiled into a [gbxmodel][] using the `model` verb:

```sh
# model <source-directory>
tool model "scenery\rock"
```

For the example above, Tool would expect to find a corresponding JMS file at `data\scenery\rock\models\rock.JMS`. Assuming no errors, it would be compiled into `tags\scenery\rock\rock.gbxmodel`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

Something to note is that Tool reads the filename of the JMS to decide how to generate specific tag data for the model. The format for this is as follows:

```sh
# <permutation_string> <lod_level>.JMS
base superhigh.JMS
```

[Permutations][gbxmodel#permutations] are variants for model's [regions][gbxmodel#regions]. LODs (level of detail) are different quality models rendered depending on the object's size on screen. Permutations can be named arbitrarily, though they should match a model's existing permutation names if modifying an existing asset. LOD needs to use a specific string from the list below:

* `superhigh`
* `high`
* `medium`
* `low`
* `superlow`

Use multiple JMS files to generate multiple permutations in a model.

```.alert danger
Tool only uses [markers][gbxmodel#markers] from the `superhigh` LOD when making a model tag. If you don't have a superhigh LOD (i.e. you have something explicity set as superlow/low/medium/high but not superhigh), no markers will be generated.
```

# Physics compilation
A [JMS][] file containing collision spheres can be compiled into a [physics][] using the `physics` verb:

```sh
# physics <source-directory>
tool physics "vehicles\wraith"
```

For the example above, Tool would expect to find a corresponding JMS file at `data\vehicles\wraith\physics\wraith.JMS`. Assuming no errors, it would be compiled into `tags\wraith\wraith.physics`.

# Plate

The plate command takes a set of images and places them in a sequence surrounded by a border to be imported as either sprites or animated images.

```sh
# plate <source-path> <scale(2,8)> <alpha(0.0,1.0)> <desired-sequence-count>
tool plate "scenery\rock\bitmaps" 2 0.5 2
```

## Arguments

*Source Directory*:  Folder containing the `.tif` files.

*Scale*: How much the images are scaled down by (8 results in a smaller image than 2).

*Alpha*: Blending alpha of border between image and surrounding mask.

*Desired Sequence Count*: Number of images you want to include, must be lower than the number of images in the folder or the command will crash. The final sequence count may not reflect the requested count. It's recommended to set this to exactly the number of images in the folder.


# Process sounds
This command searches for sounds in a tag directory and sets the values in the [sound][] tag.

```sh
# process-sounds <root path> <substring> <gain+|gain-|gain=|maximum-distance|minimum-distance> <value>
tool process-sounds "sound\sfx\ambience\a10" "klax" gain+ 1
```

For the example above, Tool would expect to find a set of sound tags at `tags\sound\sfx\ambience\a10\`. Any sound tags that contain the substring "klax" in the filename will have a value of 1 added to gain.

# Profile bitmap

Obsolete command for checking if bitmaps match certain criteria

```sh
# profile-bitmaps <directory>
tool levels\test\my_map\bitmaps
```


# Recover TIFF from bitmap tag

Extracts the images from a [bitmap][] tag saving them as [TIFF][wiki-tiff] files in the `recovered` folder in the H1A-EK root directory. The naming scheme `<bitmap_tag_name>_<index>.tif` is used.

```sh
# recover-tif <bitmap>
tool recover-tif "rasterizer\default 2d"
```

For the example above, Tool would create 4 bitmaps named: `default 2d_0.tif`, `default 2d_1.tif`, `default 2d_2.tif` and `default 2d_3.tif`.

The command uses the compressed texture and not the source plate data.

# Sounds compilation
A 16-bit [WAV][wiki-wav] file can be compiled into a [sound][] tag using the `sounds` verb:

```sh
# sounds <source-directory> <platform(xbox,wav,ogg)> ogg_only_value_flag<quality or bitrate>
tool sounds "vehicles\ghost" ogg 1
```

The "ogg_only_value_flag" argument is only required if "platform" is OGG, and must be a [real number][wiki-real] in the range `0.0 - 1.0`. The value `0` is the lowest quality and `1` is the highest.

In order to import Xbox sounds you will need the XBADPCM codec installed on your PC. You will get tool errors when trying to convert the sound file otherwise.

Regardless of the platform you choose, the sound file you import should still be saved as a 16 bit WAV file.

# Sounds by type
A 16-bit WAV file can be compiled into a [sound][] tag using the `sounds_by_type` verb:

```sh
# sounds_by_type <source-directory> <type(sound_class)> <round to 64 samples:yes/no>
tool sounds_by_type "vehicles\ghost" projectile_impact yes
```

Sounds imported with this command will default to Xbox platform so make sure you have the codec installed.

Replace type with a string of your choosing from the following list.

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

The sound class will influence the capabilities of the sound tag, and may be used when the map is compiled or at runtime. See the [sound class field][sound#tag-field-sound-class] for more info.

# Structure compilation
A [JMS][] file containing level geometry can be compiled into a [scenario_structure_bsp][] using the `structure` verb:

```sh
# structure <scenario-directory> <bsp-name> [fix-phantom-bsp]
tool structure levels\a30 a30_a
```

For the example above, Tool would expect to find a corresponding JMS file at `data\levels\a30\models\a30_a.JMS`. Assuming no errors, it would be compiled into `tags\levels\a30\a30_a.scenario_structure_bsp`. Geometry errors will cause Tool to create [WRL files][wrl] for troubleshooting.

Structure compilation converts the raw polygon and materials data from the JMS into data structures which are more efficient for Halo to use during rendering, collision tests, and AI pathfinding among other tasks. Note that [lightmaps][] are **not** produced during this step, but rather with the [lightmaps verb](#lightmaps). Structure compilation will create a [scenario][] tag if one does not exist already.

Multiple JMS files can be placed in a level's `models` directory for multiple BSPs (used for large singleplayer levels). Each JMS will be compiled into a separate structure BSP and added to the scenario. Scripts and trigger volumes can then be used to switch between the BSPs.

## Phantom BSP fix

The optional argument can be used to fix [collision artifacts][scenario_structure_bsp#collision-artifacts] like phantom BSP. 

The produced BSP tag will be slightly larger than a normal BSP.

For more details see [phantom_tool][] as it uses the same approach.

# Structure breakable surfaces
Updates [breakable surface data][scenario_structure_bsp#tag-field-breakable-surfaces] for an existing BSP tag. Saves the tag if only if there was no error.

```sh
# structure-breakable-surfaces <bsp-path>
tool structure-breakable-surfaces "levels\a10\a10a"
```

# Structure lens flares
This command updates a BSP's [lens flare markers][scenario_structure_bsp#lens-flare-markers] using the current lens flare fields in the BSP's referenced [shader_environment][] tags. This can be used to update the markers after changes to the shader fields without having to recompile the BSP entirely with the `structure` verb.

```sh
# structure-lens-flares <bsp-path>
tool structure-lens-flares "levels\a10\a10a"
```


# Unicode String compilation
UTF-16 text files containing strings can be compiled into a [unicode_string_list][] using the `unicode-strings` verb:

```sh
# unicode-strings <source-directory>
tool unicode-strings "ui\mp_map_ui"
```

For the example above, Tool would expect to find text files at `data\ui\mp_map_ui\`. Assuming no errors, a file named "prisoner.txt" would be compiled into `tags\ui\mp_map_ui\prisoner.unicode_string_list`. Each text file that exists in the source directory will be compiled into its own individual tag with the name of the tag coming from the text filename.

For more in depth instructions see the [string list format reference][strings-txt#creating-a-text-file-for-string-lists].


# Windows font
This will open a window to preview font packaged installed on your machine. From there you can select a font to package into a valid tag for Halo to make use of.

[wiki-tiff]: https://en.wikipedia.org/wiki/TIFF
[wiki-color]: https://en.wikipedia.org/wiki/Color_depth
[wiki-real]: https://en.wikipedia.org/wiki/Real_number
[wiki-wav]: https://en.wikipedia.org/wiki/WAV
