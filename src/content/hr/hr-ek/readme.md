The **Halo Reach Editing Kit** (**HREK**) is the official set of tools for creating custom content for the MCC version of Halo Reach.
Similarly to the mod tools for Halo 2 and 3 it is ultimately based on the old internal tools used by Bungie during the development of Halo Reach, with modifications made during the porting of the game to MCC and some changes to make them more user-friendly.

Unlike the [H1A-EK][] you ***do*** need to own [Halo Reach on Steam][steam_purchase] to gain access to the toolkit.

# Getting started
![.figure Pictured: Location of the mod tools in the steam library.](/general/tools/steam_tools.jpg)

0. Ensure you own [Halo Reach on Steam][steam_purchase], tools are only accessible if you own the Steam version.
1. [Download the tools using Steam](steam://run/1695791), you might need to [install Steam](https://store.steampowered.com/about/) first.
2. Follow the on screen prompts to download the tools.
3. Once the tools are done downloading you can find them in your library in the tools section.
4. Right click the entry for the mod tools, select the "Manage" context menu entry then select the "Browse local files" subentry.
5. Run the `Extract (HREK).bat` file - this will extract all the files required.
6. If your operating system supports it you should enable file system compression for the `tags\sounds` folder. This is a workaround for high disk space usage caused by sound tags including zeroed out sound data.
7. (Optional) Check out the [guides hub][guides] to learn more about modding or install a launcher like [Osoyoos][] if you don't like using the command line.

# Installing updates
1. Make sure you didn't update any stock tags, and if you did make a backup of those files.
2. Re-run `Extract (HREK).bat` and replace all files.

# Major changes from H3
Naturally there is multitude of changes compared to H3 as the engine underwent a major revision, this document endeavours to list the major ones.

* Bonobo takes the place of Guerilla as the kit's tag editor with a completely new UI that makes it easier than ever before to create and modify tags.
* Structures can no longer be created using [ASS][] files, you need to use GR2 files.

# Known issues

* Resource sharing is currently not supported.
* Halo Reach custom maps require that EAC is turned off to load
* Halo Reach custom maps requires that the map info matches the map it is replacing to load. This means having the same campaign and map ID. These values can be found at the top of the scenario tag.
* Single threaded lightmapping is not supported, you need to use the multi-process solution. This can be run with only a single client if only using one core is desired.
* Sound playback and sound importing require the FSB files that come with MCC in order to function. Copy the FSB files from your Halo Reach MCC install.
* The mainmenu requires the mapinfo files that come with MCC in order to load levels. Otherwise you will need to use `init.txt` or the developer console to load scenarios in the standalone build.

[steam_purchase]: https://store.steampowered.com/app/1064271
