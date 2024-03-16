---
title: Level creation
about: guide
img: tutorial.jpg
caption: The custom tutorial level.
thanks:
  General_101: Writing this page.
childOrder:
  - file-directories
  - beginner
  - advanced
  - exporting
  - bsp-troubleshooting
  - kill-volumes
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

Given the iterative process, you should avoid polishing too much until you're confident that the level won't change drastically. For example, placing [detail_object_collection](~), running [lightmaps](~h1a-tool#lightmaps) at final quality, or modeling certain areas in high detail should be done later in case you need to change the level's layout.

The guides in this section will be organized according to this process -- first we'll learn how to get a simple box map ingame, then further guides will expand on specific features you might want.

# Basics
[Data directory](~file-directories)

In this section we will be covering how to setup proper folder structures for our assets in the HEK data folder. This section does not cater to a specific 3D software and can be read by anyone.

# Blender modeling
## Level creation - Beginner
[Level creation - Beginner](~beginner)

The next section will cover the common settings you should mess with when working in Blender. If you already have a solid grasp of what you should configure in Blender then go ahead and skip this section.

The next section will show the user how to create a simple box level that can be imported in Halo to make a valid level. Skip this section if you already have a solid grasp on modeling and setting up a valid scene for Halo or are using the example level file provided in the [beginner](~beginner) section.

## Level creation - Advanced
[Level creation - Advanced](~advanced)

The next section will add details to our previously created mesh in the [Level creation - Beginner](~beginner) section. Do not read this section without reviewing the material in the [Level creation - Beginner](~beginner) section. Skip this section if you already have a solid grasp on modeling and setting up a valid scene for Halo or are using the example level file provided in the [beginner](~beginner) section.

## Level creation - Exporting
[Level creation - Exporting](~exporting)

This next section will cover how to export a properly made mesh from Blender using the [Halo Asset Blender Development Toolset.](~halo-asset-blender-development-toolset) Be sure to review the material in the [Level creation - Beginner](~beginner) and [Level creation - Advanced](~advanced) sections or have the example level file provided in [beginner](~beginner) at the ready.

## Level creation - Additional Info
[Level creation - Additional Info](~additional)

This final section will cover additional info on features mappers can implement into their maps. Only read this section if you understand the previously listed material.

# 3DS Max modeling
Please refer to the original Custom Edition documentation for a tutorial on level creation in 3DS Max.

# Child pages
{% childList /%}

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