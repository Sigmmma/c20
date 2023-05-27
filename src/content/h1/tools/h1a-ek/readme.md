---
title: H1A Editing Kit (2021)
stub: false
about: 'tool:H1A-EK'
img: h1a-ek.jpg
caption: >-
  [Sapien](~h1a-sapien), [Guerilla](~h1a-guerilla), and [Tool](~h1a-tool) have
  returned!
info: >-
  * Release date: June 2021

  * [Download/run with Steam](steam://run/1532190)

  * [Steam release
  post](https://store.steampowered.com/news/app/976730/view/3007823106801144958)

  * [Steam community
  discussions](https://steamcommunity.com/app/976730/discussions/3/)

  * [Report issues](JIF_ISSUE_URL)
keywords:
  - h1a
  - hek
  - h1aek
  - h1a-ek
related:
  - /h1/tools/hek
  - /h1/guides/intro-to-h1-modding
  - /h3/h3-ek
  - /h2/tools/h2-ek
---
{% alert %}
After downloading the H1A-EK, please read `README_MODDING.txt`. You **must** extract **both** `tags.zip` and `data.zip` to the root of the mod tools folder.
{% /alert %}

The **H1A Editing Kit** (**H1A-EK**), also called **Halo: CE Mod Tools**, is the set of official modding tools used to create custom multiplayer and singleplayer maps targeting the PC MCC version of [Halo: Combat Evolved Anniversary](~h1/h1a). It was first released by 343 Industries during Season 7 of MCC in 2021.

This editing kit will be familiar to users of the [legacy HEK](~hek) for [Halo: Custom Edition](~h1#custom-edition-pc) (H1CE) released by Gearbox in 2004. However, some of the key changes are:

* [Significant updates](#whats-new-for-hek-users) to the game engine and original tools, including bug fixes, quality of life improvements, extended limits, and new features.
* A complete source [tag set](~tags) for the game's stock campaign and multiplayer maps, plus source [scripts](~scripting) for the campaign. This means that, unlike the original HEK, singleplayer maps are officially supported and you won't need to extract the stock tags anymore.
* A brand new tool, the [H1A standalone build](~h1a-standalone-build), which loads [tags](~) instead of [maps](~map) (like Sapien) and supports _all_ console commands unrestricted. It is intended for fast iteration and troubleshooting custom singleplayer maps and AI.

These tools are based on the original internal tools created by Bungie during the game's development. They have been updated over the years as Halo changed hands, and are now available again in a trimmed-down state for public use. You do *NOT* need to own MCC to install the H1A-EK.

Using the H1A-EK to create content for H1CE rather than H1A is not officially supported. For example, H1CE uses a different [map version](~map#map-header-cache-version) and won't load maps compiled for H1A. Taking advantage of many of the fixes and extended limits below will also result in your tags not being backwards compatible. **Use at your own risk.**

# Getting started
{% figure src="/general/tools/steam_tools.jpg" %}
Pictured: Location of the mod tools in the steam library.
{% /figure %}

1. [Download the tools using Steam](steam://run/1532190), you might need to [install Steam](https://store.steampowered.com/about/) first.
2. Follow the on screen prompts to download the tools.
3. Once the tools are done downloading you can find them in your library in the tools section.
4. Right click the entry for the mod tools, select the "Manage" context menu entry then select the "Browse local files" subentry.
5. Run the `Extract (HCEEK).bat` file - this will extract all the files required.
6. (Optional) Check out the [guides hub](~guides) to learn more about modding or install a launcher like [Osoyoos](~) if you don't like using the command line.

# Installing updates
1. Make sure you didn't update any stock tags, and if you did make a backup of those files.
2. Re-run `Extract (HCEEK).bat` and replace all files.

# Changelog
This changelog is focused on known notable modding-related changes and is not guaranteed to be complete.

## TBD 2023
* Inclusion of digsite content.
* Biped seats are now functional, meaning rideable bipeds are possible.
* Backported [`screenshot_cubemap`](~scripting#functions-screenshot-cubemap) from H2 to H1.
* Added a [weapon flag](~weapon#tag-field-weapon-flags-uses-3rd-person-camera) to use third person camera while holding it.
* Added 4 new outer center anchors for HUD elements (usable in [hud_globals](~), [grenade_hud_interface](~), [unit_hud_interface](~), and [weapon_hud_interface](~)).
* Added a new bitmap compression format, BC7 [_high-quality compression_](~bitmap#tag-field-encoding-format-high-quality-compression).
* Alpha channel is no longer discarded when importing fully transparent bitmaps to an uncompressed format.
* Added the [_alternate bump attenuation_ flag](~shader_environment#tag-field-shader-environment-flags-use-alternate-bump-attenuation) to shader_environment to prevent [shading artifacts](~h1/tags/shader/shader_environment#shading-artifacts).
* Raised [model_animations _units_](~model_animations#tag-field-units) limit to 512, matching OpenSauce.
* Resetting a player's inventory through the HS function `player_add_equipment` no longer causes an exception.
* Trigger volume placement is no longer buggy after the first. This required hiding their parameter fields under expert mode.
* Classic mode HUD text elements scale properly.
* Console messages warning of generic shaders missing maps/stages now specify which shader.
* Fog planes can now be reassigned back to "none" using Sapien.
* AI enable and disable now use correct command in debug menu.
* Fixed rename.txt sometimes crashing Tool during imports.
* Fixed a shading artifact on shader_environment when lightmaps contain invalid incident radiosity vectors.
* Standalone no longer crashes when rapidly reloading and meleeing at the same time.
* Campaign co-op now uses ODST-era netcode.
* Added secondary reload animation support for weapons with dual triggers and magazines.
* Sapien no longer crashes on close if you have selected the trigger volume node and there exist trigger volumes.
* [Filthy part indices in gbxmodel](~gbxmodel#tag-field-geometries-parts-prev-filthy-part-index) now only default to `-1` if both prev and next indices are `0`.

## December 2022
* [A flag](~bitmap#tag-field-flags-use-average-color-for-detail-fade) was added to the bitmap tag that allows users to opt into Halo 2's mipmap fade behaviour rather than it being the default.
* Vertex explosion when going above 30 FPS fixed.

## September 2022

General:
* New script functions `sleep_forever`, `debug_script_thread`, `debug_scripting`, `breakpoint`, `kill_active_scripts`, `get_executing_running_thread`, `kill_thread`, `script_started` and `script_finished`
* New script globals `hs_verbose` and `breakpoints_enabled`
* Support for script parameters similar to the ones seen in H3+.
* First person permutations will match the third person permutations when object render models match.
* The Movement Penalized field in weapon tags is now functional.
* HUD prompts for actions such as entering vehicles will now display correctly.
* Remove hard-coded behaviour in Tool that prevented `tool structure levels\b20 b20` from being able to find any shader tags.

Content:
* Various changes to tags and data files. Updating your tag set is highly recommended.

Guerilla:
* Mouseover text for the inconsequential flag is no longer cut off.
* Added support for 3rd and 4th grenade slots.
* Added flag to toggle runtime tag patches to the scenario tag.

Standalone:
* The command `core_load_name` now loads instead of saving.
* The debug menu now has the option for `debug_menu_rebuild`
* The command `player_spawn_count` will no longer cause an assertion when used without multiple controllers.
* Decals will no longer appear in front of geometry when viewed from a certain distance.

Tool:
* Zoom in hud messages will no longer be treated as crouch when importing strings.

## March 2022

General:
* Add script function `game_time_authoritative`

Content:
* Fixed mirrors on AOTCR showing clipping near the player boots. This is a tag change so make sure to update your files for this to take effect.
* Various changes to tags and data zips. Updating your tag set is highly recommended.

Guerilla:
* Fix flags displaying weirdly unless the window was refreshed.

Sapien:
* Now has a debug menu similar to the one seen in H2+. Commands can be defined in the debug_menu_init.txt found in the root folder.
* Fixed mouse sensitivity in vehicle and zoom.

Standalone:
* Now supports loading MP scenarios for testing.
* Now has a debug menu similar to the one seen in H2+. Commands can be defined in the debug_menu_init.txt found in the root folder.
* Fixed mouse sensitivity in vehicle and zoom.

## November 2021

Sapien:
* Autocomplete in console should display columns a little more evenly.
* Game view window now uses an aspect ratio that fits the size the user sets. 
* Fix toggling "Draw transparent geometry" causing a crash.
* UI tooltips should flicker less. 

Guerilla:
* UI tooltips should flicker less. 

## October 2021

General:
* Many changes to the base game will also apply to the tools. Reading the official update is recommended.
* Some functions for handling tag names and [unicode_string_list](~) were changed to more gracefully handle missing data.

Content:
* Tags were updated to season 8 content. Updating your tag set is highly recommended.
* Shader source code is now included.

Tool:
* FBX converter performance was improved.
* Fixed FBX marker radius not being handled correctly.

Guerilla:
Some tag field names were changed to better reflect their usage, used fields were hidden and some tooltips were updated.

Sapien:
* Some of these also apply to standalone or MCC itself.
* A rare vertex explosion issue that occurred when the framerate was not capped was fixed.
* Real time mirror rendering was fixed.
* A crash that could occur when rotating objects was fixed.
* Framebuffer blend function `double multiply` was changed to better match Custom Edition, enabled for H1CE maps and tags that set "custom edition blending".
* Windows can now be automatically re-arranged using the *Window* menu (works similarly to Guerilla)

# Comparison to the HEK
{% figure src="kornman.jpg" %}
Pictured: kornman00 eliminating editing kit bugs, circa June 2021
{% /figure %}

If you're coming from the legacy [HEK](~hek) for Custom Edition or earlier versions of MCC you may be wondering what's new and great about the updated H1A tools and engine. Don't worry, we've got you covered!

The season 7 MCC update ([patch notes](https://support.halowaypoint.com/hc/en-us/articles/4402601893268-Halo-The-Master-Chief-Collection-MCC-Patch-Notes-June-2021)) is a significant milestone for the Halo 1 engine. It represents the [recombination of code](/h1/games.svg) and tags from Anniversary, Custom Edition, OG Xbox. Many aspects of [Halo 2's tools](~H2V-EK) or limits from later games have even been backported. Mod support is likely to continue beyond season 7 in a phased approach. The tools can receive updates over time owing to their distribution via [Steam][].

## Exporters
* [Blitzkrieg](~hek/blitzkrieg) was not rereleased. Use [Halo Asset Blender Development Toolset](~halo-asset-blender-development-toolset) or the new Tool commands for converting [Autodesk FBX](https://en.wikipedia.org/wiki/FBX) to JMS and JMA files.

## Content
* All the [tags](~) used in retail MCC plus the ones used for the old HEK tutorial are included alongside the tools, meaning tag extraction with [Refinery](~) or [invader-extract](~) or prebuilt tag sets are no longer required if someone wants to mod the stock maps. Note that these tags are partially incompatible with H1CE due to their use [new flags](~weapon#tag-field-triggers-flags-use-unit-adjust-projectile-ray-from-halo1), [shader_transparent_generic](~), etc. The tags are intended for targeting H1A.
* The original source [HSC scripts](~scripting) are included for all campaign missions.

## General
* Stability improvements:
  * Negative [fog](~) opaque distance and depth no longer causes a crash.
  * Negative power values for [skies](~sky) no longer causes a radiosity crash.
  * Fixed [bitmap group sequence blocks](~bitmap#tag-field-bitmap-group-sequence) crashing when crosshair overlay sequence index was out of bounds.
  * Fixed exception when AI try to fire weapons without [projectile references](~weapon#tag-field-triggers-projectile-object).
  * Fixed a crash resulting from ejection from flipped vehicles not resetting unit animation state.
  * Removed an incorrect assertion related to drawing HUD numbers and bitmap sequences.
  * AI debug code now safely checks for an actor's secondary look direction prop index being NONE.
  * Various buffer overflow, index out of range, and stale pointer fixes.
  * Increase `MAXIMUM_NUMBER_OF_BUILD_SPRITE_BITMAPS` from 8 to 16 (renderer stability).
* The engine will now check and log when an invalid [particle_system](~) using [rotational complex render mode](~particle_system#tag-field-particle-types-complex-sprite-render-modes-rotational) has a particle state where the sprites bitmap does not include another "sideways" sequence after the given "forward" _sequence index_.
* The tools are in general faster and more responsive (in part due to manual optimizations, in part due to [*play* builds](~build-types#optimization-options) built with a modern optimizing compiler being used instead of *test* builds).
* Asserts can be disabled using the `-noassert` command line flag.
* The tags, data, and maps directories can now be set when running all tools. See [custom content paths](~using-custom-content-paths) for more info. This makes it easier to work with different tag sets.
* All tools are still 32-bit but they are now large address aware (LAA). This allows them to use up to 4 GiB of virtual memory instead of 2, which prevents Sapien from running out of memory when editing scenarios with many large assets.
* Various cases of unnecessary/confusing logging in the tools have been removed, such as "Couldn't read map file toolbeta.map" and "Sound card doesn't meet minimum hardware requirements".

## Visual
* The tools now use the modern [DX11](https://en.wikipedia.org/wiki/DirectX#DirectX_11) graphics API instead of the obsolete [D3D9](https://en.wikipedia.org/wiki/DirectX#DirectX_9) API. this should result in better performance and support on modern systems.
* First person models now use the highest [LOD](~gbxmodel#level-of-detail) available instead of the lowest.
* Increased `MAXIMUM_RENDERED_ENVIRONMENT_SURFACES` from 16k to 32k. This means [BSPs](~scenario_structure_bsp) can now have more visible triangles without culling happening. It is still important to use portals to manage visible clusters.
* Many [Gearbox visual bugs](~renderer#gearbox-regressions) were fixed. Some examples are:
  * Restoration of [shader_transparent_generic](~) and [shader_transparent_plasma](~)
  * [fog](~) screen layers
  * Fog planes draw over sky
  * Environment bump mapping
  * Interpolation on screen shake, antennas, flags, and some UI fading
  * Water mipmap order
  * Camo tint
  * Glass with bumped reflections
  * Flashlight distance
  * Widget alignment in mirror reflections

## Tool
* Lots of new verbs have been added. See the [Tool](~h1a-tool) page for details.
* A `-verbose` flag can be added to see additional logging.
* Lightmapping code has been optimized and is even faster with the `-noassert` command line flag. Lightmapping now takes roughly a quarter of the time of legacy Tool and is even faster than [LM tool](~hek/tool/lm_tool). Additionally this code now only uses 32-bit integers instead of an unsafe mix with 16-bit ones, and 16 MiB stack reserve. This increases the crash stability of radiosity.
* Most logs (like `debug.txt`) are now saved to a `reports` subfolder (similarly to Halo 2+).
* Bitmaps compilation
  * Bitmap DXT1-3 (BC1-3) encoding now uses [DirectXTex](https://github.com/Microsoft/DirectXTex) instead of some S3TC code. This should result in higher quality similar to the original XDK.
  * The `bitmaps` verb now accepts both `.tiff` and `.tif` extensions like `bitmap` does.
* Map compilation ([`build-cache-file`](~h1a-tool#build-cache-file)):
  * Script data is properly recompiled from source files when available now. A bug previously caused Tool to always fall back to sources stored in the scenario tag.
  * [Resource maps](~map#resource-maps) can optionally be updated to include all the resource data for the scenario being packaged.
  * Maps can target "classic" or "remastered" mode.
  * `loc.map` [resource maps](~map#resource-maps) are no longer generated or used as they are not used by H1A (aside from H1CE backwards compatibility).
  * Tool will now log errors when the user attempts to use swarm actors in firing-position based combat; _always charge at enemies_ must be set to prevent runtime crashes.
* Model and structure compilation:
  * The functionality used by [phantom_tool](~hek/tool/phantom_tool) to remove [collision artifacts](~scenario_structure_bsp#collision-artifacts) is now exposed as an argument for compiling [BSPs](~scenario_structure_bsp) (`structure` verb) and [model_collision_geometry](~) (`collision-geometry`).
  * [WRL](~) files are saved alongside the [JMS](~) file being compiled rather than the HEK root. The user is now told that this file was generated.
  * When compiling a structure BSP and shaders do not yet exist, the chosen types of shaders will now be generated in the level's `shaders` directory instead of the tags root.
  * Model compilation can now optionally use [Halo 2's logic for LOD selection](~h1a-tool#halo-2-lod-selection-logic), which is more intuitive.
  * Model and collision importing have more verbose output. Use `-verbose` for the most troubleshooting information.
* Usage and feedback clarity:
  * Argument parsing is now less primitive. Verbs can include optional arguments and flags and any unrecognized options are presented to the user.
  * The usage printout when Tool is run without arguments is now sorted. The names and argument descriptions of some existing verbs have been updated for clarity and consistency.
  * `zoners_model_upgrade` and `strings` verbs have been removed since they weren't useful.
  * Tool will now tell you if it couldn't find a directory rather than simply logging nothing like some verbs previously did (looking at you `model`).
  * Verbs which accept a tag path as an argument will now automatically strip `data\` and `tags\` prefixes, allowing you to use tab completion on the command line (Halo 3 backport).
  * Tool will no longer exception (but will log errors) when compiling a [gbxmodel](~) where the [JMS](~) has invalid node weights (two nodes where one has weight `1.0`).
* Tool supports a `-pause` flag which keeps the process running after completion until the user presses {% key "Enter" /%}. This was meant for community-made launchers like [Osoyoos](~).
* Stability improvements:
  * ogg/vorbis upgraded to to 1.3.5/1.3.7 which should improve [sound](~) compilation stability.
  * Fixes for various unsafe code: uninitialized variables, bad `printf` args, etc.

## Sapien
* When [Sapien](~h1a-sapien) crashes it will attempt to autosave the scenario to a new file.
* The [lightmap](~lightmaps) painting feature was fixed. The user can perform touchups to fix light leaks or add missing lights and save changes to the lightmap.
* Garbage collection now takes into account Sapien's 5x higher objects per map and object memory pool limits so Sapien no longer spams "garbage collection critical" errors after loading the c10 scenario.
* Multiple Sapien instances can now be launched at once using the `-multipleinstance` [command line](~command-line) flag.
* Game window improvements:
  * Weather and particle effects like smoke and fire will now render.
  * When the camera is outside the [BSP](~scenario_structure_bsp), you will now see structure debug lines by default (`debug_structure_automatic`) (like [H2 Sapien](~h2-sapien)). This helps you find the BSP if you get lost or the camera begins outside it, as with b40.
  * Interpolation code from H1A is included and `framerate_throttle` is disabled by default, allowing for smooth animation and movement.
  * The camera speed can be temporarily boosted by holding {% key "Control" /%}.
  * The _Game window_ resolution has been increased from 800x600 to 1280x720 (widescreen).
  * A gamepad can be used to [control the camera](~h1a-sapien#game-window), though this feature is experimental.
* User interface improvements:
  * Sapien now features a modern Windows file open dialog which includes locations like quick access. This is also true for the _Edit Types_ menu when finding new tags to add to a palette.
  * Invalid block indices are now shown as `BAD: #` rather than being set to `-1`.
  * UI has been cleaned up a bit with unsupported elements removed (e.g. _File > New_) and others renamed.
  * Added "Clear" button to tag reference dialog.
  * The _View_ menu now includes ways to reopen the _Output window_ and _Tool window_ if they are closed.
  * Widened layouts for strings, references, block indices, etc.
  * When placing [netgame flags](~scenario#tag-field-netgame-flags), the _Properties palette_ now includes explanations for how to set up each [game mode](~game-modes).
  * When placing [netgame equipment](~scenario#tag-field-netgame-equipment) the team index field also has a helpful reminder that 0=red and 1=blue.
* Stability improvement:
  * Transparent shaders with no _maps_ no longer cause Sapien to crash. The shader is simply not rendered.
  * Objects with _transparent self occlusion_ enabled while also referencing a transparent shader with _extra layers_ will no longer cause a crash.
  * Sapien no longer crashes if a BSP fog plane has a fog region set to NONE.
  * The snap to normal hotkey, {% key "N" /%}, no longer puts the editor into a bad state.
  * [Detail object](~detail_object_collection) painting is possibly more stable now. More testing is needed to confirm.
  * Sapien now supports `-nosound` and `-nojoystick` [arguments](~) as a mitigation for any device-related problems which need to be worked around.
  * The _New instance_ and _Delete_ buttons in the hierarchy view are now properly disabled when not applicable.
  * Recording and model view modes no longer cause a crash on closing Sapien.
  * Closing the _Output window_ now properly sets its handle to NULL.
  * Fixed a crash related to selecting custom [device_control](~) names.
  * Fixed issues with invalid platoon indices.

## Guerilla
* Guerilla now features a modern Windows file open dialog which includes locations like quick access.
* H2 Guerilla backported features:
  * Tag blocks can now be collapsed.
  * UI elements have been upgraded to look more modern, with wider inputs.
  * *Expert mode*, *Show tag block sizes*, and *Copy tag name* options.
  * A zoom level feature has been added to the bitmap viewer. The alpha channel drop-down label has also been corrected.
* Fields which reference a block element by index, shown as a drop-down, now update their appearance in real time as the referenced block is edited. For example, when a referenced element is deleted the field will immediately show "BAD INDEX: #". When the name of a referenced block element is changed, the label in the drop-down is updated in real time too.
* Some unused UI options have been removed.
* Guerilla now enforces [sound](~) tag gain modifiers are within a valid `0.0` to  `1.0` range.
* When tags are loaded for editing, tag references with an unknown [group ID](~tags#group-ids) are now clamped to NONE. This fixes cases like the leftover [weapon_collection](~tags#unused-tags) reference in the Bloodgulch scenario from causing downstream problems.
* _Save as_ now makes copies of read-only tags editable without having to reopen the tag.
* Hover-over tooltips for flags after unused sections are no longer off-by-one, e.g. multiplayer spawn flags for vehicles.
* Fixed a crash from changing a "go to" command list atom _modifier_ field in the [scenario](~) tag.

## HaloScript and console
* The [developer console](~developer-console) now supports the {% key "Home" /%} and {% key "End" /%} keys to move the cursor to the start and end of the input line.
* Console history size has been increased from 8 to 16 entries.
* Many defunct globals and functions have been removed because they are not functioning or applicable to H1A (e.g. for troubleshooting Gearbox netcode).
* Built-in script docs:
  * The `script_doc` HSC function now includes external globals in the output file in addition to functions.
  * Script docs and `help` output now show return value types for functions.
  * Many instances of profanity in function descriptions have been cleaned up.
  * The player is now referred to in a gender-neutral way.
* Custom Edition-specific functions like `sv_say` and `multiplayer_draw_teammates_names` were stubbed out for compatibility with CE maps (avoids crashes).
* Unrecognized script functions and globals will now cause script data to be dropped rather than crashing the game.
* Numerous new [functions](~scripting#functions) were added:
  * Numeric functions: `pin`, `abs_integer`, `abs_real`.
  * Logical functions: `bitwise_and`, `bitwise_or`, `bitwise_xor`, `bitwise_left_shift`, `bitwise_right_shift`, `bitwise_flags_toggle`, `bit_toggle`, `bit_test`.
  * Listing players: `players_on_multiplayer_team`, `local_players`.
  * Printing: `print_if`, `log_print`.
  * Distances: `objects_distance_to_object`, `objects_distance_to_flag`.
  * Physics: `physics_set_gravity`, `physics_get_gravity`, `physics_constants_reset`.
  * Debug camera: `debug_camera_save_name`, `debug_camera_load_name`, `debug_camera_save_simple_name`, `debug_camera_load_simple_name`, `debug_camera_load_text`.
  * Other: `objects_delete_by_definition`, `list_count_not_dead`, `game_is_authoritative`, `debug_structure_automatic`.
* Changes to existing functions:
  * The `print` function no longer unsafely interprets its argument as a format string.
  * `unit_kill` and `unit_kill_silent` no longer crash the game if the given unit does not exist.
  * `debug_camera_save` and `debug_camera_load` now save and load `camera_<mapname>.txt` instead of `camera.txt`. A console message is now logged when the camera file isn't found.
  * `player_effect_set_max_rumble` is no longer a hard-coded alias for `player_effect_set_max_vibrate`. Map scripts (like a10 and d40) were updated.
* H1A's versions of map scripts no longer use a repurposed `core_save_name` to signal mission segments. The function again behaves like legacy and a new `mcc_mission_segment` function was added instead.
* Globals and functions are no longer locked to specific contexts like server or multiplayer. For example, you can use `cheat_spawn_warthog` in SP maps now when using [H1A Standalone](~h1a-standalone-build).

## Debug globals
* `debug_structure` shows invisible collision surfaces in semi-transparent red and includes a BSP bounding box now (Halo 2 Sapien backport).
* `debug_objects` behavior has been changed. It no longer shows bounding spheres and collision geometry by default but these can still be toggled on their own.
* `cheat_jetpack` now works like it was intended to. Hold crouch to float and jump to fly.

## Tag classes
* [unit](~unit#tag-field-metagame-type) and [actor_variant](~actor_variant#tag-field-metagame-type) now each include the _metagame type_ and _metagame class_ fields for MCC's scoring system.
* [shader_model](~) received a [new flag](~shader_model#tag-field-shader-model-flags-multipurpose-map-uses-og-xbox-channel-order) to use "OG Xbox" channel order for the multipurpose map. Guerilla's explanation of channel usage is now updated to explain both H1X and Gearbox+ channel orders.
* Some runtime tag fields have been made invisible, such as [object](~), [weapon](~), and [scenario_structure_bsp](~) predicted resources, some other BSP fields.
* [gbxmodel](~):
  * Node limit was increased from 48 to 63 to match Custom Edition 1.10.
  * The _node count_ fields are now marked deprecated and are invisible in Guerilla. They are written to during postprocessing but never actually used by the game.
  * The markers block is hidden in Guerilla since it is processed from permutation markers and not intended for editing.
* [model_collision_geometry pathfinding sphere](~model_collision_geometry#pathfinding-spheres) limit increased from 32 to 256.
* [scenery](~) received a new [flags field](~scenery#tag-field-flags) which is unused in current versions of MCC.
* [effect](~) parts and particles each previously had two fields called _create in_. The second in each case has been corrected to [_violence mode_](~effect#tag-field-events-parts-violence-mode).
* [weapon](~):
  * Trigger [distribution angle](~weapon#tag-field-triggers-distribution-angle) is now typed as an "angle" instead of a plain float so it can be edited in degrees (radians internally).
  * Trigger flags has a [new option](~weapon#tag-field-triggers-flags-use-unit-adjust-projectile-ray-from-halo1) to force legacy (buggy) aiming behaviour seen in the Spirit dropship's turret.
* [scenario](~):
  * Unused fields have been marked deprecated and no longer appear in Guerilla and Sapien:
    * The first 3 tag references: ["don't use"](~scenario#tag-field-dont-use), "won't use", "can't use".
    * The [functions block](~scenario#tag-field-functions).
    * Player start location [BSP index field](~scenario#tag-field-player-starting-locations-bsp-index).
    * Netgame flags [weapon group](~scenario#tag-field-netgame-flags-weapon-group).
  * The previously hidden cutscene title fields [_text style_](~scenario#tag-field-cutscene-titles-text-style) and [_text flags_](~scenario#tag-field-cutscene-titles-text-flags) are now exposed.
  * There is a new scenario flag [_disable color correction_](~scenario#tag-field-flags-disable-color-correction) although it is unused at this time.
  * [Script source text](~scenario#tag-field-source-files-source) is now visible in Guerilla and Sapien.
  * Netgame flags _team index_ was renamed to [_usage id_](~scenario#tag-field-netgame-flags-usage-id) and explanations were added in the tag for how to set this ID depending on the flag type.
  * [BSP switch trigger volumes](~scenario#tag-field-bsp-switch-trigger-volumes) source and destination BSPs are now typed as proper block indices rather than integers, which causes Guerilla to display them as drop-downs.
  * The following blocks are now hidden by default unless _Expert mode_ is enabled in the menu: _BSP switch trigger volumes_, _scripts_, _globals_, and _references_.
  * Increased limits:
    * `MAXIMUM_SCENARIO_OBJECT_PALETTE_ENTRIES_PER_BLOCK` from 100 to 256.
    * `MAXIMUM_VEHICLE_DATUMS_PER_SCENARIO` from 80 to 256.
    * `MAXIMUM_OBJECT_NAMES_PER_SCENARIO` from 512 to 640.
    * `MAXIMUM_HS_SCRIPTS_PER_SCENARIO` from 512 to 1024.
    * `MAXIMUM_HS_GLOBALS_PER_SCENARIO` from 128 to 512.
    * `MAXIMUM_HS_REFERENCES_PER_SCENARIO` from 256 to 512.
    * `MAXIMUM_HS_SOURCE_FILES_PER_SCENARIO` from 8 to 16.
    * `MAXIMUM_HS_STRING_DATA_PER_SCENARIO` from 256kb to 800kb.
    * `MAXIMUM_HS_SOURCE_DATA_PER_FILE` from 256kb to 1MB.
    * `MAXIMUM_HS_SYNTAX_NODES_PER_SCENARIO` from 19001 to 32767 (SHORT_MAX).
* The unused _spheroid_ tag has been removed.

## Maps and map loading
* Custom maps compiled with H1A Tool are identified by having [cache version](~map#map-header-cache-version-h1a-mcc) `13` in their header (H1CE is `609`).
* The [map file size limit](~map#map-file-size-limit) was increased to 2 GiB.
* [Tag space](~map#tag-space) is increased from 23 MiB to 64 MiB.
* A new [flags field](~map#map-header-h1a-flags) was added to the cache header for controlling H1A features.
* Tags, BSP verts (16 MiB), and game state are now stored in separate dedicated allocations rather than one giant one.
* [Protected maps](~map#protected-maps) will be detected and force a crash because they are unsupported.
* H1CE's resource maps are now included in MCC and are used when playing a H1CE map.

## Game state
Due to changes in the game state structure, savegames from before season 7 are invalidated.

* Some AI-related [game state](~game-state) was space-optimized (roughly 90 KiB savings) to make room for growing other datum arrays.
* Increased [antennas](~antenna) limit from 12 to 24.
* `MAXIMUM_RENDERED_OBJECTS` increased from 256 to 512.

[steam]: https://store.steampowered.com/
