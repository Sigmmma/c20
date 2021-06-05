The [H1A-EK][] includes a **standalone build** of that game (**halo_tag_test.exe**). This build doesn't include network functionality and it intended for testing single-player maps. It includes AI debugging code not included in other published builds of the engine.
[Using custom content paths][using-custom-content-paths] is supported. The UI works to a limited degree but loading maps is best done through `map_name`.

*Note: you need to use the full map name e.g. `levels\a30\a30` not a short name like `a10` as this is a tag build*

# Known issues

- Sound cuts out - ensure `framerate_throttle` is enabled, i.e. run `framerate_throttle 1` in the console.
- Low mouse sensitivity in vehicles - no known fix
