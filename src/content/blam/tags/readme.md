---
title: Tags
template: tagIndex
stub: true
---
Tags are the fundamental unit of resources which comprise a [map][]. They come in many different types, each with a predefined structure and data _fields_. Tags can reference other tags by their _tag path_, forming a tree-like structure of all resources necessary to compile a map.

The name "tag" was inspired by [XML tags][about-xml], which also have types and a structure with fields. However, unlike XML, Halo's tags are a binary format and not plain text. To create and edit tags, you need to use purpose-built tools like [the HEK][hek], [MEK][], or [Invader][].

# Tag structure
## Tag paths and references
Tags are referenced by their tag path, which can be thought of like their "URL". An example would be:

```
levels\test\tutorial\tutorial.scenario_structure_bsp
```

## Blocks
A _tag block_, also known as a _reflexive_, is a type of tag field which refers to one or more data structures elsewhere in the tag. The field consists of an item count and a pointer to an array of structures of an expected type. An example is the [scenario][] tag containing a block of [vehicles][vehicle].

## Unused tags and fields, invalid tags
The types of tags and their structures changed during the game's development. Evidence of this can be seen in Halo's engine, the HEK's tools and tags, and official maps.

For example, [Guerilla][] allows users to create new [spheroid][] tags despite them containing no fields and being totally useless. The [actor][] tag contains an unused [weapon][] reference and probably predates the creation of [actor_variant][], which references both.

Not only were fields added and removed during development, but some were repurposed (even to different types). This has resulted in tags which shipped with Halo's maps containing some technically invalid data. The game tends to be more forgiving, but extracted tags which are not corrected (e.g. with [invader-bludgeon][invader]) may cause [Sapien][] to crash. A tag which works in Custom Edition may not work when used in MCC.

## Padding
Fields are not always densely packed within a tag; sometimes there exists unused space between them without any known purpose. These spaces are often referred to as _padding_. Generally, any sort of data could be stored in these spaces without affecting the tags, and some community tools use this space to retain extra metadata.

[about-xml]: https://en.wikipedia.org/wiki/XML#Key_terminology
