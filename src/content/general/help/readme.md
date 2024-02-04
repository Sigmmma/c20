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
* Take things one step at a time. Make small incremental changes and test them. This will help you avoid being unable to identify the change that caused a problem.
* Use the latest versions of any tools you're relying on and read their documentation. Check for any "README" files that come with them. Don't use any [obsolete tools](~obsolete).
* Skim through tutorials that you'll follow so you know what to expect.
* Read any relevant pages on this site.
* Use officially released tags, or ones extracted with modern [invader-extract](~) rather than [Refinery](~) or [HEK+](~obsolete#hek).
* If you're worried about making accidental changes, you can mark certain tag files as read-only. Guerilla will grey out fields for these tags.
* [Prevent the Windows virtual store from interfering](~tips#windows-virtual-store) when modding H1CE.

# Troubleshooting issues
If you do have an unidentified problem, try applying the following general methods:

* Study stock or [extracted tags](~invader-extract) to see how Bungie and other modders accomplished something. Think about how tags might interact, e.g. through matching animation labels or object functions.
* Have you kept any backups of your game files or tags that you can restore to a working state? Consider what has changed between then and now to narrow down the cause.
* Reproduce the problem in isolation. Create a test map which reproduces your problem while ruling out any other causes. Try to eliminate each possibility until you're left with one probable cause.
* Check `reports\debug.txt`. Tools like [Sapien and Standalone](~mod-tools#tools-overview) produce logs where you can get more information about crashes.
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

If nobody is answering, it might just mean that nobody knows and you're gonna have to figure it out on your own. If you do solve your own problem, be sure to post a reply so others can benefit from what you learned. Maybe we'll use it for the wiki!

[discord]: https://discord.reclaimers.net/