---
title: Game modes
keywords:
  - variant
  - game_variant
  - gametype
  - gametypes
  - game types
  - engines
  - ctf
  - slayer
  - oddball
  - king
  - koth
  - race
thanks:
  Conscars: Reversing game variant names
---
There are 5 base **game modes**, also called "game engines", which implement multiplayer game rules and scoring:

| Engine           | `game_variant` names
|------------------|--------------------
| King             | `king`, `team_king`, `crazy_king`, `classic_king`, `classic_king_pro`, `classic_crazy_king`, `classic_team_king`
| Oddball          | `oddball`, `team_oddball`, `classic_oddball`, `classic_team_oddball`, `classic_reverse_tag`, `classic_accumulation`, `juggernaut`, `classic_juggernaut`, `classic_stalker`
| Race             | `race`, `classic_race`, `classic_rally`, `classic_team_race`, `classic_team_rally`, `team_race`
| Slayer           | `slayer`, `team_slayer`, `classic_slayer`, `classic_slayer_pro`, `classic_phantoms`, `classic_endurance`, `classic_rockets`, `classic_snipers`, `classic_team_slayer`
| CTF              | `ctf`, `assault`, `classic_ctf`, `classic_ctf_pro`, `classic_invasion`, `classic_iron_ctf`, 

All gametypes are customizations of these base modes. To test game modes in [Standalone](~h1a-standalone-build), use one of the names above with the [game_variant](~scripting#functions-game-variant) function:

```console
game_variant ctf
map_name levels\test\bloodgulch\bloodgulch
```

Objectives like the CTF flags, oddball spawns, and hill boundaries depend on [scenario netgame flags](~scenario#tag-field-netgame-flags) placed using [Sapien](~h1a-sapien).

The UI localizations for these game variants are found in `ui\default_multiplayer_game_setting_names.unicode_string_list`.

# CTF
The CTF engine is responsible for controlling CTF and Assault games.

During initialization of a CTF game, all player spawn points are validated. If a spawn point is closer to the enemy team's flag than its own team's flag (or vice versa for Assault), its team index is set to `3` which prevents it from being used. If a level artist accidentally places the CTF flags in the wrong bases it can result in all spawn points being disabled and players being forever stuck "waiting for space to clear" rather than spawning.
