---
title: Reach Animation data
keywords:
  - jma
  - jmm
  - jmt
  - jmz
  - jmv
  - jmo
  - jmr
  - animation
  - model_animation_graph
  - reach
thanks:
  Crisp: Writing this page
---
The [Halo Reach Editing Kit](~hr-ek) uses several types of animations when building a model_animation_graph from source data. Using legacy commands these are filetypes, however in the Sidecar pipeline animation types are defined in the sidecar.xml

# JMM (Base)
Full body animation, however it will not move the physics pill of an object. Ideal for idle, and enter/exit vehicle animations or cinematic animations.

# JMA (Base - Horizontal Plane)
Full body animation with physics pill movement on the XY plane. Ideal for animations which move an object in physical space such as walking or hard ping animations.

# JMT (Base - Turn/Yaw Rotation)
Full body animation with physics pills that allows for rotation on the yaw axis. Ideal for biped turning animations

# JMZ (Base - Up Axis)
Full body animation with physics pill movement on the Z axis. Ideal for jumping animations.

# JMV (Base - Vehicle/FullRotation)
Vehicle animation with full roll/pitch/yaw rotation and angular velocity. Don't use this for bipeds.

# JMO (Overlay - Keyframe)
For additive animations which can either be keyframed or based on set poses.
Keyframe overlay animations will only animate bones on top of existing animations. Ideal for firing and reloading animations.

Pose overlay animations will instead use poses (keyframes which define extremes). Ideal for aiming animations to handle weapon sway.

# JMR (Replacement)
Similiar to overlay animations except the animation of keyframed bones are completely replaced by JMR animations. These animations can either be relative to local or object space. Ideal for ready/stow and throw grenade animations.

# Defining Animation types in Sidecars

| Animation Type | Sidecar XML Element |
|--------------|----------|
| JMM | ContentNetwork Name="animation name" Type="Base" ModelAnimationMovementData="None"
| JMA | ContentNetwork Name="animation name" Type="Base" ModelAnimationMovementData="XY"
| JMT | ContentNetwork Name="animation name" Type="Base" ModelAnimationMovementData="XYYaw"
| JMZ | ContentNetwork Name="animation name" Type="Base" ModelAnimationMovementData="XYZYaw"
| JMV | ContentNetwork Name="animation name" Type="Base" ModelAnimationMovementData="XYZFullRotation"
| JMO (Keyframe) | ContentNetwork Name="animation name" Type="Overlay" ModelAnimationOverlayType="Keyframe" ModelAnimationOverlayBlending="Additive"
| JMO (Pose)| ContentNetwork Name="animation name" Type="Overlay" ModelAnimationOverlayType="Pose" ModelAnimationOverlayBlending="Additive"
| JMR (Local Space) | ContentNetwork Name="animation name" Type="Overlay" ModelAnimationOverlayType="Keyframe" ModelAnimationOverlayBlending="ReplacementLocalSpace"
| JMR (Object Space) | ContentNetwork Name="animation name" Type="Overlay" ModelAnimationOverlayType="Keyframe" ModelAnimationOverlayBlending="ReplacementObjectSpace"
