---
title: Intro to Halo modding
keywords:
  - introduction
  - getting started
  - basics
  - tutorial
  - overview
  - tags
  - maps
  - tag reference
  - tag path
  - extract
redirects:
  - /general/tags
  - /general/maps
---
Modding means different things to different people. It can include modifying game files, hacking/extending the game's code, or creating new custom content. This site will focus on custom content creation via the [official mod tools](~mod-tools).

Halo is a highly _data-driven_ game engine, as opposed to having all behaviours hard-coded. It implements a limited set of object types and core systems like vehicles, weapons, physics, AI, networking, and rendering, but leaves it up to designers and artists to create the specific items and assets within this framework.

While it's not possible to use the mod tools to add arbitrary new features to [the engine](~blam) or extend game code, you're free to create any new content you can imagine that fits within Halo's systems. Aside from campaign [scripts](~scripting), you generally won't need to do any coding.

# A foreword
It's important to set some expectations before we begin. The official tools were originally internal dev tools, and they're sometimes rough around the edges. Remember that each iteration of Halo's engine was built for the hardware of the day and to meet the needs of the shipped game; you'll have an easier time working within the engine's limitations rather than pushing its boundaries.

[Official documentation](https://learn.microsoft.com/en-us/halo-master-chief-collection/) is limited, tutorials won't always be available, and despite our efforts here at c20 there's just a lot of ground to cover. The games are closed source and we're still discovering how they work to this day. Modding will test your persistence and abilities to learn from existing examples, explore your ideas, troubleshoot independently, and effectively ask for help. See our tips on [troubleshooting and effectively asking for help](~help).

Most importantly, we encourage you to **take things slowly**. People often start with a highly ambitious vision, only to get discouraged and give up entirely when they hit walls. Depending on your modding goals, you may need to learn 3D modeling, texturing, and animating while also learning the mod tools! A seemingly simple goal like porting a vehicle from one Halo game to another can be very complicated.

# Tags
Halo's runtime resources are called **tags**. These are structured [binary files](https://en.wikipedia.org/wiki/Binary_file) which describe all the items and assets the game needs at runtime, such as textures, sounds, models, AI behaviours, effects, weapons, levels, and more. Tags form hierarchical relationships through _tag references_, allowing you to reuse common resources.

Creating and editing tags is core to most modding. At a high level, you will use the [mod tools](~) to create and edit tags, then build the tags into distributable [maps](#maps). Each game's mod tools come with the set of "stock" tags needed to build the original maps. They're also great examples to learn from.

An individual tag of a particular type, e.g. `warthog.vehicle`, is called a _tag definition_ or _instance_.

## Tag groups
Tags come in predefined types (called **groups** or **classes**), each with their own structure and data fields. Tag groups and their structures vary between the games, meaning tags are generally not cross-compatible (with some exceptions like H3/ODST). However, many common groups persist from game to game and often share or build upon prior features. Some examples include:

* `scenario`: A level's root tag, which includes all object placements, AI encounters, spawns, and more.
* `scenery`: Describes basic non-moving objects like boulders.
* `scenario_structure_bsp`: Contains level geometry.
* `biped`: Describes AI or player characters.
* `weapon`: Describes weapon properties like charging time, ammo account, and fired projectile.
* `bitmap`: Contains texture data ready to use by the game at runtime.
* `effect`: Defines the particles, sounds, lights, and decals that can appear from effects like impacts or detonations.

You can see a full list of tag groups for [H1](~h1/tags#list-of-tag-groups), [H2](~h2/tags#list-of-tag-groups), [H3](~h3/tags#list-of-tag-groups), and [Reach](~hr/tags#list-of-tag-groups).

Halo internally uses compact 4-character **group IDs** for tag groups in-engine and in tag data, such as `bitm` for _bitmap_, `snd!` for _sound_, and `DeLa` for _ui_widget_definition_. You don't typically need to know these IDs, but they show up in some community tools and discussions.

## Tag references and paths
Tags **reference** each other when they rely on other tags. You can set tag references when editing tags in [Guerilla](~mod-tools#tools-overview). For example, you could modify the Battle Rifle `weapon` tag to reference the rocket `projectile`.

A **tag path** is like a URL for a tag, corresponding to where you find a tag under the mod tools' `tags` folder. For example, a [scenario](~h1/tags/scenario) tag file at `tags\levels\test\bloodgulch\bloodgulch.scenario` would have the tag path `levels\test\bloodgulch\bloodgulch`. The tag _group_, in this case `scenario`, is usually implied by context. Tag paths never include the "tags\" folder prefix or the file extension, and always use backslashes as separators. 

Aside from references, you may need to use tag paths in a few other situations. They're often used in arguments to command-line tools like Tool, or need to be entered into the [developer console](~) to load a map. Level [scripts](~scripting) may reference effects or other tags by their path.

{% alert %}
Note that tag references will be broken if you move a tag file to a different location under your `tags` folder. If you need to do this, be sure to update any tags which were referencing it to use its new location. Broken references are a common source of error!
{% /alert %}

## Blocks and elements
Tags often need to contain lists of data, such as all the _seats_ for a vehicle. In Guerilla you will see these as expandable regions that allow the addition, duplication, or removal of items within. These lists are called **blocks** (and sometimes _reflexives_ by community tools) and their items are called **elements**.

Specific elements within a block are referred to by their **index** number, which [start at 0](https://en.wikipedia.org/wiki/Zero-based_numbering). For example, the first element is at index `0`, the second at `1`, etc. You may sometimes need to refer to block elements in one tag from another tag using an index field when using Guerilla. It is invalid to use indices which do not exist in the block. This information may also be useful if you're attempting to [read exception messages](~help#how-to-read-exception-messages).

# Maps
**Maps**, also known as **cache files**, are packages of [processed tags](~blam#tag-loading) for playable levels. This allows the game to load levels quickly, rather than individually loading and processing many tag files. Maps can be self-contained, or rely on special **shared** or **resource maps** such as `bitmaps.map` which hold data common to multiple levels, reducing file sizes. It is possible to create custom resource maps if needed, though this is an advanced workflow.

Most mods are distributed as maps, but depending on the extent of modding done, target game, and audience they may also include custom resource maps, sound banks, locale bins, shader bins, or DLLs. MCC mods are published to the Steam workshop using [Excession](~).

Map files are incompatible between games. For technical details on Halo 1's map file format and resource maps, see [its dedicated page](~h1/maps).

# Workflow
The content pipeline is usually one-directional:

1. Artists create source data/assets which are converted ("imported") into tag format;
2. Tags are created, edited, and tested with the [mod tools](~mod-tools);
3. Finally, maps are built from the tags and released.

{% figure src="workflow.svg" inline=true %}
The intended workflow is from left to right.
{% /figure %}

Other workflows can be possible using [community tools](~), with caveats:

1. Tags can't always be reversed/extracted back into source data. Depending on the game and tag type, Tool embeds copies of source data within the imported tag called _import info_, but this data isn't always present. In other cases, the process of importing data to a tag is lossy or otherwise difficult to reverse. The [Halo Asset Blender Development Toolset](~) allows you to import certain tags into Blender directly, but this is sometimes giving you a representation of what's in the tag rather than what the original source data would have looked like. 
2. Extracting tags from maps is currently only possible with H1 using [invader-extract](~) or [MEK](~).
3. Directly editing maps, even in-memory while the game is running, is possible with some tools. However, it's more limited and prone to error. This practice predates the mod tools availability and it's more reliable now to rebuild maps from edited tags. However, editing maps may still be useful for quickly validating ideas or when the author of a map doesn't share their tags and tag extraction isn't available (H2+).
4. Ripping models and textures from map files can be done with [Reclaimer](~). Again, it's not always possible to perfectly reproduce source data.

With some exceptions, the mod tools don't come with source data for stock content, just tags. If you extract tags from H1 maps you will also only end up with their tags. Usually this is enough to edit and rebuild your own variant of the maps, but sometimes bringing assets back into source data form will let you make deeper changes.

Consider sharing not just your built maps, but also the tags used to build them. This will allow others to remix your content or fix issues if you've moved on. Backup your tags and source data and you won't need to resort to extraction to recover data.
