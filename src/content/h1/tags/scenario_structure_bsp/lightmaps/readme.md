---
title: Lightmaps
workflowName: Lightmaps
img: lightmaps_example.jpg
imgCaption: |
  Timberland's BSP with just lightmaps visible.
keywords:
  - lightmap
  - radiosity
---

Lightmaps are a special type of [bitmap][] referenced by the BSP which represents static lighting information. It is created using [Tool][], [LM_Tool][], [Aether][], or [Sapien][] by the **[radiosity][]** process. A second set of UV coordinates is generated for the entire renderable BSP and a texture is rendered to apply levels of light to those surfaces.

[Skies][sky], emissive [environment shaders][shader], [scenery][] with lights, and [light fixtures][device_light_fixture] can all be used as light sources to illuminate the BSP. Additionally, static objects like [scenery][] will cast shadows. Therefore you must to re-run radiosity any time these light sources change to see a change.

Beyond just affecting the surface colour, the lightmap also encodes<sup>(how?)</sup> the primary light direction for each vertex which determines the shadow directions for dynamic objects like [vehicles][vehicle] and [bipeds][biped].

# Related commands

* `rasterizer_environment_diffuse_textures 0`: Disables diffuse textures in the BSP, showing just the lightmap and specular components.

[radiosity]: https://en.wikipedia.org/wiki/Radiosity_(computer_graphics)
