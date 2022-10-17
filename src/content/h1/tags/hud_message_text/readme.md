This tag is specifically for messages that appear on your HUD, including level-specific messages like objectives and global generic interaction messages for vehicles, pickups, and devices. It is created by compiling [HMT files][hmt] with [Tool][tool#hud-messages-compilation].

# Scripted messages
A HUD message can be shown for a 4 second duration like so:

```hsc
(hud_set_help_text obj_evade)
(sleep 120)
(show_hud_help_text false)
```

# Caveats
Some features like newlines in strings will not work in certain situations.

# Text symbols
The engine will replace special placeholder tokens in your message text at runtime. Examples include displaying the necessary key to press for an action and creating a new line in a sentence:

| Symbol               | Note                                                                                                                                |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `%a-button`          | Display the key mapped to the a-button.                                                                                             |
| `%b-button`          | Display the key mapped to the b-button.                                                                                             |
| `%x-button`          | Display the key mapped to the x-button.                                                                                             |
| `%y-button`          | Display the key mapped to the y-button.                                                                                             |
| `%black-button`      | Display the key mapped to the black-button.                                                                                         |
| `%white-button`      | Display the key mapped to the white-button.                                                                                         |
| `%left-trigger`      | Display the key mapped to the left-trigger.                                                                                         |
| `%right-trigger`     | Display the key mapped to the right-trigger.                                                                                        |
| `%dpad-up`           | Display the key mapped to dpad-up.                                                                                                  |
| `%dpad-down`         | Display the key mapped to dpad-down.                                                                                                |
| `%dpad-left`         | Display the key mapped to dpad-left.                                                                                                |
| `%dpad-right`        | Display the key mapped to dpad-right.                                                                                               |
| `%start-button`      | Display the key mapped to the start-button.                                                                                         |
| `%back-button`       | Display the key mapped to the back-button.                                                                                          |
| `%left-thumb`        | Display the key mapped to left-thumb.                                                                                               |
| `%right-thumb`       | Display the key mapped to right-thumb.                                                                                              |
| `%left-stick`        | Display the key mapped to the left-stick.                                                                                           |
| `%right-stick`       | Display the key mapped to the right-stick.                                                                                          |
| `%action`            | Display the key mapped to action.                                                                                                   |
| `%throw-grenade`     | Display the key mapped to throw-grenade                                                                                             |
| `%primary-trigger`   | Display the key mapped to the primary-trigger.                                                                                      |
| `%integrated-light`  | Display the key mapped to the integrated-light.                                                                                     |
| `%jump`              | Display the key mapped to jump.                                                                                                     |
| `%use-equipment`     | Display the key mapped to use-equipment.                                                                                            |
| `%rotate-weapons`    | Display the key mapped to rotate-weapons.                                                                                           |
| `%rotate-grenades`   | Display the key mapped to rotate-grenades.                                                                                          |
| `%crouch`            | Display the key mapped to crouch.                                                                                                   |
| `%zoom`              | Display the key mapped to zoom.                                                                                                     |
| `%accept`            | Display the key mapped to accept.                                                                                                   |
| `%back`              | Display the key mapped to back.                                                                                                     |
| `%move`              | Display the key mapped to move.                                                                                                     |
| `%look`              | Display the key mapped to look.                                                                                                     |
| `%custom-1`          | Display the key mapped to custom-1.                                                                                                 |
| `%custom-2`          | Display the key mapped to custom-2.                                                                                                 |
| `%custom-3`          | Display the key mapped to custom-3.                                                                                                 |
| `%custom-4`          | Display the key mapped to custom-4.                                                                                                 |
| `%custom-5`          | Display the key mapped to custom-5.                                                                                                 |
| `%custom-6`          | Display the key mapped to custom-6.                                                                                                 |
| `%custom-7`          | Display the key mapped to custom-7.                                                                                                 |
| `%custom-8`          | Display the key mapped to custom-8.                                                                                                 |
| `\|n`                | Add a newline to a sentence.                                                                                                        |
