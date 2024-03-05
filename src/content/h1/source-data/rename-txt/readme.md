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

Source data files for animations go in a subfolder named `animations` as described [here](~tool#animation-compilation). Create a text file named `rename` in that folder. Open the file in a text editor, make any necessary changes, then save.

After importing all the animations, Tool will try to parse `rename.txt` and modify the [model_animations](~) tag according to the contents of the file.

# Format

To reuse an animation as another animation, write a line in this format:
```
name-of-animation = name-of-animation
```

There are three parts: the name of an animation that does not already exist, the equal sign, and the name of an animation that does exist.

[H1CE Tool](~tool) considers any spaces around the equal sign as part of the animations' names. Files typically do not have spaces at the beginning or at the end of their names. For most situations, do not add any spaces around the equal sign. The name of the animation will be incorrect. If the name is not correct, Tool will fail to find the animation. 

[H1A Tool](~h1a-tool) seems to ignore spaces around the equal sign. They are not considered as part of the animations' names. 

# Example

Source data files
```
first-person firing.JMM
first-person idle.JMM
first-person light-off.JMM
first-person melee.JMM
first-person moving.JMO
first-person overlays.JMO
first-person posing.JMM
first-person put-away.JMM
first-person ready.JMM
first-person reload-full.JMM
first-person reload-full2.JMM
first-person stealth-melee.JMM
first-person throw-grenade.JMM
rename.txt
```

Contents of `rename.txt`
```
first-person reload-empty=first-person reload-full
```

Output from [Tool](~tool#animation-compilation)
```
### first-person firing.JMM
### first-person idle.JMM
### first-person light-off.JMM
### first-person melee.JMM
### first-person posing.JMM
### first-person put-away.JMM
### first-person ready.JMM
### first-person reload-full.JMM
### first-person reload-full2.JMM
### first-person stealth-melee.JMM
### first-person throw-grenade.JMM
### first-person moving.JMO
### first-person overlays.JMO
renamed "first-person reload-full" ==> "first-person reload-empty"

model animation compression saved 0 bytes
```
