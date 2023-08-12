---
title: ManagedBlam
stub: true
keywords:
  - managed
  - blam
  - managed blam
  - managedblam
  - dll
  - c#
  - programming
thanks:
  PepperMan: Writing this page, compiling information together, and the example C# programs for ManagedBlam in Halo 3
  Krevil: Significant early research and help, and for making [PresentationODST](https://github.com/Krevil/PresentationODST), which exemplifies use of ManagedBlam for H3/ODST
  Crisp: Research and help, example python code, .SelectField() usage, and for development of [Foundry](https://github.com/ILoveAGoodCrisp/Foundry-Halo-Blender-Creation-Kit), which has many examples of ManagedBlam functionality for Reach+
---
# Introduction
The ManagedBlam.dll is a wrapper that allows for direct in-code access to engine functions and tag data, examples being - reading tag data, manipulating tag fields, creating tag entries or tags from scratch and much more. It is available for all engines post-H2 (it was backported to H3 and ODST with the July 2023 update).

Of course this is an extremely powerful tool with practically endless possibilities and greatly increases the potential and speed of external helper programs. On this page, we will provide some basic information on getting ManagedBlam up and running in your dev environment, and some simple(ish!) code examples for doing things such as reading and writing tag field data.

# Development environment
ManagedBlam is primarily used with the [C#](https://learn.microsoft.com/en-us/dotnet/csharp/) programming language. ManagedBlam also specifically requires `.NET 4.8`  - if you do not have the developer pack, you can get it [here](https://dotnet.microsoft.com/en-us/download/dotnet-framework/net48). You *will* get runtime errors if you are on a different version.

The IDE you use is of course your personal choice, but it is recommended to use [Visual Studio](https://visualstudio.microsoft.com/downloads/). At the most basic, you can start with a blank console application, as ManagedBlam has no special requirements beyond `.NET 4.8`. If you are unfamiliar with using external libraries (.dll) files, you can add the H3 ManagedBlam.dll to your VS project like so:
1. Create or load your solution in Visual Studio
2. In the `Solution Explorer` panel on the right, right-click your solution (should have a symbol like a small green C# inside a box).
3.  Hover over `Add`, then click `Project Reference` in the sub-menu to open the `Reference Manager`.
4. Click the `Browse` button in the bottom right.
5. Navigate to `H3EK\bin`, and open the `ManagedBlam.dll` file.
6. Back in the `Reference Manager` window, make sure the checkbox next to `ManagedBlam.dll` is ticked, the click `OK`.
7. ManagedBlam is now usable within your project! Add `using Bungie;` to the top of your C# program to import the library and get started.

![](A.gif "Adding the ManagedBlam.dll to a Visual Studio project.")

# Settings in the .csproj file
There is a property we need to set in the .csproj file to avoid issues at runtime:
1. Open your .csproj file. You can do this either by opening the file in a text editor, or by double clicking the solution name in Visual Studio's `Solution Explorer` to open it there.
2. Inside the first `<PropertyGroup>` section, add this line: `<HighEntropyVA>false</HighEntropyVA>`
This section should now read similarly to this:
```
<PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net4.8</TargetFramework>
    <HighEntropyVA>false</HighEntropyVA>
</PropertyGroup>
```
If you accidentally created the project using the wrong .NET version, or otherwise need to make sure that it is running `.NET 4.8`, this is also where you set that.
After updating and saving the .csproj file, *you will need to unload and reload the project in Visual Studio, or close and reopen Visual Studio for the changes to take effect*.

![](B.gif "Editing the .csproj file to add the required line, and convert a .NET 6.0 project to .NET 4.8")