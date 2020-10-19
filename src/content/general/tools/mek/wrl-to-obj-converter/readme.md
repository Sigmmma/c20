The **WRL to OBJ converter** is a [command-line][] Python script in the [MEK][] used to convert [WRL][] debug geometry, which use the very old VRML 1.0 format, into the [obj][] format widely supported in 3D software. This tool helps you import WRL files into [Blender][], which only supports VRML _2.0_.

As a caveat, this tool does not retain the WRL's colour coding (e.g. red for open edges).

# Installation
Users of an up-to-date [MEK][] should have this script already available. It can be found in the `tools_misc` directory. Otherwise, the script can be used standalone by downloading the [source file][source] somewhere convenient and installing the Python package _tatsu_ (a parser generator dependency):

```
pip install --user tatsu
```

# Usage
Invoke the converter on the command line like so:

```sh
# given file paths for input and output:
python3 wrl_to_obj.py --input input.wrl --output output.obj

# as an executable, converting from stdin to stdout:
./wrl_to_obj.py < input.wrl > output.obj
```

When importing the `.obj` into Blender, be sure to use **Y forward and Z up** settings. For greater visibility, set the imported object's viewport display to "In Front".

[obj]: https://en.wikipedia.org/wiki/Wavefront_.obj_file
[source]: https://github.com/Sigmmma/mek/blob/master/tools_misc/wrl_to_obj.py
