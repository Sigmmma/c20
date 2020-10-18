**Reclaimer** is a [Python 3][python] library for modifying and creating Halo data formats like [h1/tags][], [JMS][], [maps][map], and more. It can be used to write Python scripts to inspect, edit, or generate tags programmatically where it might otherwise take hours of manual effort using a tag editor like [Guerilla][]. It is the foundation of the [Mozzarilla][] editor.

While mainly focused on Halo 1 and [OpenSauce][] formats, it also has limited support for [Halo 2][h2], Halo 3, Stubbs, and the Shadowrun prototype.

# Installation
The library must first be installed on your system using Python 3 `pip`. You may need to add the `--user` flag if you do not have permission to install globally:

```sh
pip install reclaimer
```

# Tags usage
## Loading tags
You can import tag definitions according to their [engine ID][tags#engine-ids], then load a tag file:
```python
from reclaimer.hek.defs.scnr import scnr_def

# load a scenario
scenario_path = "<path to a .scenario file>"
scenario_tag = scnr_def.build(filepath=scenario_path)
scenario_tag_data = scenario_tag.data.tagdata
```

## Reading and writing fields
The interesting part is actually inspecting and modifying `tag_data`. How this is done depends on the type of field being accessed. To see available field names, consult the [definition sources here][defs]. Field names will generally be `snake_case` versions of the field names seen here on c20's tag pages.

### Primitive types
Primitive field types like booleans and numerical values can be directly accessed:

```python
scenario_tag_data.local_north = 0.5
```

### Blocks
Whenever you need to index or iterate over members of a [block][tags#blocks], use the `STEPTREE` property:

```python
# move all spawn positions up by 1 world unit
for player_spawn in scenario_tag_data.player_starting_locations.STEPTREE:
    player_spawn.position.z += 1.0
```

### Enums
Enum fields have a `data` property which accesses the actual integer value used to represent the enum option. Aside from getting or setting this directly, you can also use a string representation:

```python
# print the raw value, e.g. 0
print(scenario_tag_data.type.data)
# get the string value, e.g. "singleplayer"
print(scenario_tag_data.type.enum_name)
# set the scenario type to 1
scenario_tag_data.type.set_to("multiplayer")
```
### Tag references
[Tag reference fields][tags#tag-references-and-paths] have multiple properties which can be set. Each reference stores both the _tag class_ and a _tag path_ to the referenced tag. The _tag class_ should not mismatch the actual referenced tag type:

```python
# this would print "hud_message_text"
print(scenario_tag_data.hud_messages.tag_class.enum_name)

# prints the tag class and paths of all referenced skies
for sky_block_item in scenario_tag_data.skies.STEPTREE:
    # each sky block entry is a single-field structure
    sky_reference = sky_block_item.sky
    # a reference contains a tag_class enum field, "sky" in this case
    print(sky_reference.tag_class.enum_name)
    # the tag path field, e.g. "sky\sky_d20\sky_start\sky_start"
    print(sky_reference.filepath)
```

## Saving tags
To save changes to a tag, use `serialize`. By default, it will create a backup file and use a temporary file to write changes unless you override both options with `False`:

```python
scenario_tag.serialize(backup=False, temp=False)
```

## Example: scanning tags
This script prints the _type_ field of every [bitmap][] tag in the tags directory.

```python
from pathlib import Path
from reclaimer.hek.defs.bitm import bitm_def

tags_dir = Path("<path to halo>/tags")

for bitmap_path in tags_dir.rglob("*.bitmap"):
    bitmap_tag = bitm_def.build(filepath=bitmap_path)
    tag_data = bitmap_tag.data.tagdata
    print(tag_data.type.enum_name)
```

## Example: modifying BSP data
This script modifies a [scenario_structure_bsp][] collision BSP and makes every surface a ladder.

```python
from reclaimer.hek.defs.sbsp import sbsp_def
tag = sbsp_def.build(filepath="<path to .scenario_structure_bsp file>")

tag_data = tag.data.tagdata
bsp_surfaces = tag_data.collision_bsp.STEPTREE[0].surfaces.STEPTREE

for surface in bsp_surfaces:
    surface.flags.climbable = True

tag.serialize(backup=False, temp=False)
```

The BSP tag's render model can also be updated, and can be found in the `lightmaps` block. This demonstrates accessing raw data which must be unpacked and repacked. You will also need to understand the format of raw data blocks by reading the relevant [tag definition source code][defs].

```python
from types import MethodType

# The string "<3f" means 3 little-endian floats
vert_unpacker = MethodType(unpack, "<3f")
vert_packer = MethodType(pack_into, "<3f")

for lightmap in tag_data.lightmaps.STEPTREE:
    for material in lightmap.materials.STEPTREE:
        vert_count = material.vertices_count
        vert_buffer = material.uncompressed_vertices.STEPTREE
        for i in range(vert_count):
            # each vertex has a position, normal, binormal, tangent, and texture coord (56 bytes total)
            verts_start_offset = i * 56
            # the first 12 bytes are the position floats
            verts_end_offset = verts_start_offset + 12
            # unpack the 3 floats from this offset range
            x, y, z = vert_unpacker(vert_buffer[verts_start_offset: verts_end_offset])
            # write the same values back
            vert_packer(vert_buffer, vert_offset, x, y, z)
```

[defs]: https://github.com/Sigmmma/reclaimer/blob/master/reclaimer/hek/defs/
[python]: https://www.python.org/
