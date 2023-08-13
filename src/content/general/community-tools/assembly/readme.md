---
title: Assembly
about: 'tool:Assembly'
img: assembly.jpg
caption: A look at the UI on startup
info: |
  * [Github](https://github.com/XboxChaos/Assembly)
  * [Appveyor](https://ci.appveyor.com/project/ThunderWaffle/assembly/build/artifacts)
redirects:
  - /general/tools/assembly
---
**Assembly** is a [map cache](~maps) editing tool that can be used to mod various Halo games from the 360 to MCC. This can be a way to quickly test a feature by modifying game values in real time. A user can also save changes permanently to a cache file without the need to recompile the .map file in the editing kit. Support for certain features depends on the Halo game being modified.

Although directly editing map files can be convenient for testing or simple edits, generally this workflow is discouraged for larger changes and you should compile maps from edited tags if you have the ability.

* During regular map compilation, tags are [processed](~tags#tag-loading) to set additional fields needed by the game at run-time. Directly poking values in map files can miss this step.
* Mod tools and source tags are now available for all MCC titles, meaning it is easier than ever to just rebuild map files.
* It's harder to inject new resources into maps using Assembly than just creating new tags with the mod tools.

{% alert type="danger" %}
Certain maps may need to be decompressed before they can be edited.
Use the decompressor in the tools dropdown if needed.
{% /alert %}
