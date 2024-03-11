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
  kornman00: Automatic door behaviour
---
**Machines** are used for objects like doors, elevators, light bridges, and the engine covers in _The Maw_. These objects have open and closed states and the unique capability of conveying [bipeds](~biped) which stand upon them while they move.

The states of machines are not synchronized over Halo's multiplayer [netcode](~), so it is not adviseable to include them in multiplayer maps unless they are automatic doors (which are just based on biped proximinity) or use a [synchronization workaround](~synchronization).

# Automatic doors
Rather than scripting every door to open and close by trigger volumes, you can use the automatic door feature. If a placed device_machine's [_does not operates automatically_](~scenario#tag-field-machines-machine-flags-does-not-operate-automatically) flag is _not_ set, and its tag has ["door" machine type](#tag-field-machine-type-door), it will automatically open and close when bipeds approach and leave it.

If the tag's [_automatic activation radius_](~device#tag-field-automatic-activation-radius) is non-zero, it controls the distance where the door opens. Otherwise the object [_bounding radius_](~object#tag-field-bounding-radius) is used instead. Up to 16 collideable [bipeds](~biped) (not [vehicles](~vehicle)) will be retrieved from the activation radius then checked for the following conditions:

* Is alive,
* Doesn't have the [_cannot open doors automatically_](~unit/#tag-field-unit-flags-cannot-open-doors-automatically) flag set,
* Is not an ally to the player standing on the forward side of a [one-sided door](~scenario#tag-field-machines-machine-flags-one-sided) in the fully closed position.

If one of these bipeds passes all the conditions, the device group desired position will be set to 1 which opens the door. 

This opening process is not actually performed every tick, but once every 4 ticks as an optimization, with different doors being offset to different ticks so they're not all checked at the same time. When an automatic door is triggered to open, its time spent open counter is set to -3 ticks.

Once a door has remained in the fully open position for its [door open time](#tag-field-door-open-time), its desired position is set to closed. This is checked every tick.

# Structure and fields

{% tagStruct "h1/device_machine" /%}
