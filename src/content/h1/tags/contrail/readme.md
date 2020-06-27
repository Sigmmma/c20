---
title: contrail
tagName: contrail
img: contrail.jpg
imgCaption: Sentinel beams and assault rifle tracers are examples of contrails
stub: true
thanks:
  - to: gbMichelle
    for: Limits
---

Contrails describe the trail effects which commonly follow [projectiles][projectile], or emit from [model][gbxmodel] markers like the Banshee's wingtips. They reference a [bitmap][] to be rendered at repeated intervals and can be affected by [wind][] and gravity using [point_physics][].

# Limits
Contrails are represented in-engine as series of connected points. There is a limit of 1024 such points existing at any given time, meaning contrails may stop generating if there are already many in the scene. Lower the point generation rate if this becomes an issue.

Setting the point generation rate to 30 per second or higher can cause visual artifacts in the contrail since this value begins to exceed the game's standard tick rate.
