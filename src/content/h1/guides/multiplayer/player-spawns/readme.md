---
title: Player spawns
---

# How Does the Player Spawn System Work?

The player spawn point selection logic in Halo: Combat Evolved is relatively straightforward. This is how it is described in the [Official Halo PC Editing Resource (Bungie)](http://nikon.bungie.org/misc/hek_tutorial/references/general/general_ld_info.html):

>The Halo spawning code is unique.  For Capture the Flag, the spawns do have the concept of team or side so players should never spawn in the enemy base or on the enemy side of the level.  For other game types, either team or non-team, the spawning code will try and spawn the player near friendly players and avoid spawning the player if an enemy player is within a certain distance of the spawn point.  If two or more spawn points are within the minimum distance stated above, then it is possible that a player will not be allowed to spawn at one of the neighboring spawn points if an enemy player spawns or has spawned at another neighboring spawn point (at least until they move out of the minimum safe distance).

In other words, a dead player will generally respawn at the spawn point closest to a living teammate. Therefore, in matches with smaller teams (for example, in 2v2 gametypes), living players have significantly greater individual influence over their teammate's spawn location. This is commonly exploited in competitive 2v2 Team Slayer (among other gametypes), in both offensive and defensive strategies.  

With a good understanding of a map's spawn points, an attacking player can predict an enemy's next spawn, or even deliberately keep an enemy alive to raise the chances of an unfavorable spawn. A defending player can use the same map knowledge to spawn their teammate in a safe or otherwise advantageous location. A player can stand within 1 world unit (3.048m or 10 ft) of a spawn point to block it, preventing their teammate from spawning there. An enemy player can block a spawn from further away, with the chance to block increasing starting from a distance of 5 world units (15.24m or 50 ft). 
&nbsp;  
{% alert type="info"%}
NOTE: Spawn point selection occurs a brief moment before the player spawns in
{% /alert %}

## Random Spawns

If there are no living teammates within 6 world units (18.288m or 60 feet) of any spawn points, the player will be granted a random spawn (simply known as a "random" among competitive players). Of course, this is always true during a free-for-all match, but it is also important for level designers to consider how this quirk applies to team-based matches. Over the years, the competitive 2v2 metagame has evolved to the point where players have memorized the "randoms" on popular maps. The knowledge of each map's "spawn tricks" is exploited to great effect at the top levels of play.

The areas *between* spawn points are typically fewer on smaller maps such as Chill Out or Prisoner (due to more spawn point influence "spheres" overlapping in a confined space), or can cover large areas of open maps such as Hang 'Em High. With careful and iterative spawn point placement, it is possible for level designers to regulate the placements of "randoms" in a map. Oversights in this regard can result in unforgiving spawn situations, particularly in cases where there aren't enough "randoms" for players to use in order to break out of "spawn traps." Conversely, if a map has too many "randoms" it becomes unpredictable and overly difficult to maintain map control. A balance can be struck by reserving the placement of "random" spawns for weaker areas of the map, and/or by placing them in risky locations to promote movement. This will vary on a case-by-case basis and should be tested thoroughly.

{% figure src="hh_randoms.jpg" alt="Hang 'em High random spawn areas" inline=true %}
These shaded areas covering much of the playable area in Hang 'Em High represent "random spawn" locations
{% /figure %}

It has also been discovered that there is a very small probability of what is referred to as a "random random." This is attributed to unexpected random spawns that cannot be explained using the basic spawn logic described above. In reality, there is a very small chance that any spawn in the map can be randomly selected, except those which are 100% blocked by another player. It is extremely rare to be granted a "random random" spawn, and as such, experienced level designers do not generally consider this phenomenon when evaluating spawn point placements in a map.

# Placing Spawn Points
{% figure src="prisoner_spawns.jpg" alt="Prisoner spawn points" %}
Player starting locations (spawn points) at "back wall" shown for all gametypes on Prisoner
{% /figure %}

Proper spawn placement is a fundamental element of balance and a major contributor to a map's replay value. While there is no exact science to spawn placement, there are a few tried-and-true principles to bear in mind. The spawn selection logic is directly related to the density of points placed, their locations, and even which gametypes they should apply for. For example, if spawn points are packed together too densely in a given location, it can be almost impossible for players to break out of a cycle of spawning and dying (commonly referred to as a "spawn trap"). With fewer spawn points, there is a higher likelihood of one or more being blocked or out of range, therefore increasing the chances of a random spawn. In a similar sense, note that spawns can be influenced through walls and floors/ceilings, so spawn points can be placed deliberately to raise the chances of a dead player being granted a safe spawn in an adjacent room.  

Be sure to use the Type dropdown selections for each Player Starting Location as a means of balancing spawns separately for Slayer, CTF, King of the Hill, etc. It is highly recommended to avoid simply using the same spawn points across all gametypes.  
&nbsp;  
&nbsp;

# Advanced Spawn Point Placement

The single most useful tool for any level designer wishing to fine-tune the spawn point placements in their map for competitive play is: good testers. It is of vital importance to listen to player feedback and study how the map is played. This can be easier said than done. Only the most dilligent players will fully reverse engineer the spawn points, and fewer still will be able to identify the "random" spawn zones in a level. However, it is exactly this type of emergent gameplay that provides a level with replay value. Because of this predicament, it can be difficult to get spawn point placements right, although it is easier now than ever thanks to some new community tools.  


## Halo Asset Blender Development Toolset

The [Halo Asset Blender Development Toolset](~halo-asset-blender-development-toolset) now allows level designers to import and export elements of a scenario tag in and out of a Blender scene. This means that Player Starting Locations can now be placed in Blender, allowing for a greater degree of precision over Sapien's primitive interface.  

{% figure src="spawn_placement_blender.jpg" alt="Spawn point placement in Blender" inline=true %}
Spawn points can now be placed in Blender with greater precision
{% /figure %}

In order to ensure you set up the Player Starting Location objects correctly in Blender, it is recommended to start by importing a scenario tag that already contains at least one spawn point. Then, review the gametype properites ("Type" dropdown menu selections in Sapien) by selecting the Player Starting Location object in Blender and navigating to Object Properties > Halo Object Properties > Halo Tag View. The object can then be duplicated and all resulting new objects should be renamed sequentially for consistency with other tools such as Sapien and Guerilla (for example: Player Starting Locations_1, Player Starting Locations_2, etc).  

A new scenario tag can now be created via export in Blender (File menu > Export > Halo Scenario). Before the scenario tag can be loaded in Sapien to validate the placements, first open it in Guerilla, scroll to the very bottom and fix the empty Structure BSP path (for reference: see any of the scenario tags included with the H1EK, or any scenario tag created naturally via Tool's `structure` command).

## H1 Spawn Tools

The [H1 Spawn Tools](~h1-spawn-tools) repository is a great resource for level designers who wish to fine-tune their spawn placements for competitive play (particularly 2v2 Team Slayer). With the included Spawn Shop Blender add-on, it's possible to generate a visual representation of the "randoms" geometry, which could otherwise take hours of testing to figure out. The add-on uses the Solidify modifier to add a thin shell around the BSP geometry in Blender, then reads the spawn point locations from a scenario file imported using the [Halo Asset Blender Development Toolset](~halo-asset-blender-development-toolset) and places "influence spheres" at each Slayer spawn point. A boolean operation is then used to cut out the areas of the shell that are within the influence radius of any spawn points, leaving only the parts representing random spawn areas. This "randoms" geometry can be used for reference when placing spawns points directly in Blender, and can even be compiled as a scenery object to allow players to visualize the random spawn zones in-game.

Also included is a custom spawn marker scenery object, which can be placed at each spawn point location. Level designers seeking the best quality feedback from competitive players can add both the "randoms" geometry scenery and spawn marker scenery objects to test builds. For detailed instructions, refer to the [H1 Spawn Tools GitHub repository](https://github.com/khstarr/h1-spawn-tools).

{% figure src="damnation_training_mode.jpg" alt="Damnation with spawn markers and randoms geometry" inline=true %}
H1 Spawn Tools includes a custom spawn marker scenery object, and the Spawn Shop Blender add-on that can generate "randoms" geometry
{% /figure %}

The Spawn Shop Blender add-on can even simulate in-game spawn selection logic in real-time, enabling level designers to set up various scenarios to test their spawn point placements throughout the map creation process. The Gameplay Simulation feature changes the opacity of the aforementioned "influences spheres" of each spawn point based on the location of the reference object selected (typically a Cyborg/Spartan reference model), indicating which spawn points are eligible for selection. In addition, an "enemy" reference model can be moved around the scene to block spawn points. 

{% figure src="spawn_shop_blender.jpg" alt="Blender scene with Halo Spawn Shop's Gameplay Simulation feature" inline=true %}
The Spawn Shop Blender add-on's Gameplay Simulation feature demonstrates the game's spawn selection logic based on the locations of "friendly" and/or "enemy" reference objects
{% /figure %}

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