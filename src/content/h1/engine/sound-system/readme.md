# Sound cache
Like the [renderer's texture cache][renderer#texture-cache], the sound system also holds sound data in an in-memory _sound cache_. When a sound must be played that is not in this cache, it will be loaded from a [map cache file][map] (possibly a shared resource map) or the [tags directory][tags] depending on the build of the engine. The cache can hold a maximum of 512 entries or 64 MB.

The [predicted resources][scenario#tag-field-predicted-resources] block seen in some tag classes are meant to give the engine a hint about what sounds (and textures) should be cached.

# Channels
The engine has the following channel limits:

* 26 mono 3D channels
* 4 mono channels
* 4 stereo channels
* 4 44k stereo channels
