**LM_Tool** is a community-modified version of [Tool][] which improves the speed of [lightmaps][scenario_structure_bsp#lightmaps] generation (radiosity). LM_Tool achieves this by disabling some runtime debug checks present in the official Tool release, and can _only_ be used for radiosity; all other functions are disabled.

# Installation
Simply download and extract `LM_Tool.exe` and place it in Halo's directory where `tool.exe` would be found.

# Usage
LM_Tool is used from the command line in the same way as Tool, just change the EXE name. For example:

```
LM_Tool.exe lightmaps levels\test\ratrace\ratrace ratrace 1 0.01
```

_See [Tool documentation][tool#lightmaps] for more details of using and troubleshooting lightmaps._
