**Blender** is a free and open-source 3D modeling, animating, and rendering toolset. While it has always been possible to transfer assets between 3D software, Blender is a relative newcomer to direct Halo modding workflows, which traditionally relied on the closed-source paid [3ds Max][3dsmax]. Thanks to [community-made plugins][halo-asset-blender-development-toolset], it is now possible to use Blender exclusively.

Note that modern Blender 2.8+ is the preferred version, as this will work with available exporters.

# Learning resources
Blender has far more capabilities than we need for just Halo modding. You will mostly just need to learn polygon modeling, UV unwrapping, rigging, and animation.

* [Official reference manual](https://docs.blender.org/manual/en/latest/)
* [Official tutorials](https://www.blender.org/support/tutorials/)
* [Blender communities](https://www.blender.org/community/)

# Usage basics

## Interaction modes
In the upper-left of the viewport you'll see a drop-down menu labeled "Object Mode". This menu changes Blender's interaction mode. In different interaction modes, the actions and operations you can perform in the viewport change or have different effects. The two main modes you'll use are:

* Object Mode: Allows for the selection of whole objects, adding new objects, and giving them transforms (movement, scale, rotation).
* Edit Mode: Used to edit the geometry within a selected object, like adding new faces, moving vertices, and UV unwrapping.

You can quickly toggle back and forth between these modes using <kbd>Tab</kbd>.

## Moving the camera
By default, Blender's camera rotates around an invisible central "focus point", which is ideal for working on 3D models which need to be rotated and looked at from different angles. In this mode, you can use the following controls:

* Rotating: Hold <kbd>Middle mouse</kbd> and move the mouse
* Panning: Hold <kbd>Ctrl</kbd> + <kbd>Middle mouse</kbd> and move the mouse
* Move in/out: <kbd>Scroll wheel</kbd> or <kbd>Shift</kbd> + <kbd>Shift</kbd> + <kbd>Middle mouse</kbd> while moving the mouse forward/back
* Move focus point to selection: <kbd>/</kbd>

To move the focus point, rotate the camera to an angle perpendicular to the direction of travel then use panning to center over the desired area. You can also press the <kbd>/</kbd> key to center on a selection. If you are finding this mode of camera travel difficult to get used to, you may prefer the temporary flying camera mode by pressing <kbd>Shift</kbd> + <kbd>`</kbd> (tilde) then using <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd>, <kbd>D</kbd> keys, then clicking to finish.

Axis-aligned orthographic views can be viewed by pressing <kbd>`</kbd> (tilde) then clicking the desired direction. Return to the perspective camera by simply rotating the view with <kbd>Middle mouse button</kbd> again.
