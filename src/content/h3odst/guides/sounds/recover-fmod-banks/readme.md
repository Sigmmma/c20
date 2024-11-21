---
title: Restoring "corrupt" FMOD sound banks
about: guide
keywords:
  - sounds
  - fmod
thanks:
  Kashiiera: Writing this guide
---
# Introduction
This guide will teach you how to restore your FMOD sound banks when they refuse to import any more sounds **without** having to reimport every sound from scratch.

This guide is backwards compatible with the [H3EK](../../../../h3/h3-ek).

{% alert %}
This guide assumes you are importing your sounds into a custom FMOD sound bank.
{% /alert %}

![](a.png "Example of Tool throwing an FMOD error after importing a sound")
# Setup

## Exporting sound tags
To start off, we have to export all of our sound tags into a .csv file and fortunately Tool includes a command just for this.

Open the [command prompt](~command-line) window in your **H3ODSTEK install folder** and run the `tool report-sounds` command with the first arguement pointing to the folder containing all your sound tags like so:
```sh
tool report-sounds "sound"
```
![](b.png "")

After the command is ran, the .csv file will be located in the `reports\reports_XX` folder.

![](c.png "")

## Rebuilding the FMOD sound bank(s)
Now that we have our sound tags exported to a `.csv` file we can rebuild our FMOD sound bank(s).

Open the [command prompt](~command-line) window in your **H3ODSTEK install folder** again and run the `tool export-fmod-banks` command with the first arguement pointing to the `.csv`, the second argument being `pc`, the third being what type of bank you want to rebuild (either `sfx` or `languages`) and the fourth being the name of the FMOD sound bank(s) your sounds originated from (including `-bank:`)
```sh
tool export-fmod-banks "reports\reports_00\sounds_report_sizes.csv" pc sfx -bank:h3
```
![](d.png "")

## Finishing up

Once your FMOD sound banks have been rebuilt, you should be able to hear the sounds you've imported! A report `.csv` is generated in the "fmod" folder next to the original exported sounds `.csv` which contains information about the FMOD hashes and such.

If you get any more FMOD errors you should be able to keep importing sounds and you would just have to repeat the steps from this guide, all the sounds imported (regardless if you got an error or not) should work after properly rebuilding your FMOD sound banks.