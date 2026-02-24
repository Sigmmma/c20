---
title: Materials overview
keywords:
  - materials
  - symbols
  - fog plane
  - clipping
  - playerclip
  - portal
  - ladder
  - breakable
thanks:
  Crisp: Explaining Foundry material exports
---
In your 3D tool like [Blender](~) or [3ds Max](~3dsmax), you will create **materials** and assign them to faces. Depending on the target game, certain properties of these materials will be included in your export to [JMS](~), [ASS](~), FBX, or GR2 format. These determine the **shader tags** that faces in your model will use, and any per-face properties related to collision, lighting, rendering, and more that the model type supports.

{% alert %}
It's important to understand that your 3D tool and Halo have _separate_ material systems. Your 3D tool can support arbitrarily complex shader node graphs and shading models with many inputs. Halo, however, uses shader tags to describe the physical properties and visual appearance of surfaces.

There is no strict requirement to assign reference textures to materials in your 3D tool; it's just to serve as a preview and assist in UV unwrapping.
{% /alert %}


## Early generation games
{% figure src="materials.jpg" %}
An example of some material names used for a level [BSP](~h1/tags/scenario_structure_bsp) in [Blender](~).
{% /figure %}

Halo 1 to Halo 3/ODST uses a **material naming convention**, where the name determines which _shader tag_ is used for those faces, and combinations of suffix symbols can apply properties related to collision, lighting, rendering, and more. As an example, the shader name `vines^` in H1 would be matched by Tool to a hypothetical `vines.shader_environment` in your tags folder and the `^` symbol would make those surfaces a climbable ladder.

Certain material names serve special purposes, such as `+sky` for rendering the skybox through it or `+portal` for defining [visibility portals](~portals-and-clusters).

Only the material _name_ is included in your [JMS](~) or [ASS](~) file, and these rules apply when Tool converts/imports them into tag form such as a level BSP or weapon model tag. You can use these naming conventions in both [Blender](~) and [3ds Max](~3dsmax).

The available features and specific conventions differ by game. Halo 2 also introduced the concept of _shader collections_. See below for more details:

* [Halo 1 materials](~h1-materials)
* [Halo 2 materials](~h2-materials)
* [Halo 3 materials](~h3-materials)

## Late generation games
{% figure src="foundry_materials.jpg" %}
Foundry's UI for materials.
{% /figure %}

In Reach, H4, and H2A, things work a bit differently. These games' asset pipeline goes through the GR2/Granny format and support extended data on exported materials. [Foundry](~) will include the material name (ignored by the game's tools) AND a _Halo Shader Path_ for each material, which you configure through Foundry's UI in Blender. The Halo Shader Path is a relative file path (not [tag path](~intro#tag-references-and-paths)) inside the tags folder, for example:

```
objects\vehicles\human\warthog\shaders\warthog_metal.shader
```

Properties traditionally supported by symbols and special material names are now mesh properties instead, though Foundry supports `+sky` and `+seamsealer` names for convenience.