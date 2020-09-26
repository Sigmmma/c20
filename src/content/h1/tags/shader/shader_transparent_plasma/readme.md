---
title: shader_transparent_plasma
tagName: shader_transparent_plasma
stub: true
img: plasma.jpg
imgCaption: Plasma shaders can be dynamically offset from their surface.
---
**Plasma shaders** are used for energy shield effects. They are mostly referenced as the _modifier shader_ of an [object][] like a [biped][], though the Sentinel biped instead references it via its [gbxmodel][] (presumably because it uses a custom shape).

# Known issues
The PC port of Halo includes a number of [known renderer issues][renderer#pc-regressions]. On some PC hardware, and always in MCC, plasma shaders render incorrectly:

<figure class="inline">
  <a href="plasma-bad.jpg">
    <img src="plasma-bad.jpg" alt=""/>
  </a>
  <figcaption>
    <p>Notice how some areas of the plasma are cut off.</p>
  </figcaption>
</figure>
