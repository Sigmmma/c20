# The Reclaimers Library

This repo contains the source content and build scripts for the Reclaimers Library (https://c20.reclaimers.net). It aims to document the immense tribal knowledge of the Halo 1 modding community and covers game engine details, the Halo Editing Kit, community tools, and guides for map-making.

## Project goals
An explicit choice was made to avoid typical managed or self-hosted Wiki platforms for this library and opt for building a [static site](https://en.wikipedia.org/wiki/Static_web_page) generator. Benefits include ease of implementing custom features tailored to the Halo community's need, full control of content without ads, and simplicity of distribution.

The downside is that it is harder for contributors to add content like they would with a typical Wiki -- there is no login or edit button. While this may limit casual editing, previous attempts to create a Halo modding wiki have shown that content has not grown organically over time beyond a few passionate maintainers and that another approach is needed.

Instead, this library will be treated as a curated resource of high quality documentation assembled from research and interviews with the community's experts. That being said, we are happy to edit and include any content that you provide. **Pull requests are welcome**, and it is not necessary to ensure the build is working when submitting one. We also accept submissions by GitHub issue or email if that's easiest for you.

At a high level, we want to cover resources (data, tags, maps), tools (official and community), details of the Halo engine, and workflow guides. Our focus will be on Halo 1 modding, though content for later games (e.g. H2V) is also welcome.

## Content authoring
Source content for page text, images, and diagrams, can be found in `src/content`. This is where the majority of content authoring takes place. I encourage you to explore this directory looking at files to see how pages are already written.

The directory layout will match the URL structure of the website, organized by topics:

* Blam: The Halo engine and its resources, like tags
* Games: Information about Halo itself
* Tools: The HEK and community tools
* Guides: How-to guides, tips, and tutorials

Each directory can contain a `readme.md` file about that topic. This is a [Markdown](https://www.markdownguide.org/) file with a [YAML](https://en.wikipedia.org/wiki/YAML) prefix like so:

```md
---
title: Page title
---
Page text goes here
```

The directory for a page can include other files related to that topic, like images or [Graphviz](https://graphviz.org/) files for generating diagrams.

## Building and testing
In order to see content as it will appear online, it must be built first. As a pre-requisite, this project requires [Node.js](https://nodejs.org/en/). Run the following shell commands to build and locally serve the website:

```sh
# install dependencies
git submodule update --init
npm ci

# build content into `./dist`
npm run build

# serve the site on port 8080
npm start
```

You should be able to visit http://localhost:8080/ in a browser and see the built website. Note that if you make changes to source content, it will need to be rebuilt with `npm run build` before you see changes in the browser.

## Releasing
The website is currently hosted as a static site in [AWS S3](https://aws.amazon.com/s3/), fronted by a [CloudFront](https://aws.amazon.com/cloudfront/) CDN distribution. To deploy a new version, simply sync the `dist` directory to S3:

```sh
aws s3 sync --delete ./dist s3://reclaimers-c20/
```

Because of cache TTLs, content may not appear updated immediately. An invalidation can be run in CloudFront to force updates, but it will not affect clients unless they clear their browser cache. TTLs are currently set at a minimum of 1 day and a maximum of 7.

## Development
[Gulp](https://gulpjs.com/) is used as the main task runner for the build. It is triggered by the command `npm run build`, defined in `package.json`. Within the `gulpfile.js` there are several tasks defined to process stylesheets, build markdown pages, create diagrams, and copy other assets.

The goal is to produce static assets that are easily distributed. The server must be configured to serve `index.html` for directory GETs (any server should be able to do this).

The main task is `contentPages`, which calls out to `src/content.js` where the heavy lifting happens. This code crawls `src/content/` for `readme.md` files, which contain YAML front matter with metadata followed by markdown. This information is assembled into a master "meta index" of all pages before rendering is done in a second pass. This allows each page to potentially include tables or indexes of other pages' metadata.

### Templates
Pages may reference a template to customize their wrapper. Templates are defined in `src/templates` and must be registered in the co-located `index.js`. If a page does not specify a template, it is assigned the "default" one.

Each template is essentially a function of page metadata (and the meta index) that returns the full HTML source for that page. HTML rendering is done with `html` tagged template literals for easy access to JavaScript. It doesn't produce the prettiest HTML, but this approach was chosen to keep dependencies lightweight.

### Styles
The project aims for a simple and highly readable style, which favours a more traditional document layout and natural styling of semantic HTML. This helps keep the stylesheet lightweight and maintenance easier.

We use [Sass](https://sass-lang.com/) as a CSS preprocessor for its productivity features. Variables should be used to ensure consistency and make changes easier. Nest selectors according to the specificity of what's being styled.

### Browser requirements
The website should make minimum use of client side JavaScript unless there are interactive features desired, in which case it should be a [progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement).

### Dependencies
We should aim to reduce dependencies (e.g. NPM packages) where it makes sense. Though this is a static site and client side dependencies will be few if any, the proliferation of build dependencies could make this project harder to maintain.

[Invader](https://github.com/Kavawuvi/invader) is included as a submodule for its tag definitions. It can be updated with:

```sh
git submodule update --remote
```
