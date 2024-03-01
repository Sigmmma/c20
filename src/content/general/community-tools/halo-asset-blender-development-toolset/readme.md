---
title: Halo Asset Blender Development Toolset
about: 'tool:Halo Asset Blender Development Toolset'
info: |-
  * [Download releases](https://github.com/General-101/Halo-Asset-Blender-Development-Toolset/releases)
  * [Source code and README](https://github.com/General-101/Halo-Asset-Blender-Development-Toolset)
redirects:
  - /general/tools/jointed-model-blender-toolset
---
The **Halo Asset Blender Development Toolset** is an addon for [Blender](~) which allows the import and export of [JMS](~), [animation data](~animation-data) (e.g. JMA), [ASS](~), and JMI for [Halo 1](~h1), [Halo 2](~h2), [Halo 3](~h3) and Halo 3: ODST.

# Installation
To download the add-on from GitHub, go to its [releases page](https://github.com/General-101/Halo-Asset-Blender-Development-Toolset/releases) and download the latest version. The zip you want will be in the panel labeled _Assets_ and will start with the name _halo-asset-blender-toolset_. **Do not** click "Download ZIP" from the "Code" drop-down.

The addon comes in both _lite_ and _full_ versions, where full versions include typical Halo models for scale reference purposes.

Once downloaded, there are two ways to install this addon:

## Preferences menu
1. From within Blender, select _Edit > Preferences_.
2. In the window that appears, select the _Add-ons_ menu and click the _Community_ button.
3. There now be an _Install..._ button visible, which you should use to choose the `.zip` containing the downloaded add-on.
4. Finally, ensure that the new add-on is **checked** in the add-ons list.

## Manual installation
Firstly, you will need to find Blender's `addons` directory.

* On Windows (Standalone Version), this can be found at `%appdata%\Blender Foundation\Blender\<Blender Version>\scripts\addons`.  
* On Windows (Steam Version), this can be found by right clicking Blender in Steam -> Manage -> Browse Local Files -> `<Blender Version>\scripts\addons`.  
* Linux users will find it at `~/.config/blender/<blender version>/scripts/addons`.

Simply extract the downloaded `.zip` to this location so that the `io_scene_halo` directory is contained in `addons`.

# Settings
## Halo scene properties
Under Blender's scene properties tab you'll find _Halo Scene Properties_. The _Game Version_ will hide features of the addon which don't apply to the game version you're targeting.

![](scene-options.jpg "This should help you stay focused on what matters to you.")