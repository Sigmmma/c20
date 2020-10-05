---
title: Jointed Model Blender Toolset
toolName: Jointed Model Blender Toolset
stub: true
info: >
  * [Source code and download](https://github.com/General-101/Halo-Jointed-Model-Blender-Toolset)
---
The **Jointed Model Blender Toolset** is a set of add-ons for [Blender][] which allows the import and export of [JMS][] and [animation data][animation-data] (e.g. JMA) for both [Halo 1][h1] and Halo 2.

# Installation
To download the add-on from GitHub, choose _Download ZIP_ from the green _Code_ drop-down. There are two ways to install this Plugin:

## Preferences menu
1. From within Blender, select _Edit > Preferences_.
2. In the window that appears, select the _Add-ons_ menu and click the _Community_ button.
3. There now be an _Install..._ button visible, which you should use to choose the `.zip` containing the downloaded add-on.
4. Finally, ensure that the new add-on is **checked** in the add-ons list.

## Manual installation
Firstly, you will need to find Blender's `addons` directory. On Windows, this can be found at `%appdata%\Blender Foundation\Blender\<Blender Version>\scripts\addons`. Linux users will find it at `~/.config/blender/<blender version>/scripts/addons`.

Simply extract the downloaded `.zip` to this location so that the `io_scene_halo` directory is contained in `addons`.
