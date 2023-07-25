---
title: Halo Editing Kit Plus (HEK+)
about: 'tool:HEKPlus'
img: hekplus.png
caption: Halo Editing Kit Plus splash logo
info: |
  * [Download](http://hce.halomaps.org/index.cfm?fid=2289)
keywords:
  - extract
  - tag
  - hek
  - plus
thanks:
  Mimickal: 'Basic info, some tag extraction bugs'
---
**Halo Editing Kit Plus (HEK+)** was a tool for extracting tags from Halo Custom Edition maps, as well as "protecting" maps to prevent tag extraction.

{% alert type="danger" %}
**HEK+ should not be used!** It introduces a number of issues to the tags it extracts. It has been completely replaced by [Refinery](~) and [invader-extract](~).
{% /alert %}

# Map protection
HEK+ could ["protect"](~map#protected-maps) maps to prevent tag extraction. It does this with controlled data corruption that allows H1CE to continue reading the map but causes errors in tag extractors which expect valid data. H1A cannot read these protected maps. [Refinery](~) has defeated this map protection scheme and can be used to extract maps protected with HEK+, but the extracted tags will be disorganized due to the loss of tag path data.

Map protection should never be used and is now viewed negatively in the community, which generally expects to be able to remix and port maps to their liking.

# Tag extraction errors
HEK+ does not extract all tags with the same values they were compiled into the map with. Certain tag field values are extracted with incorrect values, or fail to extract entirely. For this reason, HEK+ should never be used to extract tags.

Some extraction errors include:

* [weapon](~) zoom levels extracts as 256
* Sounds may be corrupted

{% alert %}
There are more issues than listed here. If you know of more, please add them!
{% /alert %}
