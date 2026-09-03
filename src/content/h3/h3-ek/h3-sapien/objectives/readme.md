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

Within the hierarchy view window in [Sapien](~h3/h3-ek/h3-sapien) under AI you will see a tab for Objectives, clicking this tab you can then click the "New Instance" button to create a brand new blank objective, keep in mind adding a new objective will delete all AI.

When creating a new objective, you will be met with a new Sapien UI, using this UI you may name your objective and set a default zone, and then from there you may create brand new tasks to fill the objective, or alter prior existing ones

{% figure src="obj_new_ui.jpg" %}
Pictured: The UI displayed when creating a new objective, and the box popup when assigning a default zone
{% /figure %}

The box saying `Add` is what will be used for adding new tasks, you can fill out the objective menu, when a task is selected and a default zone is selected for this objective, the game window will show all firing point areas, from which you can simply click to assign to the selected task.

# Tasks

Tasks represent the actual orders the AI is given, for example, telling the AI what firing position zones they are allowed to use and in what configuration, what attitude they should take as well as various properties and scripting variables.

When changing the order of tasks, with a task selected hold {% key "Ctrl+Arrow Keys" /%} to move the task, left and right may be used to nest and un-nest tasks within parent tasks (child tasks will have higher priority than parent tasks) while up and down move the task higher and lower in priority (or swap the parent and child relationship between tasks)

| Task color/text color | Description
|-------|----------
| Red overlay | Task is using the `invalid` flag
| Light grey overlay | Task is using the `single use` flag
| Dark grey overlay | Task is using the `gate` flag
| Green outline | Task is using the `LATCH ON` flag
| Red outline | Task is using the `LATCH OFF` flag
| Red task name | Task is currently invalid due to conditions not being met, or the condition script failing to compile
| Blue condition text | Condition script has been edited but not yet compiled
| Red condition text | Condition script is invalid, needs to be corrected
| Green task name | Task is currently active and in use
| Red task name | Task is currently disabled
| Grey task name | Task is inactive due to a condition being met

# Flags and inhibitors

| Flag | Description
|-------|----------
| LATCH ON | Once this task's conditions are met, this task will stay enabled and will not disable, even if the conditions are not met
| LATCH OFF | Once this task's conditions are no longer met, this task will disable and will not re-enable, even if the conditions are met
| Gate | Task is marked as invalid to AI, AI will never enter this task, good option to use with parent tasks so only the children are open to AI
| Single Use | Once this task has been emptied of all AI after being entered, this task disables and stays disabled
| Suppress Combat | AI units with the `engage sync` flag enabled in their [style](~) tag will not engage targets unless attacked first, will watch and aim at targets however
| Active Camo | AI who enter this task become cloaked, and will not decloak unless they exit the task or die
| Blind | Needs testing
| Deaf | Needs testing
| Braindead | Needs testing
| Magic Player Sight | Any AI who enter this task will be given the ability to see the player through all walls, seems to have a range limit to be activated, but once activated does not deactivate
| DISABLE | Disables this task entirely

| Groups | Description
|-------|----------
| Cover  | Prevents AI from initiating cover behavior when inside this task
| Retreat | Prevents AI from initiating retreat/flee behavior when inside this task
| Vehicles | Needs testing
| Grenades | Prevents AI from throwing grenades when inside this task
| Berserk | Prevents AI from initiating berserk behavior when inside this task, does not prevent melee or melee charge behavior
| Equipment | Prevents AI from using or deploying equipment when inside this task
| Pureform Ranged | Needs testing
| Pureform Tank | Needs testing
| Pureform Stalker | Needs testing

| Difficulty | Description
|-------|----------
| Easy | Disables task on easy
| Normal | Disables task on normal
| Heroic | Disables task on heroic
| Legendary | Disables task on legendary

# General properties

