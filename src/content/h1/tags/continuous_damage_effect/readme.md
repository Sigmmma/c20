---
title: continuous_damage_effect
about: 'tag:h1/continuous_damage_effect'
img: cdmg.jpg
caption: 'Extreme camera shake from a nearby [sound_scenery](~) affecting the player.'
thanks:
  Sparky: Reversing this tag structure
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
keywords:
  - cdmg
---
**Continuous damage effects** create camera shake and controller vibration for players within a radius of a [sound_looping](~). They are similar to a [damage_effect](~) but more limited in what they can do. This tag is unused by any of the stock game's maps and may have been leftover from earlier in development.

# Known issues
Although this tag contains fields related to damage and damage modifiers, these fields are unused by the game. The camera shake also only applies _while_ a [non-firing damage](~weapon#tag-field-triggers-firing-effects-firing-damage) damage_effect is playing, such as when near a rocket explosion. This is likely a bug.

Controller vibration cannot be felt in H1CE. It is unknown if the vibration works in H1A.

# Structure and fields

{% tagStruct "h1/continuous_damage_effect" /%}
