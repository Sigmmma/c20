# Editor's guide
This document contains the writing and style guide for wiki content. As this project is still evolving, the rules here have not been followed consistently. New or updated content should follow these rules:

## Reviewing new content
* We welcome new content, but should be wary of including inaccurate or unverified information. Editors can generally trust the word of community experts, but their contributions can still benefit from verification before inclusion. Ask for more details if needed.
* Non-trivial information should have multiple eyes on it before merging. This can include the community expert, but pull request reviews by another editor are also helpful.

## Pages and resources system
The `src/content` directory is a _logical_ grouping of content and does not reflect the final URLs that content will be available under, since that is dependent upon the language (see the `slug` property below). I encourage you to explore these directories looking at files to see how pages are already written.

The `page.yml` files within serve as the "skeleton" of the website; each `page.yml` corresponds to a page which gets built. These [YAML][] files contain metadata about the page controlling what features appear on the page, the languages they support, what their localized URL will be, and more. To create a new page, you must create a directory and a corresponding `page.yml` in that directory.

The only required field for a page is its `title`, but I will list all possible fields below to explain their purpose:

```yaml
# The title key is NOT optional, and has no default values. Providing this
# determines which languages the page is generated for. If the title contains
# a ":" be sure to contain the whole title within quotes, e.g. "Halo: CE".
title:
  en: General tools
  es: Herramientas generales
# The "slug" is how this page appears as part of the URL. It defaults to the
# directory name where the page.yml is found, but can be changed per language.
# The slug should always be lowercase and should only contain letters and
# numbers, with no punctuation except for dashes (-) to separate words.
slug:
  es: herramientas-generales
# If provided, the build will fail if this page's logical path does not match
# this value. This can be used for any important pages that the community has
# incoming links to or may have bookmarked.
assertPath: /h1/tools/h1a-ek
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
# the page.yml file. This field should be used for images that represent the
# page's topic as an item in a series of pages, similar to Wikipedia's box.
# It should not be used for arbitrary figures, which should use <figure> HTML.
img: tools.jpg
# This caption adds text to the metabox below the image above. It should
# add context to the image or describe anything notable about it. Technically
# optional, but if an image is provided then you should also add a caption.
imgCaption:
  en: Image description
  es: Descripción de la imagen
# if provided, adds a text section to the metabox below the caption. This can
# be useful for adding download and other links to tool pages.
info:
  en: >
    You can write **markdown** with:
    * Multiple
    * Lines
  es: Or just one
# Marking a page as a "stub" adds an alert to its header that it's a work in
# progress and also prevents the page from being added to the sitemap (used by
# search bots). Once a page has reached a useful state, remove this flag.
stub: true
# The alerts option is deprecated. Use inline markdown alerts instead.
alerts: []
# It's important to credit those who discovered something about the engine,
# researched a topic, helped answer questions, or otherwise contributed towards
# a page. Thanked individuals are listed at the bottom of a page, and appear
# in the site-wide thanks summary page.
thanks:
  # Names appear in all languages of the page, but the descriptions may not.
  PersonName:
    en: Researching how to do something
  # Use quotes if the person's name contains spaces.
  "Person Name":
    en: English description of contribution
    es: Spanish description of contribution
# Some pages contain headings which are directly referenced by code in this
# project, e.g. the link to explain group IDs from a tag page's metabox
# title. This YAML config allows a page to expose a stable heading ID alias
# to this code so certain sub-topics can be reliably linked to even if the exact
# wording of a title changes over time or by language. Most pages will not need
# to include this data.
headingRefs:
  group-ids:
    es: id-de-motor
# Identifies this page as a workflow item from workflows.yml, causing workflows
# to be added to the metabox. This can be omitted if either `toolName` or
# `tagName` will be set because they have the same effect, but use this for
# workflow items which are neither tools nor tags (e.g. file formats).
workflowName: obj
# Identifies this page as a tool from workflows.yml. This is very
# similar to using `workflowName` since it also adds workflows to the metabox,
# but it additionally styles the metabox title.
toolName: Sapien
# Identifies this page as a workflow item from workflows.yml similarly to using
# `workflowName`, but also styles the metabox and adds additional info about
# the tag's relationship to other tags. This also causes a tag structure section
# to be added to the page detailing all of its fields, with comments from YAML
# files for each tag type (see `src/data/h1/tags/`). This feature assumes
# Halo 1 tags for now, since that's all we have structure data on.
tagName: scenario
# If true, a section will be added to the page which lists all thanked
# contributors across all pages. This flag is only used on the /thanks summary
# page.
thanksIndex: true
# If provided, adds sections on the page listing all tag types for a particular
# engine version. The "purpose" column of the generated table comes from the
# tag YAML files containing structural comments...for now.
tagIndex:
  game: "h1"
  groupId: true
  parent: false
# If true, causes the page to be excluded from the search index. Use this for
# pages which are unlikely to be searched for specifically so they don't
# clutter the results of more typical searches.
noSearch: true
# Only used for the 2020 survey results page. Causes survey results to be
# rendered as a section of the page. Survey results are in English only.
surveyResults: true
```

