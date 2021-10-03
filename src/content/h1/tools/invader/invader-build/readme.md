**invader-build** is a [command-line][] tool included in the [Invader][] project. It builds [map cache files][map] from [tags][] similar to the [Tool build-cache-file verb][h1a-tool#build-cache-file]. Supported engines are H1X (and demo), H1PC (and demo), H1CE, and H1A.

Invader-build is stricter than Tool about tag validity and offers clearer warning and error messages. When compiling stock [scenarios][scenario] (any of the stock maps), it will automatically forge checksums, use the stock tag index, and apply certain tag patches to ensure maps can be used in multiplayer compatibly.

# Usage
As an example, to compile Prisoner for custom edition:

```sh
invader-build -g custom "levels\test\prisoner\prisoner"
```

See [official documentation][docs] for more usage instructions. The tool has many options to customize; run with the `-h` flag to learn more. In the past this tool supported creating [compressed maps][map#compressed-maps] for H1CE that required [Chimera][] to play them, as the base game does not support this.

## Hardcoded tag patches
Like [Tool][h1a-tool#hardcoded-tag-patches], invader-build applies some hard-coded tag patches. The patches vary by target engine and scenario, but are designed to help users avoid incorrect tag values due to the differences in extracted stock tags across game editions and map types.

|Tag type         |Tag path                           |Changes
|-----------------|-----------------------------------|----------------
|[weapon][]       |`weapons\pistol\pistol`            |For any SP scenario, min error to `0.2` degrees, error angle range `0.2` to `0.4` for first trigger
|[damage_effect][]|`weapons\pistol\bullet`            |For any SP scenario, elite energy shield damage modifier to `0.8`
|[weapon][]       |`weapons\plasma rifle\plasma rifle`|For any SP scenario, error angle range `0.25` to `2.5` for first trigger
|[damage_effect][]|`vehicles\ghost\ghost bolt`        |<p>For stock MP scenarios:</p><ul><li>Stun: <code>0.0</code> if Custom Edition, else <code>1.0</code></li><li>Maximum stun: <code>0.0</code> if Custom Edition, else <code>1.0</code></li><li>Stun time: <code>0.0</code> if Custom Edition, else <code>0.15</code></li></ul>
|[damage_effect][]|`vehicles\banshee\banshee bolt`    |As above.
|[weapon][]       |`vehicles\rwarthog\rwarthog_gun`   |<p>For stock MP scenarios:</p><ul><li>Autoaim angle: <code>6.0°</code> if Custom Edition, else <code>1.0°</code></li><li>Deviation angle: <code>12.0°</code> if Custom Edition, else <code>1.0°</code></li></ul>

Invader will also silently modify the ting sound effect for multiplayer to have a gain of 1.0 if Custom Edition and 0.2 if not. This is so the sound is not too loud or too quiet when played on their respective versions.

Note that the changes done in common with [Tool][h1a-tool#hardcoded-tag-patches] are _reversed_ when extracting tags using [invader-extract][].


[docs]: https://github.com/SnowyMouse/invader#invader-build
