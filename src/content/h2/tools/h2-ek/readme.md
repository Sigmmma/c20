```.alert
After downloading the Halo 2 Editing Kit, please read `README_MODDING.txt`. You **must** extract **both** `tags.zip` and `data.zip` to the root of the mod tools folder.
```

The **Halo 2 Editing Kit (H2-EK)** or **Halo 2 Mod Tools** is the official suite of modding tools for Halo 2 MCC released by 343i. The tools are based off the internal tools used by Bungie and then 343i with some usability and stability improvements ported over from the [H2V-EK][], although not nearly as cut down as that suite.

# Changelog
## General changes from stock H2V tools
* Tools are not stripped down, you can create models, animations, different types of textures, sounds and more!
* Tools have been upgraded to DX11 from the now obsolete DX9.
* You can create and edit all tag types in [Guerilla][h2-guerilla].
* A standalone build similar in function to H1A standalone.
* Better overall stability.
* AI functionality in [Sapien][h2-sapien].
* Tags will be reloaded by Sapien if they are changed on disk (also applies to the new standalone build)

## Guerilla
- Features for refactoring tag paths (find referring tags, move tag, copy tag, etc).
- The original bungie-era about dialog is used.
- Some erratum in tag definitions was fixed or marked comment.
- Preferences are now saved to the `prefs` directory instead of registry.
- Names were added for some tag blocks.
- Any string width confusion errors that [H2Codez][] fixed should not be an issue as H2 Guerilla is based off a branch that was never internationalized.
- `Do not use` fields were hidden from view as they should not be used.
- File selection dialogues were upgraded to use Vista+ dialogues (Like H1A Guerilla and H2Codez enhanced H2V Guerilla)

## Changes from H2Codez enhanced H2V-EK
The tools include many improvements over an [H2Codez][] enhanced H2V-EK, most notably:

* Render models can be created without using the BSP conversion method or other third-party tools.
* Sounds can be imported directly instead of using the CE upgrade pipeline.
* Tag reloading is fully functional.
* Fully functional player simulation.
* Better overall stability.

# Known issues

* Multi-process lightmapping is currently broken - use the single process alternative.
* Guerilla uses red text and greyed out folders for all tags - this doesn't mean there is something wrong with your tags it's just a graphical issue.
* PRT simulation tool is not included - avoid tool commands that require it, they will not function properly.
* Tag moving in Guerilla has some dependencies on old source control code because of this you need to manually move the tag after it fixes the references.