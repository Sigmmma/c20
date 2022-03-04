Halo 3 has a flexible shader system based on automatically generated templates. Usually as a map maker you can ignore the technical details of this.

***However due to a bug in the current version of the H3EK you might need to install a patch to fix template generation.*** See [shader compiler fix][compiling-shaders#shader-compiler-fix] for instructions.

# What are templates?
In [Halo 2][h2] there was a limited number of templates with each one being handwritten by a graphics programmer, Halo 3 moved way from this and now has a more flexible shader system based on render method definitions. Each definition contains **categories** and each category contains one or more **options**. A combination of a category and an option is used to generate a **shader template**. A template will only be generated if the combination is used in a shader - generating all templates including ones that will never be used would waste disk space and time.

# Shader compiler fix
Sadly the current version of the H3EK requires a third-party patch to fix `tool.exe` not being able to compile shaders. Without this patch attempting to use shader templates that weren't used in the stock game will result in graphical issues (objects not rendering correctly, etc). 
This is caused by an initialization step being skipped in certain build configurations, and has been fixed by a community patch that ensures the step is executed before shader compilation is attempted. 

Installation steps
1. Rename `pc_shader_compiler.dll` in `<H3EK>\bin\x64` to `pc_shader_compiler_imp.dll`. **Do not use another name or put the file in a different directory.**
2. Download `pc_shader_compiler.dll` from [Github releases](https://github.com/num0005/h3-shader-compiler-fix/releases)
3. Place the newly downloaded `pc_shader_compiler.dll` in `<H3EK>\bin\x64`.
4. You should have both a `pc_shader_compiler_imp.dll` and a `pc_shader_compiler.dll` in `<H3EK>\bin\x64`, **both files are required** as the community fix can't compile any shaders on it's own and as such it requires a copy of the stock DLL.

# Regenerating templates
Tool when patched will compile any new templates when needed, as will Sapien but this can be slow and can increase the load time for a level with a lot of custom templates. 
It will also cause issues for anyone writing their own render method definitions or modifying existing ones.
To solve this issue you can periodically regenerate the shader templates so all the templates you used are cached on-disk and don't need to be recompiled every time you use them.

Steps
1. Open a command line in the H3EK directory.
2. Run `tool dump-render-method-options` - this will loop through all the shader tag files and record what templates they use. Wait for the command to complete.
3. Run `tool generate-templates win shaders\<shader-tag-type>` for all shader types you want to regenerate. You can see a full list of shader types and how many templates exist for each in the output of the previous command but for typical shader usage re-generating `shaders\shader`, `shaders\particle`, `shaders\halogram` and `shaders\decal` should be sufficient.
4. Sit back and wait, if you have enough cores you might want to run the commands to re-generate each type of shader in parallel. Shader template generation should be done in ~30-60 minutes.