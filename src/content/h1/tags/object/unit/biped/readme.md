---
title: biped
about: 'tag:h1/biped'
img: bipeds.jpg
caption: Some bipeds scripted to run along a path during c10's intro
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
---
**Biped** tags represent the "bodies" of AI- and player-driven characters. They can take on a wide range of forms, like flood infection forms, sentinels, marines, grunts, and scripted characters like Cortana. Invisible bipeds are even used to pilot dropships and detecting explosive damage to the ship's reactor in _The Maw_. Bipeds are a type of [unit](~).

On its own, a biped will not _do_ anything unless being controlled by a player or [actor_variant](~). This tag defines key physical characteristics like height, speed, collision, and appearance.

# Physics pill
Biped bodies are approximated by vertically-oriented [capsule/pill shapes][wiki-capsule] for their physical interactions with the [level BSP](~scenario_structure_bsp), the [model_collision_geometry](~) of objects (like scenery, devices, vehicles), and with other biped physics pills. Note that the physics pill is _not_ used as the "hitbox" for projectiles; a biped's [model_collision_geometry](~) is tested for projectile ray casts.

Its width depend on this tag's [collision radius](#tag-field-collision-radius). The height depends on [standing](#tag-field-standing-collision-height) and [crouching](#tag-field-standing-collision-height) collision heights only if the biped [uses player physics](#tag-field-biped-flags-uses-player-physics), and otherwise has 0 height (making the pill a sphere).

You can enable `debug_objects` and `debug_objects_biped_physics_pills` to visualize physics pills.

# Autoaim pill
{% figure src="pills.jpg" %}
Two Grunts, the player, and an Elite shown with just their [node](~gbxmodel#nodes) skeletons, physics pills (white), and autoaim pills (red).
{% /figure %}

Autoaim pills are part of the [autoaim system](~weapon#autoaim) which causes [projectiles](~projectile) to fire towards a biped when the pill is with in a weapon's [autoaim angle](~weapon#tag-field-autoaim-angle) and [range](~weapon#tag-field-autoaim-range). The width of this pill is controlled [within this tag](#tag-field-autoaim-width), but its height and placement depends on the model:

* If the biped has [head](~biped#tag-field-head-model-node-index) and [pelvis](~biped#tag-field-pelvis-model-node-index) nodes...
  * If the [spherical flag](#tag-field-biped-flags-spherical) is set, then the pill is a sphere at the midpoint between head and pelvis.
  * Otherwise, the capsule spans between the head and pelvis nodes.
* If the biped _doesn't_ have both of these nodes, the autoaim pill is vertically-aligned and its height is a fraction of the physics pill's. It will be slightly elevated from the physics pill's base.

You can enable `debug_objects` and `debug_objects_biped_autoaim_pills` to visualize autoaim pills.

[wiki-capsule]: https://en.wikipedia.org/wiki/Capsule_(geometry)

# Structure and fields

{% tagStruct "h1/biped" /%}
