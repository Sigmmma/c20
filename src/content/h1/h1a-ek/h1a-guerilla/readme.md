---
title: H1A Guerilla
about: 'tool:H1A-Guerilla'
img: h1a-guerilla.png
caption: >-
  A [scenario's](~scenario) [sky](~) reference being changed.
keywords:
  - tag-editor
  - h1a
related:
  - /h1/tools/hek/guerilla
---
{% alert %}
This is an article about the H1A Guerilla for use with MCC, for the legacy Guerilla for [Halo: Custom Edition](~h1) see [Guerilla](~). You may also be interested in a [summary of changes](~h1a-ek#guerilla) from legacy Guerilla.
{% /alert %}

**Guerilla** is a generic [tag](~tags) editor for creating and modifying tag files. Guerilla allows you to view and update the structured blocks and fields which which make up tags, including the references between tags. Although it can visualize [bitmaps](~bitmap) and play [sounds](~sound), it does not offer ingame previews or interactive placement of [objects](~object), which is [Sapien's](~h1a-sapien) role. 

For example, you might use Gurilla to define a new [weapon](~), change the [bitmaps](~bitmap) used by a [shader_environment](~), or set your custom level's [scenario type](~scenario#tag-field-type).

# Using a custom tags path
See [using custom content paths](~mod-tools#using-custom-content-paths). You only need to set a tags directory since Guerilla doesn't use the data folder. It should work without any major issues.

# Saved workspaces
Using _File > Save/Load Workspace_, you can save and reload a file which contains the current state of open tags and their window positions. Guerilla automatically creates a file `guerilla.cfg` with the last window state when closed.

# Known issues
* The "Show HUD" window for [unit_hud_interface](~) tags does not work as intended.
* _Edit > Hold / Fetch_ menu options are not implemented. They are a sort of "undo" or revert feature from H2 Sapien. This is not included in the HEK Guerilla.
