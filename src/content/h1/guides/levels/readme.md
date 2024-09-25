---
title: Level creation
about: guide
img: tutorial.jpg
caption: The custom tutorial level.
thanks:
  General_101: Writing this page.
childOrder:
  - box-level
  - bsp-troubleshooting
  - portals-and-clusters
  - advanced
  - reflection-cubemaps
  - additional
redirects:
  - /h1/guides/map-making/level-creation/blender-level-modeling
  - /h1/guides/map-making/level-creation
  - /h1/guides/map-making
---
This series of guides will cover the creation of custom levels, including modeling, lighting, adding weather and sounds, and populating them with decorative objects like [scenery](~). Once a level is completed, it can serve as the stage for a [custom singleplayer mission](~singleplayer) or [multiplayer map](~multiplayer).

Some of these pages are intended for Blender users so 3ds Max users may want to refer to the [classic HEK tutorial](http://nikon.bungie.org/misc/hek_tutorial/). Others pages are applicable regardless of the 3D software being used. These guides are also applicable to both the HEK and H1A MCC tools.

# Overview
Creating a custom Halo level is an iterative process; you shouldn't try modeling a map to completion and only _then_ trying to get it ingame. It's best to set up the workflow first, familiarize yourself with the tools and steps needed, and understand the engine's rules. Making repeated small changes to the level and testing them ingame will help you avoid getting overwhelmed by [BSP issues](~bsp-troubleshooting), refine the layout and size of the level, experiment with lighting, and make any other changes early while it's still easy to do so.

![](levels_workflow.svg "The process of building a level. Your level may not require custom textures/shaders.")

The above workflow may be part of a broader goal, such as creating a singleplayer mission, but we'll not cover that in this section. The main point is that you'll be repeating parts of this workflow many times as the level evolves towards completion. Sometimes you need to go back and remodel, adjust a shader then relight, or move objects after playtesting.

Given the iterative process, you should avoid polishing too much until you're confident that the level won't change drastically. For example, placing [detail_object_collection](~), running [lightmaps](~h1-tool#lightmaps) at final quality, or modeling certain areas in high detail should be done later in case you need to change the level's layout.

The guides in this section will be organized according to this process -- first we'll learn how to get a simple box map ingame, then further guides will expand on specific features you might want.

# Guides

{% table %}
* Guide
* Skill
* Description
---
* [My first box level](~box-level)
* Beginner
* Introduces the basic end-to-end workflow of creating a custom level, including how to set up the needed folder structures, modeling a box level in [Blender](~), exporting it using the [Halo Asset Blender Development Toolset](~halo-asset-blender-development-toolset), then getting it in-game. You can use the output of this guide for other guides.
---
* [BSP troubleshooting](~bsp-troubleshooting)
* Intermediate
* How to avoid and resolve some common and not-so-common errors you might encounter when importing a level BSP.
---
* [Advanced levels](~advanced)
* Intermediate to Advanced
* Covers numerous other features you might want in your level, such as sculpting terrain, adding bases, streams, and more.
---
* [Additional Info](~additional)
* Advanced
* Covers some other advanced features you may not need for your level.
---
{% /table %}

# External tutorials
{% dataTable
  dataPath="tutorials/tutorials"
  rowFilterKey="tags"
  rowFilterExpr="level"
  rowSortKey="updated"
  rowSortReverse=true
  columns=[
    {name: "Name", key: "name/en"},
    {name: "Description", key: "description/en"},
    {name: "Author(s)", key: "authors"},
    {name: "Last updated", key: "updated"},
    {name: "Links", key: "links/en"}
  ]
/%}