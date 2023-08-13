---
title: H1A Guerilla (2021)
stub: true
about: 'tool:H1A-Guerilla'
img: h1a-guerilla.png
caption: >-
  Recreation of a screenshot from the HEK tutorial showing the a
  [scenario's](~scenario) [sky](~) reference being changed.
keywords:
  - tag-editor
  - h1a
related:
  - /h1/tools/hek/guerilla
---
{% alert %}
This is an article about the H1A Guerilla for use with MCC, for the legacy Guerilla for [Halo: Custom Edition](~h1) see [Guerilla](~). You may also be interested in a [summary of changes](~h1a-ek#guerilla) from legacy Guerilla.
{% /alert %}

**H1A Guerilla** is a visual [tag](~tags) editor. Although it can visualize [bitmaps](~bitmap) and play sounds, it is primarily focused on editing and viewing the structured fields which comprise tags. It does not offer ingame previews or interactive placement of [objects](~object), which is [Sapien's](~h1a-sapien) role.

# Saved workspaces
Using _File > Save/Load Workspace_, you can save and reload a file which contains the current state of open tags and their window positions. Guerilla automatically creates a file `guerilla.cfg` with the last window state when closed.

# Using a custom tags path

See [using custom content paths](~mod-tools#using-custom-content-paths), you only need to set a tags directory as Geurilla doesn't use the data folder. It should work without any major issues.

# Known issues
* The "Show HUD" window for [unit_hud_interface](~) tags does not work as intended.
* _Edit > Hold / Fetch_ menu options are not implemented. They are a sort of "undo" or revert feature from H2 Sapien.