### Markdown files
In addition to having a `page.yml`, each supported language of a page (again, based on presence of localized titles) must have an accompanying [Markdown][] file for body content. The name of the file depends on the language:

* English: `readme.md`
* Spanish: `readme_es.md`

The markdown files contain the main body content of the article and are where most content will be written. Follow the _writing practices_ when writing these files.

Beyond the [basic markdown features][mdbasic], c20 adds a few special extensions:

* Inline HTML is supported for anything not covered through markdown or c20's features. Be careful not to accidentally write text which would be interpreted as HTML tags (e.g. when writing command line or HSC usage docs).
* [Tables][tables], although for larger tables you will want to switch to raw inline HTML or our YAML table extension.
* YAML tables allow you to display YAML data sets as a table. They have a number of options for applying styles and formatting to the table.
  YAML tables can be added to a page like so:
  ```.table
  tableDefs: data-file.yml
  tableName: MyTable
  rowLinks: true
  ```
  The YAML content follows this format:
  ```yaml
  data-file.yml
  ---
  MyTable:
    columns:
      - key: col1  # Key used to associate a row's cell with a column
        href: true  # Use this entire column's content as the link text when rowLinks is true
                    # If no columns are marked href, a dedicated href column will be automatically inserted for you.
        name: # Plain text column name that gets displayed in the table header
          en: Column 1 English Name
          es: Column 1 Spanish Name
        format: text  # Applies formatting to the columns.
                      # Acceptable formats are: text, code, codeblock-x (where x is a syntax, like 'hsc')
      - key: col2
        name:
          en: My cool column name in English
          es: My cool column name in Spanish
        format: text
        style: 'width:20%;color:red;'  # Inline style-tag CSS applied to the whole column
    slugKey: col1  # Use a column's content as a link slug when rowLinks is true
    rows:
      - col1: stuff
        col2:
          en: First row column 1's content in English
          es: First row column 1's content in Spanish
      - col1: '`thing` that needs quotes because it starts with a YAML special character'
        col2:
          en: >
            Super duper long string explaining stuff
            that we need to break over multiple lines
            and can contain `special chars`.
          es: That but in Spanish
        slug: thing  # Overrides table's slugKey for this row
  ```
* All headings automatically get anchor links/IDs for linking directory to that heading. When someone loads a page with that heading ID in the URL (e.g. `#my-heading`) the page will automatically scroll to that content. Do not make headings which are also links (like `# [Heading text](www.example.com)`), as it's unsupported.
* You can use the `console`, `inittxt` and `hsc` language tags for [code fences][fences] to get syntax highlighting for various cases of Halo Script. We also support `vrml` (WRL files).
* Alert boxes can be added with the following syntax:
  ```md
      ```.alert info
      Alert body here, in **markdown**.
      ```
  ```
  The possible alert types are `info`, `danger`, and `success`.
* Right-aligned figures are added using a special `.figure` tag in markdown images:
  ```md
      ![.figure Figure caption markdown](figure.jpg)
  ```
* A markdown image which ends with `.mp4`, e.g. `![](video.mp4)`, will generate `<video>` tags with the correct source and poster image. The wiki's build automatically generates poster images from the first video frame.
* Standard markdown images are automatically enclosed in an anchor tag which opens the image in another tab.
* Generate data structure documentation tables from a YAML description like so:
  ```md
      ```.struct
      <YAML CONTENT HERE>
      ```
  ```

  The YAML content follows this format:
  ```yml
  # determines the "main" structure
  entry_type: Savegame
  # if provided, shows offsets in table
  showOffsets: true
  # root for HTML ID generation
  id: savegame
  # definitions for type names
  typeDefs:
    DifficultyOpts:
      # type classes can be enum, bitfield, or struct
      class: enum
      # enum size in bytes, also used for bitfield
      size: 1
      # for enums specifically, each value's name
      options:
        - name: easy
        - name: normal
        - name: hard
        - name: legendary

    Savegame:
      class: struct
      # both struct and bitfield classes have fields
      fields:
        # an intrinsic resizable padding type
        - type: pad
          size: 0x1E2
        # referencing the enum above
        - name: last difficulty
          type: DifficultyOpts
        - type: pad
          size: 5
        # undefined types assumed intrinsic
        - name: last played scenario
          type: char
          count: 32
          # multi-language markdown comment support
          comments:
            en: >
              An ASCII-encoded [scenario][] tag path, null-terminated and 32
              characters max. An example value is `levels\b30\b30` for The Silent
              Cartographer.
  ```
