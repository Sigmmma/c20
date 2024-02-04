---
title: Assorted tips
thanks:
  t3h lag: Animated weapon markers tip
  MosesOfEgypt: Wall-climbing vehicle tip
redirects:
  - /h1/guides/sync-workarounds
---
This is a place for assorted map-making and modding tips which haven't grown enough to warrant a whole page yet.

# Animated weapon markers
Since [vehicles](~vehicle) and [weapons](~weapon) fire from [markers](~gbxmodel#markers), and markers can be [animated](~model_animations), an animation which plays during a firing effect can be used to alternate fire between multiple locations or move through silos of a missile pod, for example.

# Wall-climbing vehicles
Vehicles can be made to drive up steep walls by adjusting their [physics](~) tag:

* The **ground friction** value must be sufficiently high (e.g. 0.4) so that the vehicle does not slip, but not too high or else it will be unable to drive.
* The closer that **ground normals** **k1** and **k0** are set to 1.0 and -1.0 respectively, the steeper the vehicle will be able to climb without powered mass points being disabled. For example, setting k1 to 0.999998 and k0 to -0.999998 results in a vehicle being able to climb nearly vertical surfaces.

# Multiplayer synchronization
Because of the limitations of [netcode](~) in the Gearbox port, map authors have developed workarounds to synchronize game state between server and clients. These workarounds often take the form of **"biped crushers"** or **"script rooms"** -- hidden areas of the map where special scripted objects like vehicles and bipeds are used to coordinate state changes for unsynchronized objects like [device_machines](~device_machine) in multiplayer.

Note that automatic doors which open when players are nearby do not require synchronization workarounds, since player position _is_ part of the netcode.

# Biped crushers
[Bipeds](~biped) spawn on the client when spawned on the server, and die when killed on the server, though nothing else about them synchronizes. Because biped death is sent over the network, a map script running on the server can spawn a vehicle to [crush the biped][biped-crusher] and trigger an event for clients which detect the death of the biped via their map script.

[biped-crusher]: https://youtu.be/XKEACGigNb0?t=1461