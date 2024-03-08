---
title: H1 Guerilla
about: 'tool:H1-Guerilla'
img: h1a-guerilla.png
caption: >-
  A [scenario's](~scenario) [sky](~) reference being changed.
keywords:
  - tag-editor
  - h1a
redirects:
  - /h1/tools/hek/guerilla
  - /h1/tools/h1a-ek/h1a-guerilla
---
**Guerilla** is a generic [tag](~tags) editor for creating and modifying tag files. Its allows you to view and update their structured data including blocks, fields, and inter-tag references. For example, you might use Guerilla to define a new [weapon](~), change the [bitmaps](~bitmap) used by a [shader_environment](~), or set your custom level's [scenario type](~scenario#tag-field-type).

Although it can visualize [bitmaps](~bitmap) and play [sounds](~sound), it does not offer ingame previews or interactive placement of [objects](~object) in a scenario, which is [Sapien's](~h1a-sapien) role. Guerilla is also not used to import [source data](~source-data) into tag form, which is Tool's role, but can be part of this process since importing new assets sometimes requires editing tag fields and re-importing (e.g. [bitmap format](~bitmap#tag-field-encoding-format)).

This page covers both H1A and [HEK](~custom-edition#halo-editing-kit) versions of Guerilla, which generally work the same but have [some differences](~h1a-ek#guerilla).

# Expert mode
H1A Guerilla includes the _Edit > Expert Mode_ feature. When enabled, this unlocks otherwise read-only runtime and processed fields present in some tags. These fields are normally disabled because they're not meant to be edited under normal circumstances and are instead calculated when the tag is imported or processed for engine-internal purposes.

For example, most fields in [scenario_structure_bsp](~) should not be edited directly and you should instead reimport an updated [JMS](~), but targeted changes like shader references can be safe to do especially if dealing with extracted tags where you don't have the source data. Another use case is overriding the node list checksum in [gbxmodel](~) since different JMS exporters may calculate this differently compared to existing tags with the same skeleton.

# Using a custom tags path
If needed, you can customize H1A Guerilla's startup to use a different tags folder. See [using custom content paths](~mod-tools#using-custom-content-paths). This is not supported in HEK Guerilla.

# Saved workspaces
Using _File > Save/Load Workspace_, you can save and reload a file which contains the current state of open tags and their window positions. Guerilla automatically creates a file `guerilla.cfg` with the last window state when closed.

# Read-only files
Any tag files marked "read-only" on your filesystem (with Right click > _Properties_) will be shown greyed-out when opened with Guerilla as a reminder that you can't edit these tags. Note that doing a _Save As_ with a read-only tag will create a writable file, but will still appear greyed out in HEK Sapien until reopened.

# Import and Export
_File > Export_ will dump tag fields to a text file which can be imported with _File > Import_. This could be useful for programmatic inspection or integrations with `git diff`. You should not export from H1A Guerilla and then import into HEK Guerilla because it can omit information. The import process is currently unsupported in H1A Guerilla and will crash it, while the import process in HEK Guerilla may crash when importing an exported scenario text file that still contains [defunct](~tags#unused-tags) `wpcl` reference types (at least Blood Gulch has this).

# Known issues
* The "Show HUD" window for [unit_hud_interface](~) tags does not work as intended.
* _Edit > Hold / Fetch_ menu options in H1A Guerilla are not implemented. They are a sort of "undo" or revert feature from H2 Sapien. This is not included in the HEK Guerilla.
* The _Source Control_ menu in HEK Guerilla is non-functional.
* _File_ > _Xbox Sync_ in HEK Guerilla is leftover from when tags were synchronized to an Xbox dev kit. This feature is probably non-functional and was removed in H1A Guerilla.