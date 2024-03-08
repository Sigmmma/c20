---
title: Maps
---
**Maps**, also known as **cache files**, are bundles of [processed tags](~tags#tag-loading). They allow Halo to efficiently load the resources necessary for a level as opposed to individually loading and processing loose tag files.

Maps are often all you need to share a mod, though sometimes a mod also requires custom sound banks, locale bins, or [shared maps](#shared-maps). Maps and other needed resources can be published to the Steam workshop using [Excession](~).

# Shared maps
Shared maps and resource maps contain tag data common to multiple levels. When building maps, Tool will include all the tag data needed for a scenario unless it's already present in a resource map, in which case it's referenced instead. Creating custom resource maps is an advanced workflow that you don't generally need to do.

# More information
For technical details on Halo 1's map file format and resource maps, see [its dedicated page](~h1/maps).