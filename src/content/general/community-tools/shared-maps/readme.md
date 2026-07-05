---
title: Peppers shared maps
img: pepper.jpg
caption: Peppers script UI
keywords:
 - shared maps
info: |
  * [Github](https://github.com/Pepper-Man/mcc-build-scenarios-shared/blob/master/mcc_build_scenarios_shared.py)
  * [Python](https://www.python.org/)
thanks:
  odchylanie_uderzenia: Writing this guide
---
This script written by Pepper-Man is a python script running a series of tool commands to generate map files *with* a useable shared map, this is essential for reducing file size by allowing all maps to share resources used in all maps.

To use, download the raw python code in the link and then run it, this will launch the UI. Set the engine version for the game you are compiling for, and then you can either manually add scenarios to compile or use a text file called `AllMaps.txt` (Set the allmaps flag and then choose the txt file), this text file should include *all* the scenarios you want to be compiled with shared map support.

This script requires Python 3.10.6 or newer.