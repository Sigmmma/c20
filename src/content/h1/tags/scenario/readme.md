**Scenarios** are the main "root" tag representing a playable level. It is essential for defining all gameplay elements such as AI encounters, item spawns, multiplayer flags, [scenery][] locations, and other objects. It may reference one or multiple [scenario_structure_bsp][]. Level scripts, cinematics, and trigger volumes are also defined in this tag.

A scenarios can be compiled with its dependencies into a [map][]. Though [Tool][] will also will include [globals][], tag collections, and some UI tags automatically, the majority of a map's tags are direct or indirect dependencies of the scenario.


# Child scenarios
It is known that Bungie did not originally author singleplayer scenarios as a single tag, but used _child scenarios_ to break them up into multiple tags. Child scenarios are other scenario tags referenced by a parent scenario. During map compilation, [Tool][] merges child scenarios together.

It is impossible to recreate child scenarios though tag extraction tools like [Refinery][mek] and [invader-extract][invader], which can only extract the single merged scenario. This can result in issues:

* For c10's scenario, [Sapien's][sapien] limits are exceeded and a garbage collection message is spammed in the console
* Camera points, cutscene flags, and recorded animations may be duplicated if the extraction tool did not deduplicate them. This will prevent scripts from compiling. When extracting with Refinery, use the _"Rename duplicate camera points, ..."_ option to avoid this problem.

# Encounters
...
