---
title: Halo arguments
---

Halo accepts [command line/shortcut arguments][about-args] to customize how the game launches and what features are enabled. From a terminal or Windows command prompt, such arguments are provided after the executable name, e.g. `haloce.exe -screenshot` to run the game with screenshot mode enabled. These arguments can also be added in Windows by editing a shortcut to the Halo executable.

# How to add arguments to a shortcut (Windows)

Windows users looking to avoid having to use the [command prompt][about-cmd] can create a shortcut to `halo.exe`, `haloce.exe`, or `haloceded.exe` and edit it's **target** to provide these arguments. Be sure to place them **after the EXE**, and **separate each argument with spaces**:

<a href="windows-shortcut.jpg">
  <img src="windows-shortcut.jpg" alt="Dialog box showing how to add arguments to a Windows shortcut" style="max-width:300px"/>
</a>

# Arguments list

| Argument           | Description
|--------------------|----------------
|`-?`                | Displays a list of all arguments.
|`-init example.txt` | Causes the game or dedicated server to run the file of console commands on startup.
|`-nosound`          | Disables all sound.
|`-novideo`          | Disables the videos which play at game startup (retail).
|`-nojoystick`       | Disables joystick/gamepads.
|`-nogamma`          | Disables adjustment of gamma. The in-game gamma slider will not affect the brightness of the game if this switch is used.
|`-use20`            | Forces the game to run as a shader 2.0 card. This is the intended shader version with all graphical features enabled. You probably won't need to specify this manually unless the game is having difficulty detecting your graphics card type.
|`-use14`            | Forces the game to run as a shader 1.4 card. Disables bumped mirrored surfaces and some video effects become two-pass.
|`-use11`            | Forces the game to run as a shader 1.1 card. Additionally degrades visual quality by disabling model self-illumination, "animated lightmaps" (dynamic lights?), per-pixel fog, and specular lighting.
|`-useff`            | Forces the game to run as a fixed function card. This is the most basic feature set, further disabling shadows, refractive camouflage, and lens flares, with very basic fog, water, and lighting. This improves performance on resource-constrained systems, but at great cost to visual quality.
|`-safemode`         | Disables as much as possible from the game in case you're experiencing crashes.
|`-window`           | Runs the game in a window.
|`-windowed`         | Alias of `-window`.
|`-width640`         | Forces the game to run at 640x480.
|`-vidmode w,h,r`    | Forces the game to run at a given width, height, refresh rate.
|`-adapter x`        | Forces the game to run fullscreen on a multi-monitor adaptor.
|`-port x`           | Server port address used when hosting games. Defaults to **2302**. See the Network Setup settings under the In-Game Settings section.
|`-cport x`          | Client port address used when joining games. Defaults to **2303**. See the Network Setup settings under the In-Game Settings section.
|`-ip x.x.x.x`       | Server IP address used when you have multiple IP addresses (e.g. multiple network interfaces in your machine). Behind [NAT][about-nat], this should refer to the [private IP][about-ips] configured for port forwarding.
|`-screenshot`       | Enables the "Print Screen" key to generate [TGA format][about-tga] screenshots in Halo's `screenshots` directory.
|`-timedemo`         | A benchmarking mode which runs four movies and writes out `timedemo.txt`. Crashes in Custom Edition.
|`-devmode`          | Enables developer mode commands ([Custom Edition][h1] only). In pre-1.10 versions, this also prevented Internet gameplay. Note that most client mods like HAC2 and Chimera enable this automatically.
|`-console`          | Enables the debugging console, which can be opened with the `~` (tilde) key. This console can be used to enter Halo script commands and is similar to Sapien's console, though many Sapien-related commands have no effect. Note that most client mods like HAC2 and Chimera enable this automatically.


[about-args]: https://en.wikipedia.org/wiki/Command-line_interface#Arguments
[about-tga]: https://en.wikipedia.org/wiki/Truevision_TGA
[about-ips]: https://en.wikipedia.org/wiki/IP_address#Private_addresses
[about-nat]: https://en.wikipedia.org/wiki/Network_address_translation
[about-cmd]: https://en.wikipedia.org/wiki/Cmd.exe
