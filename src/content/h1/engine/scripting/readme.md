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


# HSC reference
## Basics
Scripts have the following structure:
```hsc
(script <script type> <return type (static scripts only)> <script name>
	<code>
)
```

Example:
```hsc
(script startup say_this_map_r0x
	(sv_say "This map r0xx0rz!")
)
```

Global variables are defined with the following syntax:
```hsc
(global <global type> <global name> <value(s)>)
```

Example:
```hsc
(global boolean kornman_is_leet true)
```

## Script types
```.table
entryType: ScriptTypes
typeDefs: hsc.yml
rowLinks: true
```

### Script threads

HSC has the notion of threads, i.e. multiple scripts running at the same time
(as opposed to waiting until the previous script is done to run). This is not
*actual* multithreading (the game still runs on a single CPU core). Continuous,
dormant, and startup scripts all run in their own threads. Static scripts do not
run in their own thread, by virtue of being called by other scripts. For
example, a `sleep` within a static script will put the thread of the calling
script to sleep. Multiple threads can call the same static script at the same
time with no issue.


## Value types
```.table
entryType: ValueTypes
typeDefs: hsc.yml
rowLinks: true
```


## Operators and keywords
```.table
entryType: OperatorsAndKeywords
typeDefs: hsc.yml
rowLinks: true
```


## Functions
```.alert
Note: these links don't work just yet.
```

[A][scripting#A] ·
[B][scripting#B] ·
[C][scripting#C] ·
[D][scripting#D] ·
[E][scripting#E] ·
[F][scripting#F] ·
[G][scripting#G] ·
[H][scripting#H] ·
[I][scripting#I] ·
[L][scripting#L] ·
[M][scripting#M] ·
[N][scripting#N] ·
[O][scripting#O] ·
[P][scripting#P] ·
[Q][scripting#Q] ·
[R][scripting#R] ·
[S][scripting#S] ·
[T][scripting#T] ·
[U][scripting#U] ·
[V][scripting#V]

```.table
entryType: Functions
typeDefs: hsc.yml
rowLinks: true
```

[Lisp]: https://en.wikipedia.org/wiki/Lisp_(programming_language
