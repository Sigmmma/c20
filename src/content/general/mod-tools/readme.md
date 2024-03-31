---
title: Mod tools
redirects:
  - /general/using-custom-content-paths
childOrder:
  - excession
  - managed-blam
---
The **mod tools**, also called the **editing kits**, are the official releases of tools used to create custom content for the Halo games in the MCC. This site also covers the [HEK](~custom-edition#halo-editing-kit) for Custom Edition since its usage is similar to the Halo: CE Mod Tools, though it is not distributed via Steam.

Each game has its own set of mod tools which, although similar, follow the evolution of [Halo's engine](~blam) over time and include the resources specific to that game. These tools are updated versions of the same internal tools Bungie's artists and level designers originally used when developing Halo. You can use them to modify existing content or create entirely new content. A separately installed program, [Excession](~), publishes mods to the Steam workshop.

Depending on your needs you will probably want more software, like [Blender](~) for creating 3D models and [Osoyoos](~) as a convenience launcher.

# Installation
{% figure src="steam_tools.jpg" %}
Pictured: Location of the mod tools in the steam library.
{% /figure %}

1. [Install Steam][steam-dl] if you haven't already. Windows Store is unsupported.
2. Ensure you own MCC and corresponding DLC for the game you want to mod on Steam: [H2][h2-buy], [H3][h3-buy], [ODST][odst-buy], [Reach][reach-buy].
3. Download the tools using Steam: [H1][h1-dl], [H2][h2-dl], [H3][h3-dl], [ODST][odst-dl], [Reach][reach-dl].
4. Once the tools are done downloading you can find them in your library in the "tools" section.
5. Right click the entry for the mod tools, and select _Manage > Browse local files_ from the context menu. This will open the folder where the tools are installed.
6. Run the `<game> (Extract).bat` file - this script will extract all the assets the tools rely on like shader sources and [tags](~).

It's recommended that you pin the installation folder to explorer or create a shortcut to it. You will need frequent access to these files and it's easier to run the tools from explorer than through Steam's launcher.

You should also add your mod tools folders to the Windows Defender exclusions list. Tools like Sapien and Standalone will load faster.

## Installing updates
Steam updates will not overwrite your tags. Instead, the tags `7z` archive will be updated with any content changes. Sometimes it may be necessary for updates to provide new versions of stock tags.

1. Back up any stock tags you modified.
2. Re-run `Extract (<game>).bat` and replace all files.

# Tools overview
The following tools come with each game's mod tools, sometimes with [build type](~blam#build-types) variants:

* **Tool** (tool.exe) is a [command-line](~) utility. Use it to import [source data](~source-data) into [tag](~tags) format and build distributable map files.
* **Guerilla**, and later **Foundation**, are tag data editors. Use them to modify and create tags.
* **Sapien** is a visual [scenario](~h1/tags/scenario) and [scenario_structure_bsp](~h1/tags/scenario_structure_bsp) editor, sort of like Forge. It's used to populate levels with objects, place multiplayer objectives, set up AI encounters, and assign environmental effects like weather. It is not used to model levels.
* **Standalone** (halo_tag_test.exe) is a [build](~blam#build-types) of Halo which loads from tags rather than maps. Use it to rapidly test and debug levels without having to build them for MCC.
* **[ManagedBlam.dll](~managed-blam)** is a library present for H3+ which allows programmers creating custom tools to work with tag data compatibly.

Another tool, [Excession](~), is not part of the mod tools but is needed to publish mods to the Steam workshop.

# Files overview
The mod tools come with a lot of files and folders, but some important ones are:

* The **`data`** folder is where you put [source data](~source-data) that you want to import into tag format, like textures, models, and animations. You create these files using external software, like [Blender](~) for 3D assets. The layout of folders under here will match the layout under `tags`:
* The **`tags`** folder is where you find tag resources for the game's stock content. These resources are enough to rebuild stock levels and can serve as examples for your modding or the basis of a remix. You will create custom tags under this folder too.
* The **`maps`** folder may not exist initially, but is where Tool puts [maps](~maps) built from your tags when requested.

# Workflow
Playable levels in Halo are represented as [map](~maps) files. The goal is to create new custom maps with your desired changes or custom content. The content pipeline is mainly one-directional:

1. Artists create assets which are converted ("imported") into [tag](~tags) format;
2. Tags are created, edited, and tested with the mod tools;
3. Finally, maps are built from the tags and released.

{% figure src="workflow.svg" inline=true %}
The intended workflow is from left to right.
{% /figure %}

Other workflows are possible but with caveats:

* (\*) Tags can't always be reversed/extracted back into source data. Depending on the game and tag type, Tool embeds copies of source data within the imported tag called _import info_, but this data isn't always present. In other cases, the process of importing data to a tag is _lossy_ and the original source data cannot be perfectly reconstructed.
* (\*\*) Extracting tags from maps is currently only possible with H1 using [invader-extract](~). Older tag extractors for H1 like Refinery and HEK+ are not recommended because they don't properly reverse all [processing](~tags#tag-loading) and may introduce invalid data to extracted tags.
* (\*\*\*) Directly editing maps is possible with [community tools](~), however it is more limited in what's possible and prone to error. This is a practice that predates the mod tools and it's easier now to just rebuild maps from edited tags, although it's not always possible if the author of a map doesn't share their tags.
* (\*\*\*\*) Ripping models and textures from map files can be done with [Reclaimer](~). Again, it's not always possible to perfectly reproduce source data.

With some exceptions, the mod tools don't come with source data for stock content, just tags. If you extract tags from H1 maps you will also only end up with their tags. Usually this is enough to edit and rebuild your own variant of the maps, but sometimes bringing assets back into source data form will let you make deeper changes.

A _map cache file_ is just a way to package the tags needed for a level into an efficient format, but tags are still the core resources. Modders should consider tags to be an output of their modding efforts, not just maps, especially to share creations with other modders. Backup your tags and source data and you won't need to resort to extraction to recover data.

# Using custom content paths
The [H1A-EK](~h1-ek) and [H2-EK](~) tools support overriding content paths, with some caveats. This is an advanced workflow for special circumstances, like keeping multiple large projects separated. H3-EK currently doesn't support this and neither do legacy editing kits (HEK and H2V).

* The data directory can be set using the `-data_dir <path>` argument.
* The tags directory can similarly be set using the `-tags_dir <path>` argument.
* The game root directory, used when compiling maps and finding [resource maps](~maps#shared-maps), is set using `-game_root_dir <path>`.

If no content path is given the tools fallback to using the `data`, `tags`, and `maps` subdirectories of the current directory respectively.

Here are some examples:

```cmd
# packages the tutorial map using assets located in the "hek_tags" tags directory
tool -tags_dir hek_tags build-cache-file levels\test\tutorial\tutorial classic

# launch Sapien using your custom tag+data set located in "E:\my_custom_tagset\"
sapien -tags_dir "E:\my_custom_tagset\tags" -data_dir "E:\my_custom_tagset\data"

# Edit old HEK tags using the new Guerilla release
guerilla -tags_dir "E:\Program Files (x86)\Microsoft Games\Halo Custom Edition\tags"

# Test your custom tagset in the standalone build
halo_tag_test -tags_dir "E:\my_custom_tagset\tags" -windowed

# also works for h2
halo2_tag_test -tags_dir "F:\custom_h2mcc\tags"
```

[h2-buy]: https://store.steampowered.com/app/1064270
[h3-buy]: https://store.steampowered.com/app/1064271
[odst-buy]: https://store.steampowered.com/app/1064272
[reach-buy]: https://store.steampowered.com/app/1064220

[steam-dl]: https://store.steampowered.com/about/
[h1-dl]: steam://run/1532190
[h2-dl]: steam://run/1613450
[h3-dl]: steam://run/1695791
[odst-dl]: steam://run/1695794
[reach-dl]: steam://run/1695793
