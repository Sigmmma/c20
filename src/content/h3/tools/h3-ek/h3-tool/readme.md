```.alert
This is an article about the H2A Tool for use with MCC. For the legacy Tool for [Halo 2][h2] see [h2tool][]. You may also be interested in a [summary of changes][h2a-ek#tool] from legacy Tool.
```

**H2C-Tool** (**tool.exe**), is a [command-line][] utility used to compile data into [tags][], and tags into [maps][map]. It was released as a part of the [Halo 2 Anniversary Editing Kit][H2A-EK] by 343 Industries in 2021.

This new version of Tool has many differences from the 2007 Pi Studios Tool. Most notably, it includes far more verbs and new options for existing ones. A major addition is the FBX to JMS/JMA toolchain to compile models regardless of what 3D modeling software you use.

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

TODO: Copy over H2 MCC commands that were kept, doc new ones


[wiki-tiff]: https://en.wikipedia.org/wiki/TIFF
[wiki-color]: https://en.wikipedia.org/wiki/Color_depth
[wiki-real]: https://en.wikipedia.org/wiki/Real_number
[wiki-wav]: https://en.wikipedia.org/wiki/WAV
