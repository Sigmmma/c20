---
title: WRL
workflowName: wrl
img: wrl-errors.jpg
imgCaption: A collection of nearly coplanar faces seen in isolation.
thanks:
  - to: Conscars
    for: WRL format research
  - to: stunt_man
    for: WRL compatibility and usage notes
---
**WRL files** are created by [Tool][] when it encounters fatal or warning-level geometry issues during model compilation and lightmapping (e.g. open edges, nearly coplanar faces). These files can be reimported back into the user's 3D software to visualize where problematic edges or faces are present and correct them before reattempting model compilation.

They are placed in the current working directory when running Tool from the command line. When compiling a [BSP][scenario_structure_bsp], the file will be named after the JMS file being compiled (e.g. `yourmap.wrl`). When geometry errors are found during [radiosity][lightmaps], Tool will instead output a `debug.wrl`.

# Compatibility
Some versions of [3ds Max][3dsmax] (at least 2010) require the 32-bit version in order to import WRL files. [Blender][] is not able to import Halo's WRL files natively since it supports VRML _2.0_, not _1.0_, but an [OBJ converter][wrl-to-obj-converter] can be used first.

# File format description
The WRL ("world") file format is not Halo-specific, but rather a 1994 industry standard called [VRML 1.0][vrml]. They consist of a list of `Separator` nodes, one for each error found by Tool. The file always begins with the comment `#VRML 1.0 ascii`, but the formatting below has been changed for readability. Any program which desires to parse this file format should consider whitespace to be flexible.

```vrml
#VRML 1.0 ascii

# An example of an open edge error (red)
Separator {
  # The coordinates array contains all vertices which are referenced
  # by index later.
  Coordinate3 {
    point [
      # Within an array, points are separated by comma (optional trailing comma)
      3456.103516 -3708.525467 2141.230965,
      3284.476471 -3812.968445 2056.174850
    ]
  }
  # The material binding tells us how material properties are used.
  # If the binding type is PER_VERTEX, then the material properties map to the
  # coordinates array above. For PER_FACE, they map to the IndexedFaceSet.
  MaterialBinding {
    value PER_VERTEX
  }
  # The material has two sub-sections whose lengths are not guaranteed
  # to match. The diffuseColor array contains a number of float
  # triplets (RGB) equal to the number of bound elements. However, in
  # the case of PER_FACE bound materials, the transparency array has
  # a single float rather than one per diffuseColor.
  Material {
    diffuseColor [
      1.000000 0.000000 0.000000,
      1.000000 0.000000 0.000000
    ]
    # Floats can be negative and always have a 6 digit decimal part
    transparency [0.000000, 0.000000]
  }
  # An indexed line set contains 1 or more edges, each defined by a
  # pair of indexes into the coords array.
  IndexedLineSet {
    # Index arrays appear "flat", but actually use -1 as a terminator marking
    # the end of spans of indexes within. Also note that the indexes may
    # sometimes be output in a single line, or when there's many values they
    # can be output over multiple lines in which case they will also gain a
    # trailing comma before the closing "]".
    coordIndex [0,1,-1]
  }
}

# An example of nearly coplanar surfaces (red and green)
Separator {
  Coordinate3 {
    # A set of vertices which will be indexed later to form faces
    point [
      5102.994919 -2272.044373 3555.212402,
      5102.994919 -1948.299599 3734.944916,
      5130.073929 -1943.392372 3706.684875,
      5102.994919 -2272.044373 3555.212402,
      5130.073929 -1943.392372 3706.684875,
      5102.994919 -2465.299225 3447.940445,
    ]
  }
  # The number of diffuse colours will match the number of faces
  MaterialBinding {
    value PER_FACE
  }
  Material {
    # The first face will be red, and the second green
    diffuseColor [
      0.000000 1.000000 0.000000,
      1.000000 0.000000 0.000000,
    ]
    # The transparency applies to ALL faces. A value of 0 means opaque
    transparency [0.000000]
  }
  IndexedFaceSet {
    # Note how each face's indices are terminated by a -1
    coordIndex [
      0,1,2,-1,
      3,4,5,-1,
    ]
  }
}
```

[vrml]: https://en.wikipedia.org/wiki/VRML
