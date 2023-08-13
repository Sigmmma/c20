---
title: Krita
about: 'tool:Krita'
img: krita.jpg
caption: A BSP ground texture being painted in Krita.
keywords:
  - 2d
  - painting
  - drawing
  - texture
  - bitmap
  - sprite
  - picture
redirects:
  - /general/tools/krita
---
**Krita** is a free 2D painting and image editing program. It is more similar to [Photoshop](~) than to [GIMP](~) and features advanced brushes, layers, and blending modes.

# Usage
Users familiar with Photoshop's _Channels_ window may be confused by Krita's, which shows the _output_ channels of the whole image and are not directly editable. The recommended document setup for Krita is to have a layer group containing all layers that comprise the texture, then giving that group a transparency mask layer to serve as the alpha channel:

1. Select all layers which should be in the group (exclude things like UV templates).
2. Press {% key "Ctrl" /%} + {% key "G" /%} to group them.
3. Right click the group and select _Add > Transparency Mask_. You can rename this mask layer to `alpha` if you want its purpose to be more obvious.
4. Right click this mask/alpha layer and select _Split Alpha > Save Merged_ to export your `.tif` file. Don't forget to set compression to _None_ since [Tool](~h1a-tool) does not support deflate compression.

{% alert type="danger" %}
Don't use _File > Export_ to save TIFF files because this method does not preserve RGB data where the alpha channel is black (transparent). Use the above process instead.
{% /alert %}

## Exporting normal maps
Tool's generates a normal map when importing a greyscale texture with [_height map_ usage](~/h1/tags/bitmap#tag-field-usage-height-map). Sometimes it's better to generate your normal map in external software and import it directly, either to have more control or avoid banding on smooth gradients in the height map. Krita can convert a greyscale layer to a normal map using _Filter > Edge Detection > Height to Normal Map_. The XYZ setting you should use is **X+, Y-, Z+**.

One useful technique is generating multiple normal maps as different layers, then using the _Combine Normal Map_ blending mode to create the result. This allows you to separate large scale bumps from fine textures and control the opacity of each layer to adjust their contribution to the result.

Import normal maps as tags with _default_ usage rather than _height map_ to avoid Tool processing them as a height map.