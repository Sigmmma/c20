**Point physics** control how [particles][particle], [particle systems][particle_system], [weather][weather_particle_system], [flags][flag], [contrails][contrail], and [antenna][] interact with the environment. This includes wind, water, density, and collisions with the [BSP][scenario_structure_bsp]. Essentially anything that can be suspended in the atmosphere or water is simulated this way.

They are primarily controlled by density and friction parameters.

# Related script functions and globals
The following are related [functions][scripting#functions] that you can use in your scenario scripts and/or [debug globals][scripting#external-globals] that you can enter into the developer console for troubleshooting.

```.table
id: functions-globals
dataPath:
  - hsc/h1/functions/functions
  - hsc/h1/globals/external_globals
linkCol: true
linkSlugKey: slug
rowSortKey: slug
rowTagFilter: point_physics
noClear: true
columns:
  - key: info/en
    name: Function/global
    format: text
```
