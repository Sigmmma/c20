---
title: shader_model
tagName: shader_model
stub: true
img: mc.jpg
imgCaption: The cyborg's body shader makes use of self-illumination, colour change masks, cubemapped specularity, and detail maps.
keywords:
  - model
  - gbxmodel
---
The shader_model tag is used for opaque materials on [object models][gbxmodel]. It supports features like map animation, detail maps, specularity, self-illumination, and colour change (e.g. for armour ranks/teams).

Singleplayer units have their colors set in their [actor_variant][] tags. In multiplayer, players' armor colors are [hard-coded][hard-coded-data#multiplayer-armor-colors].
