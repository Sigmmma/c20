**Glass transparent shaders** are used for [environmental][scenario_structure_bsp] and [model][gbxmodel] glass surfaces. This shader type is characterized by its various reflectivity and tint settings which let you control how the glass appears from different angles and how light passes through it.

# Known issues
In Custom Edition, glass shaders which use bump-mapped reflections [render incorrectly][renderer#gearbox-regressions]. Instead of using the intended reflection cube map, the renderer uses the _vector normalization_ bitmap from [globals][], causing reflections to be brightly multicoloured. This issue is fixed in H1A.
