---
title: Imposter Generation
keywords:
    - Reach
    - imposter
    - generation
    - regeneration
    - instanced
    - geometry
    - instanced_imposter
    - imposters
thanks:
  Connor Dawn:
    Writing this page
  Kornman00:
    Providing information on how to generate imposters
  Pyrosocial:
    Providing extensive help and testing of this process
redirects:
  - /hr/imposter-generation
---


# File List
| File Link                                                                                                         | Description
|------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------
[End Result](https://drive.google.com/file/d/1b2upKsiYUlI3Nji-8L2UteFU3ipU1YY7/view?usp=sharing)                    | An [instance_imposter_definition][] tag that will  match the final product of this tutorial for you to compare.
[Tutorial Tags](https://drive.google.com/file/d/1tFy3f72YZ59VaFrWn8CqkEg8aRiAEJAg/view?usp=sharing)                 | Tutorial folders that contain the tags we will be using in this guide. Make sure to have them extracted to your "levels" folder.


## Introduction

Hey y'all, and welcome to the Halo Reach Instance Imposter generation guide. 
Instance Imposters are essentially low-level detail (LOD) models of instanced geometry objects. These Instance Imposters are usually generated when importing a map into the game for the first time, but if thingschange such as the skybox, lighting, or any other map changes you may want to Regenerate them. 

This tutorial will provide a copy of a nighttime Forge World with regular Forge World Instance Imposters and show you how to regenerate them to match the new lighting of the map.

{% alert type="danger" %}
Before we begin, if this isn't your first time following this tutorial then please make sure there is no "imposter_cache" folder in the root of your HREK folder. If there is then please delete it as this will cause issues. If there isn't just go about your business you handsome devil.

{% /alert %}

# Loading the Map

So, the first step of this tutorial will be to load up the nighttime Forge World in standalone. Once you've booted standalone hit the {% key "`" /%} key on your keyboard, and type the following:

```console
; load tags\levels\mods\twilight_world\twilight_world.scenario:
game_start levels\mods\twilight_world\twilight_world
```

Once you have loaded into the map, you will see this:
![](imposter1.jpg "Pretty suspicious lookin' if you ask me...")

See those brown, low-quality rocks that stick out like a sore thumb? That's our instance imposters. Normally you wouldn't notice them this close, but tag-test has a low render distance (which is very helpful in this case) we're gonna be making those brown, low-quality rocks into pale blue low-quality rocks that blend in like a medically sound thumb.

# Running The Imposter Snapshot Command

Once you've completed the step above, open the console again by pressing the {% key "`" /%} key, and enter:

```console
; Run structure instance snapshot command:
structure_instance_snapshot <bsp_index>
```
and make sure to replace <bsp_index> with 0. This field will let you dictate what bsp index you wanna generate instance imposters for. In this case we want 0 which is all of Forge World.
As soon as you press enter your screen is gonna go black and you'll see a fancy little image disco on the top left of your screen

![](imposter_generation.mp4 "This makes my eyes hurt nearly as much as my soul.")

This is the game taking a snapshot of every instanced imposter on the map at it's highest quality at several different angles so it can later convert it into a low quality mesh. It also takes into account the maps current lighting as well (you'll notice the rocks are pale blue now) this can however take some time, usually around 40 minutes or so (depending on your PC) so go make a sandwich or do whatever it is you do when you're waiting on imposters being snapshotted.

{% alert type="danger" %}
If standalone stalls/freezes up, don't panic. This is normal. Once done, the game will resume as normal.

{% /alert %}

# Processing The Imposters

Once your standalone has thawn out, you can go ahead and close it. Now navigate to your HREK folder, and notice how there's a new folder called `imposter_cache`

![](imposter3.jpg "I am trying so hard to hold back certain jokes for legal reasons.")

Now we want to process our imposter snapshots. To do this, open `cmd` in your HREK folder. Once done, enter the following:

```console
tool process-imposters .\
```
This command will locate the `imposter_cache` folder in the root of your HREK, and begin to process the files within. You'll see something resembling this in your `cmd` prompt:

![](imposter4.jpg "Imposter generation go brrrrrrrrrrrrrrrrr")

Again, this can take some time depending on your hardware, but once done you'll see this:

![](imposter5.jpg "Imposter generation go brrrrrrrrrrrrrrrrr")

Now inside your `imposter_cache` folder you'll see new files with the extention ".imposter_metadata"


# Building a New [instance_imposter_definition] tag

With all of the previous steps above completed, all that's left to do now is to run the command
```console
tool build-instance-imposter .\
```
from `cmd` in your HREK folder. Once done, you will see something like this:

![](imposter6.jpg "Upon this cmd, I build my imposters")

This command is essentially taking all of those files that you've generated and replace (or generate) a new [instance_imposter_definition] tag in the folder of the map you originally snapshotted them from.
Once done, you'll notice that the already existing [instance_imposter_definition] tag will now be timestamped to when you finished running this process.

# Admire Your New Imposters

Et Voila! You now have regenerated/new instanced imposters. They should now be a pale blue colour to match the rest of the map.

![](imposter7.jpg "Beautiful, ain't it? Someone should take a picture.")

Keep in mind that this can be done for ANY map that you change the skybox/lighting of. So go crazy with it!

Also remember to delete your `imposter_cache` folder after each regeneration to avoid any future file conflicts or bugs.

Happy Impostering!