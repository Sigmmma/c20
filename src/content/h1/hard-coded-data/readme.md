---
title: Hard-coded data
keywords:
  - color
  - data
  - engine
  - hard-coded
  - info
thanks:
  - to: MosesOfEgypt
    for: Armor color values
  - to: Lavadeeto
    for: Armor color testing and picture
---
There are lots of hard-coded values in Halo's engine, such as the multiplayer
armor color. These values do not typically appear anywhere in tag data, and
cannot be directly changed or controlled.

# Multiplayer Armor Colors

<figure>
  <a href="armor_colors.png">
    <img src="armor_colors.png" alt="Armor colors in order"/>
  </a>
  <figcaption>
    <p>Spartan armor colors with shaders as they appear ingame.</p>
    <p>The far-left is the single-player color, which comes from the
    actor_variant tag and is <strong>not</strong> hard-coded</p>
  </figcaption>
</figure>

In multiplayer, the player's armor color value comes from this hard-coded list.
For non-player unit color change, see [actor_variant][].

Color name matches the name as it appears in the game's menu. HEX and RBG color
values are both listed in red-green-blue order. Note that these colors will look
somewhat different ingame, since cubemaps and specular maps are applied over the
diffuse color listed here.

| Name   | Color                                       | HEX       | RGB           |
|--------|---------------------------------------------|-----------|---------------|
| White  |<div style="background: #FFFFFF">&nbsp;</div>| `#FFFFFF` | 255, 255, 255 |
| Black  |<div style="background: #000000">&nbsp;</div>| `#000000` |   0,   0,   0 |
| Red    |<div style="background: #FE0000">&nbsp;</div>| `#FE0000` | 254,   0,   0 |
| Blue   |<div style="background: #0201E3">&nbsp;</div>| `#0201E3` |   2,   1, 227 |
| Gray   |<div style="background: #707E71">&nbsp;</div>| `#707E71` | 112, 126, 113 |
| Yellow |<div style="background: #FFFF01">&nbsp;</div>| `#FFFF01` | 255, 255,   1 |
| Green  |<div style="background: #00FF01">&nbsp;</div>| `#00FF01` |   0, 255,   1 |
| Pink   |<div style="background: #FF56B9">&nbsp;</div>| `#FF56B9` | 255,  86, 185 |
| Purple |<div style="background: #AB10F4">&nbsp;</div>| `#AB10F4` | 171,  16, 244 |
| Cyan   |<div style="background: #01FFFF">&nbsp;</div>| `#01FFFF` |   1, 255, 255 |
| Cobalt |<div style="background: #6493ED">&nbsp;</div>| `#6493ED` | 100, 147, 237 |
| Orange |<div style="background: #FF7F00">&nbsp;</div>| `#FF7F00` | 255, 127,   0 |
| Teal   |<div style="background: #1ECC91">&nbsp;</div>| `#1ECC91` |  30, 204, 145 |
| Sage   |<div style="background: #006401">&nbsp;</div>| `#006401` |   0, 100,   1 |
| Brown  |<div style="background: #603814">&nbsp;</div>| `#603814` |  96,  56,  20 |
| Tan    |<div style="background: #C69C6C">&nbsp;</div>| `#C69C6C` | 198, 156, 108 |
| Maroon |<div style="background: #9D0B0E">&nbsp;</div>| `#9D0B0E` | 157,  11,  14 |
| Salmon |<div style="background: #F5999E">&nbsp;</div>| `#F5999E` | 245, 153, 158 |
