---
title: Blendkrieg
about: 'tool:Blendkrieg'
info: !<tag:yaml.org,2002:js/undefined> ''
---
**Blendkrieg** is an add-on for importing [JMS](~), [model](~), and [gbxmodel](~) into [Blender](~).

{% alert type="danger" %}
Blendkrieg is an incomplete project and should not be expected to produce export-ready models or correctly import all gbxmodel data. If you are experiencing issues setting it up or with imported models you can instead try:

* Ripping JMS from maps using [Reclaimer](~), then importing the JMS using [Halo Asset Blender Development Toolset](~halo-asset-blender-development-toolset).
* Using [Mozzarilla](~) to convert a gbxmodel tag to JMS, then importing with the above toolset.
{% /alert %}

# Installaton
1. Visit the project's [GitHub repo](https://github.com/Sigmmma/Blendkrieg/tree/anim-bones) and download the code from the **anim-bones** branch.
2. Extract the downloaded zip into Blender's addons directory.
3. Open a [command prompt](~command-line) in the Blendkrieg add-on folder and run `python -m pip install -r dependencies.txt --target="./lib" --no-deps`. This will install the needed Python dependencies for the add-on to work.
4. Open Blender, and go to _Preferences > Add-ons_.
5. Find _Import-Export: Blendkrieg_ in the list (search for it) and check the box to enable it.
6. A _Krieg_ menu item should appear in Blender.

# Usage
From the _Krieg_ menu import a [JMS](~), [gbxmodel](~), or [model](~) tag. If importing a model or gbxmodel tag you should use the _3ds Max_ scale option to ensure the model isn't too small.