* **Smart links** are perhaps the most important feature of c20's markdown. Since most of the links you'll be creating will be to other wiki pages, it would be both cumbersome and fragile to specify the full path of that page every time. We extend [standard reference-style links][reflink] with an automatic lookup mechanism when a reference is not defined.

  For example, if you just write a link like `[the scenario tag][scenario]`, c20 will automatically resolve the target URL as `/h1/tags/scenario` without you having to define it. You can also include a heading ID like `scenario#tag-field-bipeds`. The lookup is based on the page's _logical path_ (the name of its directories under `src/content/` rather than its localized URL). When multiple target pages match, c20 will choose the one _most related_ to the origin page in the content tree. When this is not possible, the ambiguity must be clarified by specifying more of the logical path in the link: `[Halo 2 tags][h2/tags]` or `[Halo 1 tags][h1/tags]`.

### Resources
The directory for a page can include other files related to that topic, like images. Simply place images in the page's directory and they will be copied for each localized output URL. If an image is only applicable to a certain language because it contains text in that language, you can add a suffix like `screenshot_es.jpg` or `screenshot_en.jpg` and it will only be copied to certain language outputs. **Do not** place images in a subdirectory for organization; subdirectories should be used for child pages only.

If you include `.dot` files, they will be automatically rendered to diagrams using [Graphviz](https://graphviz.org/).

Any `src/content/../todo.md` file or `src/content/../todo` directory is git-ignored and can be used to mock out page structures and keep notes for later writing.

### Data files
Some wiki content is automatically generated based on YAML data files. These can be found in `src/data/` and include:

* `workflows.yml`: support tool workflows seen in metaboxes
* `h1/tags/*.yml`: tag structure and field descriptions; supports localization

## Writing practices
### Content organization
* All CE-specific content should live under the `h1` tree, whereas tools topics which could apply to multiple games should live under the `general` tree.
* If a topic is only really related to another topic, ensure it is either a child page (a subdirectory) or under heading of that parent topic instead.
* If a topic is growing too large, consider splitting it up and taking its large sections to a child page (a subdirectory).
* Child pages expand upon the topic of a parent.

### Markdown tips
* Ordered and unordered list items should not have empty lines between them, or else it will not be considered a proper list by the parser.

### Writing style
* All headings in a markdown document start at H1 (a single "#") and sub-headings must never skip a level; you can't have an H3 follow an H1.
* Titles use sentence case, with the first word capitalized only. The exception is if the title or parts of it are a proper noun like a person's name.
* In-universe proper nouns or nicknames should be capitalized, like Warthog.
* When referencing tag types, use their file name extensions rather than group IDs. When mentioning them without a hyperlink, style them with italic _emphasis_.
* When referring to tag fields, style them with italic _emphasis_.
* When stating raw data values and offsets, use `code` tags.
* Blocks of Halo script should use the `hsc` language. Blocks of console commands should use `console`. This ensures proper syntax highlighting.
* Use **strong** tags when naming a page's topic for the first time in the introduction paragraph. The exception is pages which are not about a specific "thing" or concept.
* Buttons presses should be documented like `<kbd>Ctrl + A</kbd>`.
* There is no strong preference at this time for UK/Canada vs. US spelling of words like colour, unless you are referring to a tag's field name which should match exactly.
* Don't assume the reader knows anything about modding Halo. You don't have to detail literally every step, but include links to prerequisite information and other pages to fill out concepts. Use examples that the reader might be familiar with to help get your points across.
* Avoid using words like "below" or "above" to refer to other content on the page unless it is fairly certain the content will stay together. We may wish to reorder sections and paragraphs in the future. Consider using an anchor link to point users to relevant sections if they aren't immediately obvious.
* Use a "textbook" style of writing rather than conversational. Keep writing concise and avoid expressions which may confuse readers whose first language is not English.
* Image alt attributes should aid the reader in the case that images _don't_ load. For example, `![The Modeling tab is at the top of the editor window](image.jpg)`.
* Use ordered and unordered lists sparingly. They should be used for small, easily-digestible lists of things but not listing paragraphs of steps in a guide.

### Commonly-used headings
To maintain consistency across pages, try to use some of these heading names if relevant:

* Known issues
* Limits
* Compatibility
* Troubleshooting
* Installation
* Usage
* Appendix

### Linking
* Add hyperlinks where it is helpful for the reader, but avoid over-linking especially when there is already the same link visible within a short scrolling distance on the same page.
* Avoid orphaned content. Every new page should have at least one link to it from other relevant locations.
* Links from one page to another usually need one in reverse too.
* If a tag page has a dedicated section describing a certain concept, prefer linking to that over linking to the relevant fields in the tag structure.

[yaml]: https://en.wikipedia.org/wiki/YAML
[markdown]: https://www.markdownguide.org/
[fences]: https://www.markdownguide.org/extended-syntax#syntax-highlighting
[tables]: https://www.markdownguide.org/extended-syntax#tables
[reflink]: https://www.markdownguide.org/basic-syntax#reference-style-links
[mdbasic]: https://www.markdownguide.org/basic-syntax
