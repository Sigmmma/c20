Halo Reach replaced the legacy [MFC-based][mfc] Guerilla content editor with the new and improved [WPF-based][wpf] Foundation content editor. This required the creation of a [managed][managed_code] wrapper around certain core engine subsystems.

# managedblam
This is a wrapper around core Halo engine (aka "blam") functionality. You can use this to work with Halo Reach tag files and not worry about maintaining compatibility with official tools.

Sample code for loading a tag file and introspecting it.
```c#
namespace Sample
{
    class Program
    {
        static void Main(string[] args)
        {
            ManagedBlamCrashCallback del = info => {

            };
            var param = new ManagedBlamStartupParameters();
            param.InitializationLevel = InitializationType.TagsOnly;
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



[mfc]: https://en.wikipedia.org/wiki/Microsoft_Foundation_Class_Library
[wpf]: https://en.wikipedia.org/wiki/Windows_Presentation_Foundation
[managed_code]: https://docs.microsoft.com/en-us/dotnet/standard/managed-code