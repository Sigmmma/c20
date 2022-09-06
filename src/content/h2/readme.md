<figure>
  <a href="h2cover.jpg">
    <img src="h2cover.jpg" alt="""/>
  </a>
  <figcaption>
    <p>Halo 2's box art</p>
  </figcaption>
</figure>

**Halo 2** is the second installment of the Halo game series and sequel to [Halo 1][h1]. It was created by [Bungie][bungie] and initially released on the original Xbox in 2004 by publisher/owner [Microsoft][]. In 2007, the game was released for Windows PC and Mac via different studios.

Halo 2 uses Bungie's proprietary [Blam!][engine] engine, which also formed the basis of later games in the series.

# Xbox (Bungie, 2004)
Sometimes called **h2x**, this is the classic first release of Halo 2 for the original Xbox. Multiplayer had support for LAN multiplayer along with online play through Xbox Live.

# Halo 2 Vista (Hired Gun, 2007)
This edition is the classic port of Halo 2 to Windows PC by developer [Hired Gun][hired-gun] and publisher [Microsoft Game Studios][microsoft]. While there still are some port discrepancies when compared to the original source, it is no where near as bad as the Halo 1 PC port. Official servers for the game went down in July 2015. Any users looking to play Halo 2 Vista online will require community solutions.

The game received a total of three patches for the base game, the dedicated server binary, and the editing kit. The latest version is `1.00.00.11122`

## Modding
There are several tools and mods for the base game or external programs that users can grab to enhance their experience. Examples include:

* [Halo 2 Vista Editing Kit][h2v-ek] - The official editing suite released for Halo 2 Vista. Largely worked on by [Pi Studios][pi-studios]. This editing kit only officially supports creating a few tag types.
* [Assembly][assembly] - A cache editing tool for various titles in the Halo series. Users can use this tool to make permanent edits to cache files and poke changes in real time. While not traditional workflow for map creation, it is a powerful tool that can be used to create interesting experiences.
* [Halo Asset Blender Development Toolset][halo-asset-blender-development-toolset] - A collection of tools for Blender that can be used to export the intermediate files used by the Halo 2 Editing Kit.
* [Project Cartographer][cartographer] - A popular mod for the Halo 2 Vista title which restores online play and adds additional features.

Like Halo 1, Halo 2's [tags][] play a large role in modding.

# MCC (PC and Xbox One, 343 Industries, 2014-2021)
Halo: The Master Chief collection (MCC) is actively maintained by [343 Industries][343i] for both PC and Xbox One. It brings the Halo series under a single [Game as a Service][gaas], including unified matchmaking and progression experiences. The PC port uses [Unreal Engine][unreal] as a menu and input layer over the respective engines of each included Halo game.

In 2014, Halo 2 Anniversary was released for Xbox One as part of the Halo: The Master Chief Collection. Often called **H2A** by the community. It was developed by [343 Industries][343i] and [Saber Interactive][saber] as a remaster of the original Halo 2, and is derived from the Halo 2 Vista port. This edition contains the secondary _Saber3D_ engine for its remastered graphics mode.

## Modding
There are several tools and mods for the base game or external programs that users can grab to enhance their experience. Examples include:

* [Halo 2 Editing Kit][h2-ek] - The official editing suite released for Halo 2 Anniversary/MCC.
* [Assembly][assembly] - A cache editing tool for various titles in the Halo series. Users can use this tool to make permanent edits to cache files and poke changes in real time. While not traditional workflow for map creation, it is a powerful tool that can be used to create interesting experiences.
* [Halo Asset Blender Development Toolset][halo-asset-blender-development-toolset] - A collection of tools for Blender that can be used to export the intermediate files used by the Halo 2 Editing Kit.

Like Halo 1, Halo 2's [tags][] play a large role in modding.

## Hardcoded tag patches
There are a number of gameplay-balancing tag patches made at runtime for [multiplayer scenarios][scenario]. These patches only happen if the game executable uses cache files to load assets. Programs like [Sapien][H2-Sapien] and [Standalone][h2-standalone-build] will not display any of the mentioned changes.

| Tag type          | Tag path                                                                                       | Changes
| ----------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------
| [weapon][]        | `objects\weapons\rifle\battle_rifle\battle_rifle.weapon`                                       | Error angles min and max are set to `0.1` and `0.1`.
| [damage_effect][] | `objects\weapons\damage_effects\slice_melee.damage_effect`                                     | Damage lower bound is set to `90`.<br />Damage upper bound min and max are set to `120` and `120`.
| [damage_effect][] | `objects\weapons\damage_effects\smash_melee.damage_effect`                                     | Damage lower bound is set to `55`.<br />Damage upper bound min and max are set to `90` and `90`.
| [damage_effect][] | `objects\weapons\damage_effects\strike_melee.damage_effect`                                    | Damage lower bound is set to `55`.<br />Damage upper bound min and max are set to `75` and `75`.
| [damage_effect][] | `objects\weapons\grenade\frag_grenade\damage_effects\frag_grenade_explosion.damage_effect`     | Radius min and max are set to `0.5` and `1.75`.<br />Damage lower bound is set to `50`.<br />Damage upper bound min and max are set to `160` and `160`.<br />Rider direct damage scale is set to `1.5`.<br />Rider maximum transfer damage s is set to `0.75`.<br />Rider minimum transfer damage s is set to `0.75`.
| [projectile][]    | `objects\weapons\grenade\frag_grenade\frag_grenade.projectile`                                 | Arming time is set to `1.3`.
| [damage_effect][] | `objects\weapons\grenade\plasma_grenade\damage_effects\plasma_grenade_explosion.damage_effect` | Radius min and max are set to `0.5` and `1.75`.<br />Damage lower bound is set to `50`.<br />Damage upper bound min and max are set to `200` and `200`.<br />Rider direct damage scale is set to `1.5`.<br />Rider maximum transfer damage s is set to `0.75`.<br />Rider minimum transfer damage s is set to `0.75`.
| [projectile][]    | `objects\weapons\grenade\plasma_grenade\plasma_grenade.projectile`                             | Arming time is set to `1.3`.<br />Timer min and max are set to `0.9` and `0.9`.
| [damage_effect][] | `objects\weapons\pistol\magnum\damage_effects\magnum_bullet.damage_effect`                     | Damage lower bound is set to `5.5`.<br />Damage upper bound min and max are set to `5.5` and `5.5`.
| [weapon][]        | `objects\weapons\rifle\plasma_rifle\plasma_rifle.weapon`                                       | Dual wield damage scale is set to `0.7`.
| [damage_effect][] | `objects\weapons\rifle\smg\damage_effects\smg_bullet.damage_effect`                            | Damage upper bound min and max are set to `4.625` and `4.625`.
| [damage_effect][] | `objects\weapons\support_low\brute_shot\damage_effects\shot_grenade_explosion.damage_effect`   | Damage lower bound is set to `30.5`.<br />Damage upper bound min and max are set to `60` and `60`.
| [vehicle][]       | `objects\vehicles\h_turret_ap\h_turret_ap.vehicle`                                             | Bounding radius is set to `0.5`.

[bungie]: https://en.wikipedia.org/wiki/Bungie
[microsoft]: https://en.wikipedia.org/wiki/Xbox_Game_Studios
[hired-gun]: https://en.wikipedia.org/wiki/Xbox_Game_Studios
[pi-studios]: https://en.wikipedia.org/wiki/Pi_Studios
[saber]: https://en.wikipedia.org/wiki/Saber_Interactive
[343i]: https://en.wikipedia.org/wiki/343_Industries
[gaas]: https://en.wikipedia.org/wiki/Games_as_a_service
[unreal]: https://en.wikipedia.org/wiki/Unreal_Engine
[cartographer]: https://www.cartographer.online/
