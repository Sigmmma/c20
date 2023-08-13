---
title: Halo Reach Editing Kit
about: 'tool:HR-EK'
img: hrek.png
caption: Foundation level editor and MegaloEdit game type editor.
info: |
  * Release date: September 2022
  * [Report issues](JIF_ISSUE_URL)
---
The **Halo Reach Editing Kit** (**HREK**) is the official set of tools for creating custom content for the MCC version of Halo Reach. Like the other officlal mod tools, it is based on the old internal tools used by Bungie during the development of Halo Reach, with modifications made during the porting of the game to MCC and some changes to make them more user-friendly.

Compared to H3, [Foundation](~hr-foundation) takes the place of [Guerilla](~h3-guerilla) as the kit's tag editor with a completely new UI that makes it easier than ever before to create and modify tags. Another major difference is the introduction of GR2 (Granny) files as the new intermediate model format, replacing [ASS](~) and [JMS](~).

Unlike the [H1A-EK](~) you _do_ need to own [Halo Reach on Steam][steam_purchase] to gain access to the toolkit.

# Getting started
See the [general installation steps](~/general/mod-tools#installation) for help installing these tools. Don't forget to run the extract script!

# Changelog
This changelog is focused on known notable modding-related changes and is not guaranteed to be complete.

## July 2023
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
* Added [play builds](~blam#build-types) of Sapien and Standalone.
* Fixed Foundation tag mover crashing if "include data" is selected.
* Removed unused tag fields.
* Reach now supports temporaries and `begin` actions in Megalo like H4.
* MegaloEdit
  * Can now take [command line](~command-line) args to compile a script or directory.
  * Improved autocomplete options for condition's variables.
  * Fixed crash when putting a period in an include path before there's a closing parenthesis.
* Targting "everyone" with `set_score`, `submit_incident`, `submit_incident_with_custom_value` now actually targets everyone.
* Added Tool command `multiplayer-mapinfo-replace-object-type-bitvector`.
* ManagedBlam now targets .NET 4.8.
* Backported the following Megalo actions from H4: `hs_function_call`, `get_button_time`, `team_set_vehicle_spawning`, `player_set_vehicle_spawning`, `set_player_respawn_vehicle`, `set_team_respawn_vehicle`, `hide_object`.
* Various Megalo parsing improvements.
* `bin\tools\tagDb.sdf` is now pre-populated, preventing some crashes when TagWatcher hadn't run yet.
* Optimizations to make TagWatcher faster.
* Game variants without `engine_data` no longer crash MCC.
* Models with large import info can now be imported (fixes `tag_data_resize() failed`).
* Fixed assertion when accessing some CUI components (customization items, firefight lobby game type) in Standalone's main menu.

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
* Single threaded lightmapping is not supported, you need to use the multi-process solution. This can be run with only a single client if only using one core is desired.
* All the stock tags do not contain import info so you will not be able to extract source assets that way.

