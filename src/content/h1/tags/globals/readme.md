The **globals** tag contains settings for player control, difficulty, grenade types, rasterizer data, the HUD, materials types, and more. In other words, things that only need to be defined once and are rarely edited.

This tag and its dependencies are also included in a [map][] when compiled, and the engine is [hard-coded to reference it][hard-coded-data#globals].

# Related script functions and globals
The following are related [functions][scripting#functions] that you can use in your scenario scripts and/or [debug globals][developer-console#debug-globals] that you can enter into the developer console for troubleshooting.

```.table
id: functions-globals
dataPath:
  - hsc/h1/functions/functions
  - hsc/h1/globals/external_globals
linkCol: true
linkSlugKey: slug
rowSortKey: slug
rowTagFilter: globals
columns:
  - key: info/en
    name: Function/global
    format: text
```
