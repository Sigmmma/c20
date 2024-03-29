---
title: Halo 2 Editing Kit (2021)
about: 'tool:H2-EK'
img: h2-ek.jpg
caption: '[H2-Sapien](~), [H2-Guerilla](~), and [H2-Tool](~) running like a champ'
info: |
  * Release date: 2021
  * [Report issues](JIF_ISSUE_URL)
keywords:
  - h2ek
  - h2-ek
related:
  - /h1/h1a-ek
  - /h2/tools/h2v-ek
  - /h3/h3-ek
---
{% alert %}
After downloading the Halo 2 Editing Kit, please read `README_MODDING.txt`. You **must** extract **both** `tags.zip` and `data.zip` to the root of the mod tools folder.
{% /alert %}

The **Halo 2 Editing Kit (H2-EK)** or **Halo 2 Mod Tools** is the official suite of modding tools for Halo 2 MCC released by 343i. The tools are based off the internal tools used by Bungie and then 343i with some usability and stability improvements ported over from the [H2V-EK](~), although not nearly as cut down as that suite.

Unlike the [H1A-EK](~h1-ek) you ***do*** need to own [Halo 2: Anniversary on Steam][steam_purchase] to gain access to the toolkit.

# Getting started
See the [general installation steps](~/general/mod-tools#installation) for help installing these tools. Don't forget to run the extract script!

# Changelog
This changelog is focused on known notable modding-related changes and is not guaranteed to be complete.

## July 2023 hotfix
* Players using a non-English voice language setting will no longer experience a crash upon accessing English-only modded content.

## July 2023
* Inclusion of digsite content.
* Camera point transitions now interpolate correctly over 60 FPS.
* Added a weapon flag to use third person camera while holding it.
* Added 4 new outer center anchors for HUD elements in [new_hud_definition](~). Legacy H1 HUD tags in H2 like [unit_hud_interface](~) and [weapon_hud_interface](~) were not given the anchors.
* Removed Guerilla's Tag Mover dependency on tag depot.
* Models with large import info can now be imported (fixes `tag_data_resize() failed`).
* Capturing a territory with a location name string no longer crashes.
* Outskirts intro effect `human_and_cov_firing_cine` now plays in Standalone.

## December 2022
* Guerilla will no longer crash when opening [multiplayer_variant_settings_interface_definition](~) tags.
* [Antenna](~) widgets will now render on objects such as the Warthog.

# September 2022

{% alert type="danger" %}
After downloading the update you need to clear your shader cache by deleting the `shader_cache` folder. You also need to update your shader template files.
{% /alert %}

General:
* First person permutations will match the third person permutations when object render models match.
* Data mine files will no longer be generated when using the editing kit.
* Antenna widgets will now render on objects.

Content:
* Various changes to tags and data files. Updating your tag set is highly recommended.

Guerilla:
* String list editor improvements.

Standalone:
* The debug menu now has the option for `debug_menu_rebuild`

Sapien:
* Orders will no longer trigger an assert when clicking into the game window.
* The Map Warnings window should now provide more accurate information.
* Using the Undo action while editing AI Squads should no longer trigger an assert.
* Using `map_reset` while hilighting a numerical input field will no longer trigger an assert.
* The debug menu now has the option for `debug_menu_rebuild`

Tool:
* The `extract_unicode_strings` command will now output text files that are valid for reimporting.
* Reimporting an existing bitmap with the interface type should no longer trigger an assert.
* Importing an interface bitmap that has mip maps will now show a clearer error message.
* XREFs paths in structure files are no longer given a bad character on import.
* XREFs will no longer fail when the `data_dir` argument is set.
* The command `fbx-to-jms` will no longer fail when a custom data directory is specified.
* Meshes created using triangle strips instead of triangle lists will now render properly when using the `rasterizer_wireframe` command.
* Bitmaps with the monochrome format now correctly import as monochrome.

## March 2022

{% alert type="danger" %}
After downloading the update you need to clear your shader cache by deleting the `shader_cache` folder. You also need to update your shader template files.
{% /alert %}

Content:
* Various changes to tags and data files. Updating your tag set is highly recommended.
* Content is now stored in a single [7z](https://en.wikipedia.org/wiki/7z) file. A script is included to automatically extract these files.

Tool:
* Fixed FBX-to-JMS command including geometry from render and physics in physics output.

Guerilla:
* Fix flags displaying weirdly unless the window was refreshed.
* Add flag in scenario tag to disable Bungie MP tag patches.

Sapien:
* Fixed Sapien hanging if a netgame flag had "All except CTF" for the type.

## November 2021

Tool:
* FBX-to-JMS now writes all regions used in the FBX file properly.
* Backwash source files should no longer trigger an assert.
* Earthcity_1 will no longer trigger an assert when importing.
* New commands `extract-bitmap-dds` and `export-bitmap-tga` added.

Sapien & standalone:
* Fixed IN_RANGE assert when editing level data.
* Now renders geometry error info such as degenerate triangles and overlapping faces.
* Some speedups for BSP Havok representation. Loading times should be a bit faster.
* Set minimum height and minimum width for game view window to avoid bad values being saved to registry. Solves render_cameras assert on startup. Users who are currently experiencing this issue should delete their registry keys and update to latest.
* Shaders are now cached in `shader_cache`.
* Brand new loading screen more in-line with the Halo 3+ one.

# Comparison to H2V
## General changes from stock H2V tools
* Tools are not stripped down, you can create models, animations, different types of textures, sounds and more!
* FBX support was ported over from [H1A tools](~h1-ek), the legacy export tools were not included.
* The tools now use the modern [DX11](https://en.wikipedia.org/wiki/DirectX#DirectX_11) graphics API instead of the obsolete [D3D9](https://en.wikipedia.org/wiki/DirectX#DirectX_9) API. this should result in better performance and support on modern systems.
* A standalone build similar in function to H1A standalone.
* All tools are still 32-bit but they are now large address aware (LAA). This allows them to use up to 4 GiB of virtual memory (exact limit depends on your system) instead of 2, this along with fixed memory leaks should help avoid out of memory issues.
* The tags, data, and maps directories can now be set when running all tools. See [custom content paths](~mod-tools#using-custom-content-paths) for more info. This makes it easier to work with different tag sets.
* Better overall stability.
* Pathfinding can now be generated.

## Content
All [tags](~) used in H2C are included meaning tag extraction is no longer required. Script files and some [CSV][] and [XLS][] files used for AI dialogue and damage are also included. You can open the CSV and XLS files in any modern spreadsheet editor.

## Sapien
* AI functionality in [Sapien](~h2-sapien).
* Tags will be reloaded by Sapien if they are changed on disk (also applies to the new standalone build).
* Windows can now be automatically re-arranged using the *Window* menu (works similarly Guerilla or H2Codez Sapien).
* You can generate new pathfinding on-the-fly.
* You can split off mission resources.
* Sapien incorrectly running with hardware T&L disabled was fixed. This should result in a massive performance improvement especially on modern systems ([Windows 10 version ≥ 1607][msdn_d3dcreate])

## Guerilla
* You can create and edit all tag types in [Guerilla](~h2-guerilla).
- Features for refactoring tag paths (find referring tags, move tag, copy tag, etc).
- The original bungie-era about dialog is used.
- Some erratum in tag definitions was fixed or marked comment.
- Preferences are now saved to the `prefs` directory instead of registry.
- Names were added for some tag blocks.
- Any string width confusion errors that [H2Codez](~) fixed should not be an issue as H2 Guerilla is based off a branch that was never internationalized.
- `Do not use` fields were hidden from view as they should not be used.
- File selection dialogues were upgraded to use Vista+ dialogues (Like H1A Guerilla and H2Codez enhanced H2V Guerilla)

## Tool
- All the commands are now included along with a few new commands for FBX support.
- A *`tag_release`* build (`tool_fast.exe`) was included alongside the typical *`tag_test`* builds.
- Optional argument support was ported from [H1A tool](~h1-tool).

## Transferring tags from H2V
If you have existing H2V tags they should largely work in MCC. Some tags will not work due to graphical changes and the like.
Steps for transferring:
1. Ensure MCC stock tags are extracted to the target path for the new MCC tagset.
{% figure src="skip-existing.png" %}
Pictured: How to skip existing files when copying using File Explorer
{% /figure %}
2. Copy over your old H2V tags to the target path, ensure that you skip any files that already exist (don't overwrite MCC tags).
3. Most scenarios should just work at this point but you might want to remove any invalid tags that might cause issues down the line, open up [Guerilla](~h2-guerilla) select any tag in the explorer bar and click "find referent tags", it should start trying to build a *tag dependency database* which forces it to load all tags one-by-one. If at any point this crashes check `debug.txt` to see which tag is causing issues, delete that tag and repeat the process till it stops crashing.

{% alert %}
{% figure src="guerilla-assertion_failure.png" %}
Pictured: An "assertion failed" fatal error message
{% /figure %}
If the UI stops responding that doesn't mean it has crashed, this is just an issue with the dialog, let it run in the background, it should either close, show an error message or complete successfully evenetually.

Remember it needs to load all your tags which can take quite some time.
{% /alert %}

H2 MCC tags can't currently be downgraded to work in H2V so consider this a one way upgrade. Follow best practices and keep a backup of your old files.

## Changes from H2Codez
The tools include many improvements over an [H2Codez](~)-enhanced H2V-EK, most notably:

* Render models can be created without using the BSP conversion method or other third-party tools.
* Sounds can be imported directly instead of using the CE upgrade pipeline.
* Tag reloading is fully functional.
* Fully functional player simulation.
* Better overall stability.

# Known issues

* Resource sharing is currently not supported.
* Guerilla uses red text and greyed out folders for all tags - this doesn't mean there is something wrong with your tags it's just a graphical issue.
* PRT simulation tool is not included - avoid tool commands that require it, they will not function properly.
* Tag moving in Guerilla has some dependencies on old source control code because of this you need to manually move the tag after it fixes the references.
* Lipsync won't be generated when importing sounds that use a multilingual sound class such as unit_dialog as third party tools are required.

[csv]: https://en.wikipedia.org/wiki/Comma-separated_values
[xls]: https://en.wikipedia.org/wiki/Microsoft_Excel_file_format
[msdn_d3dcreate]: https://docs.microsoft.com/en-us/windows/win32/direct3d9/d3dcreate
[steam_purchase]: https://store.steampowered.com/app/1064270
