---
title: Obsolete tools
thanks:
  Mimickal: Basic info on HEK+, some tag extraction bugs
  GAIGHER: >-
    Screenshot of SparkEdit from their
    [tutorial](http://halo.maps.free.fr/HALO/sparkedit.html)
  XLNC: HMT screenshot from their tutorial
  Vaporeon: Sharing bitmap corruption example for Arsenic; invader-info tip
  "Modders of Halo Xfire Clan": Screenshots of old tools
  Dennis: Found malware in tool_pro
  gbMichelle: 'Writing the [hex edit guide](https://pastebin.com/rNVVjyus)'
---
This page lists old community-made tools which **should not be used anymore** because they have known issues and/or a newer recommended approach exists. With the long history of Halo 1 PC modding, over time our understanding of the engine and tags has grown and new community-made tools phased out older ones.

{% alert type="danger" %}
Despite their age, these tools are pervasive in outdated tutorials and forum posts found via search engines and people still ask about them to this day. This page exists for archival purposes and to inform people of alternatives. Do not use the tools listed here.
{% /alert %}

# Tag extractors
## HEK+
{% figure src="hekplus.png" %}
HEK+ was last updated in 2006 and is still available for download at [HaloMaps.org](http://hce.halomaps.org/index.cfm?fid=2289).
{% /figure %}

**Halo Editing Kit Plus (HEK+)** by SteelIXB (not to be confused with the official [HEK](~custom-edition#halo-editing-kit)) was a tool for [extracting tags](~maps#extracting-tags-from-maps) from Halo Custom Edition maps, as well as "protecting" maps to hinder tag extraction. While it was the go-to tag extractor for a while, we now know it introduces issues to the tags it extracts, causing crashes or buggy behaviours.

Because HEK+ was widely used in the past to extract tags for inclusion in new maps, the tags in those maps can contain invalid data. For example, [weapon](~) zoom levels always extracts as 256 and sounds may be corrupted. Use the modern tag extractor [invader-extract](~) instead. Even if those tags are now extracted using [invader-extract](~) that invalid data needs to be corrected. Invader will warn you about bad tag data and you can use [invader-bludgeon](~) to help correct it.

Another function of HEK+ was [map protection](~maps#protected-maps). This was a form of controlled data corruption that still allows Halo to use the map, but breaks tag extractors and map editors so other modders can't use your content. These days, mappers usually expect to share and remix tags freely with attribution. [Refinery](~) has defeated this map protection scheme and can be used to extract maps protected with HEK+, but the extracted tags will be disorganized due to the loss of tag path data.

# Plugins
## Blender .gbxmodel Importer
{% figure src="bi2.jpg" %}
A pelican model imported to Blender 2.7.
{% /figure %}
The **Blender .gbxmodel importer** by Fulsam was an add-on for Blender 2.7 to import [gbxmodel](~) tags. It was made obsolete by the [Halo Asset Blender Development Toolset](~halo-asset-blender-development-toolset), which supports importing model tags into modern versions of Blender. The addon is still available for download [here](https://haloce3.com/downloads/applications/blender-gbxmodel-importer-v0-5-1/).

## Blendkrieg
**Blendkrieg** by gbMichelle was an add-on for Blender 3.0+ to import [JMS](~), [model](~), and [gbxmodel](~). The project was incomplete and made obsolete by the [Halo Asset Blender Development Toolset](~halo-asset-blender-development-toolset), which can now reliably import these formats into Blender. The source code for Blendkrieg is available on [GitHub](https://github.com/Sigmmma/Blendkrieg/tree/anim-bones).

# Map editors
## SparkEdit
{% figure src="sparkedit.jpg" %}
SparkEdit source code is available on [GitHub](https://github.com/HaloMods/SparkEdit).
{% /figure %}

**SparkEdit** by Grenadiac was a direct [map](~maps) editor for H1PC. It features a 3D scenario editor where users can place and modify objects similar to [Sapien](~h1-sapien). Custom maps created with SparkEdit were sometimes called "log mods" because modders often used the fallen log scenery to build additional platforms and structures into maps.

There is also the OSX fork **Swordedit**, by bobindashadows, Sword, Samuco. Little is known about this but it may have supported some extra features and Custom Edition maps. Source code is available on [GitHub](https://github.com/ChadSki/Swordedit).

A more powerful modern alternative is using [invader](~) and the official [mod tools](~h1-ek) to extract and edit tags, and recompile maps compatible with these engines.

## HMT
{% figure src="hmt.jpg" %}
Feeling nostalgic? HMT is still on [HaloMaps](http://hce.halomaps.org/index.cfm?fid=725).
{% /figure %}

**Halo Map Tools (HMT)** by MonoxideC and tjc was a popular direct [map](~maps) editor, tag injector, and asset extractor supporting H1X and H1PC (including PC beta and demo). Released in 2004, it was one of the community's earliest modding tools and was used to create modded map files by editing data within a map rather than compiling a map from source tags, albeit with limited support for [tags](~h1/tags). It can extract and inject textures, sounds, and models. This tool was featured in the classic book, [_The Black Art of Halo Mods_][book].

As with SparkEdit, we can now use [invader](~) to reliably extract tags from maps, edit them using official tools and/or invader, and rebuild them for the same target engine.

## HHT
{% figure src="hht.png" %}
HHT's inferface.
{% /figure %}
**Halo Hacker Tools** by CLius-Enixile was a comparable tool to HMT supporting Halo Trial. Details on it are scarce, but it's another tags-in-map editor.

Like the others it has been replaced by the extract, edit, and rebuild workflow using [invader](~) and the modern official mod tools.

## Eschaton
{% figure src="eschaton.png" %}
Eschaton's interface.
{% /figure %}

**Eschaton** by Altimit01 was another map editor for H1PC, Mac, Trial, and H1CE. It allowed for the editing of tags within maps, extracting and injecting textures, and could rebuild maps by injecting tags ripped from other maps. Data formats could be added with XML plugins.

You can use [invader-info](~) to determine if a map file's CRC32 checksum doesn't match its true CRC32 ("dirty"), which means it may have been edited with a tool like Eschaton or HEK+'s map protection. Unfortunately, Eschaton (and other old tools like it) could sometimes introduce corruption to maps making Halo crash with the dreaded "Gathering Exception Data". Since processed/runtime fields are sometimes edited without changing the source fields, extracted tags from these maps may not reproduce the mod when rebuilt.

## Quickbeam
**Quickbeam** was a map editor supporting both on disk and in memory edits allowing for faster iteration on mods. Source code is available on [GitHub](https://github.com/ChadSki/Quickbeam).

Directly editing tags in memory is a fast way to preview changes, but using [Standalone](~h1-standalone-build) and reloading a map after tag edits is nearly as fast.

## Prometheus
**Prometheus** by the HaloDev team (Nick, Grenadiac, MonoxideC, CLuis, JamesD, Kornman, Talin64, rec0, ViperNeo) was a next-generation map editor aiming to support all editions of Halo 1 and Halo 2, building on the legacy of tools like SparkEdit and HMT. However, the project was never completed. Source code is available on [GitHub](https://github.com/HaloMods/Prometheus). A preview of this tool was featured in [_The Black Art of Halo Mods_][book].

# HEK mods
## LM_Tool
{% figure src="lm-time.jpg" %}
LM_Tool outperforms legacy HEK Tool in lightmapping, but is slower than H1A Tool with `-noassert` enabled.
{% /alert %}
**LM_Tool** by gbMichelle is a modified version of HEK [Tool](~h1-tool) which improves the speed of [lightmaps](~) generation (radiosity) by disabling some runtime debug checks. It can _only_ be used for radiosity; all other functions are disabled. See its [development thread](https://opencarnage.net/index.php?/topic/7751-lm_tool-a-version-of-tool-specifically-for-speeding-up-lightmaps/#comment-98219) for more history.

The updated [H1A Tool](~h1-tool) supports a `-noassert` flag that, with its other lightmapping optimizations, greatly outperforms LM_Tool and is now the fastest lightmapping solution.

## phantom_tool
**phantom_tool** by Conscars was a modified version of HEK [Tool](~h1-tool) which allows importing [BSPs](~scenario_structure_bsp) and [model_collision_geometry](~) without [collision artifacts](~scenario_structure_bsp#collision-artifacts) like phantom BSP. This is done by enabling the orphaned code in Tool for the [fix-phantom-bsp flag](~h1-tool#phantom-bsp-fix). Modders should simply use [H1A Tool](~h1-tool) since this flag is exposed now. See the tool's [release thread](https://opencarnage.net/index.php?/topic/8286-phantom_tool-toolexe-mod-which-prevents-phantom-bsp/) for more info.

## tool_pro
**tool_pro** was a community-modified version of the HEK's Tool which extended the [map cache file size limit](~maps#map-file-size-limit) and vertex buffer beyond their defaults.

{% alert type="danger" %}
**Do not use tool_pro!** It was found to contain malware.
{% /alert %}

If you need these increased defaults, use [invader-build](~). It supports these modifications natively for more target engines (and does not contain malware). The following hex edits to Tool (or [OS_Tool](~OpenSauce)) will also extend the limits safely:

* Change offset `0x53181` from `0x2D` to `0x34` (cache size)
* Change offset `0x54D5A` from `0x02` to `0x04` (vertex buffer)

# Porting tools
## Pearl
**Pearl** and **Pearl 2** by Modzy was a tool used to convert maps between Custom Edition, H1PC, Mac, and Trial formats. It's known to be error prone and should be avoided. A better way to port maps between game editions is to first extract their custom tags using [invader-extract](~), include those tags in a base tagset extracted from the target game's maps or from the game's mod tools/editing kit, then rebuild those maps for the target game using [invader-build](~).

## Harbinger
**Harbinger** by Altimit01, Like Pearl, could convert Custom Edition maps to run in H1PC (aka Retail). The same recommendation about rebuilding maps from tags applies here.

## Arsenic
**Arsenic** was a tool used to convert custom CE maps to xbox. It apparently introduces some bitmap corruption and has backwards model LOD cutoffs. Tags extracted from maps using Arsenic will be in a [processed state](~general/tags#tag-loading) and are not suitable for editing. These days it is better to use a combination of [invader](~) and the MCC mod tools to create custom maps for xbox.

# Deprotectors
## Emergence
**Emergence** by Modzy was a deprotector able to defeat some forms of map protection. Little is known about this tool or if it's still available anywhere. [Refinery](~) is also capable of map deprotection.

# Other
## Saber Editing Toolkit
The **Saber Editing Toolkit** (**SeT**) by Zatarita is a Python library for manipulating Saber pack files, which for a time was necessary to add custom assets to Halo 1 MCC maps. Its [source code][set] and related tools like [Sabre-unPacker (SuP)][sup] and [ceaflate][] may be of interest to developers.

[set]: https://github.com/Zatarita/SeT
[ceaflate]: https://github.com/SnowyMouse/ceaflate
[sup]: https://opencarnage.net/index.php?/topic/8065-update-sup-020-s3dpak-extractor/

## Ghostbuster
**Ghostbuster** by Conscars was a [command-line](~) tool used to detect and fix [phantom BSP](~scenario_structure_bsp#phantom-bsp) by modifying the BSP node structure. Detecting phantom BSP is difficult to do reliably, so it both reports false positives and misses some cases, and creates [collision holes](~scenario_structure_bsp#bsp-holes). The tool's source code is on [GitHub](https://github.com/Sigmmma/ghostbuster).

You should always attempt to fix phantom BSP by firstly resolving any [nearly coplanar faces](~bsp-troubleshooting#warning-nearly-coplanar-faces-red-and-green) indicated in your [WRL file](~wrl), and if that doesn't resolve it by secondly using H1A Tool with the [fix-phantom-bsp flag](~h1-tool#phantom-bsp-fix).

## Proton
I couldn't find information on this tool, but know it's some type of map editor created around 2016 by a "Deleted User". It must have been released at some point because there's at least 1 case of someone asking how to use it in Discord. Just don't use it.

[book]: https://archive.org/details/blackartofhalomo0000cawo