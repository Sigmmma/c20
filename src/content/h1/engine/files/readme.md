This page documents the function and format of some of Halo's installation and profile files, excluding [maps][map].

# haloce.exe
This is the main game executable containing the bulk of the game's code.

By default, Halo is only permitted to use [2 GB][2gb] of virtual memory. By applying value `0x2F` at offset `0x136` in the 1.0.10 executable, Halo can be made "Large Address Aware" and capable of using up to 4GB of virtual memory. The same upgrade can be made to [Sapien][sapien#limits]. The increased limit can be useful for client mods like [Chimera][] which run in the game's address space and allocate more memory to speed up map loading.

# strings.dll
The library `strings.dll` is required to run the game or dedicated server. It serves multiple purposes:

* Contains the loading screen image seen before the main menu (all other loading screens are contained in maps).
* Displays crash messages in a window.
* Prior to the 1.10 patch, it contained the `executable_is_valid` checksum.

This DLL is often replaced with a modified version for mods like SAPP and [Chimera][] 1.0+.

# Watson
The `Watson` directory and the files within it (`dw15.exe`, various `dwintl.dll`) are a defunct crash reporting system. The server to which crash reports would be sent is no longer running. The mod [Chimera][] disables this to allow the game to crash faster without waiting for a network timeout.

# Multiplayer chat: Keystone, controls, and content

![.figure An example modified chat editbox, a practice abandoned after mods implemented better chat systems.](editbox.png)

The library `Keystone.dll` is used for [Halo's][h1] stock multiplayer chat functionality. The game also requires the library `msxml.dll` to be installed on the system for chat to display properly. An installer can be found in Halo's `redist` directory.

The `controls` directory is host to `Controls.ini` and `Controls.dll`, a library used to render the multiplayer chat input box. It makes use of files in the `content` directory, which can be modified to customize the appearance of the chat "editbox" and text input.

The mods HAC2 and [Chimera][] implement their own chat display to replace Halo's, which becomes unreliable after tabbing out of the game.

# Profile and savegame files
Halo stores savegames and profile data according to the system-wide `%USERPROFILE%` environment variable. On Windows, with a system drive "C" and user name "John", Halo saves can be found in `C:\Users\You\Documents\My Games\Halo CE\`. When running on Linux under Wine, the default location is `~/My Games/Halo CE/`. Some mods also store data under this location, such as downloaded maps.

## lastprof.txt
The file `lastprof.txt` stores the path of the last used profile so it can be loaded at game startup. It has a fixed length of 256 bytes and a very simple structure:

1. An ASCII-encoded absolute filesystem path to a _profile directory_, with trailing `\`. For example, `C:\Users\You\My Documents\My Games\Halo CE\savegames\New001\`
2. A null byte, `0x00`, to terminate the above string.
3. The ASCII-encoded string `lam.sav` (not a typo).
4. `0x00` padding until the end of the file.

## savegame.bin
The file `savegames\<profile name>\savegame.bin` contains the saved state of the campaign, allowing progress to be resumed when reloading from a checkpoint or returning from the main menu. The Halo console commands `game_save` and `game_revert` use this file. A newly-created savegame.bin is typically filled with `NULL` to `0x480000` (4,718,592 bytes).

The structure of this file is not fully mapped out, however some fields are known:

```.struct
entryType: Savegame
showAbsoluteOffsets: true
id: savegame
typeDefs: savegame.bin.yml
```

## blam.sav
The file `savegames\<profile name>\blam.sav` contains the configuration for a HCE profile. Information includes player details, video/audio/network settings, and input configurations (mouse, keyboard, and controller). It has a fixed length of 8192 bytes (8 [KiB][]). File integrity is verified by a checksum at the end of the file; if the checksum does not match the game will fall back to default settings.

The file structure follows. All data is [little-endian](https://en.wikipedia.org/wiki/Endianness) unless otherwise stated.

```.struct
entryType: Profile
showOffsets: true
id: profile
typeDefs: blam.sav.yml
```

# 00.sav and 01.sav
In `saved\player_profiles\default_profile` there are two files, `00.sav` and `01.sav` with the same player profile structure as `blam.sav`. However, these files contain empty or default values only. They have default key bindings and no controller bindings. The `01.sav` file differs from `00.sav` in only three ways:

* An unknown field at offset `0x11D` is set to true.
* The invert Y axis field at offset `0x12F` is set to true.
* The checksum differs due to the above differences.

Halo overwrites or creates these files with their original contents every time the game starts. Replacing their contents with other profile data and forcing the files to be read-only does not have any effect on default profile creation, default bindings, or controls used when loaded into a map before first profile creation. Their purpose is a mystery.

[KiB]: https://en.wikipedia.org/wiki/Kibibyte
[2gb]: https://en.wikipedia.org/wiki/2_GB_limit
