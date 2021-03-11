**Netcode** is the means by which [game state][game-state] is synchronized between server and clients in multiplayer. The Gearbox PC port netcode is _server-authoritative_, meaning the server is the ultimate source of truth and is where hit detection and physics are simulated and transmitted to clients. While these processes are also simulated on the client side in a predictive fashion, server updates will always override client state. When there is a significant difference between server and client state, the client can experience desynchronization or "warping".

# Client-side projectiles
Each [weapon tag][weapon] can define if its triggers cause synchronized projectiles or not (the "projectile is client-side only" flag). This can be used to reduce network traffic for inaccurate weapons with a high rate of fire where the lack of synchronization makes little difference. If client-side only, clients will still see that the weapon is firing, just that individual projectile directions and their detonations will not be synchronized.

Weapons with homing projectiles and projectiles which can attach (e.g. sticky grenades) should not use this flag.

# Known issues and limitations
* AI characters do **not** synchronize in Halo's netcode, only players. Bipeds which are placed in a map will appear duplicated for clients. Although early flights of MCC H1 synchronized bipeds in multiplayer, this feature was removed in the released version.
* The state of script-controlled [device_machine][] objects is not synchronized, unless complex [synchronization workarounds][sync-workarounds] are used.
* Very small damage values (exact threshold unknown) do not seem to be synchronized -- for example, a player damage of 0.0001 will cause descoping in singleplayer but not multiplayer.
* Only player velocity is not synchronized, often causing desyncs when ejected from vehicles, pushed by explosions, or stunned by certain [damage_effect][].
* Grenades are improperly synchronized when players die during the throwing animation -- the grenade will not appear to any clients, but will still explode in place and cause damage.
* Shield popping effects do not play in multiplayer because health is set directly rather than sent as damage.
* Vehicle health is not synchronized.
* Because grenade count is encoded as a four-bit signed integer, if a player exceeds 7 grenades then count will underflow to a negative value. Server mods and lua scripts (e.g. those used in SAPP or [Chimera][] ) should not attempt to equip players with more than 7 grenades.
* A maximum of 511 network objects can be synchronized at any given time (index 0 is used to signal that an object is not networked, so the slot is left empty).
* BSP transitions do not synchronize.
