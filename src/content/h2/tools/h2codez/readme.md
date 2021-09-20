**H2Codez** is a mod for the [Halo 2 Vista Editing Kit][h2v-ek] (H2EK) that aims to restore some of the missing or damaged functionality.

## Changelog ##
* Restore tool commands used by bungie to distribute lightmapping over multiple machines.
* Real-time tag editing.
* Increased FPS in Sapien (hardware TCL/vertex processing).
* Unit playtest mode. Spawns a player letting you test how something would work with one/seeing the map from an in-game point of view. (no movement).
* Some H2tool commands restored. (model-collision, model-physics).
* Basic render model import method (BSP conversion).
* Shared tag removal made optional.
* Restored JMS import function. Can import both CE JMS and JMSv2.
* Tag restrictions removed in Guerilla.
* Some hardcoded limits have been increased/removed. (BSP 2D checks, BSP 3D checks, max 3D BSP depth)
* Open as text has been restored and will open a temp txt file with the source text inside. Buttons labeled as "open as text" have been relabeled as "export as text".
* Baggage.txt command now usable and no longer causes a crash.
* Hs_doc added to Sapien and Guerilla drop down menu. Modified to include script globals.
* New input box for commands in Sapien to replace console. Allows copy and paste.
* New command that allows use of lost misc commands. See extra-commands in H2Codez manual.
* Rich Presence has been added to the toolset. (Discord integration)
* Allows compiling of scenario types other than multiplayer.
* Support editing larger scripts.
* Add "New Instance" menu item to Guerilla and Sapien.
* Removed limitation on multiple Sapien instances.
* Added copy (ctrl + c), paste (ctrl + v) and clear (delete) support to Sapien console, paste replaces the whole line.
* Add configurable console history size.
* Add back support for the following HS types
  * AI behaviour
  * Conversation
  * AI orders
  * AI (starting locations referenced by block index)
  * Point reference
  * Style (internal ID only)
  * Navpoint (internal ID only)
  * AI command list (internal ID only)
  * HUD message (internal ID only)
* Use default OS style for file/folder selection dialog.
* In-game display settings option in Sapien.
* Custom director speed.
* Workaround for graphical artifacts on some Nvida cards.
* Some misc changes and fixes.