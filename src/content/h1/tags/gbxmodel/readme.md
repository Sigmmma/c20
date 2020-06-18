---
title: gbxmodel
tagName: gbxmodel
stub: true
img: warthog-nodes.jpg
imgCaption: The gbxmodel tag stores not only mesh data, but also markers, animation nodes, shader references, and more.
keywords:
  - model
---

The Gearbox model tag contains the render models (LODs) and [shader_model][] references for [objects][object] such as [vehicles][vehicle], [scenery][], and [weapons][weapon] among others. It is not collideable nor animated on its own, and objects may reference additional [model_collision_geometry][] and [model_animations][] tags.

Don't confuse this tag with the Xbox-only [model][], which Gearbox modified for the PC port. It is therefore used in all [derivatives][h1] of that port, like Mac, Demo, and MCC. Unlike the Xbox version, the Gearbox model uses uncompressed vertices.

# Shaders
Each "part" of a model can reference a different [shader][], like the Warthog's windscreen using a transparent shader while its body uses a [shader_model][]. While a model can _technically_ reference any kind of shader, referencing a [shader_environment][] (used for [BSPs][scenario_structure_bsp]) is **not recommended** because the game does not support all of its features and it renders incorrectly in fog in Custom Edition.

# Markers
...
