**Tags** are the resources which represent all assets and entities in the game. While the core mechanics are implemented in game code, nearly everything else is customized using tags. They come in many different types (called tag _classes_ or _groups_), each with a predefined structure and data fields. Tags can depend on other tags by [reference](#tag-references-and-paths), and are reusable between maps.

A playable level is represented by a [scenario][] tag and all of its dependencies, which can include the [vehicles][vehicle] which may spawn, any [scenery][] placed, and any [level textures][bitmap]. Bundles of tags required for a level are typically compiled into an optimized [map cache file][map], though certain builds of the Halo engine are capable of loading tags on-demand directly from the `tags` folder (e.g. Sapien or debug builds of Halo).

The name "tag" was inspired by [XML tags][about-xml], which also have types and a structure with fields. However, unlike XML, Halo's tags are a binary format rather than plain text. To create and edit tags, you need to use purpose-built tools like [the HEK][hek], [MEK][], or [Invader][].

# Differences between editions
Each edition of the game has a slightly different tag set in its maps. Be aware of this when extracting tags with [Refinery][] or [invader-extract][invader#invader-extract] or mixing tags.

* Some tag classes have fields which only apply in certain editions, for example the [MCC unit type][actor_variant#tag-field-mcc-unit-type].
* PC retail and Custom Edition are based on a slightly older version of Xbox tags, with the most famous difference being Keyes' uniform.
* Gearbox replaced [model][] with [gbxmodel][] and during the Xbox to PC port, and replaced instances of [shader_transparent_generic][] with [shader_transparent_chicago][] or other transparent shader classes.
* Gearbox made several changes to [damage_effect][] stuns in Custom Edition tags only.
* H1A in MCC restores [shader_transparent_generic][] functionality and Keyes' uniform.

# Tag structure
## Tag references and paths
A _tag path_ is like a URL for a tag. References from one tag file to another are stored as tag paths with an accompanying [engine ID](#engine-ids) for the type. For example, the path `levels\test\tutorial\tutorial` and engine ID `sbsp` is how the tutorial [scenario][] references its [BSP][scenario_structure_bsp]. Tag paths are assumed relative to a `tags` directory, but are not literal filesystem paths since they don't contain an extension.

Be careful when moving or renaming tag files; you may create "dead links" in other tags that referenced them. Either correct the broken references after moving tags, or use [invader-refactor][invader] to move tags safely.

When tags are compiled into a map, references are converted into pre-calculated pointers. An array of tag paths are still retained in the map but is not used by the game.

Tag paths also appear in arguments to [Tool][] and scripting.

## Blocks
A _tag block_ field, also known as a _reflexive_, is essentially a list of smaller data structures within a tag. An example is the [scenario][] tag containing a block of vehicle spawns points. In visual tag editors, blocks appear as a list of elements which are often editable by adding or removing elements. A block field internally consists of an item count and a pointer to an array of structures of the expected type.

## Engine IDs
To identity tag types in-engine and within tag data, Halo uses compact fixed-size (4 character) identifiers rather than the longer tag names/extensions seen in the [HEK][]. Some examples include `bitm` for [bitmap][bitmap], `snd!` for [sound][], and `DeLa` for [ui_widget_definition][]. These identifiers are case-sensitive and may be padded with trailing spaces.

## Unused tags and fields
The types of tags and their structures changed during the game's development. Evidence of this can be seen in Halo's engine, the HEK's tools and tags, and official maps.

For example, [Guerilla][] allows users to create new [spheroid][] tags despite them containing no fields and being totally useless. The [actor][] tag contains an unused [weapon][] reference and probably predates the creation of [actor_variant][], which references both.

## Invalid data
Not only were fields added and removed during development, but some were repurposed to different types without correcting existing tag instances. This has resulted in tags which shipped with Halo's maps containing some technically invalid data. The tag `warthog gunner.actor_variant` still contains a [projectile][] reference overlapping the space of 4 fields (starting with grenade type) in the final version of the tag structure.

Invalid data is common in extracted tags, either because they were already invalid or from using buggy tools like _HEK+_. Using invalid tags for new maps can produce undefined behaviour in-game and cause [Sapien][] to crash. A tag which works in Custom Edition may cause crashes in MCC.

Invalid tags can often be corrected by resetting fields and re-saving the tag using visual tag editors (e.g. [Mozarilla][mek], [Guerilla][]), or using [invader-bludgeon][invader].

## Padding
Fields are not always densely packed within a tag; sometimes there exists unused space between them without any known purpose. These spaces are often referred to as _padding_. Generally, any sort of data could be stored in these spaces without affecting the tags, and some community tools use this space to retain extra metadata.

[about-xml]: https://en.wikipedia.org/wiki/XML#Key_terminology
