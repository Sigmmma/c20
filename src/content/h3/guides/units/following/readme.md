---
title: AI following guide
about: guide
img: 
caption: 
keywords:
  - follow
  - ai
thanks:
  odchylanie_uderzenia: writing and research
---
This guide provides general info on how to set up AI to follow you around a level, this guide assumes you have basic understanding of navigating [sapien](~), [pathfinding](~) and the [objective](~) system, as having these is very useful.

# The squad
Within sapien scroll down to the AI section, click on the squads option and then click "new instance"
![Heirarchy view of adding a new squad entry](squadmake.jpg "Making a new squad")

Now, within your new squad open it up to fireteams and add a new fireteam, configure this fireteam with whatever AI unit you want and place down starting positions by using *right click* in the game window.
![Heirarchy view of navigating to fireteams and assigning starting positions](squadpresetup.jpg "Starting positions")

# The objectives
Within sapien, scroll down to the AI section and click on objectives, click "new instance"
![Heirarchy view of navigating to the objectives and making a new one](objmake.jpg "Creating goals for the AI")

Open your new objective and assign it a default zone, give it a name you will recognize later and click "add" to create a new task
![View of the objective window](taskmake.jpg "Objectives are composed of tasks")

Clicking on the task will allow you to edit properties such as it's name and allow clicking areas to assign them to this task
![Window view of the task and its assigned areas](tasksetup.jpg "Tasks are composed of areas")

# The task
Within your new task, set the follow policy to your desired option and assign a follow radius (assumed in world units), remember; AI are not following a target between firing positions, but rather *between areas* inside the task
![Window view of task properties](taskprop.jpg "Who will the AI follow?")

# The result
In sapien under the AI section you can now go to your AI squad and assign them the new objective and task you just made, now save the scenario (ctrl + S), do a map reset (ctrl + R) and then place your AI squad down and observe your results