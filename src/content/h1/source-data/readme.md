---
title: Source data
about: 'resource:Source data files'
keywords:
  - uncompiled
  - data
  - sources
  - raw
  - assets
  - textures
  - export
---
**Source data files** are the files found in your editing kit's `data` folder. These are the assets which have not yet been converted into [tag](~tags) format by [Tool](~) (or [Sapien](~) in the case of scripts).

# Types of data
Halo 1 makes use of the following source data formats:

* [.JMS](~jms) models which are imported as [gbxmodel](~), [scenario_structure_bsp](~) and others.
* [.WRL](~wrl) files which contain _error geometry_ when the above fails. Note that the location and name of the generated WRL file depends on the Tool verb being used and the version of Tool (HEK vs H1A-EK). See the [Tool](~h1a-tool) page.
* [.JMA, .JMM, etc](~animation-data) files which are imported as [model_animations](~).
* [.tif](https://en.wikipedia.org/wiki/TIFF) textures which are imported as [bitmap](~).
* [.hsc](~scripting) scenario scripts, most commonly used to orchestrate singleplayer levels (e.g. AI encounters, cutscenes).
* [.txt](~strings-txt) files imported as [unicode_string_list](~).
* [.hmt](~hmt) files imported as [hud_message_text](~).

Instructions for importing these formats can be found on [Tool's page](~h1a-tool). There are also community-made tools like [Invader](~) and [Mozzarilla](~) which cover some of these operations, and offer a different user experience or features.
