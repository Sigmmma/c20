The [H1A-EK][] includes a **standalone build** of that game (**halo_tag_test.exe**). This build doesn't include network functionality and it intended for testing single-player maps. It includes AI debugging code not included in other published builds of the engine.
[Using custom content paths][using-custom-content-paths] is supported.

The UI works to a limited degree but loading maps is best done through [`map_name`][scripting#functions-map-name]. *Note: you need to use the full scenario tag path e.g. `levels\a30\a30` not a short name like `a10` as this is a [tag build][build-types#tag].*

# Known issues

* Sound cuts out - ensure `framerate_throttle` is enabled, i.e. run `framerate_throttle 1` in the console.
* Low mouse sensitivity in vehicles - no known fix
* Some AI may behave differently than in a cache build. For example, the sentinels during d40's Warthog run are inactive. Maps should always be finalized by testing in MCC itself.
