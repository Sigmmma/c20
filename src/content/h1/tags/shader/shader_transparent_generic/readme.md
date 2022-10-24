---
title: shader_transparent_generic
about: 'tag:h1/shader_transparent_generic'
img: generic.jpg
caption: The energy field of the Spirit dropship uses this shader type.
keywords:
  - shader_transparent_chicago
  - shader_transparent_chicago_extended
thanks:
  MosesOfEgypt: Tag structure research
  Kavawuvi: Invader tag definitions
---
The **shader_transparent_generic** tag is used for a large number of materials, such as jackal shields, teleporters, control panels, Cortana, and more.

Instances of this tag were replaced with [shader_transparent_chicago](~) and [shader_transparent_chicago_extended](~) when the game was ported to PC, but these shader types cannot fully replicate original appearances. Only the original Xbox version of the game and H1A in MCC support this shader; it is invisible in the Gearbox PC port.

# Replication using a Chicago shader
For H1CE and H1PC, most of these shaders can be accurately recreated using extra layers and/or 4x4 "tint" bitmaps for recoloring the output of the shader.

Some other shaders will need small 256x4 gradient tint bitmaps that are animated to slide back and forth to tint the shaders output a blend of two different colors.

The most complex of the shaders can only be recreated using very large animated bitmaps that have had all their output pre-computed for each frame of the animation, however these can't be timed properly and are inefficient.

The [Refined project][refined] attempts to recreate classic Xbox visuals by improving transparent shaders using these techniques.

[refined]: https://www.reddit.com/r/HaloCERefined

# Structure and fields

{% tagStruct "h1/shader_transparent_generic" /%}
