---
title: Scale and unit conversions
redirects:
  - /h1/guides/scale
---
When sizing assets and configuring distances, modders will primarily use two unit types:

* **JMS units** are used when modeling in your [3D software](~art-tools#modeling). They match 1:1 with the default [3ds max](~3dsmax) units or [Blender](~blender) meters (ignore the fact they're labeled meters). Addons for these tools will export vertex coordinates as-is to your [JMS files](~JMS) by default, though the Blender addon has [an option](~halo-asset-blender-development-toolset#scale) to multiply coordinates by a value during export.
* **World units** are the engine's native unit and are equal to 100 JMS units. This is because [Tool](~h1-tool) divides all coordinates by 100 when importing models. World units are what you specify for distances in tag fields like [bounding radius](~/h1/tags/object#tag-field-bounding-radius) and are the coordinates seen when placing objects in [Sapien](~h1-sapien).

The relationship of these units to real-world units is up to debate, but the [original HEK tutorial](https://www.haloce.org/HEK_Tutorial/index.html) states:

> As a reference, the Master Chief is approximately 7 feet tall. This makes the \[3ds max\] unit scale approximately 10 units = 1 foot or about 1 unit = 1.2 inches.

Therefore this is the scale we use for conversions below. As an example, the H1 cyborg biped's [physics pill height](~h1/tags/object/unit/biped#tag-field-standing-collision-height) is `0.7` world units tall when standing. This means you can create a cube `0.7 * 100 = 70` units tall in your 3D software for an idea of how big the player is. The size of common objects like vehicles and characters remains more or less the same between games, but there are differences in player height, jump height, and speed.

# Unit converter
Enter values into the boxes below to see their conversions, or select a preset.

{% unitConverter /%}