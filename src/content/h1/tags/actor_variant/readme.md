An **actor variant** specializes an [actor][] by defining their use of weapons, grenades, their health, their color, and what equipment they drop. While the _actor_ tag defines common behaviour of an AI type and rank, the _actor variant_ adds additional variety in their appearance and weapon use.

# Burst geometry
A burst is a series of shots made at a target. The _burst geometry_ controls how the shots within a burst start and move over time.

At the start of every burst, the game picks a random _origin_ point horizontally near the target to fire at, either to the left or right. The AI will then correct their shots by _returning_ aim back towards the target over the course of the burst.

See the burst geometry fields in the [tag structure](#structure-and-fields) for more information.

# Firing patterns
_Firing patterns_ modify the burst geometry and ranged combat values depending on the actor's state:

* **New-target** is when the actor finds a new target to shoot at.
* **Moving** is when the actor is moving between [scenario firing positions][scenario#tag-field-encounters-firing-positions] while shooting.
* **Berserk** is when the actor is in a berserk state charging at the player.

The firing pattern multipliers (starting at _new target burst duration_) modify the default burst geometry and ranged combat values only when their value is non-zero.

# Change colors
The change colors block of the tag can be used to change armor color, which relies on the bipeds model's [shader_model][] shader(s) having a _multipurpose map_ with an alpha channel, which acts as a mask for color change. Using the _change colors_ block of this tag overrides the biped's color change permutations.

Halo randomly interpolates between the upper and lower bound colors, in either RGB space or HSV if the _interpolate color in HSV_ flag is checked. This gives the Flood their varying skin tones, for example.

If you are looking for multiplayer armor colors, [see here][hard-coded-data#multiplayer-armor-colors].
