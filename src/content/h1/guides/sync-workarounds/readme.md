---
title: Multiplayer synchronization workarounds
stub: true
keywords:
  - hack
  - sync
---
Because of the limitations of [netcode](~) in the Gearbox port, map authors have developed workarounds to synchronize game state between server and clients. These workarounds often take the form of **"biped crushers"** or **"script rooms"** -- hidden areas of the map where special scripted objects like vehicles and bipeds are used to coordinate state changes for unsynchronized objects like [device_machines](~device_machine) in multiplayer.

Note that automatic doors which open when players are nearby do not require synchronization workarounds, since player position _is_ part of the netcode.

# Biped crushers
[Bipeds](~biped) spawn on the client when spawned on the server, and die when killed on the server, though nothing else about them synchronizes. Because biped death is sent over the network, a map script running on the server can spawn a vehicle to [crush the biped][biped-crusher] and trigger an event for clients which detect the death of the biped via their map script.

[biped-crusher]: https://youtu.be/XKEACGigNb0?t=1461
