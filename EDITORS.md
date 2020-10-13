# Editor's guide
This document contains the writing and style guide for wiki content. As this project is still evolving, the rules here have not been followed consistently. New or updated content should follow these rules:

## Reviewing new content
* We welcome new content, but should be wary of including inaccurate or unverified information. Editors can generally trust the word of community experts, but their contributions can still benefit from verification before inclusion. Ask for more details if needed.
* Non-trivial information should have multiple eyes on it before merging. This can include the community expert, but pull request reviews by another editor are also helpful.

## Writing style
* All headings in a markdown document start at H1 (a single "#") and sub-headings must never skip a level; you can't have an H3 follow an H1.
* Titles use sentence case, with the first word capitalized only. The exception is if the title or parts of it are a proper noun like a person's name.
* In-universe proper nouns or nicknames should be capitalized, like Warthog.
* When referencing tag types, use their file name extensions rather than engine IDs. When mentioning them without a hyperlink, style them with italic _emphasis_.
* When referring to tag fields, style them with italic _emphasis_.
* When stating raw data values and offsets, use `code` tags.
* Blocks of Halo script should use the `hsc` language. Blocks of console commands should use `console`. This ensures proper syntax highlighting.
* Use **strong** tags when naming a page's topic for the first time in the introduction paragraph. The exception is pages which are not about a specific "thing" or concept.
* There is no strong preference at this time for UK/Canada vs. US spelling of words like colour, unless you are referring to a tag's field name which should match exactly.

## Commonly-used headings
To maintain consistency, try to use some of these heading names if relevant:

* Known issues
* Limits
* Compatibility
* Troubleshooting
* Installation
* Usage
* Appendix: <heading>, or just "Appendix" with subheadings if multiple

## Wiki limitations to avoid
Avoid headings which are also links, as the full HTML of the heading becomes slugified for its ID.

## Linking
* Add hyperlinks where it is helpful for the reader, but avoid over-linking especially when there is already the same link visible within a short scrolling distance on the same page.
* Avoid orphaned content. Every new page should have at least one link to it from other relevant locations.
* Links from one page to another usually need one in reverse too.

## Content authoring
The `src/content` directory is a _logical_ grouping of content. Subdirectories expand upon the topic of a parent.

The `page.yml` files within serve as the "skeleton" of the website; each `page.yml` corresponds to a page which gets built. These YAML files contain metadata about the page which controls how they look, the languages they support, and what their localized URL will be. To create a new page, you must create a directory and a corresponding `page.yml` in that directory.

Most `page.yml` fields are optional, but I will list them all below to explain their purpose:

```yaml
# The title key is NOT optional, and has no default values. Providing this
# determines which languages the page is generated for.
title:
  en: General tools
  es: Herramientas generales
# Setting a page to be a "stub" adds a notice to its header that it's a WIP
# and help is desired. It also prevents the page from being added to the
# sitemap, which is crawled by search bots like Google. Once a page is mostly
# done or has reached a useful state, this flag should be removed.
stub: true
# The "slug" is how this page appears as part of the URL. It defaults to the
# directory name where the page.yml is found, but can be changed per language.
# The slug should always be lowercase and should only contain letters and
# numbers, with no punctuation except for dashes (-) to separate words.
slug:
  es: herramientas-generales
# Although page titles, slugs, and body content are indexed for search, you may
# want to boost the page in search results by adding extra keywords. If you find
# that a page isn't showing up at the top of search results when you expect it
# to, try adding some keywords. These are also used for OpenGraph tagging.
keywords:
  en:
    - programs
    - convert
  es:
    - programas
    - convertir
# Related pages show up in the page's sidebar. You must provide the related
# pages as their full logical paths, not their localized URLs. A related page
# link will automatically be added in the opposite direction.
related:
  - /h1/tools
# If provided, this image will be used in the page's info box (aka "metabox").
# It also causes this image to be used in previews when pasting the page into
# social media and Discord. The image file should be in the same directory as
# the page.yml file.
img: some-image.jpg
# This caption adds text to the metabox below the image above. It should
# add context to the image or describe anything notable about it. Technically
# optional, but if an image is provided then you should also add a caption.
caption:
  en: Image description
  es: Descripción de la imagen
```


Beyond the features described above, automated features also apply:

* Adding to search index???????????

Each directory can contain a `readme.md` file about that topic. This is a [Markdown](https://www.markdownguide.org/) file with a [YAML](https://en.wikipedia.org/wiki/YAML) metadata prefix like so:

```md
---
title: Page title
---
Page text goes here
```

The directory for a page can include other files related to that topic, like images or [Graphviz](https://graphviz.org/) files for generating diagrams. Any `src/content/../todo.md` file or `src/content/../todo` directory is git-ignored and can be used to mock out page structures and keep notes for later writing.

I encourage you to explore these directories looking at files to see how pages are already written.

## Content organization
* All CE-specific content should live under the `h1` tree, whereas tools topics which could apply to multiple games should live under the `general` tree.
* If a topic is only really related to another topic, ensure it is either a child page (a subdirectory) or under heading of that parent topic instead.
* If a topic is growing too large, consider splitting it up and taking its large sections to a child page (a subdirectory).
