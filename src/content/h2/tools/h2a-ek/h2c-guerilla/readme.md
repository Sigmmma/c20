**H2C Guerilla** (`guerilla.exe`)  part of the [Halo 2 Anniversary Editing Kit][H2A-EK], is a visual [tag][tags] editor. Although it can visualize [bitmaps][bitmap] and play sounds, it is primarily focused on editing and viewing the structured fields which comprise tags. It does not offer ingame previews or interactive placement of [objects][object], which is [Sapien's][H2C-Sapien] role.

# Saved workspaces
Using _File > Save/Load Workspace_, you can save and reload a file which contains the current state of open tags and their window positions.

# Explorer bar
A new feature in Halo 2 is to show a file hierarchy of your tag directory. It does not update in real time so refresh it with F5 if you need to.

# Changelog
Listing all the changes from H2V is an endless task but this section will attempt to list all major ones.
- Features for refactoring tag paths (find referring tags, move tag, copy tag, etc).
- The original bungie-era about dialog is used.
- Some erratum in tag definitions was fixed or marked comment.
- Preferences are now saved to the `prefs` directory instead of registry.
- Names were added for some tag blocks.
- Any string width confusion errors that [H2Codez][] fixed should not be an issue as H2C Guerilla is based off a branch that was never internationalized.
- `Do not use` fields were hidden from view as they should not be used.
- File selection dialogues were upgraded to use Vista+ dialogues (Like H1A Guerilla and H2Codez enhanced H2Guerilla)