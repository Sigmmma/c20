---
title: AI system
img: generic_fight.jpg
caption: Halo's AI system at work direction a fireteam of marines against a pack of brutes
keywords:
  - AI
  - Characters
thanks:
  odchylanie_uderzenia: writing and research
---

# Vocalization

AI in halo have the ability to vocalize and emote based on actions performed, via the [ai_dialogue_globals](~) tag and it's assosiated source files you can assign certain animations or voice lines to play based on AI actions, such as calling and throwing a grenade, reporting a fallen ally, announcing the entrance of the arbiter and raising your fist in anger, ect ect.

# Perception

AI in Halo, outside of scripting and specific task flags, do not have the ability to see through walls, they must be able to actually see their targets or hear them, AI hearing and visual specifics are set in the [character](~) tag as well as in [projectile](~) and [weapon](~) weapon tags for firing and detonation/impact sound levels.

# Leadership

Within an AI squad, the game will attempt to assign a leader unit, this is determined by the AI with the highest leadership value, this value is assigned in the [character](~) tag.

If multiple AI share the highest leadership value and there are subordinates in the squad then the highest treat each other as *peers*, if a squad lacks any leaders due to all AI sharing the same leadership value, then no leadership will be available for that squad. Leadership is filled at the squad level and the task level, if two squads enter the same task they will default to the highest ranking unit among both squads.

# Navigation

AI use a level-specific navmesh to move around the environment, this is set up via the tab in sapien to "generate all pathfinding data" based on your [pathfinding](~) setup, various hints and obstacles are dynamic and AI will attempt navigation to reach their destination or target, if an AI does not have pathfinding it will have a yellow triangle over their head.

# Danger and scariness

{% figure src="danger_values.jpg" %}
Pictured: From the AI globals section of the globals, we can see the various actions that contribute to the danger value an AI perceives
{% /figure %}

{% figure src="scare_value_8.jpg" %}
Pictured: In this example, the brute shown has a scariness value of 4 and his carbine adds 5, versus 7 for the masterchief biped and 10 for the sniper rifle, resulting in the brute perceiving a scariness of 8 from his target
{% /figure %}

Scariness is calculated by taking the scare value of the AI's biped and adding the scariness of the weapon they are holding, and then comparing it against their targets biped + weapon. 

Should the resulting scariness favor the other party by a specified value in the [character](~) tag then certain AI behaviors may be triggered, such as fleeing for grunts or other behaviors like covering. 

Danger is a set of values defined in the [globals](~) with preset actions that return a value, the AI can then use these values to determine actions such as fleeing, covering or evading.

# Combat status and alertness

AI in Halo 3 have levels of status that determine their action set and what they are currently doing or are going to do, we call these combat status' and their are 9 levels.

AI set to the player team will never fall below combat status 3, otherwise the lowest possible is determined by the global AI style tags for bunkering, assaulting and normal, these 3 styles are applied per task in [AI objectves](~objectives#tasks).

| Status | Description
|-------|----------
| 0 | Braindead, asleep
| 1 | idle
| 2 | Active but not in combat
| 3 | Active but no current targets (as far as the AI knows)
| 4 | Searching for a target
| 5 | Location of enemy known (unsure about this versus 6, also may apply if allies know where the enemy is but not this unit)
| 6 | Location of enemy certain (unsure)
| 7 | Enemy who can be seen (unsure about this versus 8, maybe applies to tasks that give AI magic sight)
| 8 | Direct line-of-sight on a target
| 9 | Someone in squad is taking fire from a target

# Organization

AI are spawned in as part of a squad, which is then composed of fireteams, each fireteam itself is composed of indivudal starting positions for each AI in it. Squads can then be organized into squad groups for the purposes of objective/script management, however sqauds themselves are the main entity used in gameplay and within scripting and objective purposes.

# Combat

When an AI enters combat their reaction time and if they can fire their weapon at this range is determined value values in the [character](~) tag, should the AI perform a dodge, be stunned, hard pinged or engage in a movement hint of some type, their accuracy bounds and firing pattern will be reset. 

Based on certain scenarios the AI can engage in many behaviors to aide them in battle and appearing lifelike, this can include action such as a drawn out wide-spanning search for a hidden target, lobbing a grenade at cover where an enemy is suspected, suppressing fire on cover where a target was just seen entering, shooting dead bodies, checking on dead allies and giving each other orders (such as throwing grenades or starting a search with the ordered AI). 

An AI without a valid [objective and/or valid task](~objectives) will have a green triangle over their head.

# Limitations

AI cannot move while throwing grenades, but they can throw a grenade and then initiate a jump and finish throwing the grenade while airborne, AI cannot melee while moving, outside of the movement the animation itself provides, AI cannot shoot or melee while jumping (jumppack brute leaps are a type of jump).