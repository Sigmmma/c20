**H3-Tool** (**tool.exe**), is a [command-line][] utility used to compile data into [tags][], and tags into [maps][map]. It was released as a part of the [Halo 3 Editing Kit][h3-ek] by 343 Industries in 2021.

# Conventions used in this article

- `<arg>` - refers to a mandatory argument.
- `[arg]` - refers to an optional argument (you can omit these).
- parentheses appended to the `arg` name are used to encode valid argument values.
- `arg(option1, option2)` - Either `option1` or `option2` can be passed as `arg`.
- `arg(optionClass)` - Any value of `optionClass` can be used.
- `Tool` or `tool.exe` - refers to the subject of this article, the H2C Tool, if the legacy Tool is being referred to that will be made explicit.

# Command line flags
- `-data_dir` and `-tags_dir` can be used to change the data and tag directories respectively. This might not work with all verbs as it's experimental. See [using custom content paths][using-custom-content-paths].
- `-pause` wait for user input before exiting, useful for custom launchers.

# Baking lightmaps (Faux)

Halo 3 uses a fairly sophisticated ligthmapping pipeline compared to the earlier games, for more information see the *Lighting and material of Halo 3* [GDC talk][gdc-lighting] or the [research paper of the same name][doi-lighting].
The end result of this is a system that produces much nicer looking lightmaps if used correctly (you are still responsible for setting up the lights correctly).
Lightmapping is also faster than stock H1 and H2 as multi-process/core support is included out of the box - in fact currently single process lightmapping is broken and multi process lightmapping has to be used.

## Data sync

Before you can start the lightmapping process you need to ensure certain data is synced. If the data is synced already this process is nearly instantaneous otherwise it can take a while depending on the BSP.

```sh
#tool faux_data_sync <scenario> <bsp-name>
tool faux_data_sync "levels\multi\riverworld\riverworld" "riverworld"
```

If you use the [Osoyoos launcher][osoyoos] or the Python script supplied this step will be done automatically.

## Lightmapping using the Python script
You need to install [Python][] if you haven't already see the [official documentation on how to do that for your platform](https://docs.python.org/3/using/index.html), if at some point you are asked if you wish to add python to PATH it is suggested you do that as it will make your life easier.
Once Python is installed and working run the `calc_lm_farm_local.py` script in the toolkit root directory.

```sh
#python calc_lm_farm_local.py <scenario> <bsp name> <light group> <quality(high, medium, low, direct_only)> 
python calc_lm_farm_local.py "levels\multi\riverworld\riverworld" riverworld all medium
```

If you aren't sure what to use for light group/region just use the catch all value of `all`, this will ensure all regions are lit correctly.
As for quality keep in mind that it will have an impact on how long lightmapping takes but should have only a minor impact on CPU utilisation percentage during that time - the script will use 100% of your CPU as it's hardcoded to use all the logical processors accessible to it. 

## Lightmapping using the Osoyoos launcher

Lightmapping using the launcher should be more or less the same as lightmapping Halo 2 using it, just keep in mind the fact that `super` quality is somewhat unstable and `high` might be good enough. You don't need to set a `lightmap region` if you don't know what it does.

## Manually lightmapping using the command line

The `faux_lightmap` and `faux_checkerboard` commands are meant to handle local single instance lightmaps but they are sadly currently broken. In principle you can invoke the same commands the launcher and the script invoke manually but this isn't recommended. In the interest of brevity it will not be discussed here - read the Python script if you are interested in how it works, it should be easy to understand as it's quite short.

[wiki-tiff]: https://en.wikipedia.org/wiki/TIFF
[wiki-color]: https://en.wikipedia.org/wiki/Color_depth
[wiki-real]: https://en.wikipedia.org/wiki/Real_number
[wiki-wav]: https://en.wikipedia.org/wiki/WAV
[gdc-lighting]: https://www.gdcvault.com/play/253/Lighting-and-Material-of-HALO
[doi-lighting]: https://doi.org/10.1145/1404435.1404437
[python]: https://www.python.org/