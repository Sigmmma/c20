---
title: Blam!
stub: true
---

Blam! is the proprietary game engine powering [Halo][h1]. It was developed in-house at Bungie and has undergone significant evolution over the series' expansion. According to a [Jason Jones interview][jones-interview], the engine has its roots in [Myth][]:

> Halo didn't begin as a strategy game but the engine it uses started out that way. The engine Halo uses began as a next-generation Myth terrain engine, with polygonal units.

By 2001's standards, the engine was fairly innovative and powerful, combining techniques like portal-based occlusion, radiosity, particles, AI and pathfinding, dynamic physics, advanced shaders, and a scripting engine.

# Architecture
For resource management, Halo loads [map cache files][map] which contain [tags][], the fundamental unit of resources.

...

# Other games
The Blam! engine was not just used for the Halo series. Bungie co-founder [Alex Seropian][alex] went on to found [Wideload Games][wideload] and used the engine for [Stubbs the Zombie in Rebel Without a Pulse][stubbs]. In fact, it is possible to extract [tags][] from Stubbs using [Refinery][mek] and recompile levels for Halo.

Another lesser-known use was in [prototyping Shadowrun gameplay][shadowrun-prototype] while its own engine was under development.

[stubbs]: https://en.wikipedia.org/wiki/Stubbs_the_Zombie_in_Rebel_Without_a_Pulse
[wideload]: https://en.wikipedia.org/wiki/Wideload_Games
[alex]: https://en.wikipedia.org/wiki/Alex_Seropian
[shadowrun-prototype]: https://www.youtube.com/watch?v=I-uJLTLqYpA
[jones-interview]: https://web.archive.org/web/20000815110240/http://www.insidemacgames.com/features/99/jones/jones.shtml
[myth]: https://en.wikipedia.org/wiki/Myth_(series)
