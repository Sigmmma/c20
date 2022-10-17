The **dialogue** tag group gives [units][unit] situational sounds, like when they take damage, see allies die, or are startled. Dialogue usage is not just limited to AI bipeds; it's responsible for the player's death sounds and can even be referenced for vehicles, though not all situations apply. Dialogue is an important part of Halo's game design and helps communicate the internal state of characters to the player.

The randomization of voice lines is not part of the dialogue tag but rather the referenced [sound][] tags, which can contain multiple permutations.

# Canonical character dialogue tags
The following stock dialogue tags correspond to canonical characters:

| Character | Tag path
|-----------|----------
| 343 Guilty Spark | `sound\dialog\monitor\monitor`
| Jacob Keyes | `sound\dialog\captain\captain`
| Avery Johnson | `sound\dialog\sargeant\conditional\sargeant`
| Marcus Stacker | `sound\dialog\sarge2\conditional\sarge2`
| Chips Dubbo | `sound\dialog\marines\aussie\conditional\aussie`
| Private Bisenti | `sound\dialog\marines\bisenti\conditional\bisenti`
| M. Fitzgerald  | `sound\dialog\marines\fitzgerald\conditional\fitzgerald`
| Manuel Mendoza  | `sound\dialog\marines\mendoza\conditional\mendoza`

Additional level-specific character sound tags, e.g. for cinematics, can be found under the `sound\dialog\x**` folders.

# Related script functions and globals
The following are related [functions][scripting#functions] that you can use in your scenario scripts and/or [debug globals][scripting#external-globals] that you can enter into the developer console for troubleshooting.

{% relatedHsc game="h1" tagFilter="dialogue" /%}