---
title: contrail
stub: true
about: 'tag:h1/contrail'
img: contrail.jpg
caption: Sentinel beams and assault rifle tracers are examples of contrails
thanks:
  gbMichelle: Limits
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
---
Contrails describe the trail effects which commonly follow [projectiles](~projectile), or emit from [model](~gbxmodel) markers like the Banshee's wingtips. They reference a [bitmap](~) to be rendered at repeated intervals and can be affected by [wind](~) and gravity using [point_physics](~).

# Limits
Contrails are represented in-engine as series of connected points. There is a [limit of 1024](~game-state#datum-arrays) such points existing at any given time, meaning contrails may stop generating if there are already many in the scene. Lower the point generation rate if this becomes an issue.

Setting the _point generation rate_ to 15 per second or higher can cause visual artifacts in the contrail since point generation is framerate dependent and can conflict with the game's tick rate. Modern client mods will modify the effect in-engine to prevent this.

# Related HaloScript

{% relatedHsc game="h1" tagFilter="contrail" /%}

# Structure and fields

{% tagStruct "h1/contrail" /%}
