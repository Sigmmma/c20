**Transparent chicago extended shaders** are essentially identical to [shader_transparent_chicago][], but have an additional 2-stage block used when video hardware does not support more than 2 maps in a shader (which can be simulated with [arguments][arguments#graphics-options]). There is no reason to use this shader type over _shader_transparent_chicago_ on modern systems.

_See [shader_transparent_chicago][] for more documentation._
