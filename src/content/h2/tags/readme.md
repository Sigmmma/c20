---
title: H2 tags
stub: true
about: 'resource:h2/tags'
thanks:
  kornman00: OpenSauce sources containing tag groups
---
Halo 2's tags are similar to [Halo 1's](~h1/tags), but there are many more types.

# Tags list

{% dataTable
  dataPath="tags/h2"
  id="tags"
  rowSortKey="key"
  linkSlugKey="key"
  columns=[
    {name: "Tag name", key: "key", format: "pageLinkRaw"},
    {name: "Group ID", key: "value/id", format: "code"},
    {name: "Parent", key: "value/parentName", format: "code"},
    {name: "Purpose", key: "value/description/en"},
  ]
/%}
