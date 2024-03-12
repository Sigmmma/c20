---
title: Guides
stub: true
keywords:
  - tutorials
thanks:
  gbMichelle: 'Gathering the list of external tutorials, originally on halocetutorials.tk'
childOrder:
  - levels
  - skyboxes
  - multiplayer
  - singleplayer
  - vehicles
  - porting-maps
  - sharing
---
Welcome to the H1 guides hub! Here you'll find links to various guides ranging from basic map-making to more advanced topics. This hub is a work in progress and will grow over time. Until it is more complete, we recommend the official [HEK tutorial][hek] as a starting point.

# External tutorials
{% alert %}
The content of these external tutorials has not been vetted and they may contain outdated information. Always use the latest available versions of any tools used to get the benefits of bug fixes since the tutorial was made. The list may contain dead links.
{% /alert %}

## Beginner
{% dataTable
  dataPath="tutorials/tutorials"
  rowFilterKey="tags"
  rowFilterExpr="beginner"
  rowSortKey="updated"
  rowSortReverse=true
  columns=[
    {name: "Name", key: "name/en"},
    {name: "Description", key: "description/en"},
    {name: "Author(s)", key: "authors"},
    {name: "Last updated", key: "updated"},
    {name: "Links", key: "links/en"}
  ]
/%}

## UI and HUD
{% dataTable
  dataPath="tutorials/tutorials"
  rowFilterKey="tags"
  rowFilterExpr="hud"
  rowSortKey="updated"
  rowSortReverse=true
  columns=[
    {name: "Name", key: "name/en"},
    {name: "Description", key: "description/en"},
    {name: "Author(s)", key: "authors"},
    {name: "Last updated", key: "updated"},
    {name: "Links", key: "links/en"}
  ]
/%}

## Objects (bipeds, vehicles, scenery, weapons, etc)
{% dataTable
  dataPath="tutorials/tutorials"
  rowFilterKey="tags"
  rowFilterExpr="objects"
  rowSortKey="updated"
  rowSortReverse=true
  columns=[
    {name: "Name", key: "name/en"},
    {name: "Description", key: "description/en"},
    {name: "Author(s)", key: "authors"},
    {name: "Last updated", key: "updated"},
    {name: "Links", key: "links/en"}
  ]
/%}

## Animation
{% dataTable
  dataPath="tutorials/tutorials"
  rowFilterKey="tags"
  rowFilterExpr="animation"
  rowSortKey="updated"
  rowSortReverse=true
  columns=[
    {name: "Name", key: "name/en"},
    {name: "Description", key: "description/en"},
    {name: "Author(s)", key: "authors"},
    {name: "Last updated", key: "updated"},
    {name: "Links", key: "links/en"}
  ]
/%}

## Effects
{% dataTable
  dataPath="tutorials/tutorials"
  rowFilterKey="tags"
  rowFilterExpr="effects"
  rowSortKey="updated"
  rowSortReverse=true
  columns=[
    {name: "Name", key: "name/en"},
    {name: "Description", key: "description/en"},
    {name: "Author(s)", key: "authors"},
    {name: "Last updated", key: "updated"},
    {name: "Links", key: "links/en"}
  ]
/%}

## Other
{% dataTable
  dataPath="tutorials/tutorials"
  rowFilterKey="tags"
  rowFilterExpr="other"
  rowSortKey="updated"
  rowSortReverse=true
  columns=[
    {name: "Name", key: "name/en"},
    {name: "Description", key: "description/en"},
    {name: "Author(s)", key: "authors"},
    {name: "Last updated", key: "updated"},
    {name: "Links", key: "links/en"}
  ]
/%}

[hek]: http://hce.halomaps.org/hek/
