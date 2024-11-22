---
title: Restoring "corrupt" FMOD sound banks
about: guide
keywords:
  - sounds
  - fmod
thanks:
  Kashiiera: Writing this guide
---

{% alert %}
This guide assumes you are importing your sounds into a custom FMOD sound bank.
{% /alert %}

# Introduction
This guide will teach you how to restore your FMOD sound banks when they refuse to import any more sounds **without** having to reimport every sound from scratch.

This guide is backwards compatible with the [H3EK](../../../../h3/h3-ek).

![](a.png "Example of Tool throwing an FMOD error after importing a sound")
# Setup

## Exporting sound tags
First, we need to export all of our sound tags into a `.csv` file. Fortunately, Tool includes a command specifically for this.

Open the [command prompt](~command-line) window in your **H3ODSTEK install folder** and run the `tool report-sounds` command with the first argument pointing to the folder containing all your sound tags, as follows:
```sh
tool report-sounds "sound"
```
![](b.png "")

After the command is run, a `sounds_report_sizes.csv` file will be generated in the `reports\reports_XX` folder. (Most likely `reports\reports_00`)

![](c.png "")

## Rebuilding the FMOD sound bank(s)
Now that we have our sound tags exported to a `.csv` file, we can rebuild our FMOD sound bank(s).

Open the [command prompt](~command-line) window in your **H3ODSTEK install folder** again and run the `tool export-fmod-banks` command with the first argument pointing to the `.csv`, the second argument being `pc`, the third argument being the type of bank you want to rebuild (either `sfx` or `languages`) and the fourth and final argument being the name of the FMOD sound bank(s) your sounds originated from (including the `-bank:` prefix), as follows:
```sh
tool export-fmod-banks "reports\reports_00\sounds_report_sizes.csv" pc sfx -bank:h3
```
![](d.png "")

## Finishing up

Once your FMOD sound banks have been rebuilt, you should hear the sounds you've imported when playing them back in-game! A `bank_name.report.csv` file is generated in the `fmod\pc` folder, which is located in the same folder as the `sounds_report_sizes.csv` file. This report contains information about the FMOD hashes and such.

If you get any more FMOD errors you should be able to keep importing sounds and you would just have to repeat the steps from this guide, all the sounds imported should work after properly rebuilding your FMOD sound banks (regardless if tool throws an FMOD error).