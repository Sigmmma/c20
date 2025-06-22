---
title: Halo 2 Anniversary MP Mod Tools
about: 'tool:H4-EK'
info: |
  * Release date: December 2022
  * [Report issues](JIF_ISSUE_URL)
---
The **Halo 2 Anniversary MP Mod Tools** is the official release of content creation tools for [H2A MP](~h2amp). These tools are updated versions of the original internal ones and are closest in relation to [Halo 4's tools](~h4-ek).

# Getting started
See the [general installation steps](~/general/mod-tools#installation) for help installing these tools. Don't forget to run the extract script!

# Changelog
This changelog is focused on known notable modding-related changes and is not guaranteed to be complete.

## February 2024
* Fixed a Sapien crash when selecting the structure painter (not an issue for H4 Sapien).

## July 2023
* Fixed background sounds not playing in Sapien.
* Fixed blocky shadows when lightmapping.
* Looping sounds attached to vehicles now play in Sapien.
* Fixed a loud repeating sound distortion in Sapien/Standalone.
* Fixed `map_reset` causing Sapien's hierarchy view buttons to become unresponsive.
* scenario_structure_lighting_info can be generated for new scenarios.
* Camera point transitions now interpolate correctly over 60 FPS.
* Pasting text into Sapien's console no longer replaces existing text.
* Text can now be pasted into Standalone's console.
* Fixed crashes in Foundation:
  * Using sound tag playback controls,
  * Keyword Chooser,
  * Selecting the Prefab Browser from Assets in the Tools dropdown.
* Removed Tag Mover dependency on tag depot.
* Controller triggers now work in Standalone.
* Fixed JSON property `bungie_specular_intensity` incorrectly setting `specular_power`
* Added a solution for setting up marker permutations in FBX to GR2 pipeline.
* Fixed prefab markers and scenario lights not having rotations written on import.
* Added [play builds](~blam#build-types) of Sapien and Standalone.
* MegaloEdit:
  * Using period key now brings up autocomplete.
  * Weapon parameters supports all weapon / damage reporting types.
  * Entering an invalid team inheritance no longer crashes.
  * Setting a team name when a map_object is setup below the teams sections no longer crashes.
  * Added various autocompletes and and error detections.
  * Targting "everyone" with `set_score`, `submit_incident`, `submit_incident_with_custom_value` now actually targets everyone.
  * Improved autocomplete options for condition's variables.
  * Fixed crash when putting a period in an include path before there's a closing parenthesis.
* Fixed dialogue tags crashing Foundation when closed.
* Tool:
  * Tool no longer logs a rasterizer warning.
  * Added Tool command `multiplayer-mapinfo-replace-object-type-bitvector`.
  * Fixed Tool missing the `export-bitmap-tga` command.
  * Tool no longer complains about "missing materialManager_attrib" for each material during model/scenario imports.
* `bin\tools\tagDb.sdf` is now pre-populated, preventing some crashes when TagWatcher hadn't run yet.
* Optimizations to make TagWatcher faster.
* Game variants without `engine_data` no longer crash MCC.
* Models with large import info can now be imported (fixes `tag_data_resize() failed`).
* Added support for custom PCKs loaded from PnP mod folder.
* `script_doc` now includes globals.
* Inclusion of scripts needed to build shared files.
* Fixed `build-cache-file-custom` asserts.
