---
title: Halo Reach Managed API
stub: false
keywords:
  - hr
  - halo
  - reach
---
{% alert %}
This page is intended for developers as a basic primer on the API used by HR+, if you aren't a developer this information is unlikely to be useful to you.
{% /alert %}

Halo Reach replaced the legacy [MFC-based][mfc] Guerilla content editor with the new and improved [WPF-based][wpf] Foundation content editor. This required the creation of a [managed][managed_code] wrapper around certain core engine subsystems.

# managedblam
This is a wrapper around core Halo engine (aka "blam") functionality. You can use this to work with Halo Reach tag files and not worry about maintaining compatibility with official tools. For more details on this API and how to use it outside of Foundation see [this page](~managed-blam).

Sample code for loading a tag file and introspecting it.
```cs
namespace Sample
{
    class Program
    {
        static void Main(string[] args)
        {
            ManagedBlamCrashCallback del = info => {

            };
            var param = new ManagedBlamStartupParameters();
            // e.g. G:\SteamLibrary\steamapps\common\HREK
            Bungie.ManagedBlamSystem.Start(@"<path to HREK install>", del, param);

            var test_path = Bungie.Tags.TagPath.FromPathAndType(@"globals\global_scripts", "hsc*");
            using (var tagFile = new Bungie.Tags.TagFile(test_path))
            {
                foreach (var field in tagFile.Fields)
                {
                    Console.WriteLine(field);
                }

                Console.WriteLine($"Name: {((Bungie.Tags.TagFieldElement)tagFile.Fields[0]).GetStringData()}");
                Console.WriteLine($"Flags: {((Bungie.Tags.TagFieldFlags)tagFile.Fields[3]).RawValue}");
            }
            Bungie.ManagedBlamSystem.Stop();
        }
    }
}
```

To run the above code you can just copy the above code into a new .NET framework 4 project and add a reference to `managedblam.dll` in the `bin` folder.

Sample output
```
name
source
external references
flags
Name: global_scripts
Flags: 0
```

# Foundation plugins API
Foundation is highly modular with the main binary only handling command line parsing and very basic state tracking - everything else is passed off to "plugins". This includes core functionality such as tag loading and editing or the main UI. 
Each plugin is a class that has the `BonoboPlugin` attribute and implements one or more interfaces. A single container (`.dll`) can contain an arbitrary number of plugins. 
Which containers and plugins will be loaded is controlled by the `plugins.<plugin set>.xml` configuration file. The plugin set can be set using the `/pluginset` flag.

Example plugin set configuration file.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<pluginSet splashScreen="splash.png">
	<assemblies>
		<verify>Bungie.Core.dll</verify>
    <...>
		<searchPath>bin\tools\bonobo</searchPath>
		<searchPath>bin\</searchPath>
	</assemblies>
	<plugins>
    <...>
		<container path="NormalPlugin\NormalPlugin.dll">
			<plugin name="MinimalWindowManagerPlugin" enabled="false" />
			<plugin name="SourceControlPlugin" enabled="false" />
			<plugin name="MainWindowPlugin">
				<property name="windowTitle" value="Foundation" />
			</plugin>
			<plugin name="SettingsStorePlugin">
				<property name="settingsAppName" value="Foundation" />
			</plugin>
		</container>
    <...>
	</plugins>
</pluginSet>
```

Breaking down what each part means:
- `verify` - Adds a non-container assembly to the version number verification list, container assemblies always have their version number verified unless verification is disabled (using the `/skipverifyassemblies` command line flag)
- `searchPath` - paths the loader will look for assemblies in.
- `container` - an assembly containing one or more plugins.
- `plugin` - The configuration of an individual plugin, can set plugin defined properties here or enabled or disabled non-required plugins. Plugins are enabled by default unless the `enabledByDefault` attribute is set to false for the container the plugin is in. In the example above we can see the `SourceControlPlugin` plugin has been disabled. This is the plugin that handles the (long obsolete) source depot integration.

The default plugin set configuration file for Foundation is located in `bin\tools\bonobo\plugins.bonobo.xml`.
The plugin set uses the following search order: `.`, `.\bonobo`, `.\tools\bonobo`, `.bin\tools\bonobo`.

## Sample Foundation plugin & setting up the development environment

Setting up the environment for plugin development is fairly straight forward. 

1. Download and install a version of Microsoft Visual Studio. The exact version doesn't matter, any of the recent community editions should work fine. Make sure you install support for .NET framework 4.
2. Install the HREK and note the path.
3. [Grab the sample plugin we will be working with off Github][sample_code]. Note this is not a complete Git support plugin just a very rough sketch to demonstrate some core ideas.
4. Open the plugin in Visual Studio and fix assembly references to point to your HREK\bin\tools\ folder.
5. Compile the project and copy the output over to `bin\tools\bonobo\OpenBlamPlugin`
6. Create a copy of `plugins.bonobo.xml` and name it `plugins.modded.xml`, 
7. Add a reference to the new plugin container to the plugin set configuration file. `<container path="OpenBlamPlugin\OpenBlamPlugin.dll" />`
8. `Foundation.exe /pluginset:modded /skipverifyassemblies`

You should see a new "stage file" context menu 

## Setting up debugging

Before setting up debugging it is recommended to configure our environment so that build output is automatically synced with the version of the plugin container loaded by Foundation. There are many many ways to do this, setting a custom search path in the plugin set config file, directory junctions, post compilation steps, etc. The exact method doesn't matter but this ensures you don't end up debugging an old version instead of the current one.

Debugging itself is fairly straightforward, configure debugging to start the foundation executable, set the working directory to the root of the HREK and use the same command line arguments as above. VS should automatically detect your assembly and let you debug it normally.

## Assembly verification

The loader by default checks the `ProductVersion` of plugin container assemblies as well as any assembly the check is requested for using `<verify>`. This check ensures that any outdated files are flagged in a user friendly way on load instead of potentially causing an issue later on due to API breakage. This check can be disabled using `/skipverifyassemblies` for development as it doesn't serve any purpose in such an environment. 


[mfc]: https://en.wikipedia.org/wiki/Microsoft_Foundation_Class_Library
[wpf]: https://en.wikipedia.org/wiki/Windows_Presentation_Foundation
[managed_code]: https://docs.microsoft.com/en-us/dotnet/standard/managed-code
[sample_code]: https://github.com/num0005/SampleFoundationPlugin
