---
title: shader_transparent_plasma
stub: true
about: 'tag:h1/shader_transparent_plasma'
img: plasma.jpg
caption: Plasma shaders can be dynamically offset from their surface.
thanks:
  crow: Renderer issue workaround
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
keywords:
  - spla
---
**Plasma shaders** are used for energy shield effects. They are mostly referenced as the _modifier shader_ of an [object](~) like a [biped](~), though the Sentinel biped instead references it via its [gbxmodel](~) (presumably because it uses a custom shape).

# Known issues
The original PC ports of Halo (H1PC and H1CE) include a number of [known renderer issues](~renderer#gearbox-regressions). On some PC hardware plasma shaders render incorrectly:

{% figure src="plasma-bad.jpg" %}
Notice how some areas of the plasma are cut off.
{% /figure %}

After the noise maps are sampled and blended, the resuling value is supposed to be mapped to transparent at high and low values and to opaque at midtones. Something about the shader math at this step is platform-dependent and results in half the values mapping to fully transparent instead of a blend.

The workaround is to duplicate the plasma shader and apply it in two layers. The duplicate shader should be identical except for using inverted noise bitmaps. It is **not necessary** to use this workaround in H1A because the shader has been fixed.

# Structure and fields

{% tagStruct "h1/shader_transparent_plasma" /%}
