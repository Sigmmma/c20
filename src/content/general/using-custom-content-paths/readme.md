---
title: Using custom content paths
redirects:
  - /h1/tools/h1a-ek/using-custom-content-paths
---
{% alert type="danger" %}
H3-EK currently ***doesn't*** support custom content paths and neither do legacy editing kits. This is an MCC-only feature.
{% /alert %}

The [H1A-EK](~) and [H2-EK](~) tools support **using custom content paths** with some caveats.

* The data directory can be set using the `-data_dir <path>` flag.
* The tags directory can similarly be set using the `-tags_dir <path>` flag.
* The game root directory, used when compiling maps and finding resource maps, is set using `-game_root_dir <path>`.

If no content path is given the tools fallback to using the `data`, `tags`, and `maps` subdirectories of the current directory respectively.

# Example usage

```sh
# packages the tutorial map using assets located in the "hek_tags" tags directory
tool -tags_dir hek_tags build-cache-file levels\test\tutorial\tutorial classic

# launch Sapien using your custom tag+data set located in "E:\my_custom_tagset\"
sapien -tags_dir "E:\my_custom_tagset\tags" -data_dir "E:\my_custom_tagset\data"

# Edit old HEK tags using the new Guerilla release
guerilla -tags_dir "E:\Program Files (x86)\Microsoft Games\Halo Custom Edition\tags"

# Test your custom tagset in the standalone build
halo_tag_test -tags_dir "E:\my_custom_tagset\tags" -windowed

# also works for h2
halo2_tag_test -tags_dir "F:\custom_h2mcc\tags"
```

# Known issues

## H1 Guerilla

- "you need to set your working directory" message(s) on startup - these can be ignored, it happens when Guerilla attempts to re-open tags not included in the current tag set.

## H1 and H2 Sapien

No major issues but file selection dialog default to the last path used - make sure you select tags inside the current tags folder.

## Tool

Some verbs might not work correctly, if something isn't working correctly try using that verb without content paths overrides.

## Standalone

No known issues.
