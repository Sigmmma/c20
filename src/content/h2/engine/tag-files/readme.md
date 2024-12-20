---
title: H2 Tag File Layout
stub: false
icon: tag
keywords:
  - tag
  - development
  - cache
  - layout
  - Pytolith
thanks:
  num0005: Documented the tag file format for Halo 2 MCC, and published comprehensive dumped layouts.
  Opensauce Developers: Opensauce tag reader which documented pre-MCC tag layouts for Halo 2.
---

Halo 2 **tags** use a more complicated layout on-disk layout for tag files in order to support several tag versioning features Halo 1 did not support which allowed the developers to more easily add new tag fields during development without throwing away old work or having to manually upgrade all assets already created.

Each tag block can have multiple *"layout versions"* which can be completely different from each other. Additionally tag files themselves went through several iterations, resulting in some older tags storing data differently even when using the same layout version - this is referred to as *"engine version"*. It's important to note there is **in theory** no limit on what engine and layout versions combinations are possible in one tag, even if in practice as the stock tools always save a tag as the latest engine and layout version there are some limits on what a reader might need to handle.

This page cannot cover everything needed to read tag files/tag data, using an existing implementation is recommended if you want to understand the process better. [Pytolith] is likely the simplest Halo 2 tag reader implementation, while [OpenSauce][os_src] is a much more expansive set of Halo 2 tools but only supports Halo 2 Vista tags.

# Known Engine Versions

The following engine versions are know from oldest to newest

```python
class EngineTag(_Enum):
    # halo 1 types
    H1 = "blam"
    # halo 2 types
    H2V1 = "ambl"
    H2V2 = "LAMB"
    H2V3 = "MLAB"
    H2V4 = "BLM!"
    H2Latest = H2V4
```

# Fields

Most fields are just some scalar or vector [*value types*][value_and_ref_wiki], and are hence fairly self-documenting. A small number of types however are [*reference types*][value_and_ref_wiki] - which store their contents outside of the tag block *element* they are located in, or require some special handling depending on the engine version.

## Reference types

These fields only store a reference to other data which is located elsewhere in the tag file. All the tag elements for a given tag block are written contiguously on disk, with any data referenced located directly after the tag block element data. There is no on-disk information about the length of this data so in general to correctly parse **any data** in a tag you will need to parse **all** reference-valued fields. Data is ordered based on the order of the fields first and then the order of the elements. If you are familiar with [C multidimensional array order/row-major order][row_and_column_wiki] this is that with each element being a row.

### String ID/Old String ID

For the latest engine version these are identical reference types which store the string separately from the element. The value in the element itself is a u4 integer value which encodes the length of the string in the upper 8 bits and uses the lower 24 bits to index into an internal string table. The string is not null terminated.

Pseudo-code for reading the value of a string ID when iterating over reference-valued fields:
```python
def string_id_to_str(string_id):
     # decode string ID (lenght + numberical ID)
     length = (string_id >> 24) & 0xFF
     identifier = string_id & (0xFF << 24) # unused
     # read from the tag stream not element stream!
     value = tag_stream.read_string(length)
     return value
```

*However when using an old engine version "Old String ID" (<= EngineTag.H2V2) becomes a value-type which stores a 32-byte long null terminated string in the actual element itself!*

For cache-file builds the 4-byte string ID is always written.

### Tag Reference
This is a rather similar reference type to "string id", the following on-disk layout:
```python
# tag reference (editor) layout:
# 	tag: cc4, tag type
# 	path_pointer: u4, is invalid/garbage on disk
# 	path_length: u4
# 	tag_index: u4, is invalid/garbage on disk
```
This also has a different layout in cache-files, with only the tag and tag index sub-fields being included to reduce memory usage.

Confusingly the path in this case in null-terminated but the length stored on disk is the length *without* the null terminator.

### Tag Data

This is an all purpose field for storing arbitrary length data that is not described by the tag system. You will see this used for text data or bitmap data along other things.

```python
# tag data field:
# 	size: u4
# 	stream_flags: u4
#	stream_offset: u4
# 	data_ptr: u4
# 	definition_ptr: u4
```

The only value which appears to matter is the `size` which is the size of the tag data in bytes.

### Tag Block

```python
# tag block (editor) layout:
# 	count: u4
# 	elements: void* # invalid/garbage on disk
# 	defintion: void* # invalid/garbage on disk
```

