---
title: damage_effect
tagName: damage_effect
img: explosion.jpg
imgCaption: The grenade detonation [effect][] includes a damage_effect.
thanks:
  - to: Mortis
    for: Explaining headshot damage and bleedthrough
  - to: Conscars
    for: Checking multiplayer headshot flag and radii behaviour
---
The **damage effect** tag determines the results of damage application to [items][item] and [units][unit] by [projectile][] impacts, explosions, melee attacks, and falling. They can be part of an [effect][].

Besides applying damage, these tags can have an area of effect, impart acceleration on objects, flash a colour, and shake the camera.

# Bleedthrough
When damage to shields exceeds the currently shield vitality, damage carries over to health. When this occurs, the damage multiplier of the shields still carries over to the health damage. This even occurs if the current shield vitality is 0. The result is that the initial carryover health damage may be higher than expected with weapons like the plasma rifle, which have a 2x shield multiplier. Subsequent shots will impact the body and use its material type modifiers instead.
