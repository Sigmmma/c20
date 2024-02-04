---
title: Halo Custom Edition
img: ce.jpg
caption: Custom Edition is freely available to anyone who purchased the retail game.
redirects:
  - /h1/tools/hek
  - /h1/tools/hek/guerilla
  - /h1/tools/hek/tool
  - /h1/tools/hek/sapien
  - /h1/tools/hek/blitzkrieg
---
**Halo Custom Edition**, or **CE**, is a standalone version of Halo PC which supports custom maps created by the [Halo Editing Kit](#halo-editing-kit), originally [released in 2004][custom-edition-launch]. It also features a server browser and its own dedicated server, but lacks the campaign. [Maps](~map) are incompatible between the editions.

Custom Edition became the de facto standard Gearbox title due to its support of custom maps, campaign ports, and actively maintained client and server mods. Like retail, its last update was `1.0.10` in [2014][patch]. The release of MCC and its associated [mod tools](~h1a-ek) has reduced the active player base, but CE still remains popular for gamenights due to dedicated servers and client mods with automatic map downloads like [HAC2](~) and [Chimera](~). It's also used for mods which require engine extensions with Lua scripts or [OpenSauce](~).

# Halo Editing Kit
{% figure src="sapien.gif" %}
A screenshot of classic Sapien from the HEK tutorial.
{% /figure %}

The **Halo Editing Kit** or **HEK** is the legacy suite of modding tools released by Gearbox Software with Custom Edition in 2004. It includes [Sapien](~h1a-sapien), [Tool](~h1a-tool), [Guerilla](~h1a-guerilla), the [Blitzkrieg](~) exporter for 3ds Max, and a [tutorial][hek-tut] for custom multiplayer map development (now adapted into the Blender-based [level guides](~guides/levels) here on c20).

Unlike the modern [Halo CE mod tools](~h1a-ek), the HEK only includes a subset of the game's [tags](~tags). With today's reliable [tag extraction](~map#extracting-tags-from-maps) that's no longer a barrier and you can create custom singleplayer or modified stock maps. It's also possible (though a bit more complicated) to [use the new tools](~h1a-ek#use-with-custom-edition) and benefit from all their bug fixes and new features.

{% alert %}
The tools in the HEK work mostly the same as their newer counterparts, so documentation on this site is combined. You can learn about the differences by reading [comparison to the HEK](~h1a-ek#comparison-to-the-hek) and [changelogs](~h1a-ek#changelog) for the new tools.
{% /alert %}

## Installation
Download and run the installer. The HEK is usually installed in the same location as Halo Custom Edition itself.

{% alert type="danger" %}
After installing the HEK you need to prevent the Windows Virtual Store from interfering with it.
{% /alert %}

Windows versions since Vista have included a security feature called the _Virtual Store_. It prevents applications from modifying or creating files in protected locations like `C:\Program Files (x86)\...` by performing such operations under `C:\Users\%USERNAME%\AppData\Local\VirtualStore` instead.

As a result, some applications may end up with conflicting "views" of what files are actually present. This is a problem since the HEK uses the `data`, `tags`, and `maps` directories as editable workspaces. Users have experienced Halo loading incorrect versions of maps, and tag edits done in [Guerilla](~) not being visible to [Sapien](~). To avoid these issues, use one of the following workarounds:

* Take ownership of Halo's installation files. Right click the `Halo Custom Edition` folder, select _Properties_, and from the _Security_ tab change the owner to yourself. Once ownership has been taken, any conflicting files in the Virtual Store location above also need to removed.
* Permanently move Halo's installation directory out of `Program Files (x86)`, e.g. to your `C:` drive, `Desktop` or `Documents`.

# Differences from Halo PC
Beyond supporting custom maps and lacking the campaign, some notable differences from retail are:

* Addition of the the gamemode info menu (hold {% key "F2" /%}).
* Addition of the teammate names toggle (hold {% key "F3" /%}).
* Addition of new server-related console commands like `sv_say`.
* Regression in rendering of certain objects through fog.
* Some tags were modified, such as stun effects, possibly as a workaround for [netcode desyncs](~netcode#known-issues-and-limitations).

[custom-edition-launch]: https://www.gamespot.com/articles/gearbox-readying-halo-custom-edition/1100-6095140/
[patch]: https://www.bungie.net/en/Forums/Post/64943622
[hek-tut]: http://nikon.bungie.org/misc/hek_tutorial/