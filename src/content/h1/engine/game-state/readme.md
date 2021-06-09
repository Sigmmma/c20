**Game state** is the in-memory data which describes the state of the game world as it is simulated over time. It differs from [tags][] which, although they are also [loaded into memory][map#map-loading], describe static or initial properties of classes of game objects rather than the current properties of individual ones.

Game state also includes global data for systems like [scripting][] (script globals), multiplayer [game modes][game-modes] (scores), and [physics][physics-engine] (game speed and gravity) to name a few.

Most of this data is saved and loaded from [save files][files#savegame-bin].

# Datum arrays
Much of the game state is maintained in _datum arrays_, also called _tables_. Each entry (_datum_) in these arrays is used to store the current state of some object or effect.

Since the game world is dynamic, the datum count can rise up to a limit. The following limits are known:

|Table|Limit|
|-----|-----|
|[objects][object]|2048|
|cluster collidable object reference|2048|
|cluster noncollidable object reference|2048|
|collidable object cluster reference|2048|
|noncollidable object cluster reference|2048|
|cached object render states|256|
|[widget][object#tag-field-widgets]|12|
|[flag][]|2|
|[antenna][]|12 (raised to 24 in H1A)|
|[glow][]|8|
|glow particles|512|
|[light volumes][light_volume]|256|
|[lightnings][lightning]|256|
|[device groups][scenario#tag-field-device-groups]|1024|
|[lights][light]|896|
|cluster light reference|2048|
|light cluster reference|2048|
|[decals][decal]|2048|
|players|16|
|teams|16|
|[contrail][]|512|
|contrail point|1024|
|[effect][]|256|
|effect location|512|
|[particle][]|1024|
|[particle systems][particle_system]|64|
|particle system particles|512|
|object looping sounds|1024|
|[actor][]|256|
|swarm|32|
|swarm component|256|
|prop|768|
|[encounter][scenario#tag-field-encounters]|128|
|ai pursuit|256|
|object list header|48|
|list object reference|128|
|[hs thread][scripting#script-threads]|256|
|hs globals (includes "external globals", not just those in the level script)|1024|
|recorded animations|64|
