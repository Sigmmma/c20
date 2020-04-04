---
title: gbxmodel
template: tag
stub: true
---

The Gearbox model tag contains the render model and [shader_model] references for [objects][object] such as [vehicles][vehicle], [scenery][], and [weapons][weapon] among others. It is not collideable nor animated on its own, and objects may reference additional [model_collision_geometry][] and [model_animations][] tags.

Don't confuse this tag with the Xbox-only [model][], which Gearbox modified for the PC port. It is therefore used in all [derivatives][ce] of that port, like Mac, Demo, and MCC. Unlike the Xbox version, the Gearbox model uses uncompressed vertices.
