---
title: Halo 3 ODST Editing Kit
about: 'tool:H3ODST-EK'
img: h3odstek.jpg
caption: >-
  Sapien, Tool, and Guerilla are still the main programs used for modding Halo 3
  ODST.
info: |
  * Release date: October 2022
  * [Report issues](JIF_ISSUE_URL)
keywords:
  - h3odst-ek
  - h3odstek
  - odst-ek
  - odst
---
The **Halo 3 ODST Editing Kit** (**H3ODSTEK**) is the official set of tools for creating custom content for the MCC version of Halo 3 ODST. It was first released by 343 Industries alongside the latest update as of March 2022.
Similarly to the mod tools for Halo 1, 2, and 3 it is ultimately based on the old internal tools used by Bungie during the development of Halo 3, with modifications made during the porting of the game to MCC and some changes to make them more user-friendly.

Unlike the [H1A-EK](~) you ***do*** need to own [Halo 3 ODST on Steam][steam_purchase] to gain access to the toolkit.

# Getting started
{% figure src="/general/tools/steam_tools.jpg" %}
Pictured: Location of the mod tools in the steam library.
{% /figure %}

0. Ensure you own [Halo 3 ODST on Steam][steam_purchase], tools are only accessible if you own the Steam version.
1. [Download the tools using Steam](steam://run/1695794), you might need to [install Steam](https://store.steampowered.com/about/) first.
2. Follow the on screen prompts to download the tools.
3. Once the tools are done downloading you can find them in your library in the tools section.
4. Right click the entry for the mod tools, select the "Manage" context menu entry then select the "Browse local files" subentry.
5. Run the `H3ODSTEK (Extract).bat` file - this will extract all the files required.
6. If your operating system supports it you should enable file system compression for the `tags\sounds` folder. This is a workaround for high disk space usage caused by sound tags including zeroed out sound data.
7. (Optional) Check out the [guides hub](~guides) to learn more about modding or install a launcher like [Osoyoos](~) if you don't like using the command line.

# Changelog
This changelog is focused on known notable modding-related changes and is not guaranteed to be complete.

## TBD 2023
* Add support for FSBs with custom names in MCC.
* Fixed being unable to manipulate trigger volumes in Sapien.
* Camera point transitions now interpolate correctly over 60 FPS.
* Sounds imported into a new FSB bank no longer have corrupted playback in Sapien/Standalone.
* Fixed instance geometry often failing to show correct dynamic cubemaps.
* Fixed preference.dat error seen when converting an FBX to JMS while another ODST mod tool is open.
* Fixed Sapien crashing when switching BSP/zone set.
* Added [play builds](~build-types#optimization-options) of Sapien, Standalone, and Guerilla.
* Added forked MP biped for odst_recon and odst_oni_op.
* ODST MP game variants are now in the PC build's game_variants and show expected settings.
* Removed various unused or deprecated tag fields.
* Removed Guerilla's Tag Mover dependency on tag depot.
* Picking up a gravity hammer while `skull_third_person` is active no longer crahses Standalone.
* Added Tool command `extract-unicode-strings`.
* Allowed starting profiles to exceed a weapon's "rounds total maximum".
* Added a flag so that infection forms can kill other characters without infecting them.
* Ported `sound_impulse_time` from H3 to ODST.

## December 2022
* AI objectives crash fix
* Unused fields removed from [scenario](~) and [globals](~) tags
* `bin/ManagedBlam.dll` added
* The Sapien/Standalone debug menu is properly scaled for the window size.

## September 2022
{% alert %}
A caveat to this update is that you will need to delete the following shader templates in `tags\shaders\` from the previous update, as they are not compatible: `beam_templates`, `black_templates`, `contrail_templates`, `custom_templates`, `decal_templates`, `foliage_templates`, `halogram_templates`,`light_volume_templates`, `particle_templates`, `screen_templates`, `shader_templates`, `terrain_templates` and `water_templates`.

Otherwise, extract the new `H3ODSTEK.7z` as usual. If you don't want to update all your tags it's highly recommended you at least update the `tags\shaders` folder.
{% /alert %}

Content:
* Various changes to tags and data files. Updating your tag set is highly recommended.
* Added test, audio and lighting reference scenarios `levels\test\box`, `levels\reference\audio`, `levels\reference\lighting_reference`
* Map info files have been added to the `H3ODSTEK.7z` which allows the main menu to load maps.

General:
* Maximum string storage for cache files increased.
* New flag for equipment to prevent AI from dropping them on death.
* Script doc has new formatting and will now contain globals.
* Reports are now contained within the reports folder.
* Giants will now synchronize in co-operative Firefight games.

Tool:
* New commands `extract_unicode_strings` and `print_tag_to_XML` added.
* Various improvements to the `export-tag-to-xml` command output.
* Export bitmap commands now have support for cubemaps.
* The `build-cache-file` command now uses the flag use-fmod-data by default which should result in smaller cache files.

Guerilla:
* Reserved chud text stringids are now listed.

Sapien:
* Additional FMOD banks no longer stops working after a map reset.

Standalone:
* Additional FMOD banks no longer stops working after a map reset.
* Firefight maps can now be successfully launched from the main menu.

## May 2022
* Tags were updated to include the [balance changes](https://support.halowaypoint.com/hc/en-us/articles/5178835359380-Halo-The-Master-Chief-Collection-MCC-Update-April-2022) from the corresponding MCC update.

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
* Halo 3 ODST custom maps require that EAC is turned off to load
* Halo 3 ODST custom maps requires that the map info matches the map it is replacing to load. This means having the same campaign and map ID. These values can be found at the top of the scenario tag.
* Single threaded lightmapping is not supported, you need to use the multi-process solution. This can be run with only a single client if only using one core is desired.
* Sound playback and sound importing require the FSB files that come with MCC in order to function. Copy the FSB files from your Halo 3 ODST MCC install.
* Guerilla uses red text and greyed out folders for all tags - this doesn't mean there is something wrong with your tags it's just a graphical issue.
* Lipsync won't be generated when importing sounds that use a multilingual sound class such as unit_dialog as third party tools are required.

[steam_purchase]: https://store.steampowered.com/app/1064272
