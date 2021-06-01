This page will go over how to setup your scene to export FBX files for users who use 3D editing software with no available JMS exporters. All rules of standard JMS workflow in Blender or 3DS Max apply so be sure to read up on that. The only other differences are assigning regions to your model and the export process. The differences are as follows:

## Region assignment

![](regions.jpg "Assigning regions through multiple materials.")

3DS Max uses named selection sets and Blender uses face maps to assign regions to a set of faces. The FBX file format doesn't store this kind of info so it instead uses the materials to assign regions through a special set of characters. To start get a material and append the following to the end like so:

`masterchief_atr_lpr_`

The string `_atr_lpr_` will be used as a separator between the material name and the region name. Now we can append the name of the region that the material belongs to like so:


`masterchief_atr_lpr_blam`

As you can see from the example above we have a material with the name of "masterchief" and any faces that use that material will be assigned to a region named "blam" You can create multiple with the same material name but different regions to add multiple regions like so:

```
masterchief_atr_lpr_blam
masterchief_atr_lpr_beep
masterchief_atr_lpr_end
```

This will give you one material named "masterchief" but 3 regions named "blam", "beep", and "end" that different parts of the model will use depending on what material they had assigned.

## Blender armature support

![](skeleton.jpg "A proper Blender Armature for FBX conversion.")

The FBX converter will not take your armature unless it uses the Halo node prefix setup. All bones in an armature should start with the prefix "bip01_". The underscore can be a space if you rather have it like that. Rename the armature to "bip01" both on the object and object data name to ensure that it can find the skeleton properly.

## Blender FBX export options
If you're exporting an FBX from Blender then there are a few options you should set before exporting to ensure you're getting what you're expecting. The options to set are as follows:

![](fbx_settings.jpg "Settings boxed in red should match what you have set for a proper FBX.")

* Add Leaf Bones - Find this option under Armature and disable it. This option will add new bones to the end of branches to terminate them. Bit of a problem since it changes your skeleton and the converter isn't going to fix it for you.
* Apply Scalings - Change this option from the default(All Local) to FBX Units Scale. This will prevent your exported models from being around 100x larger once converted than they were in your scene.

With this you are finally ready to export models from your scene to FBX so that you can convert them for ingame use. If you have any issues make sure you blame anyone but me.