**TagTool**, is a [command-line][] utility used primarily to port data into [tags][], and port [tags][] into maps. 

# General Info
* TagTool Functions very similarly to Tool, making it easy to learn if you have past experince with the Halo Editing Kit.
* Primarily designed for Halo Online, TagTool also Supports Legacy and MCC Map files.
* Map and tag formats may change over time as the game receives updates, meaning TagTool must be updated regularly.

```.alert danger
Support for certain features/commands depends on the Halo game being modified.

 `TagTool` or `TagTool.exe` - refers to the subject of this article
```
# Command Guide

## AddBlockElements
Adds/inserts block element(s) to a specific tag block in the current tag definition.

`AddBlockElements <block name> [amount = 1] [index = *]`
* block name - Name of the block you want to add.
* amount - Number of blocks you want to add, defaults to 1.
* index - what index to insert the tag block at, defaults to the last tag block.

## CopyBlockElements
Copies block elements from one tag to another.

`CopyBlockElements <block name> [index = *] [count = 1]`
* block name - Name of the block you want to copy.
* index - What tag block index you want to copy, defaults to the last tag block.
* count - Number of blocks you want to copy, defaults to 1.

## CreateTag
Creates a new tag of the specified tag group in the current tag cache.

`CreateTag <tag group> [index = *]`
* tag group - A valid tag group.
* index - Index where the tag will be created, defaults to the last tag index.

## DumpLog
Dumps the current log into the logs directory.

`DumpLog [name = hott_*_crash.log]`
or
`DumpLog [name = *.txt]`
* name - Name of the log, defaults to hott_MM_DD_YYY_HH_MM_AM/PM_crash.log.

## DuplicateTag
Copies a tag\'s data into a new tag. Don\'t forget to name the tag afterwards using the NameTag command if you don't name it using this command.
`DuplicateTag <tag> [tagname]`
* tag - the name of the tag you would like to duplicate.
* tagname - the name you would like to give the new tag, this value is optional.

## EditBlock
Opens a tagblock element at a specified index for editing.

`EditBlock <name> <index>`
* name - Name of the block you want to edit.
* index - What tag block index you want to edit.

## EditTag
Open a tag for editing and enable the usage of certain commands specific for this tag type. Not all tag types from all game versions are currently supported. 

`EditTag <tag>`
* tag - the name or hexadecimal index of the tag you would like to edit.

```.alert danger
NOTE: after making changes to a tag opened for editing with EditTag, it is essential that you use the `SaveTagChanges` to save the changes to the tag before exiting!
```


## Exit
- `Exit`
Exit to the previous context in the context stack.

## ExitTo
Exits each context on the stack until the specified one is found. See the `Exit` command to exit a single context on the stack.
`ExitTo <context name>`
* context name - The name of the context you want to exit to.

```.alert danger
NOTE: The context stack can be viewed within the command line window prompt. For instance, you might have the prompt `tags\potato.jmad\SkeletonNodes[0]`. In this case you can use the command `ExitTo tags` to return directly to the `Tags\` context.
```

## ExportCommands
Prints the commands needed to generate the current tag structure.

`ExportCommands [nodefaults]`
* nodefaults - Prevent exporting commands to set fields that are using default values.

```.alert danger
NOTE: You can add a `>` followed by a file directory after any command to pipe the output to a `.txt` file.
```

## ExportSound
Export snd! data to a file.
`ExportSound [format] <Path>`
* format - The file format you want to export as.
* path - Path to where you want the file to be saved.

## ExtractBitmap
Extracts a bitmap to a file.

`ExtractBitmap <output directory>`
* output directory - Path to where the extracted bitmap will be saved.

## ExtractBitmaps
Extract all bitmaps to a folder.

`ExtractBitmaps <type> <directory>`
* type - Only available type is all, defaults to all.
* directory - Path to export the bitmaps.

## ExtractModel
The `extractmodel` command can be used in either the collision model or the render model context to extract the geometry data from the respective tag.

