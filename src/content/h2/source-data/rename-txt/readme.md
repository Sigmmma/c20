---
title: rename.txt
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

Animation data files go in a folder named `animations` as described [here](~h2-tool#model-animations). Create a text file named `rename` in that folder. Open the file in a text editor. Write one or more lines in the expected format. Save, and then go compile the animation data.

After compiling the animation data, Tool will try to read `rename.txt` and modify the [model_animation_graph](~) tag according to the contents of that file. There should be new blocks in the `MODE-N-STATE GRAPH` if that was successful.

# Format

To reuse an animation as another animation, write a line in this format:
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

Output from [Tool](~h2-tool#fp-model-animations)
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
