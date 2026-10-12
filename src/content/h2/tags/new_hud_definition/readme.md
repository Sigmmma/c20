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
The **new_hud_definition** tag defines a HUD in Halo 2, for example the reticle, ammo counter, and scope overlay of a [weapon](~). It is made of _bitmap widgets_, _text widgets_, and _screen effect widgets_.

# Bitmap widgets
A bitmap widget draws one sequence of a [bitmap](~) at an _anchor_ (such as _crosshair_ or _health and shield_), with an offset and registration point for each screen size (fullscreen, halfscreen, quarterscreen).

## Widget state
The _widget state_ section is split into **YES** flags (`[Y]`) and **NO** flags (`[N]`), each with unit, extra, weapon, and game engine state flags:

* A widget draws if **any** of its YES flags is true. The categories are combined, so a widget with the YES weapon flag _primary weapon_ draws whenever it is the primary weapon, no matter what its YES unit flags say.
* A widget does **not** draw if any of its NO flags is true. NO flags override YES flags.

Because of this, use **NO flags** to restrict a widget, not YES flags.

### Single and dual wielding widgets
The unit flags _unit is single wielding_ and _unit is dual wielding_ can split a widget into single and dual versions. Bungie's SMG HUD does it this way: its left-hand widgets (such as `bullets_left`) have the NO unit flag _unit is single wielding_, plus the NO weapon flag _primary weapon_ so they only draw for the left weapon.

To show a different reticle when dual wielding, duplicate the reticle widget and give:

| Widget | YES flags | NO unit flag | Shown when
|--------|-----------|--------------|-----------
| original | unchanged | _unit is dual wielding_ | single wielding
| copy | unchanged | _unit is single wielding_ | dual wielding

{% alert %}
Restricting the YES unit flags to only _unit is single wielding_ or only _unit is dual wielding_ does **not** work if the widget also has YES weapon flags like _primary weapon_; both widgets will still draw.
{% /alert %}

## Widget inputs
Each widget has four inputs (_input 1_ to _input 4_), such as _BASIC zero_, _BASIC one_, _UNIT autoaimed_, _UNIT zoom fraction_, or _WEAPON clip ammo fraction_. Widget effects read them by the names `hud_input1` to `hud_input4`. There is no input for whether the unit is dual wielding; use the widget state flags for that.

## Widget effects
The _effect_ block allows the **scaling**, rotation (theta), and offsetting of a widget. Enable _apply scale_, _apply theta_, or _apply offset_ in its flags. The effect has five functions; the first two are the **horizontal and vertical scale**. Each function takes an input name (`hud_input1` to `hud_input4`) and maps it from a minimum to a maximum value.

A widget has no plain size field, so an effect is the way to resize it without new bitmap art. For a constant scale, set one of the widget's inputs to _BASIC one_, point both scale functions at that input, and set the function's maximum to the scale you want. Bungie does this for the battle rifle's `crosshair_headshot` reticle (input 4 = _BASIC one_, horizontal and vertical scale 1.1). In testing, a reticle with a registration point of 0.5, 0.5 stayed centered when scaled.

### Example: bigger sniper reticle when dual wielding
In `ui\hud\sniper_rifle.new_hud_definition`:

1. Duplicate the `crosshair` widget and name the copy `crosshair_dual`.
2. Split them with NO unit flags as in [single and dual wielding widgets](#single-and-dual-wielding-widgets).
3. On `crosshair_dual`, set _input 4_ to _BASIC one_ and add an effect with _apply scale_, both scale functions using `hud_input4` with a maximum of 2.

The dual wielded reticle is then drawn at twice the size while the single wielded one is unchanged.
