**invader-extract** is a [command-line][] tool included in the [Invader][] project used to reconstruct source [tags][] as best as possible from their [in-map][map] representation. It is the best-in-class extractor and is our recommended tool when tag extraction is necessary. It supports H1X, H1CE, H1PC, PC demo, and also PC beta 1749.

Regardless of the tag extractor, it is impossible to reconstruct original [child scenarios][scenario#child-scenarios] from the merged scenario present in a map.

# Usage
See [official documentation][docs] for usage instructions.

Note that invader-extract reverses certain [hard-coded tag changes][h1a-tool#hardcoded-tag-patches] applied by Tool and [invader-build][] during extraction.

[docs]: https://github.com/SnowyMouse/invader#invader-extract
