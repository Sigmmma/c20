Halo 3 includes a PBR-like shader that allows artists to convert their premade PBR assets to work with Halo 3's shader system. This guide will explain how to convert your existing PBR assets into Halo 3. 

# What is PBR?
Physically based rendering (PBR) is a way of rendering images that mimics how light works in the real world. Most modern game engines have a form of this method in there shading systems. 

# Halo 3's "PBR"
With the release of the weapon and vehicle skins update to Halo 3 MCC, 343 Industries implemented a new material_model called **cook_torrance_pbr_maps**. This allowed for the menu skins that were authored in PBR to be replicated in-engine when enabled. The material_model required a control map to render the shader correctly.

# Step 1: Creating a diffuse map

Halo 3 does not use Albedo maps. Instead it uses Diffuse maps, which is a combo of the Albedo map and Ambient Occulsion map. This way you can have baked shadows in your shader.

You will need two textures for creating a Diffuse map:

  - Albedo/Base Color
  - Ambient Occulsion


Conversion steps

1. Open up your Albedo map in your photo editing program. PICTURE GOES HERE
2. Create a new layer over your Albedo map.
3. Copy and paste your Ambient Occulsion map into the new empty layer.
4. Set the blend mode of the Ambient Occulsion to **Multiply**. PICTURE GOES HERE
5. Save your new Diffuse map as .TIF in your asset's bitmaps folder.

You now have a converted Diffuse map. Make sure to save a editable copy of the Diffuse map in case you wish to make changes later.


# Step 2: Creating a Specular map

**NOTE**: *If you have a texture set that does not include a **Metallic map**, you do not need to make a Specular map.*

You will need three textures for creating a Blam Specular map:

  - Metallic
  - Roughness
  - Ambient Occulsion


Conversion steps

1. Open up your Metallic map in your photo editing program.
PICTURE GOES HERE
2. Create a new layer over your Metallic map. 
3. Copy and paste your Roughness map into the new empty layer.
4. Press **Ctrl + I** to invert the Roughness map.
5. Set the blend mode of the Roughness map to **Lighten** PICTURE GOES HERE
6. Create a new layer over your inverted Roughness map.
7. Copy and paste your Ambient Occulsion map into the new empty layer.
8. Set the blend mode of the Ambient Occulsion to **Multiply** and the opacity to **75%**. PICTURE GOES HERE
9. Save your new Specular map as .TIF in your asset's bitmaps folder.    

And there you go, you should now have a working Specular map. Make sure to save a editable copy of the Specular map in case you wish to make changes later.
