---
title: Netcode
thanks:
  Kavawuvi: Grenade underflow tip
  Vuthakral: Low damage sync tip
  gbMichelle: Grenade and projectile synchronization
---
**Netcode** is the means by which [game state](~game-state) is synchronized between server and clients in multiplayer and co-op. Xbox uses the [System Link Protocol][slink]. Gearbox netcode and derivatives of it are used for versions of the game _after_ Xbox, like Demo, Retail, Custom Edition, and MCC.

# Gearbox netcode
The Gearbox PC port netcode is _server-authoritative_, meaning the server is the ultimate source of truth and is where (most) hit detection and physics are simulated and transmitted to clients. While these processes are also simulated on the client side in a predictive fashion, server updates will always override client state. When there is a significant difference between server and client state, the client can experience desynchronization or "warping".

## Client-side hit detection
H1A/MCC uses client-side hit detection for some weapons (plasma rifle, sniper, and pistol) to avoid the need for _leading_, where you need to aim ahead of a target to account for latency. This is not exposed to the modding tools but rather hard-coded in the engine based on tag path. You can use [MCC CEA Client-Side Hit Detection Map Patcher](https://github.com/SnowyMouse/mcc-cshd-map-patcher) to force a map to fake all weapon tag paths as the pistol so they receive client-side hit detection.

## Client-side projectiles
Each [weapon tag](~weapon) can define if its triggers cause synchronized projectiles or not (the [_projectile is client-side only_](~weapon#tag-field-triggers-flags-projectile-is-client-side-only) flag). This can be used to reduce network traffic for inaccurate weapons with a high rate of fire where the lack of synchronization makes little difference. If client-side only, clients will still see that the weapon is firing, just that individual projectile directions and their detonations will not be synchronized.

Note that this is not the same as client-side hit detection. The server is still the authority here and is simulating the projectiles and their effects on the world.

Weapons with homing projectiles and projectiles which can attach (e.g. sticky grenades) should not use this flag.

## Known issues and limitations
* AI characters do **not** synchronize in Halo's netcode, only players. Bipeds which are placed in a map will appear duplicated for clients. Although early flights of MCC H1 synchronized bipeds in multiplayer, this feature was removed in the released version.
* The state of script-controlled [device_machine](~) objects is not synchronized, unless complex [synchronization workarounds](~synchronization) are used.
* Very small damage values (exact threshold unknown) do not seem to be synchronized -- for example, a player damage of 0.0001 will cause descoping in singleplayer but not multiplayer.
* Only player velocity is not synchronized, often causing desyncs when ejected from vehicles, pushed by explosions, or stunned by certain [damage_effect](~).
* Grenades are improperly synchronized when players die during the throwing animation -- the grenade will not appear to any clients, but will still explode in place and cause damage.
* Shield popping effects do not play in multiplayer because health is set directly rather than sent as damage.
* Vehicle health is not synchronized.
* Because grenade count is encoded as a four-bit signed integer, if a player exceeds 7 grenades then count will underflow to a negative value. Server mods and lua scripts (e.g. those used in SAPP or [Chimera](~) ) should not attempt to equip players with more than 7 grenades.
* A maximum of 511 network objects can be synchronized at any given time (index 0 is used to signal that an object is not networked, so the slot is left empty).
* BSP transitions do not synchronize.

[slink]: https://hllmn.net/blog/2023-09-18_h1x-net/