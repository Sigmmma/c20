**tool_pro** was a community-modified version of [H1CE Tool][hek/tool] which extended the [map cache file size limit][map#map-file-size-limit] and vertex buffer beyond their defaults.

```.alert danger
It is no longer necessary to use tool_pro. [invader-build][invader#invader-build] supports the same feature for more target engines.
```

# Hex edits
The following hex edits are required to replicate this behaviour:

* Change offset `0x53181` from `0x2D` to `0x34` (cache size)
* Change offset `0x54D5A` from `0x02` to `0x04` (vertex buffer)

These edits work with [OS_Tool][OpenSauce] as well.