| Movement | Description
| -------- | -------
| default | AI will default to walking, unless they are already alert, then they will run
| walk | AI will walk into this task with weapons stowed in combat status 1 (Assuming they haven't been alerted prior)
| run | AI will run into this task while in combat status 3
| crouch | AI will crouch into this task while in combat status 3

| Follow | Description
| -------| -------
| none | Units in this task will not follow anyone
| player | Makes units in this task follow the player throughout areas in this task
| squad | Make units in this task follow the _follow squad_ option below throughout areas in this task
| lead player | Needs additional research

| Fields | Data type | Description
|--------|-----------|------
| Follow squad | Selection | This field allows you to select one of the squads in the scenario, note that self-following squads will crash sapien
| Follow radius | Real | Assumed in WU, the radius in which to follow the target
| Entry script | String | The script to run when this task is entered
| Command script | String | Allows you to set a command script that will be fired when a squad enters this task, on all the units of the squad that enters
| Exhaustion script | String | The script to run when this task has become invalid due to a condition
| Squad group filter | Selection | This field accepts a created squad-group entry to filter entry into this task
| Dialogue Type | Enum | A selection of pre-defined dialogue responses that a unit will play when it enters this task

# Pureform distribution

| Field | Data type | Description
|-------|-----------|--------
| num ranged | int | Unknown, seems to force a transformation into this number of ranged pure forms when flood pureform units enter this task
| num tank | int | Unknown, seems to force a transformation into this number of tank pure forms when flood pureform units enter this task
| num stealth | int | Unknown, seems to force a transformation into this number of stalker pure forms when flood pureform units enter this task

# UI controlled

For this section, almost everything here can be done via the objective GUI window

## Activation Script

Don't use the properties window in Sapien to modify this, it will not save. This section handles data related to scripting functions used inside a task, you can use scripting to define when a task becomes active or inactive, any changes made to this script must be saved and then compiled.

name (string): The name of this task

## Conditions

| Field | Data type | Description
|-------|-----------|------------
| lifetime count | int | After this number of units has entered this task, mark the task to become inactive the moment it becomes empty
| filter flag | flag | This flag detetmines if the filter flag below is actually in effect
| filter | enum | Sets a pre-defined filter that blocks anything *but* the filter target, if a squad contains a foridden unit the entire squad is locked out
| capacity | int | The forced number of units in a squad in order to enter this task, if a squad does not fall within the bounds, it cannot enter this task (killing units does work to reduce the squad size)
| max body count | This task becomes inactive after this number of units inside the task have died
| style | enum | Use the objective UI to set this, allows you to set the preferred global style tag for AI who enter this task, vanilla uses `normal`, `bunkering` and `assaulting`
| min strength | real | This task will become inactive when a squad that enters it loses enough members to fall below this percentage of

## Areas

With a task selected, you can cursor in the game window to available areas within the zone you have defined for this objective, and then select areas to be assigned to your current task. Ideally you won't ever need to touch these fields and flags manually as almost everything can be handled via the gamewindow and hotkeys.

| Area type | Hotkey | Visual | Description
|-----------|--------|--------|-------
| Normal | {% key "Click" /%} | White overlay | This area is marked as a normal area that AI will navigate to and fight from
| Core | {% key "Shift+Click" /%} Again | Pink overlay | This area is marked for AI with the highest leadership within the squad, they will navigate to and fight from these firing points
| Search | {% key "Shift+Click" /%} | Green overlay | This area acts as an extended area AI can search within when looking for targets
| Goal | {% key "Ctrl+Click" /%} | Pink border | This area is treated as a goal, AI will actively try to reach this area at all costs, this trait can be combined with any of the prior ones

| Flags/fields | Data type | Description
|-----------|--------|-------
| character flags | flag | Marks what types of flood pure forms are allowed within this specific area for this task, AI do not change form to accommodate areas, a bit inconsistent and has no hotkey for quick assignment
| Zone | enum | What zone this area index belongs to, you shouldn't need to set this manually as setting a default zone for this objective will fill this entry, but should you decide to use areas from other zones you can set the zone here
| Area | enum | What area this area index is using, will pull from the area list belonging to the zone this entry is referencing

## Direction

With a task selected, holding the {% key "Alt" /%} key and using right *and* {% key "Left Click" /%} in the game window, you can place two points that create an arrow, this arrow defines the direction the AI face when they are idle within this task. Or you can manually set the markers for each point of the arrow.

Point0: Using XYZ coordinates, set the placement of the *back* of the arrow

Point1: Using XYZ coordinates, set the placement of the *front* of the arrow