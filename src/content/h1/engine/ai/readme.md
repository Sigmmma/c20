---
title: AI system
keywords:
  - pathfinding
  - ai
thanks:
  Chris Butcher: >-
    Quotes in article "The Artificial Intelligence of Halo 2" and GDC 2002
    slides in "The Integration of AI and Level Design in Halo"
  kornman00: Overview of AI pathfinding system
  gbMichelle: >-
    Discovering max pathfinding distance, following behaviour with firing
    positions
  Conscars: Reversing AI action names
---
{% figure src="ai.jpg" %}
AI firing positions and sight lines are shown for the b30 beach assault.
{% /figure %}

The **AI system** is the part of the game responsible for AI behaviour over short time scales. It is paired with [level scripts](~scripting) which give the AI broader or situational goals.

Halo's game design goals heavily influenced the AI system; [actors](~actor) are meant to be predictable rather than completely random, react to the player, have incomplete knowledge, and communicate their internal state via dialogue, animations, and focus of attention.

# Knowledge model
AI have an _individual knowledge model_ with "real" perception. They do not have complete knowledge of the battlefield but rather remember key objects and rely on cues like visibility and sound to track their enemy. This allows the AI to be fooled and act more believably.

## Props
AI maintain a list of tracked units called _props_, which are classified as into a few types like friends and enemies. The game state stores a pool of up to [768 props](~game-state#datum-arrays) to be shared among actors. Little is known about how props are used but they likely help with behaviours like [_avoid friends line of fire_](~actor#tag-field-flags-avoid-friends-line-of-fire).

# Behaviour
According to quotes from Halo's AI programmer _Chris Butcher_, certain AI behaviours are triggered by hard-coded conditions. For example, the Grunt behaviour of fleeing when their Elite is killed is hard-coded, likely based on the [actor type definition](~actor#actor-type-definitions). Marines have an individual behaviour to stand close, but not too close, to other Marines, giving the illusion of them working in groups.

## Actions
AI decide between 14 actions. The rules for selecting these and what behaviours belong to each action are not well understood.

| Action index | Action name |
|--------------|-------------|
| `0`          | none        |
| `1`          | sleep       |
| `2`          | alert       |
| `3`          | fight       |
| `4`          | flee        |
| `5`          | uncover     |
| `6`          | guard       |
| `7`          | search      |
| `8`          | wait        |
| `9`          | vehicle     |
| `10`         | charge      |
| `11`         | obey        |
| `12`         | converse    |
| `13`         | avoid       |

# Encounters and squads
In Halo1, AIs were grouped into encounters, which also contained a set of firing positions. Various subsets of this set were made available to the AI depending on the state of their encounter (have many of their allies been killed? Are they winning? Are they losing? This was a mapping that was created by a designer).

# Firing positions
_Firing positions_ are discrete locations stored in the [scenario's](~scenario) encounters where the AI can stand when trying to perform a spatial behaviour. They are _not_ pathfinding nodes, but rather a pathfinding _destination_. The AI will weigh and select firing positions based on a few factors:

* Line of sight
* Distance to target
* Proximity of cover
* Proximity of friends and enemies
* Obstructions and hazards like vehicles, grenades, etc.

For example, the AI may move to a firing position if it has a clear line of sight to an enemy's _presumed_ location (remember, AI have an incomplete knowledge model) and is in [the actor's desired range](~actor_variant#tag-field-desired-combat-range).

Firing positions are also used when AI are scripted to following a target with the [`ai_follow_*`](~scripting#functions-ai-follow-target-players) functions. They will move to firing positions with the same letter label that their target is near.

# Pathfinding
Pathfinding is the system which allows AI to navigate between locations. It relies in part on precomputed [BSP pathfinding data](~scenario_structure_bsp#pathfinding-data) and [object pathfinding spheres](~model_collision_geometry#pathfinding-spheres) to know available paths and possible obstacles.

When the AI wishes to navigate, this data and static obstructions like scenery are considered to create a "smoothed" path of nodes between source and destination, which the AI then follows. It is believed that the [A* pathfinding algorithm][a-star-wiki] is used at this phase. While following the path, dynamic obstructions like [units](~unit) may force the AI to make detours to continue to its next node but it does not need to recalculate the entire path.

On a more technical level, pathfinding spheres are projected to the AI's ground-plane at pathfinding time to become pathfinding _discs_.

The maximum pathfinding distance that Halo's engine permits is 3276.7 world units, an _extremely_ long distance. For reference, the distance between bases in Timberland is approximately 100 units. Halo 1 does not support pathfinding in moveable reference frames, unlike [Halo 2](~h2) for Scarabs.


[a-star-wiki]: https://en.wikipedia.org/wiki/A*_search_algorithm
