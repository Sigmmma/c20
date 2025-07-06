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

## Flags



## Area types

| Area type | Description
|-------|----------
| Normal | This area is marked as a normal area that AI will navigate to and fight within
| Core | This area is marked for AI with the highest leadership within the squad, they will navigate and fight from these firing points
| Search | This area acts as an extended area AI can search to when looking for targets
| Goal | This area is treated as a goal, AI will actively try to reach this area at all costs, this trait can be combined with any of the prior ones

## Direction

With a task selected, holding the alt key and using right *and* left click in the game window, you can place two points that create an arrow, this arrow defines the direction the AI face when they are idle within this task.