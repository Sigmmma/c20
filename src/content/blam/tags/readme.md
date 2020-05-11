---
title: Tags
template: tagIndex
---

<figure>
  <a href="control-panels.jpg">
    <img src="control-panels.jpg" alt="Control panels in a10"/>
  </a>
  <figcaption>
    <p>Tags offer a lot of control, but there's also a lot to learn. Try to focus on one area at a time if you're new.</p>
  </figcaption>
</figure>

Tags are the fundamental unit of resources which comprise a [map][]. They come in many different types, each with a predefined structure and data _fields_. Tags can reference other tags, forming a tree-like structure of all resources necessary to compile a map.

The name "tag" was inspired by [XML tags][about-xml], which also have types and a structure with fields. However, unlike XML, Halo's tags are a binary format and not plain text. To create and edit tags, you need to use purpose-built tools like [the HEK][hek], [MEK][], or [Invader][].

# Tag structure
## Tag references and paths
Some tag fields are _references_ to other tags. In tools like [Guerilla][], these references are referenced by their _tag path_, which can be thought of like their "URL". For example, the tutorial scenario references its BSP with the path `levels\test\tutorial\tutorial`. Tag paths are not literal filesystem paths, but rather an abstract location which uniquely identifies an instance of a tag. The _type_ of the referenced tag known

When tags are compiled into a map, their references are converted into pre-calculated pointers. An array of tag paths are still retained in the map but is not used by the game.

## Blocks
A _tag block_ field, also known as a _reflexive_, is essentially an array header. The field consists of an item count and an internal pointer to an array of structures of an expected type. An example is the [scenario][] tag containing a block of [vehicles][vehicle]. In visual tag editors, blocks appear as a list of elements which are often editable by adding or removing elements.

## Engine IDs
To identity tag types in-engine and within tag data, Halo uses compact fixed-size (4 character) identifiers rather than the longer tag names/extensions seen in the [HEK][]. Some examples include `bitm` for [bitmap][bitmap], `snd!` for [sound][], and `DeLa` for [ui_widget_definition][]. These identifiers are case-sensitive and may be padded with trailing spaces.

## Unused tags and fields
The types of tags and their structures changed during the game's development. Evidence of this can be seen in Halo's engine, the HEK's tools and tags, and official maps.

For example, [Guerilla][] allows users to create new [spheroid][] tags despite them containing no fields and being totally useless. The [actor][] tag contains an unused [weapon][] reference and probably predates the creation of [actor_variant][], which references both.

## Invalid data
Not only were fields added and removed during development, but some were repurposed to different types without correcting existing tag instances. This has resulted in tags which shipped with Halo's maps containing some technically invalid data. The tag `warthog gunner.actor_variant` still contains a projectile reference overlapping the space of 4 fields (starting with grenade type) in the final version of the tag structure.

Invalid data is common in extracted tags, either because they were already invalid or from using buggy tools like _HEK+_. Using invalid tags for new maps can produce undefined behaviour in-game and cause [Sapien][] to crash. A tag which works in Custom Edition may cause crashes in MCC.

Invalid tags can often be corrected by resetting fields and re-saving the tag using visual tag editors (e.g. [Mozarilla][mek], [Guerilla][]), or using [invader-bludgeon][invader].

## Padding
Fields are not always densely packed within a tag; sometimes there exists unused space between them without any known purpose. These spaces are often referred to as _padding_. Generally, any sort of data could be stored in these spaces without affecting the tags, and some community tools use this space to retain extra metadata.

[about-xml]: https://en.wikipedia.org/wiki/XML#Key_terminology
