---
title: Animation data
stub: true
about: 'resource:Animation data'
keywords:
  - jma
  - animation
thanks:
  General_101: Documentation on animation types
  ODX: JMO frames
---
The [HEK](~custom-edition#halo-editing-kit) uses several file types as intermediate representations of animation data. These files provide a common target for exporters like [Bluestreak](~) and [Halo Asset Blender Development Toolset](~halo-asset-blender-development-toolset), and can then be converted to [model_animations](~) tags by [Tool](~h1-tool) for use in Halo.

# JMA (Base)
This is what a lot of animations will end up as. It is a default animation type that stores data necessary for movement, such as a [biped](~h1/tags/object/unit/biped) walking animation.

# JMM (Base)
...

# JMW (Base)
These animations are world-relative. The origin of the animation is the 0, 0, 0 location of the level.

# JMZ (Base)
...

# JMT (Base)
...

# JMO (Overlay)
Overlay animations add extra blended movement to base animations. Examples include the shifting of vehicle passengers from acceleration, 3rd person aiming poses, or 3rd person firing effects. The requirements for these animations depends on how they will be used:

## First person weapon overlays
When the player moves and aims, the first person weapon model can react to give a sense of weight and realism. This overlay animation is used to define the default and extreme location and orientations of the weapon under movement and aiming.

| Frame number | Purpose  |
|--------------|----------|
| 0 | Default position
| 1 | Move forwards
| 2 | Move backwards
| 3 | Move right
| 4 | Move left
| 5 | Look left
| 6 | Look right
| 7 | Look up
| 8 | Look down
| 9 | Fully automatic firing

# JMR (Replacement)
This animation type removes the original animation for the nodes that are animated and plays it's own animation for it. An example for a replacement is a reload animation where you want to make sure the node positions are proper at each part of the reload. In that case you would only animate the upper body, so the lower parts can keep their original base animation that for instance still is a running animation.
