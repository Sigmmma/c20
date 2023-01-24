---
title: H3 Object Importing Guide - Physics
keywords:
  - modeling
  - exporter
  - importing
  - physics model
  - physics_model
thanks:
  PepperMan: Writing this guide
---
{% alert %}
This guide assumes you have already [read/completed the previous tutorials](~object-importing).
{% /alert %}

# File List
| File Link                                                                                          | Description
|--------------------------------------------------------------------------------------------------- | -----------------------------------
|[End Result](https://drive.google.com/file/d/1mteG515evA6pH74s-XFSnwx96Xe6MsOY/view?usp=sharing)    | The end product of this tutorial for you to examine and compare.

# Introduction
In this section, we will cover how to create a basic physics model for our custom platform, look at making it a `.crate` tag, as well as go over the differences between `collision models` and `physics models` to clear up any confusion.

The goal of the following tutorial is to make a `.crate` tag for our custom platform, so that you can learn the difference between the tag types.

# Collision Vs Physics
In the Blam! engine, collision models and physics models are used to handle different types of "collisions". Both types are generally highly simplified 3D meshes of the render model, as using the render model would be too computationally expensive.

Physics models are used by the Havok engine to manage environment collisions and most player collisions, and are required for certain types of tags to function, such as `.vehicle` and `.crate` tags. For example, a physics model is what allows a `.vehicle` to sit on or crash into the environment, or a `.crate` to fall dynamically and roll around.

Collision models are mainly used to handle projectile collisions - you will not be able to shoot a model in-game if it does not have a collision model, the projectiles will simply pass right through. An edge case here is that collision models can be used as a stand-in for a physics model in the case of static tags such as `.scenery`, allowing for players to collide with the model even without a physics model. This is where some confusion can arise.

Physics models are typically much less complex than collision models, for several reasons. First, the physics model doesn't need to be completely accurate, as it is invisible and most players won't be able to tell. Secondly, calculating physics can be expensive (less so on modern PCs, but definitely on the X360), so the more basic the better. Finally, physics models must be made of *strictly-convex* shapes only, which limits how easily they can be made to fit the model perfectly. Don't worry if you don't understand what this means, it will be covered later.

On the other hand, collision models are usually a much closer representation of the render model. This is because players will find it odd if projectiles don't seem to collide with the visual model and the shapes do not need to follow strictly-convex rules. See the following pictures for a visual idea of how the two differ.
{% alert %}
TL;DR - Physics models are used for player and environment interaction, collision models are for projectile collisions.
{% /alert %}

# Example Mongoose Collision and Physics Models
![](A.png "Physics model of the mongoose. Note how it is strictly-convex.")
![](B.png "Physics (highlighted) overlayed on the render model. Note how much less complex the physics model is.")
![](C.png "Collision model of the mongoose. Note how it is still low-poly, but much more complex than the physics model. It also does not need to be strictly-convex.")

# Creating the Crate Tag
1. Open Guerilla.
2. Press {% key "Ctrl" /%}+{% key "N" /%} or `File -> New`.
3. Type `crate`, or find it in the list. Press `Ok`.
4. A new `.crate` tag will open. Press {% key "Ctrl" /%}+{% key "S" /%} or `File -> Save`. Navigate to our `custom_platform` folder in `H3EK\tags\objects\scenery\custom_platform`. Name the file `custom_plaftorm`, and hit `Save`.
5. In the tag, set the `bounding radius` to 3. Next, press the `...` next to the `model` box and choose our `custom_platform.model`. Save the tag.

We've now successfully made a `.crate` tag for our platform! I wonder what will happen when we try to spawn it in...

1. Open a scenario in Sapien.
2. In the `Hierarchy View`, navigate to `Scenario -> Objects -> Crates` and select the folder.
3. Click `Edit Types`, click `Add`.
4. Navigate to our custom platform folder, and double click the new `.crate` tag we made.
5. Click `Done`, and then `Ok` to close the dialog.
6. Right click on the ground in the `Game Window` to place a new crate object
7. In the `Propeties Palette`, change the `Type` to `custom_platform`

...Oh dear, we seem to have an error! You should see an error that reads:  
`WARNING objects: Could not construct crate object. Make sure you have a model and physics model linked up to the object definition for (crate custom_platform)`  
`-FATAL- objects: (CHECK WARNINGS: object_type_new failed) error creating custom_platform`

If you were paying attention in [this section](#collision-vs-physics) earlier, you may already realise the issue - `.crate` tags *require* a physics model in order to be spawned, similarly to `.vehicle` tags.

# Making a Physics Model
Making a basic physics model, especially for a render model as simple as our platform, is actually quite straightforward. In the following steps we will add a basic cuboid to act as a physics mesh for our model. We will also edit our render model to be a bit thicker, as I think it will help demonstrate things better down the line.

1. Open your Blender file from the last tutorial, or download the [end result](~blender-object-creation-materials) from the previous page.
2. Select the platform object.
3. Press {% key "S" /%} to scale, press {% key "Z" /%} for Z-axis only, and then press {% key "3" /%} to make the platform thrice as thick. Press {% key "Left Click" /%} or {% key "Enter" /%} to confirm.

![](D.png "The platform should now be three times as thick. Looks better already!")

Now that the render model edit is out of the way, lets move on to making the physics object:

1. Press {% key "Shift" /%}+{% key "A" /%} to open the Add menu, then select `Mesh`, then click `Cube`. This will add a new cube object to the blend scene.
2. Before anything else, we should parent the cube to the Armature. Failure to do so will mean the cube won't get exported! In the `Outliner`, click the cube object to make sure it's selected, then click on the `Armature` object *whilst holding {% key "Ctrl" /%}*.
3. Now, with your mouse over the `3D view` (not the `Outliner`), press {% key "Ctrl" /%}+{% key "P" /%} to open the `Parenting` menu. Now click `Object (Keep Transform)`. The new cube object should now appear with the same indentation (hierarchy) as the render model in the `Outliner`. Here is a gif demonstrating the process:
![](F.gif "Parenting the new cube object to the Armature.")
4. Double click the new cube object, or press {% key "F2" /%} with it selected, to be able to change it's name. Name the object starting with a {% key "$" /%}, the rest of the name is up to you but I will name it `$platform_physics` to keep things simple.
    {% alert type="info" %}
    The Blender addon looks for certain symbols in object names to determine what type of object they should be treated as. Here, the `$` symbol denotes that this is a physics mesh, and should only be exported into the physics model. Without this symbol, it would be exported as part of the render model instead.
    {% /alert %}
5. For clarity's sake, I will rename the render model object to `platform` as well, but this step is optional.
![](G.png "Your Outliner view should now look like this.")
6. The next step is to make the physics model big enough to cover the render model. Select your physics object, then press {% key "S" /%}, followed by {% key "Shift" /%}+{% key "Z" /%}, then {% key "59.5" /%}. Now hit left click or {% key "Enter" /%}. The physics object is now almost as wide and long as the render model.
7. Next, press {% key "S" /%}, then {% key "Z" /%}, then {% key "2.9" /%} to make it the right height too. You may have noticed this isn't *quite* as big as the render model. This is personal preference, but I typically make physics models slightly smaller than the object they represent to allow the player to feel like they can get as naturally close to the object as they should be able to.