---
title: Halo 3 Editing Kit
about: 'tool:H3-EK'
img: h3ek.jpg
caption: >-
  Sapien, Tool, and Guerilla are still the main programs used for modding Halo
  3.
info: |
  * Release date: October 2021
  * [Report issues](JIF_ISSUE_URL)
redirects:
  - /h3/tools/h3-ek
keywords:
  - h3-ek
  - h3ek
---
The **Halo 3 Editing Kit** (**H3EK**) is the official set of tools for creating custom content for the MCC version of Halo 3. It was first released by 343 Industries alongside MCC Season 8.
Similarly to the mod tools for Halo 1 and 2 it is ultimately based on the old internal tools used by Bungie during the development of Halo 3, with modifications made during the porting of the game to MCC and some changes to make them more user-friendly.

Unlike the [H1A-EK](~) you ***do*** need to own [Halo 3 on Steam][steam_purchase] to gain access to the toolkit.

# Getting started
{% figure src="/general/tools/steam_tools.jpg" %}
Pictured: Location of the mod tools in the steam library.
{% /figure %}

0. Ensure you own [Halo 3 on Steam][steam_purchase], tools are only accessible if you own the Steam version.
1. [Download the tools using Steam](steam://run/1695791), you might need to [install Steam](https://store.steampowered.com/about/) first.
2. Follow the on screen prompts to download the tools.
3. Once the tools are done downloading you can find them in your library in the tools section.
4. Right click the entry for the mod tools, select the "Manage" context menu entry then select the "Browse local files" subentry.
5. Run the `Extract (H3EK).bat` file - this will extract all the files required.
6. If your operating system supports it you should enable file system compression for the `tags\sounds` folder. This is a workaround for high disk space usage caused by sound tags including zeroed out sound data.
7. (Optional) Check out the [guides hub](~guides) to learn more about modding or install a launcher like [Osoyoos](~) if you don't like using the command line.

# Installing updates
1. Make sure you didn't update any stock tags, and if you did make a backup of those files.
2. Re-run `Extract (H3EK).bat` and replace all files.

# Changelog
This changelog is focused on known modding-related changes and is not guaranteed to be complete.

## TBD 2023
* Added missing bitmap tags for s3d_tutorial.
* Fixed screenshot commands creating strange artifacts when screen effects are enabled.
* Add support for FSBs with custom names in MCC.
* Camera point transitions now interpolate correctly over 60 FPS.
* Fixed Guerilla having distorted sound playback on certain tags.
* Sounds imported into a new FSB bank no longer have corrupted playback in Sapien/Standalone.
* `m_prediction_quanta` and `m_prediction_molecules` limits aligned with ODST.

## December 2022
* AI objectives crash fix
* Unused fields removed from [scenario](~) and [globals](~) tags
* The Sapien/Standalone debug menu is properly scaled for the window size.
* Fixed Sapien crashing when compiling scripts a second time

## September 2022
{% alert %}
A caveat to this update is that you will need to delete the following shader templates in `tags\shaders\` from the previous update, as they are not compatible: `beam_templates`, `black_templates`, `contrail_templates`, `cortana_templates`, `custom_templates`, `decal_templates`, `foliage_templates`, `halogram_templates`,`light_volume_templates`, `particle_templates`, `screen_templates`, `shader_templates`, `terrain_templates` and `water_templates`.

Otherwise, extract the new `H3EK.7z` as usual. If you don't want to update all your tags it's highly recommended you at least update the `tags\shaders` folder.
{% /alert %}

Content:
* Various changes to tags and data files. Updating your tag set is highly recommended.
* Added test, audio and lighting reference scenarios `levels\test\box`, `levels\reference\audio`, `levels\reference\lighting_reference`
* Map info files have been added to the `H3EK.7z` which allows the main menu to load maps.

General:
* Maximum string storage for cache files increased.
* New flag for equipment to prevent AI from dropping them on death.
* Script doc has new formatting and will now contain globals.
* Reports are now contained within the reports folder.
* HUD sounds in `chud_globals_definition` tags are no longer capped at eight elements.
* Health related flags in HUD sounds will now work.

Tool:
* Export bitmap commands now have support for cubemaps.
* New commands `extract_unicode_strings` and `print_tag_to_XML` added.
* Using the command `faux_farm_dillum` with the checkerboard setting will no longer trigger an assert.
* Various improvements to the `export-tag-to-xml` command output.
* The `build-cache-file` command now uses the flag use-fmod-data by default which should result in smaller cache files.

Guerilla:
* String list editor improvements.
* The List button for stringids that can be found in ODST has been added where appropriate.
* Reserved chud text stringids are now listed.

Sapien:
* Additional FMOD banks will no longer stop working after a map reset.
* Using the command `render_debug_structure_all_cluster_errors` will no longer trigger a crash.
* The keybinding for dual wield has been moved to the C key.
* The keybindings for switching Forge categories are now functional.
* Reloading tags should no longer cause an FMOD related assertion.

Standalone:
* Additional FMOD banks will no longer stop working after a map reset.
* The keybinding for dual wield has been moved to the C key.
* The keybindings for switching Forge categories are now functional.

## March 2022
{% alert %}
Delete the shader templates from the previous update as they are not compatible, delete `beam_templates`, `black_templates`, `contrail_templates`, `cortana_templates`, `custom_templates`, `decal_templates`, `foliage_templates`, `halogram_templates`,`light_volume_templates`, `particle_templates`, `screen_templates`, `shader_templates`, `terrain_templates` and `water_templates`.

Otherwise, extract the new `tags.zip` and `data.zip` as usual. If you don't want to update all your tags it's highly recommended you at least update the `tags\shaders` folder.
{% /alert %}

Content:
* Tags.zip now includes [scenario_structure_lighting_info](~) for all included scenarios. Relighting should just work now.
* Various changes to tags and data zips. Updating your tag set is highly recommended. WARNING: YOU WILL NOT BE ABLE TO LOAD FILES USING SHADER TEMPLATES FROM THE PREVIOUS RELEASE.

Tool:
* Fixed `FBX-to-JMS` command including geometry from render and physics in physics output.
* Make some changes to tackle `verify_same_triangle_indices` asserts. Users should keep a look out and report models that continue to display this issue.
* Add a proper error for importing a DDS instead of asserting.
* Now capable of compiling shaders. You no longer need community fixes for this to work.

Guerilla:
* Fix flags displaying weirdly unless the window was refreshed.
* Skin shader tags no-longer crash.

Sapien:
* Can now load the FMOD files provided in MCC to play sound in the editor. Sound importing should also function. Make sure to copy the fmod folder from your Halo 3 MCC install over to your H3EK editor for playback and importing to work properly.

Standalone:
* Can now load the FMOD files provided in MCC to play sound in the editor. Sound importing should also function. Make sure to copy the fmod folder from your Halo 3 MCC install over to your H3EK editor for playback and importing to work properly.
* Fixed a bug that didn't allow users to load campaign maps from the legacy mainmenu. Should now be able to use the mainmenu for loading maps if you provide the mapinfo files from your MCC install.
* Parts of the main menu such as the matchmaking lobby will no longer cause a crash.

## November 2021

- Export-bitmap-DDS should now export bitmap pixel data with proper gamma values.
- Export-bitmap-TGA should now export an actual TGA file.
- Standalone/Tag Test should no longer assert when loading the singleplayer mission "The Ark"
- Fixed the AI objectives window rapidly flickering if the user opened and closed instances one after another.
- Disable "Lock window aspect ratio" while Sapien is loading to prevent an assert.
- Sapien now renders geometry error info such as degenerate triangles and overlapping faces.
- FBX-to-JMS now writes all regions used in the FBX file properly.
- Disable bitmap previewing for bitmap arrays to avoid a crash.

# Comparison with H2
Naturally there is multitude of changes compared to H2 as the engine underwent a major revision, this document endeavours to list the major ones.

* Tools now are all 64-bit, no more out of memory errors unless you actually run out of memory.
* The graphics and tag subsystems went through major revisions.
* Structures can no longer be created using [JMS](~) files, you need to use [ASS](~) files.
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
* Guerilla uses red text and greyed out folders for all tags - this doesn't mean there is something wrong with your tags it's just a graphical issue.
* Lipsync won't be generated when importing sounds that use a multilingual sound class such as unit_dialog as third party tools are required.
* Forging objects while using the Standalone client will cause a crash. A workaround is to use the main menu to launch Forge from the lobby.

[steam_purchase]: https://store.steampowered.com/app/1064271
