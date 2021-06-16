The [H1A-EK][] includes a **standalone build** of that game (**halo_tag_test.exe**). This build doesn't include network functionality and it intended for testing single-player maps. It includes AI debugging code not included in other published builds of the engine.
[Using custom content paths][using-custom-content-paths] is supported.

The UI works to a limited degree but loading maps is best done through [`map_name`][scripting#functions-map-name]. *Note: you need to use the full scenario tag path e.g. `levels\a30\a30` not a short name like `a10` as this is a [tag build][build-types#tag].*

This build supports some of the same [arguments][arguments#arguments-list] that H1CE does, such as `-vidmode 2560,1440,120` to set resolution.

# Use cases
This build offers a number of benefits for testing over compiling cache files for H1A:

* Since it loads tags, you can edit tags then simply reload the map with `map_name` to see changes. Pair this with `game_save` to return to the same place. This is not quite real-time tag editing, but it's close.
* [Script stack space][scripting#stack-space-is-limited] is validated unlike release builds.
* You have access to **all** console functions and globals in a much more interactive environment than Sapien to help you troubleshoot your content.

# Known issues

* Sound cuts out - ensure `framerate_throttle` is enabled, i.e. run `framerate_throttle 1` in the console.
* Low mouse sensitivity in vehicles - no known fix
* Some AI may behave differently than in a cache build. For example, the sentinels during d40's Warthog run are inactive. Maps should always be finalized by testing in MCC itself.
