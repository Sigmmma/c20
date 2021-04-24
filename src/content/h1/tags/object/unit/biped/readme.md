**Biped** tags represent the "bodies" of AI- and player-driven characters. They can take on a wide range of forms, like flood infection forms, sentinels, marines, grunts, and scripted characters like Cortana. Invisible bipeds are even used to pilot dropships and detecting explosive damage to the ship's reactor in _The Maw_. Bipeds are a type of [unit][].

On its own, a biped will not _do_ anything unless being controlled by a player or [actor_variant][]. This tag defines key physical characteristics like height, speed, collision, and appearance.

# Physics and autoaim pills
Biped bodies are approximated with "pills" for physics and autoaim, rather than using their [collision model][model_collision_geometry]. These simple capsule shapes are sufficient for these purposes and efficient to test against. Pills are modeled as two spherical volumes connected by a cylinder and parameterized by radius/width and height.

**Physics pills** are how the biped collides with [model_collision_geometry][] and the [BSP][scenario_structure_bsp]. It is _not_ used as the "hitbox" for projectiles. Its width depend on this tag's [collision radius](#tag-field-collision-radius). The height depends on [standing](#tag-field-standing-collision-height) and [crouching](#tag-field-standing-collision-height) collision heights only if the biped [uses player physics](#tag-field-biped-flags-uses-player-physics), and otherwise has 0 height (making the pill a sphere).

**Autoaim pills** are part of the autoaim system which causes [projectiles][projectile] to fire towards a physics pill when the pill is with in a weapon's [autoaim angle][weapon#tag-field-autoaim-angle] and [range][weapon#tag-field-autoaim-range]. The width of this pill is controlled by [this tag](#tag-field-autoaim-width), however its height is dependent upon the biped's skeleton (seemingly between the head and pelvis nodes).
