---
title: Deathstar
about: "tool:Deathstar"
info: |-
  * [Download](https://github.com/Aerocatia/deathstar/releases)
  * [Source code](https://github.com/Aerocatia/deathstar)
---
**Deathstar** is a map deprotector used to defeat [map protection](~map#protected-maps) used in some legacy Custom Edition maps prior to tag extraction.

# Usage
Download the [latest release](https://github.com/Aerocatia/deathstar/releases) ZIP file, e.g. `deathstar_1.0a13.zip`, and unzip it to find `deathstar.exe`. Deathstar is a [command-line](~) program so you need to run it from a command prompt:

```cmd
deathstar --deprotect <map> [maps...] # Deprotect map at path.
deathstar --zteam <map> # Only remove zteam protection.
deathstar --name <map> [maps...] # Rename all tags to generic names.
deathstar --preview <map> # Removes zteam protection without saving map.
```