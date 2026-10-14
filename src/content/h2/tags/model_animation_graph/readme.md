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
[fp-model-animations](~h2-tool#fp-model-animations) needs three folders of source data:

| What | Where | In the H2EK?
|------|-------|-------------
| The animations | `data\<graph folder>\animations` | Only for the weapons whose animations you export yourself
| The first-person arms model | `data\digsite\objects\characters\masterchief\fp\render\fp_arms.jms` | Yes
| The first-person **weapon** model (JMS) | `data\<weapon folder>\render\*.JMS` | **Only the battle rifle, SMG and sniper rifle**

Tool reads the weapon model to get the gun's bones (`frame gun`, `frame magazine` and so on). For the other weapons you have to provide one. The model's mesh does not affect the compiled animations, only its bones do:

* The bones can be taken from the weapon's first-person [render_model](~) (_nodes_ block): use the order given by each node's _import node index_, keep the parents, and add up the _default translation_ and _default rotation_ of each node and its parents (model space), multiplied by 100 for JMS units. This reproduces Bungie's battle rifle, SMG and sniper rifle JMS files exactly.
* With such a skeleton-only JMS (one small placeholder triangle) the compiled graph has the same bones and the same _node list checksum_ as Bungie's. Adding geometry to every gun bone, or using Bungie-style `frame gun` names, gave identical compiled animation headers.

Other things to know when recompiling:

* **Write the rename.txt** from the table above, or the weapon loses those actions.
* **Each animation loses its last frame.** The compiled frame count is always one less than the source file's (a 7 frame source becomes 6 frames). Animations taken from Bungie's compiled graphs have Bungie's frame count, so recompiling them makes them one frame shorter than in the retail game unless you add a frame.
* After compiling, Tool warns _"Animation '...' has changed. Its sound events must be checked."_ Check that sounds tied to frames (melee swings, reload clicks) still play at the right time.
* Newly added _pitch_and_turn_ overlays come in without a _blend screen_; Bungie's point at blend screen 0. Without one the game doesn't play the look-around sway.

# How this was researched
1. **Bungie's originals.** All 18 of Bungie's Master Chief first-person graphs were taken from `H2EK.7z` and exported with `tool.exe export-tag-to-xml`, and their modes tables were compared with the animations they play. That gave the mappings table above.
2. **A broken recompile.** After recompiling the covenant carbine, firing it showed no animation. Its exported animation data matched Bungie's retail animation exactly, and the compiled graph had the same bones and checksum, but its table had no _fire_2_. The carbine's weapon tag fires its trigger through barrel 2.
3. **The fix.** Recompiling with a rename.txt (`first_person fire_2 = first_person fire_1 var1`, plus `first_person dual fire_2 = first_person dual fire_1 var0` for the new dual set) reproduced Bungie's single wield table exactly, and in tag test the carbine's barrel recoiled again when firing, single and dual wielded. Variant lines were tested and refused by Tool.
4. **Weapon models.** The battle rifle, SMG and sniper rifle JMS files were rebuilt from their render_model tags and compared with Bungie's (same bone names, order and parents, positions within 0.0001). The beam rifle and carbine were then compiled in a sandbox with rebuilt JMS files, with and without geometry on every bone; the compiled animation headers were identical and the node list checksum matched the game's graph.
5. **Frame counts** were compared between Bungie's graphs, the source files and the recompiled graphs for every animation of the carbine.
