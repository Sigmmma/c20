---
title: invader-build
about: 'tool:invader-build'
---
**invader-build** is a [command-line](~) tool included in the [Invader](~) project. It builds [maps from tags](~map#building-maps-from-tags) similar to the Tool [build-cache-file verb](~h1a-tool#build-cache-file). Supported engines are H1X (and demo), H1PC (and demo), H1CE, and H1A.

Invader-build is stricter than Tool about tag validity and offers clearer warning and error messages. When compiling stock [scenarios](~scenario) (any of the stock maps), it will automatically forge checksums, use the stock tag index, and apply certain tag patches to ensure maps can be used in multiplayer compatibly.

# Usage
As an example, to compile Prisoner for custom edition:

```cmd
invader-build -g custom "levels\test\prisoner\prisoner"
```

See [official documentation][docs] for more usage instructions. The tool has many options to customize; run with the `-h` flag to learn more. In the past this tool supported creating [compressed maps](~map#compressed-maps) for H1CE that required [Chimera](~) to play them, as the base game does not support this.

## Hardcoded tag patches
Like [Tool](~h1a-tool#hardcoded-tag-patches), invader-build applies some hard-coded tag patches. The patches vary by target engine and scenario, but are designed to help users avoid incorrect tag values due to the differences in extracted stock tags across game editions and map types.

{% table %}
* Tag type
* Tag path(s)
* Changes
---
* [weapon](~)
* `weapons\pistol\pistol`
* For any SP scenario, min error to `0.2` degrees, error angle range `0.2` to `0.4` for first trigger
---
* [damage_effect](~)
* `weapons\pistol\bullet`
* For any SP scenario, elite energy shield damage modifier to `0.8`
---
* [weapon](~)
* `weapons\plasma rifle\plasma rifle`
* For any SP scenario, error angle range `0.25` to `2.5` for first trigger
---
* [damage_effect](~)
*
  * `vehicles\ghost\ghost bolt`
  * `vehicles\banshee\banshee bolt`
*
  For stock MP scenarios:
  * Stun: `0.0` if Custom Edition, else `1.0`
  * Maximum stun: `0.0` if Custom Edition, else `1.0`
  * Stun time: `0.0` if Custom Edition, else `0.15`
---
* [weapon](~)
* `vehicles\rwarthog\rwarthog_gun`
*
  For stock MP scenarios:
  * Autoaim angle: `6.0°` if Custom Edition, else `1.0°`
  * Deviation angle: `12.0°` if Custom Edition, else `1.0°`
{% /table %}

Invader also modifies the "ting" sound effect for multiplayer to have a gain of 1.0 if Custom Edition and 0.2 if not. This is so the sound is not too loud or too quiet when played on their respective versions.

Note that the changes done in common with [Tool](~h1a-tool#hardcoded-tag-patches) are _reversed_ when extracting tags using [invader-extract](~).


[docs]: https://github.com/SnowyMouse/invader#invader-build
