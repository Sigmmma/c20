---
title: damage_effect
img: grenade_det.jpg
caption: Grenades use a damage effect with an large radius, ensuring target destruction
keywords:
  - Damage
  - Hit
  - Attack
about: 'tag:h3/damage_effect'
thanks:
  odchylanie_uderzenia: Writing and research
  Mimickal: Proof-reading and suggestions
---
Damage effect tags (internally known as `jpt!`) are responsible for almost all sources of pain and death within the Halo 3 engine, besides hard values they contain many options for side effects and unique properties.

{% alert %}
Halo 3 does not support negative damage, nor negative damage modifiers.
{% /alert %}

# Top Fields/Flags

| Field/Flag | Data type | Description
|-------|----------|--------------
| radius | real | A set of two values that define the distances used for damage calculation (as radii from the damage origin point). 'damage upper bound' is applied between the origin and the first value. Damage scales linearly to 'damage lower bound' over the distance between the first and second values. No damage is applied outside of the second distance.
| cutoff scale | fraction | Unknown/needs additional research
| effect flags | flag | -
| don't scale damage by distance | - | Always use 'damage upper bound' if a target is anywhere within the radius. Does not apply to [projectile impact damage](~projectile#flyby-impact).
| area damage players only | - | 

# Damage

| Side effect | Description
|-------|----------
| none | No side effects from this damage effect on targets
| harmless | Unknown/needs additional research
| lethal to the unsuspecting | Causes this damage effect to instantly kill units from behind, unless the [biped](~) flag 'not instantly killed from behind' is enabled
| emp | needs additional research

These effects are either unknown or need additional research.

| Category | Description
|-------|----------
| none | Unknown/needs additional research
| falling | Unknown/needs additional research
| bullet | Unknown/needs additional research
| grenade | Unknown/needs additional research
| high explosive | Unknown/needs additional research
| sniper | Unknown/needs additional research
| melee | Unknown/needs additional research
| flame | When this damage effect hits an AI unit, they will play their voice lines for being lit on fire, needs additional research
| mounted weapon | Unknown/needs additional research
| vehicle | Unknown/needs additional research
| plasma | Unknown/needs additional research
| needle | Unknown/needs additional research
| shotgun | Unknown/needs additional research

## Flags

Flags used for special properties to be applied to this damage effect when hitting a target.

| Flag | Description
|-------|----------
| does not hurt owner | needs additional research
| can cause headshots | When this melee or projectile attack hits a [model](~) damage section with the 'headshottable' flag enabled and the region is unshielded, the unit will instantly be killed, regardless of remaining health or shields
| pings resistant units | Unknown/needs additional research
| does not hurt friends | Unknown/needs additional research
| does not ping units | needs additional research
| detonates explosives | needs additional research
| only hurts shields | This damage can only hurt shields, dealing 0 damage to base target health
| causes flaming death | Unknown/needs additional research
| damage indicators always point down | needs additional research
| skips shields | This damage will bypass shield health and attack base health directly, can allow headshots to bypass shields as well
| only hurts one infection form | needs additional research
| transfer damage always uses min | needs additional research
| infection form pop | Unknown/needs additional research
| ignore seat scale for dir. damage | needs additional research, should cause this damage effect to always deal full damage when hitting a unit in a vehicle directly, ignoring all vehicle transfer damage ratio values
| force hard ping if body damage | This damage will always trigger a hard ping animation when inflicted upon the base health of a unit. Cannot trigger hard pings if the material hit does 0 damage due to modifiers
| does not hurt players | needs additional research
| does not overcombine | Unknown/needs additional research
| enables special death | Enables a target to play a special instant response (set up in its [model(~)] tag) when killed by this damage effect. For example, the Ghost has a slow, wind-up detonation when killed by normal weapons, but explodes instantly when killed by the rocket launcher.
| cannot cause betrayals | Unknown/needs additional research
| uses old EMP behavior | Unknown/needs additional research
| ignores damage resistance | Unknown/needs additional research
| forces s_kill on death | Unknown/needs additional research
| causes magic deceleration | Unknown/needs additional research

## Fields

This section is where the actual numbers of this damage effect are specified. Defines other properties like vehicle transfer damage, stun, knockback, damage angles for melee, damage type and the response label as well.

{% figure src="damage_fields.jpg" %}
Pictured: The entire fields section
{% /figure %}

