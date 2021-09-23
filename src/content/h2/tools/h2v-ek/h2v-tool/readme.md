```.alert
This is an article about the legacy H2V Tool for use with [Halo 2 Vista][h2], for the H2 Tool for MCC see [H2 Tool][h2-tool]
```

**H2V Tool** (**h2tool.exe**), is a [command-line][] utility used to compile data into [tags][], and tags into [maps][map]. It is part of the [H2V-EK][].

# ASS compilation
An [ASS][] file containing model geometry can be compiled into a [scenario_structure_bsp][] using the `structure-new-from-ass` verb:

```sh
# structure-new-from-ass <ass-file> <use-release>
h2tool.exe structure-new-from-ass "scenarios\multi\example\structure\example.ASS" yes
```

For the example above, Tool would expect to find an ASS file at `data\scenarios\multi\example\structure\example.ASS`. Assuming no errors, the ASS file will be compiled into a level at `tags\scenarios\multi\example\structure\example`. The scenario name comes from the parent folder name and the BSP name comes from the ASS filename.

Multiple JMS files can be placed in the models directory for multiple BSPs. Each JMS will be compiled into a separate structure BSP and added to the scenario. Scripts and trigger volumes can then be used to switch between the BSPs. Do not do this if you're making a multiplayer map.

The argument `<use-release>` is unused and was probably related to running either a debug or release version of the toolset. Leave it as "yes".

# ASS compilation verbose
Same as above, but outputs to the console much more in-depth information on the model while it's being processed. This is only useful if you're a developer that's debugging an import pipeline.

```sh
# structure-new-verbose-from-ass <ass-file>
h2tool.exe structure-new-verbose-from-ass "scenarios\multi\example\structure\example.ASS"
```

# Lightmaps
Tool can be used to generate [lightmaps][]. Using Tool, you will need the following arguments:

1. **Scenario [tag path][tags#tag-references-and-paths]**: This is _not_ a file path! Leave off the ".scenario" extension and start the path from within the tags directory.
2. **BSP name:** The name of the BSP tag without the file extension.
3. **Lightmap quality:** Choose a setting string from the following list. Settings are ordered from lowest to highest.

| Setting      | Photon Count | Sample Count | Gather Distance | Antialiasing Samples | Bounced Lighting |
| -------------| -------------| -------------| ----------------| ---------------------| -----------------|
| checkerboard | 10,000       | 0            | 1.0             | 1                    | No               |
| direct_only  | 100,000      | 0            | 1.0             | 1                    | No               |
| draft_low    | 5,000,000    | 0            | 1.0             | 1                    | Yes              |
| draft_medium | 10,000,000   | 0            | 2.0             | 2                    | Yes              |
| draft_high   | 15,000,000   | 0            | 3.5             | 2                    | Yes              |
| draft_super  | 20,000,000   | 0            | 4.0             | 2                    | Yes              |
| low          | 5,000,000    | 3            | 1.0             | 1                    | Yes              |
| medium       | 10,000,000   | 5            | 2.0             | 2                    | Yes              |
| high         | 15,000,000   | 8            | 4.0             | 2                    | Yes              |        
| super        | 20,000,000   | 8            | 4.0             | 4                    | Yes              |

For example:

```sh
# lightmaps <scenario> <bsp-name> <quality-setting>
h2tool.exe lightmaps "scenarios\multi\example\example" "example" checkerboard
```

Once you run the command rasterizing should begin. Wait until it finishes and you will be able to see the results in H2V Sapien.

# Lightprobes
???

```sh
# lightprobes <scenario> <bsp-name> <quality-setting>
h2tool.exe lightprobes "scenarios\multi\example\example" "example" checkerboard
```

# Lightmaps debug
???

```sh
# lightmaps_debug <scenario> <bsp-name> <quality-setting> <begin-light-index> <end-light-index>
h2tool.exe lightmaps_debug "scenarios\multi\example\example" "example" checkerboard 0 1
```

# Batch bitmap compilation
TIF, TIFF, uncompressed 32bit TGA, JPEG, and BMP images with a color depth of 24-bits or higher can be compiled into a [bitmap][] tag using the `bitmaps` verb:

```sh
# bitmaps <source-directory>
h2tool.exe bitmaps "characters\cyborg\bitmaps"
```

For the example above, Tool would expect to find image files at `data\characters\cyborg\bitmaps\`. Assuming no errors, each image file will be compiled into a bitmap tag at `tags\characters\cyborg\bitmaps\`. Each image file that exists in the source directory will be compiled into it's own individual tag with the name of the tag coming from the image filename.

# Unicode String compilation
UTF-16 text files containing strings can be compiled into a [multilingual_unicode_string_list][] using the `new-strings` verb:

```sh
# new-strings <source-directory>
h2tool.exe new-strings "scenarios\descriptions"
```

For the example above, Tool would expect to find text files at `data\scenarios\descriptions\`. Assuming no errors, a file named "example.txt" would be compiled into `tags\scenarios\descriptions\example.multilingual_unicode_string_list`. Each text file that exists in the source directory will be compiled into it's own individual tag with the name of the tag coming from the text filename.

# Build cache file
A [scenario][] can be compiled into a [map][] using the `build-cache-file` verb. Simply provide your scenario's tag path:

```sh
# build-cache-file <scenario>
h2tool.exe build-cache-file "scenarios\multi\example\example"
```

The resulting map file can be found in H2EK's `maps` directory.

# Structure analyze
Checks a structure for errors.

```sh
# structure-analyze <scenario_structure_bsp>
h2tool.exe structure-analyze "scenarios\multi\example\example"
```

# Scenario analyze
Checks the scenario for errors.

```sh
# scenario-analyze <scenario> <inspection-type>
h2tool.exe scenario-analyze "scenarios\multi\example\example" "count tags"
```

Use one of the following strings for inspection type.

```
"count tags"
"dump tags"
"find material references"
"count edges"
"check effects"
```

# Progress quest
This command does nothing. It might have been used to test progress bars.

```sh
# progress-quest
h2tool.exe progress-quest
```

# Rebuild structure audibility
???

```sh
# rebuild-structure-audibility <structure>
h2tool.exe rebuild-structure-audibility "scenarios\multi\example\example"
```
