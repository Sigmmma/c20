---
title: Sharing mods
redirects:
  - /h1/guides/map-making/map-sharing
---
Ready to share your mod with others? Most map files are self-contained and can be shared freely. Maps which rely on custom [resource maps](~maps#resource-maps) need to be distributed with those resource maps too.

Consider releasing your source assets and tags alongside the map so others can remix it too.

# Pre-release checklist
* Have you left [enough spare tag space](~maps#limits) in your map so players using other languages can avoid crashes?
* Have you supported all intended gametypes by placing the appropriate _netgame flags_ in [Sapien](~h1a-sapien)?
* Does your map rely on non-standard [resource maps](~maps#resource-maps) which need to be included?

# Steam workshop
If you're targeting H1 for the MCC, you can use [Excession](~) to publish your mod to the Steam workshop.

# Release websites
These websites can be used to host map downloads:

* [OpenCarnage](https://opencarnage.net/)
* [ModDB](https://www.moddb.com/games/halo-combat-evolved/mods)
* [NexusMods](https://www.nexusmods.com/halo)

Some archives which are no longer processing submissions, but worth checking out:

* [Halomaps](http://halomaps.org/)
* [Halo CE3](https://haloce3.com/)

## HaloNet
The [HaloNet.net map repository][halonet-repo] hosts Halo Custom Edition maps. Client mods like [HAC2](~) and [Chimera](~) use this repository's [Map Download Protocol][halonet-dl] to automatically retrieve maps when the player joins a server and does not have the map previously downloaded. See the [submission guidelines][halonet-submit] for instructions uploading your map to this repository.

[halonet-repo]: http://maps.halonet.net/maplist.php
[halonet-dl]: http://wiki.halonet.net/index.php/HaloNet_Map_Download_Protocol
[halonet-submit]: http://wiki.halonet.net/index.php/HaloNet_Halo_CE_and_PC_Map_repo

# External tutorials
{% dataTable
  dataPath="tutorials/tutorials"
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