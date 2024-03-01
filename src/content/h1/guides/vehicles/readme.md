---
title: Vehicles
stub: true
keywords:
  - tutorials
thanks:
  t3h lag: Animated weapon markers tip
  MosesOfEgypt: Wall-climbing vehicle tip
---

# Animated weapon markers
Since [vehicles](~vehicle) and [weapons](~weapon) fire from [markers](~gbxmodel#markers), and markers can be [animated](~model_animations), an animation which plays during a firing effect can be used to alternate fire between multiple locations or move through silos of a missile pod, for example.

# Wall-climbing vehicles
Vehicles can be made to drive up steep walls by adjusting their [physics](~) tag:

* The **ground friction** value must be sufficiently high (e.g. 0.4) so that the vehicle does not slip, but not too high or else it will be unable to drive.
* The closer that **ground normals** **k1** and **k0** are set to 1.0 and -1.0 respectively, the steeper the vehicle will be able to climb without powered mass points being disabled. For example, setting k1 to 0.999998 and k0 to -0.999998 results in a vehicle being able to climb nearly vertical surfaces.