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
  odchylanie_uderzenia: writing and research
---
Damage effect tags, or internally known as "jpt!" are responsible for almost all sources of pain and death within the Halo 3 engine, besides hard values they contain many options for side effects and unique properties.

Halo 3 does not support negative damage, nor negative damage modifiers.

# Top Fields/Flags

| Field/Flag | Data type | Description
|-------|----------|--------------
| radius | real | A set of two values that defines the range bounces by which targets can be damaged, the former is used for the 'damage upper bound' and it scales linearly to the former radius for the 'damage lower bound' value
| cutoff scale | fraction | Unknown/needs additional research
| effect flags | flag | -
| don't scale damage by distance | - | This damage effect when triggered by sources other than [projectile](~) impact, will always use the 'damage upper bound" value, regardless of target location within the 'radius'
| area damage players only | - | 

# Damage

| Side effect | Description
|-------|----------
| none | No side effects from this damage effect on targets
| harmless | Unknown/needs additional research
| lethal to the unsuspecting | Causes this damage effect to instantly kill units from behind, unless the [biped](~) flag 'not instantly killed from behind' is enabled
| emp | needs additional research

Category's have unknown effects, best to set as whatever your damage effect is based on, or leave unchanged from vanilla.

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
| only hurts shields | This damage cannot attack base health, dealing 0 damage unless it's on unit shields
| causes flaming death | Unknown/needs additional research
| damage indicators always point down | needs additional research
| skips shields | This damage will bypass shield health and attack base health directly, can allow headshots to bypass shields as well
| only hurts one infection form | needs additional research
| transfer damage always uses min | needs additional research
| infection form pop | Unknown/needs additional research
| ignore seat scale for dir. damage | needs additional research, should cause this damage effect to always deal full damage when hitting a unit in a vehicle directly, ignoring any scaling
| force hard ping if body damage | This damage will always trigger a hard ping animation when inflicted upon the base health of a unit, cannot trigger hard pings if the material hit does 0 damage due to modifiers
| does not hurt players | needs additional research
| does not overcombine | Unknown/needs additional research
| enables special death | In a [model](~) tag, you can set up reponses to play when a unit dies, this includes the ability to set up a response that is only played if the unit is killed by a damage effect that has or lacks this flag, an example being the ghost's slow wind-up detonation when killed by normal weapons, but blowing up instantly when killed by the rocket launcher
| cannot cause betrayals | Unknown/needs additional research
| uses old EMP behavior | Unknown/needs additional research
| ignores damage resistance | Unknown/needs additional research
| forces s_kill on death | Unknown/needs additional research
| causes magic deceleration | Unknown/needs additional research

## Fields

This section is where the actual numbers of this damage effect are specified, defines other properties like vehicle transfer damage, stun, knockback, damage angles for melee, damage type and response label as well.

{% figure src="damage_fields.jpg" %}
Pictured: The entire fields section
{% /figure %}

| Fields | Data type | Description
|-------|----------|--------------
| AOE core radius | real | needs additional research
| damage lower bound | real | needs additional research
| damage upper bound | real | 2 values that the game picks between for the damage done to a target on impact, or within the lower radius bounds for detonation, melee or [effect](~)-bound damage
| dmg inner cone angle | real | needs additional research
| dmg outer cone angle | real | needs additional research
| active camouflage damage | real | 
| stun | real | Defines the % of stun to apply to a player in MP for movement and aiming stun purposes, per individual instance of damage
| maximum stun | real | Defines the maximum % of stun a player being effected by this damage can achieve, functional upper limit defined by the [globals](~) tag
| stun time | real | needs additional research
| instantaneous acceleration | real | needs additional research
| rider direct damage scale | real | needs additional research
| rider maximum transfer damage | real | needs additional research
| rider minimum transfer damage | real | needs additional research
| general damage | string | This string tells the game to apply this damage type to this damage effect, damage types define material modifiers such as bonus damage to human health or a damage reduction against brute shields
| specific damage | string | This string tells the game to apply this damage type in addition to the general damage, used as a bonus modifier calculated *after* the general damage. For example a 'sniper' damage type could have a 2x bonus against vehicle materials, thus when used as a specific damage with a general damage that has a 1x modifier on vehicles, you would still get the 2x bonus on vehicles from the specific damage
| custom response label | string | In a [model](~) you can set up responses to play when a part of a unit reaches a certain health threshold due to damage using labels defined here. An example being the ability to set units on fire, the flamethrower or firebomb has the "fire" response label, which then triggers an [instant response](~model) to create a fire effect onto that unit once they've reach a defined % of health due to that damage.
| AI stun radius | real | When this damage effect is triggered via [projectile](~) detonation, this radius in world units defines how far from the detonation point the 'AI stun bounds' value extends to
| AI stun bounds | real | Thess values defines how much 'stun" an AI unit is subjected to from this attack, based on range from impact if an AOE attack, if this stun value is greater than or equal to the [character](~) tags 'stun threshold' value, the AI unit enters their 'stunned' behavior and animation state, an example being grunts holding their head and stumbling around
| shake radius | real | When this damage effect is triggered via [projectile](~) detonation, this radius defines how far from the detonation point a screen shake effect is played on players
| EMP radius | real | needs additional research
| AOE spike radius | real | When used for AOE damage effects, this will act as a smaller radius within the entire AOE that triggers the below value damage boost. An example would be an explosive projectile having a max radius of 5 world units and a spike radius of 1 world unit, should a target be hit by the AOE within 1 world unit of the detonation origin, trigger the damage bump
| AOE spike damage bump | real | When this damage effect effects a target via AOE and the target is within the above fields radius, add this much additional damage

damage response | [damage_response_definition](~) | This field is used to reference the tag that controls screen shake/motion and controller haptics when a target is hit by this damage effect instance.

# As melee

During melee animations, specific frames during the animation are set as 'primary keyframes', which means during these frames in the animation the melee damage effect of the AI is active and will hurt units within their radius, under normal circumstances a melee animation cannot hit a single target more than once, so if you get hit by active frame 1, but are still in the radius of the melee attack for the next 4 active frames, you will still only take one instance of damage.

{% alert %}
Keep in mind when an AI unit is berserking, their melee_leep animation is allowed to hit the same target multiple times, leading to a massive boost in their melee damage
{% /alert %}

# As effect-bound

Often used for effects such as fire, where a damage effect is spawned every tick while particles are emitted, these damage effects usually have a small radius and have a low base damage value.