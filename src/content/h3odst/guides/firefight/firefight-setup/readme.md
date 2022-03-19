Thanks Halo 3 ODST's new Firefight additions, it's far easier than it was previously to setup a new scenario to work with Firefight. There are just a handful of steps you need to take in order for things to work.

# Sapien

## Squad groups

Firefight makes use of squad groups for spawning waves. Only one is required, but you should consider all of the following:

* A squad group for waves (**Required**)
* A squad group for remaining enemies
* A squad group for Phantoms
* A squad group for extra spawns in your scenario
* A squad group for bonus wave enemies
* A squad group for friendly characters
* A squad group for all survival units that your other squads are parented to

You can name each squad with whatever name you want, but it should be something memorable so you can later reference it in your scenario's scripts.

## Squads 

You will need to set up several squads for the scenario to use for spawning waves. Eight squads are needed for spawning the waves, and you'll also need a squad for the remaining enemies in a wave to be migrated to as well as a squad for the bonus wave. If you plan to have enemies spawn from Phantoms, you will also need a squad for each of them as well (max four phantoms). Squads you should have:

* 8 Squads for waves (**Required**)
* 1 Squad for remaining enemies (**Required**)
* 1 Squad for the bonus wave (**Required**)
* 4 Squads maximum for Phantoms
* 1 Squad for the bonus wave Phantom

Once you've created your waves squads, each will need to be given a Spawn Formation - this is where the squad will spawn. You don't need to do this for the remaining enemies and bonus wave squads - these exist so other squads can be migrated to them. How you set up the other squads is up to you.

Every wave squad as well as the bonus squad and remaining squads should also be given an **Objective** to at bare minimum assign them a **Zone**, **Area** and **Firing Positions** so they can move around the map. This objective will be reset by the global_survival script each time a new wave is spawned.

## Folders

For weapons, equipment, vehicles, scenery and crates, Firefight will attempt to respawn any objects within a number of folders which even if you don't plan on using you should set up in your scenario to allow scripts to compile. Unlike squads and squad groups, you should name these accordingly:

* Equipment - eq_survival
* Weapons - wp_survival
* Vehicles - v_survival
* Scenery - sc_survival
* Boon Scenery - sc_survival_boons

# Scripting

In order for Firefight scripts to run on your level, you'll need to first add a mission script to your scenario to setup certain global variables, as well as add the global_survival script. You can add your mission script source in Sapien, as well as global_survival.hsc which is located in the globals folder by clicking on Scenarios and Add Mission Script.

Now inside of your mission's source file, you'll need to setup several globals for global_survival to use. For ease of use, here is [a template][template] you can use and copy containing comments to help you set up each variable.

For each global being set in the mission_survival script, you should change the value to what you have set in your own scenario. For the `s_atm_flood_setting_index` you should set it to the flood settings found in your scenario's `sky_atm_paramers` tag so that when Flood is spawned your level will have a matching atmosphere.

When you've set everything to your liking, head back into Sapien and hit Ctrl + Shift + C while in the Game window to recompile your scripts. If everything was done correctly, your scripts will compile without errors, if not check the output to find out what needs correcting.

# Testing

When you've done setting everything up in your scripts and scenario file, you can try it out in tag test by placing the following commands inside init.txt which you should create inside your **H3ODSTEK** folder if it does not exist already.

```
game_difficulty heroic
game_set_variant #variant_name_survival#
game_start "path\to\your\scenario"
```

Your scenario will load your map using the default survival variant from the `game_engine_settings_definition` tag and if everything is in place, Firefight will begin after a moment.

# Known issuses

* The HUD for Firefight does not display in tagtest due to a bug.

[template]: https://drive.google.com/file/d/1MikNcpdYAZJCALWZ7RoAG9GQHHTmI8_Y/view?usp=sharing