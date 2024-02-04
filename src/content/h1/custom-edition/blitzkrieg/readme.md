---
title: Blitzkrieg
about: 'tool:Blitzkrieg'
img: blitz.jpg
caption: Blitzkrieg being used to export the Tutorial map.
info: 'Released: 2003'
keywords:
  - max
redirects:
  - /h1/tools/hek/blitzkrieg
---
**Blitzkrieg** is the legacy [3ds Max](~3dsmax) to [JMS](~) and [animation data](~animation-data) exporter plugin which shipped with the original [HEK](~) for H1CE in 2003.

The plugin does not support vertex weights needed for character animations and only works on Max versions 5-8. Many Max users later opted to use the community-made [Bluestreak exporter](~bluestreak) instead which could also be used with the free [Gmax](~) or newer Max versions.

{% alert %}
The [H1A-EK](~) does not include a Blitzkrieg equivalent for modern versions of 3ds Max but rather implemented an [FBX to JMS and JMA](~fbx) process into [Tool](~h1a-tool#creating-a-jms-file-from-an-fbx-file). Max can export scenes to FBX format to take advantage of this.

Given that Blitzkrieg is very old and modern alternatives exist (even using [Blender](~)), you probably _don't_ want to be using it. This page only documents it for posterity.
{% /alert %}

# Installation
To install the Blitzkrieg plugin for 3ds Max do the following:

1. Close Max if it is already running.
2. Copy the file `Blitzkrieg.dle` from the `blitzkrieg\MAX5` directory where the HEK is installed.
3. Place the `Blitzkrieg.dle` file into the Max plugins directory wherever Max is installed, e.g. `C:\3dsmax5\plugins`.
4. Start Max.

If the plug in was successfully installed and loaded then you should be able to go to _File > Export_ and see the following export options under _Save as type_ in the pull down menu (scroll down the list): "Blitzkrieg Animation Exporter" and "Blitzkrieg Model Exporter".
