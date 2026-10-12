---
title: weapon
about: 'tag:h2/weapon'
keywords:
  - weap
  - gun
  - magnum
  - carbine
  - cannon
  - sword
  - rifle
  - launcher
  - dual wield
  - error
  - spread
thanks:
  ReVaas: 'Research and in-game testing (tag test, H2EK disassembly)'
---
**Weapons** are the items held and fired by [units](~unit). The tag is broadly similar to its [Halo 3 counterpart](~h3/tags/object/item/weapon), which is better documented. This page currently focuses on Halo 2's dual wielding and barrel error (spread) behavior, which differs from Halo 3 in important ways.

# Dual wielding
A weapon can be dual wielded when it has the _can be dual wielded_ flag. In retail, Bungie's dual weapons are the SMG, magnum, needler, plasma pistol, plasma rifle, and brute plasma rifle, but the flag works on any weapon, such as the sniper rifle, as long as the first person [animation graph](~model_animation_graph) has a `dual` weapon class. The HUD for dual wielding is set up in the weapon's [new_hud_definition](~) (see [single and dual widgets](~new_hud_definition#single-and-dual-wielding-widgets)).

## Barrel error fields
Each barrel has three groups of error fields after _firing noise_. Several of them have identical names in Guerilla, so they are easy to mix up:

| Group | Fields | Used for
|-------|--------|---------
| error | acceleration time, deceleration time, damage error | How fast single wield error ramps up and down. _Damage error_ is only used when the weapon's model is in a damaged state.
| dual weapon error | acceleration time, deceleration time, minimum error, error angle, dual wield damage scale | The dual wield values (see below).
| projectile | distribution function, projectiles per shot, distribution angle, minimum error, error angle | The normal (single wield) spread, plus how projectiles are distributed.

## How error is calculated
The following was found by disassembling the H2EK's `halo2_tag_test.exe` (MCC H2EK, 2025 build).

Every shot calculates a **dual blend** value from 0 (pure single wield values) to 1 (pure dual weapon error values):

* By default, the blend is how recently the unit's **other** weapon fired. When a hand fires, a counter for that hand is set to a hard-coded **0.3 seconds**, which counts down every tick. The blend is the remaining time divided by 0.3, so it is 1 right after the other weapon fires and fades to 0 over 0.3 seconds. This is why dual wield error only applies when both weapons are fired at almost the same time. No tag field changes this window.
* With the weapon flag _weapon uses old dual fire error code_, the blend is simply **1 whenever the weapon is dual wielded** and 0 otherwise, so the dual values are always used, even when firing only one weapon. None of Bungie's dual weapons use this flag. Note this is the opposite of how [Halo 3's flag](~h3/tags/object/item/weapon#flags) is described.

The blend is then used to mix the two groups. Dual values **replace** single values; they are not added on top:

* error angle (both bounds) = single and dual _error angle_ mixed by the blend. If a dual bound is 0 the single bound is used instead, so leaving the dual group at 0 (like the magnum) means "same as single wield".
* the barrel's current error (0 to 1) picks a value between the lower and upper bound. It rises while firing and falls when idle, at a rate mixed between the _error_ group and _dual weapon error_ group acceleration/deceleration times. A time of 0 means the change is practically instant. If both bounds are equal these times have no effect.
* minimum error = single and dual _minimum error_ mixed by the blend.
* With the barrel flag _use error when unzoomed_, no error is applied while the unit is zoomed in.

{% alert %}
The _weapon uses old dual fire error code_ behavior comes from the disassembly and has not been tested in game yet. The default "only when both weapons fire at nearly the same time" behavior matches what was seen in tag test; the exact 0.3 second value comes from the disassembly.
{% /alert %}

## Dual wield damage scale
_Dual wield damage scale_ uses the same blend: projectile damage is multiplied by a mix of 1 and the dual wield damage scale. A scale of 0.75 (the SMG) means 75% damage when the blend is 1. No code was found that treats 0 as "unchanged", so a value of 0 would mean no damage when the blend is 1. If you enable _weapon uses old dual fire error code_ on a weapon whose scale is 0, set the scale to 1 to keep normal damage.

{% alert %}
Damage scale behavior comes from the disassembly and has not been tested in game yet. Bungie's magnum and plasma pistol use a scale of 0, so check it in game before relying on it.
{% /alert %}

## Example: making a dual wielded weapon less accurate
To make the sniper rifle twice as inaccurate when dual wielded, without changing single wield accuracy (single _error angle_ 0.5, 0.5):

1. Set the _dual weapon error_ group's _error angle_ to 1, 1.
2. Enable _weapon uses old dual fire error code_ so it applies even when firing one weapon (otherwise it only applies when both weapons fire within 0.3 seconds).
3. Set _dual wield damage scale_ to 1 so damage stays the same.
