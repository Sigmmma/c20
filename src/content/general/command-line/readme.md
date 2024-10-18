---
title: Command-line
img: cmd.jpg
caption: cmd.exe on Windows 7
keywords:
  - cli
---
Basic **command-line** skills are helpful in Halo modding. [Tool](~mod-tools#tools-overview) and some community tools like [Invader](~) are used via a command-line interface. In a CLI, you type commands into a shell window which runs programs and displays their output. CLIs may seem a bit intimidating compared to GUIs, but they allow you to easily share commands and output as text and run them in [scripts](#scripting) for repetitive tasks.

Most people use [Command Prompt](#command-prompt) (`cmd.exe`), but you can also use [PowerShell](#powershell). If you wish to avoid CLIs then you can use the community-made [Osoyoos](~) launcher for wrapping Tool functions.

# Command Prompt
## Opening
Much like an Explorer window, Command Prompt always has a _current directory_ (also called _working directory_). For most purposes you'll want the current directory to be one of your mod tools installations, where `tool.exe` is found. The easiest way to open Command Prompt this way is to navigate to your mod tools installation in Explorer ([Steam can do it](~mod-tools#installation)) and type `cmd` into the navigation bar. Alternatively, some modders copy `C:\Windows\System32\cmd.exe` into their mod tools directory and launch it from there. You can confirm that the correct current directory is shown at the start of the prompt line.

{% figure src="explorer.jpg" alt="Explorer's location bar selected" inline=true %}
Replace this text with `cmd` and hit {% key "Enter" /%} to launch Command Prompt.
{% /figure %}

## Running programs
Commands are entered in the form `<program> <arguments>`. Command Prompt will first look in the current directory for the program you want to run, and the `.exe` extension is optional. To run [Tool](~mod-tools#tools-overview) commands, type them into the prompt and hit {% key "Enter" /%}. For example, to build the tutorial map for H1:

```dos
tool build-cache-file levels\test\tutorial\tutorial
```

The arguments then tell Tool what to do, and are documented per-game (e.g. [H1 Tool](~h1-tool)). Programs and each argument are always separated by spaces. If a single argument contains spaces you need to wrap it with quotes: `"..."`.

{% alert %}
You don't need to type out commands you want to repeat. Use the {% key "Up" /%} and {% key "Down" /%} keys to navigate your command prompt's history.
{% /alert %}

## Navigation
Use the `dir` command to list files in the current directory, and `cd <path>` to navigate to a different one. The parent directory can be referred to using `..`. Sub-directories are always separated with backslashes.

```dos
dir

cd "C:\Program Files (x86)\Microsoft Games\Halo Custom Edition"
cd tags
cd ..\data
```

If you need to switch to a different physical drive, enter the drive letter followed by a colon like: `D:`. You can always open an Explorer window at the working directory by entering `explorer`.

## Scripting
You can automate a series of frequently run commands by putting them as multiple lines in a `.bat` file, which you can create with notepad. Suppose you were quickly iterating on your level's [BSP](~h1/tags/scenario_structure_bsp) and created a file `import_level.bat`:

```dos
REM Comment lines begin with "REM ".
REM Import and light the level:
tool structure levels\test\tutorial tutorial
tool lightmaps levels\test\tutorial\tutorial tutorial 0 0.6

REM Launch Standalone:
halo_tag_test.exe
```

Then you just need to double-click the file in Explorer, or enter `import_level.bat` in Command Prompt and it will perform these steps for you. Don't forget that you can also have Standalone automatically run [console commands](~developer-console) on startup by creating an `init.txt` file with one command per line.

## System PATH variable
It was mentioned earlier that Command Prompt _first_ looks in the current directory for the program you want to run, and this isn't the only place it looks. If you wish to keep tools like [Invader](~) in a separate location from the mod tools, but still want to be able to run its executables like `invader-extract` from any current directory, you can include the location of its executables in the system PATH environment variable, for which there are plenty of [online guides][env]. This is a list of directories where Windows will search for executables you want to run.

# PowerShell
[PowerShell][] is a newer Windows shell which was intended to improve upon Command Prompt. For the purposes of Halo modding, you would use it very similarly to Command Prompt, though it has a few small differences:

* When running a program in the current directory, prefix it with `.\` and include the extension like `.\tool.exe`.
* You can switch drives using `cd D:\example`.

# Bash (Linux)
In the rare case you're using the HEK on Linux, you probably already know what you're doing, but here are some tips for working under this setup specifically.

Since we are mainly interested in running Halo and [HEK](~custom-edition#halo-editing-kit) programs like [Tool](~h1-tool), which are Windows programs, you will need to set up [Wine][] to run them on Linux. This page will not cover how to install and use Wine, but to run an EXE program you will need to invoke it like so:

```sh
# Assuming tool.exe is in the CWD:
wine tool.exe build-cache-file levels\\test\\tutorial\\tutorial
```

Because tool.exe is a Windows program, it expects paths with Windows directory separators (backslashes). However, in Bash the backslash has special meaning and must be escaped. In other words, use double backslashes where you would normally use a single one.

Scripting is also possible. Here's an example, `compile-map.sh`:

```sh
set -e
wine tool.exe structure levels\\test\\tutorial tutorial
wine tool.exe lightmaps levels\\test\\tutorial\\tutorial tutorial 0.8 0.6
wine tool.exe build-cache-file levels\\test\\tutorial\\tutorial
wine haloce.exe
```

Run this script with the command `sh compile-map.sh` and it will compile, light, and build the map for you, then launch the game.

[cmd]: https://en.wikipedia.org/wiki/Cmd.exe
[powershell]: https://en.wikipedia.org/wiki/PowerShell
[bash]: https://en.wikipedia.org/wiki/Bash_%28Unix_shell%29
[wine]: https://www.winehq.org/
[env]: https://superuser.com/questions/949560/how-do-i-set-system-environment-variables-in-windows-10