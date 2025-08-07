---
title: Objectives
img: obj_finished_ui.jpg
caption: Example of a fleshed-out objective UI filled with tasks
keywords:
  - AI
  - orders
  - tasks
  - zones
  - goal
thanks:
  odchylanie_uderzenia: writing and research
---
When AI is placed into a level, they are entirely without purpose and direction, giving them a [pathfinding](~) setup will allow them to move around, but they will likely not move around much outside of engaging in basic combat, in order to give the illusion of purpose and intelligence, as well as to give them direction; we use the objective system to set up tasks for AI to fill.

The objective system works on priority, as such AI will *always attempt* to move to a higher priority task and fill them. The AI fills tasks on the squad level, thus squads cannot be split up to fill different tasks and will only enter a task that can fit the entire squad.

AI units that lack an objective or a valid task are displayed with a green arrow over their head.

# Creation

When creating a new objective, you will be met with a new sapien UI, using this UI you may name your objective and set a default zone, and then from there you may create brand new tasks to fill the objective, or alter prior existing ones

{% figure src="obj_new_ui.jpg" %}
Pictured: The UI displayed when creating a new objective, and the box popup when assigning a default zone
{% /figure %}

The box saying "Add" is what will be used for adding new tasks, you can fill out the objective menu, when a task is selected and a default zone is selected for this objective, the game window will show all firing point areas, from which you can simply click to assign to the selected task.

# Tasks

Tasks represent the actual orders the AI is given, for example, telling the AI what firing position zones they are allowed to use and in what configuration, what attitude they should take as well as various properties and scripting variables.

When changing the order of tasks, with a task selected hold cntrl and then use your arrow keys to move the task, left and right may be used to nest and un-nest tasks within parent tasks (child tasks will have higher priority than parent tasks).

| Task color/text color | Description
|-------|----------
| Red overlay | Task is using the 'invalid' flag
| Light grey overlay | Task is using the 'single use' flag
| Dark grey overlay | Task is using the 'gate' flag
| Green outline | Task is using the 'LATCH ON' flag
| Red outline | Task is using the 'LATCH OFF' flag
| Red task name | Task is currently invalid due to conditions not being met, or the condition script failing to compile
| Blue condition text | Condition script has been edited but not yet compiled
| Red condition text | Condition script is invalid, needs to be corrected

## Flags and inhibitors

| Flag | Description
|-------|----------
| LATCH ON | Once this task's conditions are met, this task will stay enabled and will not disable, even if the conditions are not met
| LATCH OFF | Once this task's conditions are no longer met, this task will disable and will not re-enable, even if the conditions are met
| Gate | Task is marked as invalid to AI, AI will never enter this task, good option to use with parent tasks so only the children are open to AI
| Single Use | Once this task has been emptied of all AI after being entered, this task disables and stays disabled
| Suppress Combat | AI units with the "engage sync" flag enabled in their [style](~) tag will not engage targets unless attacked first, will watch and aim at targets however
| Active Camo | AI who enter this task become cloaked, and will not decloak unless they exit the task or die
| Blind |
| Deaf |
| Braindead |
| Magic Player Sight | Any AI who enter this task will be given the ability to see the player through all walls, seems to have a range limit to be activated, but once activated does not deactivate
| DISABLE | Disables this task entirely

| Groups | Description
|-------|----------
| Cover  | Prevents AI from initiaing cover behavior when inside this task
| Retreat |
| Vehicles |
| Grenades | Prevents AI from throwing grenades when inside this task
| Berserk | Prevents AI from initiating berserk behavior when inside this task, does not prevent melee or melee charge behavior
| Equipment |
| Pureform Ranged |
| Pureform Tank |
| Pureform Stalker |

| Difficulty | Description
|-------|----------
| Easy | Disables task on easy
| Normal | Disables task on normal
| Heroic | Disables task on heroic
| Legendary | Disables task on legndary

## Area types

| Area type | Description
|-------|----------
| Normal | This area is marked as a normal area that AI will navigate to and fight within
| Core | This area is marked for AI with the highest leadership within the squad, they will navigate and fight from these firing points
| Search | This area acts as an extended area AI can search to when looking for targets
| Goal | This area is treated as a goal, AI will actively try to reach this area at all costs, this trait can be combined with any of the prior ones

## Direction

With a task selected, holding the alt key and using right *and* left click in the game window, you can place two points that create an arrow, this arrow defines the direction the AI face when they are idle within this task.