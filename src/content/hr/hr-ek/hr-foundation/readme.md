---
title: HR Foundation
stub: true
about: 'tool:HR-Foundation'
img: hr-foundation.jpg
caption: A screenshot of Foundation
keywords:
  - tag-editor
---
**HR Foundation** (`Foundation.exe`) is part of the [Halo Reach Editing Kit](~hr-ek), is a visual [tag](~tags) editor. Although it can visualize [bitmaps](~bitmap), [models](~model) and [interfaces](~chud_definition) it is primarily focused on editing and viewing the structured fields which comprise tags. It does not offer interactive placement of objects, which is [Sapien's](~HR-Sapien) role.

It takes over the role of Guerilla, the program that is used in prior games for editing and viewing tags, offering many new features and advantages such as being able to open multiple tags in tabs much like modern internet browsers.

# Explorer bar
A file hierarchy of your tag directory. It will update in real time so you do not need to refresh it. Much like the hierarchy first seen in [Halo 2 Vista's Guerilla](~h2v-guerilla) and [Halo 2 MCC's Guerilla](~H2-Guerilla).
{% figure src="tag-context-menu.png" %}
Pictured: The tag context menu
{% /figure %}
Right clicking a tag will bring up a menu that lets move or copy the tag to a different path. Moving a tag will automatically fix references to the tag.
You can also copy the tag name to clipboard or open the path in File Explorer. The *X-sync* menu items do nothing.

# Tag Watcher
The Search panel of the explorer bar will not return any results without first running TagWatcher. To run the program, follow these steps:
* Navigate to the `bin\tools\bonobo` directory from your HREK install location using Explorer.
* In the Navigation Bar, type in `cmd` and press enter to open a command prompt window.
* In the command prompt window type in `TagWatcher` followed by the root directory of your HREK folder, surrounded by quotes.
```
TagWatcher "C:\Program Files (x86)\Steam\steamapps\common\HREK"
```

# Main window
## Basic tag management
- _File > New_ - Opens a dialog for creating a new empty tag, keep in mind that many tags are not meant to be created like this but are instead meant to be created using [Tool](~hr-tool).
- _File > Open_ - Lets you select an existing tag using the windows file selection UI, useful if you know the partial tag name since you can use windows search.
- _File > Save_ - Save the currently active tag.
- _File > Save Tag As_ - Save the active tag under a new name, references to the old name will not be updated, effectively creates a copy of the tag with the current changes applied.
- _File > Import Tag_ - Opens a dialog for importing a new asset using a sidecar file.
- _File > Export Tag To XML_ - Exports the active tag as an XML or text file.
- _File > Generate Tag Report - Runs the Tool command `tag-file-report` on the active tag.

## Run Tool Command

Foundation has the ability to run Tool commands through its interface which can be found under *Tools > Run Tool Command* or by using the keys {% key "Control" /%} + {% key "Shift" /%} + {% key "t" /%}. 
{% figure src="run-tool-command.png" %}
Pictured: The Run Tool Command window.
{% /figure %}
It contains a list of all commands that can be run using Tool as well as a list of common commands and a Favorites category. Commands can be filtered to search through the list and the tick box next to each command can be used to place or remove an item from the Favourites category. Any output from Tool will be shown in the box below which can be searched as well as filtered by error level.



## Librarian
The Librarian can be found using the *Tools > Librarian* menu item and is used for browsing and managing assets. The Create option can be used for setting up new data directories and sidecar files for importing while the Edit option can then be used to edit sidecar files. The filter and search menu functions much like the explorer bar in the main window however it can also be used for data files as well as tags.

## Launch Scenario
Allows you to launch scenarios from Foundation using preset settings as well as custom init commands. Does not currently work with the Standalone client, only Sapien.

## Content Explorer
Seems to be designed to browse tags, doesn't seem to work well right now.

## Asset Browser
Several different types of asset browser are available, however the bitmap browser currently causes TagService to crash when used. Appears to be designed similarly to the Content Explorer to browse data files instead of tags.

## Run tool from Foundation
Foundation can run [Tool](~hr-tool) commands using the *File > Run tool* menu item, the UI makes it easy to select the command you wish to run and arguments.

## Tag editing
Changes to tag fields can be undone by {% key "Control" /%} + {% key "z" /%}. If you need more than just the most recent change you can use _Edit > Hold_ and _File > Fetch_. *Hold* will save the current state of the tag and *fetch* will restore that saved state.

User Views can be used to hide fields and blocks, this can be particularly useful for large tags such as scenarios, for example you could create a custom user view to only show the object palettes.

If you need to use certain advanced features you can enable _Edit > Expert Mode_, this will let you edit certain fields and blocks. Don't enable this unless you know what you are doing or need it for something specific as it makes it easier to accidentally corrupt your data and it will also disable user views.

## Misc
- *Window* - Lets you automatically arrange tag windows.
{% figure src="hr-grid-view.png" %}
Pictured: An example of the grid/multi tag view.
{% /figure %}
- Holding {% key "Alt" /%} while opening a tag will open the tag as a column in a "grid view"/"multi-tag view". This makes comparing values across tags easier. 

## Non-functional/Unknown
- _Tools > Data > Keyword Chooser_ - Causes a crash.
- _Tools > Reports > Animation Details_ - Causes a crash.
- _Source Control > Get Latest_ - Doesn't do anything.
- _Source Control > Delete_ - Doesn't do anything.
