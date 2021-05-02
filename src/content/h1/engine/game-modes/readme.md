There are 5 base **game modes**, also called "game engine variants", which implement multiplayer game rules and scoring:

* King
* Oddball
* Race
* Slayer
* CTF

All gametypes are customizations of these base modes. Objectives depend on [scenario netgame flags][scenario#tag-field-netgame-flags] placed using [Sapien][].

# CTF
The CTF engine is responsible for controlling CTF and Assault games.

During initialization of a CTF game, all player spawn points are validated. If a spawn point is closer to the enemy team's flag than its own team's flag (or vice versa for Assault), its team index is set to `3` which prevents it from being used. If a level artist accidentally places the CTF flags in the wrong bases it can result in all spawn points being disabled and players being forever stuck "waiting for space to clear" rather than spawning.
