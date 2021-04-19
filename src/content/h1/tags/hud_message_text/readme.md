# Creating a proper text file for HUD messages
This tag is specifically for messages that appear on your HUD. Start by going to the root directory of your level and creating a text file. The contents of the text file differs from the formatting used for [string_list][]. Instead you will define a variable and set the value for the string. Here is an example:

```
string1=Well, what do we have here?
string2=If I'm not mistaken this looks like a list of strings.
string3=A lot of neat things can be done with strings.
```

Once you've set the contents of the text file make sure to save the file with the encoding set to UTF-16 LE. Make sure the file is named the following:

`hud_messages.hmt`

[Tool][] looks for a file with this name and extension specifically when compiling hud_message_text tags. On top of needing a specific name, it is also required for the hmt file to reside in the root directory of the scenario the tag is intended for. If we want to import this tag for our tutorial scenario then we will need to save the file at the following location:

`(HEK Install Path)\data\levels\test\tutorial\hud_messages.hmt`

The command requires this setup in order to complete the task successfully. You can now use the command `hud-messages` to import your source file.

```.alert danger
Some features like newlines in strings will not work in certain situations.
```

```.alert danger
If you're using hud_message_text for display_scenario_help script related things then be aware that only default singleplayer paths are considered valid.
```

# Text Symbols
These symbols can be used in your text files to get specific results. Examples include displaying the necessary key to press for an action and creating a new line in a sentence:

| Symbol               | Note                                                                                                                                |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| %a-button            | Display the key mapped to the a-button.                                                                                             |
| %b-button            | Display the key mapped to the b-button.                                                                                             |
| %x-button            | Display the key mapped to the x-button.                                                                                             |
| %y-button            | Display the key mapped to the y-button.                                                                                             |
| %black-button        | Display the key mapped to the black-button.                                                                                         |
| %white-button        | Display the key mapped to the white-button.                                                                                         |
| %left-trigger        | Display the key mapped to the left-trigger.                                                                                         |
| %right-trigger       | Display the key mapped to the right-trigger.                                                                                        |
| %dpad-up             | Display the key mapped to dpad-up.                                                                                                  |
| %dpad-down           | Display the key mapped to dpad-down.                                                                                                |
| %dpad-left           | Display the key mapped to dpad-left.                                                                                                |
| %dpad-right          | Display the key mapped to dpad-right.                                                                                               |
| %start-button        | Display the key mapped to the start-button.                                                                                         |
| %back-button         | Display the key mapped to the back-button.                                                                                          |
| %left-thumb          | Display the key mapped to left-thumb.                                                                                               |
| %right-thumb         | Display the key mapped to right-thumb.                                                                                              |
| %left-stick          | Display the key mapped to the left-stick.                                                                                           |
| %right-stick         | Display the key mapped to the right-stick.                                                                                          |
| %action              | Display the key mapped to action.                                                                                                   |
| %throw-grenade       | Display the key mapped to throw-grenade                                                                                             |
| %primary-trigger     | Display the key mapped to the primary-trigger.                                                                                      |
| %integrated-light    | Display the key mapped to the integrated-light.                                                                                     |
| %jump                | Display the key mapped to jump.                                                                                                     |
| %use-equipment       | Display the key mapped to use-equipment.                                                                                            |
| %rotate-weapons      | Display the key mapped to rotate-weapons.                                                                                           |
| %rotate-grenades     | Display the key mapped to rotate-grenades.                                                                                          |
| %crouch              | Display the key mapped to crouch.                                                                                                   |
| %zoom                | Display the key mapped to zoom.                                                                                                     |
| %accept              | Display the key mapped to accept.                                                                                                   |
| %back                | Display the key mapped to back.                                                                                                     |
| %move                | Display the key mapped to move.                                                                                                     |
| %look                | Display the key mapped to look.                                                                                                     |
| %custom-1            | Display the key mapped to custom-1.                                                                                                 |
| %custom-2            | Display the key mapped to custom-2.                                                                                                 |
| %custom-3            | Display the key mapped to custom-3.                                                                                                 |
| %custom-4            | Display the key mapped to custom-4.                                                                                                 |
| %custom-5            | Display the key mapped to custom-5.                                                                                                 |
| %custom-6            | Display the key mapped to custom-6.                                                                                                 |
| %custom-7            | Display the key mapped to custom-7.                                                                                                 |
| %custom-8            | Display the key mapped to custom-8.                                                                                                 |
| <code>&#124;n</code> | Add a newline to a sentence.                                                                                                        |