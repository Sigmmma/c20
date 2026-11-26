---
title: new_hud_definition
about: 'tag:h2/new_hud_definition'
keywords:
  - nhdt
  - hud
  - reticle
  - crosshair
  - widget
  - dual wield
thanks:
  ReVaas: 'Research and in-game testing (tag test, H2EK disassembly)'
---
The **new_hud_definition** tag defines a HUD in Halo 2, for example the reticle, ammo counter, and scope overlay of a [weapon](~). A weapon's HUD is set in the weapon tag's _new hud interface_ field (for example `ui\hud\sniper_rifle`).

# Key terms
* A **widget** is one piece of the HUD, such as a reticle or an ammo meter. A HUD is made of _bitmap widgets_ (images), _text widgets_ (numbers and text), and _screen effect widgets_.
* A **bitmap widget** draws one image (a _sequence_) from a [bitmap](~) tag.
* The **anchor** is the part of the screen the widget is placed relative to, such as the center (_crosshair_).
* **Widget state** flags decide when a widget is visible, for example only when zoomed or only when dual wielding.
* A **widget effect** can scale, rotate, or move a widget while the game is running.

This page covers bitmap widgets. Fields marked _not researched_ are described from their names in Guerilla only.

# Bitmap widget fields
These are the fields of each element in the _bitmap widgets_ block, in the order Guerilla shows them.

