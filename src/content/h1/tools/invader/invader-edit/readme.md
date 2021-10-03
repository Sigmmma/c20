**invader-edit** is a [command-line][] tool included in the [Invader][] project used to edit [tags][]. Users specify a field to edit and a value or operation as arguments. This can be useful for scripting bulk tag changes.

# Usage
See [official documentation][docs] for usage instructions. As an example:

```sh
invader-edit "characters/jackal/shaders/jackal shield.shader_transparent_chicago_extended" \
  --set detail_level high \
  --set power 0.000000 \
  --set color_of_emitted_light "0.000000 0.000000 0.000000" \
  --set tint_color "0.000000 0.000000 0.000000" \
  --set material_type "hunter_armor"
```

[docs]: https://github.com/SnowyMouse/invader#invader-edit
