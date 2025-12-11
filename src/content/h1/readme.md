---
title: Halo 1
keywords:
  - h1
  - halo
  - combat evolved
  - ce
thanks:
  gbMichelle: H1A/MCC lineage information
  Hasuku: Xbox modding lineage
  Kavawuvi: Engine versions, H1A BSP data base address
  Vaporeon: Analyzing marketing beta
  Neo: Providing the marketing beta
  zatarita: >-
    Documenting H1A differences from PC and between versions, summarizing new
    formats
redirects:
  - /h1/h1a
childOrder:
  - h1-ek
  - community-tools
  - custom-edition
  - guides
  - source-data
  - tags
  - scripting
  - maps
  - engine
---
{% figure src="box-art.jpg" %}
Halo's box art
{% /figure %}

**Halo: Combat Evolved**, also known as **Halo 1**, is the first installment of the Halo game series. It was created by [Bungie][bungie] and initially released on the original Xbox in 2001 by publisher/owner [Microsoft][microsoft]. In 2003, the game was released for Windows PC and Mac via different studios.

Halo 1 uses Bungie's proprietary [Blam!](~blam) engine, which also formed the basis of later games in the series. PC versions of the game support a variety of command line/shortcut [arguments](~) to configure and toggle features.

# Modding
Today, most modding of H1 is focused on [H1A MCC](#mcc-pc-and-xbox-one-343-industries-2014-2021) and [Halo Custom Edition](~custom-edition). Regardless of the target engine, the recommended approach is to use the [MCC mod tools](~h1-ek) for [tag](~general/tags) authoring and optionally [invader](~) to extract tags and build maps for other targets.

# Editions and versions

{% figure src="games.svg" %}
Evolution of the Halo 1 editions and versions, colour-coded by platform or major revision.
{% /figure %}

## Xbox (Bungie, 2001)
Sometimes called **h1x** or **OG Xbox**, this is the classic first release of Halo 1 for the original Xbox. It supports LAN multiplayer and spawned a competitive community which is still active. While original Xbox consoles are hard to come by, [emulation][xemu] is an emerging alternative. Though it is a more involved process, custom maps created with the [HEK](~custom-edition#halo-editing-kit) can be ported back to Xbox.

Xbox has a rich history of modding, notably:

* **Halo 1.5**, which adds [new competitive maps][h15]. [Custom edition ports][h15-maps-ce] of these maps are also available
* [**Halo 1 Final**][h1final], and its **Neutral Host Edition** (NHE), is a newer competitive mod with modified sounds, time callouts, and a selection of stock and H1.5 2v2-oriented maps
* **Patch Edition** (PE) is a modified version of NHE with map adjustments by Patch and hirsute.

## Halo PC (Gearbox Software, 2003)
Often called **retail** or **PC**, this edition is the classic port of Halo 1 to Windows PC by developer [Gearbox Software][gearbox] and publisher [Microsoft Game Studios][microsoft]. Compared to the Xbox version, the PC port included a number of changes (for better and worse):

* Modification of some multiplayer maps' level geometry
* Addition of server browser and online play
* Addition of Banshees to multiplayer
* Addition of the flame thrower, fuel rod gun, and rocket warthog
* Addition of the multiplayer maps Death Island, Ice Fields, Gephyrophobia, Infinity, Timberland, and Danger Canyon
* Addition of a dedicated server, `haloceded.exe`
* The [model](~) tag was modified into [gbxmodel](~)
* A new "jet" particle creation physics type was added to the [particle_system](~) tag
* [Regressions in visuals](~renderer#gearbox-regressions) and assets due to platform differences and the port being based on a pre-release version of Xbox Halo 1

The game received several patches since its release to address remote exploits, remove the CD requirement, replace the GameSpy Arcade lobby, and other minor improvements. Its current version is `1.0.10` ([2014][patch]).

Several beta versions of Halo PC can also be found online. Beta 1.5 has [unfinished versions of PC-exclusive content][pc-beta-2] and [weapon tuning][pc-beta-1] similar to pre-release Xbox versions. [Marketing beta 1.8][pc-beta-3] features doppler and a model detail option.

## Custom Edition (PC, Gearbox Software, 2004)
[Custom Edition](~custom-edition) is a standalone version of Halo PC released in 2004 which supports custom multiplayer and singleplayer maps created using the [HEK](~custom-edition#halo-editing-kit). It does not include the stock campaign.

## Mac (Westlake Interactive, 2003)
The Gearbox PC port (retail) was itself ported to Mac by _Westlake Interactive_ and published by _MacSoft_. No significant changes were made aside from platform compatibility, and maps are byte-for-byte identical to retail's. With _MacSoft's_ shutdown in 2011, this version has not been receiving the latest patches. [Nil's fix][nil-fix] enables its continued use with intel GPUs on OSX Mavericks and the post-Gamespy lobby master server.

The Mac edition has a mod called [Halo Mini Demo][halomd], or **HaloMD**, which allows it to be played on modern systems. The plugin [**Halo+**][halo-plus] by Samuco can be used to enhance to experience, and a [netcode translator][halomd-bridge] can be used to connect to Custom Editions servers.

## Demo (PC and Mac)
The free demo versions of Halo 1 on Mac and PC include just the multiplayer map Blood Gulch and the campaign mission _The Silent Cartographer_ (b30). Upon closing the demo, players are presented with the [iconic Sergeant Johnson advertisement][demo-ad] (`demo.bik`).

## Anniversary (Xbox 360, 343 Industries, 2011)
{% figure src="cea.jpg" %}
H1A was released independently on Xbox 360 and under MCC for PC and Xbox One.
{% /figure %}

In 2011, Halo: Combat Evolved Anniversary was released for Xbox 360. Often called **CEA** or **H1A**. It was developed by [343 Industries][343i] and [Saber Interactive][saber] as a remaster of the original Halo: Combat Evolved, and is derived from the Gearbox PC port.

This edition introduced the ability to switch between classic and remastered/anniversary visuals and sounds with the press of a button, using the secondary _Saber3D_ engine and assets alongside Halo's classic [renderer](~).

## MCC (PC and Xbox One, 343 Industries, 2014-2021)
CEA was ported to PC and Xbox One too as a part of _Halo: The Master Chief collection_ (MCC), again maintained by 343i and Saber. MCC uses [Unreal Engine][unreal] as a menu and input layer over the respective engines of each included Halo game.

Custom maps can be created for MCC PC using its official [mod tools](~h1-ek). [Invader](~) also supports building H1A maps from tags. Mods for the Saber3D content are unsupported. Users must turn EAC off to play custom maps in multiplayer.

This branch of the H1 engine is certainly the "most advanced" and definitive. It contains hundreds of bug fixes, extends limits, cleans up deprecated tag fields and script functions, incorporates code from Custom Edition and later Halo games, and adds new modding capabilities (even some from [OpenSauce](~)).

With the introduction of the Saber3d engine also came new file formats:

* The **ipak** holds all the texture information for the game. This includes classic textures as well. (Although classic textures are included in the ipak, MCC now loads them from the bitmaps.map)
* The **imeta** holds entries for the ipak. This links textures in the ipak to the level.
* The **fmeta** is designed to link dependent files together.
* The **s3dpak** is an archive file holding the files needed for the Saber engine.
  * The **template** files inside the s3dpak contain anniversary model data.

There are some differences between the PC/MCC and Xbox 360 versions; most of the assets have been rearranged to optimize things for their respective platforms.

* Xbox uses a different compression algorithm. The chunking is still done the same; however, it does not utilize zlib.
* Xbox does not utilize ipak/imeta/fmeta. Instead the primary filetype is the s3dpak.

[gearbox]: https://en.wikipedia.org/wiki/Gearbox_Software
[bungie]: https://en.wikipedia.org/wiki/Bungie
[microsoft]: https://en.wikipedia.org/wiki/Xbox_Game_Studios
[xemu]: https://github.com/mborgerson/xemu/wiki
[pc-beta-1]: https://www.youtube.com/watch?v=fvXuoceVhpg
[pc-beta-2]: https://www.youtube.com/watch?v=qAK-rIR_st8
[pc-beta-3]: https://archive.org/details/halopcmarketingbeta
[h15]: https://www.youtube.com/watch?v=_a0R8SOIjWQ
[h15-maps-ce]: https://opencarnage.net/index.php?/topic/7455-halo-15-maps-converted-to-ce/
[h1final]: http://halo1final.com
[demo-ad]: https://www.youtube.com/watch?v=N11I-YtyLf8
[nil-fix]: https://halo-fixes.forumotion.com/t9-mac-patch-for-the-new-lobby
[halomd]: https://www.halomd.net/
[halo-plus]: https://opencarnage.net/index.php?/topic/5174-halomd-halo/
[halomd-bridge]: https://opencarnage.net/index.php?/topic/7082-misc-ce-development/&page=18#comment-83828
[saber]: https://en.wikipedia.org/wiki/Saber_Interactive
[343i]: https://en.wikipedia.org/wiki/343_Industries
[unreal]: https://en.wikipedia.org/wiki/Unreal_Engine
