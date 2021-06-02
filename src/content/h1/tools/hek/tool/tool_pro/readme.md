**tool_pro** was a community-modified version of [H1CE Tool][hek/tool] which extended the [map cache file size limit][map#map-file-size-limit] and vertex buffer beyond their defaults.

```.alert danger
Do not use tool_pro! It was found to contain malware that phones home, among other things.

If you need these increased defaults, use
[invader-build][invader#invader-build]. It supports these modifications natively
for more target engines (and does not contain malware).
```

# Hex edits
The following hex edits are required to replicate this behaviour:

* Change offset `0x53181` from `0x2D` to `0x34` (cache size)
* Change offset `0x54D5A` from `0x02` to `0x04` (vertex buffer)

These edits work with [OS_Tool][OpenSauce] as well.

# Malware
tool_pro was removed from Halomaps after Dennis reviewed it and found it to
contain malware that "phones home" during use.

