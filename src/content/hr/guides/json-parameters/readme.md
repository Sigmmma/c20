Below is a list of the possible JSON parameters that can be included within the JSON files generated during the [FBX to GR2][hr-tool#fbx-to-gr2] process. Note that in order for any changes to JSON files to take effect, you'll need to save your changes and re-run `fbx-to-gr2`.

{% alert %}
NOTE: When manually editing a JSON, all properties should feature the prefix `bungie_`

For example: `"bungie_mesh_type": "_connected_geometry_mesh_type_physics"`
{% /alert %}

# Additional Info

## Group of Properties

Properties can be placed in certain groups. For example, "object level properties" define the properties of 3d objects, while "face level properies" group the parameters which affect only faces of objects. Use of group properties in the JSON file is unneeded, they are coventional.

## Valid for object_type

Defines the particular object_type for which a property can be used. For example the "marker_type" property is only valid for objects which use the object_type value: _connected_geometry_object_type_marker.

## Valid for particular subtype only

Defines the specific subtype of objects for which this property can be used. For example the mesh_portal_type property can only be used when an object has the mesh_type property with the parameter: _connected_geometry_mesh_type_portal

```.table
dataSource: params.yml
dataPath: parameters

columns:
  - key: name
    name: Name
    format: text
  - key: type
    name: Type
    format: text
  - key: values
    name: Values
    format: text
  - key: info
    name: Additional Info
    format: text
```