| Fields | Data type | Description
|-------|----------|--------------
| AOE core radius | real | The radius in WU that this damage effect can travel through map geometry, [scenery](~) and [crates](~crate), still abides by the radius fields to define actual range of effect
| damage lower bound | real | The damage done to a target for detonation, melee or [effect](~)-bound damage when effecting a target just within the second radius bounds value. Is unused for impact damage unless the projectile flag ['damage scales based on distance'](~projectile#flags) is enabled, then this value of damage will be applied when hitting a target past the latter bound of the ['air damage range' field](~projectile#physics)
| damage upper bound | real | 2 values that the game picks between for the damage done to a target on impact, or within the first radius bounds value for detonation, melee or [effect](~)-bound damage
| dmg inner cone angle | real | needs additional research
| dmg outer cone angle | real | needs additional research
| active camouflage damage | real | needs additional research
| stun | real | Defines the % of stun to apply to a player in MP for movement and aiming stun purposes, per individual instance of damage
| maximum stun | real | Defines the maximum % of stun a player being effected by this damage can achieve, functional upper limit defined by the [globals](~) tag
| stun time | real | needs additional research
| instantaneous acceleration | real | needs additional research
| rider direct damage scale | real | The ratio of damage dealt to vehicle occupants when they are hit by a [projectile](~) impact containing this damage effect, ratio example: 0.6 = 60%
| rider maximum transfer damage | real | The ratio of damage dealt to vehicle occupants when nearby parts of a vehicle are hit (according to the [model](~) tag damage seat transfer radius), damage is passed through *this* transfer ratio first and then through the damage seat scale in the vehicles [model](~) tag, before finally being passed onto the unit
| rider minimum transfer damage | real | The ratio of damage dealt to vehicle occupants when any part of the vehicle not within the [damage seat transfer radius](~model) is hit, uses this ratio first, then the vehicle damage seat scale before passing the final damage onto the rider
| general damage | string | This string tells the game to apply this damage type to this damage effect, damage types define material modifiers such as bonus damage to human health or a damage reduction against brute shields
| specific damage | string | This string tells the game to apply this damage type in addition to the general damage, used as a bonus modifier calculated *after* the general damage. For example a 'sniper' damage type could have a 2x bonus against vehicle materials, thus when used as a specific damage with a general damage that has a 1x modifier on vehicles, you would still get the 2x bonus on vehicles from the specific damage
| custom response label | string | In a [model](~) you can set up responses to play when a part of a unit reaches a certain health threshold due to damage using labels defined here. An example being the ability to set units on fire, the flamethrower or firebomb has the "fire" response label, which then triggers an [instant response](~model) to create a fire effect onto that unit once they've reach a defined % of health due to that damage.
| AI stun radius | real | When this damage effect is triggered via [projectile](~) detonation, this radius in world units defines how far from the detonation point the 'AI stun bounds' value extends to
| AI stun bounds | real | Thess values defines how much 'stun" an AI unit is subjected to from this attack, based on range from impact if an AOE attack, if this stun value is greater than or equal to the [character](~) tags 'stun threshold' value, the AI unit enters their 'stunned' behavior and animation state, an example being grunts holding their head and stumbling around
| shake radius | real | When this damage effect is triggered via [projectile](~) detonation, this radius defines how far from the detonation point a screen shake effect is played on players
| EMP radius | real | needs additional research, causes this damage effect when used from detonation and within this damage effects radius bounds to get applied to both shield health and body health on targets
| AOE spike radius | real | When used for AOE damage effects, this will act as a smaller radius within the entire AOE that triggers the below value damage boost. An example would be an explosive projectile having a max radius of 5 world units and a spike radius of 1 world unit, should a target be hit by the AOE within 1 world unit of the detonation origin, trigger the damage bump
| AOE spike damage bump | real | When this damage effect effects a target via AOE and the target is within the above fields radius, add this much additional damage

damage response | [damage_response_definition](~) | This field is used to reference the tag that controls screen shake/motion and controller haptics when a target is hit by this damage effect instance.

sound | [sound](~) | Defines the sound played when this damage effect is triggered, used for melee attacks

# As melee

Specific frames of melee animations are set as 'primary keyframes'. During these frames, the melee damage effect is active, and will hurt targets within its radius. Under normal circumstances, a melee animation cannot hit a single target more than once. For example, if you are within the damage radius for 5 primary keyframes, you will only take one instance of damage.

{% alert %}
Keep in mind when an AI unit is berserking, their melee_leep animation is allowed to hit the same target multiple times, leading to a massive boost in their melee damage
{% /alert %}

# As effect-bound

Often used for [effects](~effect) such as fire, where a damage effect is spawned every tick while particles are emitted, these damage effects usually have a small radius and low base damage.
