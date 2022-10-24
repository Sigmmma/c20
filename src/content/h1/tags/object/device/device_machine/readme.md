---
title: device_machine
stub: true
about: 'tag:h1/device_machine'
img: c20-elevator.jpg
caption: c20's elevators are a large device_machine
keywords:
  - device
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
---
**Machines** are used for objects like doors, elevators, light bridges, and the engine covers in _The Maw_. These objects have open and closed states and the unique capability of conveying [bipeds](~biped) which stand upon them while they move.

The states of machines are not synchronized over Halo's multiplayer [netcode](~), so it is not adviseable to include them in multiplayer maps unless they are automatic doors (which are just based on player proximinity) or use a [synchronization workaround](~sync-workarounds).

# Structure and fields

{% tagStruct "h1/device_machine" /%}
