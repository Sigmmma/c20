The Gearbox model tag contains the render models (LODs) and [shader_model][] references for [objects][object] such as [vehicles][vehicle], [scenery][], and [weapons][weapon] among others. It is not collideable nor animated on its own, and objects may reference additional [model_collision_geometry][] and [model_animations][] tags.

Don't confuse this tag with the Xbox-only [model][], which Gearbox modified for the PC port. It is therefore used in all [derivatives][h1] of that port, like Mac, Demo, and MCC. Unlike the Xbox version, the Gearbox model uses uncompressed vertices.

# Shaders
Each "part" of a model can reference a different [shader][], like the Warthog's windscreen using a [shader_transparent_glass][] while its body uses a [shader_model][]. While a model can _technically_ reference any kind of shader, referencing a [shader_environment][] (used for [BSPs][scenario_structure_bsp]) is **not recommended** because it [renders incorrectly][renderer#pc-regressions] in Custom Edition.

# Markers
...

# Regions
Regions render in the order they are stored in the tag. When naming regions, consider that they will be sorted by name when compiled into the `.gbxmodel`. This can be important for [skyboxes][sky] and objects with multiple layers of alpha-blended transparent shaders which aren't [z-culled][z-buf] and need a correct sorting order to be explicitly defined, assuming the object is viewed mostly from one direction.

# Permutations
...

[z-buf]: https://en.wikipedia.org/wiki/Z-buffering
