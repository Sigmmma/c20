---
title: Halo Reach Editing Kit
about: 'tool:HR-EK'
img: hrek.png
caption: Foundation level editor and MegaloEdit game type editor.
info: |
  * Release date: September 2022
  * [Report issues](JIF_ISSUE_URL)
---
The **Halo Reach Editing Kit** (**HREK**) is the official set of tools for creating custom content for the MCC version of Halo Reach. Like the other officla mod tools, it is ultimately based on the old internal tools used by Bungie during the development of Halo Reach, with modifications made during the porting of the game to MCC and some changes to make them more user-friendly.

Compared to H3, [Foundation](~hr-foundation) takes the place of [Guerilla](~h3-guerilla) as the kit's tag editor with a completely new UI that makes it easier than ever before to create and modify tags. Another major difference is the introduction of GR2 (Granny) files as the new intermediate model format, replacing [ASS](~) and [JMS](~).

Unlike the [H1A-EK](~) you _do_ need to own [Halo Reach on Steam][steam_purchase] to gain access to the toolkit.

# Getting started
{% figure src="/general/tools/steam_tools.jpg" %}
Pictured: Location of the mod tools in the steam library.
{% /figure %}

0. Ensure you own [Halo Reach on Steam][steam_purchase], tools are only accessible if you own the Steam version.
1. [Download the tools using Steam](steam://run/1695793), you might need to [install Steam](https://store.steampowered.com/about/) first.
2. Follow the on screen prompts to download the tools.
3. Once the tools are done downloading you can find them in your library in the tools section.
4. Right click the entry for the mod tools, select the "Manage" context menu entry then select the "Browse local files" subentry.
5. Run the `Extract (HREK).bat` file - this will extract all the files required.
6. If your operating system supports it you should enable file system compression for the `tags\sounds` folder. This is a workaround for high disk space usage caused by sound tags including zeroed out sound data.
7. (Optional) Check out the [guides hub](~guides) to learn more about modding or install a launcher like [Osoyoos](~) if you don't like using the command line.

# Installing updates
1. Make sure you didn't update any stock tags, and if you did make a backup of those files.
2. Re-run `Extract (HREK).bat` and replace all files.

# Changelog
This changelog is focused on known notable modding-related changes and is not guaranteed to be complete.

## TBD 2023
* Fixed background sounds not playing in Sapien.
* Importing a BSP with water_physics no longer causes import errors when using tool_fast.
* Add support for FSBs with custom names in MCC.
* Fixed lightmapping failure.
* Camera point transitions now interpolate correctly over 60 FPS.
* Reloading the globals tag no longer crashes Sapien.
* Using `debug_objects` no longer crashes Sapien/Standalone at part of ff10_prototype.
* Reduced verbosity of Tool's `fbx-to-gr2` logging.
* Fixed Tool stripper_wrapper assert on complex geometry.
* Fixed Foundation crashing when launching scenario.
* Fixed Sapien crashing when using structure painter.
* Added a solution for setting up marker permutations in FBX to GR2 pipeline.
* Added [play builds](~build-types#optimization-options) of Sapien and Standalone.

## December 2022
* Instance imposters can now be generated.
* Tool command `import` will no longer show garbage characters.
* Tool command `import` will no longer print unnecessary warnings about materials.
* Tool command `extract-unicode-strings` added.
* Tool command `model-animations` can now import JMRX and JMOX files.
* Tool command `fbx-to-gr2` will now correctly apply materials to multiple objects.
* Tool command `fbx-to-gr2` will sort bones by descending order of weights, fixing improper bone rotations.
* Tool command `fbx-to-gr2` will try to read `bungie_shader_path` from FBX custom properties to enable shader assignment in 3D editor rather than JSON sidecar.
* Tool command `print-tag-to-xml` now correctly uses argument filename.
* Fix axis conversion on importing Granny file created from FBX.
* Dumping Granny to JSON writes granny_int32 as expected signed ints.
* Updated icons for tools.
* Project chooser added.
* The Sapien/Standalone debug menu is properly scaled for the window size.
* Fixed a loud repeating sound distortion on some sounds in Sapien/Standalone.
* Console tab stops adjust with viewport resolution.
* Fixed crash in `structure_instance_snapshot`.
* Added missing spreadsheets for AI dialog and damage globals.

# Known issues

* Resource sharing is currently not supported.
* Halo Reach custom maps require that EAC is turned off to load
* Halo Reach custom maps requires that the map info matches the map it is replacing to load. This means having the same campaign and map ID. These values can be found at the top of the scenario tag.
* Single threaded lightmapping is not supported, you need to use the multi-process solution. This can be run with only a single client if only using one core is desired.
* Sound playback and sound importing require the FSB files that come with MCC in order to function. Copy the FSB files from your Halo Reach MCC install.
* All the stock tags do not contain import info so you will not be able to extract source assets that way.

[steam_purchase]: https://store.steampowered.com/app/1064220
