---
title: model
stub: true
about: 'tag:h1/model'
keywords:
  - gbxmodel
  - mode
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
---
The model tag contains the render model and [shader_model](~) references for [objects](~object) such as [vehicles](~vehicle), [scenery](~), and [weapons](~weapon) among others. It is not collideable nor animated on its own, and objects may reference additional [model_collision_geometry](~) and [model_animations](~) tags.

**This tag is specific to Halo 1 for Xbox**, while the [gbxmodel](~) tag is the equivalent for the PC port and its derivatives like MCC. Unlike a Gearbox model, this tag's compressed vertices are copied into the map rather than uncompressed vertices. Note that compressed vertices can only address up to 42 nodes.

# Structure and fields

{% tagStruct "h1/model" /%}
