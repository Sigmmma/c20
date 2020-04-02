---
title: "Halo: Combat Evolved"
img: box-art.jpg
imgCaption: "Halo's box art"
---

Halo: Combat Evolved, also known as **Halo 1** (hereafter called Halo 1), is the first installment of the Halo game series. It was created by [Bungie][bungie] and initially released on the original Xbox in 2001 by publisher/owner [Microsoft][]. In 2003, the game was released for Windows PC and Mac via different studios.

Halo 1 uses Bungie's proprietary [Blam!][blam] engine, which also formed the basis of later games in the series.

# Editions and versions

## Xbox
Sometimes called **h1x** or **OG Xbox**, this is the classic first release of Halo 1 for the original Xbox. It supports LAN multiplayer and spawned a competitive community which is still active. While original Xbox consoles are hard to come by, [emulation][xemu] is an emerging alternative.

Low resolution aside, the Xbox edition offers a superior graphical experience compared to its ported cousins. Though it is a more involved process, custom maps created with the [HEK][] can be ported back to Xbox.

There exist two modded Xbox editions:

* **Halo 1.5**, which adds [new competitive maps][h15]. [Custom edition ports][h15-maps-ce] of these maps are also available
* [**Halo 1 Final**][h1final] (and its **Neutral Host Edition**) is a newer competitive mod with modified sounds, time callouts, and a selection of stock and custom 2v2-oriented maps

## Halo: Combat Evolved for PC
Often called just **Halo PC**, or sometimes **retail**, this edition is the classic port of Halo 1 to Windows PC by developer [Gearbox Software][gearbox] and publisher [Microsoft Game Studios][microsoft]. Compared to the Xbox version, the PC port included a number of changes (for better and worse):

* Modification of some multiplayer maps' level geometry
* Addition of server browser and online play
* Addition of Banshees to multiplayer
* Addition of the flame thrower, fuel rod gun, and rocket warthog
* Addition of the multiplayer maps Death Island, Ice Fields, Gephyrophobia, Infinity, Timberland, and Danger Canyon
* A new "jet" particle creation physics type was added to the [particle_system][] tag
* Swapping of the [model][] tag for [gbxmodel][]
* Regressions in visuals and assets due to platform differences and the port being based on a pre-release version of Xbox Halo 1

The game received several patches since its release to address remote exploits, remove the CD requirement, replace the GameSpy Arcade lobby, and other minor improvements. Its current version is `1.0.10` ([2014][patch]).

This edition also comes with a dedicated server, `haloceded.exe`.

A **beta version** of Halo PC can also be found online. It has [unfinished versions of PC-exclusive content][pc-beta-2] and [weapon tuning][pc-beta-1] similar to pre-release Xbox versions.

## Halo: Custom Edition
Custom edition, often called **Halo CE** or **CE** is a standalone version of Halo PC which supports custom maps created by the [HEK][], also released in 2003. Like Halo PC it features a server browser and its own `haloceded.exe` dedicated server, but lacks the campaign. [Maps][map] are incompatible between the editions.

Compared to PC, CE has a few other differences:

* Regression in rendering of certain objects through fog
* Addition of the the gamemode info menu (F2)
* Addition of the teammate names toggle (F3)

Custom Edition has become the de facto standard PC title due to its support of custom maps, actively maintained client and server mods, and [campaign ports][refined].

## Mac
The Gearbox PC port (retail) was itself ported to Mac by _Westlake Interactive_ and published by _MacSoft_. No significant changes were made aside from platform compatibility, and maps are byte-for-byte identical to retail's.

## Demo (PC and Mac)
The free demo versions of Halo 1 on Mac and PC include just the multiplayer map Blood Gulch and the campaign mission _The Silent Cartographer_ (b30). Upon closing the demo, players are presented with the [iconic Sergeant Johnson advertisement][demo-ad] (`demo.bik`).

## Anniversary Edition & MCC (PC and Xbox 360+)
...

[gearbox]: https://en.wikipedia.org/wiki/Gearbox_Software
[bungie]: https://en.wikipedia.org/wiki/Bungie
[microsoft]: https://en.wikipedia.org/wiki/Xbox_Game_Studios
[patch]: https://www.bungie.net/en/Forums/Post/64943622
[xemu]: https://github.com/mborgerson/xemu/wiki
[pc-beta-1]: https://www.youtube.com/watch?v=fvXuoceVhpg
[pc-beta-2]: https://www.youtube.com/watch?v=qAK-rIR_st8
[h15]: https://www.youtube.com/watch?v=_a0R8SOIjWQ
[h15-maps-ce]: https://opencarnage.net/index.php?/topic/7455-halo-15-maps-converted-to-ce/
[h1final]: http://halo1final.com
[refined]: https://www.reddit.com/r/HaloCERefined/
[demo-ad]: https://www.youtube.com/watch?v=N11I-YtyLf8
