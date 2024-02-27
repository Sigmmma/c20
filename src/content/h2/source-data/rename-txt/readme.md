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

Each line in `readme.txt` is written like this:  
```
name-of-animation = name-of-animation
```

There are three parts: the name of an animation that does not already exist, the equal sign, and the name of an animation that does exist.

# Example

Source data files
```
first_person fire_1.JMM
first_person idle.JMM
first_person melee_strike_1.JMM
first_person melee_strike_2.JMM
first_person moving.JMO
first_person overlays.JMO
first_person pitch_and_turn.JMO
first_person posing var0.JMM
first_person posing var1.JMM
first_person ready.JMM
first_person reload_continue_empty.JMM
first_person reload_enter.JMM
first_person reload_exit.JMM
first_person sprint.JMR
first_person throw_grenade.JMM
rename.txt
```

Contents of `rename.txt`
```
first_person reload_continue_full = first_person reload_continue_empty
first_person reload_empty = first_person reload_continue_empty
first_person reload_full = first_person reload_continue_empty
first_person exit_full = first_person reload_exit
first_person exit_empty = first_person reload_exit
```

Output from [Tool](~h2/tools/h2-ek/h2-tool#fp-model-animations)
```
### fp_shotgun.JMS
### fp_arms.JMS
### first_person fire_1.JMM
### first_person idle.JMM
### first_person melee_strike_1.JMM
### first_person melee_strike_2.JMM
### first_person posing var0.JMM
### first_person posing var1.JMM
### first_person ready.JMM
### first_person reload_continue_empty.JMM
### first_person reload_enter.JMM
### first_person reload_exit.JMM
### first_person throw_grenade.JMM
### first_person moving.JMO
### first_person overlays.JMO
### first_person pitch_and_turn.JMO
### first_person sprint.JMR
populating animation graph...
processing rename.txt...
### renamed "first_person:reload_continue_empty" ==> "first_person:reload_continue_full"
### renamed "first_person:reload_continue_empty" ==> "first_person:reload_empty"
### renamed "first_person:reload_continue_empty" ==> "first_person:reload_full"
### renamed "first_person:reload_exit" ==> "first_person:exit_full"
### renamed "first_person:reload_exit" ==> "first_person:exit_empty"
restoring old animation graph data...
sorting graph entries...
RESULTS 0 errors, 0 warnings
```
