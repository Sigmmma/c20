---
title: Excession
keywords:
  - uploader
img: excession.jpg
info: |
  * [Steam store](steam://store/1695795)
  * [Official documentation](https://learn.microsoft.com/en-us/halo-master-chief-collection/excession/excessionoverview)
---

**Excession** is the official mod uploader for MCC which allows you to publish your work to the Steam workshop. It is used for for all games in the MCC and is a separate download from the [mod tools](~mod-tools). It's not something you need to use until you're ready to publish your mod.

See the [official documentation][docs] for help using it. Note that Steam needs to be open to upload mods.

# Changelog
## July 2023
* Added support for gamepad preset mods.

## December 2022
* Fixed a crash where pressing remove on an empty directory in configure would crash.
* Now properly recognizes the minimum package of the game client and no longer errors when changing the app version.
* Updated latest version number.
* New icons.
* Upload screen no longer uses title field when it should have used description field on submit.
* Auto-tags items with the game engine (if there is one), and the game contents like SP or MP it contains (if any). This allows filtering in the workshop.
* Upload screen includes a _Change Log_ text box when uploading updates to existing items.
* Upload screen includes a mod folder path and notes that _all_ files in that path will be included in the upload.
* Upload screen enforces the 1 MiB limit on preview images.
* Upload screen relays messages to the user if they likely exceeded their Steam Cloud quota.
* Errors now logged when there are missing map files for the scenarios defined. The MCC UI will also ignore such invalid content.
* Fixed custom campaign mission names not showing after mission number.
* Fixed a crash and "save all failed" errors when saving background videos.
* Fixed crash when exporting Map Info BLF when map title is 32 characters or longer.

[docs]: https://learn.microsoft.com/en-us/halo-master-chief-collection/excession/excessionoverview