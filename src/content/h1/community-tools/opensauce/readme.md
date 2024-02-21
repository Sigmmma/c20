---
title: OpenSauce
about: 'tool:OpenSauce'
info: |
  * [Documentation](https://github.com/MirisWisdom/OpenSauce/wiki)
  * [Source](https://github.com/yumiris/OpenSauce)
  * [Download](https://haloce3.com/downloads/applications/open-sauce-4-0/)
keywords:
  - mod
  - os
  - yelo
---
**OpenSauce** (often just "**OS**") is a mod for Halo Custom Edition, its Halo Editing Kit, and dedicated server. For players, it offers customization and some QoL features. For modders, it offers engine extensions and modified tools for more extensive modding of the game.

It wasn't typically used for multiplayer maps since all clients would need to use OpenSauce, but was used for several large singleplayer mods like TSCE:E and SPV3. It only supports CE v1.10.

{% alert %}
OpenSauce is incompatible with current [Chimera](~) versions. Attempting to use both at the same time will result in crashes or a white screen when launching the game.

It's recommended that you create a separate copy of the Halo Custom Edition installation to use with OpenSauce and [Yelo maps](~map#opensauce-yelo-maps) exclusively.
{% /alert %}

# Features
OpenSauce is mostly used for its extended modding features:

* New tool commands,
* New script functions,
* [unit](~) extensions,
* [actor_variant](~) transforms,
* BSP modifiers (lightmap and sky sets),
* Directional lightmaps,
* Shader extensions,
* Post-processing shaders,
* Map downloads (from OS dedicated server).

For players, OS offers customized post-processing, FOV, HUD, and FP origins. Most players today tend to prefer [Chimera](~), especially because it integrates with the [HaloNet](~sharing#halonet) automatic map download repository.

# Modding with OpenSauce
The OpenSauce HEK provides modified versions of the official HEK tools, called OS_Tool, OS_Guerilla, and OS_Sapien. These tools must be used when creating and editing OpenSauce tags.

OS_Tool produces maps with the extension `.yelo`. These maps are intended to be played with the OpenSauce mod enabled, since they can contain tags that rely on OpenSauce features and tag groups. [Refinery](~) supports extracting OpenSauce tags from these maps, but [Invader](~) does not.

Crash reports can be found in `<DRIVE>:\Users<USER>\Documents\My Games\Halo CE\OpenSauce\Reports`.

Note that OpenSauce uses the filename `initc.txt` for [init scripts](~arguments#init-txt) instead.

# New tag groups
These extended [tag groups](~general/tags#tag-groups) may be found in .yelo maps and are only supported by the OpenSauce mod:

{% dataTable
  dataPath="tags/os"
  rowSortKey="key"
  columns=[
    {name: "Tag name", key: "key"},
    {name: "Group ID", key: "value/id", format: "code"}
  ]
/%}
