**Scenarios** are the main "root" tag representing a playable level. It is essential for defining all gameplay elements such as AI encounters, item spawns, multiplayer flags, [scenery][] locations, and other objects. It may reference one or multiple [scenario_structure_bsp][]. Level scripts, cinematics, and trigger volumes are also defined in this tag.

A scenarios can be compiled with its dependencies into a [map][]. Though [H3 Tool][h3-tool] will also will include [globals][], tag collections, and some UI tags automatically, the majority of a map's tags are direct or indirect dependencies of the scenario.
# Child scenarios
Unlike in Halo 1, Bungie allows authoring scenarios as a single tag in [Halo 3][]

  ...
  