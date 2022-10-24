---
title: String list text sources
about: 'resource:Strings text'
thanks:
  General_101: Documenting text format
---
The [unicode_string_list](~) and [string_list](~) tags are [compiled](~tool#unicode-string-compilation) from a specially formatted .txt file. This page describes the format Tool expects for these files.

# Creating a text file for string lists
Unlike with [HUD message text source files](~hmt), the source files for string lists can be anywhere under the HEK's the `data` directory and have any filename ending with ".txt". However, it's still a good idea to keep these files organized with what they're related to so it's easier to find or share your tags later.

A text file can be created on Windows by right clicking in the directory to bring up the context menu and creating a new text file.

The text file can contain multiple strings, each terminated with the line `###END-STRING###`. For example:

```
This is a string.
###END-STRING###
This is also a string.
It also has multiple lines cause Halo is cool like that.
###END-STRING###
We will also be talking about symbols like %jump later in the guide.
###END-STRING###
```

{% alert type="danger" %}
Some features like newlines in strings will not work in certain situations.
{% /alert %}

## Encoding
When saving the file, **make sure the file is set to encoding UTF-16 LE** for compiling [unicode_string_list](~) or UTF-8 for [string_list](~).
