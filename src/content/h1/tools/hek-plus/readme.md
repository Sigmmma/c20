**Halo Editing Kit Plus (HEK+)** is a tool for extracting tags from Halo Custom Edition maps, as well as "protecting" maps to prevent tag extraction.

```.alert danger
**HEK+ should not be used!** It introduces a number of issues to the tags it extracts.

It has been completely replaced by [Refinery][] and [invader-extract][invader#invader-extract].
```

# Map protection
HEK+ can [protect][map#protected-maps] maps to prevent tag extraction. It does this with controlled data corruption that allows H1CE to continue reading the map. H1A cannot read these protected maps.

[Refinery][] has defeated this map protection scheme and can be used to extract maps protected with HEK+. The current day Halo: CE community also has a very negative view of map protection.

For all of the above reasons, map protection should never be used.

# Tag extraction errors
HEK+ does not extract all tags with the same values they were compiled into the map with. Certain tag field values are extracted with incorrect values, or fail to extract entirely. For this reason, HEK+ should never be used to extract tags.

Some extraction errors include:

* [weapon][] zoom levels extracts as 256

```.alert info
There are more issues than listed here. If you know of more, please add them!
```
