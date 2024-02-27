---
title: rename.txt
about: 'resource:Animation data'
thanks:
  Abstract Ingenuity: Research and documentation
---

The file `rename.txt` is for reusing animations under different names.

# Usage

Source data files for animations go in a subfolder named `animations` as described [here](~h2/tools/h2-ek/h2-tool#model-animations). Create a text file named `rename` in that folder. Open the file in a text editor, make any necessary changes, then save.

After importing all the animations, Tool will try to parse `rename.txt` and modify the `MODE-n-STATE GRAPH` inside the [model_animation_graph](~) tag according to the contents of that file.

# Format

To reuse an animation as another animation, write a line in this format:
```
name-of-animation = name-of-animation
```

There are three parts: the name of an animation that does not already exist, the equal sign, and the name of an animation that does exist.

[Tool](~h3/h3-ek/h3-tool) can do that for multiple animations that belong to a specific mode, weapon class, and weapon type. It can reuse them as animations for another specific mode, weapon class and weapon type.

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
any look.JMO
combat idle.JMM
combat pistol hp reload_1.JMR
combat rifle aim_move_up.JMO
combat rifle aim_still_up.JMO
combat rifle ar fire_1.JMO
combat rifle ar melee.JMA
combat rifle ar reload_1.JMR
crouch idle.JMM
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
combat melee = combat rifle ar melee
combat rifle br fire_1 = combat rifle ar fire_1
combat rifle br reload_1 = combat rifle ar reload_1
crouch pistol hp reload_1 = combat pistol hp reload_1
crouch rifle ar reload_1 = combat rifle ar reload_1
copy_weapon_type combat pistol any = combat rifle any
copy_weapon_type pelican_p_l02 any any = pelican_p_l01 any any
copy_weapon_type pelican_p_l03 any any = pelican_p_l01 any any
copy_weapon_type pelican_p_l04 any any = pelican_p_l01 any any
copy_weapon_type pelican_p_l05 any any = pelican_p_l01 any any
copy_weapon_type pelican_p_r02 any any = pelican_p_r01 any any
copy_weapon_type pelican_p_r03 any any = pelican_p_r01 any any
copy_weapon_type pelican_p_r04 any any = pelican_p_r01 any any
copy_weapon_type pelican_p_r05 any any = pelican_p_r01 any any
```

Output from [Tool](~h2/tools/h2-ek/h2-tool#model-animations)
```
### example.JMS
### combat rifle ar melee.JMA
### combat idle.JMM
### crouch idle.JMM
### pelican_p_l01 enter.JMM
### pelican_p_l01 exit.JMM
### pelican_p_l01 idle.JMM
### pelican_p_r01 enter.JMM
### pelican_p_r01 exit.JMM
### pelican_p_r01 idle.JMM
### any look.JMO
### combat rifle aim_move_up.JMO
### combat rifle aim_still_up.JMO
### combat rifle ar fire_1.JMO
### combat pistol hp reload_1.JMR
### combat rifle ar reload_1.JMR
> populating animation graph...

> processing rename.txt...

> ### renamed "combat:rifle:ar:melee" ==> "combat:melee"

> ### renamed "combat:rifle:ar:fire_1" ==> "combat:rifle:br:fire_1"

> ### renamed "combat:rifle:ar:reload_1" ==> "combat:rifle:br:reload_1"

> ### renamed "combat:pistol:hp:reload_1" ==> "crouch:pistol:hp:reload_1"

> ### renamed "combat:rifle:ar:reload_1" ==> "crouch:rifle:ar:reload_1"

> ### copied all 'combat:rifle:any' to 'combat:pistol:any'.

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
