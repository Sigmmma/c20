---
title: LM_Tool
toolName: LM_Tool
img: lm_tool.jpg
imgCaption: LM_Tool outperforms official Tool in lightmapping
keywords:
  - lightmap
  - radiosity
info: |
  * [Development thread](https://opencarnage.net/index.php?/topic/7751-lm_tool-a-version-of-tool-specifically-for-speeding-up-lightmaps/#comment-98219)
  * [Download](https://opencarnage.net/applications/core/interface/file/attachment.php?id=982)
---
**LM_Tool** is a community-modified version of [Tool][] which improves the speed of [lightmaps][scenario_structure_bsp#lightmaps] generation (radiosity). LM_Tool achieves this by disabling some runtime debug checks present in the official Tool release, and can _only_ be used for radiosity; all other functions are disabled.

# Usage
LM_Tool is used from the command line in the same way as Tool, for example:

```
LM_Tool.exe lightmaps levels\test\ratrace\ratrace ratrace 0.8 0.1
```
