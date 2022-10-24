---
title: Source data files
about: 'resource:Source data files'
img: src-data.png
caption: 'Scripts, textures, and models are some examples of source data files.'
keywords:
  - uncompiled
  - data
  - sources
  - raw
  - assets
  - textures
  - export
related:
  - /h1/guides/intro-to-h1-modding
---
**Source data files** are the files found in your editing kit's `data` folder. These are the assets which have not yet been converted into [tag](~tags) format by [Tool](~) (or [Sapien](~) in the case of scripts). In most cases, assets within `data` will have a corresponding tag under the same folder layout in `tags`.

# Types of data
In the data folder you will typically find:

* [.JMS](~jms) models which are compiled into [gbxmodel](~), [scenario_structure_bsp](~) and others.
  * [.WRL](~wrl) files which contain _error geometry_ when the above fails.
* [.JMA, .JMM, etc](~animation-data) files which are compiled into [model_animations](~).
* [.tif](https://en.wikipedia.org/wiki/TIFF) textures which are compiled into [bitmap](~) tags.
* [.hsc](~scripting) scenario scripts, most commonly used to orchestrate singleplayer levels (e.g. AI encounters, cutscenes).
* [.txt](~strings-txt) files for compiling into [unicode_string_list](~).
* [.hmt](~hmt) files for compiling into [hud_message_text](~).

# Compiling to tag format
The process of converting these assets into tag format is called _compilation_ or sometimes _importing_. Instructions for the official process can be found on [Tool's page](~h1a-tool). There are also community-made tools which convert assets to tags, like [Invader](~) and [Mozzarilla](~), which can offer a different user experience or advanced features.
