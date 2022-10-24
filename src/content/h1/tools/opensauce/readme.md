---
title: OpenSauce
stub: true
about: 'tool:OpenSauce'
info: |
  * [Source](https://github.com/yumiris/OpenSauce/wiki)
  * [Download](https://haloce3.com/downloads/applications/open-sauce-4-0/)
keywords:
  - tool
  - sapien
  - guerilla
---
**OpenSauce** (often just "**OS**") is a mod for Halo Custom Edition and its editing kit. It enhances the in-game experience with customization and engine extensions, but also offers modified versions of the HEK tools for more extensive modding of the game. It is mostly used as the base for experimental maps and singleplayer overhaul mods like CMT's SPV3.

{% alert %}
OpenSauce is incompatible with [Chimera](~). Attempting to use both at the same time will result in crashes or a white screen when launching the game.
{% /alert %}

# OS_Tool

# OS_Guerilla

# OS_Sapien

# Game features
Note that OpenSauce uses the filename `initc.txt` for [init scripts](~arguments#init-txt) instead.

Crash reports can be found in `<DRIVE>:\Users<USER>\Documents\My Games\Halo CE\OpenSauce\Reports`.

# New tag types
These extended tag types are specific to OpenSauce .yelo maps and are only supported by the OpenSauce mod:

{% dataTable
  dataPath="tags/os"
  rowSortKey="key"
  columns=[
    {name: "Tag name", key: "key"},
    {name: "Group ID", key: "value/id", format: "code"}
  ]
/%}
