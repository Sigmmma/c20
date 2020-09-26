---
title: shader_transparent_glass
tagName: shader_transparent_glass
stub: true
---
...

# Known issues
In Custom Edition, glass shaders which use bump-mapped reflections [render incorrectly][renderer#pc-regressions]. Instead of using the intended reflection cube map, the renderer uses the _vector normalization_ bitmap from [globals][], causing reflections to be brightly multicoloured. This issue does not affect MCC.
