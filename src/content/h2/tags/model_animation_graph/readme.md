---
title: model_animation_graph
about: 'tag:h2/model_animation_graph'
keywords:
  - jmad
  - animation
  - first person
  - fp
  - rename.txt
  - fp-model-animations
thanks:
  ReVaas: 'Research and testing (first-person graphs, H2EK)'
---
The **model_animation_graph** tag (short: jmad) holds a model's animations and the table the game uses to pick which one to play. This page currently covers **first-person weapon graphs**, such as `objects\characters\masterchief\fp\weapons\rifle\fp_smg\fp_smg.model_animation_graph`, and what to watch out for when you recompile one of Bungie's with [Tool](~h2-tool#fp-model-animations).

# Key terms
* An **animation** is one recorded movement, for example `first_person:fire_1:var1`. In the source data it is a file named the same way with spaces instead of colons: `first_person fire_1 var1.JMM` (see [animation data](~general/source-data/animation-data) for the file types).
* An **action** is something the game asks for, such as _fire_1_, _reload_full_ or _idle_. Each action points at one animation.
* An **overlay** is played on top of the current animation, such as _moving_ (footstep sway) or _pitch_and_turn_ (looking around).
* **Variants** (`var0`, `var1`, ...) are alternative versions of the same action; the game picks one of them.
* The **weapon class** separates single wielding (`any`) from dual wielding (`dual`). Dual animations are named `first_person:dual:...`.
* A **[rename.txt](~rename-txt)** is a small text file you put in the same `animations` folder as the animation files. Each line has the form `new action = existing animation`, for example `first_person fire_2 = first_person fire_1 var1`. When Tool compiles the graph it adds the new action and points it at the existing animation, so one animation is reused for two actions without copying the file.

# How the game picks a first-person animation
The graph's _modes_ block is a table: **mode** > **weapon class** > **weapon type** > **actions** and **overlays**. Each action or overlay has a _label_ (what the game asks for) and an _animation_ (what gets played).

Usually the label matches the animation name: _fire_1_ plays `first_person:fire_1:var1`. But a label can point at a **different** animation. Bungie used this (through rename.txt) to reuse animations; for example the covenant carbine's _fire_2_ plays `first_person:fire_1:var1`. See [reused animations](#reused-animations).

## Firing: fire_1 and fire_2
Which firing action the game asks for depends on the weapon's [barrel](~weapon#barrel-error-settings): the first barrel uses _fire_1_ and the second barrel uses _fire_2_. The covenant carbine's trigger fires through its **second** barrel, so firing the carbine asks for _fire_2_.

Tested in tag test with the covenant carbine: recompiled without _fire_2_ it fired with no animation (the barrel didn't recoil, single or dual wielded); with _fire_2_ restored through rename.txt the barrel recoiled again in both. Bungie's graphs agree: the carbine and rocket launcher, whose triggers use their second barrel, are the ones that map _fire_2_.

# Reused animations
Bungie's first-person graphs contain actions that reuse another action's animation. They were made with a [rename.txt](~rename-txt) file (see [key terms](#key-terms)) next to the animation files. **The H2EK does not include Bungie's rename.txt files**, and Tool only builds the table from the files it is given, so **recompiling one of these graphs drops the mappings** unless you write the rename.txt yourself. For example, a recompiled covenant carbine has no _fire_2_ and fires with no animation at all.

These are all the mappings in Bungie's Master Chief first-person graphs:

| Graph | rename.txt lines that recreate Bungie's mappings | Without them
|-------|--------------------------------------------------|-------------
| fp_covenant_carbine | `first_person fire_2 = first_person fire_1 var1` | no firing animation
| fp_rocket_launcher | `first_person fire_2 = first_person fire_1 var1`<br>`first_person reload_empty = first_person reload_full` | no firing animation, no empty reload
| fp_shotgun | `first_person reload_continue_full = first_person reload_continue_empty`<br>`first_person reload_empty = first_person reload_continue_empty`<br>`first_person reload_full = first_person reload_continue_empty`<br>`first_person exit_full = first_person reload_exit`<br>`first_person exit_empty = first_person reload_exit` | shell by shell reload broken
| fp_plasma_pistol | `first_person reload_empty = first_person overheated`<br>`first_person reload_full = first_person overheated`<br>`first_person dual reload_empty = first_person dual overheated`<br>`first_person dual reload_full = first_person dual overheated` | no venting animation
| fp_plasma_rifle | `first_person dual misfire_1 = first_person dual fire_1 var0` | no dual misfire animation
| fp_needler | `first_person dual reload_empty = first_person dual reload_full var0` | no dual empty reload
| fp_smg | `first_person dual reload_empty = first_person dual reload_full var0` | no dual empty reload

The other first-person graphs (battle rifle, beam rifle, brute shot, energy sword, fuel rod gun, magnum, sniper rifle, sentinel beam, flag, ball, bomb) have none.

If you give a weapon a new dual wield set, also add the dual version of its single wield mappings, for example `first_person dual fire_2 = first_person dual fire_1 var0` for the carbine, because dual firing through the second barrel asks for the dual _fire_2_.

{% alert %}
A rename adds **one** animation per action. A line for a variant, such as `first_person dual fire_2 var1 = first_person dual fire_1 var1`, fails with _"failed to add ... into the animation graph as a rename of ..."_. Map the action to one variant instead, as Bungie did (_fire_2_ only uses `fire_1 var1`).
{% /alert %}

# Recompiling Bungie's first-person graphs
[fp-model-animations](~h2-tool#fp-model-animations) builds a first-person graph from source files in three places:

| What | In the H2EK?
|------|-------------
| A source file for every animation (`data\<graph folder>\animations`) | Only a few samples (battle rifle, SMG and sniper rifle, in `data\digsite\...`)
| The first-person arms model (`fp_arms.jms`) | Yes
| The first-person weapon model (`data\<weapon folder>\render\*.JMS`) | Only for the battle rifle, SMG and sniper rifle

Tool builds the graph's actions from the files it is given (plus [rename.txt](~rename-txt)), so things Bungie set up through their own rename.txt files are lost unless you recreate them (see [reused animations](#reused-animations)).

**Missing weapon models.** Tool only uses the weapon model for the gun's bones (`frame gun`, `frame magazine` and so on), not for its mesh. Those bones are also stored in the weapon's first-person [render_model](~) tag, so a weapon model containing just the bones can be rebuilt from it. A small script was used to do this for this research; for the three weapons that do come with a model, its output matched Bungie's files, and graphs compiled with the rebuilt models had the same bones as the game's. (To rebuild one: take the render_model's _nodes_ in the order of their _import node index_, keep their parents, add each node's _default translation_ and _default rotation_ to its parents' to get its position in the model, and multiply positions by 100 for the JMS file.)

Other things to know when recompiling:

* **Each animation loses its last frame.** The compiled frame count is always one less than the source file's (a 7 frame source becomes 6 frames). If your source files were converted from Bungie's compiled graphs, they have Bungie's frame count, so recompiling makes those animations one frame shorter than in the retail game unless you add a frame.
* After compiling, Tool warns _"Animation '...' has changed. Its sound events must be checked."_ Check that sounds tied to frames (melee swings, reload clicks) still play at the right time.
* Newly added _pitch_and_turn_ overlays come in without a _blend screen_; Bungie's point at blend screen 0. Without one the game doesn't play the look-around sway.

# How this was researched
1. **Bungie's graphs.** The original first-person graphs that come with the H2EK were exported to XML with Tool's [export-tag-to-xml](~h2-tool#export-tag-to-xml), and each action was compared with the animation it plays. That gave the mappings table above.
2. **A broken recompile.** The covenant carbine's graph was recompiled with Tool. In tag test the carbine's barrel no longer recoiled when firing, single or dual wielded: its new graph had no _fire_2_, and its weapon tag fires through the second barrel.
3. **The fix.** Adding `first_person fire_2 = first_person fire_1 var1` (and `first_person dual fire_2 = first_person dual fire_1 var0` for dual wielding) to rename.txt brought _fire_2_ back, matching Bungie's graph, and in tag test the barrel recoiled again. Lines that try to add variants were refused by Tool.
4. **Weapon models.** Rebuilt weapon models were compared with Bungie's battle rifle, SMG and sniper rifle files (same bone names, order and parents; positions within 0.0001), and graphs compiled with rebuilt models were compared with the game's.
5. **Frame counts** of every carbine animation were compared between Bungie's graph, the source files and the recompiled graph.
