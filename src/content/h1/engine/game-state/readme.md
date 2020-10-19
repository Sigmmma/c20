While [tags][] describe the behaviour and initial properties of game objects and systems, they do not describe their current state. For that, Halo maintains "tables" of game state data for players, objects, items, devices, effects, actors, and more. Additionally, other global game state values maintain the passage of time and map scripts.

When checkpoints are reached, game state is written to [savegame.bin][files#savegame-bin].
