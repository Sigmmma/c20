---
title: Synchronization
redirects:
  - /h1/guides/sync-workarounds
---
Halo 1's asynchronous [netcode](~) is responsible for sending changes in state between server and client in multiplayer. This protocol can synchronize the state of objects like players, vehicles, weapons, and more to ensure players have a shared view of the game world. However, this protocol was not designed to support AI, manually controlled [devices](~device_machine), or scripted events. [Automatic doors](~device_machine#automatic-doors) which open when players are nearby are safe to use in multiplayer, since player position _is_ part of the netcode.

When multiplayer level designers include unsychronized features in their level, each player can end up with conflicting views of the world. For example, a light bridge which is controlled by a switch will only work from the point of view of the client using the switch. All other players will see it unchanged. For the most part, Halo is _server-authoritative_ meaning the server's view of the world is always "right". A _desync_ happens when clients have conflicting views with the server and they may see objects or themselves repeatedly warping between locations as their local simulation and baseline updates from the server fight for the object location.

To work around this limitation in the netcode, modders can employ clever scripting that uses events which _are_ synchronized to ensure otherwise unsynchronized state is shared across server and clients. These workarounds often take the form of "biped crushers" or "script rooms" -- hidden areas of the map where special scripted objects like vehicles and bipeds are used to coordinate state changes.

{% alert %}
Synchronization workarounds are applicable to [Custom Edition](~) only and H1A doesn't support them.
{% /alert %}

# Biped crushers
[Bipeds](~biped) spawn on the client when spawned on the server, and die when killed on the server, though nothing else about them synchronizes. Because biped death is sent over the network, a map script running on the server can spawn a vehicle to [crush the biped][biped-crusher] and trigger an event for clients which detect the death of the biped via their map script.

[biped-crusher]: https://youtu.be/XKEACGigNb0?t=1461