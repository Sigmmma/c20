**Point physics** control how [particles][particle], [particle systems][particle_system], [weather][weather_particle_system], [flags][flag], [contrails][contrail], and [antenna][] interact with the environment. This includes wind, water, density, and collisions with the [BSP][scenario_structure_bsp]. Essentially anything that can be suspended in the atmosphere or water is simulated this way.

They are primarily controlled by density and friction parameters.

# Related commands
These commands are entered into the [developer console][developer-console].

```.table
tableDataModule: hsc/h1/debug
tableName: DebugFunctions
rowSortKey: slug
noClear: true
rowTagFilter: point_physics
```
