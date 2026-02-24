---
title: Tags
about: resource:h1/tags
icon: tag
img: control-panels.jpg
caption: Tags offer a lot of control, but there's also a lot to learn. Try to focus on one area at a time if you're new.
thanks:
  Kavawuvi: Information about invalid tags and tag headers
  Vaporeon: Information about modified stun values in Custom Edition
  Mimickal: Information about tag headers
---
**Tags** are structured data files used to define instances of the game's resources, like [vehicles](~vehicle), [weapons](~weapon), [bitmaps](~bitmap) and more. When working with tags you should understand the basics like [tag groups, references, paths, and blocks](~intro#tags).

Playable [maps](~) are built from [scenario](~) tags and all of their direct and indirect dependencies, plus [globals](~) and its dependencies. Certain builds of the Halo engine are capable of loading tags directly from the `tags` folder (e.g. Sapien or Standalone).

For H1, you can edit tags with purpose-built tools like the [H1A-EK](~h1-ek), [MEK](~), or [Invader](~). Use `invader-refactor` if you need to move tags and want to avoid tedious reference updates.

# Differences between editions
Each edition of H1 has slight differences to the tag set in its maps. Be aware of this when extracting tags with [Refinery](~) or [invader-extract](~) or mixing tags:

* Some tag classes have fields which only apply in certain editions, for example H1A's [actor metagame type](~actor_variant#tag-field-metagame-type).
* PC retail and Custom Edition include some older versions of assets compared to Xbox, with the most famous difference being Keyes' uniform. This is restored in MCC.
* Gearbox replaced [model](~) with [gbxmodel](~) during the Xbox to PC port, and replaced instances of [shader_transparent_generic](~) with [shader_transparent_chicago](~) or other transparent shader classes. MCC restores [shader_transparent_generic](~) use.
* Gearbox made several changes to [damage_effect](~) stuns in Custom Edition tags only.

# List of tag groups

{% dataTable
  dataPath="tags/h1"
  id="tags"
  rowSortKey="key"
  linkSlugKey="key"
  rowFilterKey="value"
  rowFilterExpr="NOT unused"
  columns=[
    {name: "Tag name", key: "key", format: "pageLinkRaw"},
    {name: "Group ID", key: "value/id", format: "code"},
    {name: "Parent", key: "value/parentName", format: "pageLinkRaw"},
    {name: "Purpose", key: "value/description/en"},
  ]
/%}

## Unused groups
The following tag groups are leftover from earlier in Halo's development and are unused or removed entirely from current versions. The tags are listed here in case you see references to them, but they can otherwise be ignored.

{% dataTable
  dataPath="tags/h1"
  id="tags"
  rowSortKey="key"
  linkSlugKey="key"
  rowFilterKey="value"
  rowFilterExpr="unused"
  columns=[
    {name: "Tag name", key: "key", format: "pageLinkRaw"},
    {name: "Group ID", key: "value/id", format: "code"},
    {name: "Parent", key: "value/parentName", format: "pageLinkRaw"},
    {name: "Purpose", key: "value/description/en"},
  ]
/%}

# Tag structure
## Unused tags and fields
The types of tags and their structures changed during the game's development. Evidence of this can be seen in Halo's engine, the HEK's tools and tags, and official maps.

For example, HEK Guerilla allows users to create new _spheroid_ tags despite them containing no fields and being totally useless. The [actor](~) tag contains an unused [weapon](~) reference and probably predates the creation of [actor_variant](~), which references both.

## Invalid data
Not only were fields added and removed during development, but some were repurposed to different types without correcting existing tag instances. This has resulted in tags which shipped with Halo's maps containing some technically invalid data. The tag `warthog gunner.actor_variant` still contains a [projectile](~) reference overlapping the space of 4 fields (starting with grenade type) in the final version of the tag structure.

Invalid data is common in extracted tags, either because they were already invalid or from using buggy tools like _HEK+_. Using invalid tags for new maps can produce undefined behaviour in-game and cause [Sapien](~h1-sapien) to crash. A tag which works in Custom Edition may cause crashes in MCC.

Invalid tags can often be corrected by resetting fields and re-saving the tag using visual tag editors (e.g. [Mozarilla](~mek), [Guerilla](~h1-guerilla)), or using [invader-bludgeon](~invader).

## Padding
Some tags contain unused space between fields called _padding_. Generally, any sort of data could be stored in these spaces without affecting the tags, and some community tools use this space to retain extra metadata.

## Header
All tag files ("loose tags") have a common header structure. This header makes up the first 64 bytes of data, and contains the following fields. All primitive fields are big-endian.

{% structTable
  entryModule="h1/tags/header"
  entryType="Header"
  showOffsets=true
  id="header"
  noEmbed=["TagEngineId"]
/%}

[about-xml]: https://en.wikipedia.org/wiki/XML#Key_terminology
