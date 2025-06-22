---
title: weapon
about: 'tag:h1/weapon'
img: weapons.jpg
caption: Weapons spawned using the command `cheat_all_weapons`
thanks:
  Jakey: Explaining weapon error fields
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
  t3h m00kz: Aim assist vs magnetism explanation
keywords:
  - weap
  - gun
  - pistol
  - rifle
  - launcher
---
**Weapons** are most commonly seen as the wieldable items dropped by enemies and found in the environment. However, they are also used for items like the CTF flag, oddball, and weapons attached to [vehicles](~vehicle).

Weapons are intended to fire instances of the [projectile](~) tag, but they can technically reference any [object](~) (spawning bipeds, for example). Thrown grenades are not a type of weapon, but rather a projectile referenced by [globals](~).

# Aim assist
_Aim assist_ includes three distinct features which are customizable on a per-weapon basis. These systems make it easier for players to land shots on enemy units, especially on controllers.

* **Autoaim**: The "red reticle" feature which causes projectile paths to deviate towards enemy [autoaim pills](~biped#autoaim-pill) when they're within the autoaim [range](#tag-field-autoaim-range) and [angle](#tag-field-autoaim-angle).
* **Magnetism**: Only applicable to controllers where it causes the player's view to slightly "follow" enemy units. This is disabled in H1PC by default, but can be enabled for controllers with `player_magnetism 1`.
* **Vehicle weapon deviation**: Only applicable to vehicle weapons where the player's viewing angle can be out of alignment with the weapon's own forward angle. For example, the Warthog turret cannot rotate as fast as the player can turn their camera. In this situation the game allows projectiles to be deviated towards the player's viewing direction rather than firing straight forward from the weapon, up to a maximum [deviation angle](#tag-field-deviation-angle).

Enable these globals to see aim assist in action:

```console
debug_objects 1
debug_objects_biped_autoaim_pills 1
temporary_hud 1
```

# Structure and fields

{% tagStruct "h1/weapon" /%}
