**Weather particle systems** define the appearance of weather like rain and snow. They are assigned to [BSP clusters][scenario_structure_bsp#clusters-and-cluster-data] using [Sapien][h1a-sapien] and can be masked from localized areas using [weather polyhedra][scenario_structure_bsp#weather-polyhedra].

# Known issues
When the player is within a dense [fog][] with a nearby _opaque distance_, weather particles will stop drawing even if set for the cluster containing fog. Ensure the _opaque distance_ is sufficiently far away if weather particles in fog are desired.
