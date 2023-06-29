---
title: Halo 3 Dynamic Cubemaps Guide
keywords:
  - cubemaps
  - halo 3 cubemaps
  - dynamic cubemaps
  - cubemap
  - reflections
thanks:
  Kashiiera: Writing this guide
redirects:
  - /h3/cubemaps
---

# Introduction

Halo 3 introduced a **Dynamic Cubemap** system in conjunction with **Dynamic Environment Mapping** which allows you to place down points in a level where cubemaps should be generated, this allows any objects, and map geometry their shaders to display reflections based on where those cubemap points were placed.

For objects, the cubemap changes depending on which point you're closest to.
For Level geometry, the cubemap that gets used is determined by which cubemap point is inside of the current cluster.

{% alert %}
For shaders to display dynamic cubemaps, you must set the ***environment_mapping*** option at the top of the shader tag to ***dynamic***. Otherwise it'll display the default cubemap
{% /alert %}

![](A.png "A Covenant environment with cubemaps disabled, no reflections.")
![](B.png "A Covenant environment with cubemaps enabled, now showing reflections.")

# Setup

## Placing Cubemap Points
Cubemap point placement is done through Sapien, to place down points you will need to navigate to Scenario > Structure Data and click on the Cubemaps folder in the **Hierarchy View** window, once inside you should now be able to right click inside of the Game Window and place down Cubemap points which will then appear in the Hiearchy View.
![](C.png "A cubemap point which has been placed down")

### Cubemap Resolution
By default any placed Cubemap points will be 16x16 in resolution, but you can change that by clicking the Cubemap point in either the **Hierarchy View** window or the **Game window** and changing the `cubemap resolution` option in the **Properties palette** window.
![](D.png "")

{% alert %}
Higher Resolutions will result in clearer, more visible reflections but will negatively impact the size of the cubemaps bitmap tag and in turn, the compiled cache file.
{% /alert %}

## Generatng Cubemaps
We can now move on to generating the cubemaps, to do this it's recommended you use **Tag Test** (halo3_tag_test.exe) to generate the cubemaps.

If you're generating cubemaps for a Multiplayer level, use the following console commands in order:
```
game_multiplayer slayer
game_start path\to\scenario\scenario (Replace the path to your actual .scenario tag WITHOUT the extension)
```
If you're generating cubemaps for a Campaign level, you will just need to run the `game_start` command using the same format as above.

When you're loaded in the level, open the console and run the following commands:
```
set terminal_render false
set console_status_string_render false
set events_debug_spam_render false
error_geometry_hide_all
```

This will ensure that no debug text is visible on screen as those will be visible during cubemap generation which we do not want. Finally, open the console once more and run the `cubemap_dynamic_generate` command and wait for it to finish.

## Importing Cubemaps
### Making the .bitmap tag
We can now import our cubemaps into a .bitmap tag, to do so open a command prompt window in your **H3EK install folder** and run the `cubemaps` command with the first arguement pointing to your scenario tag **(without the .scenario extension)** and the second arguements pointing to the cubemaps folder in the root of your H3EK folder like so:
```
tool cubemaps "path\to\scenario\scenario" "(H3EK Folder)\cubemaps"
```

![](E.png "")

### Referencing the Cubemaps bitmap
After all of that, we can finally reference our cubemaps bitmap to our level. To do so open **Guerilla** and open your level's **scenario tag** and look for the **Structure BSPs** block.
![](F.png "")

Click on the **...** button next to `cubemap bitmap group reference` and navigate to the folder where your scenario is stored, the `cubemaps` command we ran earlier should have generated a bitmap tag that starts with your scenario's name, the BSP the cubemaps were taken in which ends with `_cubemaps`. 

Since my scenario is named `test` and my bsp named `030_030`, my bitmap tag `test_030_030_cubemaps`

![](G.png "")

If you have multiple BSPs setup in your scenario, make sure to assign the correct cubemaps bitmap to each one.

# End Result

After you've completed all steps, you should now have a level setup with dynamic cubemaps!

![](H.png "Masterchief inside of a Covenant environment without dynamic cubemaps setup")
![](J.png "Masterchief inside of a Covenant environment with dynamic cubemaps setup")