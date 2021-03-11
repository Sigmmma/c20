**Ghostbuster** is a [command-line][] tool used to detect and fix [phantom BSP][scenario_structure_bsp#phantom-bsp]. Given a BSP tag, the tool attempts to detect phantom collision surfaces and fixes them by modifying the BSP node structure.

Specifically, it searches for BSP nodes with dividing planes where [Tool][] has incorrectly assumed that one side is "outside" the map and reuses the same child node for both sides of the failed node.

Ghostbuster is built on the [Reclaimer][] library.

# Installation
You will need [Python 3][get-python] to use this tool. Clone the repository from GitHub, or download `ghostbuster.py` and `requirements.txt` somewhere convenient. Install dependencies with `pip install --user -r requirements.txt`.

# Usage
Ghostbuster modifies BSP tags in-place unless the `-dryrun` flag is added, so it is recommended to first backup the tag if it cannot be recompiled easily. From a command line:

```sh
python3 ghostbuster.py <path to BSP tag>
```

# Caveats
Due to rounding errors and the nature of how phantom BSP are detected, the script may report and "fix" a large number of false positives or miss some phantom BSP. This may cause collision holes where items fall through the map in the affected area.

Always attempt to fix phantom BSP firstly by resolving any nearly coplanar faces indicated in the [WRL error geometry file][wrl], and secondly by using [phantom_tool][] if that's not working.

[get-python]: https://www.python.org/
