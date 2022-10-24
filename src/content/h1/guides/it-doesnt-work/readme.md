---
title: It doesn't work
img: broken.jpg
caption: Not always so obvious.
---
Oftentimes in your CE modding adventures you will face situations where something simply _doesn't work_ the way you expected, and maybe you're no closer to a solution after hours or days of trying things. While this site, community tutorials, and chat channels can help, there often isn't specific help available.

This page offers general techniques to help you prevent and troubleshoot your problems to get unblocked.

# Preventing issues
There's a number of things you can do _before_ or _while_ modding to avoid issues entirely:

## Keep backups
It's not fun to keep reinstalling Halo or your tag set because you've gotten it into a bad state and you don't know why. Keep copies of your files and update them regularly so you can always go back to a working configuration. If you're unsure what the effects of something will be, it's better to be safe than sorry.

## One step at a time
Make small incremental changes one step at a time and check that each is having the effect you want, which avoids being unable to identify the change that caused an issue or chasing down red herrings. This applies whether you are installing client mods like [OpenSauce](~) and [Chimera](~) or making edits to your [tags](~).

## Having a good setup
Your modding setup, like your CE installation and tools, needs to be a reliable foundation for everything that follows. Make sure you're starting off on the right foot:

* [Prevent the Windows virtual store from interfering](~tips#windows-virtual-store) when modding H1CE.
* Use the latest versions of any tools you're relying on.
* Use officially released tags, and if you must use extracted ones then use modern extractors like [invader-extract](~) and [Refinery](~) rather than [HEK+](~hek-plus).
* Mark any tags you do not intend on modifying as read-only. Guerilla will grey out fields for these tags as a reminder for you to make edited copies of them.

## Reading documentation
Before you jump in to making changes, make sure you understand the process and what you're doing. There are [tutorials](~guides) and [documentation](~/) available to help you. If using unfamiliar tools or mods, make sure to read any "README" files that come with them.

# Troubleshooting issues
If you do have an unidentified problem, try applying the following general methods:

## Look for a working example
Don't know why some tag changes aren't having the effect you want, for example? Try looking for other tags which accomplish what you want and comparing them side-by-side in [Guerilla](~). You can look at stock campaign tags or those made by a community member. Think about what other tags might be related and how they interact, e.g. through matching animation labels or object functions.

Extracting tags with [Refinery](~mek) or [invader-extract](~) is a great way to understand existing solutions which may not be documented in tutorial format, but are nonetheless available to study.

## Last good state
Have you kept any backups of your game files or tags that you can restore to a working state? Consider what has changed between then and now to narrow down the cause.

## Process of elimination
When you can't identify the source of a problem but have a set of theories, try to eliminate each possibility until you're left with one probable cause.

## Check logs
Some tools like [Sapien](~) produce log output files where you can get more information about crashes. Check the `debug.txt` file for example.

## Search previous discussions
With Halo's long history of modding, odds are someone has at least talked  about what you need. Try searching for past discussions on community websites and [Discord channels][discord] and asking for help. Authors of well-known maps, tags, tools, and assets may be available to contact directly and further explain their posts.

[discord]: https://discord.reclaimers.net/
