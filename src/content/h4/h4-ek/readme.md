---
title: Halo 4 Mod Tools
about: 'tool:H4-EK'
info: |
  * Release date: December 2022
  * [Report issues](JIF_ISSUE_URL)
keywords:
  - h4
  - h4-ek
  - midnight
---
The **Halo 4 Mod Tools** are the official release of content creation tools for [Halo 4](~h4). They are updated versions of the original internal tools used during development of the game and are an evolution of [Halo Reach's tools](~hr-ek).

# Getting started
See the [general installation steps](~/general/mod-tools#installation) for help installing these tools. Don't forget to run the extract script!

# Changelog
This changelog is focused on known notable modding-related changes and is not guaranteed to be complete.

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
  * Opening or creating particle_emitter_custom_points,
  * Using sound tag playback controls,
  * Keyword Chooser,
  * Usurp Preview button in materials,
  * Selecting the Prefab Browser from Assets in the Tools dropdown.
* Removed Tag Mover dependency on tag depot.
* Fixed JSON property `bungie_specular_intensity` incorrectly setting `specular_power`
* Added a solution for setting up marker permutations in FBX to GR2 pipeline.
* Fix lights and markers import, update FBX samples according to new import logic:
  > Remove transition of transforms from model initial placement to skeleton during fbx to granny import. Lights and markers use granny initial placement. So we cannot transfer it to skeleton to simplify compatibility with maya models. Now model in blender will exactly match one in granny and sapien. For compatibility with retail animations/skeletons fbx should be exported/imported with matching blender/sapien bone orientation (z-up). Fix light orientation during import from fbx as fbx uses -Y light direction when blender/sapien use -Z.
* Add verbose Tool error when trying to import structure with mix of meshes with compressed and uncompressed vertices.
* Fixed prefab markers and scenario lights not having rotations written on import.
* Added [play builds](~blam#build-types) of Sapien and Standalone.
* MegaloEdit:
  * Using period key now brings up autocomplete.
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
  * The platform argument in `build-cache-file` is now optional.
  * Tool no longer complains about "missing materialManager_attrib" for each material during model/scenario imports.
* `bin\tools\tagDb.sdf` is now pre-populated, preventing some crashes when TagWatcher hadn't run yet.
* Optimizations to make TagWatcher faster.
* Game variants without `engine_data` no longer crash MCC.
* Models with large import info can now be imported (fixes `tag_data_resize() failed`).
* Added support for custom PCKs loaded from PnP mod folder.
* `script_doc` now includes globals.
* Fixed an assert when posessing a vehicle.
* Inclusion of scripts needed to build shared files.
* Fixed `build-cache-file-custom` asserts.
