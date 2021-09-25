**Assembly** is a map cache editing tool that can be used to mod various Halo games from the 360 to MCC. This can be a neat way for quickly testing a feature by modifying game values in real time. A user can also save changes permanently to a cache file without the need to recompile the .map file in the editing kit. Support for certain features depends on the Halo game being modified.

Although directly editing map files can be convenient for simple edits, generally this workflow is discouraged and you should compile maps from edited tags.

* Map and tag formats may change over time as the game receives updates, meaning Assembly must be updated and your changes need to be reapplied.
* During regular map compilation, tags are post-processed to set additional fields needed by the game at run-time. Directly poking values in map files can miss this step.
* Mod tools and source tags are now available for most MCC titles, meaning it is easier than ever to just rebuild map files.

```.alert danger
Certain maps may need to be decompressed before they can be edited.
Use the decompressor in the tools dropdown if needed.
```
