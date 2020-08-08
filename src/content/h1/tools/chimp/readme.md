---
title: Chimp
toolName: Chimp
info: |
  * [Download (Mod DB)](https://www.moddb.com/games/halo-2/downloads/chimp-plugin-for-gmax)
keywords:
  - max
thanks:
  - to: Jason Zimmer
    for: Usage instructions
  - to: TheGhost
    for: Exporter feature comparisons
---
**Chimp** is a MAXScript plugin for [Gmax][] and [3ds Max][3dsmax] which allows the export of [JMS][] files, and the import of [WRL][] files. Its last version is 1.6 (2004).

This exporter does not support the exporting of vertex weights, [bipeds][biped], nodes and markers for [vehicles][vehicle] or [weapons][weapon], or proper vertex normals, making it suitable for static objects like [scenery][] or [BSPs][scenario_structure_bsp] only.

# Usage instructions
## Exporting from Gmax
The following steps describe an example use case of exporting a BSP which has already been created and linked to a frame according to the [HEK tutorial][hek-tut], and also :

1. From the Gmax main menu select "MAXScript" then select "Run Script" and open `chimp.ms`.
2. Select the "Listener Window" Option.
3. Press the "Export Halo Map" button.
4. When the process is complete you need to run the supplied `GrabListener.exe` program. Ensure that you only have one copy of GMax running when you do so.
5. Save the listener data to your `data\levels\test\yourmapname\models` folder as `yourmapname.jms`.
6. Open `yourmapname.jms` in your favorite text editor and remove everything before and including the line `***** Begin Jms *****`. Then go to to bottom of the file and delete everything after and including the line `***** End Jms *****`. Save `yourmapname.jms`.
7. You should now be able to compile your JMS into a [scenario_structure_bsp][] using [Tool][].

## Exporting from 3ds Max

1. Load/Create your map.
2. From the 3D Studio Max main menu select "MAXScript" then select "Run Script" and open `chimp.ms`.
3. The "Jms File" option is selected by default.
4. Press the "Export Halo Map" button.
5. When the Geometry processing is complete it will ask you where you would like to save the JMS file. Save it to your `halo\data\levels\test\yourmapname\models` folder as `yourmapname.jms`.
8. You should now be able to compile your JMS into a [scenario_structure_bsp][] using [Tool][].

## Importing a WRL

1. From the 3D Studio Max main menu select "MAXScript" then select "Run Script" and open `chimp.ms`.
2. Click the "Import Wrl" button
3. Open your `mapname.wrl` file and it will create "ChimpFaceErrors" and "ChimpEdgeErrors" objects depending on the errors located in the wrl file.
4. Click the "Select by Name" button and select the error you would like to see and then use the "Zoom Extents Selected" button to find the object and repair the error.

# Troubleshooting

If Chimp reports an error, it may have trouble with the geometry in your level. Try collapsing all your geometry into an editable mesh and try again.

[hek-tut]: http://nikon.bungie.org/misc/hek_tutorial/
