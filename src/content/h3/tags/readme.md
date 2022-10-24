---
title: H3 tags
stub: true
about: 'resource:h3/tags'
---
Halo 3's tags are similar to [Halo 2's](~h2/tags), but there are many more types.

# Tags list

{% dataTable
  dataPath="tags/h3"
  id="tags"
  rowSortKey="key"
  linkSlugKey="key"
  columns=[
    {name: "Tag name", key: "key", format: "pageLinkRaw"},
    {name: "Group ID", key: "value/id", format: "code"},
    {name: "Parent", key: "value/parentName", format: "pageLinkRaw"},
    {name: "Purpose", key: "value/description/en"},
  ]
/%}
