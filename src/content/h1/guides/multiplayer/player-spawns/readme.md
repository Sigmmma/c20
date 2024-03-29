---
title: Player spawns
---

{% alert %}
We haven't fully covered the placement of player spawn points on c20 yet aside from [some basics](~box-level#adding-spawn-points). See the classic [HEK tutorial](https://www.haloce.org/HEK_Tutorial/index.html).
{% /alert %}

# Troubleshooting "waiting for space to clear"
{% figure src="blocked_spawns.jpg" %}
The bounding radius of this custom turret vehicle is so high red team could not spawn in CTF.
{% /figure %}

Players who are unable to spawn will see the message "waiting for space to clear" with the camera at (0, 0, 0). Assuming you've placed spawn points, this has a variety of possible causes to check:

* No spawn points include the game mode you're playing on. Make sure [their types](~scenario#tag-field-player-starting-locations-type-0) aren't all set to `none`.
* You may be loading the level in singleplayer mode by accident. [See here](~box-level#testing-the-level) for help launching a level depending on your target game.
* If CTF, you may have placed the flags on the wrong side of the map which can [disable spawn points](~game-modes#ctf).
* There is an insufficient number of spawn points and players are blocking them all, or the map is too small.
* You may have custom objects in the level whose [bounding radius](~object#tag-field-bounding-radius) is too high. The game will consider spawn points within this radius to be blocked.