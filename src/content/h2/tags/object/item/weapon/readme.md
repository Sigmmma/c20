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
**Weapons** are the items held and fired by [units](~unit). The tag is broadly similar to its [Halo 3 counterpart](~h3/tags/object/item/weapon), which is better documented. This page currently covers the settings that control **accuracy (error)** and **dual wielding**, which work differently from Halo 3.

# Key terms
* **Error** is how inaccurate a weapon is. Each shot leaves the barrel at a random angle away from the center of the reticle. The bigger the error angle, the wider the spread.
* **Single wielding** means holding one weapon. **Dual wielding** means holding a weapon in each hand.
* Every barrel has two sets of error settings: one for single wielding and one for dual wielding (the _dual weapon error_ group). When a shot is fired, the game decides how much of each set to use (see [when the dual settings are used](#when-the-dual-settings-are-used)).

# Weapon flags
Only the flags that were researched are listed here.

| Flag | What it does
|------|-------------
| can be dual wielded | Lets the player hold this weapon in either hand together with another dual wieldable weapon. It works on any weapon (for example the sniper rifle), but the weapon's first person [animation graph](~model_animation_graph) needs a `dual` weapon class, and its [HUD](~new_hud_definition) needs widgets for dual wielding.
| weapon uses old dual fire error code | Makes the weapon always use its **dual weapon error** settings while it is dual wielded, even when only one of the two weapons is fired. Without this flag (the default, and what all of Bungie's dual weapons use), the dual settings are only used when both weapons are fired at almost the same moment. Note this is the opposite of how [Halo 3's flag](~h3/tags/object/item/weapon#flags) is described. **Not yet tested in game.**

# Barrel error settings
These are found in each element of the _barrels_ block, after _firing noise_. They are in three groups, and several fields in different groups have the **same name** in Guerilla, so check which group you are editing.

## Error group
The first group. It controls how quickly the single wield error grows and shrinks.

| Field | What it does
|-------|-------------
| acceleration time | Seconds of continuous firing for the error to grow from the lower _error angle_ to the upper _error angle_ (single wielding). 0 means it changes instantly.
| deceleration time | Seconds without firing for the error to shrink back from the upper to the lower _error angle_ (single wielding). 0 means it changes instantly.
| damage error | Not regular weapon error. Guerilla describes it as "the range of angles (in degrees) that a damaged weapon will skew fire", used when the weapon's model is in a damaged state.

## Dual weapon error group
The second group. These settings are used **instead of** the single wield settings when the dual settings apply (see [when the dual settings are used](#when-the-dual-settings-are-used)).

| Field | What it does
|-------|-------------
| acceleration time | Like the error group's _acceleration time_, but for dual wielding.
| deceleration time | Like the error group's _deceleration time_, but for dual wielding. It does **not** make the dual error last longer after firing; it only changes how fast the error moves between the two _error angle_ values.
| minimum error | The smallest error a shot can have when dual wielding, in degrees.
| error angle | Two values in degrees: the error when you start firing, and the error after firing for the _acceleration time_. **If a value is 0, the single wield value is used instead**, so leaving this at 0, 0 (like Bungie's magnum) means dual wielding is as accurate as single wielding.
| dual wield damage scale | Multiplies the damage of each shot when the dual settings apply. For example 0.75 (the SMG) means 75% damage. **0 appears to mean no damage**, not "unchanged", so set it to 1 if you want normal damage. **Not yet tested in game**; Bungie's magnum and plasma pistol use 0, so check this before relying on it.

## Projectile group
The third group. Only the error fields were researched.

| Field | What it does
|-------|-------------
| minimum error | The smallest error a shot can have when single wielding, in degrees.
| error angle | The **single wield** spread. Two values in degrees: the error when you start firing, and the error after firing for the error group's _acceleration time_. If both values are the same (the sniper rifle uses 0.5, 0.5), the acceleration and deceleration times make no difference.

## Barrel flags
| Flag | What it does
|------|-------------
| use error when unzoomed | No error is applied while the player is zoomed in, so the weapon is perfectly accurate when scoped. Used by the sniper rifle.

# When the dual settings are used
Each time a dual wielded weapon fires, the game decides how much of the single and dual settings to use:

* **Default (no flag):** the dual settings are only used if the **other** weapon fired in the last **0.3 seconds**. Right after the other weapon fires the dual settings are fully used, and over the next 0.3 seconds they fade back to the single settings. In practice this means dual wield error only shows up when both triggers are pulled at nearly the same time. This 0.3 seconds is built into the game and cannot be changed in the tag.
* **With _weapon uses old dual fire error code_:** the dual settings are always fully used while the weapon is dual wielded.
* **Single wielding:** the single settings are always used.

The same rule decides how much of the _dual wield damage scale_ is applied.

{% alert %}
The default behavior (dual error only when both weapons fire together) was seen in tag test. The _weapon uses old dual fire error code_ behavior and the _dual wield damage scale_ behavior come from the disassembly and have not been tested in game yet.
{% /alert %}

# How this was researched
The information above was found by testing in tag test and by reading the game's code:

1. **Comparing tags.** `tool.exe export-tag-to-xml` was used to export Bungie's weapon tags (sniper rifle, SMG, magnum, needler, plasma pistol, plasma rifle, brute plasma rifle) to XML, to compare their settings and see which flags Bungie used.
2. **Testing in tag test.** Values were changed in Guerilla and tested in `halo2_tag_test.exe`. This showed that the dual weapon error group only had an effect when both weapons were fired at almost the same moment.
3. **Disassembling tag test.** To find out why, `halo2_tag_test.exe` (MCC H2EK, 2025 build) was disassembled, which turns the program back into readable machine instructions. This was done with the free [Capstone](https://www.capstone-engine.org/) disassembler from Python. The program has no debug symbols, but it still contains Bungie's debug text, such as the source file name `weapons.cpp` and the name of the random number generator used for weapon spread (`weapon-random-error`). Following those led to the code that fires a barrel. From there it was traced:
   * which tag fields the spread calculation reads, and how the single and dual values are mixed,
   * where the _weapon uses old dual fire error code_ flag is checked,
   * where each hand's "fired recently" timer is set (to 0.3 seconds) and counted down,
   * how the acceleration and deceleration times are turned into rates when the tag loads (a time of 0 becomes an almost instant change),
   * how the _dual wield damage scale_ is applied to the projectile.
4. **Checking against the tags.** The field positions found in the code were matched to the field positions in the tag files, to be sure each value belongs to the Guerilla field named on this page.

# Example: making a dual wielded weapon less accurate
To make the sniper rifle twice as inaccurate when dual wielded, without changing single wield accuracy (single _error angle_ 0.5, 0.5):

1. Set the _dual weapon error_ group's _error angle_ to 1, 1.
2. Enable _weapon uses old dual fire error code_ so it applies even when firing one weapon (otherwise it only applies when both weapons fire within 0.3 seconds).
3. Set _dual wield damage scale_ to 1 so damage stays the same.
