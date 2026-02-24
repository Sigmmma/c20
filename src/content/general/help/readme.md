---
title: Getting help
img: broken.jpg
caption: Don't let your tagset end up like this.
---
Sometimes in your modding adventures you'll face situations where something simply _doesn't work_ the way you expected, and maybe you're no closer to a solution after hours or days of trying things. Documentation, tutorials, and chat channels can help, but there often isn't specific help available.

This page offers general techniques to help you prevent and troubleshoot your problems to get unblocked.

# Preventing issues
There's a number of things you can do _before_ or _while_ modding to avoid issues entirely:

* Keep backups. It's not fun to keep reinstalling Halo or your tag set because you've gotten it into a bad state. Periodically back up your work, especially if you're unsure what the effects of something will be.
* Take things one step at a time. Make small incremental changes and test often. This will help you avoid being unable to identify the change that caused a problem.
* Use the latest versions of any tools you're relying on and read their documentation. Check for any "README" files that come with them. Don't use any [obsolete tools](~obsolete).
* Skim through tutorials before following them so you know what to expect.
* Read any relevant pages on this site.
* Use officially released tags, or ones extracted with modern [invader-extract](~) rather than [Refinery](~) or [HEK+](~obsolete#hek).
* If you're worried about making accidental changes, you can mark certain tag files as read-only. Guerilla will grey out fields for these tags.
* [Prevent the Windows virtual store from interfering](~custom-edition#installation) when modding H1CE.

# Troubleshooting issues
If you do have an unidentified problem, try applying the following general methods:

* Study stock or [extracted tags](~invader-extract) to see how Bungie and other modders accomplished something. Think about how tags might interact, e.g. through matching animation labels or object functions.
* Have you kept any backups of your game files or tags that you can restore to a working state? Consider what has changed between then and now to narrow down the cause.
* Reproduce the problem in isolation. Create a test map which reproduces your problem while ruling out any other causes. Try to eliminate each possibility until you're left with one probable cause.
* Check `reports\debug.txt`. Tools like [Sapien and Standalone](~mod-tools#tools-overview) produce logs where you can get more information about crashes. Learn to [read these messages](#how-to-read-exception-messages) for clues.
* With Halo's long history of modding, odds are someone has had a similar problem. Try searching for past discussions on community websites and [Discord channels][discord].
* Look for information related to a previous game. Many features come from earlier iterations of the engine.

# Asking for help
If you're totally stuck, [ask for help][discord]. Here are some tips for getting an answer:

* Explain your problem first rather than waiting for someone to offer help.
* Explain what exactly you're trying to do, not just the problem you're facing.
* List the steps you've taken so far and what you've done to troubleshoot.
* Provide any helpful screenshots, logs, or relevant files.

As an example, this is NOT likely to get replies:

> I tried to put some AI in my level but it doesnt work. Can anyone help?

It's hard to know if this means the map doesn't load, crashes, the AI aren't doing anything, or they can't be added in Sapien. It doesn't say if custom tags are being used and where they came from. Include some more details so people can narrow down the causes:

> I want to make a level where AI fight each other. I downloaded some drone tags from this link and put them in my tags folder. When I add them to my bipeds palette in Sapien it says "Not all selected tags could be added to the palette". Here's a screenshot of my debug.txt and where I put the tags.

This is easy to answer with the additional context; the likely cause of the error is missing tag dependencies or putting the downloaded tags in the wrong location under `tags\`. From this question we can also offer the advice that [bipeds](~h1/tags/object/unit/biped) won't do anything on their own and you need to set up encounters for them to behave like AI.

If nobody is answering, it might just mean that nobody knows and you're gonna have to figure it out on your own. If you do solve your own problem, be sure to post a reply so others can benefit from what you learned.

# How to read exception messages
Halo's tools and runtime code is littered with checks called [_assertions_](https://en.wikipedia.org/wiki/Assertion_(software_development)) which are included in play, test, and debug [build types](~blam#build-types). They verify certain expected conditions are true during execution, and otherwise immediately stop the game or tool with an `EXCEPTION halt` message logged to `reports/debug.txt`. During Halo's development the game would be tested with these checks enabled to ensure various assumptions are being met, and then disabled on release to avoid their performance impact or potential to cause a crash.

As a modder, you will almost certainly run into these error messages at some point, but they were originally intended for Halo's developers and can be very user-unfriendly. This site documents many common assertion causes but learning to interpret their messages can save you some headaches. Assertions are usually caused by improper tags or source data but it's often not possible to narrow down the exact root cause from the message alone and you may need to follow up with some [further troubleshooting](#troubleshooting-issues).

Let's decompose some examples from H1. Suppose Sapien just crashed opening a new level and you see this in `debug.txt`:

```
EXCEPTION halt in \halopc\haloce\source\tag_files\tag_groups.c,#3157: #0 is not a valid shader_transparent_chicago_map_block index in [#0,#0)
```

1. `EXCEPTION halt`: States that the game or tool detected an unexpected situation and stopped.
2. `in \halopc\...\tag_groups.c`: Indicates the name of the game's source code file which encountered the exception/assertion. Although we do not have access to the game's source code, this file name can be an important clue to the root cause. In this case `tag_groups.c` is likely responsible for basic [tag group](~intro#tag-groups) operations like [resolving references](~intro#tag-references-and-paths) or accessing [block elements](~intro#blocks-and-elements). Note that the start of the file path will differ between [Custom Edition](~custom-edition) (`\halopc\...`) and MCC-era tools (`e:\jenkins\...`).
3. `#3157`: Indicates the line number in the above source code file. Without the game's source code this is mostly useless to us. Line numbers are also subject to change between CE and MCC-era tools.
4. `#0 is not a valid shader_transparent_chicago_map_block index in [#0,#0)`: This is the exception message itself (everything following the colon) which provides additional detail. In this case, we see some common sub-patterns. The #-prefixed number `#0` is an [index](~intro#blocks-and-elements), and `[#0,#0)` represents a valid [range/interval](https://en.wikipedia.org/wiki/Interval_(mathematics)) for that index. This range is actually empty since its exclusive end index/length is `#0)`, so together with the rest of the message we can guess we are trying to access the first element of an empty block in a [shader_transparent_chicago](~) tag. Specifically it mentions a _map_ block so the shader tag doesn't contain any textures/maps, but we don't know _which_ shader so you would need to look through all recent additions to the level.

Let's take a look at another case:

```
EXCEPTION halt in e:\jenkins\workspace\mcch1code-release\mcc\release\h1\code\h1a2\sources\ai\actor_firing_position.c,#1431: (test_surface_index >= 0) && (test_surface_index < collision_bsp->surfaces.count)
```

We can see the exception is somehow related to AI firing positions, but the message details are cryptic this time. What you're seeing is an _assertion failure_: a certain `true`/`false` condition needed to be `true` at this point in execution, but wasn't. The text `(test_surface_index >= 0) && (test_surface_index < collision_bsp->surfaces.count)` is the condition written as a [boolean expression](https://en.wikipedia.org/wiki/Boolean_expression) in the game's code. It's saying a `test_surface_index` needed to be at least 0 AND less than the number of surfaces in the collision BSP.

Knowing what this means takes a bit of familiarity with the engine. A "test surface" in the engine's terms means a surface found by a ray test (e.g. shooting a ray in some direction to find what surface it hit). From context we know that firing positions are placed within the [BSP](~h1/tags/scenario_structure_bsp), so it's likely the game is trying to discover what BSP surface is beneath one but the index of the surface is invalid. Halo often represents "none" values as `-1`, so we can guess no surface was discovered since `-1` is less than `0` and caused the assertion failure. This could happen if the firing position is _outside the BSP_, which you could correct in Sapien.

[discord]: https://discord.reclaimers.net/