---
title: actor
about: 'tag:h1/actor'
thanks:
  justinpyne: Explaining the _friend avoid dist_ field
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
  Vennobennu: Field documentation
  gbMichelle: Reversing actor type aliases
  Elefant: Researching sentinel and grunt actor type behaviour
  Kornman: Providing actor type definition structure
  Conscars: Reversing actor type definitions
  zatarita: Reversing actor type definitions
---
**Actor** definitions configure core AI behaviours, including which decisions they make and how, irrespective of the character's appearance or rank-specific alterations (which is what [actor_variant](~) is for).

# Actor type definitions
There are 16 [actor types](#tag-field-type). Each actor type maps to one of 13 unique _actor type definitions_ which are hardcoded and contain a combination of basic settings and references to game code implementing the particular behaviours of that actor type. Some actor types use the same definition, like monitor and sentinel.

Each actor type definition has a unique way to decide on [one of 14 actions](~ai#actions). It is difficult to understand how exactly each actor type definition differs without extensive testing and/or reverse engineering. It's known that there is a lot of similarity between their code, but that Flood units are the most unique.

{% dataTable
  dataPath="actor_type_definitions/actor_type_definitions"
  id="actor-type-definitions"
  linkCol=true
  linkSlugKey="name"
  columns=[
    {name: "Name", key: "name"},
    {name: "Race", key: "race"},
    {name: "When to search at target", key: "when_to_search_at_target"},
    {name: "When to search pursuit", key: "when_to_search_pursuit"},
    {name: "Pursuit controller", key: "pursuit_controller"},
    {name: "Swarm", key: "swarm"},
    {name: "Known behaviours", key: "description"}
  ]
/%}

# Structure and fields

{% tagStruct "h1/actor" /%}
