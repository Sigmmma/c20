---
title: Bluestreak
about: 'tool:Bluestreak'
img: biped.jpg
caption: A biped model imported with rigging data intact
info: |
  * Release date: 2006
  * [Project homepage](http://ghost.halomaps.org/bluestreak/)
keywords:
  - max
---
**Project Bluestreak** is a suite of import and export scripts for [3ds Max](~3dsmax) v5+ and [Gmax](~) v1.2. It consists of:

* **GBXModel Importer** for bringing rigged models into Max.
* **JMS (Model) Exporter**, for exporting level and object JMS files.
* **Animation Importer**, which can also export animations.

Bluestreak supports more capabilities than both [Chimp](~) and [Blitzkrieg](~) and still works with modern versions of 3ds Max since it is MaxScript-based. However, it does not support exporting region models with multiple [regions](~gbxmodel#regions).

{% alert %}
Users working with the H1A-EK can also take advantage of the [FBX to JMS and JMA](~fbx) pipeline in [Tool](~h1a-tool#creating-a-jms-file-from-an-fbx-file) by exporting their scene to FBX, as an officially-supported alternative to using Bluestreak scripts.
{% /alert %}

# Usage
From Max's menu, use _MAXScript > Run Script_ to select a [downloaded .ms file](http://ghost.halomaps.org/bluestreak/).

Further usage instructions can be found embedded as comments within the MaxScript files themselves.
