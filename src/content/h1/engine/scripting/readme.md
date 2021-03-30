*Halo Script* (HSC), also known as *Blam Scripting Language* (BSL), is a
scripting language that map designers can use to have greater control over how
their map works. It is primarily used in controlling the mission structure of
single player maps, but can also be used to achieve certain effects in
multiplayer, such as synchronizing destructable vehicles.

Halo Script is based on
[Lisp][].
Scripts are compiled into the [scenario][] of a [map][map] using [Sapien][].
Scripts can be extracted from a scenario using [Refinery][].


# Compiling a script into a scenario
Sapien searches for scripts in the data version of your scenario's path. For
example, if your scenario is `tags\levels\test\tutorial\tutorial.scenario`, you
would place your script file in `data\levels\test\tutorial\scripts\`.
Your script file can be named anything, but must have a `.hsc` file extension.

Open your scenario in Sapien, then under the file menu, click "Compile Scripts".
If there are any compilation errors, Sapien will display them in the Game View
screen.


[Lisp]: https://en.wikipedia.org/wiki/Lisp_(programming_language
