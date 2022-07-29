**HR Bonobo** (`Bonobo.exe`) is part of the [Halo Reach Editing Kit][hr-ek], is a visual [tag][tags] editor. Although it can visualize [bitmaps][bitmap], [models][model] and [interfaces][chud_definition] it is primarily focused on editing and viewing the structured fields which comprise tags. It does not offer true ingame previews or interactive placement of [objects][general/tags/object], which is [Sapien's][HR-Sapien] role.

It takes over the role of Guerilla, the program that is used in prior games for editing and viewing tags, offering many new features and advantages such as being able to open multiple tags in tabs much like modern internet browsers.

# Explorer bar
A file hierarchy of your tag directory. It will update in real time so you do not need to refresh it. Much like the hierarchy first seen in [Halo 2 Vista's Guerilla][h2v-guerilla] and [Halo 2 MCC's Guerilla][H2-Guerilla].
![.figure Pictured: The tag context menu](tag-context-menu.png)
Right clicking a tag will bring up a menu that lets move or copy the tag to a different path. Moving a tag will automatically fix references to the tag.
You can also copy the tag name to clipboard or open the path in File Explorer. The *X-sync* menu items do nothing.

# Tag Watcher
The Search panel of the explorer bar will not work without first running TagWatcher. To run the program, follow these steps:
* Navigate to the `bin\tools\bonobo` directory from your HREK install location using Explorer.
* In the Navigation Bar, type in `cmd` and press enter to open a command prompt window.
* In the command prompt window type in `TagWatcher` followed by the root directory of your HREK folder, surrounded by quotes.
```
TagWatcher "C:\Program Files (x86)\Steam\steamapps\common\HREK"
```

# Main window
## Basic tag management
- _File > New_ - Opens a dialog for creating a new empty tag, keep in mind that many tags are not meant to be created like this but are instead meant to be created using [Tool][hr-tool].
- _File > Open_ - Lets you select an existing tag using the windows file selection UI, useful if you know the partial tag name since you can use windows search.
- _File > Save_ - Save the currently active tag.
- _File > Save Tag As_ - Save the active tag under a new name, references to the old name will not be updated, effectively creates a copy of the tag with the current changes applied.
- _File > Import Tag_ - Opens a dialog for importing a new asset using a sidecar file.
- _File > Export Tag To XML_ - Exports the active tag as an XML or text file.
- _File > Generate Tag Report - Runs the Tool command `tag-file-report` on the active tag.

## Librarian
The Librarian can be found using the *Tools > Librarian* menu item and is used for browsing and managing assets. The Create option can be used for setting up new data directories and sidecar files for importing while the Edit option can then be used to edit sidecar files. The filter and search menu functions much like the explorer bar in the main window however it can also be used for data files as well as tags.

## Launch Scenario
Allows you to launch scenarios from Bonobo using preset settings as well as custom init commands. Does not currently work with the Standalone client, only Sapien.

## Content Explorer
Seems to be designed to browse tags, doesn't seem to work well right now.

## Asset Browser
Several different types of asset browser are available, however the bitmap browser currently causes TagService to crash when used. Appears to be designed similarly to the Content Explorer to browse data files instead of tags.

## Run tool from Bonobo
Bonobo can run [Tool][hr-tool] commands using the *File > Run tool* menu item, the UI makes it easy to select the command you wish to run and arguments.

## Tag editing
Changes to tag fields can be undone by <kbd>Control</kbd> + <kbd>z</kbd>. If you need more than just the most recent change you can use _Edit > Hold_ and _File > Fetch_. *Hold* will save the current state of the tag and *fetch* will restore that saved state.
If you need to use certain advanced features you can enable _Edit > Expert Mode_, this will let you edit certain fields and blocks. Don't enable this unless you know what you are doing or need it for something specific as it makes it easier to accidentally corrupt your data.

## Misc
- *Window* - Lets you automatically arrange tag windows.
![.figure Pictured: An example of the grid/multi tag view.](hr-grid-view.png)
- Holding <kbd>Alt</kbd> while opening a tag will open the tag as a column in a "grid view"/"multi-tag view". This makes comparing values across tags easier. 

## Non-functional/Unknown
- _Tools > Data > Keyword Chooser_ - Causes a crash.
- _Tools > Reports > Animation Details_ - Causes a crash.
- _Source Control > Get Latest_ - Doesn't do anything.
- _Source Control > Delete_ - Doesn't do anything.