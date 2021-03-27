# Creating a proper text file for unicode string lists
Create a text file at the following location. If the directory doesn't exist then go ahead and create the needed folders:

`(HEK Install Path)\data\levels\test\tutorial\strings`

Our text files do not need to be in a specific subdirectory like models or levels do. We can have them wherever we would like. Try to get your files organized though for your own sake and for the sake of others if you decide to share your tags folder.

Once you're in the proper directory you can then right click to bring up the context menu and create a new text file. Name this file whatever you would like. We will be using "tutorial_strings" for this example. Once you've finished this step we can open up our text file and start writing our sentences we want displayed ingame.

Strings in CE start with the first line being the full sentence you want displayed while the next line is declaring the end of the string. See the following for an example:

```
This is a string.
###END-STRING###
This is also a string.
It also has multiple lines cause Halo is cool like that.
###END-STRING###
We will also be talking about symbols like %jump later in the guide.
###END-STRING###
```

```.alert danger
Some features like newlines in strings will not work in certain situations.
```

Save the file once you've set the contents of the text file. Make sure the file is set to encoding UTF-16 LE. Go ahead and use the `unicode-strings` command in [Tool][] to import your unicode strings list.

# Text symbols
These symbols can be used in your text files to get specific results. Examples include displaying the necessary key to press for an action and creating a new line in a sentence:

| Symbol               | Note                                                                                                                                |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| %d                   | Usually seen be item counts. Stuff like picked up ammo.                                                                             |
| %s                   | MP Score.                                                                                                                           |
| %03d                 | Increment profile count.                                                                                                            |
| %.2f                 | Just for race. Used for the timer.                                                                                                  |
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
| \h                   | Sets a text line to a heading making the text a bit larger and displaying a yellow color. Only for the Custom Edition credits menu. |
| \s#                  | Write a specific number of spaces. Replace the ```#``` character with an integer. Only for the Custom Edition credits menu.         |