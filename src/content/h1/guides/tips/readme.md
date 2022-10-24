---
title: Assorted tips
thanks:
  t3h lag: Animated weapon markers tip
  MosesOfEgypt: Wall-climbing vehicle tip
---
This is a place for assorted map-making and modding tips which haven't grown enough to warrant a whole page yet.

# Windows Virtual Store
Windows versions since Vista have included a security feature called the _Virtual Store_. It prevents applications from modifying or creating files in protected locations like `C:\Program Files (x86)\...` by transparently performing such operations in `C:\Users\%USERNAME%\AppData\Local\VirtualStore` instead.

As a result, some applications may end up with conflicting "views" of what files are actually present under the `Program Files (x86)\Microsoft Games\Halo Custom Edition` path. This poses a problem for Halo modding and the [HEK](~), which has traditionally used Halo's `data`, `tags`, and `maps` directories as editable workspaces. Users have experienced Halo loading incorrect versions of maps, and tag edits done in [Guerilla](~) not being visible to [Sapien](~). To avoid these issues, use one of the following workarounds:

* Take ownership of Halo's installation files. Right click the `Halo Custom Edition` folder, select _Properties_, and from the _Security_ tab change the owner to yourself. Once ownership has been taken, any conflicting files in the Virtual Store location above also need to removed.
* Permanently move Halo's installation directory out of `Program Files (x86)`, e.g. to `Desktop` or `Documents`.

# Animated weapon markers
Since [vehicles](~vehicle) and [weapons](~weapon) fire from [markers](~gbxmodel#markers), and markers can be [animated](~model_animations), an animation which plays during a firing effect can be used to alternate fire between multiple locations or move through silos of a missile pod, for example.

# Wall-climbing vehicles
Vehicles can be made to drive up steep walls by adjusting their [physics](~) tag:

* The **ground friction** value must be sufficiently high (e.g. 0.4) so that the vehicle does not slip, but not too high or else it will be unable to drive.
* The closer that **ground normals** **k1** and **k0** are set to 1.0 and -1.0 respectively, the steeper the vehicle will be able to climb without powered mass points being disabled. For example, setting k1 to 0.999998 and k0 to -0.999998 results in a vehicle being able to climb nearly vertical surfaces.
