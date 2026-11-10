---
title: Playing audio and dialog
keywords:
  - animation
  - cinematics
  - solo
---

Dialog and music elevate your cutscene to the highest level. Dialog (and lip-syncing) is embedded in the engine and auto-plays if your .sound tag contains the necessary animation info.

# Dialog

Dialog is played on a specific biped. Lip-syncing happens via phoneme animations and is applicable for most bipeds with a mouth.

Play a piece of dialog with the following script; the last three parameters are the biped, audio scale and a DSP effect that can be applied over the audio.


```hsc
(sound_impulse_start_effect sound\dialog\levels\03_earthcity\cinematic\c03_1030_jon johnson 1 radio_default_loop)
```

* `radio_default_in`: Plays a radio effect, starting with a click-on sound.
* `radio_default_loop`: Plays a radio effect
* `radio_default_out`: Plays a radio effect, ending with a click-off sound.

The following are similar to the above effect, but used for Covenant radio.

* `radio_covy_in`
* `radio_covy_loop`
* `radio_covy_out`

# Music

Music is constructed in phases, with an intro, middle and outro part. The intro plays once, the middle keeps looping until it's scripted the music is allowed to end.