### Render Model Context
The extract model command when used in a render model `.mode` tag context extracts the render model to `.obj`, `.amf`, or `.dae` format at the location specified.

`ExtractModel <variant> <filetype> <filename>`
* variant - name of the model variant that you would like to extract, as seen in the render model variants block
* filetype - type of file format you would like to extract the render model data to - `.obj`, `.amf`, `.dae`
* filename - file directory for the extracted obj file

### Collision Model Context
The extract model command when used in a collision model `.coll` tag context extracts the collision model to `.obj` format at the location specified.

`ExtractModel <filename>`
* filename - file directory for the extracted `.obj` file

## ForEach
- `ForEach`
The ForEach command can be used to execute another command on a set of tags or tag blocks specified using a provided filter.

### ForEach On Tags
Executes a command on every instance of the specified tag group.

`ForEach [const] <tag group> [named: <regex>] <command>`
* tag group - A valid tag group.
* named: - Filters the results by the given regex string.
* regex - regex string to filter the results by.
* command - The command you want to execute on the tags specified.

### ForEach On Tag Elements
Executes a command for each element in the specified tag block.

`ForEach <tag Block> [from: *] [to: *] <Command>`
* tag block - A valid tag block.
* from: - Index to start from.
* to: - Index to end at.
* command - The command you want to execute on the tag blocks specified.

## GenerateBitmap
Creates a new bitm tag with a specified name from a DDS image.

`GenerateBitmap <desired name> <path to dds>`
* desired name - Name of the bitmap you want to generate.
* path to dds - Path to the bitmap you want to import.

## GenerateCampaignFile
Generate a halo3.campaign file for a specificed map info folder.

`GenerateCampaignFile <mapInfo directory>`
* mapinfo directory - Path to the retail map info folder from a supported Halo game.

## ImportBitmap
Imports an image from a DDS file. No conversion will be done on the data in the DDS file. The pixel format must be supported by the game.

`ImportBitmap <image index> <dds file> [curve mode]`
* image index - index of the bitmap in the images block.
* dds file - The bitmap you want to import.
* curve mode - The gamma correction type; xRGB, Gamma2, Linear, Offset Log, sRGB, or Rec709.

```.alert danger
NOTE: This command must be used while a bitmap tag is currently open for editing.
```

