---
title: H3 Object Importing Guide - Animations and Device Machines
keywords:
  - modeling
  - exporter
  - importing
  - animation
  - animations
  - model_animation_graph
  - jmad
  - .model_animation_graph
  - .jmad
  - device
  - devices
  - machine
  - device machine
  - device_machine
  - .device_machine
  - JMA
  - JMO
  - .JMA
  - .JMO
  - object animation
thanks:
  PepperMan: Writing this guide
  Krevil: Info about JMO usage
---
{% alert %}
This guide assumes you have already [read/completed the previous tutorials](~object-importing).
{% /alert %}

# File list
| File Link                                                                                          | Description
|--------------------------------------------------------------------------------------------------- | -----------------------------------
|[End Result](https://drive.google.com/file/d/1_XAJ1ZUPvQedONuiVW0g5uh1h084t2ys/view?usp=share_link)    | The end product of this tutorial for you to examine and compare.

# Introduction
On this page, we will take a look at how to create a basic animation, the process of getting it in-engine, gain an understanding of `.device_machine` tags and go over their different applications.

The overall goal of the following tutorial is to add an animation to our platform and make a `.device_machine` tag for it so that we can ride it around!

# Animations in Blam!
Animation in the Blam! engine is quite a broad topic and not everything will be covered here, but the following basics should give you a good enough understanding such that you can create animations for any scenery or device machine object you wish. Unlike models, which all use the `.JMS` format for importing, animations use a multitude of formats that determine how `tool` handles them on import. You can see a list of all types [here](~animation-data), but the main two we will focus on are `.JMA` (Jointed Model Animation) and `.JMO` (Jointed Model Overlay). Think of `.JMA` as the "base" type of animation - one that causes an object's bones to simply move. The most common use-case is for object idling animations. `.JMO` are overlay animations - these are **additive** meaning that the bone movement data is applied on top of any current base animation on the object.

Some animations require specific numbers of frames, where certain actions happen on certain frames - this is **not** the case for scenery or device machines, but is something you should keep in mind in the future. For example, wheel-based vehicle (think Warthog) steering animations only consist of four frames: rest, full-right-turn, rest, full-left-turn.

# Vertex weighting
Vertex weighting is a complex topic - it is the process of determining how the `vertices` in a 3D mesh are manipulated by the movement of bones in an armature. Luckily, the weighting that we have to do for our model is extremely simple. As we only have one bone, and we want the entire model to follow the animation of that bone, we can simply weight all of the vertices in our model to that bone, with a value of `1`.

1. Select the `platform` object, then navigate to the `Object Data` (green) tab in the `Properties` window.
2. At the top, locate the `Vertex Groups` section, and click the `+` symbol. This adds a new vertex group to the model.
3. Vertex groups rely on their name to determine which bone they are tied to. Put simply, rename the vertex group to `Bone` to match the name of the bone in the armature.
![](A.jpg "Make sure you give the vertex group the same name as the bone.")
4. In the `3D Viewport`, press `Tab` to enter into `Edit Mode`. Set your selection mode to `Vertex` with the buttons to the right of the mode dropdown. You will notice that four new options have popped up underneath the `Vertex Groups` section - `Assign`, `Remove`, `Select` and `Deselect`. `Assign` takes any currently selected vertices, and assings them to the currently selected vertex group. `Remove` does the oppoite. `Select` will highlight any vertices assigned to the currently selected vertex group. `Deselect` does the opposite.
5. Press {% key "A" /%} in the `3D Viewport` to select all vertices in the model (they will turn orange). Then, in the `Properties` window, hit the `Assign` button with the `Bone` vertex group selected.
6. In the `Properties` window, switch to the `Modifiers` (wrench icon) tab. We need to add an `Armature` modifier to our model, so that the newly added vertex group knows which armature to use (we only have one armature in the scene, but it needs the modifier regardless).
7. Click `Add Modifier`, then choose `Armature` at the top of the `Deform` column.
8. In the newly added `Armature Modifier`, click inside the `Object` field, and choose `Armature`. Ensure that `Bind To Vertex Groups` is checked.

That's it! Our `platform` object will now correctly animate with the armature, once we have created an animation. If you wish to perform a check to make sure you have done these steps correctly, do the following:

1. In the `3D Viewport` window, click the mode select dropdown near the top left and choose `Pose Mode`. Pose mode is a special object mode used to create `keyframes` for animation, but we will use this more in the next section.
2. Expand the Armature in the `Outliner` window, and select the `Bone`.
3. Hover over the `3D Viewport`, and press {% key "G" /%} to move the bone. As you move your mouse to move the bone around, the `platform` object should follow it. Don't worry that the physics object doesn't do the same - we will talk more about this later.
4. Right-click to stop moving the bone, or use {% key "Ctrl+Z" /%} to undo any changes if you accidentally made them. Then use the mode selection to return to `Object Mode`.

# Creating an animation
Our second goal is to make a simple spinning animation to play on our `.scenery` object
{% alert %}
If you are already comfortable with animating in Blender, you may wish to skip this sub-section and make an animation on your own - the types of animation we will be making in this tutorial do not need to follow any halo-specific rules.
{% /alert %}

1. Open your Blender file from the last tutorial, or download the [end result](~blender-object-creation-physics) from the previous page.
2. Ensure that you can see the `Timeline` window (at the bottom of the screen in the default workspace). It is recommended to expand it vertically slightly for better visibility, as per the image below.
![](B.jpg "You need to have this window visible.")
3. In the `Timeline` window, set the `End` value to `80`. This number is the end frame - we start at 1, and the animation now ends at 80. Animations are played at 30 frames per second by default in both Blender and in-engine, so this animation will last roughly 2.67 seconds.
3. Select the `Armature` object in your scene.
4. Use the `Mode` drop-down menu in the top right of the 3D View to switch to `Pose Mode`.
5. Select the bone in the armature (named `Bone`). You can do this by zooming in and left-clicking the bone in the 3D View, or by expanding the dropdown on the `Armature` object in the `Outliner` view on the right.
6. Make sure the currently active frame is `1`. You can do this by dragging the blue slider in the `Timeline` window to the start, or by typing `1` into the box in the top right, next to the `Start` and `End` frame boxes.
7. Hover your cursor over the `3D Viewport` window, and press {% key "I" /%}. This will open the keyframe window - choose `Rotation`.

You will now notice an orange dot has appeared on the timeline. This is a keyframe - a keyframe, at its most basic, stores specific information about the keyframed object; in this case, the rotational data of our `Bone` in the Armature. It tells Blender, that at this frame, the rotation of the bone **has** to match the keyframe. No matter what happens on previous or future frames, when the animation is played, on the selected frame the rotation will be set to `0,0,0` regardless. Let's add the rest of the necessary keyframes, and how they work should become much clearer:

8. Use the timeline slider or the frame number box to set the current frame to `20`.
9. In the `3D Viewport`, press {% key "R" /%}