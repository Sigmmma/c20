---
title: detail_object_collection
about: 'tag:h1/detail_object_collection'
img: grasses.jpg
caption: >-
  Sprite grass is created using detail object collections in
  [Sapien](~h1-sapien).
thanks:
  Conscars: Testing tag fields
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
keywords:
  - dobc
---
**Detail objects** are 2D sprites which can be painted onto the BSP using [Sapien](~h1-sapien). They are used to add grass and other small details which fade in/out by distance. They can also take on the colour tint of the [shader_environment](~) base map where painted.

# Placement
You can paint detail objects into a BSP [using Sapien](~h1-sapien#detail-objects-painting). Some tips to keep in mind are:

* Avoid painting detail objects in BSP overlap areas since they may noticeably change during [BSP transitions](~scenario_structure_bsp#bsp-transitions).
* Use a low density; detail objects are not depth-sorted for rendering so dense clusters of them will appear to render out of order from certain viewing angles.
* Changes to the detail object tag require reloading Sapien to take effect. Some changes require repainting.

Detail objects are [stored in the BSP tag](~scenario_structure_bsp#tag-field-detail-objects) rather than the scenario, and it's easy to accidentally clear them. Activities which modify the BSP tag, like changing cluster properties (weather, background sounds), **will result in all detail objects being cleared**. You should usually leave painting detail objects until the end of level creation, once the BSP is finalized.

{% alert type="danger" %}
Both CE and H1A Sapien have a bug where loaded detail objects are incorrectly saved back to the BSP tag with their [_global z offset_](#tag-field-global-z-offset) added. This means opening the scenario and causing the BSP to be resaved (e.g. by painting more detail objects) will cause all previous detail objects to be shifted vertically by their Z offset. Changes to _just_ the scenario or resaving the BSP tag in Guerilla do not cause this. Again, leave painting detail objects to the end of level creation.
{% /alert %}

# Colour and lighting
Detail objects can pick up colour and shading from the local environment. Their final colour results from a combination of:

* Sampled shader [base maps](~shader_environment#tag-field-base-map) where painted,
* Sampled [lightmap](~lightmaps),
* The [_color override factor_](#tag-field-types-color-override-factor) (factor of base map tint),
* Random variation from [_minimum and maximum color_](#tag-field-types-minimum-color),
* The [_ambient color_](#tag-field-types-ambient-color).

This final colour is ["baked" into the BSP tag](scenario_structure_bsp#tag-field-detail-objects-instances-color) for each detail object instance. Changing any of the above inputs, including the level's lightmaps, requires relighting detail objects to calculate their new colour. You can do this in Sapien using {% key "Shift + Control + L" /%} while _Detail objects_ is active in the _Hierarchy window_.

# Cells
Detail objects are grouped into _cells_, which are 8x8 [world unit](~general/scale) axis-aligned boxes that exist only where detail objects have been painted. Cell boundaries always exist on multiples of 8 world units. The game will render details objects for any cells within 8 world units of the camera, so setting [_far fade distance_](#tag-field-types-far-fade-distance) higher than 8 will result in the detail objects abruptly disappearing when their cell is out of range.

You can visualize cell activity in Standaone with `debug_detail_objects`. Sapien will also display a blue bounding box around all cells which would be active from the point in the level where the cursor points.

Empty cells are removed when the BSP tag is saved in Sapien.

# Related HaloScript

{% relatedHsc game="h1" tagFilter="detail_object_collection" /%}

# Structure and fields

{% tagStruct "h1/detail_object_collection" /%}
