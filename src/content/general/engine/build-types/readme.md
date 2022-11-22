---
title: Halo engine build types
stub: true
keywords:
  - build
  - debug
  - release
  - assert
  - assertion
  - play
  - cache
  - tags
  - test
  - profile
  - beta
  - ship
redirects:
  - /h1/engine/build-types
---
The engine can be built with different features and checks enabled or disabled at compile time. 
This isn't something that can be done by the end user but it's worth knowing what features are enabled or disabled on the build you are using.

# Cache and tag builds

The Halo resource system is [quite flexible](http://nikon.bungie.org/misc/gdc2005_mnoguchi/) as it's capable of introspection and abstracted away from the code that uses the data, allowing for the dynamically generated UIs used in [Guerilla](~h1a-guerilla) and a lot of other neat features.

Two modes were implemented in H1.

## Tag

Resources are loaded from individual files stored on disk that can be edited using Guerilla. The data is validated on load and an error is shown on failure.

## Cache

Resources are loaded from cache files (sometimes referred to as "maps" because of their extension), these can't be easily edited and only go through minimal validation.


# Optimization options

Halo games in MCC support multiple levels of optimization depending on what features are needed, in decreasing order of optimization:

1. **release**: Used for the MCC itself and has minimal checks, no error logging and maximum optimizations. Invalid data will either be ignored or crash the engine.
2. **profile**: More or less the same as `release` but with some extra debug code.
3. **play**: Includes error logging and most [assertions](https://en.wikipedia.org/wiki/Assertion_(software_development)). Optimizations are still enabled for this build type. Invalid data will usually result in an error or a fatal error.
4. **test**: Includes more error checking and has optimizations disabled. AI debugging code is included at this level in H1A (used to only be included in debug builds).
5. **debug**: Includes full error checking and isn't optimized, this is used internally for development.

Legacy Halo 1 used different levels but the same general concepts apply.

# Conventions
The following convention is used when referring to the build type:
`<cache/tag>_<build_configuration>`

E.g. `cache_debug` refers to a *cache* build (loads resources from cache/"map" files) at the *debug* optimization level (no optimizations, full error checking).