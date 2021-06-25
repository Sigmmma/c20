This guide will give you a high level view of how Halo 1 modding works using the official editing kits ([HEK][] and [H1A-EK][]), which are intended for creating custom maps. We will not be going into community-made tools or unofficial modding workflows.

# Basic workflow
Playable levels in Halo are represented as [map][] files. The ultimate goal in modding is to create new custom maps with your desired changes or custom content. The official asset pipeline to do that looks like this:

![](workflow.svg)

## The resources
* **[Data files][source-data]** are your raw source assets like textures (.tif files), level [scripts][scripting] (.hsc), models ([JMS][]), and [animations][animation-data]. They can be found within the `data` folder of your mod tools installation. The game itself does not use these files. You create these files using external software, for example [Blender][] for 3D assets.
* **[Tags][]** are files which represent each type of object and asset in the game world. You will find these files in your editing kit's `tags` folder. There are many [types][tags#tags-list] of tags and most modding is the creation and editing of tags. Depending on the type, tags reference other tags as dependencies. The editing kit/mod tools come with a base _tag set_ but you can modify them or create your own. Halo does not use these files _directly_.
* **[Map][map]** files are like archives of all the tags needed for a playable level. Maps are loaded by the game and the tags within them are copied into memory to drive the game systems.

## The tools

* **[Tool][h1a-tool]** is a [command-line][] utility mainly used to create tags from data files (like models, sounds, and textures) and maps from tags.
* **[Sapien][h1a-sapien]** can be thought of like _Forge_ from later Halos. It is an interactive editor used to populate levels with objects, place multiplayer objectives, set up AI encounters, and assign environmental effects like weather. Sapien edits a level's tags, specifically its [scenario][] and [scenario_structure_bsp][].
* **[Guerilla][h1a-guerilla]** is a general-purpose tag editor. It is used to create and edit all other types of tags like [weapons][weapon], [vehicles][vehicle], and [particles][particle].
