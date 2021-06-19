The **globals** tag contains settings for player control, difficulty, grenade types, rasterizer data, the HUD, materials types, and more. In other words, things that only need to be defined once and are rarely edited.

This tag and its dependencies are also included in a [map][] when compiled, and the engine is [hard-coded to reference it][hard-coded-data#globals].

# Related commands
These commands are entered into the [developer console][developer-console].

```.table
tableDataModule: hsc/h1/hsc
tableName: Functions
rowSortKey: slug
noClear: true
rowTagFilter: globals
```
