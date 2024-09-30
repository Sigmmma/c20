---
title: lens_flare
about: 'tag:h1/lens_flare'
img: flare.jpg
caption: |
  Lens flares are present here on the sky light, and used by light attachments
  for the player's flashlight and Plasma Pistol.
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
  Conscars: Tag field testing
---
**Lens flares** are a visual effect used to emulate glowing light sources, glare, and camera [lens flares][wiki-flare]. They can be used in 3 ways:

1. By a [light](~) tag which may be attached to an object or effect. Lens flares belonging to attached lights on objects can be scaled by a function.
2. By a [sky](~) light, used for the cinematic looking camera lens flares on the sun.
3. By [shaders](~shader) which generate [BSP lens flares](~scenario_structure_bsp#lens-flare-markers) into a level for static light sources.

Lens flares usually contain one or multiple _reflections_, which are indices of a bitmap rendered along a _flare axis_ which passed through the flare and the center of the screen.

# Ray of Buddha

{% figure src="buddha.jpg" %}
_Ray of Buddha_ shining through an alpha-tested texture
{% /figure %}

The "Ray of Buddha" effect is a glowing disk of light that simulates light beams when obstructed by the BSP and objects within it (even by alpha-tested transparent textures like foliage). This effect will appear if either the [_sun_ flag](#tag-field-flags-sun) is set or [_occlusion radius_](#tag-field-occlusion-radius) is set to `50`.

Halo supports multiple Rays of Buddha drawing simultaneously, seemingly for as many lens flares can render.

The appearance of Ray of Buddha is partially hard-coded. You can change its radius using _occlusion radius_. The shape and fade of the flare are controlled by the [globals _glow_ bitmap](~globals#tag-field-rasterizer-data-glow). Its yellowish tint is hard-coded in the `sun_glow_draw.psh` FX shader.

# Related HaloScript
{% relatedHsc game="h1" tagFilter="lens_flare" /%}

# Structure and fields

{% tagStruct "h1/lens_flare" /%}

[wiki-flare]: https://en.wikipedia.org/wiki/Lens_flare