| Field | What it does
|-------|-------------
| name | The widget's name, for example `crosshair`. Only used to tell widgets apart.
| input 1 to input 4 | Four values the widget can read while the game runs, such as _BASIC one_ (always 1) or _UNIT zoom fraction_. [Widget effects](#widget-effects) read them as `hud_input1` to `hud_input4`. See [widget inputs](#widget-inputs).
| [Y] and [N] flags | The widget state flags that decide when the widget is drawn. See [widget state](#widget-state).
| age cutoff, clip cutoff, total cutoff | _Not researched._ By name, the values used by the weapon flags _age below cutoff_, _clip below cutoff_ and _total below cutoff_.
| anchor | Where on the screen the widget is placed: _health and shield_, _weapon hud_, _motion sensor_, _scoreboard_, _crosshair_ (screen center), _lock-on target_, _top center_, _bottom center_, _left center_ or _right center_.
| flags | _Not researched._ _flip horizontally_, _flip vertically_, _(scope) mirror horizontally_, _(scope) mirror vertically_, _(scope) stretch_.
| bitmap | The [bitmap](~) tag the image comes from, for example `ui\hud\bitmaps\new_hud\crosshairs\hud_reticles`.
| shader | The shader used to draw the image, for example `ui\hud\shaders\widget_simple_flash_red`.
| fullscreen / halfscreen / quarterscreen sequence index | Which image (sequence) in the bitmap to draw. There is one for each screen size, so split screen can use a different image (going by the names, half and quarter are for two and four player split screen). For example the sniper rifle reticle is sequence 22 of `hud_reticles`.
| fullscreen / halfscreen / quarterscreen offset | How far to move the widget from its anchor, in pixels, for each screen size.
| fullscreen / halfscreen / quarterscreen registration point | Which point of the image is placed at the anchor, from 0 to 1. 0.5, 0.5 is the center of the image. In testing, a reticle with 0.5, 0.5 stayed centered when [scaled](#widget-effects).
| effect | Lets the widget be scaled, rotated or moved. See [widget effects](#widget-effects).
| special hud type | _Not researched._ Used for special scoreboard and meter widgets (_s.b. player emblem_, _unit shield meter_, _territory meter_ and so on). Normal widgets use _unspecial_.

# Widget state
The widget state section has **YES** flags (`[Y]`) and **NO** flags (`[N]`). Each has four categories: unit flags, extra flags, weapon flags and game engine state flags. Guerilla describes the rule as: _"a widget will draw if any of it's YES flags are true, but it will NOT draw if any of it's NO flags are true."_

In practice this means:

* The YES flags of **all four categories are combined**. A widget with the YES weapon flag _primary weapon_ draws whenever it belongs to the primary weapon, no matter what its YES unit flags say.
* NO flags **always win** over YES flags.
* So to **hide** a widget in some situation, use a NO flag. Removing a YES flag is often not enough.

## Unit flags
About the player holding the weapon.

| Flag | What it means
|------|--------------
| unit is single wielding | The player is holding one weapon. Tested.
| unit is dual wielding | The player is holding two weapons. Tested.
| unit is unzoomed | The player is not zoomed in.
| unit is zoomed (level 1) | The player is zoomed in to the first zoom level.
| unit is zoomed (level 2) | The player is zoomed in to the second zoom level.
| grenade type is NONE / frag / plasma | The player's selected grenade type.
| grenades disabled | The player can't throw grenades.
| binoculars enabled | The player is using binoculars. Bungie's SMG HUD uses this as a NO flag on almost every widget.
| motion sensor enabled | The motion sensor is enabled.
| shield enabled | The player has shields.

## Extra flags
About what the reticle is pointing at.

| Flag | What it means
|------|--------------
| autoaim-friendly | The reticle is over a friendly. Bungie's normal reticles use this as a NO flag, so a separate friendly (green) reticle can draw instead.
| autoaim-plasma | _Not researched._
| autoaim-headshot | _Not researched._ By name, the reticle is over a target's head.
| autoaim-vulnerable | _Not researched._
| autoaim-invincible | The reticle is over an invincible target. Bungie's normal reticles use this as a NO flag.

## Weapon flags
About the weapon the HUD belongs to.

| Flag | What it means
|------|--------------
| primary weapon | This is the primary weapon (the right hand when dual wielding, or the only weapon when single wielding).
| secondary weapon | This is the secondary weapon (the left hand when dual wielding).
| backpack weapon | This weapon is carried on the player's back, not held. Bungie's widgets use this as a NO flag so they don't draw for the stowed weapon, except the `backpack` widget which uses it as a YES flag.
| age below cutoff, clip below cutoff, total below cutoff | _Not researched._ By name, the weapon's age, loaded ammo or total ammo is below the widget's cutoff value.
| out of ammo | The weapon has no ammo. Bungie uses separate `_out` widgets for this.
| lock target available, locking | _Not researched._ Lock-on states (for example the rocket launcher).

## Game engine state flags
_Not researched._ About the game mode: _campaign solo_, _campaign coop_, _free-for-all_, _team game_, _user leading_, _user not leading_, _timed game_, _untimed game_, _other score valid_, _other score invalid_, _player is arming bomb_, _player talking_.

## Single and dual wielding widgets
To show a widget only when single wielding or only when dual wielding, keep its YES flags and add a NO unit flag. Bungie's SMG HUD does this: its left-hand widgets (such as `bullets_left`) have the NO unit flag _unit is single wielding_, plus the NO weapon flag _primary weapon_ so they only draw for the left weapon.

To show a different reticle when dual wielding, duplicate the reticle widget and give:

| Widget | YES flags | NO unit flag | Shown when
|--------|-----------|--------------|-----------
| original | unchanged | _unit is dual wielding_ | single wielding
| copy | unchanged | _unit is single wielding_ | dual wielding

{% alert %}
Restricting the YES unit flags to only _unit is single wielding_ or only _unit is dual wielding_ does **not** work if the widget also has YES weapon flags like _primary weapon_; both widgets will still draw.
{% /alert %}

# Widget inputs
Each widget has four inputs. An input is a value the game keeps updated, which [widget effects](#widget-effects) can use. The options are:

| Input | Value
|-------|------
| BASIC zero | Always 0.
| BASIC one | Always 1. Useful for effects that should always apply, such as a fixed scale.
| BASIC time, BASIC global hud fade | _Not researched._
| UNIT shield, UNIT body | _Not researched._ By name, the player's shield and health.
| UNIT autoaimed | _Not researched._ By name, whether the reticle is over a target. Bungie's reticles set _input 1_ to this.
| UNIT zoom fraction, UNIT camo value, UNIT frag gren cnt, UNIT plasma gren cnt, UNIT has no grenades, UNIT time on dpl shld | _Not researched._
| PARENT shield, PARENT body | _Not researched._
| WEAPON clip ammo, WEAPON total_ammo, WEAPON clip ammo fraction, WEAPON heat, WEAPON overheated, WEAPON time on overheat, WEAPON battery, WEAPON battery fraction, WEAPON barrel spin, WEAPON locking fraction | _Not researched._ By name, the weapon's ammo, heat, battery and lock-on values.
| user score fraction, other user score fraction, user winning, bomb arming amount | _Not researched._ Multiplayer values.

There is **no input for dual wielding**. Use the [widget state](#widget-state) flags for that.

# Widget effects
The _effect_ block lets a widget be **scaled**, rotated (theta) or moved (offset). A widget has no plain size field, so an effect is the way to make a widget bigger or smaller without new bitmap art.

| Field | What it does
|-------|-------------
| flags | Turn on _apply scale_, _apply theta_ and/or _apply offset_. Only the parts that are turned on are used.
| functions | The effect has five functions. The **first two are the horizontal and the vertical scale** (tested). The rest are for theta and offset (_not researched_).
| input name | The input a function reads: `hud_input1` to `hud_input4`, matching the widget's _input 1_ to _input 4_.
| range name, time period in seconds | _Not researched._
| function | Turns the input into the output value, going from a minimum to a maximum. When the input is _BASIC one_ (always 1), the output is the **maximum**.

For a fixed scale, set one of the widget's inputs to _BASIC one_, point both scale functions at that input, and set the function's maximum to the scale you want (1 = normal size, 2 = double). Bungie does this for the battle rifle's `crosshair_headshot` reticle: _input 4_ is _BASIC one_ and both scale functions have a maximum of 1.1.

# How this was researched
1. **Comparing tags.** `tool.exe export-tag-to-xml` was used to export all of the game's HUD tags to XML. Bungie's SMG HUD showed how single and dual wield widgets are split, and the battle rifle HUDs (`crosshair_headshot`) were the only weapon HUDs using a scale effect.
2. **Guerilla's own descriptions.** Guerilla contains short descriptions for many fields, such as the widget state rule and _"allow the scaling, rotation, and offsetting of widgets"_ for effects. These were read from `guerilla.exe` and are quoted on this page.
3. **Testing in tag test.** A double size dual wield reticle was added to the sniper rifle HUD (see the example below) and tested in `halo2_tag_test.exe`. The first attempt only changed the YES unit flags, and **both** reticles drew when single wielding. Switching to NO flags fixed it, which showed that YES flags are combined across all categories.
4. **Function values.** The scale function's minimum and maximum were found by comparing the raw function data of the battle rifle's effect (maximum 1.1) with the edited sniper rifle effect (maximum 2) in the XML exports.

# Example: bigger sniper reticle when dual wielding
In `ui\hud\sniper_rifle.new_hud_definition`:

1. Duplicate the `crosshair` widget and name the copy `crosshair_dual`.
2. Split them with NO unit flags as in [single and dual wielding widgets](#single-and-dual-wielding-widgets).
3. On `crosshair_dual`, set _input 4_ to _BASIC one_ and add an effect with _apply scale_, both scale functions using `hud_input4` with a maximum of 2.

The dual wielded reticle is then drawn at twice the size while the single wielded one is unchanged.
