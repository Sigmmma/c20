---
title: Bluestreak
about: 'tool:Bluestreak'
img: biped.jpg
caption: A biped model imported with rigging data intact
info: |
  * Release date: 2006
  * [Project homepage](http://ghost.halomaps.org/bluestreak/)
  * [Recommended JMS exporter](JMS_Exporter_v1-0-4.ms)
keywords:
  - max
thanks:
  Siliconmaster: Documenting the script's history of versions and spinoffs
  Conscars: Comparing some additional versions for functional differences
  Spiral: Providing variants to compare
  gbMichelle: Providing variants to compare
---
**Project Bluestreak** is a suite of import and export scripts for [3ds Max](~3dsmax) v5+ and [Gmax](~) v1.2. It consists of:

* **GBXModel Importer** for bringing rigged models into Max.
* **JMS (Model) Exporter**, for exporting level and object JMS files.
* **Animation Importer**, which can also export animations.

Bluestreak supports more capabilities than both [Chimp](~) and [Blitzkrieg](~) and still works with modern versions of 3ds Max since it is MaxScript-based.

{% alert %}
While [Blender](~) has become the de-facto standard 3D tool for Halo, those who prefer Max can also use H1A Tool's [FBX to JMS/JMA pipeline](~h1-tool#fbx-to-jms) as a modern officially-supported alternative to using Bluestreak. You may need Bluestreak to work with Max scenes from the HEK era, which predate the FBX pipeline.

**If you plan on using the Bluestreak JMS exporter, [download the recommended v1-0-4](JMS_Exporter_v1-0-4.ms).**
{% /alert %}

# Usage
From Max's menu, use _MAXScript > Run Script_ to select a [downloaded .ms file](http://ghost.halomaps.org/bluestreak/). Further usage instructions can be found embedded as comments within the MaxScript files themselves.

# JMS exporter history
Bluestreak was widely used in Custom Edition modding, and modders created many unofficial variants of it after the original's release in 2006. These spinoffs added capabilities like multiple [region](~gbxmodel#regions) support and fixed bugs.

However, as there was no centralized effort to maintain Bluestreak, later variants are sometimes divergent or even regressive in terms of features. Here are the known unique variants of the exporter:

{% table %}
* Version/variant
* Date
* Created/modified by
* Description
---
* JMS_Exporter_v1-0-0
* 2006
* TheGhost
* First public release.
---
* JMS_Exporter_v1-0-1
* 2006
* TheGhost
* Fixed a section of code that was incompatible with gmax, causing export errors for rigged models. Available for download [here](http://ghost.halomaps.org/bluestreak/jms/).
---
* JMS_Exporter_v1-0-2
* 2008
* CtrlAltDestroy
* Spinoff of v1-0-1. Supports regions and sets marker radius to 2.0. Source thread [here](http://www.modacity.net/forums/archive/index.php/t-10588.html).
---
* JMS_Exporter_v1-0-3
* 2008
* ChokingVictim
* Spinoff of v1-0-2. Supports regions and sets marker radius from Max file. Source thread [here](http://www.modacity.net/forums/archive/index.php/t-10588.html).
---
* JMS_Exporter_v1-0-3b
* 2009
* bobbysoon
* Spinoff of v1-0-3. Replaced new-line characters with tabs to considerably speed up exporting. Also adds a configurable checksum export option (not fully functional). Source thread [here](http://www.modacity.net/forums/archive/index.php/t-10588.html).
---
* JMS_Exporter_v1-0-4 DeadHamster
* ?
* DeadHamster
* This version can be identified by a `<3 DeadHamster` comment in the header. It is based on v1-0-3, so lacks the configurable checksums and tab character optimization of v1-0-3b. The only difference is that it doubles the radius of all markers exported (it is not clear why).
---
* JMS_Exporter_v1-0-4
* ?
* ?
*
  This version includes the tab character speed increase of v1-0-3b, but lacks its configurable checksums (likely because it didn't work). Unlike the DeadHamster variant this "1-0-4" does not double the marker radius. It includes some attempts to make the code more readable and can be identified by an `aboutString` near the start of the script. The author is unknown, but it has been hosted in [Kornman's archive][korn104] since 2017.
  
  **This script is our recommendation**.
---
* H1_Jms_Exporter_1.0.4.e
* Sometime before 2014
* ?
* This was used to build [TSC:E][tsce] originally. While it contains the speed upgrades that bobbysoon introduced, **do not use this script**. Since then has been confirmed to skip "benign" BSP errors (this is very bad) that led to at least one TSC:E BSP having unfixable portal errors. General_101 also confirmed that this script writes some values that tool defaults to 0 as "undefined".
---
* JMS_Exporter_1-0-2-r
* 2017
* rododo93
* Spinoff of v1-0-2. Sets marker radius from Max file. This is functionally the same as v1-0-3, but sets checksum to `3251` rather than `0`. It does not include bobbysoon's tab character speedup. Originally released [here](https://opencarnage.net/index.php?/topic/6823-updated-jms-exporter/).

{% /table %}

[korn104]: https://github.com/HaloMods/HaloContentToolScripts/blob/master/Halo1/JMS_Exporter_v1-0-4.ms
[tsce]: https://tsce.info/index.html