---
title: HUD messages source file (.hmt)
about: 'resource:hmt'
thanks:
  General_101: Documenting HMT format and text symbols
---
The **.hmt** (HUD message text) file format contains source text content which, when [compiled by Tool](~tool#hud-messages-compilation), becomes [hud_message_text](~) tags.

# Creating a text file for HUD messages
Start by going to the root directory of your level and creating a text file. The contents of the text file **differs** from the formatting used for [string_list](~). Instead you will define a variable and set the value for the string. Here is an example:

```
string1=Well, what do we have here?
string2=If I'm not mistaken this looks like a list of strings.
string3=A lot of neat things can be done with strings.
```

Once you've set the contents of the text file make sure to save the file with the encoding set to **UTF-16 LE**. Make sure the file is named the following:

`hud messages.hmt`

Tool looks for a file with this name and extension specifically when compiling _hud_message_text_ tags. On top of needing a specific name, it is also required for the .hmt file to reside in the root directory of the scenario the tag is intended for. For example, for the "tutorial" scenario we need to save the file at the following location:

`(HEK Install Path)\data\levels\test\tutorial\hud messages.hmt`

The command requires this setup in order to complete the task successfully. You can now use the command `hud-messages` to import your source file.

{% alert type="danger" %}
If you're using hud_message_text for scripting with _display_scenario_help_, then be aware that only default singleplayer paths are considered valid.
{% /alert %}
