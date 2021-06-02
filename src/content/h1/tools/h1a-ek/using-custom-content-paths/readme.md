The H1A-EK tools support **using custom content paths** with some caveats. 

The data directory can be set using the `-data_dir <new data>` flag. 
The tags directory can similarly be set using the `-tags_dir <new tags path>` flag.

If no content path is given the tools fallback to using the `data` and `tags` subdirectories of the current directory respectively.

# Example usage

```sh
tool -tags_dir hek_tags build-cache-file levels\test\tutorial\tutorial classic # packages the tutorial map using asserts located in the "hek_tags" tags directory
sapien -tags_dir "E:\my_custom_tagset\tags" -data_dir "E:\my_custom_tagset\data" # launch Sapien using your custom tag+data set located in "E:\my_custom_tagset\"
guerilla -tags_dir "E:\Program Files (x86)\Microsoft Games\Halo Custom Edition\tags" # Edit old HEK tags using the new Guerilla release
```

# Known issues

## Guerilla

- "you need to set your working directory" message(s) on startup - these can be ignored, it happens when Guerilla attempts to re-open tags not included in the current tag set.

## Sapien

No major issues but file selection dialog default to the last path used - make sure you select tags inside the current tags folder.

## Tool

Some verbs might not work correctly, if something isn't working correctly try using that verb without content paths overrides.