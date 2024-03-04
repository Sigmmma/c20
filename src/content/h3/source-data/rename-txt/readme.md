---
title: Text file for reusing animations
about: 'resource:Animation data'
keywords: 
  - animation
  - copy
  - duplicate
  - rename
  - reuse
thanks:
  "Abstract Ingenuity": Research and documentation
---

The file `rename.txt` is for reusing animations under different names.

# Usage

Source data files for animations go in a subfolder named `animations` as described [here](~h3-tool#model-animations). Create a text file named `rename` in that folder. Open the file in a text editor, make any necessary changes, then save.

After importing all the animations, Tool will try to parse `rename.txt` and modify the `MODE-n-STATE GRAPH` inside the [model_animation_graph](~) tag according to the contents of that file.

# Format

To reuse an animation as another animation, write a line in this format:
```
name-of-animation = name-of-animation
```

There are three parts: the name of an animation that does not already exist, the equal sign, and the name of an animation that does exist.

[Tool](~h3-tool) can do that for multiple animations that belong to a specific mode, weapon class, and weapon type. It can reuse them as animations for another specific mode, weapon class and weapon type.

To do that, write a line in this format:
```
copy_weapon_type name-of-block = name-of-block
```

There are four parts: the prefix that tells Tool to reuse animations in one block for another, the block that we want to reuse animations for, the equal sign, and a block that exists.

The "name" of a block is written in this format:
```
mode-label weapon-class-label weapon-type-label
```

# Example

Source data files
```
combat pistol hp fire_1.JMO
combat pistol hp melee_strike_1.JMR
combat pistol hp melee_strike_2.JMR
combat pistol hp reload_1.JMR
combat pistol ne fire_1.JMO
combat pistol ne melee_strike_1.JMR
combat pistol ne reload_1.JMR
combat pistol pp melee_strike_1.JMR
combat pistol pp melee_strike_2.JMR
combat rifle ar fire_1.JMO
combat rifle ar melee_strike_1.JMR
combat rifle ar melee_strike_2.JMR
combat rifle ar reload_1.JMR
combat rifle br fire_1.JMO
pelican_p_l01 enter.JMM
pelican_p_l01 exit.JMM
pelican_p_l01 idle.JMM
pelican_p_r01 enter.JMM
pelican_p_r01 exit.JMM
pelican_p_r01 idle.JMM
rename.txt
```

Contents of `rename.txt`
```
combat pistol ne melee_strike_2 = combat pistol hp melee_strike_1
combat pistol pp fire_1 = combat pistol ne fire_1
copy_weapon_type combat rifle br = combat rifle ar
copy_weapon_type pelican_p_l02 any any = pelican_p_l01 any any
copy_weapon_type pelican_p_l03 any any = pelican_p_l01 any any
copy_weapon_type pelican_p_l04 any any = pelican_p_l01 any any
copy_weapon_type pelican_p_l05 any any = pelican_p_l01 any any
copy_weapon_type pelican_p_r02 any any = pelican_p_r01 any any
copy_weapon_type pelican_p_r03 any any = pelican_p_r01 any any
copy_weapon_type pelican_p_r04 any any = pelican_p_r01 any any
copy_weapon_type pelican_p_r05 any any = pelican_p_r01 any any
```

Output from [Tool](~h3-tool#model-animations)
```
### example.JMS
### pelican_p_l01 enter.JMM
### pelican_p_l01 exit.JMM
### pelican_p_l01 idle.JMM
### pelican_p_r01 enter.JMM
### pelican_p_r01 exit.JMM
### pelican_p_r01 idle.JMM
### combat pistol hp fire_1.JMO
### combat pistol ne fire_1.JMO
### combat rifle ar fire_1.JMO
### combat rifle br fire_1.JMO
### combat pistol hp melee_strike_1.JMR
### combat pistol hp melee_strike_2.JMR
### combat pistol hp reload_1.JMR
### combat pistol ne melee_strike_1.JMR
### combat pistol ne reload_1.JMR
### combat pistol pp melee_strike_1.JMR
### combat pistol pp melee_strike_2.JMR
### combat rifle ar melee_strike_1.JMR
### combat rifle ar melee_strike_2.JMR
### combat rifle ar reload_1.JMR
> populating animation graph...

> processing rename.txt...

> ### renamed "combat:pistol:hp:melee_strike_1" ==> "combat:pistol:ne:melee_strike_2"

> ### renamed "combat:pistol:ne:fire_1" ==> "combat:pistol:pp:fire_1"

> ### copied all 'combat:rifle:ar' to 'combat:rifle:br'.

> ### copied all 'pelican_p_l01:any:any' to 'pelican_p_l02:any:any'.

> ### copied all 'pelican_p_l01:any:any' to 'pelican_p_l03:any:any'.

> ### copied all 'pelican_p_l01:any:any' to 'pelican_p_l04:any:any'.

> ### copied all 'pelican_p_l01:any:any' to 'pelican_p_l05:any:any'.

> ### copied all 'pelican_p_r01:any:any' to 'pelican_p_r02:any:any'.

> ### copied all 'pelican_p_r01:any:any' to 'pelican_p_r03:any:any'.

> ### copied all 'pelican_p_r01:any:any' to 'pelican_p_r04:any:any'.

> ### copied all 'pelican_p_r01:any:any' to 'pelican_p_r05:any:any'.

> restoring old animation graph data...

> sorting graph entries...

> RESULTS 0 errors, 0 warnings
```