If the tag block has a field-set header you should check if the number of sub-block elements matches the expected number stored here.


## Value types

### Vertex Buffer

In tag files this is a 32-byte value type, however in cache files it appears to be only 4-bytes long and is presumably some sort of reference-valued type.

### Pointer (Ptr) - MCC Only

This is a new field type added for MCC, it is effectively a pad who's length is the same as the native pointer type for the build being targeted. This will be 4-bytes in the editing kit/unpackaged tags and 64-bits for cache files built for Halo 2 MCC.

## Pad/Skip

These fields store data that isn't defined in the tag system and hence won't be byteswapped by it or displayed in tag editing tools. Generally speaking this is often data that is generated at runtime and may be invalid in tags stored on disk. Additionally some of these fields are annotated with either 'pd64' or 'pd32'. This is used to flag fields that are only defined for builds using 32-bit or 64-bit pointers respectfully and otherwise should be treated as zero-length.

Additionally a small number of fields are annotated with 'nuke', this indicates the data in the field is garbage on disk.

## Useless pad

Depending on the engine version this is equivalent to either a "pad field" or a zero-length field. Useless-pads were an older way of including empty space in the middle of a tag for future expansion which became obsolete once multiple layout versions and storing element length on disk was implemented.

You need to read useless pads if `engine_tag <= EngineTag.H2V3`. It is probably relatively safe to simply discard the information as this is what the game tools themselves will end up doing in the end.

## Structure (struct)

This is a field that describes another structure embedded inside the structure for a tag block. Structures have their own field-set headers similar to tag blocks which are written as a reference, but instead of the tag field data being written directly after the header it is contained inside the parent tag block element. Much like tag blocks the field-set header can be missing, in which case defaults are assumed in the same way. This allows existing fields to be refactored to be part of a structure in a backwards compatible way - even in the middle of a layout.

## Array

Somewhat like a structure but much simpler, the fields defined inside an array definition are repeated n-times. You need to read each individual field as you would in any other scenario.

# Field set header

Halo 1 did not include any headers for field data, which made versioning difficult as there was no way to know the layout of a tag once it was written. Halo 2 partially resolved this by including an explicit version (layout version) as well as an implicit length of element which allows new fields to be appended to the end of a layout while allowing old tags to still be loaded.

The field-set header also includes a 4 character tag which indicates it is a valid header. This is a backwards compatibility measure to ensure the tag reader can detect if the header is missing. Tags with one or more missing tag field headers are still supported with the tools assuming layout version 0 is used along with a default length calculated or a special version set manually for old tags without a fieldset header.

Tag blocks use the `tbfd` tag to mark field set headers, while tag structures use whatever tag is set for that structure in definitions or optionally `tsfd` but the second is a bad idea since it stops the tag reader from distinguishing multiple tag structures and can block adding new `struct` fields to existing tags that already have one. Compliant tag writers *should* also write the structure specific type but *may* accept the generic tag when reading.

```c
struct field_set_header
{
	int32_t tag; // magic value used to mark the header
	int32_t version; // layout version, is a int16_t in old engine versions
	int32_t count; // number of elements, is a int16_t in old engine versions
	int32_t element_length; // size of each element, is used for implicit (append-only) versioning of tag layouts 
}
```

If the engine version is `engine_tag <= EngineTag.H2V1` some of those fields are 16-bit integers not 32-bit.

# Appending to layouts

In general fields can be appended to the end of a tag layout without losing backwards compatibility as a compliant reader can simply get the length of an element from the field set header. If supporting ancient versions of a tag from before field-set headers is required this is of course going to be rather limited hence why only a small number of Halo 1 tags upgrade cleanly to Halo 2. The element length for old tags can be set manually in some cases to maintain support with Halo 1 and this was done in a few places.

# Access dumped tag layouts

You can access tag layouts dumped from the latest version of Halo 2 MCC on [Github][h2_tag_layouts], these are designed to work directly with [Pytolith].

[os_src]:  https://github.com/MirisWisdom/OpenSauce
[Pytolith]: https://github.com/num0005/Pytolith
[value_and_ref_wiki]: https://en.wikipedia.org/wiki/Value_type_and_reference_type
[row_and_column_wiki]: https://en.wikipedia.org/wiki/Row-_and_column-major_order
[h2_tag_layouts]: https://github.com/num0005/Halo2TagLayouts