## ImportCollisionGeometry
The `ImportCollisionGeometry` command is used to create a new .coll tag using a model in a format accepted by [Assimp](https://github.com/assimp/assimp/blob/master/doc/Fileformats.md) Arguments can be used to optionally generate BSP Physics and MOPP code blocks to allow this coll tag to also provide player collision. See the BSP Physics and MOPP codes section below for more information.


`importcollisiongeometry [mopp] [force] [debug] <input file directory> <tagname>`
* input file directory - the directory of the model file that you would like to import
* tagname - the name which you would like to give to the new collision model tag that you are importing. this name must be unique and not currently used in the current cache.
### Arguments
* mopp - generate BSP Physics and MOPP code blocks to allow this coll tag to also provide player collision
* force - bypass certain checks on model import including the open edge check. WARNING: collision models with open edges may cause severe physics issues
* debug - increase verbosity of error output to help debug model issues
 
### Model Requirements
Models imported using this command must have:
* no open edges
* no more than two surfaces sharing a single edge
* no overlapping surfaces
* no more than 65535 edges, vertices, or surfaces

#### Scale and Axis Conventions
* Halo works at a scale that is 1/100 the scale of most common 3D modeling programs which use m (meters) as their base unit. To compensate for this, TagTool geometry importers scale down models to 1/100 of their size during the import process. When scaling your model, keep in mind that master chief is approximately 1.7m in standard scale.
* Halo uses a Y-up axis convention, similar to many 3D modeling programs such as Autodesk 3DS Max. Blender, another common 3D modeling program, uses a Z-up axis convention, which can result in a discrepancy between how your model appears in blender vs how your model appears in-game. For example, if a Halo/3DS Max coordinate was recorded as <x,y,z>, an equivalent Blender coordinate would be <x,-z,y>.

### BSP Physics and MOPP codes
A collision model (.coll) tag with BSP physics and MOPP code blocks can be used to create a scenery (.scen) object that has full collision capabilities without the need for a physics model (.phmo) tag. With this arrangement, the scenery object will be static and immovable, similar to map geometry. However, the object can still be manipulated using Forge. When setting up a scenery object in this way, there are a number of important considerations:
* the model (.hlmt) tag associated with the scenery (.scen) tag must NOT reference a physics model (.phmo) tag, or the collision on the scenery object will not be functional.
* the BSP physics block in the coll tag has a tag reference field that MUST reference the parent model (.hlmt) tag, or the game will crash upon model interaction.

### Troubleshooting & Common Errors
Most errors will automatically print out a list of coordinates at which to find the geometry elements that are causing errors. These coordinates are printed in both Y-Up (3DS Max etc) and Z-Up (Blender) axis conventions.

* `###ERROR Failed to split surface!`
This uncommon error usually occurs when the model is either too highly detailed or too small to allow the BSP generator to effectively split surfaces. Check that you have scaled your model correctly according to the model requirements section above.

* `###ERROR: Edge with below vertices is open!`
An open edge is an edge of a surface that does not contact any other surfaces. To avoid having any open edges, your model must be a completely closed shape. Use the coordinates listed to find the problem edge, and close any openings in the model that are present there.

* `###ERROR: Face # did not have exactly 3 vertices!`
This error occurs when you have a polygon in your model that has two overlapping vertices. Make sure to use the clean up tools in your 3D modeling software of choice to remove invalid and incomplete polygons.

* `###ERROR: Edge between the following vertices is contacted by more than two surfaces!!`
Only two surfaces may share an edge. Use the printed coordinates to find the region in your model where more than two surfaces meet, and adjust the model to ensure that only two surfaces share a single edge.

## ImportSound
Import one (or many) sound files into the current snd! tag. Overwrites existing sound data.

`ImportSound [raw] [data file]`
* raw - Import a new sound resource without touching tag data.
* path - Path to the sound you want to import.

## ListFields
Lists the fields in the current tag definition.

`ListFields [filter]`
* filter - filter results by the word specified.

## ListTags
Lists tag instances that are of the specified tag group. Multiple group tags can be specified. Tags of a group which inherit from the given group tags will also be printed. If no group tag is specified, all tags in the current tag cache file will be listed. Results can be filtered using the "named:" argument.

`ListTags <tag group(s)> [named: <name>]`
* tag group - A valid tag group.
* named: - Filters the results by the given name.
* name - Name to filter the results by.

## ListBlamTags
Lists tag instances that are in the specified cache file that is currently open for porting. 

`ListBlamTags <tag group(s)> [named: <name>]`
* tag group - A valid tag group.
* named: - Filters the results by the given name.
* name - Name to filter the results by.

## NameTag
Sets the name of a tag in the current cache.

`NameTag <tag> <name>`
* tag - A valid tag index, tag name, or * for the last tag in the current cache.
* name - The desired name of the tag. Should be a concise name that resembles the format of existing tag names. Leave this blank to remove the name of the specified tag.

## OpenCacheFile
Opens a porting context with the specified cache file.

`OpenCacheFile <cache file>`
- cache file - Path to a retail .map file from supported Halo games.

```.alert danger
 NOTE: a porting context is separate from a cache editing context, and all non-porting commands will still apply to your base cache, not the cache in the porting context.
```

## PasteBlockElements
Pastes block element(s) to a specific tag block in the current tag definition. See the `CopyBlockElements` command for copying the tag blocks.

`PasteBlockElements <block name> [index = *]`
* block name - Name of the block you want to copy.
* index - What tag block index you want to copy, defaults to the last tag block.

## PokeTagChanges
Pokes changes made to the current tag definition to a running game's memory. This command generally won't crash your game, but in many cases it will fail to poke the changes and notify you as such.

`PokeTagChanges [process id]`
* process id - The ID of the `.exe` you want to poke to.

## PortTag
Ports a tag from the cache in the porting-context to the current base cache. See `OpenCacheFile` to learn how to open a cache file in the porting-context.

`PortTag [Options] <tag>`
- tag - Name of the tag you want to port.

### Options
Options are space-delimited, and any number of options can be set at once. Place a ! before an option to disable it. For example, adding the option `Audio` will enable audio porting, but adding the option !Audio will disable it.

| Option | Description |
| ---------------------------------------------------- | ---------------------------------------------------- |
| Replace  | Replace tags of the same name when porting.  |
| Recursive  | Recursively port all tag references available.  |
| New  | Create a new tag after the last index.  |
| UseNull  | Port a tag using nulled tag indices where available.  |
| Audio  | Include Sound (snd!) tags. |
| Elites  | Include elite Biped (bipd) tags.  |
| ForgePalette  | Include Scenario.SandboxObject tag-blocks.  |
| Squads  | Include Scenario.Squad tag-blocks.  |
| Scripts  | Include Scripting.Script tag-blocks.  |
| MatchShaders  | Attempt to match shaders to existing tags.  |
| PefectShaderMatchOnly  | Only use templates that have the exact same render method options  |
| Memory  | Keep cache in memory during porting.  |
| Rmhg  | Include ShaderHalogram (rmhg) tags.  |
| Ms30  | Allow using existing tags from Ms30.  |
| Print  | Allow writing output to the console.  |
| Merge  | Merges new data if tags exist.  |
| Regex  | Use a regular expression to determine target tags  |
| GenerateShaders  | Attempt to generate shaders.  |
| MPobject  | Add a multiplayerobject block for spawnable tag types.  |

## Quit
Quits the program.
`Quit`

## RemoveBlockElements
Removes block element(s) from a specified index of a specific tag block in the current tag definition.

`RemoveBlockElements <block name> [amount = 1] [index = *]`
* block name - Name of the block you want to remove.
* amount - Number of blocks you want to remove, defaults to 1.
* index - What tag block index you want to remove, defaults to the last tag block.

## ReplaceRenderGeometry
Replaces the render geometry of the current render model tag with geometry compiled from a COLLADA scene file (.DAE).
Your collada file must contain a single mesh for every permutation.

For 3ds Max name your meshes as `{region}:{permutation}` (e.g. `hull:base`)

For Blender name them as `{region}_{permutation}Mesh` (e.g. `hull_baseMesh`)

`ReplaceRenderGeometry <COLLADA Scene>`
* COLLADA Scene - Path to the `.dae` file you want to import.

## SaveTagChanges
Saves changes made to the current tag definition.
`SaveTagChanges` 

```.alert danger
NOTE: It is essential to use this command after making any edits to a tag to ensure that your changes are preserved!
```
## SaveTagNames
Saves a list of the tag names for the current cache to the specified csv file or to a default location.

`SaveTagNames [csv path]`
* csv path - the path to the csv you would like to save to, defaults to the one used in the current cache.

## SetField
Sets the value of a specific field in the current tag.
### Setting Fields In Tags
The setfield command can set fields by specifying the field name and the value you want to give it.

`SetField <field name> <field value>`
- field name - the name of the field you would like to edit.
- field value - the value you want to give the field.

### Setting Fields In Tag blocks
The setfield command can set fields in tag blocks by specifying the block name and index before the field name and value, you can set fields multiple blocks deep by specifying all the block names and indexes until you reach the field you want to set.

`setfield <block name>[block index].<field name> <field value>`
- block name - the name of the block you would like to edit.
- block index - the index  of the block you would like to edit.
- field name - the name of the field you would like to edit.
- field value - the value you want to give the field.

### Field Types
There are many different field types each with their own way of setting them.
#### Flags
Flag fields containain multiple flags that can be turned on and off, multiple flags can be turned on at the same time by separating the flag name with comma\'s.

`setfield <field name> <flag1>,<flag2>,<flag3>`
- field name - the name of the field you would like to edit.
- flagX - the name of the flag you want to check.

#### Ranges
Range fields have lower and upper bounds

`setfield <field name> <lower> <upper>`
- field name - the name of the field you would like to edit.
- lower - the lower bounds of the range.
- upper - the upper bounds of the range.

#### Real Point 3D
Real point 3D fields use x y z coordinates.

`setfield <field name> <x> <y> <z>`
- field name - the name of the field you would like to edit.
- x - the value of the x axis.
- y - the value of the y axis.
- z - the value of the z axis.

#### String Id\'s
String Id\'s fields use the value of a string id.

`setfield <field name> <string id>`
- field name - the name of the field you would like to edit.
- string id - the name of an existing string id, if the string id doesn\'t exist, you will need to create it with the `stringid` command.

#### Tag References
Tag reference fields reference other tags in the cache.

`setfield <field name> <tag name>`
- field name - the name of the field you would like to edit.
- tag name - the name of the tag you would like to reference.

## SetString
Sets the string associated with a stringID in a language. Remember to put the string value in quotes if it contains spaces. If the string does not exist, it will be added.

`SetString <language> <stringid> <value>`
* language - the language this string is for.
* stringid - the name of the stringid you would like the set.
* value - the value you would like to give the stringid.

### Unicode Characters
Along side the normal use of setting a string to a word or phrase, you can also use predefined Unicode characters to refer to specific things in the game. For instance, there is a Unicode character `\uE461` that is presented in game as either "Hold" if your input method is set to controller, or "Press" if your input method is set to keyboard/mouse. Following is a table that defines all known Unicode string characters, and their resulting text.


| Unicode Character  | String |
| ------------- | ------------- |
| \uE461  | Hold/Press  |
| \uE45F  | Activation Key  |


#### Notes
When using a Unicode character in a string, the `\u` portion simply declares the following text to be a Unicode character, while the `E000` portion is the actual Unicode character reference.

To split the line of the resulting string printed in game, for instance if you want to put your font image on a new line below the text "Hold E to pick up" just use |n, no spaces before or after.

### Example
`setstring english pr_pickup "\uE461 \uE45F to pick up|n\uE12A"`
* E461 and E45F being "Press" and "\<E\>" if you're on mouse+keyboard with your default activation key set to E. |n splits the line and E12A is a font package reference to an image of the plasma rifle schematic.

The resulting string in game looks a little something like this:

![Example image](https://i.imgur.com/rMMV3wP.png)

## StringId
The `stringid` command allows you to add, retrieve, or list stringids in the current cache.

### StringId Add
Adds a new stringID to the cache.

`StringId Add <string>`
* string - the name of the stringID you would like to add.

### StringId Get
Displays the string corresponding to an ID value.

`StringId Get <id>`
* id - the hexadecimal ID of the stringID you would like to retrieve the string value of.

### StringId List
Lists stringIDs in the cache, optionally filtering them.

`StringId List [filter]`
* filter - the word you would like to filter by.

## UpdateMapFiles
Updates the game's .map files to contain valid scenario indices.

`UpdateMapFiles <mapinfo directory> [forceupdate]`
* mapinfo directory - Path to the retail map info folder from a supported Halo game.
* forceupdate - Force the map files to be updated.

## UseAudioCache
Specify a directory to store audio files.

`UseAudioCache <Directory>`
* directory - Path to the folder you want to use as the audio cache.

## UseShaderCache
Specify a directory to store audio files.

`UseShaderCache <Directory>`
* directory - Path to the folder you want to use as the shader cache.

