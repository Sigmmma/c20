---
title: H2 Guerilla (2021)
stub: false
about: 'tool:H2-Guerilla'
img: h2-guerilla.jpg
caption: A screenshot of Guerilla
keywords:
  - tag-editor
  - h2guerilla
related:
  - /h1/h1a-ek/h1a-guerilla
  - /h2/tools/h2v-ek/h2v-guerilla
  - /h3/h3-ek/h3-guerilla
---
{% alert %}
This is an article about the H2 Guerilla for use with MCC. For the legacy H2V Guerilla for [Halo 2 Vista](~h2) see [H2V Guerilla](~h2v-guerilla).
{% /alert %}

**H2 Guerilla** (`guerilla.exe`)  part of the [Halo 2 Anniversary Editing Kit](~H2-EK), is a visual [tag](~tags) editor. Although it can visualize [bitmaps](~bitmap) and play sounds, it is primarily focused on editing and viewing the structured fields which comprise tags. It does not offer ingame previews or interactive placement of [objects](~object), which is [Sapien's](~h2-sapien) role.

# Changelog
Listing all the changes from H2V is an endless task but this section will attempt to list all major ones.
- Features for refactoring tag paths (find referring tags, move tag, copy tag, etc).
- The original bungie-era about dialog is used.
- Some erratum in tag definitions was fixed or marked comment.
- Preferences are now saved to the `prefs` directory instead of registry.
- Names were added for some tag blocks.
- Any string width confusion errors that [H2Codez](~) fixed should not be an issue as H2 Guerilla is based off a branch that was never internationalized.
- `Do not use` fields were hidden from view as they should not be used.
- File selection dialogues were upgraded to use Vista+ dialogues (Like H1A Guerilla and H2Codez enhanced H2V Guerilla)


# Explorer bar
A new feature in Halo 2 is to show a file hierarchy of your tag directory. It does not update in real time so refresh it with F5 if you need to.
{% figure src="tag-context-menu.png" %}
Pictured: The tag context menu
{% /figure %}
Right clicking a tag will bring up a menu that lets move or copy the tag to a different path. Moving a tag will automatically fix references to the tag.
You can also copy the tag name to clipboard or open the path in File Explorer. The *X-drop* menu item does nothing.

{% alert %}
Currently the tag moving functionality is somewhat broken, references will be automatically updated as expected but you need to manually move the tag.
{% /alert %}

# Main window
## Basic tag management
- _File > New_ - Opens a dialog for creating a new empty tag, keep in mind that many tags are not meant to be created like this but are instead meant to be created using [Tool](~h2-tool).
- _File > Open_ - Lets you select an existing tag using the windows file selection UI, useful if you know the partial tag name since you can use windows search.
- _File > Close_ - Self explanatory, closes the currently active tag (one who's window is in the foreground).
- _File > Save_ - Save the currently active tag.
- _File > Save as_ - Save the active tag under a new name, references to the old name will not be updated, effectively creates a copy of the tag with the current changes applied.

## Tag refactoring
- _File > Fix Tag Dependencies_ - Builds a database of all tags (this takes a while) and then uses it to help you fix any issues with missing/renamed dependencies.
- _File > Find referent tags_ - Find tags that refer to the current tag.

## Tag plaintext format
- _File > Import/Export_ - Import or export the current tag to a plaintext format. Not very useful as it will break any tag that uses a `data` field and XML is a nicer format for inspecting tag content. In short if trying to import results in a broken that is by design.

## Run tool from Guerilla
Guerilla can run [Tool](~h2-tool) commands using the *File > Run tool* menu item, the UI makes it easy to select the command you wish to run and arguments.

## Saved workspaces
Using _File > Save/Load Workspace_, you can save and reload a file which contains the current state of open tags and their window positions.

## Tag editing
The _File > Undo_ menu item can undo the most recent change but can't go further back than that. In case the menu is disabled you can try undoing/redoing with {% key "Control" /%} + {% key "z" /%}. If you need more than just the most recent change you can use _File > Hold_ and _File > Fetch_. *Hold* will save the current state of the tag and *fetch* will restore that saved state.
If you need to use certain advanced features you can enable _File > Expert Mode_, this will let you edit certain fields and blocks. Don't enable this unless you know what you are doing or need it for something specific as it makes it easier to accidentally corrupt your data.

## Misc
- *File > Show block sizes* - shows how much data each tag block uses, not very useful for non-developers - there isn't much you can do to optimise this usage other than deleting things.
- *Window* - Lets you automatically arrange tag windows
{% figure src="h2-grid-view.png" %}
Pictured: An example of the grid/multi tag view.
{% /figure %}
- Holding {% key "Alt" /%} while opening a tag will open the tag as a column in a "grid view"/"multi-tag view". This makes comparing values across tags easier. 

## Non-functional/Unknown
- _File > Remote console_ - doesn't do anything
- _Edit > Remote command view_ - doesn't do anything
- _Edit > Drop object_ - doesn't do anything
- _File > Mixing board_ - not sure what this does
- _File_ > Print - The print menu items don't do anything.