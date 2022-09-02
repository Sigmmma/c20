# Reach JSON files

JSON files are automatically generated when the user first runs `fbx-to-gr2` on an fbx file. If a JSON file already exists, the recreate_json argument can be used to rebuild this.

Each exported FBX file will have a corresponding .json and .gr2 file. The purpose of the JSON file is to provide additional information needed by Tool in order to produce certain results. For example exporting an fbx with a single mesh with a prefix in its name of $ (e.g. $my_object) will when run through `fbx-to-gr2` result in a JSON file with the parameter `"bungie_mesh_type": "_connected_geometry_mesh_type_physics"`.

This information will be recorded in the .gr2 file. On import Tool will recognise that we are trying to import a physics mesh and create the resulting data (provided we have corrrectly set up the sidecar).

Please note that support for certain parameters being written to the JSON file (such as collision or physics) is limited. For most parameters, the user will need to add thse values by manually editing the JSON file.

JSON files have the following structure:

## nodes_properties:

- node properties represent non-mesh objects in our fbx. These used mostly for bones, markers, and world frames. 

## meshes_properties

- mesh properties contains a collection of every single mesh within our fbx file that is not being used as a marker or frame. These are used for bsp structures, render, collision, and physics models to name a few.

## material_properties

- material properties contains a list of all materials within an fbx file. Each material only ever has too parameter types: "bungie_shader_path"  and "bungie_shader_type". The shader path is a direct tag relative file path to the shader we want to use for this material. The shader extension (e.g. .shader) should be ommitted.

The shader type is taken from the extension of the shader we are referencing. Most of the time this will be "shader".

The shader type can be given a special property called "override". This allows us to override the functionality of all faces with this material. For example with the type set to "override" and the shader path set to: `bungie_face_type=_connected_geometry_face_type_sky` we can replace all materials of this name with the special sky material. 

Please note that an override shader can only have one property.