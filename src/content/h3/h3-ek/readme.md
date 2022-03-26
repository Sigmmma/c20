The **Halo 3 Editing Kit** (**H3EK**) is the official set of tools for creating custom content for the MCC version of Halo 3. It was first released by 343 Industries alongside MCC Season 8.
Similarly to the mod tools for Halo 1 and 2 it is ultimately based on the old internal tools used by Bungie during the development of Halo 3, with modifications made during the porting of the game to MCC and some changes to make them more user-friendly.

Unlike the [H1A-EK][] you ***do*** need to own [Halo 3 on Steam][steam_purchase] to gain access to the toolkit.

# Getting started
![.figure Pictured: Location of the mod tools in the steam library.](/general/tools/steam_tools.jpg)

0. Ensure you own [Halo 3 on Steam][steam_purchase], tools are only accessible if you own the Steam version.
1. [Download the tools using Steam](steam://run/1695791), you might need to [install Steam](https://store.steampowered.com/about/) first.
2. Follow the on screen prompts to download the tools.
3. Once the tools are done downloading you can find them in your library in the tools section.
4. Right click the entry for the mod tools, select the "Manage" context menu entry then select the "Browse local files" subentry.
5. Run the `Extract (H3EK).bat` file - this will extract all the files required.
6. If your operating system supports it you should enable file system compression for the `tags\sounds` folder. This is a workaround for high disk space usage caused by sound tags including zeroed out sound data.
7. (Optional) Check out the [guides hub][guides] to learn more about modding or install a launcher like [Osoyoos][] if you don't like using the command line.

# Installing updates
1. Make sure you didn't update any stock tags, and if you did make a backup of those files.
2. Re-run `Extract (H3EK).bat` and replace all files.

# What's new in the March update

## Installing the March update
1. Delete the shader templates from the previous update as they are not compatible, delete `tags\shaders\beam_templates`, `tags\shaders\black_templates`, `tags\shaders\contrail_templates`, `tags\shaders\cortana_templates`, `tags\shaders\custom_templates`, `tags\shaders\decal_templates`, `tags\shaders\foliage_templates`, `tags\shaders\halogram_templates`,`tags\shaders\light_volume_templates`, `tags\shaders\particle_templates`, `tags\shaders\screen_templates`, `tags\shaders\shader_templates`, `tags\shaders\terrain_templates` and `tags\shaders\water_templates`.
2a. (recommended) Extract the new `tags.zip` and `data.zip`.
2b. (alternative) If you don't want to update all your tags it's highly recommended you at least update the `tags\shaders` folder.

## Content
* Tags.zip now includes scenario_structure_lighting_info for all included scenarios. Relighting should just work now.
* Various changes to tags and data zips. Updating your tag set is highly recommended. WARNING: YOU WILL NOT BE ABLE TO LOAD FILES USING SHADER TEMPLATES FROM THE PREVIOUS RELEASE.

## FBX
* Fixed `FBX-to-JMS` command including geometry from render and physics in physics output.

## Tool

* Make some changes to tackle `verify_same_triangle_indices` asserts. Users should keep a look out and report models that continue to display this issue.
* Add a proper error for importing a DDS instead of asserting.
* Now capable of compiling shaders. You no longer need community fixes for this to work.

## Guerilla

* Fix flags displaying weirdly unless the window was refreshed.
* Skin shader tags no-longer crash.

## Sapien

* Can now load the FMOD files provided in MCC to play sound in the editor. Sound importing should also function. Make sure to copy the fmod folder from your Halo 3 MCC install over to your H3EK editor for playback and importing to work properly.

## Standalone

* Can now load the FMOD files provided in MCC to play sound in the editor. Sound importing should also function. Make sure to copy the fmod folder from your Halo 3 MCC install over to your H3EK editor for playback and importing to work properly.
* Fixed a bug that didn't allow users to load campaign maps from the legacy mainmenu. Should now be able to use the mainmenu for loading maps if you provide the mapinfo files from your MCC install.

# What's new in the season 8 hotfix v1

- Export-bitmap-DDS should now export bitmap pixel data with proper gamma values.
- Export-bitmap-TGA should now export an actual TGA file.
- Standalone/Tag Test should no longer assert when loading the singleplayer mission "The Ark"
- Fixed the AI objectives window rapidly flickering if the user opened and closed instances one after another.
- Disable "Lock window aspect ratio" while Sapien is loading to prevent an assert.
- Sapien now renders geometry error info such as degenerate triangles and overlapping faces.
- FBX-to-JMS now writes all regions used in the FBX file properly.
- Disable bitmap previewing for bitmap arrays to avoid a crash.

# Major changes from H2
Naturally there is multitude of changes compared to H2 as the engine underwent a major revision, this document endeavours to list the major ones.

* Tools now are all 64-bit, no more out of memory errors unless you actually run out of memory.
* The graphics and tag subsystems went through major revisions.
* Structures can no longer be created using [JMS][] files, you need to use [ASS][] files.
* Tag import info is not stored in a tag block but in a separate tag stream
* Debug logs are not saved in a single folder anymore, allowing you to run multiple tools at once without confusing logs.
* Shader tag creation was streamlined, you no longer need to select a template.
* If a shader template does not exist then it will be autogenerated.
* Lightmap baking is usually faster.
* Multiple structure tags can be loaded at once, the basic subdivision of a scenario is now the *zone set*.
* A fancy new green loading screen.

# Known issues

* Resource sharing is currently not supported.
* Halo 3 custom maps require that EAC is turned off to load
* Halo 3 custom maps requires that the map info matches the map it is replacing to load. This means having the same campaign and map ID. These values can be found at the top of the scenario tag.
* Single threaded lightmapping is not supported, you need to use the multi-process solution. This can be run with only a single client if only using one core is desired.
* Sound playback and sound importing require the FSB files that come with MCC in order to function. Copy the FSB files from your Halo 3 MCC install.
* The mainmenu requires the mapinfo files that come with MCC in order to load levels. Otherwise you will need to use `init.txt` or the developer console to load scenarios in the standalone build.
* Guerilla uses red text and greyed out folders for all tags - this doesn't mean there is something wrong with your tags it's just a graphical issue.
* Lipsync won't be generated when importing sounds that use a multilingual sound class such as unit_dialog as third party tools are required.

[steam_purchase]: https://store.steampowered.com/app/1064271
