---
title: Invader
toolName: Invader
img: invader-edit-qt.png
imgCaption: Screenshot of invader-edit-qt, a replacement for [Guerilla][]
info: |
  * [Download (Windows)](https://invader.opencarnage.net/builds/nightly/)
  * [Package (Arch Linux)](https://aur.archlinux.org/packages/invader-git/)
  * [Development thread](https://opencarnage.net/index.php?/topic/7489-invader/)
  * [Website](https://invader.opencarnage.net/)
  * [Discord](https://discord.com/invite/RCX3nvw)
stub: true
alerts:
  - md: Familiarity with the [command-line][] is a prerequisite for most of Invader's tools.
keywords:
  - mcc
  - cli
---

Invader is an [open source][invader-repo] modding toolkit for Halo 1, supporting multiple [editions][h1#editions-and-versions] depending on the tool. It aims to replace tools of the [HEK][hek] with an emphasis on tag data correctness and validation. Most of its tools are [command-line][] operated like [Tool][], although _invader-edit-qt_ is a GUI tag editor similar to [Guerilla][].

# invader-extract
This tool extracts [tags][] from [maps][map]. It supports Custom Edition, demo, retail, and also tags from Halo beta build 1749.

# invader-build
This tool compiles [map cache files][map] and is an alternative to [compiling maps with tool][tool#build-cache-file]. In addition to being less buggy than Tool, it offers clearer warning and error messages and is generally more strict about tag correctness. When compiling stock [scenarios][scenario] (any of the stock maps), it will automatically forge checksums, use the stock tag index, and apply certain tag patches to ensure maps can be used in multiplayer compatibly.

As an example, to compile Prisoner for custom edition:

```sh
invader-build -g custom "levels\test\prisoner\prisoner"
```

The tool has many options to customize; run with the `-h` flag to learn more. Note that the `-c` option creates an [invader-compressed map][map#invader-chimera-compressed-maps] that can only be run with [Chimera][] at this time.

## Hardcoded tag patches
Like [Tool][tool#hardcoded-tag-patches], invader-build applies some hard-coded tag patches. The patches vary by target engine and scenario, but are designed to help users avoid incorrect tag values due to the differences in extracted stock tags across game editions and map types.

|Tag type         |Tag path                           |Changes
|-----------------|-----------------------------------|----------------
|[weapon][]       |`weapons\pistol\pistol`            |For any SP scenario, min error to `0.2` degrees, error angle range `0.2` to `0.4` for first trigger
|[damage_effect][]|`weapons\pistol\bullet`            |For any SP scenario, elite energy shield damage modifier to `0.8`
|[weapon][]       |`weapons\plasma rifle\plasma rifle`|For any SP scenario, error angle range `0.25` to `2.5` for first trigger
|[damage_effect][]|`vehicles\ghost\ghost bolt`        |<p>For stock MP scenarios:</p><ul><li>Stun: <code>0.0</code> if Custom Edition, else <code>1.0</code></li><li>Maximum stun: <code>0.0</code> if Custom Edition, else <code>1.0</code></li><li>Stun time: <code>0.0</code> if Custom Edition, else <code>0.15</code></li></ul>
|[damage_effect][]|`vehicles\banshee\banshee bolt`    |As above.
|[weapon][]       |`vehicles\rwarthog\rwarthog_gun`   |<p>For stock MP scenarios:</p><ul><li>Autoaim angle: <code>6.0°</code> if Custom Edition, else <code>1.0°</code></li><li>Deviation angle: <code>12.0°</code> if Custom Edition, else <code>1.0°</code></li></ul>

Invader will also silently modify the ting sound effect for multiplayer to have a gain of 1.0 if Custom Edition and 0.2 if not. This is so the sound is not too loud or too quiet when played on their respective versions.

Note that the changes done in common with [Tool][tool#hardcoded-tag-patches] are _reversed_ when extracting tags using [invader-extract](#invader-extract).

# invader-bitmap
...

# invader-edit-qt
...

[invader-repo]: https://github.com/Kavawuvi/invader
