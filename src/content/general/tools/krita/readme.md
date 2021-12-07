**Krita** is a free 2D painting and image editing program. It is more similar to [Photoshop][] than to [GIMP][] and features advanced brushes, layers, and blending modes.

# Usage
Users familiar with Photoshop's _Channels_ window may be confused by Krita's, which shows the _output_ channels of the whole image and are not directly editable. The recommended document setup for Krita is to have a layer group containing all layers that comprise the texture, then giving that group a transparency mask layer to serve as the alpha channel:

1. Select all layers which should be in the group (exclude things like UV templates).
2. Press <kbd>Ctrl</kbd> + <kbd>G</kbd> to group them.
3. Right click the group and select _Add > Transparency Mask_. You can rename this mask layer to `alpha` if you want its purpose to be more obvious.
4. Right click this mask/alpha layer and select _Split Alpha > Save Merged_ to export your `.tif` file. Don't forget to set compression to _None_ since [Tool][h1a-tool] does not support deflate compression.


```.alert danger
Don't use _File > Export_ to save TIFF files because this method does not preserve RGB data where the alpha channel is black (transparent). Use the above process instead.
```