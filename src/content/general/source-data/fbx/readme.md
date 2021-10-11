This page will go over how to setup your scene to export FBX files for users who use 3D editing software with no available intermediate source file exporters. All rules of standard [JMS][jms], [animation source files][animation-data], and [ASS][ass] workflow in Blender or 3DS Max apply so be sure to read up on that.

# JMS
This section will cover how to prepare an FBX file for JMS conversion in tool.

## Region assignment
3DS Max uses named selection sets and Blender uses face maps to assign regions to a set of faces. The FBX file format doesn't store this kind of info so it instead uses the materials to assign regions through a special set of characters. To start get a material and append the following to the end like so:

![](regions.jpg "Assigning regions through multiple materials.")

The string `_atr_lpr_` will be used as a separator between the material name and the material properties. Set the material properties in the name like so:

## Halo 1 Material Format
```sh
# (MATERIAL_NAME)_atr_lpr_(REGION_NAME)
masterchief_atr_lpr_arms
masterchief_atr_lpr_body
masterchief_atr_lpr_legs
```

* MATERIAL_NAME - The name of our material
* REGION_NAME - The name of our region

You can create multiple materials with the same name but different regions to add multiple regions. The above example will give you one material named "masterchief" but 3 regions named "arms", "body", and "legs" that different parts of the model will use depending on what material they had assigned.

## Halo 2/3 Material Format
```sh
# (MATERIAL_NAME)_atr_lpr_(LEVEL_OF_DETAIL) (PERMUTATION_NAME) (REGION_NAME)
masterchief_atr_lpr_L5 base arms
masterchief_atr_lpr_L5 base body
masterchief_atr_lpr_L5 base legs
```

* MATERIAL_NAME - The name of our material
* LEVEL_OF_DETAIL - Set the level of detail for our mesh. The valid options are as follows.
    * L1 - Super low quality
    * L2 - Low quality
    * L3 - Medium quality
    * L4 - High quality
    * L5 - Super high quality.
    * L6 - Cinematic quality. Only used when forced through scripts.
* PERMUTATION_NAME - The name of our permutation
* REGION_NAME - The name of our region

In the example above will create a single material named `masterchief` with three different regions each having one permutation. All of these meshes belong to super high quality LOD. The combination a face uses will depend on the material it has assigned.

## Halo 2/3 Object Format
```sh
# (OBJECT_SYMBOL)(OBJECT_NAME)_atr_ptype_(OBJECT_TYPE)
$box_atr_ptype_box
$soccer_ball_atr_ptype_sphere
$canister_atr_ptype_capsule
$teapot_atr_ptype_mesh
```

* OBJECT_SYMBOL - The type of object this mesh is. Should always be "$".
* OBJECT_NAME - The name of our object.
* OBJECT_TYPE - The physics mesh type. The list is as follows.
	* box
	* sphere
	* capsule
	* mesh

## Blender armature support
The FBX converter will not take your armature unless it uses the Halo node prefix setup. All bones in an armature should start with the prefix "bip01_". The underscore can be a space if you rather have it like that. Rename the armature to "bip01" both on the object and object data name to ensure that it can find the skeleton properly.

![](skeleton.jpg "A proper Blender Armature for FBX conversion.")

# JMI

This section will cover how to prepare an FBX file for JMI conversion in tool.

## World Nodes
You only have two requirements for instance geometry to work properly. You must link the object data and the object name should start with a `%` symbol.

# JMA
This section will cover how to prepare an FBX file for JMA conversion in tool.

## Blender armature support
The FBX converter will not take your armature unless it uses the Halo node prefix setup. All bones in an armature should start with the prefix "bip01_". The underscore can be a space if you rather have it like that. Rename the armature to "bip01" both on the object and object data name to ensure that it can find the skeleton properly.

![](skeleton.jpg "A proper Blender Armature for FBX conversion.")

# ASS

This section will cover how to prepare an FBX file for ASS conversion in tool.

## Instance support
You only have two requirements for instance geometry to work properly. You must link the object data and the object name should start with a `%` symbol.

# Blender FBX export options
If you're exporting an FBX from Blender then there are a few options you should set before exporting to ensure you're getting what you're expecting. The options to set are as follows:

![](fbx_settings.jpg "Settings boxed in red should match what you have set for a proper FBX.")

* Add Leaf Bones - Find this option under Armature and disable it. This option will add new bones to the end of branches to terminate them. Bit of a problem since it changes your skeleton and the converter isn't going to fix it for you.
* Apply Scalings - Change this option from the default(All Local) to FBX Units Scale. This will prevent your exported models from being around 100x larger once converted than they were in your scene.

With this you are finally ready to export models from your scene to FBX so that you can convert them for ingame use. If you have any issues make sure you blame anyone but me.